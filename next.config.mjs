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
    return [
      {
        source: '/tryout-k3',
        destination: '/pelatihan/ahli-k3-umum/tryout',
        permanent: true,
      },
      {
        source: '/tryout',
        destination: '/pelatihan/ahli-k3-umum/tryout',
        permanent: true,
      },
      {
        source: '/klien',
        destination: '/mitra',
        permanent: true,
      },
      {
        source: '/pelatihan-inhouse',
        destination: '/pelatihan',
        permanent: true,
      },
      {
        source: '/pelatihan-online',
        destination: '/webinar',
        permanent: true,
      },
      {
        source: '/sertifikasi-bnsp',
        destination: '/pelatihan',
        permanent: true,
      },
      {
        source: '/sertifikasi-kemnaker',
        destination: '/pelatihan',
        permanent: true,
      },
      {
        source: '/konsultasi',
        destination: '/pelatihan',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;