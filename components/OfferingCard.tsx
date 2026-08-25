import React from 'react';
import Link from 'next/link';
import { Shield, Clock, ArrowRight } from 'lucide-react';
import { Program } from '@/lib/types';

export default function OfferingCard({ program }: { program: Program }) {
  const isKemnaker = program.certification_body === 'kemnaker';
  const isBnsp = program.certification_body === 'bnsp';
  const imageSrc = program.hero_media?.path ? `/${program.hero_media.path}` : '/media/pelatihan-001.webp';

  return (
    <article className="bg-white rounded-2xl border border-slate-200 hover:border-primary-500 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Program Photo Container */}
      <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
        <img
          src={imageSrc}
          alt={`Dokumentasi Pelatihan ${program.name}`}
          width={400}
          height={225}
          decoding="async"
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none"></div>

        {/* Badges on Image */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          {isKemnaker && (
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-emerald-700 text-white px-2.5 py-1 rounded-md shadow-md">
              <Shield className="w-3 h-3" /> Kemnaker RI
            </span>
          )}
          {isBnsp && (
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-blue-700 text-white px-2.5 py-1 rounded-md shadow-md">
              <Shield className="w-3 h-3" /> BNSP RI
            </span>
          )}
        </div>

        {program.duration && (
          <div className="absolute bottom-3 right-3 text-[11px] font-semibold text-white bg-slate-950/90 backdrop-blur-md px-2.5 py-0.5 rounded-md flex items-center gap-1 z-10">
            <Clock className="w-3 h-3 text-amber-400" />
            {program.duration}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-primary-700 transition-colors mb-2 leading-snug">
            <Link href={`/pelatihan/${program.slug}`} className="hover:underline">
              {program.name}
            </Link>
          </h3>

          {program.summary && (
            <p className="text-xs sm:text-sm text-slate-700 line-clamp-2 mb-4 leading-relaxed">
              {program.summary}
            </p>
          )}
        </div>

        {/* Price & CTA Button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-600 block font-bold uppercase tracking-wider">Investasi:</span>
            {program.base_price ? (
              <span className="text-sm sm:text-base font-black text-slate-900">
                Rp {program.base_price.toLocaleString('id-ID')}
              </span>
            ) : (
              <span className="text-xs font-bold text-primary-800">Hubungi Konsultan</span>
            )}
          </div>

          <Link
            href={`/pelatihan/${program.slug}`}
            aria-label={`Detail Program Pelatihan ${program.name}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-primary-800 bg-primary-50 group-hover:bg-primary-700 group-hover:text-white px-3.5 py-2 rounded-xl transition-all"
          >
            Detail <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}