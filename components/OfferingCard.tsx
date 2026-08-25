import React from 'react';
import Link from 'next/link';
import { Shield, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Program } from '@/lib/types';

export default function OfferingCard({ program }: { program: Program }) {
  const isKemnaker = program.certification_body === 'kemnaker';
  const isBnsp = program.certification_body === 'bnsp';
  const imageSrc = program.hero_media?.path ? `/${program.hero_media.path}` : null;

  return (
    <article className="bg-white rounded-2xl border border-slate-200 hover:border-primary-500 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Thumbnail Picture */}
      <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={program.hero_media?.alt_text || program.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-950 via-slate-900 to-slate-950 flex items-center justify-center p-6 text-center">
            <Shield className="w-12 h-12 text-primary-500/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

        {/* Badge Overlay */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {isKemnaker && (
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider bg-emerald-600/90 text-white backdrop-blur-md px-2.5 py-1 rounded-md shadow">
              <Shield className="w-3 h-3" /> Kemnaker RI
            </span>
          )}
          {isBnsp && (
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider bg-blue-600/90 text-white backdrop-blur-md px-2.5 py-1 rounded-md shadow">
              <Shield className="w-3 h-3" /> BNSP RI
            </span>
          )}
        </div>

        {program.duration && (
          <div className="absolute bottom-3 right-3 text-[11px] font-semibold text-white/90 bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 rounded flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-400" />
            {program.duration}
          </div>
        )}
      </div>

      <div className="p-5 sm:p-6 flex-grow flex flex-col">
        {/* Program Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-primary-700 transition-colors mb-2 leading-snug">
          <Link href={`/pelatihan/${program.slug}`}>
            {program.name}
          </Link>
        </h3>

        {/* Summary */}
        {program.summary && (
          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
            {program.summary}
          </p>
        )}

        {/* Price & CTA */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block font-bold uppercase">Investasi:</span>
            {program.base_price ? (
              <span className="text-sm sm:text-base font-black text-slate-900">
                Rp {program.base_price.toLocaleString('id-ID')}
              </span>
            ) : (
              <span className="text-xs font-bold text-primary-700">Hubungi Konsultan</span>
            )}
          </div>

          <Link
            href={`/pelatihan/${program.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-primary-700 bg-primary-50 group-hover:bg-primary-600 group-hover:text-white px-3.5 py-2 rounded-xl transition-all"
          >
            Detail <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}