import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getArticles } from '@/lib/data';
import { BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Direktori Panduan, Regulasi & Keselamatan Kerja K3 Terlengkap 2026',
  description: 'Pusat referensi dan edukasi keselamatan kerja: UU No 1 1970, SMK3 PP 50 2012, syarat sertifikasi K3, prosedur teknis, dan tips ujian.',
};

export default function PanduanHubPage() {
  const articles = getArticles();

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mb-12">
        <span className="text-xs uppercase font-bold tracking-widest text-primary-700 block mb-2 flex items-center gap-1.5">
          <BookOpen className="w-4 h-4" /> DIREKTORI PANDUAN K3
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Panduan &amp; Edukasi Regulasi Keselamatan Kerja
        </h1>
        <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
          Eksplorasi 320+ artikel panduan, dasar hukum, prosedur keselamatan kerja, dan pedoman sertifikasi K3 di Indonesia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((art) => (
          <article
            key={art.slug}
            className="bg-white p-6 rounded-xl border border-slate-200 hover:border-primary-500 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-[11px] font-bold uppercase text-primary-700 bg-primary-50 px-2.5 py-1 rounded-md inline-block mb-3">
                {art.cluster?.name || 'PANDUAN K3'}
              </span>
              <h2 className="text-base font-bold text-slate-900 hover:text-primary-700 transition-colors mb-2 leading-snug">
                <Link href={`/panduan/${art.slug}`}>
                  {art.title}
                </Link>
              </h2>
              {art.summary && (
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
                  {art.summary}
                </p>
              )}
            </div>
            <Link
              href={`/panduan/${art.slug}`}
              className="text-xs font-bold text-primary-700 hover:underline pt-3 border-t border-slate-100 block"
            >
              Baca Panduan Lengkap →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}