import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Video, Gift, CheckCircle2, Users, Calendar, ArrowRight } from 'lucide-react';
import { getWaLink } from '@/lib/types';
import CorporateQuoteForm from '@/components/CorporateQuoteForm';

export const metadata: Metadata = {
  title: 'Webinar K3 Gratis 2026 — PENA Consultant',
  description: 'Daftar sesi webinar K3 online gratis bersertifikat e-certificate resmi dari PENA Consultant. Pembahasan topik SMK3, HIRADC, dan regulasi K3 terkini.',
};

export default function WebinarGratisPage() {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="bg-gradient-to-br from-slate-900 via-primary-950 to-slate-900 p-8 sm:p-14 rounded-3xl text-white shadow-xl space-y-5 text-center max-w-4xl mx-auto">
        <span className="bg-emerald-400 text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
          <Gift className="w-4 h-4" /> WEBINAR EDUKASI GRATIS K3 2026
        </span>
        <h1 className="text-3xl sm:text-5xl font-black leading-tight">
          Webinar Keselamatan Kerja &amp; Sertifikasi K3 Online
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Dapatkan wawasan seputar regulasi K3 terbaru, studi kasus kecelakaan kerja industri, dan konsultasi karir K3 gratis bersama Lead Auditor &amp; Praktisi Senior PENA Consultant.
        </p>
        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <a
            href={getWaLink('Halo Admin PENA Consultant, saya ingin mendaftar Webinar K3 Gratis.')}
            target="_blank"
            rel="noopener nofollow"
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm px-8 py-4 rounded-xl shadow-lg transition-all"
          >
            💬 Daftar Webinar Gratis via WhatsApp →
          </a>
          <Link
            href="/webinar"
            className="bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-6 py-4 rounded-xl transition-all"
          >
            Lihat Jadwal Webinar Berbayar / Ujian →
          </Link>
        </div>
      </div>
      <CorporateQuoteForm defaultProgram="Webinar In-House K3" />
    </div>
  );
}