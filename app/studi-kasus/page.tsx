import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, CheckCircle2, ShieldCheck, ArrowRight, TrendingUp, Building2 } from 'lucide-react';
import caseStudiesData from '@/content/global/case_studies.json';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://penaconsultant.com/studi-kasus',
  },
  title: 'Studi Kasus & Bukti Implementasi K3 Industri | PENA Consultant',
  description: '12+ studi kasus nyata penerapan SMK3 PP 50/2012, penanganan bahaya gas H2S migas, keselamatan boiler petrokimia, dan proteksi gedung bertingkat.',
  openGraph: {
    title: 'Studi Kasus & Bukti Implementasi K3 Industri | PENA Consultant',
    description: '12+ studi kasus nyata penerapan SMK3 PP 50/2012, penanganan bahaya gas H2S migas, keselamatan boiler petrokimia, dan proteksi gedung bertingkat.',
    url: 'https://penaconsultant.com/studi-kasus',
    siteName: 'PENA Consultant',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: 'https://penaconsultant.com/images/og-share-card.png', width: 1200, height: 630, alt: 'Studi Kasus K3 PENA Consultant' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studi Kasus & Bukti Implementasi K3 Industri | PENA Consultant',
    description: '12+ studi kasus nyata penerapan SMK3 PP 50/2012, penanganan bahaya gas H2S migas, keselamatan boiler petrokimia, dan proteksi gedung bertingkat.',
    images: ['https://penaconsultant.com/images/og-share-card.png'],
  },
};

export default function CaseStudiesHubPage() {
  const caseStudies = caseStudiesData as any[];
  const breadcrumbs = [
    { name: 'Home', url: 'https://penaconsultant.com' },
    { name: 'Studi Kasus K3', url: 'https://penaconsultant.com/studi-kasus' },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <FileText className="w-4 h-4" /> BUKTI IMPLEMENTASI LAPANGAN
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Studi Kasus Kepatuhan &amp; Penerapan K3 Industri
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Analisis implementasi nyata sistem keselamatan kerja, mitigasi risiko fatality, dan pembuktian kepatuhan regulasi di berbagai sektor industri berisiko tinggi di Indonesia.
          </p>

          {/* Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 text-left">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-2xl font-black text-blue-600 block">12+</span>
              <span className="text-xs font-medium text-slate-600">Sektor Industri Nyata</span>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-2xl font-black text-emerald-600 block">100%</span>
              <span className="text-xs font-medium text-slate-600">Standar Kemnaker &amp; BNSP</span>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-2xl font-black text-amber-600 block">Zero Accident</span>
              <span className="text-xs font-medium text-slate-600">Target Keselamatan</span>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-2xl font-black text-purple-600 block">Gold Flag</span>
              <span className="text-xs font-medium text-slate-600">Audit SMK3 PP 50/2012</span>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((cs) => (
            <Link
              key={cs.slug || cs.id}
              href={`/studi-kasus/${cs.slug}`}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="bg-blue-50 text-blue-700 font-bold text-[11px] px-2.5 py-1 rounded-md border border-blue-100 uppercase tracking-wider">
                    Studi Kasus K3
                  </span>
                  {cs.client_anonymized && (
                    <span className="text-[10px] text-slate-400 font-semibold line-clamp-1 max-w-[150px]">
                      {cs.client_anonymized}
                    </span>
                  )}
                </div>

                <h2 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-3">
                  {cs.title}
                </h2>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                  {cs.summary || cs.problem?.blocks?.[0]?.data?.text || 'Analisis implementasi K3 industri nyata.'}
                </p>

                {cs.outcome_metrics && Object.keys(cs.outcome_metrics).length > 0 && (
                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-4">
                    {Object.entries(cs.outcome_metrics).slice(0, 2).map(([k, v]: [string, any], idx: number) => (
                      <div key={idx} className="text-left">
                        <span className="text-[10px] text-slate-400 font-medium block truncate">{k}</span>
                        <span className="text-xs font-bold text-emerald-700 truncate block">{String(v)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                <span>Baca Analisis Lengkap</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}