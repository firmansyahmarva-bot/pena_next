import { NextResponse } from 'next/server';
import { getPrograms, getBatches, getLocations, getIndustries } from '@/lib/data';

export const dynamic = 'force-static';

export async function GET() {
  const programs = getPrograms().map(p => ({
    name: p.name,
    slug: p.slug,
    url: `https://penaconsultant.com/pelatihan/${p.slug}`,
    certification_body: p.certification_body,
    duration: p.duration,
    base_price: p.base_price,
    summary: p.summary,
  }));

  const locations = getLocations().map(l => ({
    name: l.name,
    slug: l.slug,
    url: `https://penaconsultant.com/cabang/${l.slug}`,
    address: l.address,
    service_areas: l.service_areas,
  }));

  const data = {
    provider: {
      name: 'PENA Consultant',
      legal_name: 'PT PENA Consultant (Pusat Edukasi Nasional)',
      website: 'https://penaconsultant.com',
      accreditations: [
        'PJK3 Resmi Ditjen Binwasnaker & K3 Kemnaker RI (SKP 5/124/AS.02.04/I/2023)',
        'Tempat Uji Kompetensi (TUK) Berlisensi BNSP RI',
      ],
      hotline: '+62 812-9687-0884',
      email: 'info@penaconsultant.com',
    },
    programs_count: programs.length,
    programs,
    locations_count: locations.length,
    locations,
    regulations: [
      { code: 'UU 1/1970', name: 'Undang-Undang Keselamatan Kerja' },
      { code: 'PP 50/2012', name: 'Penerapan Sistem Manajemen K3 (SMK3)' },
      { code: 'Permenaker 05/2018', name: 'K3 Lingkungan Kerja' },
      { code: 'Permenaker 08/2020', name: 'K3 Pesawat Angkat dan Pesawat Angkut' },
      { code: 'Permenaker 12/2015', name: 'K3 Listrik di Tempat Kerja' },
    ],
  };

  return NextResponse.json(data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}