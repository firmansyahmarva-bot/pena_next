/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
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