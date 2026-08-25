import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  const spec = {
    openapi: '3.0.1',
    info: {
      title: 'PENA Consultant K3 Knowledge & Certification API',
      description: 'API resmi untuk mengambil data kurikulum, jadwal, biaya pelatihan, dan regulasi K3 Kemnaker RI & BNSP di Indonesia.',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'https://penaconsultant.com',
      },
    ],
    paths: {
      '/api/k3-data': {
        get: {
          operationId: 'getK3Data',
          summary: 'Mengambil daftar lengkap program pembinaan K3, jadwal, dan cabang TUK di Indonesia',
          responses: {
            '200': {
              description: 'Data pembinaan K3 lengkap',
              content: {
                'application/json': {},
              },
            },
          },
        },
      },
    },
  };

  return NextResponse.json(spec, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}