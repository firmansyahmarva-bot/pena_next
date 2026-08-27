import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Award, Users, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://penaconsultant.com/tentang',
  },
  title: 'Tentang PENA Consultant — PJK3 Resmi & TUK Terlisensi',
  description: 'Profil PT Pusat Edukasi Nasional (PENA Consultant). Visi, misi, legalitas SKP PJK3 Kemnaker RI, dan akreditasi TUK BNSP.',
  openGraph: {
    title: 'Tentang PENA Consultant — PJK3 Resmi & TUK Terlisensi',
    description: 'Profil PT Pusat Edukasi Nasional (PENA Consultant). Visi, misi, legalitas SKP PJK3 Kemnaker RI, dan akreditasi TUK BNSP.',
    url: 'https://penaconsultant.com/tentang',
    siteName: 'PENA Consultant',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: 'https://penaconsultant.com/images/og-share-card.png', width: 1200, height: 630, alt: 'Tentang PENA Consultant — PJK3 Resmi & TUK Terlisensi' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tentang PENA Consultant — PJK3 Resmi & TUK Terlisensi',
    description: 'Profil PT Pusat Edukasi Nasional (PENA Consultant). Visi, misi, legalitas SKP PJK3 Kemnaker RI, dan akreditasi TUK BNSP.',
    images: ['https://penaconsultant.com/images/og-share-card.png'],
  },
};

export default function TentangPage() {
  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <span className="text-xs font-bold uppercase text-primary-700 bg-primary-50 px-3 py-1 rounded-md inline-block">
          PROFIL PERUSAHAAN
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900">
          Tentang PT PENA Consultant
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          PENA Consultant hadir sebagai Lembaga Jasa Keselamatan dan Kesehatan Kerja (PJK3) terakreditasi resmi Kementerian Ketenagakerjaan Republik Indonesia (Kemnaker RI) dan Tempat Uji Kompetensi (TUK) Lembaga Sertifikasi Profesi (LSP) BNSP untuk melayani kebutuhan sertifikasi kompetensi tenaga kerja di seluruh wilayah Indonesia.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
          <Shield className="w-8 h-8 text-primary-700" />
          <h3 className="font-bold text-slate-900 text-base">Terakreditasi Kemnaker RI</h3>
          <p className="text-xs text-slate-600">Surat Keputusan Penunjukan PJK3 resmi di bidang Pembinaan K3.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
          <Award className="w-8 h-8 text-primary-700" />
          <h3 className="font-bold text-slate-900 text-base">TUK Lisensi BNSP</h3>
          <p className="text-xs text-slate-600">Tempat Uji Kompetensi resmi berlisensi Badan Nasional Sertifikasi Profesi.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
          <Users className="w-8 h-8 text-primary-700" />
          <h3 className="font-bold text-slate-900 text-base">23 Cabang di Seluruh Indonesia</h3>
          <p className="text-xs text-slate-600">Jaringan TUK dan fasilitas praktikum di kota-kota industri utama.</p>
        </div>
      </div>
    </div>
  );
}