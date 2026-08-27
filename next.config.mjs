import fs from 'fs';
import path from 'path';

// Load compiled 3,332 legacy redirects
let legacyRedirects = [];
try {
  const redirectsFile = path.join(process.cwd(), 'scripts', 'generated_legacy_redirects.json');
  if (fs.existsSync(redirectsFile)) {
    legacyRedirects = JSON.parse(fs.readFileSync(redirectsFile, 'utf8'));
  }
} catch (e) {
  console.error('Error loading legacy redirects:', e);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  staticPageGenerationTimeout: 300,
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
  async redirects() {
    return legacyRedirects;
  },
};

export default nextConfig;