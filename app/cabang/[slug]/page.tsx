import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Phone, Shield, CheckCircle2, Building2, Award, Calendar, HelpCircle, ArrowRight, CheckSquare } from 'lucide-react';
import { getLocations, getLocationBySlug, getPrograms, getBatches, getWaLink } from '@/lib/data';
import StructuredContent from '@/components/StructuredContent';
import CorporateQuoteForm from '@/components/CorporateQuoteForm';
import { BreadcrumbJsonLd, FaqJsonLd } from '@/components/JsonLd';

export async function generateStaticParams() {
  return getLocations().map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocationBySlug(slug);
  if (!loc) return {};

  return {
    title: loc.meta_title || `Pelatihan & Sertifikasi K3 di ${loc.name} 2026 — PENA Consultant`,
    description: loc.meta_description || `Pusat pembinaan sertifikasi K3 resmi Kemnaker RI & BNSP di ${loc.name}. Jadwal, biaya, dan Tempat Uji Kompetensi resmi.`,
  };
}

export default async function BranchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loc = getLocationBySlug(slug);
  if (!loc) notFound();

  const cityBatches = getBatches().filter(b => b.location_name?.toLowerCase().includes(loc.name.toLowerCase())).slice(0, 4);

  const breadcrumbs = [
    { name: 'Home', url: 'https://penaconsultant.co.id' },
    { name: 'Lokasi TUK', url: 'https://penaconsultant.co.id/cabang' },
    { name: loc.name, url: `https://penaconsultant.co.id/cabang/${loc.slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      {loc.faqs && <FaqJsonLd faqs={loc.faqs} />}

      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <nav className="text-xs font-semibold text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-primary-700">Home</Link>
          <span>/</span>
          <Link href="/cabang" className="hover:text-primary-700">Cabang &amp; TUK</Link>
          <span>/</span>
          <span className="text-slate-900 line-clamp-1">{loc.name}</span>
        </nav>

        {/* Hero Banner Header */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold text-xs px-3 py-1 rounded-md flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                TEMPAT UJI KOMPETENSI RESMI WILAYAH {loc.name.toUpperCase()}
              </span>
              <span className="bg-slate-100 text-slate-700 font-semibold text-xs px-3 py-1 rounded-md">
                PJK3 Kemnaker RI &amp; BNSP
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
              Pelatihan &amp; Sertifikasi K3 di {loc.name} 2026
            </h1>

            {loc.tagline && (
              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                {loc.tagline}
              </p>
            )}

            {/* Address Card */}
            {loc.address && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm text-slate-700 mt-4">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Alamat Fasilitas Pelatihan &amp; TUK {loc.name}:</strong>
                    <span>{loc.address}</span>
                  </div>
                </div>
                <a
                  href={getWaLink(`Halo Admin PENA Consultant, saya ingin konsultasi pendaftaran pelatihan K3 di cabang ${loc.name}.`)}
                  target="_blank"
                  rel="noopener nofollow"
                  className="shrink-0 bg-primary-700 hover:bg-primary-800 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow transition-all"
                >
                  Hubungi Kantor {loc.name} →
                </a>
              </div>
            )}
          </div>
        </div>

        {/* 2-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Structured Intro Articles */}
            <article className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <StructuredContent blocks={loc.intro} />
            </article>

            {/* TUK Facilities Grid */}
            {loc.tuk_facilities && (
              <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary-600" /> Fasilitas Tempat Uji Kompetensi (TUK) di {loc.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {loc.tuk_facilities.map((fac, i) => (
                    <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{fac}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Localized FAQ Accordion */}
            {loc.faqs && loc.faqs.length > 0 && (
              <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary-600" /> FAQ — Pertanyaan Pelatihan K3 di {loc.name}
                </h2>
                <div className="space-y-3">
                  {loc.faqs.map((faq, idx) => (
                    <details key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 group">
                      <summary className="font-bold text-sm text-slate-900 cursor-pointer list-none flex justify-between items-center group-hover:text-primary-700">
                        <span>{faq.question}</span>
                        <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <p className="mt-3 pt-3 border-t border-slate-200 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Corporate Quote Form */}
            <CorporateQuoteForm defaultProgram={`Pelatihan In-House K3 Wilayah ${loc.name}`} />
          </div>

          {/* Sticky Sidebar Right Rail (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 bg-white p-6 rounded-2xl border border-slate-200 shadow-xl space-y-5">
              <span className="text-[11px] uppercase font-black tracking-wider text-primary-700 block">
                LAYANAN CABANG {loc.name.toUpperCase()}
              </span>

              <h3 className="text-base font-bold text-slate-900">
                Pusat Pelatihan K3 Resmi di {loc.name}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                Tersedia kelas Public Training rutin setiap bulan serta layanan In-House Training langsung di pabrik atau lokasi proyek Anda.
              </p>

              <div className="space-y-3 pt-3 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sertifikat &amp; SKP Resmi Kemnaker RI</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instruktur Praktisi &amp; Pengawas Disnaker</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Modul, Training Kit &amp; Bimbingan Ujian</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Layanan In-House Seluruh Area {loc.name}</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href={getWaLink(`Halo Admin PENA Consultant, saya ingin mendaftar pelatihan K3 untuk wilayah ${loc.name}.`)}
                  target="_blank"
                  rel="noopener nofollow"
                  className="w-full block text-center bg-gradient-to-r from-emerald-600 to-primary-700 hover:from-emerald-700 text-white font-black py-3.5 rounded-xl shadow-md text-xs transition-all"
                >
                  💬 Daftar via WhatsApp {loc.name}
                </a>
                <Link
                  href="/jadwal"
                  className="w-full block text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 rounded-xl text-xs transition-all"
                >
                  Lihat Kalender Batch 2026 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}