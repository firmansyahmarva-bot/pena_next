import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';
import { getLocations } from '@/lib/data';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://penaconsultant.com/cabang',
  },
  title: 'Jaringan Tempat Uji Kompetensi (TUK) di 23 Kota — PENA Consultant',
  description: 'Penyelenggaraan pelatihan dan uji kompetensi sertifikasi K3 di 23 kota di Indonesia. Fasilitas laboratorium, workshop praktikum, dan instruktur lokal.',
  openGraph: {
    title: 'Jaringan Tempat Uji Kompetensi (TUK) di 23 Kota — PENA Consultant',
    description: 'Penyelenggaraan pelatihan dan uji kompetensi sertifikasi K3 di 23 kota di Indonesia. Fasilitas laboratorium, workshop praktikum, dan instruktur lokal.',
    url: 'https://penaconsultant.com/cabang',
    siteName: 'PENA Consultant',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: 'https://penaconsultant.com/images/og-share-card.png', width: 1200, height: 630, alt: 'Jaringan Tempat Uji Kompetensi (TUK) di 23 Kota — PENA Consultant' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jaringan Tempat Uji Kompetensi (TUK) di 23 Kota — PENA Consultant',
    description: 'Penyelenggaraan pelatihan dan uji kompetensi sertifikasi K3 di 23 kota di Indonesia. Fasilitas laboratorium, workshop praktikum, dan instruktur lokal.',
    images: ['https://penaconsultant.com/images/og-share-card.png'],
  },
};

export default function CabangHubPage() {
  const locations = getLocations();

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="max-w-3xl">
        <span className="text-xs uppercase font-bold tracking-widest text-primary-700 block mb-2 flex items-center gap-1.5">
          <MapPin className="w-4 h-4" /> JARINGAN LOKASI TUK
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Cabang &amp; Tempat Uji Kompetensi K3
        </h1>
        <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
          Temukan lokasi kantor perwakilan, pusat pelatihan praktikum laboratorium, dan tempat uji kompetensi sertifikasi K3 di berbagai wilayah Indonesia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((loc) => (
          <article key={loc.slug} className="bg-white p-6 rounded-xl border border-slate-200 hover:border-primary-500 hover:shadow-lg transition-all space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary-600" />
              <h2 className="text-lg font-bold text-slate-900">{loc.name}</h2>
            </div>
            {loc.address && <p className="text-xs text-slate-600 leading-relaxed">{loc.address}</p>}
            <Link href={`/cabang/${loc.slug}`} className="text-xs font-bold text-primary-700 hover:underline block">
              Lihat Jadwal &amp; Info Cabang {loc.name} →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}