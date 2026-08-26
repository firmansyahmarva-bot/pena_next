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

// In-memory persistent cache for serverless invocation lifecycle
const inMemoryLogs: Map<string, LogEntry> = new Map();

// Local file storage path (works in dev & local server)
const getLogFilePath = () => {
  const tmpPath = process.env.VERCEL ? '/tmp/404_audit_logs.json' : path.join(process.cwd(), '404_audit_logs.json');
  return tmpPath;
};

const loadFileLogs = (): Map<string, LogEntry> => {
  const map = new Map<string, LogEntry>(inMemoryLogs);
  try {
    const file = getLogFilePath();
    if (fs.existsSync(file)) {
      const raw = fs.readFileSync(file, 'utf8');
      const data: LogEntry[] = JSON.parse(raw);
      data.forEach((item) => map.set(item.path, item));
    }
  } catch (err) {
    // ignore read error
  }
  return map;
};

const saveFileLogs = (map: Map<string, LogEntry>) => {
  try {
    const file = getLogFilePath();
    const data = Array.from(map.values());
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    // ignore write error
  }
};

export async function POST(req: NextRequest) {
  try {
    let body: { path?: string; referrer?: string; userAgent?: string } = {};
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
    const now = new Date().toISOString();

    // Load existing
    const logs = loadFileLogs();
    const existing = logs.get(missingPath);

    if (existing) {
      existing.hits += 1;
      existing.last_seen = now;
      if (!existing.referrers.includes(referrer)) existing.referrers.push(referrer);
      if (!existing.user_agents.includes(userAgent)) existing.user_agents.push(userAgent);
      logs.set(missingPath, existing);
      inMemoryLogs.set(missingPath, existing);
    } else {
      const newEntry: LogEntry = {
        path: missingPath,
        hits: 1,
        last_seen: now,
        referrers: [referrer],
        user_agents: [userAgent],
      };
      logs.set(missingPath, newEntry);
      inMemoryLogs.set(missingPath, newEntry);
    }

    saveFileLogs(logs);

    // Structured server log for Vercel / CloudWatch / Datadog
    console.log(`[404_DETECTED] Path: "${missingPath}" | Hits: ${logs.get(missingPath)?.hits} | Referrer: "${referrer}" | Time: ${now}`);

    return NextResponse.json({ status: 'ok', recorded_path: missingPath }, { status: 200 });
  } catch (error) {
    console.error('Error recording 404 log:', error);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}

export async function GET() {
  const logs = loadFileLogs();
  const list = Array.from(logs.values()).sort((a, b) => b.hits - a.hits);

  // Generate copy-paste ready Next.js redirect code
  const redirectSuggestions = list.map((item) => ({
    source: item.path,
    destination: '/pelatihan', // default fallback
    permanent: true,
    hits: item.hits,
  }));

  return NextResponse.json({
    total_unique_404_paths: list.length,
    total_404_hits: list.reduce((sum, item) => sum + item.hits, 0),
    logs: list,
    nextjs_redirect_suggestions: redirectSuggestions,
  }, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}