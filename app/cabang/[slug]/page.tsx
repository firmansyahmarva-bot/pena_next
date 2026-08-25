import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  MapPin, Phone, Shield, CheckCircle2, Building2, Award, Calendar, 
  HelpCircle, ArrowRight, CheckSquare, Wrench, FileText, Users, Clock, Send 
} from 'lucide-react';
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
    title: loc.meta_title || `Pelatihan & Sertifikasi K3 di ${loc.name} 2026 — Jadwal & Biaya Resmi`,
    description: loc.meta_description || `Pusat pembinaan sertifikasi K3 resmi Kemnaker RI & BNSP di ${loc.name}. Layanan public batch, TUK mandiri, dan in-house training korporasi di seluruh kawasan industri ${loc.name}.`,
    keywords: [
      `pelatihan k3 ${loc.name}`,
      `sertifikasi k3 ${loc.name}`,
      `ahli k3 umum ${loc.name}`,
      `biaya pelatihan k3 di ${loc.name}`,
      `jadwal training k3 ${loc.name} 2026`,
      `in house training k3 ${loc.name}`,
      `pjk3 resmi ${loc.name}`,
      `tuk k3 ${loc.name}`,
    ],
  };
}

export default async function BranchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loc = getLocationBySlug(slug);
  if (!loc) notFound();

  const allLocations = getLocations();
  const nearbyLocations = allLocations.filter(l => l.slug !== loc.slug).slice(0, 8);
  const featuredPrograms = getPrograms().slice(0, 6);
  const cityBatches = getBatches().filter(b => b.location_name?.toLowerCase().includes(loc.name.toLowerCase())).slice(0, 4);

  const defaultFaqs = [
    {
      question: `Apakah sertifikasi K3 di ${loc.name} diterbitkan resmi oleh Kemnaker RI / BNSP?`,
      answer: `Ya, 100% resmi. PT PENA Consultant adalah PJK3 yang ditunjuk resmi oleh Kementerian Ketenagakerjaan RI (SKP Ditjen Binwasnaker & K3) dan Tempat Uji Kompetensi (TUK) berlisensi BNSP. Sertifikat, Surat Keputusan Penunjukan (SKP), dan Lisensi K3 tercatat di database k3.kemnaker.go.id dan BNSP RI.`,
    },
    {
      question: `Bagaimana metode pelatihan K3 yang tersedia di wilayah ${loc.name}?`,
      answer: `Tersedia 3 metode fleksibel: (1) Online Interactive via Zoom Meeting dengan instruktur live, (2) Offline On-Site di Fasilitas TUK PENA ${loc.name}, dan (3) In-House Training di mana instruktur dan asesor kami hadir langsung di pabrik/kantor/proyek perusahaan Anda di wilayah ${loc.name}.`,
    },
    {
      question: `Berapa estimasi biaya pelatihan sertifikasi K3 di ${loc.name}?`,
      answer: `Biaya pelatihan bervariasi tergantung skema pembinaan (mulai dari Rp 2.500.000 untuk Petugas P3K / Damkar hingga paket Ahli K3 Umum & Spesialis). Biaya sudah termasuk sertifikat resmi, modul materi, training kit, ujian evaluasi, dan pendampingan kelulusan. Diskon khusus tersedia untuk pendaftaran in-house korporat & rombongan.`,
    },
    {
      question: `Apakah PENA Consultant melayani in-house training untuk perusahaan di kawasan industri ${loc.name}?`,
      answer: `Sangat bisa. Kami berpengalaman menyelenggarakan in-house training untuk ratusan perusahaan di kawasan industri ${loc.name} dan sekitarnya dengan silabus yang disesuaikan dengan profil risiko bahaya operasional perusahaan Anda.`,
    },
  ];

  const faqsToRender = loc.faqs && loc.faqs.length > 0 ? loc.faqs : defaultFaqs;

  const breadcrumbs = [
    { name: 'Home', url: 'https://penaconsultant.com' },
    { name: 'Cabang & TUK', url: 'https://penaconsultant.com/cabang' },
    { name: loc.name, url: `https://penaconsultant.com/cabang/${loc.slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <FaqJsonLd faqs={faqsToRender} />

      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav className="text-xs font-semibold text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-primary-700">Home</Link>
          <span>/</span>
          <Link href="/cabang" className="hover:text-primary-700">Cabang &amp; TUK</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">{loc.name}</span>
        </nav>

        {/* Hero Banner Header */}
        <div className="bg-gradient-to-br from-slate-900 via-primary-950 to-slate-950 text-white p-8 sm:p-12 rounded-3xl border border-primary-900/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-4xl space-y-5 relative z-10">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-black text-xs px-3 py-1 rounded-md flex items-center gap-1.5 uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                TEMPAT UJI KOMPETENSI RESMI &bull; WILAYAH {loc.name.toUpperCase()}
              </span>
              <span className="bg-slate-800 text-slate-300 font-semibold text-xs px-3 py-1 rounded-md border border-slate-700">
                PJK3 Kemnaker RI &amp; TUK BNSP
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Pusat Pelatihan &amp; Sertifikasi K3 di {loc.name} 2026
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {loc.tagline || `Lembaga pembinaan K3 resmi di ${loc.name} untuk pemenuhan regulasi UU No. 1/1970, audit SMK3 PP 50/2012, dan sertifikasi kompetensi profesi HSE berstandar nasional.`}
            </p>

            {/* Address Card */}
            {loc.address && (
              <div className="p-4 sm:p-5 bg-slate-900/90 border border-slate-700/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-bold mb-0.5">Alamat Fasilitas TUK &amp; Kantor Perwakilan {loc.name}:</strong>
                    <span>{loc.address}</span>
                  </div>
                </div>
                <a
                  href={getWaLink(`Halo Admin PENA Consultant, saya ingin konsultasi pendaftaran pelatihan K3 di cabang ${loc.name}.`)}
                  target="_blank"
                  rel="noopener nofollow"
                  className="shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-5 py-3 rounded-xl shadow-lg transition-all flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Hubungi Kantor {loc.name}</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Target Coverage Industrial Zones */}
        {loc.service_areas && loc.service_areas.length > 0 && (
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary-700" />
              Cakupan Wilayah Layanan &amp; Kawasan Industri di {loc.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              PENA Consultant melayani pendaftaran peserta individu (Public Training) dan pendampingan In-House Training korporat di seluruh kawasan industri dan distrik kerja:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {loc.service_areas.map((area, idx) => (
                <span
                  key={idx}
                  className="bg-slate-100 hover:bg-primary-50 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 transition-colors"
                >
                  📍 {area}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* 2-Column Main Layout: Intro / Content & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-10">
            {/* Structured Intro Content */}
            {loc.intro && loc.intro.length > 0 && (
              <section className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
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
                  Lihat Semua (70+) →
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
                        Detail Program →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

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
                Chat WhatsApp Konsultan {loc.name} →
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
      </div>
    </>
  );
}