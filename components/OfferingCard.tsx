import React from 'react';
import Link from 'next/link';
import { Shield, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Program } from '@/lib/data';

export default function OfferingCard({ program }: { program: Program }) {
  const isKemnaker = program.certification_body === 'kemnaker';
  const isBnsp = program.certification_body === 'bnsp';

  return (
    <article className="bg-white rounded-xl border border-slate-200 hover:border-primary-500 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      <div className="p-5 sm:p-6 flex-grow flex flex-col">
        {/* Certification Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          {isKemnaker && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-md">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              Kemnaker RI
            </span>
          )}
          {isBnsp && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-md">
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              BNSP RI
            </span>
          )}
          {!isKemnaker && !isBnsp && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
              K3 Resmi
            </span>
          )}

          {program.duration && (
            <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
              <Clock className="w-3.5 h-3.5" />
              {program.duration}
            </span>
          )}
        </div>

        {/* Program Title */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-700 transition-colors mb-2.5 leading-snug">
          <Link href={`/pelatihan/${program.slug}`}>
            {program.name}
          </Link>
        </h3>

        {/* Summary */}
        {program.summary && (
          <p className="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
            {program.summary}
          </p>
        )}

        {/* Price & CTA */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Biaya Investasi:</span>
            {program.base_price ? (
              <span className="text-base font-black text-slate-900">
                Rp {program.base_price.toLocaleString('id-ID')}
              </span>
            ) : (
              <span className="text-sm font-bold text-primary-700">Hubungi Konsultan</span>
            )}
          </div>

          <Link
            href={`/pelatihan/${program.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-primary-700 bg-primary-50 group-hover:bg-primary-600 group-hover:text-white px-3.5 py-2 rounded-lg transition-all"
          >
            Detail <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}