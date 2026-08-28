import React from 'react';
import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import Link from 'next/link';
import { 
  Shield, Clock, Award, CheckCircle2, ArrowRight, BookOpen, AlertTriangle, 
  Users, Building, HelpCircle, FileText, Send, Calendar, CheckSquare, 
  Sparkles, Check, Star, Download, ChevronRight, PhoneCall, GraduationCap, MapPin, Building2
} from 'lucide-react';
import { getPrograms, getProgramBySlug, getArticles, getBatches, getWaLink } from '@/lib/data';
import { getProgramSiloData } from '@/lib/silos';
import StructuredContent from '@/components/StructuredContent';
import CorporateQuoteForm from '@/components/CorporateQuoteForm';
import SiloHubCrosslinks from '@/components/SiloHubCrosslinks';
import { CourseJsonLd, BreadcrumbJsonLd, FaqJsonLd } from '@/components/JsonLd';

export async function generateStaticParams() {
  return getPrograms().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) return {};
  const pageTitle = `Pelatihan & Sertifikasi ${program.name} 2026 — Jadwal & Biaya Resmi`;
  const pageDesc = program.meta_description || program.summary || `Pusat pembinaan dan sertifikasi resmi ${program.name} Kemnaker RI & BNSP. Jadwal batch 2026, biaya terjangkau, modul lengkap, fasilitas uji kompetensi, dan jaminan kelulusan.`;
  const pageUrl = `https://penaconsultant.com/pelatihan/${slug}`;
  const image = program.hero_media?.path ? `https://penaconsultant.com/${program.hero_media.path}` : 'https://penaconsultant.com/images/og-share-card.png';
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
      images: [{ url: image, width: 1200, height: 630, alt: program.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDesc,
      images: [image],
    },
    keywords: [
      `pelatihan ${program.name.toLowerCase()}`,
      `sertifikasi ${program.name.toLowerCase()}`,
      `biaya pelatihan ${program.name.toLowerCase()} 2026`,
      `jadwal ${program.name.toLowerCase()} 2026`,
      `syarat ${program.name.toLowerCase()} kemnaker`,
      `in house training ${program.name.toLowerCase()}`,
      `pembinaan ${program.name.toLowerCase()} resmi`,
    ],
  };
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) { permanentRedirect('/pelatihan'); }

  const isKemnaker = program.certification_body === 'kemnaker';
  const isBnsp = program.certification_body === 'bnsp';
  const imageSrc = program.hero_media?.path ? `/${program.hero_media.path}` : '/media/pelatihan-001.webp';
  
  const siloData = getProgramSiloData(program);
  const { programBatches, relatedArticles, relevantIndustries, topLocations } = siloData;

  const basePrice = program.base_price || 6500000;
  const freshGradPrice = Math.round(basePrice * 0.75 / 100000) * 100000;
  const corporatePrice = basePrice;
  const bundlingPrice = Math.round((basePrice + 2500000) / 100000) * 100000;

  // Comparison Packages
  const packages = [
    {
      name: 'Paket Fresh Graduate / Umum',
      badge: 'Best Value Personal',
      price: freshGradPrice,
      desc: 'Cocok untuk lulusan baru D3/S1 & pencari karir HSE profesional.',
      features: [
        'Sertifikat Pembinaan Calon Ahli K3 Kemnaker RI / BNSP',
        'Surat Keterangan Lulus (SKL) Resmi',
        'Modul Softcopy & Buku Panduan Perundangan',
        'Bimbingan Laporan PKL & Presentasi Seminar',
        'Simulasi & Latihan Ujian Post-Test',
        'Akses Grup WhatsApp Alumni & Info Loker HSE',
      ],
      popular: false,
      cta: 'Daftar Paket Fresh Graduate',
    },
    {
      name: 'Paket Utusan Perusahaan (Corporate)',
      badge: 'Paling Banyak Dipilih Perusahaan',
      price: corporatePrice,
      desc: 'Lengkap dengan SKP Penunjukan & Lisensi Resmi untuk kepatuhan audit SMK3.',
      features: [
        'Sertifikat Resmi Kemnaker RI / BNSP',
        'Surat Keputusan Penunjukan (SKP) Kemnaker RI',
        'Kartu Lisensi Kewenangan K3 (Badge Holder)',
        'Hardcopy Modul & Himpunan Perundangan K3 Lengkap',
        'Flashdisk Modul + Exclusive Training Kit (Polo/Rompi K3 + PIN)',
        'Faktur Pajak & Kwitansi Resmi Perusahaan',
        'Pendampingan Administrasi & Legalisir Berkas',
      ],
      popular: true,
      cta: 'Daftar Paket Utusan Perusahaan',
    },
    {
      name: 'Paket Bundling Dual Sertifikasi',
      badge: 'Kemnaker RI + BNSP',
      price: bundlingPrice,
      desc: 'Maksimal kompetensi: 2 sertifikat resmi negara sekaligus dalam 1 rangkaian.',
      features: [
        'Sertifikat Resmi Kemnaker RI + SKP + Lisensi',
        'Sertifikat Kompetensi Profesi BNSP (Garuda Emas)',
        'Portofolio Asesmen Uji Kompetensi Asesor BNSP',
        'All Facilities Utusan Perusahaan Termasuk',
        'Konsultasi Implementasi SMK3 PP 50/2012 Perusahaan',
        'Prioritas Kursi Batch & Layanan VIP Admin',
      ],
      popular: false,
      cta: 'Daftar Bundling Kemnaker + BNSP',
    },
  ];

  // 12-Day Syllabus Timeline
  const syllabusTimeline = [
    { day: 'Hari 1', title: 'Kebijakan K3 Nasional & Pokok Dasar Hukum UU No. 1/1970', type: 'Teori Regulasi' },
    { day: 'Hari 2-3', title: 'Kelembagaan P2K3, Sistem Manajemen K3 (SMK3 PP 50/2012) & Audit Internal', type: 'Manajemen K3' },
    { day: 'Hari 4', title: 'K3 Listrik, Proteksi Petir & Sistem Penanggulangan Kebakaran Industri', type: 'K3 Teknis' },
    { day: 'Hari 5', title: 'K3 Konstruksi Bangunan & K3 Mekanik (Pesawat Angkat Angkut & Tenaga Produksi)', type: 'K3 Teknis' },
    { day: 'Hari 6', title: 'K3 Pesawat Uap, Bejana Tekanan & Tangki Timbun Industri', type: 'K3 Teknis' },
    { day: 'Hari 7', title: 'K3 Kesehatan Kerja, Ergonomi, Higiene Industri & Lingkungan Kerja', type: 'Kesehatan Kerja' },
    { day: 'Hari 8', title: 'Analisis Bahaya & Penilaian Risiko (HIRADC / JSA) & Investigasi Kecelakaan', type: 'Analisis Risiko' },
    { day: 'Hari 9', title: 'Praktik Kerja Lapangan (PKL) Observasi K3 di Fasilitas Industri Mitra', type: 'Praktik Lapangan' },
    { day: 'Hari 10', title: 'Penyusunan & Asistensi Laporan Hasil Observasi Lapangan PKL', type: 'Penyusunan Laporan' },
    { day: 'Hari 11', title: 'Seminar Presentasi Laporan PKL di Hadapan Pengawas Kemnaker RI', type: 'Seminar Pengawas' },
    { day: 'Hari 12', title: 'Evaluasi Komprehensif & Ujian Akhir Sertifikasi Kemnaker RI', type: 'Ujian Kelulusan' },
  ];

  const sections = [
    { title: 'Dasar Hukum & Regulasi Acuan', icon: '⚖️', content: program.legal_basis },
    { title: 'Tujuan & Sasaran Pembinaan', icon: '🎯', content: program.objectives },
    { title: 'Ruang Lingkup Materi & Silabus Pelatihan', icon: '📚', content: program.scope },
    { title: 'Persyaratan & Kualifikasi Peserta', icon: '📋', content: program.requirements },
    { title: 'Kelengkapan Dokumen & Persyaratan Administrasi', icon: '📂', content: program.documents },
    { title: 'Fasilitas Peserta & Keuntungan Pelatihan', icon: '🌟', content: program.facilities },
    { title: 'Tata Cara & Prosedur Pendaftaran', icon: '📝', content: program.registration_procedure },
  ];

  // Specific FAQs for this program
  const programFaqs = [
    {
      question: `Berapa biaya investasi pelatihan ${program.name} resmi di PENA Consultant?`,
      answer: `Biaya pelatihan ${program.name} mulai dari Rp ${freshGradPrice.toLocaleString('id-ID')} untuk kategori Fresh Graduate/Pencari Kerja dan Rp ${corporatePrice.toLocaleString('id-ID')} untuk Utusan Perusahaan (sudah termasuk SKP & Lisensi K3 Kemnaker RI, modul, training kit, ujian, dan sertifikat resmi).`,
    },
    {
      question: `Apakah sertifikat ${program.name} resmi dan diakui secara nasional?`,
      answer: isKemnaker 
        ? `Ya, 100% resmi. Sertifikat diterbitkan langsung oleh Ditjen Binwasnaker & K3 Kementerian Ketenagakerjaan Republik Indonesia (Kemnaker RI), dilengkapi Surat Keputusan Penunjukan (SKP) dan Lisensi Kewenangan K3 yang terdaftar di portal Teman K3 Kemnaker.`
        : `Ya, sertifikat kompetensi profesi diterbitkan resmi berlogo Garuda Emas oleh Badan Nasional Sertifikasi Profesi (BNSP) melalui LSP berlisensi.`,
    },
    {
      question: `Bagaimana metode pelaksanaan pelatihan ${program.name}?`,
      answer: `Pelatihan dapat diikuti melalui 3 jalur: (1) Online Interactive Zoom Meeting dengan pengajar live, (2) Offline On-Site di Tempat Uji Kompetensi (TUK) PENA Consultant, atau (3) In-House Training langsung di lokasi pabrik/perusahaan Anda di seluruh Indonesia.`,
    },
    {
      question: `Apa syarat pendidikan untuk mendaftar pelatihan ${program.name}?`,
      answer: `Untuk pembinaan Ahli K3 Umum & Spesialis Kemnaker RI, syarat minimal adalah pendidikan D3/D4/S1 semua jurusan. Untuk sertifikasi operator teknis (Forklift, Crane, Boiler, Scaffolding), syarat minimal adalah SMP/SMA/SMK sederajat.`,
    },
    {
      question: `Apakah ada jaminan kelulusan ujian evaluasi?`,
      answer: `Tim instruktur senior dan asesor PENA Consultant memberikan pembekalan kisi-kisi intensif, bimbingan laporan PKL, serta simulasi tryout post-test sehingga tingkat kelulusan peserta di PENA Consultant mencapai lebih dari 98.7%.`,
    },
  ];

  const breadcrumbs = [
    { name: 'Home', url: 'https://penaconsultant.com' },
    { name: 'Pelatihan K3', url: 'https://penaconsultant.com/pelatihan' },
    { name: program.name, url: `https://penaconsultant.com/pelatihan/${program.slug}` },
  ];

  return (
    <>
      {/* Schema.org Structured Data Injection */}
      <CourseJsonLd program={program} />
      <BreadcrumbJsonLd items={breadcrumbs} />
      <FaqJsonLd faqs={programFaqs} />

      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav className="text-xs font-semibold text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-primary-700">Home</Link>
          <span>/</span>
          <Link href="/pelatihan" className="hover:text-primary-700">Pelatihan K3</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold line-clamp-1">{program.name}</span>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-primary-950 to-slate-950 text-white rounded-3xl p-6 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                  <Shield className="w-3.5 h-3.5" />
                  {isKemnaker ? 'Sertifikasi Resmi Kemnaker RI' : isBnsp ? 'Sertifikasi Kompetensi BNSP RI' : 'Sertifikasi K3 Terakreditasi'}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  Batch Tahun 2026 Dibuka
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Pelatihan &amp; Sertifikasi {program.name}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                {program.summary || 'Program pembinaan sertifikasi kompetensi K3 resmi untuk mencetak tenaga ahli profesional yang siap memimpin kepatuhan keselamatan kerja di industri.'}
              </p>

              {/* Key Trust Signals */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Durasi Program:</span>
                  <span className="text-sm font-bold text-white flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-primary-400" />
                    {program.duration || '12 Hari'}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Metode Belajar:</span>
                  <span className="text-sm font-bold text-white flex items-center gap-1 mt-0.5">
                    <GraduationCap className="w-3.5 h-3.5 text-primary-400" />
                    Online / Onsite
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Kelulusan Ujian:</span>
                  <span className="text-sm font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    98.7% Lulus
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Investasi Mulai:</span>
                  <span className="text-sm font-black text-amber-400 block mt-0.5">
                    Rp {freshGradPrice.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href={getWaLink(`Halo Admin PENA Consultant, saya ingin konsultasi pendaftaran pelatihan ${program.name}.`)}
                  target="_blank"
                  rel="noopener nofollow"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all inline-flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  Daftar via WhatsApp Sekarang
                </a>
                <a
                  href="#biaya-paket"
                  className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl backdrop-blur-md transition-all inline-flex items-center gap-2"
                >
                  Lihat Biaya Paket &amp; Fasilitas &darr;
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 hidden lg:block">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm space-y-3">
                <img
                  src={imageSrc}
                  alt={program.name}
                  className="rounded-xl w-full h-48 object-cover shadow-md"
                />
                <div className="p-2 space-y-1 text-center">
                  <span className="text-xs font-bold text-slate-200 block">Lembaga PJK3 Resmi Berlisensi</span>
                  <span className="text-[11px] text-slate-400 block">Ditjen Binwasnaker &amp; K3 Kemnaker RI</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Scheduled Batches Section (If Available) */}
        {programBatches.length > 0 && (
          <section className="bg-gradient-to-r from-primary-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-primary-800 shadow-lg space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  JADWAL AKTIF TAHUN 2026
                </span>
                <h2 className="text-xl font-bold text-white">
                  Pendaftaran Batch Pelatihan {program.name} yang Sedang Dibuka
                </h2>
              </div>
              <Link
                href="/jadwal"
                className="text-xs font-bold text-slate-300 hover:text-white underline flex items-center gap-1"
              >
                Lihat Kalender Lengkap &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {programBatches.map((batch) => (
                <div key={batch.slug} className="bg-white/10 border border-white/15 p-4 rounded-2xl backdrop-blur-md space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-300">Batch {batch.batch_number || '2026'}</span>
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded">
                      {batch.is_online ? 'Online Zoom' : batch.location_name}
                    </span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <span className="text-slate-300 block flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {batch.start_date} {batch.end_date ? `s/d ${batch.end_date}` : ''}
                    </span>
                  </div>
                  <Link
                    href={`/jadwal/${batch.slug}`}
                    className="w-full block text-center bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs py-2 rounded-xl transition-all"
                  >
                    Rincian Batch &amp; Pendaftaran &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3-Tier Pricing Packages */}
        <section id="biaya-paket" className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-700 bg-primary-50 px-3 py-1 rounded-md">
              PILIHAN PAKET INVESTASI
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Biaya &amp; Paket Pelatihan {program.name} (Tahun 2026)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Transparan tanpa biaya tersembunyi. Sudah termasuk ujian, sertifikat resmi, dan fasilitas lengkap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-3xl p-6 sm:p-8 border transition-all flex flex-col justify-between relative ${
                  pkg.popular
                    ? 'border-primary-600 shadow-xl ring-2 ring-primary-600/20'
                    : 'border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-[10px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow">
                    {pkg.badge}
                  </span>
                )}

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900">{pkg.name}</h3>
                    <p className="text-xs text-slate-500">{pkg.desc}</p>
                  </div>

                  <div className="pt-2">
                    <span className="text-[11px] text-slate-400 block font-medium">Biaya Investasi:</span>
                    <span className="text-2xl sm:text-3xl font-black text-slate-900">
                      Rp {pkg.price.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-2.5">
                    <span className="text-xs font-bold text-slate-900 block mb-2">Fasilitas yang Didapat:</span>
                    {pkg.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <a
                    href={getWaLink(`Halo Admin PENA Consultant, saya ingin mendaftar ${pkg.name} untuk pelatihan ${program.name}.`)}
                    target="_blank"
                    rel="noopener nofollow"
                    className={`w-full block text-center font-black text-xs py-3 px-4 rounded-xl shadow transition-all ${
                      pkg.popular
                        ? 'bg-primary-700 hover:bg-primary-800 text-white'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    {pkg.cta} &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 12-Day Syllabus Timeline (Curriculum Deep-Dive) */}
        <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-700 bg-primary-50 px-3 py-1 rounded-md">
              KURIKULUM RESMI KEMNAKER RI
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Rundown &amp; Silabus Pembelajaran ({program.duration || '12 Hari'})
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Materi disusun secara sistematis mengacu pada standar kompetensi Ditjen Binwasnaker &amp; K3 serta SKKNI:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {syllabusTimeline.map((item, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-3">
                <div className="bg-primary-800 text-white font-black text-xs px-2.5 py-1 rounded-lg shrink-0">
                  {item.day}
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-primary-700 bg-primary-100/60 px-2 py-0.5 rounded inline-block">
                    {item.type}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2-Column Layout: Official Content Accordion & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main 7 Pillars Accordion */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Informasi Lengkap Persyaratan &amp; Dokumen {program.name}
            </h2>

            <div className="space-y-4">
              {sections.map((sec, idx) => {
                if (!sec.content || (Array.isArray(sec.content) && sec.content.length === 0)) return null;
                return (
                  <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                      <span>{sec.icon}</span>
                      <span>{sec.title}</span>
                    </h3>
                    <div className="pt-2 border-t border-slate-100 text-slate-700">
                      <StructuredContent blocks={sec.content} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Program FAQs Section */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 mt-8">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-700 bg-primary-50 px-3 py-1 rounded-md">
                  FAQ PROGRAM
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Pertanyaan Sering Diajukan Seputar {program.name}
                </h2>
              </div>

              <div className="space-y-4">
                {programFaqs.map((faq, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
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
            </div>
          </div>

          {/* Sidebar CTA & Corporate In-House Generator */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Registration Card */}
            <div className="bg-gradient-to-br from-primary-900 via-slate-900 to-primary-950 text-white p-6 rounded-3xl border border-primary-800 shadow-xl space-y-4">
              <span className="text-xs font-black uppercase text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md inline-block">
                PENDAFTARAN BATCH 2026
              </span>
              <h3 className="text-lg font-black leading-snug">
                Amankan Kursi Pelatihan {program.name}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pendaftaran ditutup H-3 sebelum pelaksanaan atau saat kuota 30 peserta per batch terpenuhi.
              </p>
              <a
                href={getWaLink(`Halo Admin PENA Consultant, saya ingin konsultasi pendaftaran pelatihan ${program.name}.`)}
                target="_blank"
                rel="noopener nofollow"
                className="w-full block text-center bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs py-3 px-4 rounded-xl shadow transition-all"
              >
                Chat WhatsApp Admin &rarr;
              </a>
            </div>

            {/* Corporate Quote Generator */}
            <CorporateQuoteForm defaultProgram={program.name} />

            {/* Related Guide Articles */}
            {relatedArticles.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary-700" />
                  Panduan Terkait {program.name}
                </h3>
                <div className="space-y-2">
                  {relatedArticles.map((art) => (
                    <Link
                      key={art.slug}
                      href={`/panduan/${art.slug}`}
                      className="block p-3 rounded-xl bg-slate-50 hover:bg-primary-50 transition-colors text-xs font-semibold text-slate-800 hover:text-primary-800"
                    >
                      &bull; {art.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Available Training Centers in Major Cities */}
            {topLocations.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary-700" />
                  Pusat Pelatihan di Kota Industri
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {topLocations.map((loc) => (
                    <Link
                      key={loc.slug}
                      href={`/cabang/${loc.slug}`}
                      className="text-xs bg-slate-100 hover:bg-primary-100 text-slate-700 hover:text-primary-800 font-medium px-2.5 py-1 rounded-lg transition-colors"
                    >
                      {loc.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Relevant Industry Applications */}
            {relevantIndustries.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-primary-700" />
                  Penerapan di Sektor Industri
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {relevantIndustries.map((ind) => (
                    <Link
                      key={ind.slug}
                      href={`/industri/${ind.slug}`}
                      className="text-xs bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-800 font-medium px-2.5 py-1 rounded-lg transition-colors"
                    >
                      {ind.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Silo Hub Cross-Links */}
        <SiloHubCrosslinks
          programs={getPrograms().filter(p => p.slug !== program.slug).slice(0, 6)}
          industries={relevantIndustries}
          locations={topLocations}
          batches={programBatches.length > 0 ? programBatches : getBatches().slice(0, 6)}
          currentType="program"
        />
      </div>
    </>
  );
}
