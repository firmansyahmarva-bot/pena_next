import React from 'react';
import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import Link from 'next/link';
import { Shield, BookOpen, UserCheck, Calendar, ExternalLink, ArrowRight, CheckCircle2, Award, FileText } from 'lucide-react';
import { getArticles, getArticleBySlug, getPrograms, getProgramBySlug, getWaLink } from '@/lib/data';
import StructuredContent from '@/components/StructuredContent';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';

export async function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const pageTitle = article.meta_title || `${article.title} — Panduan Resmi K3 2026`;
  const pageDesc = article.meta_description || article.summary || '';
  const pageUrl = `https://penaconsultant.com/panduan/${slug}`;

  return {
    alternates: {
      canonical: pageUrl,
    },
    title: pageTitle,
    description: pageDesc,
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: pageUrl,
      siteName: 'PENA Consultant',
      locale: 'id_ID',
      type: 'article',
      images: [{ url: 'https://penaconsultant.com/images/og-share-card.png', width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDesc,
      images: ['https://penaconsultant.com/images/og-share-card.png'],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) { permanentRedirect('/panduan'); }

  const relatedProgram = article.related_offering_slug ? getProgramBySlug(article.related_offering_slug) : null;
  const clusterArticles = getArticles().filter(a => a.cluster?.slug === article.cluster?.slug && a.slug !== article.slug).slice(0, 4);

  const clusterSlug = article.cluster?.slug || 'regulasi-k3';
  const clusterName = article.cluster?.name || 'Panduan K3';

  const breadcrumbs = [
    { name: 'Home', url: 'https://penaconsultant.com' },
    { name: 'Panduan K3', url: 'https://penaconsultant.com/panduan' },
    { name: clusterName, url: `https://penaconsultant.com/panduan/${clusterSlug}` },
    { name: article.title, url: `https://penaconsultant.com/panduan/${article.slug}` },
  ];

  return (
    <>
      {/* 1. Article & Breadcrumb Schema.org Injection */}
      <ArticleJsonLd article={article} />
      <BreadcrumbJsonLd items={breadcrumbs} />

      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* 3. Clean 4-Level Breadcrumb Navigation */}
        <nav className="text-xs font-semibold text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-primary-700">Home</Link>
          <span>/</span>
          <Link href="/panduan" className="hover:text-primary-700">Panduan K3</Link>
          <span>/</span>
          <Link href={`/panduan/${clusterSlug}`} className="hover:text-primary-700">{clusterName}</Link>
          <span>/</span>
          <span className="text-slate-900 line-clamp-1">{article.title}</span>
        </nav>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article Reader (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            <article className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              {/* 8. Internal Linking: Parent Pillar Silo Banner */}
              {relatedProgram && (
                <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-5 h-5 text-emerald-700 shrink-0" />
                    <span className="text-xs text-emerald-950 font-medium">
                      Panduan ini merupakan bagian materi rujukan sertifikasi resmi <strong>{relatedProgram.name}</strong>.
                    </span>
                  </div>
                  <Link
                    href={`/pelatihan/${relatedProgram.slug}`}
                    className="shrink-0 text-xs font-bold text-emerald-800 hover:text-emerald-950 underline flex items-center gap-1"
                  >
                    Info Silabus &amp; Jadwal →
                  </Link>
                </div>
              )}

              {/* Meta Pill bar */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-500 pb-2 border-b border-slate-100">
                <span className="font-extrabold uppercase text-primary-700 bg-primary-50 px-2.5 py-1 rounded-md">
                  {article.cluster?.name || 'REGULASI K3'}
                </span>
                <span className="flex items-center gap-1 text-slate-600">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" /> Diperbarui: 2026
                </span>
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" /> Diverifikasi Dewan Pakar K3
                </span>
              </div>

              {/* 4. Single H1 Tag */}
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
                {article.title}
              </h1>

              {/* 1. Direct Search Intent: Key Takeaways Summary Box */}
              {article.summary && (
                <div className="p-5 bg-gradient-to-r from-slate-50 to-primary-50/30 border-l-4 border-primary-600 rounded-r-xl text-slate-700 text-sm space-y-1.5">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-primary-800 block">
                    📌 Ringkasan Eksekutif &amp; Poin Kunci
                  </span>
                  <p className="leading-relaxed text-slate-800 font-medium">{article.summary}</p>
                </div>
              )}

              {/* 5 & 6. Scannable Subheadings & Clean Content Body */}
              <div className="pt-2">
                <StructuredContent blocks={article.body} />
              </div>

              {/* 9. External Authority Sources Citation Box */}
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
                <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-primary-600" /> Rujukan Regulasi &amp; Sumber Otoritatif
                </span>
                <div className="flex flex-wrap gap-3 text-xs text-primary-700 font-semibold">
                  <a
                    href="https://jdih.kemnaker.go.id"
                    target="_blank"
                    rel="noopener nofollow"
                    className="hover:underline flex items-center gap-1 bg-white px-3 py-1.5 rounded-md border border-slate-200"
                  >
                    JDIH Kemnaker RI <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                  <a
                    href="https://temank3.kemnaker.go.id"
                    target="_blank"
                    rel="noopener nofollow"
                    className="hover:underline flex items-center gap-1 bg-white px-3 py-1.5 rounded-md border border-slate-200"
                  >
                    Portal Teman K3 <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                  <a
                    href="https://bnsp.go.id"
                    target="_blank"
                    rel="noopener nofollow"
                    className="hover:underline flex items-center gap-1 bg-white px-3 py-1.5 rounded-md border border-slate-200"
                  >
                    Badan Nasional Sertifikasi Profesi (BNSP) <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>

              {/* 10. Author E-E-A-T Bio Box */}
              <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-600 text-white font-black flex items-center justify-center shrink-0 text-base shadow-md">
                    HW
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-sm text-white">Ir. H. Hendra Wijaya, S.T., M.KKK., IPM.</span>
                      <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/40">
                        Lead Auditor SMK3 Terverifikasi
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Praktisi K3 &amp; Instruktur Senior dengan pengalaman lebih dari 18 tahun dalam implementasi Sistem Manajemen K3 (PP 50/2012, ISO 45001) di industri migas, manufaktur otomotif, dan konstruksi sipil.
                    </p>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Ditinjau oleh Tim Dewan Pakar Keselamatan Kerja PENA Consultant</span>
                  <span className="text-emerald-400 font-semibold">✓ Memenuhi Standar Regulasi K3 2026</span>
                </div>
              </div>

              {/* In-Article Conversion Callout */}
              <div className="p-6 sm:p-8 bg-gradient-to-br from-emerald-900 via-slate-950 to-primary-950 rounded-2xl text-white space-y-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                  KONSULTASI SERTIFIKASI K3
                </span>
                <h3 className="text-xl font-bold">Ingin Mengambil Sertifikasi Resmi Terkait Panduan Ini?</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Konsultasikan jadwal batch pembinaan terdekat, syarat dokumen pendaftaran, dan penawaran in-house training perusahaan dengan tim konsultan kami.
                </p>
                <div className="pt-2">
                  <a
                    href={getWaLink(`Halo Admin PENA Consultant, saya membaca panduan "${article.title}" dan ingin berkonsultasi mengenai pendaftaran sertifikasi resminya.`)}
                    target="_blank"
                    rel="noopener nofollow"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-primary-600 hover:from-emerald-600 text-white font-black text-xs px-6 py-3.5 rounded-xl shadow-lg transition-all"
                  >
                    💬 Konsultasi Pendaftaran via WhatsApp →
                  </a>
                </div>
              </div>
            </article>

            {/* Related Cluster Articles */}
            {clusterArticles.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900">
                  Panduan Terkait Lainnya dalam Klaster Ini
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {clusterArticles.map((ca) => (
                    <Link
                      key={ca.slug}
                      href={`/panduan/${ca.slug}`}
                      className="p-4 rounded-xl border border-slate-200 hover:border-primary-500 hover:bg-slate-50 transition-all block"
                    >
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-2 mb-1.5">{ca.title}</h4>
                      <span className="text-[11px] font-bold text-primary-700">Baca Selengkapnya →</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar Right Rail (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {relatedProgram ? (
              <div className="sticky top-24 bg-white p-6 rounded-2xl border border-slate-200 shadow-xl space-y-4">
                <span className="text-[11px] uppercase font-black tracking-wider text-primary-700 block">
                  PROGRAM TERKAIT PANDUAN
                </span>
                <h3 className="text-lg font-bold text-slate-900">{relatedProgram.name}</h3>
                {relatedProgram.summary && (
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{relatedProgram.summary}</p>
                )}
                {relatedProgram.base_price && (
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[11px] text-slate-400 block font-medium">Investasi Mulai:</span>
                    <span className="text-2xl font-black text-slate-900">
                      Rp {relatedProgram.base_price.toLocaleString('id-ID')}
                    </span>
                  </div>
                )}
                <Link
                  href={`/pelatihan/${relatedProgram.slug}`}
                  className="w-full block text-center bg-primary-700 hover:bg-primary-800 text-white font-bold py-3.5 rounded-xl text-xs transition-all shadow-md"
                >
                  Lihat Silabus &amp; Jadwal Batch →
                </Link>
              </div>
            ) : (
              <div className="sticky top-24 bg-white p-6 rounded-2xl border border-slate-200 shadow-xl space-y-4">
                <span className="text-[11px] uppercase font-black tracking-wider text-primary-700 block">
                  KONSULTASI SERTIFIKASI K3
                </span>
                <h3 className="text-base font-bold text-slate-900">Butuh Informasi Pembinaan K3?</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  PENA Consultant melayani 70+ program pembinaan sertifikasi Kemnaker RI dan BNSP untuk perorangan maupun perusahaan di seluruh Indonesia.
                </p>
                <Link
                  href="/pelatihan"
                  className="w-full block text-center bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs transition-all"
                >
                  Lihat Semua 70+ Program Pelatihan →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}