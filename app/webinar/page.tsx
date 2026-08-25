import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Video, Calendar, Shield, Clock, CheckCircle2, ArrowRight, Award, Users } from 'lucide-react';
import { getBatches, getPrograms, getWaLink } from '@/lib/data';
import CorporateQuoteForm from '@/components/CorporateQuoteForm';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Jadwal Webinar Pelatihan K3 Online 2026 — PENA Consultant',
  description: 'Daftar jadwal webinar pelatihan K3 online resmi Kemnaker RI & BNSP via Zoom interaktif. Sertifikasi Ahli K3 Umum, K3 Rumah Sakit, ISO 45001 & P3K.',
};

export default function WebinarPage() {
  const allBatches = getBatches();
  const onlineBatches = allBatches.filter(b => b.is_online || b.mode?.toLowerCase().includes('online'));
  const displayBatches = onlineBatches.length > 0 ? onlineBatches : allBatches.slice(0, 12);

  const breadcrumbs = [
    { name: 'Home', url: 'https://penaconsultant.com' },
    { name: 'Webinar K3 Online', url: 'https://penaconsultant.com/webinar' },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />

      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <nav className="text-xs font-semibold text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-primary-700">Home</Link>
          <span>/</span>
          <span className="text-slate-900">Webinar K3 Online</span>
        </nav>

        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-primary-950 to-slate-900 p-8 sm:p-12 rounded-3xl text-white shadow-xl relative overflow-hidden space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="bg-emerald-500 text-slate-950 font-black text-xs px-3 py-1 rounded-md flex items-center gap-1.5 shadow">
              <Video className="w-3.5 h-3.5 text-slate-950" />
              KELAS ONLINE INTERAKTIF ZOOM
            </span>
            <span className="bg-white/10 text-slate-200 font-semibold text-xs px-3 py-1 rounded-md backdrop-blur-sm">
              Sertifikasi Resmi Kemnaker RI &amp; BNSP
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black leading-tight max-w-3xl">
            Jadwal Webinar &amp; Pembinaan K3 Online 2026
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Ikuti pembinaan sertifikasi kompetensi K3 dari mana saja di seluruh Indonesia melalui sesi live streaming Zoom interaktif, simulasi studi kasus, dan bimbingan ujian resmi.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800 text-xs font-semibold text-slate-300 max-w-3xl">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Live Zoom Meeting HD</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Modul &amp; E-Kit Lengkap</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Sertifikat Resmi Kemnaker/BNSP</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Grup Diskusi &amp; Konsultasi</span>
            </div>
          </div>
        </div>

        {/* Batch Calendar Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Pilihan Batch Webinar K3 Terdekat
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Pilih program pelatihan dan jadwal batch webinar yang sesuai dengan waktu Anda.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayBatches.map((b) => (
              <div
                key={b.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary-500 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-emerald-100 text-emerald-900 font-extrabold text-[11px] px-2.5 py-1 rounded-md flex items-center gap-1">
                      <Video className="w-3 h-3 text-emerald-700" />
                      Webinar Zoom
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      Batch {b.batch_number || '2026'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {b.offering_name || 'Pembinaan K3 Terjadwal'}
                  </h3>

                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Pelaksanaan: <strong>{b.start_date || 'Setiap Bulan'}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-slate-400" />
                      <span>Sertifikasi: <strong>{b.certification_body?.toUpperCase() || 'KEMNAKER / BNSP'}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Investasi:</span>
                    <span className="text-sm font-black text-primary-700">
                      {b.normal_price ? `Rp ${b.normal_price.toLocaleString('id-ID')}` : 'Hubungi Admin'}
                    </span>
                  </div>
                  <Link
                    href={`/jadwal/${b.slug}`}
                    className="bg-primary-700 hover:bg-primary-800 text-white font-bold text-xs px-4 py-2.5 rounded-lg transition-all"
                  >
                    Daftar Batch →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Corporate RFQ */}
        <CorporateQuoteForm defaultProgram="Webinar In-House K3 Online Korporat" />
      </div>
    </>
  );
}