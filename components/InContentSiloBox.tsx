import React from 'react';
import Link from 'next/link';
import { Award, Calendar, MapPin, ArrowRight, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';
import { Program, ScheduleBatch, Location } from '@/lib/types';
import { getWaLink } from '@/lib/data';

interface Props {
  program: Program;
  batches?: ScheduleBatch[];
  locations?: Location[];
  articleTitle?: string;
}

export default function InContentSiloBox({ program, batches = [], locations = [], articleTitle }: Props) {
  const certBadge = program.certification_body === 'kemnaker' 
    ? { text: 'Sertifikasi Resmi Kemnaker RI', bg: 'bg-emerald-500/10 text-emerald-700 border-emerald-300' }
    : program.certification_body === 'bnsp'
    ? { text: 'Sertifikasi BNSP RI', bg: 'bg-blue-500/10 text-blue-700 border-blue-300' }
    : { text: 'Sertifikasi Kompetensi Industri', bg: 'bg-amber-500/10 text-amber-700 border-amber-300' };

  return (
    <div className="my-8 rounded-2xl border-2 border-primary-100 bg-gradient-to-br from-slate-50 via-primary-50/20 to-white p-5 sm:p-7 shadow-md">
      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary-700" />
          <span className="text-xs font-black uppercase tracking-wider text-slate-800">
            Jalur Sertifikasi Resmi Terkait Topik Ini
          </span>
        </div>
        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${certBadge.bg}`}>
          {certBadge.text}
        </span>
      </div>

      {/* Main Program Feature */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        <div className="md:col-span-8 space-y-2">
          <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {program.name}
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {program.summary || 'Program pembinaan kompetensi K3 resmi dengan modul terstandarisasi, fasilitas ujian, dan penerbitan lisensi resmi.'}
          </p>

          {/* Pricing & Duration */}
          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs">
            {program.base_price && (
              <div className="text-slate-800">
                <span className="text-slate-400">Investasi: </span>
                <span className="font-black text-primary-800">Rp {program.base_price.toLocaleString('id-ID')}</span>
              </div>
            )}
            {program.duration && (
              <div className="text-slate-600 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{program.duration}</span>
              </div>
            )}
          </div>
        </div>

        {/* CTA Actions */}
        <div className="md:col-span-4 flex flex-col gap-2">
          <Link
            href={`/pelatihan/${program.slug}`}
            className="w-full inline-flex items-center justify-center gap-1.5 bg-primary-700 hover:bg-primary-800 text-white font-bold text-xs py-3 px-4 rounded-xl shadow transition-all text-center"
          >
            <span>Silabus &amp; Jadwal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href={getWaLink(`Halo Admin PENA Consultant, saya membaca panduan "${articleTitle || program.name}" dan ingin informasi pendaftaran pelatihan ${program.name}.`)}
            target="_blank"
            rel="noopener nofollow"
            className="w-full inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all text-center"
          >
            Konsultasi WhatsApp
          </a>
        </div>
      </div>

      {/* Upcoming Live Batches (If Any) */}
      {batches.length > 0 && (
        <div className="mt-5 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-3.5 h-3.5 text-primary-700" />
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
              Jadwal Batch Terbuka Tahun 2026:
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {batches.slice(0, 3).map((b) => (
              <Link
                key={b.slug}
                href={`/jadwal/${b.slug}`}
                className="p-2.5 bg-white rounded-lg border border-slate-200 hover:border-primary-400 hover:shadow-sm transition-all flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-slate-800 block text-[11px]">
                    Batch {b.batch_number || '2026'} &bull; {b.is_online ? 'Online' : b.location_name}
                  </span>
                  <span className="text-[10px] text-slate-500">{b.start_date || 'Segera Digelar'}</span>
                </div>
                <span className="text-[10px] font-bold text-primary-700">Daftar &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* City Hub Locations (If Any) */}
      {locations.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1 text-slate-500 text-[11px] font-semibold">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span>Pusat Pelatihan &amp; TUK Mandiri:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {locations.slice(0, 5).map((loc) => (
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
    </div>
  );
}
