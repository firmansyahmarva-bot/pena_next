import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FileText, CheckCircle2, Shield, ArrowRight } from 'lucide-react';
import caseStudiesData from '@/content/global/case_studies.json';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import StructuredContent from '@/components/StructuredContent';

export async function generateStaticParams() {
  const caseStudies = caseStudiesData as any[];
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = (caseStudiesData as any[]).find((item) => item.slug === slug);
  if (!cs) return {};
  return {
    alternates: {
      canonical: `https://penaconsultant.com/studi-kasus/${slug}`,
    },
    title: `${cs.title} — Studi Kasus K3`,
    description: cs.summary || `Studi kasus implementasi K3 industri di PENA Consultant.`,
  };
}

export default async function CaseStudySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = (caseStudiesData as any[]).find((item) => item.slug === slug);
  if (!cs) notFound();

  const breadcrumbs = [
    { name: 'Home', url: 'https://penaconsultant.com' },
    { name: 'Studi Kasus K3', url: 'https://penaconsultant.com/studi-kasus' },
    { name: cs.title, url: `https://penaconsultant.com/studi-kasus/${cs.slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <nav className="text-xs font-semibold text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-primary-700">Home</Link>
          <span>/</span>
          <Link href="/studi-kasus" className="hover:text-primary-700">Studi Kasus K3</Link>
          <span>/</span>
          <span className="text-slate-900 line-clamp-1">{cs.title}</span>
        </nav>

        <article className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <span className="bg-primary-50 text-primary-700 font-extrabold text-xs px-3 py-1 rounded-md uppercase">
            STUDI KASUS K3 INDUSTRI
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
            {cs.title}
          </h1>
          {cs.summary && (
            <div className="p-4 bg-slate-50 border-l-4 border-primary-600 rounded-r-xl text-xs sm:text-sm text-slate-700">
              {cs.summary}
            </div>
          )}
          {cs.body && <StructuredContent blocks={cs.body} />}
        </article>
      </div>
    </>
  );
}