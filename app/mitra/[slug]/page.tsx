import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Building2, Shield, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import mitraData from '@/content/global/mitra.json';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import CorporateQuoteForm from '@/components/CorporateQuoteForm';

export async function generateStaticParams() {
  const mitraList = mitraData as any[];
  return mitraList.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const m = (mitraData as any[]).find((item) => item.slug === slug);
  if (!m) return {};
  const pageTitle = `Pelatihan K3 untuk ${m.name} — PENA Consultant`;
  const pageDesc = `Program pembinaan keselamatan kerja, sertifikasi Kemnaker RI & BNSP, dan in-house training untuk karyawan ${m.name}.`;
  const pageUrl = `https://penaconsultant.com/mitra/${slug}`;
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

export default async function MitraSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = (mitraData as any[]).find((item) => item.slug === slug);
  if (!m) notFound();

  const breadcrumbs = [
    { name: 'Home', url: 'https://penaconsultant.com' },
    { name: 'Mitra & Klien', url: 'https://penaconsultant.com/mitra' },
    { name: m.name, url: `https://penaconsultant.com/mitra/${m.slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <nav className="text-xs font-semibold text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-primary-700">Home</Link>
          <span>/</span>
          <Link href="/mitra" className="hover:text-primary-700">Mitra &amp; Klien</Link>
          <span>/</span>
          <span className="text-slate-900">{m.name}</span>
        </nav>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
            <div className="w-16 h-16 rounded-2xl bg-primary-50 text-primary-700 flex items-center justify-center">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <span className="bg-emerald-100 text-emerald-900 font-extrabold text-[11px] px-2.5 py-1 rounded-md inline-block">
                ✓ Mitra Korporasi Resmi
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900">{m.name}</h1>
            </div>
          </div>

          <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <p>
              PT PENA Consultant bangga telah dipercaya oleh <strong>{m.name}</strong> dalam penyelenggaraan program pembinaan K3, sertifikasi kompetensi tenaga kerja, dan audit kepatuhan keselamatan industri.
            </p>
          </div>
        </div>

        <CorporateQuoteForm defaultProgram={`In-House Training K3 untuk ${m.name}`} />
      </div>
    </>
  );
}