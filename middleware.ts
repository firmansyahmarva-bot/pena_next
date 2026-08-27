import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import redirectMap from './lib/legacyRedirectsMap.json';

const map = redirectMap as Record<string, string>;

export function middleware(request: NextRequest) {
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
    const url = request.nextUrl.clone();
    // Check if target is external or internal
    if (target.startsWith('http')) {
      return NextResponse.redirect(target, 301);
    }
    url.pathname = target;
    return NextResponse.redirect(url, 301);
  }

  // Handle generic legacy wildcard prefixes
  if (pathname.startsWith('/artikel/')) {
    const slug = pathname.replace('/artikel/', '').replace(/\/$/, '');
    const url = request.nextUrl.clone();
    url.pathname = `/panduan/${slug}`;
    return NextResponse.redirect(url, 301);
  }

  if (pathname.startsWith('/blog/')) {
    const slug = pathname.replace('/blog/', '').replace(/\/$/, '');
    const url = request.nextUrl.clone();
    url.pathname = `/panduan/${slug}`;
    return NextResponse.redirect(url, 301);
  }

  if (pathname.startsWith('/post/')) {
    const slug = pathname.replace('/post/', '').replace(/\/$/, '');
    const url = request.nextUrl.clone();
    url.pathname = `/panduan/${slug}`;
    return NextResponse.redirect(url, 301);
  }

  if (pathname.startsWith('/training/')) {
    const slug = pathname.replace('/training/', '').replace(/\/$/, '');
    const url = request.nextUrl.clone();
    url.pathname = `/pelatihan/${slug}`;
    return NextResponse.redirect(url, 301);
  }

  if (pathname.startsWith('/kursus/')) {
    const slug = pathname.replace('/kursus/', '').replace(/\/$/, '');
    const url = request.nextUrl.clone();
    url.pathname = `/pelatihan/${slug}`;
    return NextResponse.redirect(url, 301);
  }

  if (pathname.startsWith('/layanan/')) {
    const slug = pathname.replace('/layanan/', '').replace(/\/$/, '');
    const url = request.nextUrl.clone();
    url.pathname = `/pelatihan/${slug}`;
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