import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Shield, ArrowRight } from 'lucide-react';
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
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="text-xs font-semibold text-slate-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-primary-700">Home</Link>
        <span>/</span>
        <Link href="/panduan" className="hover:text-primary-700">Panduan</Link>
        <span>/</span>
        <span className="text-slate-900 line-clamp-1">{article.title}</span>
      </nav>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Article Body */}
        <div className="lg:col-span-2 space-y-8">
          <article className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold uppercase text-primary-700 bg-primary-50 border border-primary-200 px-3 py-1 rounded-md inline-block mb-4">
              📚 {article.cluster?.name || 'REGULASI & KESELAMATAN K3'}
            </span>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight mb-4">
              {article.title}
            </h1>

            {article.summary && (
              <div className="p-4 bg-slate-50 border-l-4 border-primary-600 rounded-r-lg text-slate-700 text-sm mb-8">
                <strong>Ringkasan:</strong> {article.summary}
              </div>
            )}

            <StructuredContent blocks={article.body} />

            {/* In-Article CTA Banner */}
            <div className="mt-10 p-6 bg-gradient-to-br from-primary-950 to-slate-900 rounded-xl text-white">
              <h3 className="text-lg font-bold mb-2">Butuh Bimbingan Sertifikasi atau In-House Training K3?</h3>
              <p className="text-sm text-slate-300 mb-4">
                Diskusikan jadwal, persyaratan berkas, dan skema sertifikasi Kemnaker RI/BNSP dengan konsultan ahli kami.
              </p>
              <a
                href={getWaLink(`Halo Admin PENA Consultant, saya membaca artikel "${article.title}" dan ingin berkonsultasi lebih lanjut.`)}
                target="_blank"
                rel="noopener nofollow"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs px-5 py-2.5 rounded-lg shadow transition-all"
              >
                💬 Konsultasi via WhatsApp →
              </a>
            </div>
          </article>

          {/* Related Cluster Guides */}
          {clusterArticles.length > 0 && (
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Artikel Terkait dalam Klaster Ini</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {clusterArticles.map((ca) => (
                  <Link
                    key={ca.slug}
                    href={`/panduan/${ca.slug}`}
                    className="p-3.5 rounded-lg border border-slate-200 hover:border-primary-500 hover:bg-slate-50 transition-all block"
                  >
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2 mb-1">{ca.title}</h4>
                    <span className="text-[11px] font-bold text-primary-700">Baca Selengkapnya →</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {relatedProgram ? (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg space-y-4">
              <span className="text-[11px] uppercase font-bold tracking-wider text-primary-700 block">
                PROGRAM PELATIHAN TERKAIT
              </span>
              <h3 className="text-lg font-bold text-slate-900">{relatedProgram.name}</h3>
              {relatedProgram.summary && (
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{relatedProgram.summary}</p>
              )}
              {relatedProgram.base_price && (
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] text-slate-400 block">Investasi Mulai:</span>
                  <span className="text-xl font-black text-slate-900">
                    Rp {relatedProgram.base_price.toLocaleString('id-ID')}
                  </span>
                </div>
              )}
              <Link
                href={`/pelatihan/${relatedProgram.slug}`}
                className="w-full block text-center bg-primary-700 hover:bg-primary-800 text-white font-bold py-3 rounded-xl text-xs transition-all shadow"
              >
                Lihat Detail Program →
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}