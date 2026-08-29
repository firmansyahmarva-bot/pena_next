import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export const dynamic = 'force-dynamic';

export interface RedirectLogEntry {
  source_path: string;
  target_path: string;
  hits: number;
  first_seen: string;
  last_seen: string;
  referrers: string[];
}

const REDIS_KEY = 'pena:301_logs';

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
    let body: { source_path?: string; target_path?: string; referrer?: string; timestamp?: string } = {};
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      body = await req.json();
    } else {
      const text = await req.text();
      try {
        body = JSON.parse(text);
      } catch {
        body = { source_path: text };
      }
    }

    const sourcePath = (body.source_path || req.nextUrl.searchParams.get('source') || 'unknown').trim();
    const targetPath = (body.target_path || req.nextUrl.searchParams.get('target') || '/').trim();
    const referrer = body.referrer || req.headers.get('referer') || 'direct';
    const now = body.timestamp || new Date().toISOString();

    const redis = getRedisClient();
    if (!redis) {
      return NextResponse.json({ status: 'unconfigured', recorded: sourcePath }, { status: 200 });
    }

    const existing = await redis.hget<RedirectLogEntry>(REDIS_KEY, sourcePath);

    let updatedEntry: RedirectLogEntry;
    if (existing && typeof existing === 'object') {
      const referrers = Array.isArray(existing.referrers) ? existing.referrers : [];
      if (!referrers.includes(referrer)) {
        referrers.push(referrer);
      }

      updatedEntry = {
        source_path: sourcePath,
        target_path: targetPath || existing.target_path,
        hits: (existing.hits || 0) + 1,
        first_seen: existing.first_seen || existing.last_seen || now,
        last_seen: now,
        referrers: referrers.slice(-20),
      };
    } else {
      updatedEntry = {
        source_path: sourcePath,
        target_path: targetPath,
        hits: 1,
        first_seen: now,
        last_seen: now,
        referrers: [referrer],
      };
    }

    await redis.hset(REDIS_KEY, { [sourcePath]: updatedEntry });

    return NextResponse.json({
      status: 'ok',
      recorded: sourcePath,
      target: targetPath,
      total_hits: updatedEntry.hits,
    }, { status: 200 });
  } catch (error) {
    console.error('Error logging 301 redirect:', error);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const redis = getRedisClient();
    let list: RedirectLogEntry[] = [];

    if (redis) {
      const allEntries = await redis.hgetall<Record<string, RedirectLogEntry>>(REDIS_KEY);
      if (allEntries && typeof allEntries === 'object') {
        list = Object.values(allEntries).filter((item): item is RedirectLogEntry => Boolean(item && item.source_path));
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
          <td style="padding: 12px 16px; font-family: monospace; color: #d97706; font-weight: 600;">${item.source_path}</td>
          <td style="padding: 12px 16px; font-family: monospace; color: #16a34a; font-weight: 600;">${item.target_path}</td>
          <td style="padding: 12px 16px; text-align: center;"><span style="background: #fef3c7; color: #b45309; padding: 4px 10px; border-radius: 9999px; font-weight: 800; font-size: 13px;">${item.hits}</span></td>
          <td style="padding: 12px 16px; font-size: 12px; color: #64748b;">${new Date(item.last_seen).toLocaleString('id-ID')}</td>
          <td style="padding: 12px 16px; font-size: 12px; color: #475569;">${(item.referrers || []).slice(0, 2).join(', ')}</td>
        </tr>
      `).join('') : `
        <tr>
          <td colspan="6" style="padding: 32px; text-align: center; color: #64748b;">
            ✨ Belum ada aktivitas redirect 301 yang tercatat.
          </td>
        </tr>
      `;

      const html = `
        <!DOCTYPE html>
        <html lang="id">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>PENA 301 Redirects Monitor</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; color: #0f172a; margin: 0; padding: 32px 16px; }
            .container { max-width: 1100px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 20px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05); padding: 32px; }
            .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding-bottom: 20px; margin-bottom: 24px; }
            .badge { background: #fef3c7; color: #92400e; padding: 6px 14px; border-radius: 9999px; font-weight: 800; font-size: 12px; letter-spacing: 0.05em; }
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
                <span class="badge">301 REAL-TIME REDIRECT LOG</span>
                <h1 style="font-size: 24px; font-weight: 900; margin: 8px 0 0 0;">PENA Consultant 301 Redirect Monitor</h1>
              </div>
              <div style="display: flex; gap: 12px;">
                <a href="/api/log-404" style="color: #dc2626; font-weight: bold; text-decoration: none; font-size: 14px;">Lihat Log 404 &rarr;</a>
                <a href="/" style="color: #2563eb; font-weight: bold; text-decoration: none; font-size: 14px;">Beranda &rarr;</a>
              </div>
            </div>

            <div class="metrics">
              <div class="metric-card">
                <span style="font-size: 12px; color: #64748b; font-weight: 600;">Total URL 301 Unik</span>
                <div class="metric-num" style="color: #d97706;">${list.length}</div>
              </div>
              <div class="metric-card">
                <span style="font-size: 12px; color: #64748b; font-weight: 600;">Total Kumulatif 301 Hits</span>
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
                    <th>Legacy Source URL</th>
                    <th>Destination Target URL</th>
                    <th style="text-align: center; width: 80px;">Hits</th>
                    <th>Terakhir Dialihkan</th>
                    <th>Referrer Source</th>
                  </tr>
                </thead>
                <tbody>
                  ${rows}
                </tbody>
              </table>
            </div>

            <div style="margin-top: 24px; padding: 16px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; font-size: 13px; color: #64748b;">
              💡 <strong>Info Diagnostik:</strong> Endpoint API JSON juga dapat diakses secara langsung di <code>/api/log-301?format=json</code>.
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
      total_unique_redirect_paths: list.length,
      total_redirect_hits: totalHits,
      logs: list,
    }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error fetching 301 logs:', error);
    return NextResponse.json({
      total_unique_redirect_paths: 0,
      total_redirect_hits: 0,
      logs: [],
      error: 'Failed to retrieve 301 logs',
    }, {
      status: 500,
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  }
}
