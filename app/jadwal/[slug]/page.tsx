import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  Calendar, 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Award, 
  FileText, 
  AlertCircle, 
  ChevronRight, 
  ArrowRight, 
  Users, 
  MessageCircle, 
  Sparkles,
  BookOpen,
  Laptop,
  Building2,
  HelpCircle,
  Tag
} from 'lucide-react';
import { getBatches, getBatchBySlug, getProgramBySlug, getWaLink } from '@/lib/data';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import StructuredContent from '@/components/StructuredContent';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getBatches().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const batch = getBatchBySlug(slug);
  if (!batch) return {};

  const program = batch.offering_slug ? getProgramBySlug(batch.offering_slug) : null;
  const certTitle = batch.certification_body === 'kemnaker' ? 'Kemnaker RI' : 'BNSP';
  const pageTitle = `Jadwal & Biaya Pendaftaran ${batch.offering_name} Batch ${batch.batch_number} (Tahun 2026)`;
  const pageDesc = `Informasi resmi pendaftaran ${batch.offering_name} Batch ${batch.batch_number} sertifikasi ${certTitle}. Jadwal ${batch.start_date} s/d ${batch.end_date || 'selesai'}, metode ${batch.is_online ? 'Online Zoom' : `Onsite ${batch.location_name}`}, investasi resmi bersertifikat.`;
  const pageUrl = `https://penaconsultant.com/jadwal/${slug}`;

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
  };
}

export default async function BatchPage({ params }: Props) {
  const { slug } = await params;
  const batch = getBatchBySlug(slug);
  if (!batch) notFound();

  const program = batch.offering_slug ? getProgramBySlug(batch.offering_slug) : null;
  const certName = batch.certification_body === 'kemnaker' ? 'Kementerian Ketenagakerjaan RI (Kemnaker)' : 'Badan Nasional Sertifikasi Profesi (BNSP)';

  // Consistent pricing formula matching /pelatihan/[slug]
  const basePrice = program?.base_price || batch.normal_price || 6500000;
  const freshGradPrice = Math.round(basePrice * 0.75 / 100000) * 100000;
  const corporatePrice = basePrice;

  const breadcrumbs = [
    { name: 'Home', url: 'https://penaconsultant.com' },
    { name: 'Jadwal Pelatihan K3', url: 'https://penaconsultant.com/jadwal' },
    { name: `${batch.offering_name} - Batch #${batch.batch_number}`, url: `https://penaconsultant.com/jadwal/${batch.slug}` },
  ];

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationEvent',
    name: `${batch.offering_name} - Batch #${batch.batch_number}`,
    description: `Pembinaan dan sertifikasi resmi ${batch.offering_name} Batch ${batch.batch_number} oleh PENA Consultant.`,
    startDate: batch.start_date || '2026-08-01',
    endDate: batch.end_date || batch.start_date || '2026-08-15',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: batch.is_online 
      ? 'https://schema.org/OnlineEventAttendanceMode' 
      : 'https://schema.org/OfflineEventAttendanceMode',
    location: batch.is_online
      ? {
          '@type': 'VirtualLocation',
          url: `https://penaconsultant.com/jadwal/${batch.slug}`,
        }
      : {
          '@type': 'Place',
          name: `TUK PENA Consultant - ${batch.location_name}`,
          address: {
            '@type': 'PostalAddress',
            addressLocality: batch.location_name,
            addressCountry: 'ID',
          },
        },
    offers: {
      '@type': 'Offer',
      price: corporatePrice,
      priceCurrency: 'IDR',
      availability: 'https://schema.org/InStock',
      url: `https://penaconsultant.com/jadwal/${batch.slug}`,
      validFrom: '2026-01-01',
    },
    organizer: {
      '@type': 'Organization',
      name: 'PENA Consultant',
      url: 'https://penaconsultant.com',
    },
  };

  const waMessage = `Halo Admin PENA Consultant, saya ingin mendaftar ${batch.offering_name} Batch #${batch.batch_number} (Jadwal: ${batch.start_date} s/d ${batch.end_date || 'selesai'}). Mohon informasi ketersediaan kursi dan formulir pendaftaran resmi.`;

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />

      <div className="py-10 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/" className="hover:text-blue-600 transition-colors">Beranda</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link href="/jadwal" className="hover:text-blue-600 transition-colors">Jadwal Pelatihan K3</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-900 font-semibold truncate">{batch.offering_name} (Batch #{batch.batch_number})</span>
        </nav>

        {/* Hero Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-blue-600 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              BATCH RESMI #{batch.batch_number} • TAHUN 2026
            </span>
            <span className="bg-emerald-50 text-emerald-800 font-bold text-xs px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Sertifikasi {certName}
            </span>
            <span className="bg-slate-100 text-slate-700 font-semibold text-xs px-3 py-1 rounded-full flex items-center gap-1">
              {batch.is_online ? <Laptop className="w-3.5 h-3.5 text-blue-600" /> : <Building2 className="w-3.5 h-3.5 text-slate-600" />}
              {batch.is_online ? 'Kelas Online Interaktif' : `Onsite TUK ${batch.location_name}`}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug mb-4">
            Jadwal Pendaftaran {batch.offering_name} — Batch #{batch.batch_number}
          </h1>

          {program?.summary && (
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
              {program.summary}
            </p>
          )}

          {/* Quick Details Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-8">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Tanggal Mulai:</span>
              <span className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1">
                <Calendar className="w-4 h-4 text-blue-600" /> {batch.start_date}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Tanggal Selesai:</span>
              <span className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1">
                <Clock className="w-4 h-4 text-emerald-600" /> {batch.end_date || 'Sesuai Jadwal'}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Durasi Program:</span>
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                {program?.duration || 'Sesuai Standar'}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Biaya Investasi:</span>
              <div>
                <span className="text-xs sm:text-sm font-black text-slate-900 block">
                  Rp {corporatePrice.toLocaleString('id-ID')}
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold">
                  Mulai Rp {freshGradPrice.toLocaleString('id-ID')} (Umum/Fresh Grad)
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={getWaLink(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> Daftar Batch #{batch.batch_number} via WhatsApp
            </a>
            {program && (
              <Link
                href={`/pelatihan/${program.slug}`}
                className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-sm transition-colors text-center flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-4 h-4 text-slate-600" /> Lihat Silabus Lengkap Program &rarr;
              </Link>
            )}
          </div>
        </div>

        {/* Day-by-Day Learning Roadmap */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold uppercase text-blue-600 tracking-wider">KURIKULUM &amp; TAHAPAN</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Roadmap &amp; Alur Pembinaan Batch Ini
              </h2>
            </div>
            <span className="text-xs font-bold bg-blue-50 text-blue-800 px-3 py-1.5 rounded-lg border border-blue-200">
              Terstandar {certName}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-md bg-blue-600 text-white text-xs font-bold flex items-center justify-center">1</span>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">Fase 1: Teori &amp; Regulasi Perundangan</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-8">
                Pemaparan kebijakan nasional K3, Undang-Undang No. 1 Tahun 1970, regulasi sektoral Kemnaker RI, dan dasar hukum pembentukan P2K3.
              </p>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-md bg-blue-600 text-white text-xs font-bold flex items-center justify-center">2</span>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">Fase 2: Identifikasi Bahaya &amp; SMK3</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-8">
                Penyusunan HIRA (Hazard Identification and Risk Assessment), Job Safety Analysis (JSA), audit internal SMK3 PP 50/2012, dan investigasi insiden.
              </p>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-md bg-blue-600 text-white text-xs font-bold flex items-center justify-center">3</span>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">Fase 3: Praktik Kerja Lapangan (PKL)</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-8">
                Observasi lapangan mandiri / simulasi video komprehensif pada fasilitas industri untuk menyusun Laporan PKL kelompok dan individu.
              </p>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-md bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">4</span>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">Fase 4: Seminar PKL &amp; Evaluasi Sidang</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-8">
                Presentasi laporan PKL di hadapan tim penguji resmi Kementerian Ketenagakerjaan RI / Asesor LSP BNSP untuk penetapan kelulusan lisensi.
              </p>
            </div>
          </div>
        </div>

        {/* Requirements & Documents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" /> Berkas Pendaftaran Batch
            </h3>
            {program?.documents && program.documents.length > 0 ? (
              <StructuredContent blocks={program.documents} />
            ) : (
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Fotokopi Ijazah terakhir (Legalisir / Scan Asli)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Scan KTP yang masih berlaku</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Surat Keterangan Sehat dari Dokter</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Surat Rekomendasi Penugasan (jika utusan perusahaan)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Pasfoto formal latar belakang merah (3x4 &amp; 4x6)</span>
                </li>
              </ul>
            )}
          </div>

          <div className="bg-emerald-50/40 border border-emerald-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-black text-emerald-950 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" /> Fasilitas Resmi yang Diterima
            </h3>
            {program?.facilities && program.facilities.length > 0 ? (
              <StructuredContent blocks={program.facilities} />
            ) : (
              <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-900 font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Sertifikat &amp; Lisensi K3 Resmi {certName}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>SKP (Surat Keputusan Penunjukan) bagi utusan perusahaan</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Modul Pembinaan Lengkap, UU K3 &amp; Himpunan Regulasi</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Seminar Kit, Tas Eksklusif, PIN Lencana K3 &amp; Polo Shirt</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Akses Grup Alumni &amp; Jejaring Praktisi HSE Indonesia</span>
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Method & Venue Breakdown */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8">
          <h3 className="text-base sm:text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
            {batch.is_online ? <Laptop className="w-5 h-5 text-blue-600" /> : <MapPin className="w-5 h-5 text-emerald-600" />}
            Metode Pembelajaran: {batch.is_online ? 'Kelas Online Interaktif Zoom Pro HD' : `Tatap Muka Onsite di ${batch.location_name}`}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
            {batch.is_online
              ? 'Kelas online diselenggarakan secara sinkron tatap muka virtual via Zoom Meeting Pro dengan instruktur praktisi senior Kemnaker RI. Peserta mendapatkan akses rekaman materi, modul e-book interaktif, dan pengiriman berkas sertifikat fisik langsung ke alamat kantor/rumah.'
              : `Kelas tatap muka dilaksanakan di Tempat Uji Kompetensi (TUK) resmi PENA Consultant di ${batch.location_name}. Dilengkapi ruang kelas modern ber-AC, proyektor multimedia, konsumsi harian (lunch & coffee break), serta peralatan praktikum keselamatan lengkap.`}
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
            <span className="bg-white border border-slate-200 px-3 py-1 rounded-lg">✓ Kuota Terbatas Max 25-30 Peserta</span>
            <span className="bg-white border border-slate-200 px-3 py-1 rounded-lg">✓ Instruktur Berlisensi Pengawas</span>
            <span className="bg-white border border-slate-200 px-3 py-1 rounded-lg">✓ Bantuan Pengisian Berkas Pendaftaran</span>
          </div>
        </div>

        {/* Batch Registration FAQ */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" /> Pertanyaan Pendaftaran Batch #{batch.batch_number}
          </h3>
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="border-b border-slate-100 pb-3">
              <h4 className="font-bold text-slate-900 mb-1">Bagaimana cara mengunci kursi di batch ini?</h4>
              <p className="text-slate-600 leading-relaxed">
                Anda dapat mengamankan kuota dengan membayar uang muka (DP) registrasi atau mengirimkan Purchase Order (PO) resmi perusahaan melalui Account Manager PENA Consultant.
              </p>
            </div>
            <div className="border-b border-slate-100 pb-3">
              <h4 className="font-bold text-slate-900 mb-1">Kapan batas akhir pengiriman berkas persyaratan?</h4>
              <p className="text-slate-600 leading-relaxed">
                Kelengkapan dokumen (scan ijazah, KTP, pasfoto) wajib dikirimkan selambat-lambatnya 3 hari kerja sebelum tanggal pelaksanaan ({batch.start_date}) untuk verifikasi sistem database Kemnaker/BNSP.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Apakah sertifikat dan lisensi dapat diverifikasi online?</h4>
              <p className="text-slate-600 leading-relaxed">
                Ya, seluruh sertifikat dan lisensi yang diterbitkan memiliki barcode verifikasi resmi yang terdaftar langsung di portal TemanK3 Kemnaker RI atau pangkalan data BNSP nasional.
              </p>
            </div>
          </div>
        </div>

        {/* Floating Bottom Booking Card */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-1">
              PENDAFTARAN SEDANG BERLANGSUNG
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Amankan Kursi Anda di Batch #{batch.batch_number}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Hubungi tim admin untuk formulir registrasi resmi dan penawaran invoice perusahaan.
            </p>
          </div>
          <a
            href={getWaLink(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-xl text-sm transition-all whitespace-nowrap flex items-center gap-2 shadow-lg shrink-0"
          >
            <MessageCircle className="w-4 h-4" /> Hubungi via WhatsApp &rarr;
          </a>
        </div>
      </div>
    </>
  );
}