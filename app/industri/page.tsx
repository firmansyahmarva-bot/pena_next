import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Building2 } from 'lucide-react';
import { getIndustries } from '@/lib/data';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://penaconsultant.com/industri',
  },
  title: 'Solusi K3 Sektoral per Industri — PENA Consultant',
  description: 'Panduan kepatuhan K3, regulasi spesifik, dan program sertifikasi resmi untuk sektor Konstruksi, Migas, Manufaktur, Pertambangan, dan Rumah Sakit.',
};

export default function IndustriHubPage() {
  const industries = getIndustries();

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="max-w-3xl">
        <span className="text-xs uppercase font-bold tracking-widest text-primary-700 block mb-2 flex items-center gap-1.5">
          <Building2 className="w-4 h-4" /> KEPATUHAN SEKTORAL
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Solusi K3 per Sektor Industri
        </h1>
        <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
          Setiap sektor memiliki potensi bahaya kerja dan regulasi undang-undang yang spesifik. Pilih sektor bisnis Anda untuk melihat skema sertifikasi yang wajib dipenuhi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industries.map((ind) => (
          <Link
            key={ind.slug}
            href={`/industri/${ind.slug}`}
            className="bg-white p-6 rounded-xl border border-slate-200 hover:border-primary-500 hover:shadow-lg transition-all group block"
          >
            <Building2 className="w-8 h-8 text-primary-600 mb-3 group-hover:scale-110 transition-transform" />
            <h2 className="text-xl font-bold text-slate-900 group-hover:text-primary-700 mb-2">{ind.name}</h2>
            <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{ind.description}</p>
            <span className="text-xs font-bold text-primary-700 mt-4 inline-block">Lihat Program Wajib Sektor {ind.name} →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}