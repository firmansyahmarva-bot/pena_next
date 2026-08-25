import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Building2 } from 'lucide-react';
import { getIndustries, getIndustryBySlug, getPrograms, getWaLink } from '@/lib/data';
import OfferingCard from '@/components/OfferingCard';
import StructuredContent from '@/components/StructuredContent';

export async function generateStaticParams() {
  return getIndustries().map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  return {
    title: `Solusi K3 Sektor ${industry.name} — Pelatihan & Sertifikasi Resmi`,
    description: industry.description || '',
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const relevantOfferings = getPrograms().filter(p => industry.relevant_offering_slugs?.includes(p.slug));

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <span className="text-xs font-bold uppercase text-primary-700 bg-primary-50 px-3 py-1 rounded-md inline-block">
          🏢 SOLUSI K3 SEKTORAL
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900">Sektor {industry.name}</h1>
        {industry.description && <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">{industry.description}</p>}
      </div>

      {industry.regulatory_context?.length > 0 && (
        <section className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-4">⚖️ Dasar Hukum &amp; Kewajiban K3 Sektor {industry.name}</h2>
          <StructuredContent blocks={industry.regulatory_context} />
        </section>
      )}

      {relevantOfferings.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-slate-900">Program Pelatihan yang Relevan untuk Sektor {industry.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relevantOfferings.map((p) => (
              <OfferingCard key={p.slug} program={p} />
            ))}
          </div>
        </section>
      )}

      <div className="bg-primary-950 p-8 rounded-2xl text-white text-center space-y-4">
        <h2 className="text-2xl font-bold">Konsultasi K3 Khusus Sektor {industry.name}</h2>
        <p className="text-slate-300 text-sm max-w-xl mx-auto">
          Diskusikan program in-house training dan audit kepatuhan SMK3 dengan tim spesialis kami.
        </p>
        <a
          href={getWaLink(`Halo Admin PENA Consultant, kami ingin konsultasi program K3 untuk sektor ${industry.name}.`)}
          target="_blank"
          rel="noopener nofollow"
          className="inline-block bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-sm px-6 py-3 rounded-lg shadow"
        >
          💬 Konsultasi via WhatsApp
        </a>
      </div>
    </div>
  );
}