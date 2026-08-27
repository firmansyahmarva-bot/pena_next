import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEducationPrograms, getEducationProgramBySlug } from '@/lib/data';
import { 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  Users, 
  Award, 
  HelpCircle, 
  ArrowRight, 
  MessageCircle, 
  ShieldCheck, 
  FileText, 
  Sparkles,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const programs = getEducationPrograms();
  return programs.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = getEducationProgramBySlug(slug);

  if (!program) {
    return { title: 'Program Edukasi Tidak Ditemukan | PENA Consultant' };
  }

  const pageUrl = `https://penaconsultant.com/edukasi/${program.slug}`;

  return {
    alternates: {
      canonical: pageUrl,
    },
    title: program.meta_title || `${program.title} | PENA Edukasi & Kampus`,
    description: program.meta_description || program.summary,
    openGraph: {
      title: program.meta_title || program.title,
      description: program.meta_description || program.summary,
      url: pageUrl,
      siteName: 'PENA Consultant',
      locale: 'id_ID',
      type: 'website',
      images: [{ url: 'https://penaconsultant.com/images/og-share-card.png', width: 1200, height: 630, alt: program.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: program.meta_title || program.title,
      description: program.meta_description || program.summary,
      images: ['https://penaconsultant.com/images/og-share-card.png'],
    },
  };
}

export default async function EducationDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = getEducationProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: program.faqs.map((f: { question: string; answer: string }) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: program.title,
    description: program.summary,
    provider: {
      '@type': 'Organization',
      name: 'PENA Consultant',
      sameAs: 'https://penaconsultant.com',
    },
  };

  return (
    <div className="py-10 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
        <Link href="/" className="hover:text-blue-600 transition-colors">Beranda</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <Link href="/edukasi" className="hover:text-blue-600 transition-colors">Edukasi &amp; Kampus</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="text-slate-900 font-semibold truncate">{program.title}</span>
      </nav>

      {/* Hero Section */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm mb-12">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            {program.category_name}
          </span>
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-500" /> {program.duration}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug mb-4">
          {program.title}
        </h1>

        <p className="text-base sm:text-lg font-medium text-blue-800 bg-blue-50/60 border-l-4 border-blue-600 p-4 rounded-r-xl mb-6">
          &ldquo;{program.hero_tagline}&rdquo;
        </p>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
          {program.summary}
        </p>

        {/* Audience & Pricing Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-8">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Target Sasaran:</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-800">{program.target_audience}</span>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Estimasi Investasi Sesi:</span>
            <span className="text-xs sm:text-sm font-bold text-emerald-700">{program.price_estimate}</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`https://wa.me/6281296870884?text=Halo%20Tim%20PENA%20Edukasi,%20saya%20ingin%20meminta%20proposal%20dan%20estimasi%20biaya%20untuk%20sesi%20kampus:%20${encodeURIComponent(program.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <MessageCircle className="w-4 h-4" /> Unduh Proposal &amp; Jadwalkan Sesi (WhatsApp)
          </a>
          <Link
            href="/edukasi"
            className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-xl transition-colors text-center"
          >
            Lihat Program Edukasi Lainnya
          </Link>
        </div>
      </div>

      {/* Key Problems Solved */}
      <div className="mb-12">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-amber-500" /> Tantangan Nyata yang Dipecahkan dalam Sesi Ini
        </h2>
        <div className="grid grid-cols-1 gap-3.5">
          {program.key_problems_solved.map((prob: string, idx: number) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                !
              </div>
              <p className="text-sm text-slate-700 font-medium leading-relaxed">{prob}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Syllabus Modules */}
      <div className="mb-12">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-600" /> Silabus &amp; Kurikulum Sesi 1 Hari
        </h2>
        <div className="space-y-6">
          {program.modules.map((mod: { title: string; description: string; topics: string[] }, idx: number) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900">{mod.title}</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mb-4 pl-10 leading-relaxed">
                {mod.description}
              </p>
              <div className="pl-10 space-y-2 border-t border-slate-100 pt-3">
                {mod.topics.map((top: string, tIdx: number) => (
                  <div key={tIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{top}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Concrete Outcomes & Deliverables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-6">
          <h3 className="text-lg font-black text-emerald-950 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-600" /> Hasil Konkret Peserta
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-900 font-medium">
            {program.concrete_outcomes.map((out: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{out}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-6">
          <h3 className="text-lg font-black text-blue-950 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" /> Fasilitas &amp; Dokumen Resmi
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-blue-900 font-medium">
            {program.deliverables.map((del: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{del}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Natural Bridge to K3 Core Certification (If Applicable) */}
      {program.related_k3_offering_slug && (
        <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-6 sm:p-8 text-white mb-12 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300 block mb-1">
                JALUR SERTIFIKASI LANJUTAN KEMNAKER RI / BNSP
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white">
                Ingin Mengambil Sertifikasi Penuh Berlisensi Resmi?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Pelajari program reguler lengkap kami di {program.related_k3_offering_name || 'Program Sertifikasi K3'} untuk lisensi resmi Kemnaker RI / BNSP dengan legalitas hukum tertinggi.
              </p>
            </div>
            <Link
              href={`/pelatihan/${program.related_k3_offering_slug}`}
              className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm"
            >
              Lihat Program Reguler <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* FAQ & AI GEO Answers */}
      <div className="mb-16">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-blue-600" /> Pertanyaan Populer seputar Sesi Ini
        </h2>
        <div className="space-y-4">
          {program.faqs.map((f: { question: string; answer: string }, idx: number) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2">{f.question}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{f.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Bottom Booking Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <h3 className="text-lg sm:text-xl font-black">Siap Mengundang Instruktur ke Kampus Anda?</h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Konsultasikan jadwal, silabus kustom, dan penawaran proposal kemitraan via WhatsApp.</p>
        </div>
        <a
          href={`https://wa.me/6281296870884?text=Halo%20PENA%20Consultant,%20saya%20ingin%20mengundang%20sesi%20kampus:%20${encodeURIComponent(program.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-xl transition-colors whitespace-nowrap flex items-center gap-2 shadow-lg"
        >
          <MessageCircle className="w-4 h-4" /> Hubungi via WhatsApp
        </a>
      </div>
    </div>
  );
}