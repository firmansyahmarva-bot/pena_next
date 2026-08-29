import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export const dynamic = 'force-dynamic';

interface LogEntry {
  path: string;
  hits: number;
  first_seen: string;
  last_seen: string;
  referrers: string[];
  user_agents: string[];
}

const REDIS_KEY = 'pena:404_logs';

function getRedisClient() {
  const url =
    process.env.api404_KV_REST_API_URL ||
    process.env.KV_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.api404_KV_REST_API_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  return new Redis({ url, token });
}

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

    const missingPath = (body.path || req.nextUrl.searchParams.get('path') || 'unknown').trim();
    const referrer = body.referrer || req.headers.get('referer') || 'direct';
    const userAgent = body.userAgent || req.headers.get('user-agent') || 'unknown';
    const now = body.timestamp || new Date().toISOString();

    const redis = getRedisClient();
    if (!redis) {
      console.warn('[404_LOGGER] Redis credentials not configured. Skipping persistence.');
      return NextResponse.json({ status: 'unconfigured', recorded: missingPath }, { status: 200 });
    }

    // Fetch existing record from Upstash Redis
    const existing = await redis.hget<LogEntry>(REDIS_KEY, missingPath);

    let updatedEntry: LogEntry;
    if (existing && typeof existing === 'object') {
      const referrers = Array.isArray(existing.referrers) ? existing.referrers : [];
      const user_agents = Array.isArray(existing.user_agents) ? existing.user_agents : [];

      if (!referrers.includes(referrer)) {
        referrers.push(referrer);
      }
      if (!user_agents.includes(userAgent)) {
        user_agents.push(userAgent);
      }

      updatedEntry = {
        path: missingPath,
        hits: (existing.hits || 0) + 1,
        first_seen: existing.first_seen || existing.last_seen || now,
        last_seen: now,
        referrers: referrers.slice(-20),
        user_agents: user_agents.slice(-20),
      };
    } else {
      updatedEntry = {
        path: missingPath,
        hits: 1,
        first_seen: now,
        last_seen: now,
        referrers: [referrer],
        user_agents: [userAgent],
      };
    }

    await redis.hset(REDIS_KEY, { [missingPath]: updatedEntry });

    return NextResponse.json({
      status: 'ok',
      recorded: missingPath,
      total_hits: updatedEntry.hits,
    }, { status: 200 });
  } catch (error) {
    console.error('Error logging 404:', error);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const redis = getRedisClient();
    let list: LogEntry[] = [];

    if (redis) {
      const allEntries = await redis.hgetall<Record<string, LogEntry>>(REDIS_KEY);
      if (allEntries && typeof allEntries === 'object') {
        list = Object.values(allEntries).filter((item): item is LogEntry => Boolean(item && item.path));
      }
    }

    list.sort((a, b) => b.hits - a.hits);
    const totalHits = list.reduce((sum, item) => sum + (item.hits || 0), 0);

    const format = req.nextUrl.searchParams.get('format');
    const acceptHeader = req.headers.get('accept') || '';

    // If user opens in browser, render the clean HTML Dashboard
    if (format === 'html' || acceptHeader.includes('text/html')) {
      const rows = list.length > 0 ? list.map((item, idx) => `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 16px; font-weight: bold; color: #1e293b;">${idx + 1}</td>
          <td style="padding: 12px 16px; font-family: monospace; color: #dc2626; font-weight: 600;">${item.path}</td>
          <td style="padding: 12px 16px; text-align: center;"><span style="background: #eff6ff; color: #1d4ed8; padding: 4px 10px; border-radius: 9999px; font-weight: 800; font-size: 13px;">${item.hits}</span></td>
          <td style="padding: 12px 16px; font-size: 12px; color: #64748b;">${new Date(item.last_seen).toLocaleString('id-ID')}</td>
          <td style="padding: 12px 16px; font-size: 12px; color: #475569;">${(item.referrers || []).slice(0, 2).join(', ')}</td>
        </tr>
      `).join('') : `
        <tr>
          <td colspan="5" style="padding: 32px; text-align: center; color: #64748b;">
            ✨ Belum ada URL 404 yang tercatat. Sistem bersih dari tautan rusak!
          </td>
        </tr>
      `;

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
                <span style="font-size: 12px; color: #64748b; font-weight: 600;">Status Persistent Storage</span>
                <div class="metric-num" style="color: #16a34a; font-size: 18px; line-height: 36px;">Connected (Upstash Redis)</div>
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
  } catch (error) {
    console.error('Error fetching 404 logs:', error);
    return NextResponse.json({
      total_unique_404_paths: 0,
      total_404_hits: 0,
      logs: [],
      error: 'Failed to retrieve logs',
    }, {
      status: 500,
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  }
}
