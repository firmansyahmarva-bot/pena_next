import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Award, CheckCircle2, ExternalLink, Info, Calendar, Compass } from 'lucide-react';
import { FaqJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';

/* ─────────────────────────────────────────────
   Metadata & Open Graph
───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   Static FAQ Data
───────────────────────────────────────────── */
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

export default function RekanPelatihanPage() {
  return (
    <>
      {/* ── Structured Data ── */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: 'https://penaconsultant.com' },
          { name: 'Rekan Pelatihan', url: 'https://penaconsultant.com/rekan-pelatihan' },
        ]}
      />
      <FaqJsonLd faqs={FAQS} />

      <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

        {/* ── BREADCRUMB ── */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-1.5">
          <Link href="/" className="hover:text-primary-700">Beranda</Link>
          <span>/</span>
          <span className="text-slate-700 font-semibold">Rekan Pelatihan</span>
        </nav>

        {/* ── HERO ── */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 sm:p-12 space-y-4">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-700 bg-primary-50 px-3 py-1.5 rounded-md">
            Rekomendasi Rekan Kerja
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
            Butuh Sertifikasi <span className="text-primary-700">Operator Alat Berat?</span>
          </h1>
          <p className="text-slate-600 leading-relaxed max-w-3xl">
            PENA Consultant berfokus pada sertifikasi Ahli K3 Umum, K3 Spesialis, Auditor SMK3, dan ISO 45001.
            Untuk pelatihan operator alat berat — forklift, crane, boiler, scaffolding, dan PTP — kami merekomendasikan Wahana Totalita,
            mitra lembaga pelatihan K3 berbasis di Yogyakarta yang berpengalaman di bidang operasional alat berat tersebut.
          </p>
        </section>

        {/* ── KAPAN PILIH SIAPA ── */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Kapan Sebaiknya Memilih Wahana Totalita?</h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto">
              PENA Consultant dan Wahana Totalita adalah dua perusahaan yang terpisah dan saling melengkapi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PENA Card */}
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

            {/* Wahana Card */}
            <div className="bg-white rounded-2xl border border-amber-200 p-6 space-y-4">
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-600" />
                Pertimbangkan Wahana Totalita jika Anda butuh:
              </h3>
              <ul className="space-y-2.5">
                {[
                  'Operator Forklift (Kelas 1 & 2)',
                  'Operator Crane (Kelas 1, 2 & 3)',
                  'Pesawat Tenaga & Produksi (PTP)',
                  'Operator Boiler (Kelas 2)',
                  'Operator Scaffolding',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── PROGRAM CARDS (5 Restored Program Links) ── */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Program Operator Alat Berat di Wahana Totalita</h2>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto">
              Berikut lima program sertifikasi operator yang diselenggarakan oleh Wahana Totalita untuk memenuhi kepatuhan K3 industri.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Card 1: Forklift */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-sm">Operator Forklift (Kelas 1 &amp; 2)</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Dibutuhkan oleh operator pergudangan, pusat logistik, dan area pabrik manufaktur. Pelatihan ini memastikan operator memahami batas tonase, stabilitas unit, serta prosedur inspeksi harian (P2H). Sebelum mendaftar, pastikan calon peserta telah mengonfirmasi kapasitas tonase unit forklift yang dioperasikan di lokasi kerja.
                </p>
              </div>
              <a
                href="https://wahanatotalita.com/pelatihan/pelatihan-k3-operator-forklift-kelas-2-sertifikasi-kemnaker-ri/"
                target="_blank"
                rel="noopener sponsored"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary-700 hover:text-primary-900 hover:underline mt-3"
              >
                <span>Pelatihan Operator Forklift Kelas 2 Kemnaker RI</span>
                <ExternalLink className="w-4 h-4 shrink-0" />
              </a>
            </div>

            {/* Card 2: Crane */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-sm">Operator Crane (Kelas 1, 2 &amp; 3)</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Umumnya diperlukan pada industri konstruksi, dermaga pelabuhan, galangan kapal, dan sektor manufaktur berat. Program ini fokus pada teknik pengangkatan aman, komunikasi aba-aba rigger, serta perhitungan beban kerja aman (SWL). Pastikan memeriksa klasifikasi tipe crane dan tingkat kelas kewenangan yang dipersyaratkan tempat kerja.
                </p>
              </div>
              <a
                href="https://wahanatotalita.com/pelatihan/pelatihan-k3-operator-crane-kelas-3-sertifikasi-kemnaker-ri/"
                target="_blank"
                rel="noopener sponsored"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary-700 hover:text-primary-900 hover:underline mt-3"
              >
                <span>Pelatihan Operator Crane Kelas 3 Kemnaker RI</span>
                <ExternalLink className="w-4 h-4 shrink-0" />
              </a>
            </div>

            {/* Card 3: PTP */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-sm">Pesawat Tenaga &amp; Produksi (PTP)</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Diperuntukkan bagi teknisi dan operator mesin produksi di fasilitas pengolahan, pabrik manufaktur, dan industri proses. Pembinaan mencakup keselamatan pengoperasian penggerak mula, mesin perkakas, dan transmisi tenaga mekanik. Calon peserta dianjurkan mengidentifikasi jenis mesin utama dan spesifikasi teknis peralatan produksi di lokasi kerja.
                </p>
              </div>
              <a
                href="https://wahanatotalita.com/pelatihan/pelatihan-operator-pesawat-tenaga-produksi-ptp/"
                target="_blank"
                rel="noopener sponsored"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary-700 hover:text-primary-900 hover:underline mt-3"
              >
                <span>Pelatihan Operator Pesawat Tenaga dan Produksi</span>
                <ExternalLink className="w-4 h-4 shrink-0" />
              </a>
            </div>

            {/* Card 4: Boiler */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-sm">Operator Boiler (Kelas 2)</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Wajib bagi operator ketel uap pada pembangkit listrik, industri tekstil, pengolahan makanan, dan fasilitas kimia bertekanan tinggi. Materi difokuskan pada pemantauan tekanan uap, pencegahan ledakan bejana tekan, serta perawatan sistem keamanan boiler. Sebelum pendaftaran, konfirmasikan kapasitas uap ketel uap yang dioperasikan.
                </p>
              </div>
              <a
                href="https://wahanatotalita.com/pelatihan/pelatihan-k3-operator-boiler-kelas-2-sertifikasi-kemnaker-ri/"
                target="_blank"
                rel="noopener sponsored"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary-700 hover:text-primary-900 hover:underline mt-3"
              >
                <span>Pelatihan Operator Boiler Kelas 2 Kemnaker RI</span>
                <ExternalLink className="w-4 h-4 shrink-0" />
              </a>
            </div>

            {/* Card 5: Scaffolding */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-sm">Operator Scaffolding</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Dibutuhkan oleh teknisi perancah di proyek pembangunan gedung bertingkat, pemeliharaan kilang, dan pekerjaan elevasi. Pelatihan menekankan standar pemasangan, inspeksi kelaikan perancah, dan keselamatan pencegahan jatuh. Calon peserta disarankan memverifikasi kesiapan fisik serta kelengkapan dokumen persyaratan medis sebelum mengikuti kelas.
                </p>
              </div>
              <a
                href="https://wahanatotalita.com/pelatihan/pelatihan-k3-operator-scaffolding-sertifikasi-kemnaker-ri/"
                target="_blank"
                rel="noopener sponsored"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary-700 hover:text-primary-900 hover:underline mt-3"
              >
                <span>Pelatihan Operator Scaffolding Kemnaker RI</span>
                <ExternalLink className="w-4 h-4 shrink-0" />
              </a>
            </div>

            {/* Card 6: PENA Internal Link Card */}
            <div className="bg-primary-50 rounded-2xl border border-primary-200 p-5 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-bold text-primary-900 text-sm">Bukan Operator Alat Berat?</h3>
                <p className="text-xs text-primary-800 leading-relaxed">
                  Program Ahli K3 Umum, K3 Spesialis, SMK3, dan ISO 45001 tersedia langsung di PENA Consultant.
                </p>
              </div>
              <Link
                href="/pelatihan"
                className="inline-flex items-center gap-1 text-xs font-bold text-primary-700 hover:underline mt-3"
              >
                Lihat semua program PENA →
              </Link>
            </div>
          </div>
        </section>

        {/* ── NEW SECTION: Cara Memilih Program Operator yang Tepat ── */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2.5">
            <Compass className="w-5 h-5 text-primary-700" />
            <h2 className="text-xl font-black text-slate-900">Cara Memilih Program Operator yang Tepat</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-600">
            <div className="space-y-1.5">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-800 font-black text-xs flex items-center justify-center">1</span>
                Pilih Berdasarkan Peralatan yang Dioperasikan
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pl-8">
                Sesuaikan skema pelatihan dengan unit alat berat atau mesin produksi yang digunakan di area operasional harian perusahaan.
              </p>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-800 font-black text-xs flex items-center justify-center">2</span>
                Konfirmasi Kelas Kewenangan dengan Pemberi Kerja
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pl-8">
                Pastikan klasifikasi kelas (misalnya Kelas 1 atau Kelas 2) sesuai dengan kapasitas tonase atau spesifikasi alat di lokasi kerja.
              </p>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-800 font-black text-xs flex items-center justify-center">3</span>
                Periksa Kelengkapan Persyaratan Peserta
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pl-8">
                Siapkan salinan ijazah, pasfoto, surat keterangan sehat, dan dokumen administratif pendukung sesuai regulasi pembinaan.
              </p>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-800 font-black text-xs flex items-center justify-center">4</span>
                Konfirmasi Jadwal dan Lokasi Langsung
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pl-8">
                Hubungi penyedia pelatihan untuk memastikan kepastian tanggal pembinaan, ketersediaan slot batch, dan metode kelas yang tersedia.
              </p>
            </div>
          </div>
        </section>

        {/* ── DISCLOSURE ── */}
        <section className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
            <h2 className="text-lg font-black text-slate-900">Kenapa Rekomendasi Ini Kami Berikan?</h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            PENA Consultant dan Wahana Totalita adalah <strong>dua perusahaan yang sepenuhnya terpisah</strong> —
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

        {/* ── INTERNAL LINKS BACK TO PENA ── */}
        <section className="space-y-6">
          <h2 className="text-xl font-black text-slate-900 text-center">
            Butuh Layanan Lain dari PENA Consultant?
          </h2>
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

        {/* ── BOTTOM CTA (1 Schedule Link, Zero Homepage Link) ── */}
        <section className="bg-gradient-to-br from-primary-950 to-primary-900 rounded-2xl p-8 sm:p-10 text-center space-y-4">
          <h2 className="text-2xl font-black text-white">Siap Sertifikasi Operator Alat Berat?</h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Pengunjung dapat memeriksa jadwal pembinaan terbaru, tanggal pelaksanaan, lokasi kelas, serta ketersediaan slot pendaftaran langsung melalui halaman jadwal resmi Wahana Totalita.
          </p>
          <div>
            <a
              href="https://wahanatotalita.com/jadwal/"
              target="_blank"
              rel="noopener sponsored"
              className="inline-flex items-center gap-2 bg-white text-primary-900 font-black text-sm px-6 py-3.5 rounded-xl hover:bg-primary-50 transition-colors shadow"
            >
              <Calendar className="w-4 h-4 text-primary-700" />
              <span>Lihat Jadwal Pelatihan Operator Terbaru</span>
              <ExternalLink className="w-4 h-4 text-primary-700" />
            </a>
          </div>
        </section>

        {/* ── FAQ ── */}
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
