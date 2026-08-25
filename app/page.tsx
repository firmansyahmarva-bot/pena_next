import React from 'react';
import Link from 'next/link';
import { Shield, Award, Users, CheckCircle2, Calendar, ArrowRight, Building2, MapPin, Star, BookOpen, Clock, PhoneCall } from 'lucide-react';
import { getPrograms, getBatches, getIndustries, getLocations, getTestimonials, getArticles, getWaLink } from '@/lib/data';
import OfferingCard from '@/components/OfferingCard';
import TrustLogoBar from '@/components/TrustLogoBar';
import CorporateQuoteForm from '@/components/CorporateQuoteForm';

export default function HomePage() {
  const allPrograms = getPrograms();
  const featuredPrograms = allPrograms.slice(0, 6);
  const upcomingBatches = getBatches().slice(0, 6);
  const industries = getIndustries().slice(0, 6);
  const latestGuides = getArticles().slice(0, 4);
  const testimonials = getTestimonials().slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary-950 via-slate-900 to-slate-950 text-white pt-16 pb-24 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full">
                <Shield className="w-4 h-4 text-emerald-400" />
                PJK3 Resmi Kemnaker RI (SKP. 5/124/AS.02.04/I/2023) &amp; Lisensi BNSP RI
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
                  className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-primary-700 hover:from-emerald-600 hover:to-primary-800 text-white font-black text-base px-8 py-4 rounded-xl shadow-xl hover:shadow-emerald-500/25 transition-all flex items-center gap-2.5 group"
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
                    <h3 className="font-bold text-base text-white">Pembinaan Ahli K3 Umum Kemnaker RI</h3>
                    <div className="flex items-center gap-4 text-xs text-slate-300 mt-2">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-primary-400" /> Batch 21 (12 Hari)</span>
                      <span className="flex items-center gap-1">🌐 Online Zoom</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60">
                    <h3 className="font-bold text-base text-white">Sertifikasi Ahli K3 Konstruksi BNSP</h3>
                    <div className="flex items-center gap-4 text-xs text-slate-300 mt-2">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-primary-400" /> Batch 14 (3 Hari)</span>
                      <span className="flex items-center gap-1">📍 Onsite / Blended</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={getWaLink('Halo Admin PENA Consultant, saya ingin menanyakan jadwal batch terdekat.')}
                    target="_blank"
                    rel="noopener nofollow"
                    className="w-full block text-center bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 text-slate-950 font-black py-3 rounded-xl text-sm transition-all shadow-md"
                  >
                    💬 Konsultasi Jadwal &amp; Biaya Batch via WA
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Logo Bar */}
      <TrustLogoBar />

      {/* Featured Programs Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-primary-700 block mb-2">
                KATALOG UNGGULAN RESMI
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
                Program Pelatihan K3 Paling Populer
              </h2>
            </div>
            <Link
              href="/pelatihan"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 font-bold text-sm text-primary-700 hover:text-primary-800"
            >
              Lihat Seluruh 70+ Program <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPrograms.map((p) => (
              <OfferingCard key={p.slug} program={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us: 4 Value Propositions */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-primary-700 block mb-2">
              KEUNGGULAN UTAMA
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
              Mengapa Memilih PENA Consultant?
            </h2>
            <p className="text-slate-600 mt-3 text-sm sm:text-base">
              Kami menjamin legalitas sertifikat resmi, materi praktis berstandar industri, dan pendampingan pasca-pelatihan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">100% Terakreditasi Resmi</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                PJK3 berlisensi resmi Kemnaker RI dan Tempat Uji Kompetensi (TUK) LSP BNSP dengan sertifikat asli dan terdaftar di Teman K3.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Instruktur Praktisi Ahli</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dibimbing langsung oleh praktisi K3 senior dari industri Migas, Pertambangan, Konstruksi, dan Pengawas Ketenagakerjaan.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Jadwal Pasti Running</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Jadwal pelatihan public batch dibuka setiap bulan tanpa takut di-reschedule, serta opsi in-house dengan tanggal fleksibel.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Alumni Network &amp; Karir</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Akses ke grup komunitas 15.000+ alumni K3 untuk sharing regulasi, info lowongan kerja HSE, dan konsultasi berkelanjutan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Batches Table (Google Position 0 Semantic Table) */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-primary-700 block mb-2">
              JADWAL KALENDER
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
              Jadwal Batch Pembinaan Terdekat 2026
            </h2>
            <p className="text-slate-600 mt-2 text-sm">
              Daftar sebelum kuota batch terpenuhi untuk mendapatkan slot ujian sertifikasi resmi.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-100 text-slate-900 uppercase text-xs font-bold border-b border-slate-200">
                <tr>
                  <th scope="col" className="px-6 py-4">Program Pelatihan</th>
                  <th scope="col" className="px-6 py-4">Sertifikasi</th>
                  <th scope="col" className="px-6 py-4">Tanggal Batch</th>
                  <th scope="col" className="px-6 py-4">Metode Pelaksanaan</th>
                  <th scope="col" className="px-6 py-4">Biaya Investasi</th>
                  <th scope="col" className="px-6 py-4">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {upcomingBatches.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">
                      <Link href={`/jadwal/${b.slug}`} className="hover:text-primary-700">
                        {b.offering_name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 font-semibold text-emerald-800">
                      {b.certification_body === 'kemnaker' ? '🛡️ Kemnaker RI' : '🦅 BNSP RI'}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {b.start_date}
                    </td>
                    <td className="px-6 py-4">
                      {b.is_online ? '🌐 Online Zoom' : `📍 ${b.location_name}`}
                    </td>
                    <td className="px-6 py-4 font-black text-slate-900">
                      {b.normal_price ? `Rp ${b.normal_price.toLocaleString('id-ID')}` : 'Hubungi Admin'}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/jadwal/${b.slug}`}
                        className="inline-flex items-center text-xs font-bold text-primary-700 bg-primary-50 hover:bg-primary-600 hover:text-white px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Detail &amp; Daftar →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/jadwal"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-7 py-3.5 rounded-xl transition-all shadow"
            >
              Lihat Kalender Lengkap Batch 2026 →
            </Link>
          </div>
        </div>
      </section>

      {/* Corporate Quotation Calculator RFQ Section */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <CorporateQuoteForm />
        </div>
      </section>

      {/* Latest Guides & Articles */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-primary-700 block mb-2">
                EDUKASI &amp; REGULASI K3
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
                Panduan &amp; Artikel K3 Terpopuler
              </h2>
            </div>
            <Link
              href="/panduan"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 font-bold text-sm text-primary-700 hover:text-primary-800"
            >
              Lihat 320+ Panduan Lengkap <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestGuides.map((art) => (
              <article key={art.slug} className="bg-slate-50 p-5 rounded-xl border border-slate-200 hover:border-primary-500 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-primary-700 bg-primary-100/60 px-2 py-0.5 rounded inline-block mb-2.5">
                    {art.cluster?.name || 'PANDUAN K3'}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 line-clamp-2 mb-2 leading-snug">
                    <Link href={`/panduan/${art.slug}`} className="hover:text-primary-700">
                      {art.title}
                    </Link>
                  </h3>
                  {art.summary && (
                    <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                      {art.summary}
                    </p>
                  )}
                </div>
                <Link href={`/panduan/${art.slug}`} className="text-xs font-bold text-primary-700 hover:underline pt-2 border-t border-slate-200">
                  Baca Panduan →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}