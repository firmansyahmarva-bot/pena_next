import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

interface LogEntry {
  path: string;
  hits: number;
  last_seen: string;
  referrers: string[];
  user_agents: string[];
}

// In-memory global store for persistent server runtime
const globalLogs: Map<string, LogEntry> = new Map();

const getLogFilePath = () => {
  const dir = path.join(process.cwd(), 'logs');
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch {
      // ignore
    }
  }
  return path.join(dir, '404_audit_logs.json');
};

const loadLogs = (): Map<string, LogEntry> => {
  const map = new Map<string, LogEntry>(globalLogs);
  try {
    const file = getLogFilePath();
    if (fs.existsSync(file)) {
      const raw = fs.readFileSync(file, 'utf8');
      const data: LogEntry[] = JSON.parse(raw);
      data.forEach((item) => map.set(item.path, item));
    }
  } catch {
    // ignore
  }
  return map;
};

const saveLogs = (map: Map<string, LogEntry>) => {
  try {
    const file = getLogFilePath();
    const data = Array.from(map.values());
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  } catch {
    // ignore in read-only environment
  }
};

export async function POST(req: NextRequest) {
  try {
    let body: { path?: string; referrer?: string; userAgent?: string; timestamp?: string } = {};
    const contentType = req.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      body = await req.json();
    } else {
      const text = await req.text();
      try {
        body = JSON.parse(text);
      } catch {
        body = { path: text };
      }
    }

    const missingPath = body.path || req.nextUrl.searchParams.get('path') || 'unknown';
    const referrer = body.referrer || req.headers.get('referer') || 'direct';
    const userAgent = body.userAgent || req.headers.get('user-agent') || 'unknown';
    const now = body.timestamp || new Date().toISOString();

    const logs = loadLogs();
    const existing = logs.get(missingPath);

    if (existing) {
      existing.hits += 1;
      existing.last_seen = now;
      if (!existing.referrers.includes(referrer)) existing.referrers.push(referrer);
      if (!existing.user_agents.includes(userAgent)) existing.user_agents.push(userAgent);
      logs.set(missingPath, existing);
      globalLogs.set(missingPath, existing);
    } else {
      const newEntry: LogEntry = {
        path: missingPath,
        hits: 1,
        last_seen: now,
        referrers: [referrer],
        user_agents: [userAgent],
      };
      logs.set(missingPath, newEntry);
      globalLogs.set(missingPath, newEntry);
    }

    saveLogs(logs);

    // Explicit high-visibility stdout for log aggregation tools (Vercel, Datadog, CloudWatch)
    console.warn(`[404_AUDIT_LOG] Missing: "${missingPath}" | Hits: ${logs.get(missingPath)?.hits} | Referrer: "${referrer}" | Time: ${now}`);

    return NextResponse.json({ status: 'ok', recorded: missingPath }, { status: 200 });
  } catch (error) {
    console.error('Error logging 404:', error);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}

export async function GET() {
  const logs = loadLogs();
  const list = Array.from(logs.values()).sort((a, b) => b.hits - a.hits);

  return NextResponse.json({
    total_unique_404_paths: list.length,
    total_404_hits: list.reduce((sum, item) => sum + item.hits, 0),
    logs: list,
  }, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}