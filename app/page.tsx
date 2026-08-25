import React from 'react';
import Link from 'next/link';
import { Shield, Award, Users, CheckCircle2, Calendar, ArrowRight, Building2, MapPin, Phone } from 'lucide-react';
import { getPrograms, getBatches, getIndustries, getLocations, getTestimonials, getWaLink } from '@/lib/data';
import OfferingCard from '@/components/OfferingCard';

export default function HomePage() {
  const allPrograms = getPrograms();
  const featuredPrograms = allPrograms.slice(0, 6);
  const upcomingBatches = getBatches().slice(0, 6);
  const industries = getIndustries().slice(0, 6);
  const locations = getLocations().slice(0, 6);
  const testimonials = getTestimonials().slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary-950 via-slate-900 to-slate-950 text-white pt-20 pb-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full">
              <Shield className="w-4 h-4" /> PJK3 Resmi Kemnaker RI &amp; Lembaga Sertifikasi Profesi BNSP
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Pusat Pelatihan &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-300 to-emerald-500">Sertifikasi K3 Resmi</span> di Indonesia
            </h1>
            <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed">
              Tingkatkan kompetensi keselamatan kerja dengan 70+ skema pembinaan resmi berlisensi Kemnaker RI &amp; BNSP. Tersedia kelas Public Online, On-Site TUK, dan In-House Training Korporat.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href={getWaLink('Halo Admin PENA Consultant, saya ingin konsultasi pendaftaran pelatihan K3.')}
                target="_blank"
                rel="noopener nofollow"
                className="bg-gradient-to-r from-emerald-500 to-primary-600 hover:from-emerald-600 hover:to-primary-700 text-white font-black text-base px-7 py-3.5 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center gap-2"
              >
                <span>Daftar Batch 2026</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                href="/pelatihan"
                className="bg-slate-800/80 hover:bg-slate-700 text-white font-bold text-base px-6 py-3.5 rounded-xl border border-slate-700 transition-all"
              >
                Lihat 70+ Program Pelatihan
              </Link>
            </div>

            {/* Stat Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-amber-400 block">70+</span>
                <span className="text-xs text-slate-400">Skema Program K3</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-emerald-400 block">15.000+</span>
                <span className="text-xs text-slate-400">Alumni Tersertifikasi</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-blue-400 block">500+</span>
                <span className="text-xs text-slate-400">Mitra Perusahaan</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-purple-400 block">100%</span>
                <span className="text-xs text-slate-400">Legalitas Terdaftar</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-primary-700 block mb-2">
                KATALOG UNGGULAN
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

      {/* Upcoming Batches Table Preview */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-primary-700 block mb-2">
              JADWAL TERDEKAT
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
              Kalender Batch Pembinaan 2026
            </h2>
            <p className="text-slate-600 mt-2">
              Pilih jadwal pembinaan yang sesuai dengan agenda kerja dan lokasi Anda.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-100 text-slate-900 uppercase text-xs font-bold border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Program Pelatihan</th>
                  <th className="px-6 py-4">Sertifikasi</th>
                  <th className="px-6 py-4">Tanggal Batch</th>
                  <th className="px-6 py-4">Metode</th>
                  <th className="px-6 py-4">Biaya Investasi</th>
                  <th className="px-6 py-4">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {upcomingBatches.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">
                      <Link href={`/jadwal/${b.slug}`} className="hover:text-primary-700">
                        {b.offering_name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 font-semibold text-emerald-800">
                      {b.certification_body === 'kemnaker' ? 'Kemnaker RI' : 'BNSP RI'}
                    </td>
                    <td className="px-6 py-4">
                      {b.start_date}
                    </td>
                    <td className="px-6 py-4">
                      {b.is_online ? '🌐 Online' : `📍 ${b.location_name}`}
                    </td>
                    <td className="px-6 py-4 font-black text-slate-900">
                      {b.normal_price ? `Rp ${b.normal_price.toLocaleString('id-ID')}` : 'Hubungi Admin'}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/jadwal/${b.slug}`}
                        className="inline-flex items-center text-xs font-bold text-primary-700 hover:underline"
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
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-6 py-3 rounded-lg transition-all"
            >
              Lihat Kalender Lengkap Batch 2026 →
            </Link>
          </div>
        </div>
      </section>

      {/* Sektor Industri Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-primary-700 block mb-2">
              SEKTORAL
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
              Solusi K3 Sesuai Karakteristik Industri Anda
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind) => (
              <Link
                key={ind.slug}
                href={`/industri/${ind.slug}`}
                className="bg-white p-6 rounded-xl border border-slate-200 hover:border-primary-500 hover:shadow-lg transition-all group"
              >
                <Building2 className="w-8 h-8 text-primary-600 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-700 mb-2">
                  {ind.name}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-2">
                  {ind.description}
                </p>
                <span className="text-xs font-bold text-primary-700 mt-4 inline-block">
                  Pelajari Kebutuhan K3 Sektor Ini →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Corporate In-House Banner */}
      <section className="py-20 bg-gradient-to-br from-primary-950 via-primary-900 to-slate-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs font-bold tracking-widest uppercase text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full inline-block">
            IN-HOUSE TRAINING KORPORAT
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Pelatihan K3 Langsung di Lokasi Pabrik atau Proyek Anda
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Dapatkan penawaran harga khusus perusahaan, materi yang disesuaikan dengan SOP internal, dan jadwal pelatihan fleksibel di seluruh wilayah Indonesia.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a
              href={getWaLink('Halo Admin PENA Consultant, kami ingin meminta penawaran proposal in-house training K3 perusahaan kami.')}
              target="_blank"
              rel="noopener nofollow"
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-base px-8 py-3.5 rounded-xl shadow-lg transition-all"
            >
              💬 Request Proposal In-House via WhatsApp
            </a>
            <Link
              href="/kontak"
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-base px-7 py-3.5 rounded-xl border border-white/20 transition-all"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}