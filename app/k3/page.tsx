import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  ShieldCheck, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Scale, 
  Layers, 
  Flame, 
  Zap, 
  AlertTriangle, 
  HeartHandshake, 
  Users, 
  FileCheck, 
  Calendar, 
  GraduationCap, 
  Sparkles,
  HelpCircle,
  PhoneCall,
  Check
} from 'lucide-react';
import { BreadcrumbJsonLd, FaqJsonLd } from '@/components/JsonLd';
import { getPrograms, getWaLink } from '@/lib/data';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://penaconsultant.com/k3',
  },
  title: 'Pusat K3 Indonesia — Pengertian, Regulasi, Sertifikasi & Manajemen K3',
  description: 'Portal pusat informasi K3 (Keselamatan dan Kesehatan Kerja) Indonesia: pengertian filosofis & hukum, UU No. 1/1970, SMK3 PP 50/2012, hierarki pengendalian risiko, dan 73+ program sertifikasi resmi Kemnaker & BNSP.',
  openGraph: {
    title: 'Pusat K3 Indonesia — Pengertian, Regulasi, Sertifikasi & Manajemen K3',
    description: 'Portal pusat informasi K3 (Keselamatan dan Kesehatan Kerja) Indonesia: pengertian filosofis & hukum, UU No. 1/1970, SMK3 PP 50/2012, hierarki pengendalian risiko, dan 73+ program sertifikasi resmi Kemnaker & BNSP.',
    url: 'https://penaconsultant.com/k3',
    siteName: 'PENA Consultant',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: 'https://penaconsultant.com/images/og-share-card.png', width: 1200, height: 630, alt: 'Pusat K3 Indonesia PENA Consultant' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pusat K3 Indonesia — Pengertian, Regulasi, Sertifikasi & Manajemen K3',
    description: 'Portal pusat informasi K3 (Keselamatan dan Kesehatan Kerja) Indonesia: pengertian filosofis & hukum, UU No. 1/1970, SMK3 PP 50/2012, hierarki pengendalian risiko, dan 73+ program sertifikasi resmi Kemnaker & BNSP.',
    images: ['https://penaconsultant.com/images/og-share-card.png'],
  },
  keywords: [
    'k3',
    'pengertian k3',
    'keselamatan dan kesehatan kerja',
    'dasar hukum k3',
    'uu no 1 tahun 1970',
    'smk3 pp 50 2012',
    'hierarki pengendalian risiko',
    'sertifikasi k3 kemnaker',
    'sertifikasi k3 bnsp',
    'pembinaan k3',
    'ahli k3 umum'
  ]
};

const faqs = [
  {
    question: 'Apa itu K3 (Keselamatan dan Kesehatan Kerja)?',
    answer: 'K3 adalah segala kegiatan untuk menjamin dan melindungi keselamatan dan kesehatan tenaga kerja melalui upaya pencegahan kecelakaan kerja dan penyakit akibat kerja (PAK). K3 memiliki tiga dimensi: filosofis (menjaga keutuhan martabat manusia), keilmuan (penerapan sains dalam mitigasi bahaya), dan hukum (kepatuhan atas regulasi ketenagakerjaan).'
  },
  {
    question: 'Apa dasar hukum utama pelaksanaan K3 di Indonesia?',
    answer: 'Dasar hukum tertinggi K3 di Indonesia adalah Undang-Undang No. 1 Tahun 1970 tentang Keselamatan Kerja, yang diperkuat oleh Undang-Undang No. 13 Tahun 2003 tentang Ketenagakerjaan (Pasal 86 & 87) serta Peraturan Pemerintah No. 50 Tahun 2012 tentang Penerapan Sistem Manajemen Keselamatan dan Kesehatan Kerja (SMK3).'
  },
  {
    question: 'Kapan suatu perusahaan wajib menerapkan SMK3 PP 50/2012?',
    answer: 'Berdasarkan Pasal 5 PP 50/2012, setiap perusahaan wajib menerapkan SMK3 jika: (1) Mempekerjakan pekerja/buruh paling sedikit 100 orang, atau (2) Mempunyai tingkat potensi bahaya tinggi (seperti sektor migas, kimia, konstruksi, pertambangan, dan manufaktur berat) meskipun jumlah pekerjanya kurang dari 100 orang.'
  },
  {
    question: 'Apa perbedaan sertifikasi K3 Kemnaker RI dan Sertifikasi K3 BNSP?',
    answer: 'Sertifikasi Kemnaker RI berfokus pada pemenuhan regulasi legalitas (compliance) pemerintah dan menghasilkan SKP (Surat Keputusan Penunjukan) serta Lisensi Kewenangan K3 bagi utusan perusahaan. Sedangkan sertifikasi BNSP berfokus pada pengakuan uji kompetensi standar profesi nasional (SKKNI) berlogo Garuda Emas yang berlaku perorangan untuk daya saing karir industri.'
  },
  {
    question: 'Berapa lama masa berlaku Lisensi K3 dan bagaimana perpanjangannya?',
    answer: 'Lisensi K3 resmi Kemnaker RI umumnya berlaku selama 3 tahun dan wajib diperpanjang sebelum masa berlaku habis dengan melampirkan laporan kegiatan K3, surat rekomendasi perusahaan, dan verifikasi berkas di portal TemanK3 Kemnaker.'
  }
];

export default function K3MasterHubPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://penaconsultant.com' },
    { name: 'Pusat K3 Indonesia', url: 'https://penaconsultant.com/k3' },
  ];

  const waLeadMsg = 'Halo PENA Consultant, saya ingin konsultasi seputar regulasi dan sertifikasi K3 resmi untuk perusahaan / individu.';

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <FaqJsonLd faqs={faqs} />

      <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-black uppercase tracking-wider shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-blue-600" /> PUSAT KESELAMATAN &amp; KESEHATAN KERJA INDONESIA
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Pusat Edukasi, Regulasi &amp; <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900">
              Sertifikasi K3 Nasional
            </span>
          </h1>
          <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Portal rujukan terpadu mengenai landasan filosofis, dasar hukum perundangan, hierarki pengendalian bahaya, hingga 73+ program pembinaan sertifikasi resmi Kementerian Ketenagakerjaan RI dan BNSP.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 text-left">
            <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <span className="text-3xl font-black text-blue-600 block">73+</span>
              <span className="text-xs font-bold text-slate-700">Program Sertifikasi</span>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <span className="text-3xl font-black text-emerald-600 block">PP 50/2012</span>
              <span className="text-xs font-bold text-slate-700">Standar SMK3 Nasional</span>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <span className="text-3xl font-black text-purple-600 block">23 Kota</span>
              <span className="text-xs font-bold text-slate-700">Jaringan TUK &amp; Cabang</span>
            </div>
            <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <span className="text-3xl font-black text-amber-600 block">100% Resmi</span>
              <span className="text-xs font-bold text-slate-700">Kemnaker &amp; BNSP</span>
            </div>
          </div>
        </div>

        {/* 3 Dimensi Definisi K3 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs font-black uppercase text-blue-600 tracking-wider">KONSEP DASAR</span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-1">
              3 Sudut Pandang Pengertian K3
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              K3 tidak sekadar mengenakan helm proyek atau rompi keselamatan, melainkan sistem manajemen komprehensif yang diakui dari tiga sudut pandang:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-black flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-slate-900">1. Secara Filosofis</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Suatu pemikiran dan upaya untuk menjamin keutuhan dan kesempurnaan jasmani maupun rohani tenaga kerja pada khususnya, dan manusia pada umumnya, serta hasil karya dan budayanya menuju masyarakat adil dan makmur.
              </p>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-black flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-slate-900">2. Secara Keilmuan</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Ilmu pengetahuan dan penerapannya dalam usaha mencegah kemungkinan terjadinya kecelakaan kerja, penyakit akibat kerja (PAK), peledakan, kebakaran, dan pencemaran lingkungan di tempat kerja.
              </p>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 font-black flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-slate-900">3. Secara Hukum</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Suatu bentuk perlindungan yang wajib diberikan oleh pengusaha/pemberi kerja kepada tenaga kerja guna menjamin keselamatan, kesehatan, dan kesejahteraan mereka selama menjalankan pekerjaan yang diatur dalam perundangan.
              </p>
            </div>
          </div>
        </div>

        {/* Dasar Hukum Utama K3 di Indonesia */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-8">
          <div>
            <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">LANDASAN YURIDIS</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
              Hierarki Regulasi K3 di Indonesia
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl">
              Seluruh operasional perusahaan di wilayah Republik Indonesia tunduk pada kerangka hukum keselamatan kerja yang mengikat:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-white/10 backdrop-blur-xs border border-white/10 rounded-2xl space-y-2">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-base">UU No. 1 Tahun 1970</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Undang-Undang Keselamatan Kerja — Payung hukum utama yang mengatur syarat-syarat keselamatan kerja di segala tempat kerja di darat, dalam tanah, permukaan air, dalam air, maupun di udara.
              </p>
            </div>

            <div className="p-5 bg-white/10 backdrop-blur-xs border border-white/10 rounded-2xl space-y-2">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">PP No. 50 Tahun 2012</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Penerapan Sistem Manajemen Keselamatan dan Kesehatan Kerja (SMK3) — Mewajibkan 166 kriteria audit SMK3 bagi perusahaan berisiko tinggi atau dengan &ge;100 tenaga kerja.
              </p>
            </div>

            <div className="p-5 bg-white/10 backdrop-blur-xs border border-white/10 rounded-2xl space-y-2">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-white text-base">Permenaker No. 04/MEN/1987</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Panitia Pembina Keselamatan dan Kesehatan Kerja (P2K3) — Mewajibkan pembentukan organisasi P2K3 di perusahaan dengan sekretaris seorang Ahli K3 Umum berlisensi Kemnaker RI.
              </p>
            </div>

            <div className="p-5 bg-white/10 backdrop-blur-xs border border-white/10 rounded-2xl space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-purple-400" />
                <h3 className="font-bold text-white text-base">Permenaker No. 5 Tahun 2018</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Keselamatan dan Kesehatan Kerja Lingkungan Kerja — Standar Nilai Ambang Batas (NAB) faktor fisika, kimia, biologi, ergonomi, dan psikologi kerja.
              </p>
            </div>
          </div>
        </div>

        {/* 5 Hierarki Pengendalian Risiko */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs font-black uppercase text-blue-600 tracking-wider">MANAJEMEN RISIKO</span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-1">
              5 Hierarki Pengendalian Bahaya (Hierarchy of Controls)
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Standar baku internasional dan nasional dalam menentukan urutan prioritas mitigasi bahaya di tempat kerja:
            </p>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            <div className="p-4 bg-emerald-600 text-white rounded-2xl flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-white/20 font-black text-sm flex items-center justify-center">1</span>
                <div>
                  <h3 className="font-black text-sm sm:text-base">Eliminasi (Elimination)</h3>
                  <p className="text-xs text-emerald-100">Menghilangkan sumber bahaya secara fisik dan total dari proses kerja.</p>
                </div>
              </div>
              <span className="text-xs font-black bg-white text-emerald-800 px-3 py-1 rounded-full uppercase tracking-wider hidden sm:inline-block">Paling Efektif</span>
            </div>

            <div className="p-4 bg-teal-600 text-white rounded-2xl flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-white/20 font-black text-sm flex items-center justify-center">2</span>
                <div>
                  <h3 className="font-black text-sm sm:text-base">Substitusi (Substitution)</h3>
                  <p className="text-xs text-teal-100">Mengganti bahan, mesin, atau metode berbahaya dengan alternatif yang lebih aman.</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-600 text-white rounded-2xl flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-white/20 font-black text-sm flex items-center justify-center">3</span>
                <div>
                  <h3 className="font-black text-sm sm:text-base">Rekayasa Teknik (Engineering Control)</h3>
                  <p className="text-xs text-blue-100">Memasang pelindung mesin, sistem ventilasi/exhaust, peredam suara, atau interlock sensor.</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-amber-600 text-white rounded-2xl flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-white/20 font-black text-sm flex items-center justify-center">4</span>
                <div>
                  <h3 className="font-black text-sm sm:text-base">Pengendalian Administratif (Administrative Control)</h3>
                  <p className="text-xs text-amber-100">SOP kerja aman, rotasi shift kerja, izin kerja (Permit to Work), safety talk, dan pelatihan K3.</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-rose-600 text-white rounded-2xl flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-white/20 font-black text-sm flex items-center justify-center">5</span>
                <div>
                  <h3 className="font-black text-sm sm:text-base">Alat Pelindung Diri (APD / PPE)</h3>
                  <p className="text-xs text-rose-100">Helm safety, kacamata, respirator, earplug, safety shoes, dan harness (Benteng perlindungan terakhir).</p>
                </div>
              </div>
              <span className="text-xs font-black bg-white text-rose-800 px-3 py-1 rounded-full uppercase tracking-wider hidden sm:inline-block">Last Resort</span>
            </div>
          </div>
        </div>

        {/* 5 Klaster Sertifikasi & Layanan PENA Consultant */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-black uppercase text-blue-600 tracking-wider">KATALOG KEAHLIAN</span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-1">
              5 Klaster Sertifikasi K3 Resmi PENA Consultant
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              PENA Consultant menyelenggarakan pembinaan bersertifikat Kemnaker RI dan uji kompetensi BNSP di berbagai disiplin spesialisasi:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs hover:border-blue-500 transition-colors space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">1. Manajemen &amp; SMK3</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pembinaan calon pimpinan keselamatan kerja, auditor kepatuhan hukum, dan kontraktor vendor:
              </p>
              <ul className="space-y-2 text-xs font-semibold text-slate-700">
                <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> Ahli K3 Umum Kemnaker &amp; BNSP</li>
                <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> Auditor SMK3 PP 50/2012</li>
                <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> CSMS (Contractor Safety Management)</li>
              </ul>
              <Link href="/pelatihan/ahli-k3-umum" className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline pt-2">
                Lihat Detail Program &rarr;
              </Link>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs hover:border-blue-500 transition-colors space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">2. Mekanik &amp; Kelistrikan</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sertifikasi teknisi dan operator peralatan berisiko tinggi sesuai standar PUIL dan Permenaker:
              </p>
              <ul className="space-y-2 text-xs font-semibold text-slate-700">
                <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> Ahli &amp; Teknisi K3 Listrik</li>
                <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> Operator Forklift &amp; Overhead Crane</li>
                <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> Operator Boiler &amp; Bejana Tekan</li>
              </ul>
              <Link href="/pelatihan/ahli-k3-listrik" className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline pt-2">
                Lihat Detail Program &rarr;
              </Link>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs hover:border-blue-500 transition-colors space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">3. Kimia &amp; Higiene Industri</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pengendalian bahan B3, analisis faktor lingkungan kerja, dan pengolahan limbah industri:
              </p>
              <ul className="space-y-2 text-xs font-semibold text-slate-700">
                <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> Ahli K3 Kimia (Kepmenaker 187/1999)</li>
                <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> Higiene Industri Muda / Madya / Utama</li>
                <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> Penanggung Jawab Limbah B3 &amp; POPAL</li>
              </ul>
              <Link href="/pelatihan/ahli-k3-kimia" className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline pt-2">
                Lihat Detail Program &rarr;
              </Link>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs hover:border-blue-500 transition-colors space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">4. Penanggulangan Kebakaran</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Regu tanggap darurat proteksi kebakaran gedung dan fasilitas industri Kepmenaker 186/1999:
              </p>
              <ul className="space-y-2 text-xs font-semibold text-slate-700">
                <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> Petugas Peran Kebakaran (Kelas D)</li>
                <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> Regu Penanggulangan (Kelas C &amp; B)</li>
                <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> Ahli K3 Kebakaran (Kelas A)</li>
              </ul>
              <Link href="/pelatihan/ahli-k3-penanggulangan-kebakaran-kelas-a" className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline pt-2">
                Lihat Detail Program &rarr;
              </Link>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs hover:border-blue-500 transition-colors space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900">5. Ketinggian &amp; Ruang Terbatas</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Teknik bekerja pada ketinggian dan keselamatan memasuki ruang terbatas (confined space):
              </p>
              <ul className="space-y-2 text-xs font-semibold text-slate-700">
                <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> TKBT II &amp; TKPK (Tali Ketinggian)</li>
                <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> Petugas Madya &amp; Utama Confined Space</li>
                <li className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> Authorized Gas Tester (AGT)</li>
              </ul>
              <Link href="/pelatihan/tenaga-kerja-pada-ketinggian" className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline pt-2">
                Lihat Detail Program &rarr;
              </Link>
            </div>

            <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-black uppercase text-amber-400 tracking-wider block mb-1">KATALOG LENGKAP</span>
                <h3 className="text-lg font-black text-white">73+ Program Sertifikasi K3</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Jelajahi seluruh daftar program sertifikasi Kemnaker &amp; BNSP lengkap dengan jadwal batch terdekat, silabus, dan biaya investasi.
                </p>
              </div>
              <Link
                href="/pelatihan"
                className="w-full text-center py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-1"
              >
                Buka Katalog Pelatihan &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Directory Hub Quick Links */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6 text-center">
            Pusat Akses &amp; Direktori Layanan K3
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link
              href="/pelatihan"
              className="p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-500 hover:shadow-xs transition-all text-center space-y-2 block"
            >
              <Award className="w-6 h-6 text-blue-600 mx-auto" />
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">Katalog Pelatihan</h3>
              <p className="text-[11px] text-slate-500">73+ Program Sertifikasi</p>
            </Link>

            <Link
              href="/jadwal"
              className="p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-500 hover:shadow-xs transition-all text-center space-y-2 block"
            >
              <Calendar className="w-6 h-6 text-emerald-600 mx-auto" />
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">Jadwal Batch 2026</h3>
              <p className="text-[11px] text-slate-500">Kalender Kelas Terdekat</p>
            </Link>

            <Link
              href="/pelatihan/ahli-k3-umum/tryout"
              className="p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-500 hover:shadow-xs transition-all text-center space-y-2 block"
            >
              <Sparkles className="w-6 h-6 text-amber-600 mx-auto" />
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">Simulasi Tryout K3</h3>
              <p className="text-[11px] text-slate-500">Latihan Soal Ujian Gratis</p>
            </Link>

            <Link
              href="/panduan"
              className="p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-500 hover:shadow-xs transition-all text-center space-y-2 block"
            >
              <BookOpen className="w-6 h-6 text-purple-600 mx-auto" />
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">Koleksi Panduan</h3>
              <p className="text-[11px] text-slate-500">328+ Artikel Edukasi K3</p>
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs font-black uppercase text-blue-600 tracking-wider">TANYA JAWAB</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Pertanyaan Sering Diajukan Seputar K3 di Indonesia
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 pl-7 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Bar */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-blue-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl">
          <span className="text-xs font-black uppercase text-emerald-400 tracking-widest block">
            KONSULTASI K3 GRATIS
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white max-w-2xl mx-auto">
            Butuh Bimbingan Pemenuhan K3 untuk Perusahaan Anda?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Tim konsultan sertifikasi dan auditor SMK3 PENA Consultant siap membantu pemetaan kompetensi karyawan dan kebutuhan audit kepatuhan hukum instansi Anda.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={getWaLink(waLeadMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-xl text-sm transition-all shadow-lg flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" /> Konsultasi via WhatsApp &rarr;
            </a>
            <Link
              href="/pelatihan"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-sm transition-all border border-white/20"
            >
              Jelajahi 73+ Program Pelatihan
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}