import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import redirectMap from './lib/legacyRedirectsMap.json';
import { Redis } from '@upstash/redis';

const map = redirectMap as Record<string, string>;

const redisUrl =
  process.env.api404_KV_REST_API_URL ||
  process.env.KV_REST_API_URL ||
  process.env.UPSTASH_REDIS_REST_URL;
const redisToken =
  process.env.api404_KV_REST_API_TOKEN ||
  process.env.KV_REST_API_TOKEN ||
  process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

async function logRedirect(sourcePath: string, targetPath: string, req: NextRequest) {
  if (!redis) return;
  const referrer = req.headers.get('referer') || 'direct';
  const now = new Date().toISOString();

  try {
    const existing = await redis.hget<{
      source_path: string;
      target_path: string;
      hits: number;
      first_seen: string;
      last_seen: string;
      referrers: string[];
    }>('pena:301_logs', sourcePath);

    if (existing && typeof existing === 'object') {
      const referrers = Array.isArray(existing.referrers) ? existing.referrers : [];
      if (!referrers.includes(referrer)) referrers.push(referrer);

      await redis.hset('pena:301_logs', {
        [sourcePath]: {
          source_path: sourcePath,
          target_path: targetPath,
          hits: (existing.hits || 0) + 1,
          first_seen: existing.first_seen || existing.last_seen || now,
          last_seen: now,
          referrers: referrers.slice(-20),
        },
      });
    } else {
      await redis.hset('pena:301_logs', {
        [sourcePath]: {
          source_path: sourcePath,
          target_path: targetPath,
          hits: 1,
          first_seen: now,
          last_seen: now,
          referrers: [referrer],
        },
      });
    }
  } catch {
    // Ignore logging errors to ensure redirect is never blocked
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore static assets, api, and internal Next.js files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Exact match or match without trailing slash
  const target = map[pathname] || (pathname.endsWith('/') && pathname.length > 1 ? map[pathname.slice(0, -1)] : null);

  if (target) {
    await logRedirect(pathname, target, request);
    if (target.startsWith('http')) {
      return NextResponse.redirect(target, 301);
    }
    const url = request.nextUrl.clone();
    url.pathname = target;
    return NextResponse.redirect(url, 301);
  }

  // Handle generic legacy wildcard prefixes
  if (pathname.startsWith('/artikel/')) {
    const slug = pathname.replace('/artikel/', '').replace(/\/$/, '');
    const targetPath = `/panduan/${slug}`;
    await logRedirect(pathname, targetPath, request);
    const url = request.nextUrl.clone();
    url.pathname = targetPath;
    return NextResponse.redirect(url, 301);
  }

  if (pathname.startsWith('/blog/')) {
    const slug = pathname.replace('/blog/', '').replace(/\/$/, '');
    const targetPath = `/panduan/${slug}`;
    await logRedirect(pathname, targetPath, request);
    const url = request.nextUrl.clone();
    url.pathname = targetPath;
    return NextResponse.redirect(url, 301);
  }

  if (pathname.startsWith('/post/')) {
    const slug = pathname.replace('/post/', '').replace(/\/$/, '');
    const targetPath = `/panduan/${slug}`;
    await logRedirect(pathname, targetPath, request);
    const url = request.nextUrl.clone();
    url.pathname = targetPath;
    return NextResponse.redirect(url, 301);
  }

  if (pathname.startsWith('/training/')) {
    const slug = pathname.replace('/training/', '').replace(/\/$/, '');
    const targetPath = `/pelatihan/${slug}`;
    await logRedirect(pathname, targetPath, request);
    const url = request.nextUrl.clone();
    url.pathname = targetPath;
    return NextResponse.redirect(url, 301);
  }

  if (pathname.startsWith('/kursus/')) {
    const slug = pathname.replace('/kursus/', '').replace(/\/$/, '');
    const targetPath = `/pelatihan/${slug}`;
    await logRedirect(pathname, targetPath, request);
    const url = request.nextUrl.clone();
    url.pathname = targetPath;
    return NextResponse.redirect(url, 301);
  }

  if (pathname.startsWith('/layanan/')) {
    const slug = pathname.replace('/layanan/', '').replace(/\/$/, '');
    const targetPath = `/pelatihan/${slug}`;
    await logRedirect(pathname, targetPath, request);
    const url = request.nextUrl.clone();
    url.pathname = targetPath;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt, etc.
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images).*)',
  ],
};
