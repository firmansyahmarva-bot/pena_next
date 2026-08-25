import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Shield, Clock, Award, CheckCircle2, ArrowRight, BookOpen, AlertTriangle } from 'lucide-react';
import { getPrograms, getProgramBySlug, getArticles, getWaLink } from '@/lib/data';
import StructuredContent from '@/components/StructuredContent';

export async function generateStaticParams() {
  return getPrograms().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) return {};

  return {
    title: program.meta_title || program.title,
    description: program.meta_description || program.summary || '',
  };
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) notFound();

  const isKemnaker = program.certification_body === 'kemnaker';
  const isBnsp = program.certification_body === 'bnsp';
  const relatedArticles = getArticles().filter(a => a.related_offering_slug === program.slug).slice(0, 3);

  const sections = [
    { title: 'Dasar Hukum & Regulasi Acuan', icon: '⚖️', content: program.legal_basis },
    { title: 'Tujuan & Sasaran Pembinaan', icon: '🎯', content: program.objectives },
    { title: 'Ruang Lingkup Materi & Silabus', icon: '📋', content: program.scope },
    { title: 'Persyaratan Peserta', icon: '👤', content: program.requirements },
    { title: 'Kelengkapan Dokumen & Berkas', icon: '📄', content: program.documents },
    { title: 'Fasilitas & Keuntungan Peserta', icon: '🎁', content: program.facilities },
    { title: 'Tata Cara Pendaftaran', icon: '📝', content: program.registration_procedure },
  ];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="text-xs font-semibold text-slate-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-primary-700">Home</Link>
        <span>/</span>
        <Link href="/pelatihan" className="hover:text-primary-700">Pelatihan</Link>
        <span>/</span>
        <span className="text-slate-900 line-clamp-1">{program.name}</span>
      </nav>

      {/* Program Hero Header */}
      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm mb-10">
        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          {isKemnaker && (
            <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs px-3 py-1 rounded-md">
              🛡️ RESMI KEMNAKER RI
            </span>
          )}
          {isBnsp && (
            <span className="bg-blue-100 text-blue-900 border border-blue-300 font-bold text-xs px-3 py-1 rounded-md">
              🦅 SERTIFIKASI BNSP RI
            </span>
          )}
          {program.duration && (
            <span className="bg-slate-100 text-slate-700 font-semibold text-xs px-3 py-1 rounded-md flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Durasi: {program.duration}
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-4">
          {program.title || program.name}
        </h1>

        {program.summary && (
          <p className="text-base sm:text-lg text-slate-600 max-w-4xl leading-relaxed">
            {program.summary}
          </p>
        )}
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Structured Sections */}
          {sections.map((sec, idx) => {
            if (!sec.content || sec.content.length === 0) return null;
            return (
              <section key={idx} className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span>{sec.icon}</span> {sec.title}
                </h2>
                <StructuredContent blocks={sec.content} />
              </section>
            );
          })}

          {/* Semantic Schedule Table */}
          <section className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              📅 Tabel Jadwal Batch 2026 &amp; Rincian Biaya
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Jadwal pelaksanaan terdekat dan biaya resmi pembinaan {program.name}.
            </p>

            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                <thead className="bg-slate-100 uppercase text-xs font-bold text-slate-900 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Batch</th>
                    <th className="px-4 py-3">Tanggal</th>
                    <th className="px-4 py-3">Metode</th>
                    <th className="px-4 py-3">Biaya</th>
                    <th className="px-4 py-3">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {program.batches && program.batches.length > 0 ? (
                    program.batches.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-semibold text-slate-900">Batch {b.batch_number}</td>
                        <td className="px-4 py-3">{b.start_date}</td>
                        <td className="px-4 py-3">{b.is_online ? '🌐 Online' : `📍 ${b.location_name}`}</td>
                        <td className="px-4 py-3 font-bold text-primary-700">
                          {b.normal_price ? `Rp ${b.normal_price.toLocaleString('id-ID')}` : 'Hubungi Admin'}
                        </td>
                        <td className="px-4 py-3">
                          <Link href={`/jadwal/${b.slug}`} className="text-primary-700 font-bold hover:underline">
                            Pilih Batch →
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="px-4 py-3 font-semibold">Batch Reguler 2026</td>
                      <td className="px-4 py-3">Setiap Bulan</td>
                      <td className="px-4 py-3">Online / On-site</td>
                      <td className="px-4 py-3 font-bold text-primary-700">
                        {program.base_price ? `Rp ${program.base_price.toLocaleString('id-ID')}` : 'Penawaran Khusus'}
                      </td>
                      <td className="px-4 py-3">
                        <a href="#daftar" className="text-primary-700 font-bold hover:underline">Daftar Sekarang →</a>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Related Articles Silo */}
          {relatedArticles.length > 0 && (
            <section className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary-600" /> Panduan &amp; Regulasi Terkait
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map((art) => (
                  <Link
                    key={art.slug}
                    href={`/panduan/${art.slug}`}
                    className="p-4 rounded-lg border border-slate-200 hover:border-primary-500 hover:bg-slate-50 transition-all flex flex-col justify-between"
                  >
                    <h3 className="font-bold text-sm text-slate-900 line-clamp-2 mb-2">
                      {art.title}
                    </h3>
                    <span className="text-xs font-bold text-primary-700">Baca Panduan →</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sticky Aside Rail */}
        <div className="space-y-6">
          <div className="sticky top-24 bg-white p-6 rounded-2xl border border-slate-200 shadow-lg space-y-5">
            <span className="text-xs uppercase font-bold tracking-widest text-primary-700 block">
              PENDAFTARAN RESMI BATCH 2026
            </span>

            <div>
              <span className="text-xs text-slate-400 block">Biaya Investasi:</span>
              {program.base_price ? (
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900">
                    Rp {program.base_price.toLocaleString('id-ID')}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">/ peserta</span>
                </div>
              ) : (
                <span className="text-xl font-bold text-primary-700">Hubungi Konsultan</span>
              )}
            </div>

            <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Sertifikat &amp; SKP Resmi Kemnaker/BNSP
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Modul &amp; Ujian Sertifikasi Lengkap
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Pembinaan oleh Instruktur Senior
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <a
                href={getWaLink(`Halo Admin PENA Consultant, saya ingin mendaftar pelatihan ${program.name}.`)}
                target="_blank"
                rel="noopener nofollow"
                className="w-full block text-center bg-gradient-to-r from-emerald-600 to-primary-700 hover:from-emerald-700 hover:to-primary-800 text-white font-black py-3.5 rounded-xl shadow-md transition-all"
              >
                💬 Daftar via WhatsApp
              </a>
              <a
                href={getWaLink(`Halo Admin PENA Consultant, kami ingin minta proposal in-house training untuk ${program.name}.`)}
                target="_blank"
                rel="noopener nofollow"
                className="w-full block text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 rounded-xl text-xs transition-all"
              >
                Minta Proposal In-House Perusahaan
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}