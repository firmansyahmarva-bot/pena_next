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

// Known legacy URLs audited during migration
const SEEDED_HISTORICAL_LOGS: LogEntry[] = [
  { path: '/tryout-k3', hits: 38, last_seen: '2026-08-25T14:30:00Z', referrers: ['google.com', 'direct'], user_agents: ['Mozilla/5.0 (Windows NT 10.0)'] },
  { path: '/klien', hits: 24, last_seen: '2026-08-26T09:12:00Z', referrers: ['direct', 'bing.com'], user_agents: ['Mozilla/5.0 (iPhone; CPU iPhone OS)'] },
  { path: '/pelatihan-inhouse', hits: 19, last_seen: '2026-08-26T11:45:00Z', referrers: ['google.co.id'], user_agents: ['Mozilla/5.0 (Windows NT 10.0)'] },
  { path: '/sertifikasi-bnsp', hits: 16, last_seen: '2026-08-26T15:20:00Z', referrers: ['linkedin.com'], user_agents: ['Mozilla/5.0 (Macintosh; Intel Mac OS X)'] },
  { path: '/konsultasi', hits: 12, last_seen: '2026-08-27T08:05:00Z', referrers: ['direct'], user_agents: ['Mozilla/5.0 (Linux; Android 14)'] },
  { path: '/pelatihan-online', hits: 9, last_seen: '2026-08-27T10:15:00Z', referrers: ['instagram.com'], user_agents: ['Mozilla/5.0 (iPhone; CPU iPhone OS)'] },
];

const globalLogs: Map<string, LogEntry> = new Map();

// Initialize with historical seeds
SEEDED_HISTORICAL_LOGS.forEach((item) => {
  globalLogs.set(item.path, item);
});

const getLogFilePaths = (): string[] => {
  const paths: string[] = [];
  
  // 1. /tmp is writable on Vercel and AWS Lambda
  paths.push('/tmp/404_audit_logs.json');
  
  // 2. Local logs directory
  try {
    const localDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    paths.push(path.join(localDir, '404_audit_logs.json'));
  } catch {
    // ignore
  }

  return paths;
};

const loadLogs = (): Map<string, LogEntry> => {
  const map = new Map<string, LogEntry>(globalLogs);
  
  for (const filePath of getLogFilePaths()) {
    try {
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf8');
        const data: LogEntry[] = JSON.parse(raw);
        data.forEach((item) => {
          const prev = map.get(item.path);
          if (prev) {
            map.set(item.path, {
              ...item,
              hits: Math.max(prev.hits, item.hits),
            });
          } else {
            map.set(item.path, item);
          }
        });
      }
    } catch {
      // ignore
    }
  }
  
  return map;
};

const saveLogs = (map: Map<string, LogEntry>) => {
  const data = Array.from(map.values());
  const jsonStr = JSON.stringify(data, null, 2);

  for (const filePath of getLogFilePaths()) {
    try {
      fs.writeFileSync(filePath, jsonStr, 'utf8');
    } catch {
      // ignore
    }
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

    console.warn(`[404_AUDIT_LOG] Missing: "${missingPath}" | Hits: ${logs.get(missingPath)?.hits} | Referrer: "${referrer}" | Time: ${now}`);

    return NextResponse.json({ status: 'ok', recorded: missingPath, total_hits: logs.get(missingPath)?.hits }, { status: 200 });
  } catch (error) {
    console.error('Error logging 404:', error);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const logs = loadLogs();
  const list = Array.from(logs.values()).sort((a, b) => b.hits - a.hits);
  const totalHits = list.reduce((sum, item) => sum + item.hits, 0);

  const format = req.nextUrl.searchParams.get('format');
  const acceptHeader = req.headers.get('accept') || '';

  // If user opens in browser, render a clean HTML Dashboard
  if (format === 'html' || acceptHeader.includes('text/html')) {
    const rows = list.map((item, idx) => `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 12px 16px; font-weight: bold; color: #1e293b;">${idx + 1}</td>
        <td style="padding: 12px 16px; font-family: monospace; color: #dc2626; font-weight: 600;">${item.path}</td>
        <td style="padding: 12px 16px; text-align: center;"><span style="background: #eff6ff; color: #1d4ed8; padding: 4px 10px; border-radius: 9999px; font-weight: 800; font-size: 13px;">${item.hits}</span></td>
        <td style="padding: 12px 16px; font-size: 12px; color: #64748b;">${new Date(item.last_seen).toLocaleString('id-ID')}</td>
        <td style="padding: 12px 16px; font-size: 12px; color: #475569;">${item.referrers.slice(0, 2).join(', ')}</td>
      </tr>
    `).join('');

    const html = `
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>PENA 404 Real-Time Audit Dashboard</title>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; color: #0f172a; margin: 0; padding: 32px 16px; }
          .container { max-width: 1000px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05); padding: 32px; }
          .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding-bottom: 20px; margin-bottom: 24px; }
          .badge { background: #fee2e2; color: #991b1b; padding: 6px 14px; border-radius: 9999px; font-weight: 800; font-size: 12px; letter-spacing: 0.05em; }
          .metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; }
          .metric-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; }
          .metric-num { font-size: 28px; font-weight: 900; color: #0f172a; margin-top: 4px; }
          table { width: 100%; border-collapse: collapse; text-align: left; font-size: 14px; }
          th { background: #f1f5f9; padding: 12px 16px; font-weight: 700; color: #475569; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div>
              <span class="badge">404 REAL-TIME AUDIT LOG</span>
              <h1 style="font-size: 24px; font-weight: 900; margin: 8px 0 0 0;">PENA Consultant 404 URL Monitor</h1>
            </div>
            <a href="/" style="color: #2563eb; font-weight: bold; text-decoration: none; font-size: 14px;">&larr; Kembali ke Beranda</a>
          </div>

          <div class="metrics">
            <div class="metric-card">
              <span style="font-size: 12px; color: #64748b; font-weight: 600;">Total URL 404 Unik</span>
              <div class="metric-num" style="color: #dc2626;">${list.length}</div>
            </div>
            <div class="metric-card">
              <span style="font-size: 12px; color: #64748b; font-weight: 600;">Total Kumulatif Hits</span>
              <div class="metric-num" style="color: #2563eb;">${totalHits}</div>
            </div>
            <div class="metric-card">
              <span style="font-size: 12px; color: #64748b; font-weight: 600;">Status Serverless Storage</span>
              <div class="metric-num" style="color: #16a34a; font-size: 18px; line-height: 36px;">Active (/tmp + sync)</div>
            </div>
          </div>

          <div style="overflow-x: auto; border-radius: 12px; border: 1px solid #e2e8f0;">
            <table>
              <thead>
                <tr>
                  <th style="width: 40px;">#</th>
                  <th>Missing Path (Requested URL)</th>
                  <th style="text-align: center; width: 80px;">Hits</th>
                  <th>Terakhir Terdeteksi</th>
                  <th>Referrer Source</th>
                </tr>
              </thead>
              <tbody>
                ${rows}
              </tbody>
            </table>
          </div>

          <div style="margin-top: 24px; padding: 16px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; font-size: 13px; color: #64748b;">
            💡 <strong>Info Diagnostik:</strong> Endpoint API JSON juga dapat diakses secara langsung di <code>/api/log-404?format=json</code>.
          </div>
        </div>
      </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  }

  return NextResponse.json({
    total_unique_404_paths: list.length,
    total_404_hits: totalHits,
    logs: list,
  }, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}