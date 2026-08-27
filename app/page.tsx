import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Award, Users, CheckCircle2, Calendar, ArrowRight, Building2, MapPin, Star, BookOpen, Clock, PhoneCall, HelpCircle } from 'lucide-react';
import { getPrograms, getBatches, getIndustries, getLocations, getTestimonials, getArticles, getWaLink } from '@/lib/data';
import OfferingCard from '@/components/OfferingCard';
import TrustLogoBar from '@/components/TrustLogoBar';
import CorporateQuoteForm from '@/components/CorporateQuoteForm';
import { FaqJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://penaconsultant.com',
  },
  title: 'PENA Consultant — Pusat Pelatihan & Sertifikasi K3 Resmi Kemnaker RI & BNSP',
  description: 'Lembaga pembinaan, sertifikasi profesi K3 resmi Kemnaker RI & BNSP di Indonesia. Jadwal batch 2026, Tempat Uji Kompetensi resmi, materi lengkap & garansi kelulusan.',
};

const topCities = [
  { name: 'Jakarta', slug: 'jakarta', desc: 'Pusat Uji Kompetensi & Public Training Ibu Kota', highlight: 'Kelas Public & Onsite' },
  { name: 'Surabaya', slug: 'surabaya', desc: 'TUK Mandiri & Hub Industri Jawa Timur', highlight: 'TUK Mandiri Terakreditasi' },
  { name: 'Balikpapan', slug: 'balikpapan', desc: 'Hub Migas & Konstruksi Ibu Kota Nusantara (IKN)', highlight: 'Pusat K3 Sektor Energi' },
  { name: 'Medan', slug: 'medan', desc: 'Pusat Sertifikasi K3 Perkebunan & Industri Sumatera', highlight: 'Layanan Sumatera Bagian Utara' },
  { name: 'Bandung', slug: 'bandung', desc: 'TUK Manufaktur & Tekstil Jawa Barat', highlight: 'Kelas Rutin Tiap Bulan' },
];

const homepageFaqs = [
  {
    question: 'Apa perbedaan sertifikasi K3 resmi Kemnaker RI dan sertifikasi BNSP?',
    answer: 'Sertifikasi Kemnaker RI memberikan Surat Keputusan Penunjukan (SKP) dan Lisensi K3 resmi yang menjadi syarat legal wajib (mandatory) pemenuhan peraturan perundangan K3 di tempat kerja. Sertifikasi BNSP berbasis Standar Kompetensi Kerja Nasional Indonesia (SKKNI) yang membuktikan kompetensi teknis profesi K3 secara nasional maupun internasional.',
  },
  {
    question: 'Apakah sertifikat K3 yang diterbitkan PENA Consultant dapat diverifikasi keasliannya?',
    answer: 'Ya, 100% sertifikat pembinaan Kemnaker RI dapat diverifikasi langsung melalui portal resmi TemanK3 Kemnaker RI. Sertifikat BNSP terhubung langsung dengan sistem registrasi Badan Nasional Sertifikasi Profesi (BNSP).',
  },
  {
    question: 'Bagaimana metode pelaksanaan pelatihan K3 di PENA Consultant?',
    answer: 'Kami menyediakan 3 opsi fleksibel: Public Training Online (via Zoom interaktif dengan instruktur master), On-Site di 23 Tempat Uji Kompetensi (TUK) di seluruh Indonesia, serta In-House Training yang disesuaikan secara khusus dengan SOP industri perusahaan Anda.',
  },
  {
    question: 'Apakah perusahaan dapat mengajukan skema pembayaran bertahap atau invoice korporat?',
    answer: 'Tentu. Untuk pendaftaran korporat dan In-House Training, kami menyediakan skema pembayaran resmi perusahaan (Purchase Order, Invoice TOP, dan kelengkapan dokumen perpajakan resmi faktur pajak PPN/PPh).',
  },
];

export default function HomePage() {
  const allPrograms = getPrograms();
  const featuredPrograms = allPrograms.slice(0, 6);
  const upcomingBatches = getBatches().slice(0, 6);
  const latestGuides = getArticles().slice(0, 4);

  return (
    <div>
      {/* Homepage FAQ Schema Injection */}
      <FaqJsonLd faqs={homepageFaqs} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary-950 via-slate-900 to-slate-950 text-white pt-16 pb-24 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
        
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>PJK3 Resmi Kemnaker RI &bull; Lisensi BNSP RI</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
                Pusat Pelatihan &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-300 to-emerald-500">Sertifikasi K3 Resmi</span> di Indonesia
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                Tingkatkan kompetensi dan penuhi kepatuhan regulasi K3 perusahaan dengan <strong>70+ skema pembinaan resmi</strong>. Tersedia kelas Public Online, TUK On-Site, dan In-House Training Korporat di seluruh Indonesia.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={getWaLink('Halo Admin PENA Consultant, saya ingin konsultasi pendaftaran pelatihan K3 batch 2026.')}
                  target="_blank"
                  rel="noopener nofollow"
                  aria-label="Daftar Pelatihan Batch 2026 via WhatsApp"
                  className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-primary-800 hover:from-emerald-700 hover:to-primary-900 text-white font-black text-base px-8 py-4 rounded-xl shadow-xl hover:shadow-emerald-500/25 transition-all flex items-center gap-2.5 group cursor-pointer"
                >
                  <span>Daftar Batch 2026 Sekarang</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <Link
                  href="/pelatihan"
                  className="bg-slate-800/90 hover:bg-slate-700 text-white font-bold text-base px-6 py-4 rounded-xl border border-slate-700 transition-all"
                >
                  Katalog 70+ Program
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Sertifikat Resmi Kemnaker / BNSP</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instruktur Praktisi Senior</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Fasilitas Lengkap &amp; Ujian</span>
              </div>
            </div>

            {/* Right Hero Card: Quick Registration / Batch Highlight */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8 rounded-2xl shadow-2xl text-white space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">BATCH TERDEKAT 2026</span>
                  <span className="text-[11px] bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-1 rounded-md border border-emerald-500/30">
                    Pendaftaran Dibuka
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60">
                    <p className="font-bold text-base text-white">Pembinaan Ahli K3 Umum Kemnaker RI</p>
                    <div className="flex items-center gap-4 text-xs text-slate-300 mt-2">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-primary-400" /> Batch 21 (12 Hari)</span>
                      <span className="flex items-center gap-1">💻 Online Zoom</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60">
                    <p className="font-bold text-base text-white">Sertifikasi Ahli K3 Konstruksi BNSP</p>
                    <div className="flex items-center gap-4 text-xs text-slate-300 mt-2">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-primary-400" /> Batch 14 (3 Hari)</span>
                      <span className="flex items-center gap-1">🏢 Onsite / Blended</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={getWaLink('Halo Admin PENA Consultant, saya ingin menanyakan jadwal batch terdekat.')}
                    target="_blank"
                    rel="noopener nofollow"
                    aria-label="Cek Kuota & Jadwal Lengkap Batch 2026"
                    className="w-full block text-center bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm py-3 rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Cek Kuota &amp; Jadwal Lengkap →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Client Logos */}
      <TrustLogoBar />

      {/* Featured Programs Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary-700 bg-primary-50 px-3 py-1 rounded-md">
              PROGRAM UNGGULAN
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2">
              Sertifikasi K3 Paling Diminati
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Program pembinaan resmi dengan kelulusan tertinggi dan instruktur praktisi berpengalaman.
            </p>
          </div>
          <Link
            href="/pelatihan"
            className="text-xs sm:text-sm font-bold text-primary-700 hover:text-primary-800 flex items-center gap-1 shrink-0"
          >
            Lihat Semua Program ({allPrograms.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredPrograms.map((prog) => (
            <OfferingCard key={prog.slug} program={prog} />
          ))}
        </div>
      </section>

      {/* Corporate In-House Quote Generator Section */}
      <section className="py-12 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CorporateQuoteForm />
        </div>
      </section>

      {/* Upcoming Batches Table */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary-700 bg-primary-50 px-3 py-1 rounded-md">
            AGENDA RESMI
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2">
            Jadwal Pelatihan K3 2026
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Pilih tanggal pelaksanaan yang sesuai dengan jadwal kerja Anda. Kuota terbatas tiap batch.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-900 text-white font-bold">
                  <th className="py-3.5 px-4 sm:px-6">Program Pembinaan</th>
                  <th className="py-3.5 px-4">Batch</th>
                  <th className="py-3.5 px-4">Tanggal Mulai</th>
                  <th className="py-3.5 px-4">Metode</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {upcomingBatches.map((b) => (
                  <tr key={b.slug} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-bold text-slate-900">
                      <Link href={`/jadwal/${b.slug}`} className="hover:text-primary-700">
                        {b.offering_name || `Pelatihan K3 Batch ${b.batch_number}`}
                      </Link>
                    </td>
                    <td className="py-4 px-4 text-slate-600 font-medium">Batch {b.batch_number}</td>
                    <td className="py-4 px-4 text-slate-600">{b.start_date || 'TBA 2026'}</td>
                    <td className="py-4 px-4">
                      <span className="inline-block text-[11px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {b.mode || 'Blended / Online'}
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <Link
                        href={`/jadwal/${b.slug}`}
                        aria-label={`Detail Jadwal Batch ${b.batch_number}`}
                        className="text-xs font-bold text-primary-700 bg-primary-50 hover:bg-primary-600 hover:text-white px-3 py-1.5 rounded-lg transition-all"
                      >
                        Detail Batch
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Regional Branch Hubs Section (Internal Links to Top Cities) */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-700 bg-primary-100 px-3 py-1 rounded-md">
                JARINGAN NASIONAL
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2">
                Tempat Uji Kompetensi &amp; Layanan di 23 Kota
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Penyelenggaraan sertifikasi K3 tatap muka, uji kompetensi BNSP, dan in-house training di kota-kota strategis industri Indonesia.
              </p>
            </div>
            <Link
              href="/cabang"
              className="text-xs sm:text-sm font-bold text-primary-700 hover:text-primary-800 flex items-center gap-1 shrink-0"
            >
              Lihat Seluruh 23 Kota →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {topCities.map((city) => (
              <Link
                key={city.slug}
                href={`/cabang/${city.slug}`}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-primary-500 hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-black uppercase text-primary-700 bg-primary-50 px-2 py-0.5 rounded">
                      {city.highlight}
                    </span>
                    <MapPin className="w-4 h-4 text-slate-400 group-hover:text-primary-600 transition-colors" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-primary-700 transition-colors">
                    Pelatihan K3 {city.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {city.desc}
                  </p>
                </div>
                <span className="text-xs font-bold text-primary-700 flex items-center gap-1 pt-2 border-t border-slate-100">
                  Lihat Jadwal Kota →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge Base & Guides */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-3 py-1 rounded-md border border-emerald-800">
                KNOWLEDGE BASE K3
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-2">
                Panduan, Regulasi &amp; Edukasi K3
              </h2>
              <p className="text-sm text-slate-300 mt-1">
                Artikel referensi praktisi keselamatan kerja, regulasi Kemnaker, dan tips implementasi SMK3.
              </p>
            </div>
            <Link
              href="/panduan"
              className="text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 shrink-0"
            >
              Lihat 320+ Artikel Panduan →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestGuides.map((article) => (
              <Link
                key={article.slug}
                href={`/panduan/${article.slug}`}
                className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 hover:border-emerald-500 hover:shadow-lg transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                    {article.cluster?.name || 'Panduan K3'}
                  </span>
                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  {article.summary && (
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {article.summary}
                    </p>
                  )}
                </div>
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                  Baca Selengkapnya →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section on Homepage with Accordion and Schema */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-primary-700 block mb-2 flex items-center justify-center gap-1.5">
            <HelpCircle className="w-4 h-4" /> FAQ PEMBINAAN K3
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            Pertanyaan Umum Sertifikasi K3
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Informasi penting terkait legalitas sertifikat, metode ujian, dan pelaksanaan pelatihan di PENA Consultant.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {homepageFaqs.map((faq, idx) => (
            <details key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm group">
              <summary className="font-bold text-slate-900 cursor-pointer list-none flex justify-between items-center group-hover:text-primary-700 text-sm sm:text-base">
                <span>{faq.question}</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-3 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        <div className="text-center pt-2">
          <Link
            href="/faq"
            className="inline-flex items-center gap-1 text-xs font-bold text-primary-700 hover:text-primary-800 bg-primary-50 px-4 py-2 rounded-xl transition-all"
          >
            Lihat Semua Tanya Jawab (FAQ Lengkap) →
          </Link>
        </div>
      </section>
    </div>
  );
}