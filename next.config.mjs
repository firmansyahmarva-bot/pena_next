/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
            value: 'camera=(), microphone=(), geolocation=()',
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
      {
        source: '/konsultasi/:slug*',
        destination: '/pelatihan',
        permanent: true,
      },
      {
        source: '/faq/:slug*',
        destination: '/faq',
        permanent: true,
      },
      // Article / Blog Legacy Paths -> /panduan/:slug
      {
        source: '/artikel/:slug*',
        destination: '/panduan/:slug*',
        permanent: true,
      },
      {
        source: '/blog/:slug*',
        destination: '/panduan/:slug*',
        permanent: true,
      },
      {
        source: '/post/:slug*',
        destination: '/panduan/:slug*',
        permanent: true,
      },
      {
        source: '/news/:slug*',
        destination: '/panduan/:slug*',
        permanent: true,
      },
      // Program / Training / Service Legacy Paths -> /pelatihan/:slug
      {
        source: '/training/:slug*',
        destination: '/pelatihan/:slug*',
        permanent: true,
      },
      {
        source: '/kursus/:slug*',
        destination: '/pelatihan/:slug*',
        permanent: true,
      },
      {
        source: '/layanan',
        destination: '/pelatihan',
        permanent: true,
      },
      {
        source: '/layanan/:slug*',
        destination: '/pelatihan/:slug*',
        permanent: true,
      },
      {
        source: '/program/:slug*',
        destination: '/pelatihan/:slug*',
        permanent: true,
      },
      {
        source: '/services/:slug*',
        destination: '/pelatihan/:slug*',
        permanent: true,
      },
      {
        source: '/courses/:slug*',
        destination: '/pelatihan/:slug*',
        permanent: true,
      },
      // Schedule / Batches Legacy Paths -> /jadwal/:slug
      {
        source: '/schedule/:slug*',
        destination: '/jadwal/:slug*',
        permanent: true,
      },
      {
        source: '/kalender/:slug*',
        destination: '/jadwal/:slug*',
        permanent: true,
      },
      // Locations / Branches Legacy Paths -> /cabang/:slug
      {
        source: '/locations/:slug*',
        destination: '/cabang/:slug*',
        permanent: true,
      },
      {
        source: '/branch/:slug*',
        destination: '/cabang/:slug*',
        permanent: true,
      },
      {
        source: '/kota/:slug*',
        destination: '/cabang/:slug*',
        permanent: true,
      },
      // Industries Legacy Paths -> /industri/:slug
      {
        source: '/industries/:slug*',
        destination: '/industri/:slug*',
        permanent: true,
      },
      {
        source: '/sektor/:slug*',
        destination: '/industri/:slug*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;