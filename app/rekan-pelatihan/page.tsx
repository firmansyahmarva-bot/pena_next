import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Award, CheckCircle2, ExternalLink, Info } from 'lucide-react';
import { FaqJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';

/* Metadata & Open Graph */
export const metadata: Metadata = {
  title: 'Rekan Pelatihan Operator Alat Berat — Wahana Totalita | PENA Consultant',
  description:
    'PENA Consultant merekomendasikan Wahana Totalita, mitra kami di Yogyakarta, untuk sertifikasi operator forklift, crane, pesawat tenaga produksi, boiler, dan scaffolding resmi Kemnaker RI.',
  alternates: {
    canonical: 'https://penaconsultant.com/rekan-pelatihan',
  },
  openGraph: {
    title: 'Rekan Pelatihan Operator Alat Berat — Wahana Totalita | PENA Consultant',
    description:
      'PENA Consultant merekomendasikan Wahana Totalita untuk pelatihan operator forklift, crane, boiler, scaffolding, dan PTP bersertifikat Kemnaker RI di Yogyakarta.',
    url: 'https://penaconsultant.com/rekan-pelatihan',
    siteName: 'PENA Consultant',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: 'https://penaconsultant.com/images/og-share-card.png',
        width: 1200,
        height: 630,
        alt: 'Rekan Pelatihan Operator Alat Berat — Wahana Totalita | PENA Consultant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rekan Pelatihan Operator Alat Berat — Wahana Totalita | PENA Consultant',
    description:
      'Rekomendasi resmi PENA Consultant: Wahana Totalita untuk sertifikasi operator forklift, crane, boiler, scaffolding dan PTP Kemnaker RI.',
    images: ['https://penaconsultant.com/images/og-share-card.png'],
  },
};

const FAQS = [
  {
    question: 'Apakah Wahana Totalita bagian dari PENA Consultant?',
    answer:
      'Tidak. Wahana Totalita adalah perusahaan pelatihan K3 yang terpisah dan independen. PENA Consultant merekomendasikan Wahana Totalita sebagai mitra karena spesialisasinya pada sertifikasi operator alat berat — bidang di luar fokus utama PENA.',
  },
  {
    question: 'Apakah pendaftaran dan pembayaran melalui PENA atau langsung ke Wahana Totalita?',
    answer:
      'Langsung ke Wahana Totalita. Setelah Anda mengunjungi situs mereka, seluruh proses pendaftaran, konfirmasi jadwal, dan pembayaran ditangani sepenuhnya oleh tim Wahana Totalita.',
  },
  {
    question: 'Apakah sertifikat dari Wahana Totalita resmi diakui Kemnaker RI?',
    answer:
      'Wahana Totalita menyelenggarakan pelatihan operator alat berat dengan sertifikasi resmi Kemnaker RI. Anda dapat memverifikasi status kelembagaan mereka melalui portal TemanK3 (temank3.kemnaker.go.id).',
  },
];

const PENA_PROGRAMS = [
  { name: 'Ahli K3 Umum Kemnaker RI', href: '/pelatihan/ahli-k3-umum' },
  { name: 'Ahli K3 Konstruksi', href: '/pelatihan/ahli-k3-konstruksi' },
  { name: 'Ahli K3 Listrik', href: '/pelatihan/ahli-k3-listrik' },
  { name: 'Ahli K3 Kimia', href: '/pelatihan/ahli-k3-kimia' },
  { name: 'Internal Auditor SMK3 PP 50/2012', href: '/pelatihan/internal-auditor-smk3-pp-50-2012' },
  { name: 'Lead Auditor ISO 45001:2018', href: '/pelatihan/lead-auditor-iso-45001-2018' },
];

const WAHANA_PROGRAMS = [
  {
    name: 'Operator Forklift (Kelas 1 & 2)',
    desc: 'Untuk operator gudang, logistik, dan lantai produksi pabrik. Mencakup teori keselamatan angkat-angkut dan praktik lapangan.',
  },
  {
    name: 'Operator Crane (Kelas 1, 2 & 3)',
    desc: 'Wajib bagi operator alat angkat di proyek konstruksi, pelabuhan, dan industri berat — termasuk mobile crane dan overhead crane.',
  },
  {
    name: 'Pesawat Tenaga & Produksi (PTP)',
    desc: 'Untuk operator mesin produksi dan pesawat tenaga di pabrik manufaktur — mencakup pengoperasian aman dan inspeksi berkala.',
  },
  {
    name: 'Operator Boiler Kelas 2',
    desc: 'Untuk operator ketel uap di pembangkit listrik, pabrik kimia, dan fasilitas bertekanan tinggi sesuai regulasi K3 Kemnaker RI.',
  },
  {
    name: 'Operator Scaffolding',
    desc: 'Untuk pekerja perancah di proyek konstruksi bertingkat — mencakup pemasangan, pembongkaran, dan inspeksi scaffolding yang aman.',
  },
];

export default function RekanPelatihanPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: 'https://penaconsultant.com' },
          { name: 'Rekan Pelatihan', url: 'https://penaconsultant.com/rekan-pelatihan' },
        ]}
      />
      <FaqJsonLd faqs={FAQS} />

      <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

        {/* BREADCRUMB */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-1.5">
          <Link href="/" className="hover:text-primary-700">Beranda</Link>
          <span>/</span>
          <span className="text-slate-700 font-semibold">Rekan Pelatihan</span>
        </nav>

        {/* HERO */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 sm:p-12 space-y-4">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-700 bg-primary-50 px-3 py-1.5 rounded-md">
            Rekomendasi Rekan Kerja
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
            Butuh Sertifikasi <span className="text-primary-700">Operator Alat Berat?</span>
          </h1>
          <p className="text-slate-600 leading-relaxed max-w-3xl">
            PENA Consultant berfokus pada sertifikasi Ahli K3 Umum, K3 Spesialis, Auditor SMK3, dan ISO 45001.
            Untuk pelatihan operator alat berat — forklift, crane, boiler, scaffolding, dan PTP — kami merekomendasikan{' '}
            <a
              href="https://wahanatotalita.com/"
              target="_blank"
              rel="noopener sponsored"
              className="font-bold text-primary-700 underline underline-offset-2 hover:text-primary-900"
            >
              Wahana Totalita &#8212; lembaga pelatihan operator alat berat
            </a>{' '}
            yang berbasis di Yogyakarta dan berpengalaman di bidang tersebut.
          </p>
        </section>

        {/* KAPAN PILIH SIAPA */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Kapan Sebaiknya Memilih Wahana Totalita?</h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto">
              PENA Consultant dan Wahana Totalita adalah dua perusahaan yang terpisah dan saling melengkapi.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary-700" />
                Tetap di PENA Consultant jika Anda butuh:
              </h3>
              <ul className="space-y-2.5">
                {PENA_PROGRAMS.map((p) => (
                  <li key={p.href} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                    <Link href={p.href} className="hover:text-primary-700 hover:underline">{p.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-amber-200 p-6 space-y-4">
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-600" />
                Pertimbangkan Wahana Totalita jika Anda butuh:
              </h3>
              <ul className="space-y-2.5">
                {WAHANA_PROGRAMS.map((w) => (
                  <li key={w.name} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{w.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* PROGRAM DETAIL */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Program Operator Alat Berat di Wahana Totalita</h2>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto">
              Lima program yang paling sering ditanyakan peserta PENA. Cek{' '}
              <a
                href="https://wahanatotalita.com/jadwal/"
                target="_blank"
                rel="noopener sponsored"
                className="font-bold text-primary-700 underline underline-offset-2 hover:text-primary-900"
              >
                jadwal pelatihan operator forklift, crane, boiler, scaffolding dan PTP
              </a>{' '}
              langsung di situs Wahana Totalita.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WAHANA_PROGRAMS.map((w) => (
              <div key={w.name} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-slate-900 text-sm">{w.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{w.desc}</p>
              </div>
            ))}
            <div className="bg-primary-50 rounded-2xl border border-primary-200 p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-bold text-primary-900 text-sm">Bukan Operator Alat Berat?</h3>
                <p className="text-xs text-primary-800 leading-relaxed">
                  Program Ahli K3 Umum, K3 Spesialis, SMK3, dan ISO 45001 tersedia langsung di PENA Consultant.
                </p>
              </div>
              <Link href="/pelatihan" className="inline-flex items-center gap-1 text-xs font-bold text-primary-700 hover:underline">
                Lihat semua program PENA &#8250;
              </Link>
            </div>
          </div>
        </section>

        {/* DISCLOSURE */}
        <section className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
            <h2 className="text-lg font-black text-slate-900">Kenapa Rekomendasi Ini Kami Berikan?</h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            PENA Consultant dan Wahana Totalita adalah <strong>dua perusahaan yang sepenuhnya terpisah</strong> &#8212;
            bukan satu grup usaha. Kami merujuk peserta ke sana untuk program operator alat berat karena:
          </p>
          <ul className="space-y-2.5">
            {[
              'Berbasis di Yogyakarta — satu wilayah operasional dengan PENA, memudahkan koordinasi jadwal dan lokasi.',
              'Fokus khusus pada pelatihan operator alat berat — bidang di luar spesialisasi utama kami.',
              'Status kelembagaan dapat Anda verifikasi secara mandiri melalui portal TemanK3 Kemnaker RI (temank3.kemnaker.go.id).',
              'Halaman ini adalah referral yang diungkapkan secara terbuka — bukan iklan tersembunyi.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* INTERNAL LINKS */}
        <section className="space-y-6">
          <h2 className="text-xl font-black text-slate-900 text-center">Butuh Layanan Lain dari PENA Consultant?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Ahli K3 Umum', href: '/pelatihan/ahli-k3-umum' },
              { label: 'Jadwal Batch 2026', href: '/jadwal' },
              { label: 'Semua Program', href: '/pelatihan' },
              { label: 'Panduan K3', href: '/panduan' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-white border border-slate-200 rounded-xl p-4 text-center text-sm font-bold text-slate-700 hover:border-primary-300 hover:text-primary-700 hover:shadow-sm transition-all"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-primary-950 to-primary-900 rounded-2xl p-8 sm:p-10 text-center space-y-4">
          <h2 className="text-2xl font-black text-white">Siap Sertifikasi Operator Alat Berat?</h2>
          <p className="text-slate-300 text-sm max-w-lg mx-auto">
            Kunjungi situs Wahana Totalita untuk informasi program, biaya, dan ketersediaan slot batch.
          </p>
          <a
            href="https://wahanatotalita.com/"
            target="_blank"
            rel="noopener sponsored"
            className="inline-flex items-center gap-2 bg-white text-primary-900 font-black text-sm px-6 py-3 rounded-xl hover:bg-primary-50 transition-colors shadow"
          >
            <ExternalLink className="w-4 h-4" />
            Kunjungi Wahana Totalita
          </a>
        </section>

        {/* FAQ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-slate-900 text-center">Pertanyaan Umum</h2>
          <div className="space-y-3 max-w-3xl mx-auto">
            {FAQS.map((f, i) => (
              <details
                key={i}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm group"
                {...(i === 0 ? { open: true } : {})}
              >
                <summary className="font-bold text-slate-900 cursor-pointer list-none flex justify-between items-center gap-4 group-hover:text-primary-700">
                  <span>{f.question}</span>
                  <span className="text-slate-400 text-lg leading-none shrink-0 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="mt-3 pt-3 border-t border-slate-100 text-sm text-slate-600 leading-relaxed">
                  {f.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
