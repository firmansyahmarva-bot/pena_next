import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Shield, ArrowRight, CheckCircle2, UserCheck, Calendar, Share2 } from 'lucide-react';
import { getArticles, getArticleBySlug, getProgramBySlug, getWaLink } from '@/lib/data';
import StructuredContent from '@/components/StructuredContent';

export async function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.meta_title || article.title,
    description: article.meta_description || article.summary || '',
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const relatedProgram = article.related_offering_slug ? getProgramBySlug(article.related_offering_slug) : null;
  const clusterArticles = getArticles().filter(a => a.cluster?.slug === article.cluster?.slug && a.slug !== article.slug).slice(0, 4);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs font-semibold text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-primary-700">Home</Link>
        <span>/</span>
        <Link href="/panduan" className="hover:text-primary-700">Panduan K3</Link>
        <span>/</span>
        <span className="text-slate-900 line-clamp-1">{article.title}</span>
      </nav>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Article Reader */}
        <div className="lg:col-span-8 space-y-8">
          <article className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
            {/* Pillar Silo Banner */}
            {relatedProgram && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Shield className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span className="text-xs text-emerald-950 font-medium">
                    Panduan ini merupakan bagian dari silabus sertifikasi <strong>{relatedProgram.name}</strong>.
                  </span>
                </div>
                <Link
                  href={`/pelatihan/${relatedProgram.slug}`}
                  className="shrink-0 text-xs font-bold text-emerald-800 hover:text-emerald-950 underline"
                >
                  Lihat Info Sertifikasi →
                </Link>
              </div>
            )}

            <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
              <span className="font-bold uppercase text-primary-700 bg-primary-50 px-2.5 py-1 rounded-md">
                {article.cluster?.name || 'REGULASI K3'}
              </span>
              <span className="flex items-center gap-1"><UserCheck className="w-3.5 h-3.5 text-emerald-600" /> Ditinjau Tim Ahli K3</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight mb-6">
              {article.title}
            </h1>

            {/* Key Takeaways Box */}
            {article.summary && (
              <div className="p-5 bg-slate-50 border-l-4 border-primary-600 rounded-r-xl text-slate-700 text-sm mb-8 space-y-1.5">
                <span className="text-xs font-extrabold uppercase tracking-wider text-primary-800 block">
                  📌 Poin Kunci Panduan Ini
                </span>
                <p className="leading-relaxed">{article.summary}</p>
              </div>
            )}

            {/* Main Content Body */}
            <div className="pt-2">
              <StructuredContent blocks={article.body} />
            </div>

            {/* In-Article Action Callout */}
            <div className="mt-10 p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-primary-950 to-slate-950 rounded-2xl text-white space-y-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                KONSULTASI GRATIS K3
              </span>
              <h3 className="text-xl font-bold">Ingin Mengikuti Pelatihan atau Sertifikasi Terkait Topik Ini?</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Tim instruktur kami siap membantu persiapan berkas pendaftaran, pemilihan skema Kemnaker/BNSP yang sesuai, dan penawaran in-house training perusahaan.
              </p>
              <div className="pt-2">
                <a
                  href={getWaLink(`Halo Admin PENA Consultant, saya membaca artikel "${article.title}" dan ingin berkonsultasi lebih lanjut.`)}
                  target="_blank"
                  rel="noopener nofollow"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-primary-600 hover:from-emerald-600 text-white font-black text-xs px-6 py-3 rounded-xl shadow-lg transition-all"
                >
                  💬 Tanya Konsultan K3 via WhatsApp →
                </a>
              </div>
            </div>
          </article>

          {/* Related Cluster Articles */}
          {clusterArticles.length > 0 && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Panduan Terkait dalam Klaster Ini</h3>
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

        {/* Sidebar Sticky Column */}
        <div className="lg:col-span-4 space-y-6">
          {relatedProgram ? (
            <div className="sticky top-24 bg-white p-6 rounded-2xl border border-slate-200 shadow-lg space-y-4">
              <span className="text-[11px] uppercase font-black tracking-wider text-primary-700 block">
                SKEMA SERTIFIKASI RESMI
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
            <div className="sticky top-24 bg-white p-6 rounded-2xl border border-slate-200 shadow-lg space-y-4">
              <span className="text-[11px] uppercase font-black tracking-wider text-primary-700 block">
                LAYANAN KONSULTASI K3
              </span>
              <h3 className="text-base font-bold text-slate-900">Butuh Informasi Pembinaan K3 Resmi?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                PENA Consultant melayani 70+ program sertifikasi Kemnaker RI dan BNSP untuk perorangan maupun korporat.
              </p>
              <Link
                href="/pelatihan"
                className="w-full block text-center bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs transition-all"
              >
                Lihat 70+ Program Pelatihan →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}