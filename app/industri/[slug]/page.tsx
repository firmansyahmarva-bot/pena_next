import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Building2, Shield, Scale, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { getIndustries, getIndustryBySlug, getPrograms, getWaLink } from '@/lib/data';
import OfferingCard from '@/components/OfferingCard';
import StructuredContent from '@/components/StructuredContent';
import CorporateQuoteForm from '@/components/CorporateQuoteForm';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export async function generateStaticParams() {
  return getIndustries().map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  const pageTitle = industry.meta_title || `Solusi K3 Sektor ${industry.name} 2026 — Pelatihan & Sertifikasi Resmi`;
  const pageDesc = industry.meta_description || industry.description || `Panduan kepatuhan regulasi K3 dan program pembinaan sertifikasi profesi untuk sektor industri ${industry.name}.`;
  const pageUrl = `https://penaconsultant.com/industri/${slug}`;
  return {
    alternates: { canonical: pageUrl },
    title: pageTitle,
    description: pageDesc,
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: pageUrl,
      siteName: 'PENA Consultant',
      locale: 'id_ID',
      type: 'website',
      images: [{ url: 'https://penaconsultant.com/images/og-share-card.png', width: 1200, height: 630, alt: pageTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDesc,
      images: ['https://penaconsultant.com/images/og-share-card.png'],
    },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const allPrograms = getPrograms();
  const relevantOfferings = allPrograms.filter(p => industry.relevant_offering_slugs?.includes(p.slug));
  const fallbackOfferings = relevantOfferings.length > 0 ? relevantOfferings : allPrograms.slice(0, 3);

  const breadcrumbs = [
    { name: 'Home', url: 'https://penaconsultant.co.id' },
    { name: 'Sektor Industri', url: 'https://penaconsultant.co.id/industri' },
    { name: industry.name, url: `https://penaconsultant.co.id/industri/${industry.slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />

      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumbs */}
        <nav className="text-xs font-semibold text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-primary-700">Home</Link>
          <span>/</span>
          <Link href="/industri" className="hover:text-primary-700">Sektor Industri</Link>
          <span>/</span>
          <span className="text-slate-900 line-clamp-1">{industry.name}</span>
        </nav>

        {/* Hero Banner Header */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="bg-primary-100 text-primary-900 border border-primary-300 font-extrabold text-xs px-3 py-1 rounded-md flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-primary-700" />
              SOLUSI K3 SEKTORAL RESMI
            </span>
            <span className="bg-emerald-100 text-emerald-900 font-semibold text-xs px-3 py-1 rounded-md">
              Kepatuhan Regulasi Kemnaker RI &amp; BNSP
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
            Solusi Keselamatan Kerja Sektor {industry.name}
          </h1>

          {industry.description && (
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
              {industry.description}
            </p>
          )}
        </div>

        {/* 2-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Regulatory Context & Unique HIRADC Hazards */}
            {industry.regulatory_context && industry.regulatory_context.length > 0 && (
              <section className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <StructuredContent blocks={industry.regulatory_context} />
              </section>
            )}

            {/* Relevant Programs */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Sertifikasi &amp; Pelatihan Prioritas Sektor {industry.name}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Program sertifikasi resmi yang direkomendasikan untuk memenuhi kepatuhan regulasi sektor {industry.name}.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fallbackOfferings.map((p) => (
                  <OfferingCard key={p.slug} program={p} />
                ))}
              </div>
            </section>

            {/* Corporate Quote Form for Industry */}
            <CorporateQuoteForm defaultProgram={`Program K3 Sektor ${industry.name}`} />
          </div>

          {/* Sidebar Right Rail (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 bg-white p-6 rounded-2xl border border-slate-200 shadow-xl space-y-5">
              <span className="text-[11px] uppercase font-black tracking-wider text-primary-700 block">
                IN-HOUSE TRAINING SEKTOR {industry.name.toUpperCase()}
              </span>

              <h3 className="text-base font-bold text-slate-900">
                Kustomisasi Kurikulum Sesuai Risiko Operasional
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                Kami menyediakan audit kepatuhan SMK3 dan pembinaan in-house training khusus di site pabrik atau proyek Anda dengan instruktur praktisi berpengalaman di industri {industry.name}.
              </p>

              <div className="space-y-3 pt-3 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Studi Kasus Riil Sektor {industry.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sertifikat &amp; Lisensi Resmi Kemnaker / BNSP</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Penyusunan HIRADC &amp; SOP K3 Internal</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Diskon Khusus Paket Korporat (B2B)</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href={getWaLink(`Halo Admin PENA Consultant, kami ingin konsultasi in-house training K3 khusus sektor ${industry.name}.`)}
                  target="_blank"
                  rel="noopener nofollow"
                  className="w-full block text-center bg-gradient-to-r from-emerald-600 to-primary-700 hover:from-emerald-700 text-white font-black py-3.5 rounded-xl shadow-md text-xs transition-all"
                >
                  💬 Minta Penawaran Sektor {industry.name}
                </a>
                <Link
                  href="/pelatihan"
                  className="w-full block text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 rounded-xl text-xs transition-all"
                >
                  Lihat Semua 73 Program K3 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}