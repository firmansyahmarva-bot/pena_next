import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Building2, Shield, Award, CheckCircle2 } from 'lucide-react';
import mitraData from '@/content/global/mitra.json';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://penaconsultant.com/mitra',
  },
  title: 'Mitra & Klien Korporasi — PENA Consultant',
  description: 'Daftar perusahaan BUMN, multinasional, dan kontraktor nasional yang mempercayakan pelatihan K3 dan sertifikasi tenaga kerja kepada PENA Consultant.',
};

export default function MitraHubPage() {
  const mitraList = mitraData as any[];
  const breadcrumbs = [
    { name: 'Home', url: 'https://penaconsultant.com' },
    { name: 'Mitra & Klien', url: 'https://penaconsultant.com/mitra' },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <nav className="text-xs font-semibold text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-primary-700">Home</Link>
          <span>/</span>
          <span className="text-slate-900">Mitra &amp; Klien</span>
        </nav>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <span className="text-xs font-bold uppercase text-primary-700 bg-primary-50 px-3 py-1 rounded-md inline-flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5" /> REKAM JEJAK KORPORASI
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
            Dipercaya Oleh 500+ Perusahaan Terkemuka di Indonesia
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Mulai dari industri hulu migas, pembangkit listrik, manufaktur berat, pertambangan nikel, hingga perbankan nasional.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {mitraList.map((m) => (
            <Link
              key={m.slug || m.id}
              href={`/mitra/${m.slug}`}
              className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary-500 hover:shadow-md transition-all flex flex-col justify-between space-y-3 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 font-bold flex items-center justify-center mx-auto text-sm">
                <Building2 className="w-6 h-6 text-primary-700" />
              </div>
              <h2 className="text-sm font-bold text-slate-900">{m.name}</h2>
              <span className="text-[11px] font-bold text-primary-700">Lihat Detail Mitra →</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}