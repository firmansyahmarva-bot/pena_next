import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Search, BookOpen, GraduationCap, Phone } from 'lucide-react';
import NotFoundTracker from '@/components/NotFoundTracker';

export const metadata = {
  title: '404 - Halaman Tidak Ditemukan | PENA Consultant',
  description: 'Maaf, halaman yang Anda cari tidak dapat ditemukan. Silakan jelajahi program sertifikasi K3, jadwal batch, atau kembali ke beranda PENA Consultant.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <NotFoundTracker />
      <div className="max-w-2xl w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-amber-100 text-amber-600 font-extrabold text-3xl mb-6 shadow-inner">
          404
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto">
          Maaf, tautan yang Anda tuju telah dipindahkan atau tidak tersedia. Anda dapat mencari materi K3 atau memilih menu di bawah ini.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold shadow-md hover:bg-primary-700 transition"
          >
            <Home className="w-5 h-5" />
            Kembali ke Beranda
          </Link>
          <Link
            href="/pelatihan"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition"
          >
            <GraduationCap className="w-5 h-5 text-primary-600" />
            Daftar Pelatihan K3
          </Link>
          <Link
            href="/panduan"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition"
          >
            <BookOpen className="w-5 h-5 text-emerald-600" />
            Koleksi Panduan & SMK3
          </Link>
        </div>

        {/* Quick Help */}
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm text-left max-w-lg mx-auto">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Search className="w-4 h-4 text-primary-600" />
            Butuh Bantuan Konsultasi K3 Cepat?
          </h2>
          <p className="text-sm text-slate-600 mb-4">
            Tim konsultan sertifikasi K3 kami siap membantu menemukan jadwal, syarat, dan silabus resmi yang Anda butuhkan.
          </p>
          <a
            href="https://wa.me/6281296870884?text=Halo%20PENA%20Consultant,%20saya%20mencari%20informasi%20pelatihan%20K3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700"
          >
            <Phone className="w-4 h-4" />
            Hubungi WhatsApp Support (+62 812-9687-0884) &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}