import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  MapPin, Phone, Shield, CheckCircle2, Building2, Award, Calendar, 
  HelpCircle, ArrowRight, CheckSquare, Wrench, FileText, Users, Clock, Send, BookOpen
} from 'lucide-react';
import { getLocations, getLocationBySlug, getPrograms, getBatches, getIndustries, getWaLink } from '@/lib/data';
import { getLocationSiloData } from '@/lib/silos';
import StructuredContent from '@/components/StructuredContent';
import CorporateQuoteForm from '@/components/CorporateQuoteForm';
import SiloHubCrosslinks from '@/components/SiloHubCrosslinks';
import { BreadcrumbJsonLd, FaqJsonLd } from '@/components/JsonLd';

export async function generateStaticParams() {
  return getLocations().map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocationBySlug(slug);
  if (!loc) return {};
  const pageTitle = loc.meta_title || `Pelatihan & Sertifikasi K3 di ${loc.name} 2026 — Jadwal & Biaya Resmi`;
  const pageDesc = loc.meta_description || `Pusat pembinaan sertifikasi K3 resmi Kemnaker RI & BNSP di ${loc.name}. Layanan public batch, TUK mandiri, dan in-house training korporasi di seluruh kawasan industri ${loc.name}.`;
  const pageUrl = `https://penaconsultant.com/cabang/${slug}`;
  return {
    alternates: { canonical: pageUrl },
    title: pageTitle,
    description: pageDesc,
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: pageUrl,
      siteName: 'PENA Consultant',
      locale: 'id_ID',
      type: 'website',
      images: [{ url: 'https://penaconsultant.com/images/og-share-card.png', width: 1200, height: 630, alt: pageTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDesc,
      images: ['https://penaconsultant.com/images/og-share-card.png'],
    },
    keywords: [
      `pelatihan k3 ${loc.name}`,
      `sertifikasi k3 ${loc.name}`,
      `ahli k3 umum ${loc.name}`,
      `biaya pelatihan k3 di ${loc.name}`,
      `jadwal training k3 ${loc.name} 2026`,
      `in house training k3 ${loc.name}`,
    ],
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loc = getLocationBySlug(slug);
  if (!loc) notFound();

  const allLocations = getLocations();
  const allIndustries = getIndustries();
  const nearbyLocations = allLocations.filter((l) => l.slug !== loc.slug).slice(0, 8);

  const siloData = getLocationSiloData(loc);
  const { featuredPrograms, localBatches, localArticles } = siloData;

  const faqsToRender = loc.faqs && loc.faqs.length > 0 ? loc.faqs : [
    {
      question: `Apakah ada kantor cabang atau Tempat Uji Kompetensi (TUK) di ${loc.name}?`,
      answer: `PENA Consultant menyediakan fasilitas TUK mandiri resmi dan layanan in-house training terakreditasi langsung ke kawasan industri di wilayah ${loc.name} dan sekitarnya.`,
    },
    {
      question: `Bagaimana cara pendaftaran sertifikasi K3 Kemnaker / BNSP di ${loc.name}?`,
      answer: `Pendaftaran dapat dilakukan secara online melalui WhatsApp Admin PENA Consultant. Tim kami akan memverifikasi berkas persyaratan dan menjadwalkan sesi pembinaan sesuai batch terdekat.`,
    },
    {
      question: `Apakah PENA Consultant melayani in-house training untuk perusahaan di ${loc.name}?`,
      answer: `Ya, kami melayani in-house training K3 korporasi dengan jadwal fleksibel yang dapat diselenggarakan langsung di pabrik, workshop, atau area proyek perusahaan Anda di ${loc.name}.`,
    },
  ];

  const breadcrumbs = [
    { name: 'Home', url: 'https://penaconsultant.com' },
    { name: 'Cabang & Wilayah Layanan', url: 'https://penaconsultant.com/cabang' },
    { name: loc.name, url: `https://penaconsultant.com/cabang/${loc.slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <FaqJsonLd faqs={faqsToRender} />

      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Hierarchy */}
        <nav className="text-xs font-semibold text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-primary-700">Home</Link>
          <span>/</span>
          <Link href="/cabang" className="hover:text-primary-700">Cabang Pelatihan K3</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">{loc.name}</span>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-primary-950 to-slate-950 text-white rounded-3xl p-6 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-6 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                <MapPin className="w-3.5 h-3.5" />
                Pusat Pelatihan K3 Wilayah {loc.name}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30">
                <Award className="w-3.5 h-3.5" />
                Lembaga PJK3 Resmi Kemnaker RI
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Pelatihan &amp; Sertifikasi K3 di {loc.name} (Batch 2026)
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {loc.tagline || `Pusat pembinaan sertifikasi kompetensi K3 Kemnaker RI dan BNSP di ${loc.name}. Melayani kelas publik, blended learning, serta in-house training korporasi di seluruh kawasan industri ${loc.name}.`}
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Layanan Training:</span>
                <span className="text-sm font-bold text-white block mt-0.5">Online &amp; In-House</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Sertifikat Diterbitkan:</span>
                <span className="text-sm font-bold text-emerald-400 block mt-0.5">Kemnaker RI / BNSP</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Cakupan Wilayah:</span>
                <span className="text-sm font-bold text-white block mt-0.5">{loc.service_areas?.length ? `${loc.service_areas.length} Area Industri` : 'Seluruh Wilayah'}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Konsultasi Batch:</span>
                <span className="text-sm font-black text-amber-400 block mt-0.5">Jadwal 2026 Tersedia</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={getWaLink(`Halo Admin PENA Consultant, saya ingin konsultasi pendaftaran pelatihan K3 untuk wilayah cabang ${loc.name}.`)}
                target="_blank"
                rel="noopener nofollow"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Konsultasi WhatsApp Cabang {loc.name}
              </a>
              <Link
                href="/jadwal"
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl backdrop-blur-md transition-all inline-flex items-center gap-2"
              >
                Lihat Jadwal Batch 2026 &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* 2-Column Main Content & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* Intro Content */}
            {loc.intro && loc.intro.length > 0 && (
              <section className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Layanan Pembinaan &amp; Sertifikasi K3 di Wilayah {loc.name}
                </h2>
                <StructuredContent blocks={loc.intro} />
              </section>
            )}

            {/* TUK Facilities Standards */}
            {loc.tuk_facilities && loc.tuk_facilities.length > 0 && (
              <section className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase text-primary-700 bg-primary-50 px-3 py-1 rounded-md">
                    FASILITAS STANDAR KEMNAKER RI
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 mt-2">
                    Fasilitas Praktik &amp; Uji Kompetensi TUK {loc.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Seluruh sarana dan prasarana di Tempat Uji Kompetensi (TUK) PENA {loc.name} memenuhi standar audit Ditjen Binwasnaker &amp; K3 serta BNSP:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {loc.tuk_facilities.map((fac, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-semibold text-slate-800">{fac}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Local Upcoming Batches */}
            {localBatches.length > 0 && (
              <section className="bg-gradient-to-br from-primary-900 to-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-primary-800 shadow-lg space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                      JADWAL AKTIF DI WILAYAH {loc.name.toUpperCase()}
                    </span>
                    <h2 className="text-xl font-bold text-white">
                      Batch Pelatihan yang Terbuka untuk Peserta {loc.name}
                    </h2>
                  </div>
                  <Link href="/jadwal" className="text-xs font-bold text-slate-300 hover:text-white underline">
                    Lihat Semua Jadwal &rarr;
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {localBatches.map((b) => (
                    <div key={b.slug} className="bg-white/10 border border-white/15 p-4 rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-amber-300">{b.offering_name}</span>
                        <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded">
                          {b.is_online ? 'Online Zoom' : b.location_name}
                        </span>
                      </div>
                      <span className="text-xs text-slate-300 block flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {b.start_date} {b.end_date ? `s/d ${b.end_date}` : ''}
                      </span>
                      <Link
                        href={`/jadwal/${b.slug}`}
                        className="w-full block text-center bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs py-2 rounded-lg transition-all mt-2"
                      >
                        Daftar Batch Ini &rarr;
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Popular Training Schemes in City */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase text-primary-700 bg-primary-50 px-3 py-1 rounded-md">
                    PROGRAM TERPOPULER
                  </span>
                  <h2 className="text-xl sm:text-3xl font-black text-slate-900 mt-2">
                    Program Sertifikasi K3 Favorit di {loc.name}
                  </h2>
                </div>
                <Link href="/pelatihan" className="text-xs font-bold text-primary-700 hover:underline shrink-0">
                  Lihat Semua (70+) &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {featuredPrograms.map((prog) => (
                  <div
                    key={prog.slug}
                    className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary-500 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {prog.certification_body === 'kemnaker' ? 'Kemnaker RI' : 'BNSP RI'}
                      </span>
                      <h3 className="text-base font-bold text-slate-900">
                        <Link href={`/pelatihan/${prog.slug}`} className="hover:text-primary-700">
                          {prog.name}
                        </Link>
                      </h3>
                      {prog.summary && (
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {prog.summary}
                        </p>
                      )}
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">
                        {prog.base_price ? `Rp ${prog.base_price.toLocaleString('id-ID')}` : 'Hubungi Kami'}
                      </span>
                      <Link
                        href={`/pelatihan/${prog.slug}`}
                        className="font-bold text-primary-700 hover:underline flex items-center gap-1"
                      >
                        Detail Program &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Related Guide Articles for this Location */}
            {localArticles.length > 0 && (
              <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary-700" />
                  Panduan Regulasi &amp; K3 Terkait Sektor Industri {loc.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {localArticles.map((art) => (
                    <Link
                      key={art.slug}
                      href={`/panduan/${art.slug}`}
                      className="p-3.5 rounded-xl border border-slate-200 hover:border-primary-500 hover:bg-slate-50 transition-all block"
                    >
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-2 mb-1">{art.title}</h4>
                      <span className="text-[11px] font-bold text-primary-700">Baca Panduan &rarr;</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Local FAQs Section */}
            <section className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase text-primary-700 bg-primary-50 px-3 py-1 rounded-md">
                  TANYA JAWAB REGIONAL
                </span>
                <h2 className="text-2xl font-black text-slate-900">
                  Pertanyaan Sering Diajukan Seputar Pelatihan K3 di {loc.name}
                </h2>
              </div>

              <div className="space-y-4">
                {faqsToRender.map((faq, idx) => (
                  <div key={idx} className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <h3 className="text-sm font-bold text-slate-900 flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-primary-700 shrink-0 mt-0.5" />
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 pl-6 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar CTA & Regional Mesh */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick WhatsApp Registration Box */}
            <div className="bg-gradient-to-br from-primary-900 to-primary-950 text-white p-6 rounded-2xl border border-primary-800 shadow-xl space-y-4">
              <span className="text-xs font-black uppercase text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md inline-block">
                KONSULTASI KANTOR {loc.name.toUpperCase()}
              </span>
              <h3 className="text-lg font-black leading-snug">
                Daftar Pelatihan K3 Batch 2026 di {loc.name}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dapatkan jadwal terdekat, silabus lengkap, dan promo diskon pendaftaran korporat di wilayah {loc.name}.
              </p>
              <a
                href={getWaLink(`Halo Tim PENA Consultant, saya ingin konsultasi pendaftaran sertifikasi K3 di cabang ${loc.name}.`)}
                target="_blank"
                rel="noopener nofollow"
                className="w-full block text-center bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs py-3 px-4 rounded-xl shadow transition-all"
              >
                Chat WhatsApp Konsultan {loc.name} &rarr;
              </a>
            </div>

            {/* Corporate In-House RFQ Form */}
            <CorporateQuoteForm defaultProgram={`Pelatihan K3 di ${loc.name}`} />

            {/* Regional Cross-Linking to Nearby Cities */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-700" />
                Cabang &amp; TUK K3 di Kota Lainnya
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {nearbyLocations.map((nearby) => (
                  <Link
                    key={nearby.slug}
                    href={`/cabang/${nearby.slug}`}
                    className="text-xs bg-slate-50 hover:bg-primary-50 text-slate-700 hover:text-primary-800 px-2.5 py-1 rounded-md border border-slate-200 transition-colors"
                  >
                    Pelatihan K3 {nearby.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Silo Crosslinks */}
        <SiloHubCrosslinks
          programs={featuredPrograms}
          industries={allIndustries.slice(0, 4)}
          locations={nearbyLocations.slice(0, 4)}
          batches={localBatches}
          currentType="location"
        />
      </div>
    </>
  );
}
