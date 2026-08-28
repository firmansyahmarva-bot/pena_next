import React from 'react';
import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import Link from 'next/link';
import { 
  Shield, BookOpen, UserCheck, Calendar, ExternalLink, ArrowRight, 
  CheckCircle2, Award, FileText, MapPin, Building2, ChevronRight, Clock 
} from 'lucide-react';
import { getArticles, getArticleBySlug, getWaLink } from '@/lib/data';
import { getArticleSiloData } from '@/lib/silos';
import StructuredContent from '@/components/StructuredContent';
import InContentSiloBox from '@/components/InContentSiloBox';
import SiloHubCrosslinks from '@/components/SiloHubCrosslinks';
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

  const siloData = getArticleSiloData(article);
  const { primaryProgram, secondaryPrograms, upcomingBatches, relevantIndustries, topLocations, clusterArticles } = siloData;

  const clusterSlug = article.cluster?.slug || 'regulasi-k3';
  const clusterName = article.cluster?.name || 'Panduan K3';

  const breadcrumbs = [
    { name: 'Home', url: 'https://penaconsultant.com' },
    { name: 'Panduan K3', url: 'https://penaconsultant.com/panduan' },
    { name: clusterName, url: `https://penaconsultant.com/panduan?cluster=${clusterSlug}` },
    { name: article.title, url: `https://penaconsultant.com/panduan/${article.slug}` },
  ];

  return (
    <>
      <ArticleJsonLd article={article} />
      <BreadcrumbJsonLd items={breadcrumbs} />

      <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Hierarchy */}
          <nav className="mb-6 flex items-center space-x-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap py-1">
            <Link href="/" className="hover:text-primary-700 font-medium">Home</Link>
            <span>/</span>
            <Link href="/panduan" className="hover:text-primary-700 font-medium">Panduan K3</Link>
            <span>/</span>
            <span className="text-primary-800 font-semibold">{clusterName}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Main Content Area (8 Cols) */}
            <div className="lg:col-span-8 space-y-8">
              <article className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                {/* Cluster & Meta Badge */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-primary-50 text-primary-700 font-bold text-xs px-3 py-1 rounded-full border border-primary-200">
                    {clusterName}
                  </span>
                  <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Pembaruan: {article.published_at || 'Tahun 2026'}
                  </span>
                  <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5" />
                    Ditinjau oleh Tim Ahli K3
                  </span>
                </div>

                {/* Article Main Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
                  {article.title}
                </h1>

                {/* Executive Summary */}
                {article.summary && (
                  <div className="p-4 sm:p-5 bg-slate-50 border-l-4 border-primary-600 rounded-r-xl text-slate-700 text-sm sm:text-base leading-relaxed italic">
                    {article.summary}
                  </div>
                )}

                {/* Structured Body Blocks */}
                <div className="pt-2">
                  <StructuredContent blocks={article.body} />
                </div>

                {/* In-Content Silo Box: Connecting this article to the official training certification */}
                {primaryProgram && (
                  <InContentSiloBox
                    program={primaryProgram}
                    batches={upcomingBatches}
                    locations={topLocations}
                    articleTitle={article.title}
                  />
                )}

                {/* Regulatory References */}
                <div className="p-5 sm:p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                    Referensi &amp; Dasar Hukum Resmi:
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

                {/* Author E-E-A-T Bio Box */}
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

                {/* In-Article WhatsApp Conversion Box */}
                <div className="p-6 sm:p-8 bg-gradient-to-br from-emerald-900 via-slate-950 to-primary-950 rounded-2xl text-white space-y-4">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                    KONSULTASI SERTIFIKASI K3 RESMI
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
                      💬 Konsultasi Pendaftaran via WhatsApp &rarr;
                    </a>
                  </div>
                </div>
              </article>

              {/* Related Cluster Articles */}
              {clusterArticles.length > 0 && (
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary-700" />
                    Panduan Terkait Lainnya dalam Klaster Ini
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {clusterArticles.map((ca) => (
                      <Link
                        key={ca.slug}
                        href={`/panduan/${ca.slug}`}
                        className="p-4 rounded-xl border border-slate-200 hover:border-primary-500 hover:bg-slate-50 transition-all block group"
                      >
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-primary-800 line-clamp-2 mb-1.5">
                          {ca.title}
                        </h4>
                        <span className="text-[11px] font-bold text-primary-700 flex items-center gap-1">
                          Baca Selengkapnya &rarr;
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Comprehensive Bottom Topic Silo Cross-Links */}
              <SiloHubCrosslinks
                programs={primaryProgram ? [primaryProgram, ...secondaryPrograms] : secondaryPrograms}
                industries={relevantIndustries}
                locations={topLocations}
                batches={upcomingBatches}
                currentType="article"
              />
            </div>

            {/* Sticky Sidebar Right Rail (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Primary Program Card */}
              {primaryProgram && (
                <div className="sticky top-24 bg-white p-6 rounded-2xl border border-slate-200 shadow-xl space-y-5">
                  <div>
                    <span className="text-[11px] uppercase font-black tracking-wider text-primary-700 block mb-1">
                      PROGRAM PELATIHAN TERKAIT
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">{primaryProgram.name}</h3>
                  </div>

                  {primaryProgram.summary && (
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {primaryProgram.summary}
                    </p>
                  )}

                  {primaryProgram.base_price && (
                    <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                      <span className="text-[11px] text-slate-400 font-medium">Investasi Mulai:</span>
                      <span className="text-xl font-black text-slate-900">
                        Rp {primaryProgram.base_price.toLocaleString('id-ID')}
                      </span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Link
                      href={`/pelatihan/${primaryProgram.slug}`}
                      className="w-full block text-center bg-primary-700 hover:bg-primary-800 text-white font-bold py-3.5 rounded-xl text-xs transition-all shadow-md"
                    >
                      Lihat Silabus &amp; Biaya Resmi &rarr;
                    </Link>
                    <a
                      href={getWaLink(`Halo Admin PENA Consultant, saya ingin konsultasi pendaftaran pelatihan ${primaryProgram.name}.`)}
                      target="_blank"
                      rel="noopener nofollow"
                      className="w-full block text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition-all"
                    >
                      Konsultasi WhatsApp
                    </a>
                  </div>

                  {/* Upcoming Batches Widget in Sidebar */}
                  {upcomingBatches.length > 0 && (
                    <div className="pt-4 border-t border-slate-100 space-y-2">
                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-primary-700" />
                        Jadwal Pendaftaran Terdekat:
                      </span>
                      <div className="space-y-1.5">
                        {upcomingBatches.slice(0, 3).map((b) => (
                          <Link
                            key={b.slug}
                            href={`/jadwal/${b.slug}`}
                            className="p-2 bg-slate-50 hover:bg-primary-50 rounded-lg border border-slate-200 text-xs block transition-colors"
                          >
                            <span className="font-bold text-slate-800 text-[11px] block">
                              Batch {b.batch_number || '2026'} &bull; {b.is_online ? 'Online Zoom' : b.location_name}
                            </span>
                            <span className="text-[10px] text-slate-500">{b.start_date || 'Segera Digelar'}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* City Training Centers */}
                  {topLocations.length > 0 && (
                    <div className="pt-4 border-t border-slate-100 space-y-2">
                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-primary-700" />
                        Kota Pelatihan &amp; TUK Mandiri:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {topLocations.slice(0, 6).map((loc) => (
                          <Link
                            key={loc.slug}
                            href={`/cabang/${loc.slug}`}
                            className="text-[10px] bg-slate-100 hover:bg-primary-100 text-slate-700 hover:text-primary-800 font-medium px-2 py-0.5 rounded transition-colors"
                          >
                            {loc.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Relevant Industrial Sectors */}
                  {relevantIndustries.length > 0 && (
                    <div className="pt-4 border-t border-slate-100 space-y-2">
                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-primary-700" />
                        Penerapan Sektor Industri:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {relevantIndustries.slice(0, 4).map((ind) => (
                          <Link
                            key={ind.slug}
                            href={`/industri/${ind.slug}`}
                            className="text-[10px] bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-800 font-medium px-2 py-0.5 rounded transition-colors"
                          >
                            {ind.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
