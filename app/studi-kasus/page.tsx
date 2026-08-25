import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, CheckCircle2, Shield, ArrowRight } from 'lucide-react';
import caseStudiesData from '@/content/global/case_studies.json';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Studi Kasus Implementasi K3 Industri — PENA Consultant',
  description: 'Studi kasus nyata penerapan Sistem Manajemen K3 (SMK3 PP 50/2012), penanganan gas beracun H2S, dan audit K3 di berbagai industri nasional.',
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
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <nav className="text-xs font-semibold text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-primary-700">Home</Link>
          <span>/</span>
          <span className="text-slate-900">Studi Kasus K3</span>
        </nav>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <span className="text-xs font-bold uppercase text-primary-700 bg-primary-50 px-3 py-1 rounded-md inline-flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" /> BUKTI IMPLEMENTASI LAPANGAN
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
            Studi Kasus Kepatuhan &amp; Penerapan K3 Industri
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Analisis implementasi riil sistem keselamatan kerja, pencegahan fatality, dan perbaikan lingkungan kerja di berbagai sektor industri berisiko tinggi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((cs) => (
            <Link
              key={cs.slug || cs.id}
              href={`/studi-kasus/${cs.slug}`}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 hover:border-primary-500 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <span className="bg-primary-50 text-primary-700 font-bold text-xs px-2.5 py-1 rounded-md inline-block">
                  Studi Kasus Industri
                </span>
                <h2 className="text-lg font-bold text-slate-900">{cs.title}</h2>
                {cs.summary && (
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{cs.summary}</p>
                )}
              </div>
              <span className="text-xs font-bold text-primary-700 flex items-center gap-1 pt-3 border-t border-slate-100">
                Baca Studi Kasus Lengkap →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}