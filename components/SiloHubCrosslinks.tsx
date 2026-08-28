import React from 'react';
import Link from 'next/link';
import { Building2, MapPin, Award, Calendar, ChevronRight } from 'lucide-react';
import { Program, Industry, Location, ScheduleBatch, Article } from '@/lib/types';

interface Props {
  programs?: Program[];
  industries?: Industry[];
  locations?: Location[];
  batches?: ScheduleBatch[];
  articles?: Article[];
  currentType?: 'article' | 'program' | 'location' | 'industry';
}

export default function SiloHubCrosslinks({
  programs = [],
  industries = [],
  locations = [],
  batches = [],
  articles = [],
  currentType = 'article',
}: Props) {
  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 my-10 space-y-8 border border-slate-800 shadow-xl">
      <div className="space-y-2 border-b border-slate-800 pb-5">
        <span className="text-[11px] font-black uppercase tracking-widest text-amber-400 block">
          JARINGAN PENGETAHUAN &amp; SERTIFIKASI RESMI
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-white">
          Ekosistem Pembinaan K3 Terintegrasi PENA Consultant
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          Temukan standar kompetensi, jadwal pembinaan sertifikasi Kemnaker RI &amp; BNSP, pusat TUK mandiri di berbagai kota industri, serta kepatuhan regulasi K3 sektoral.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Col 1: Program Pelatihan */}
        {programs.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>Program Sertifikasi</span>
            </h4>
            <ul className="space-y-2">
              {programs.slice(0, 5).map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/pelatihan/${p.slug}`}
                    className="text-xs text-slate-400 hover:text-white hover:underline line-clamp-1 transition-colors flex items-center justify-between"
                  >
                    <span>{p.name}</span>
                    <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Col 2: Sektor Industri */}
        {industries.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Sektor Industri</span>
            </h4>
            <ul className="space-y-2">
              {industries.slice(0, 5).map((ind) => (
                <li key={ind.slug}>
                  <Link
                    href={`/industri/${ind.slug}`}
                    className="text-xs text-slate-400 hover:text-white hover:underline line-clamp-1 transition-colors flex items-center justify-between"
                  >
                    <span>{ind.name}</span>
                    <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Col 3: Kota Penyelenggaraan */}
        {locations.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Pusat Pelatihan Kota</span>
            </h4>
            <ul className="space-y-2">
              {locations.slice(0, 5).map((loc) => (
                <li key={loc.slug}>
                  <Link
                    href={`/cabang/${loc.slug}`}
                    className="text-xs text-slate-400 hover:text-white hover:underline line-clamp-1 transition-colors flex items-center justify-between"
                  >
                    <span>{loc.name}</span>
                    <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Col 4: Jadwal Batch Terbuka */}
        {batches.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              <span>Jadwal Batch 2026</span>
            </h4>
            <ul className="space-y-2">
              {batches.slice(0, 5).map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/jadwal/${b.slug}`}
                    className="text-xs text-slate-400 hover:text-white hover:underline line-clamp-1 transition-colors flex items-center justify-between"
                  >
                    <span>{b.offering_name} (B-{b.batch_number || '2026'})</span>
                    <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
