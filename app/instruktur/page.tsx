import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { UserCheck, Award, Shield, BookOpen, Star } from 'lucide-react';
import instructorsData from '@/content/global/instructors.json';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://penaconsultant.com/instruktur',
  },
  title: 'Dewan Instruktur & Master Trainer K3 Resmi — PENA Consultant',
  description: 'Tim instruktur ahli berlisensi Kemnaker RI dan asesor kompetensi BNSP dengan pengalaman praktis puluhan tahun di industri minyak, gas, dan manufaktur.',
  openGraph: {
    title: 'Dewan Instruktur & Master Trainer K3 Resmi — PENA Consultant',
    description: 'Tim instruktur ahli berlisensi Kemnaker RI dan asesor kompetensi BNSP dengan pengalaman praktis puluhan tahun di industri minyak, gas, dan manufaktur.',
    url: 'https://penaconsultant.com/instruktur',
    siteName: 'PENA Consultant',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: 'https://penaconsultant.com/images/og-share-card.png', width: 1200, height: 630, alt: 'Dewan Instruktur & Master Trainer K3 Resmi — PENA Consultant' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dewan Instruktur & Master Trainer K3 Resmi — PENA Consultant',
    description: 'Tim instruktur ahli berlisensi Kemnaker RI dan asesor kompetensi BNSP dengan pengalaman praktis puluhan tahun di industri minyak, gas, dan manufaktur.',
    images: ['https://penaconsultant.com/images/og-share-card.png'],
  },
};

export default function InstrukturHubPage() {
  const instructors = (instructorsData as any[]).filter(i => i.role === 'instructor');
  const breadcrumbs = [
    { name: 'Home', url: 'https://penaconsultant.com' },
    { name: 'Instruktur K3', url: 'https://penaconsultant.com/instruktur' },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <nav className="text-xs font-semibold text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-primary-700">Home</Link>
          <span>/</span>
          <span className="text-slate-900">Instruktur K3</span>
        </nav>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <span className="text-xs font-bold uppercase text-primary-700 bg-primary-50 px-3 py-1 rounded-md inline-flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5" /> DEWAN PAKAR &amp; INSTRUKTUR SENIOR
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
            Tim Pengajar &amp; Asesor Bersertifikasi Kemnaker RI &amp; BNSP
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Seluruh program pembinaan di PENA Consultant dipandu oleh praktisi berlisensi, Lead Auditor SMK3, dan Asesor Kompetensi yang berpengalaman mendampingi ratusan korporasi multinasional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructors.map((inst) => (
            <Link
              key={inst.slug || inst.id}
              href={`/instruktur/${inst.slug}`}
              className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary-500 hover:shadow-md transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-800 to-primary-950 text-white font-black text-lg flex items-center justify-center shadow-md">
                  {inst.name.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
                </div>
                <div className="space-y-1">
                  <h2 className="text-base font-bold text-slate-900">{inst.name}</h2>
                  <p className="text-xs font-semibold text-primary-700">Instruktur Senior &amp; Asesor K3</p>
                </div>
              </div>
              <span className="text-xs font-bold text-primary-700 flex items-center gap-1 pt-3 border-t border-slate-100">
                Lihat Profil Lengkap →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}