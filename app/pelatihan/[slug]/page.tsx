import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  Shield, Clock, Award, CheckCircle2, ArrowRight, BookOpen, AlertTriangle, 
  Users, Building, HelpCircle, FileText, Send, Calendar, CheckSquare, 
  Sparkles, Check, Star, Download, ChevronRight, PhoneCall, GraduationCap
} from 'lucide-react';
import { getPrograms, getProgramBySlug, getArticles, getBatches, getWaLink } from '@/lib/data';
import StructuredContent from '@/components/StructuredContent';
import CorporateQuoteForm from '@/components/CorporateQuoteForm';
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
  if (!program) notFound();

  const isKemnaker = program.certification_body === 'kemnaker';
  const isBnsp = program.certification_body === 'bnsp';
  const imageSrc = program.hero_media?.path ? `/${program.hero_media.path}` : '/media/pelatihan-001.webp';
  const relatedArticles = getArticles().filter(a => a.related_offering_slug === program.slug).slice(0, 4);
  const relatedBatches = getBatches().filter(b => b.offering_slug === program.slug || b.slug.includes(program.slug)).slice(0, 3);

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

  // 12-Day Syllabus Timeline (if AK3U or technical)
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
    { title: 'Ruang Lingkup Materi & Silabus Pelatihan', icon: '📋', content: program.scope },
    { title: 'Persyaratan & Kualifikasi Peserta', icon: '👤', content: program.requirements },
    { title: 'Kelengkapan Dokumen & Persyaratan Administrasi', icon: '📄', content: program.documents },
    { title: 'Fasilitas Peserta & Keuntungan Pelatihan', icon: '🎁', content: program.facilities },
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

        {/* Hero Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-5 relative min-h-[320px] bg-slate-900 overflow-hidden">
            <img
              src={imageSrc}
              alt={`Dokumentasi Pelatihan ${program.name}`}
              width={600}
              height={400}
              decoding="async"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

            <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-10">
              {isKemnaker && (
                <span className="bg-emerald-600 text-white font-black text-xs px-3 py-1 rounded-md shadow-md flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" /> Kemnaker RI Resmi
                </span>
              )}
              {isBnsp && (
                <span className="bg-blue-600 text-white font-black text-xs px-3 py-1 rounded-md shadow-md flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" /> BNSP RI Lisensi
                </span>
              )}
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white z-10 flex items-center justify-between text-xs bg-slate-950/80 backdrop-blur-md p-3 rounded-xl border border-slate-800">
              <span className="flex items-center gap-1.5 font-bold">
                <Clock className="w-4 h-4 text-amber-400" />
                Durasi: {program.duration || '12 Hari Kerja'}
              </span>
              <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                Rating 4.9/5 (1.500+ Alumni)
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-primary-700 bg-primary-50 border border-primary-200 px-3 py-1 rounded-md inline-block">
                PEMBINAAN &amp; SERTIFIKASI PROFESI RESMI
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
                Pelatihan &amp; Sertifikasi {program.name} 2026
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {program.summary || `Program pembinaan resmi berlisensi Ditjen Binwasnaker & K3 Kemnaker RI untuk mencetak praktisi K3 profesional berkualifikasi tinggi.`}
              </p>
            </div>

            {/* Price & Primary Action */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Investasi Mulai:</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900">
                    Rp {freshGradPrice.toLocaleString('id-ID')}
                  </span>
                  <span className="text-xs text-slate-400 line-through">Rp 8.000.000</span>
                </div>
                <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">✓ Tersedia Paket Fresh Graduate &amp; Utusan Perusahaan</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <a
                  href={getWaLink(`Halo Admin PENA Consultant, saya ingin konsultasi pendaftaran pelatihan ${program.name} batch 2026.`)}
                  target="_blank"
                  rel="noopener nofollow"
                  className="bg-gradient-to-r from-emerald-600 to-primary-700 hover:from-emerald-700 text-white font-black text-xs px-6 py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Daftar Batch 2026</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Free Tryout Simulator Banner Hook */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="bg-slate-950 text-amber-400 font-black text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md inline-block">
              🎯 SIMULATOR UJIAN GRATIS
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Coba Tryout Ujian 50 Soal AK3U Kemnaker RI Sekarang!
            </h2>
            <p className="text-xs sm:text-sm text-slate-900 font-semibold">
              Uji pemahaman regulasi K3 Anda dengan 50 butir soal riil berstandar evaluasi Kemnaker RI lengkap dengan timer 60 menit &amp; pembahasan hukum.
            </p>
          </div>
          <Link
            href="/pelatihan/ahli-k3-umum/tryout"
            className="shrink-0 bg-slate-950 hover:bg-slate-900 text-white font-black text-xs px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <span>Mulai Tryout 50 Soal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3-Tiered Comparison Pricing Matrix (Midiatama / AhliK3 Style) */}
        <section className="space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-700 bg-primary-50 px-3 py-1 rounded-md">
              SKEMA INVESTASI RESMI 2026
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
              Pilihan Paket Pelatihan {program.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Pilih paket yang sesuai dengan kebutuhan kualifikasi personal maupun penunjukan resmi kepatuhan perusahaan Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-3xl p-6 sm:p-8 border flex flex-col justify-between transition-all ${
                  pkg.popular 
                    ? 'border-primary-500 shadow-2xl ring-2 ring-primary-500/20 relative' 
                    : 'border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-600 to-primary-700 text-white font-black text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow">
                    {pkg.badge}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-primary-700 uppercase tracking-wider block mb-1">
                      {pkg.name}
                    </span>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-xs text-slate-500 font-semibold">Rp</span>
                      <span className="text-3xl font-black text-slate-900">{pkg.price.toLocaleString('id-ID')}</span>
                      <span className="text-xs text-slate-400">/orang</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">{pkg.desc}</p>
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
                    {pkg.cta} →
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
                Chat WhatsApp Admin →
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
          </div>
        </div>
      </div>
    </>
  );
}