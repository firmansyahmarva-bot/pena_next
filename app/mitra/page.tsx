import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Building2, ShieldCheck, Award, ArrowRight, Calendar, Users, CheckCircle2 } from 'lucide-react';
import mitraData from '@/content/global/mitra.json';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://penaconsultant.com/mitra',
  },
  title: 'Klien & Portofolio Corporate Training K3 Terpercaya | PENA Consultant',
  description: 'Daftar 50+ perusahaan BUMN, multinasional minyak & gas, pertambangan, EPC, dan manufaktur yang mempercayakan in-house training K3 kepada PENA Consultant.',
  openGraph: {
    title: 'Klien & Portofolio Corporate Training K3 Terpercaya | PENA Consultant',
    description: 'Daftar 50+ perusahaan BUMN, multinasional minyak & gas, pertambangan, EPC, dan manufaktur yang mempercayakan in-house training K3 kepada PENA Consultant.',
    url: 'https://penaconsultant.com/mitra',
    siteName: 'PENA Consultant',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: 'https://penaconsultant.com/images/og-share-card.png', width: 1200, height: 630, alt: 'Portofolio Mitra & Klien PENA Consultant' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Klien & Portofolio Corporate Training K3 Terpercaya | PENA Consultant',
    description: 'Daftar 50+ perusahaan BUMN, multinasional minyak & gas, pertambangan, EPC, dan manufaktur yang mempercayakan in-house training K3 kepada PENA Consultant.',
    images: ['https://penaconsultant.com/images/og-share-card.png'],
  },
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
      <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4" /> PORTOFOLIO KORPORASI &amp; MITRA RESMI
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Dipercaya Oleh 500+ Perusahaan Terkemuka di Indonesia
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Dari hulu migas lepas pantai, tambang bawah tanah, pembangkit listrik, pabrik kimia pupuk, hingga kampus riset terdepan. Lihat rekam jejak pelatihan K3 in-house kami.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 text-left">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-2xl font-black text-blue-600 block">54+</span>
              <span className="text-xs font-medium text-slate-600">Enterprise Case Studies</span>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-2xl font-black text-emerald-600 block">100%</span>
              <span className="text-xs font-medium text-slate-600">Sertifikasi Terverifikasi</span>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-2xl font-black text-amber-600 block">Zero LTI</span>
              <span className="text-xs font-medium text-slate-600">Komitmen Keselamatan</span>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-2xl font-black text-purple-600 block">In-House</span>
              <span className="text-xs font-medium text-slate-600">Onsite Seluruh Indonesia</span>
            </div>
          </div>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mitraList.map((m) => (
            <Link
              key={m.slug || m.id}
              href={`/mitra/${m.slug}`}
              className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 line-clamp-1">
                    {m.sector || 'Korporasi'}
                  </span>
                  {m.cooperation_period && (
                    <span className="text-[10px] font-semibold text-slate-400">
                      {m.cooperation_period.split(' ')[0]}
                    </span>
                  )}
                </div>

                <h2 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-2">
                  {m.name}
                </h2>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                  {m.cooperation_summary}
                </p>

                {m.training_delivered && m.training_delivered.length > 0 && (
                  <div className="space-y-1 mb-4 border-t border-slate-100 pt-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Fokus Pelatihan:</span>
                    <div className="text-xs text-slate-700 font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="line-clamp-1">{m.training_delivered[0].title}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                <span>Lihat Studi Kasus &amp; Silabus</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}