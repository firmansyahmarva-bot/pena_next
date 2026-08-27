import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://penaconsultant.com/kebijakan-privasi',
  },
  title: 'Kebijakan Privasi — PENA Consultant',
  description: 'Kebijakan perlindungan data pribadi dan privasi peserta pelatihan serta mitra korporat di portal resmi PENA Consultant.',
  openGraph: {
    title: 'Kebijakan Privasi — PENA Consultant',
    description: 'Kebijakan perlindungan data pribadi dan privasi peserta pelatihan serta mitra korporat di portal resmi PENA Consultant.',
    url: 'https://penaconsultant.com/kebijakan-privasi',
    siteName: 'PENA Consultant',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: 'https://penaconsultant.com/images/og-share-card.png', width: 1200, height: 630, alt: 'Kebijakan Privasi — PENA Consultant' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kebijakan Privasi — PENA Consultant',
    description: 'Kebijakan perlindungan data pribadi dan privasi peserta pelatihan serta mitra korporat di portal resmi PENA Consultant.',
    images: ['https://penaconsultant.com/images/og-share-card.png'],
  },
};

export default function KebijakanPrivasiPage() {
  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h1 className="text-3xl font-black text-slate-900">Kebijakan Privasi</h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          PT PENA Consultant berkomitmen melindungi privasi data pribadi peserta pelatihan, mitra korporasi, dan pengunjung situs sesuai dengan ketentuan perundang-undangan yang berlaku di Republik Indonesia (UU Perlindungan Data Pribadi No. 27 Tahun 2022).
        </p>
        <div className="space-y-4 text-xs sm:text-sm text-slate-700">
          <h2 className="text-base font-bold text-slate-900">1. Pengumpulan Data</h2>
          <p>Data pribadi yang dikumpulkan meliputi Nama, Nomor WhatsApp, Email, dan data institusi saat Anda mendaftar pelatihan, webinar, tryout, atau meminta penawaran korporat.</p>
          <h2 className="text-base font-bold text-slate-900">2. Penggunaan Informasi</h2>
          <p>Informasi digunakan semata-mata untuk verifikasi pendaftaran ujian, penerbitan sertifikat resmi Kemnaker RI / BNSP, dan pengiriman jadwal pelatihan.</p>
        </div>
      </div>
    </div>
  );
}