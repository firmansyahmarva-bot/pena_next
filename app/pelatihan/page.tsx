import React from 'react';
import type { Metadata } from 'next';
import { getPrograms } from '@/lib/data';
import OfferingCard from '@/components/OfferingCard';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://penaconsultant.com/pelatihan',
  },
  title: 'Katalog Program Pelatihan & Sertifikasi K3 Resmi Kemnaker RI & BNSP',
  description: 'Daftar lengkap 70+ program pelatihan dan sertifikasi K3 resmi di Indonesia. Ahli K3 Umum, K3 Listrik, Konstruksi, Kebakaran, Ruang Terbatas, Alat Berat & BNSP.',
  openGraph: {
    title: 'Katalog Program Pelatihan & Sertifikasi K3 Resmi Kemnaker RI & BNSP',
    description: 'Daftar lengkap 70+ program pelatihan dan sertifikasi K3 resmi di Indonesia. Ahli K3 Umum, K3 Listrik, Konstruksi, Kebakaran, Ruang Terbatas, Alat Berat & BNSP.',
    url: 'https://penaconsultant.com/pelatihan',
    siteName: 'PENA Consultant',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: 'https://penaconsultant.com/images/og-share-card.png', width: 1200, height: 630, alt: 'Katalog Pelatihan K3 PENA Consultant' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Katalog Program Pelatihan & Sertifikasi K3 Resmi Kemnaker RI & BNSP',
    description: 'Daftar lengkap 70+ program pelatihan dan sertifikasi K3 resmi di Indonesia. Ahli K3 Umum, K3 Listrik, Konstruksi, Kebakaran, Ruang Terbatas, Alat Berat & BNSP.',
    images: ['https://penaconsultant.com/images/og-share-card.png'],
  },
};

export default function PelatihanHubPage() {
  const programs = getPrograms();

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <span className="text-xs uppercase font-bold tracking-widest text-primary-700 block mb-2 flex items-center gap-1.5">
          <Shield className="w-4 h-4" /> KATALOG PROGRAM LENGKAP
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Program Pelatihan &amp; Sertifikasi K3
        </h1>
        <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
          Temukan program sertifikasi kompetensi profesi dan lisensi resmi Kemnaker RI &amp; BNSP sesuai kebutuhan karir atau kepatuhan regulasi perusahaan Anda.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {programs.map((p) => (
          <OfferingCard key={p.slug} program={p} />
        ))}
      </div>
    </div>
  );
}