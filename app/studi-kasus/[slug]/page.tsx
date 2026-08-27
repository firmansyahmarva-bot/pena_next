import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  TrendingUp, 
  AlertCircle, 
  Wrench, 
  Award, 
  ChevronRight, 
  MessageCircle,
  Building2
} from 'lucide-react';
import caseStudiesData from '@/content/global/case_studies.json';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import CorporateQuoteForm from '@/components/CorporateQuoteForm';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const caseStudies = caseStudiesData as any[];
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = (caseStudiesData as any[]).find((item) => item.slug === slug);
  if (!cs) return {};

  const pageTitle = `${cs.title} | Studi Kasus K3 PENA Consultant`;
  const pageDesc = cs.summary || `Studi kasus implementasi K3 industri di PENA Consultant.`;
  const pageUrl = `https://penaconsultant.com/studi-kasus/${slug}`;

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
      type: 'article',
      images: [{ url: 'https://penaconsultant.com/images/og-share-card.png', width: 1200, height: 630, alt: cs.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDesc,
      images: ['https://penaconsultant.com/images/og-share-card.png'],
    },
  };
}

function renderBlocks(blocks: any[]) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
      {blocks.map((block: any, idx: number) => {
        if (block.type === 'paragraph') {
          return <p key={idx}>{block.data?.text || block.text}</p>;
        }
        if (block.type === 'list' && (block.data?.items || block.items)) {
          const items = block.data?.items || block.items;
          return (
            <ul key={idx} className="space-y-2 pl-2">
              {items.map((item: string, iIdx: number) => (
                <li key={iIdx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === 'callout') {
          return (
            <div key={idx} className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900 font-medium">
              {block.data?.text || block.text}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default async function CaseStudySlugPage({ params }: Props) {
  const { slug } = await params;
  const cs = (caseStudiesData as any[]).find((item) => item.slug === slug);
  if (!cs) notFound();

  const breadcrumbs = [
    { name: 'Home', url: 'https://penaconsultant.com' },
    { name: 'Studi Kasus K3', url: 'https://penaconsultant.com/studi-kasus' },
    { name: cs.title, url: `https://penaconsultant.com/studi-kasus/${cs.slug}` },
  ];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: cs.title,
    description: cs.summary,
    author: {
      '@type': 'Organization',
      name: 'PENA Consultant',
      url: 'https://penaconsultant.com'
    }
  };

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      <div className="py-10 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/" className="hover:text-blue-600 transition-colors">Beranda</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link href="/studi-kasus" className="hover:text-blue-600 transition-colors">Studi Kasus K3</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-900 font-semibold truncate">{cs.title}</span>
        </nav>

        {/* Hero Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-blue-50 text-blue-800 font-bold text-xs px-3 py-1 rounded-full border border-blue-200 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-600" /> STUDI KASUS IMPLEMENTASI K3
            </span>
            {cs.client_anonymized && (
              <span className="bg-slate-100 text-slate-700 font-semibold text-xs px-3 py-1 rounded-full flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-slate-500" /> {cs.client_anonymized}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug mb-4">
            {cs.title}
          </h1>

          {cs.summary && (
            <p className="text-sm sm:text-base text-slate-600 bg-slate-50 border-l-4 border-blue-600 p-4 rounded-r-xl leading-relaxed">
              {cs.summary}
            </p>
          )}
        </div>

        {/* Outcome Metrics Grid */}
        {cs.outcome_metrics && Object.keys(cs.outcome_metrics).length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" /> Metrik Keberhasilan Kunci
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Object.entries(cs.outcome_metrics).map(([key, val]: [string, any], idx: number) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
                  <span className="text-xs font-semibold text-slate-500 block mb-1">{key}</span>
                  <span className="text-base sm:text-xl font-black text-emerald-700 block">{String(val)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Problem Statement */}
        {cs.problem?.blocks && cs.problem.blocks.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 flex items-center gap-2.5">
              <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
              Tantangan Awal &amp; Risiko Operasional
            </h2>
            {renderBlocks(cs.problem.blocks)}
          </div>
        )}

        {/* Intervention */}
        {cs.intervention?.blocks && cs.intervention.blocks.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 flex items-center gap-2.5">
              <Wrench className="w-6 h-6 text-blue-600 shrink-0" />
              Intervensi &amp; Solusi Teknis PENA Consultant
            </h2>
            {renderBlocks(cs.intervention.blocks)}
          </div>
        )}

        {/* Outcome */}
        {cs.outcome?.blocks && cs.outcome.blocks.length > 0 && (
          <div className="bg-emerald-50/50 border border-emerald-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-black text-emerald-950 mb-4 flex items-center gap-2.5">
              <Award className="w-6 h-6 text-emerald-600 shrink-0" />
              Hasil Nyata &amp; Dampak Kepatuhan K3
            </h2>
            {renderBlocks(cs.outcome.blocks)}
          </div>
        )}

        {/* Relevant Offerings / Programs */}
        {((cs.relevant_offering_slugs && cs.relevant_offering_slugs.length > 0) || (cs.offerings && cs.offerings.length > 0)) && (
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600 mb-4">
              Program Sertifikasi &amp; Pelatihan Terkait:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cs.relevant_offering_slugs ? (
                cs.relevant_offering_slugs.map((progSlug: string, idx: number) => (
                  <Link
                    key={idx}
                    href={`/pelatihan/${progSlug}`}
                    className="p-4 bg-white border border-slate-200 hover:border-blue-500 hover:shadow-xs rounded-xl transition-all flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 group"
                  >
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      <span className="capitalize">{progSlug.replace(/-/g, ' ')}</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))
              ) : (
                cs.offerings.map((off: any, idx: number) => (
                  <Link
                    key={idx}
                    href={`/pelatihan/${off.slug}`}
                    className="p-4 bg-white border border-slate-200 hover:border-blue-500 hover:shadow-xs rounded-xl transition-all flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 group"
                  >
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      <span>{off.title}</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))
              )}
            </div>
          </div>
        )}

        {/* Consultation Form */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block mb-2">
              KONSULTASI SOLUSI IN-HOUSE
            </span>
            <h2 className="text-2xl font-black text-slate-900">Hadapi Tantangan Serupa di Perusahaan Anda?</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Konsultasikan kebutuhan audit K3, sertifikasi staf, dan silabus in-house bersama instruktur ahli kami.
            </p>
          </div>
          <CorporateQuoteForm defaultProgram={`Studi Kasus: ${cs.title}`} />
        </div>
      </div>
    </>
  );
}