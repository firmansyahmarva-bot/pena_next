import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Shield, Clock, Award, CheckCircle2, ArrowRight, BookOpen, AlertTriangle, Users, Building, HelpCircle, FileText, Send, Calendar } from 'lucide-react';
import { getPrograms, getProgramBySlug, getArticles, getWaLink } from '@/lib/data';
import StructuredContent from '@/components/StructuredContent';
import CorporateQuoteForm from '@/components/CorporateQuoteForm';

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
  const imageSrc = program.hero_media?.path ? `/${program.hero_media.path}` : null;
  const relatedArticles = getArticles().filter(a => a.related_offering_slug === program.slug).slice(0, 3);

  const sections = [
    { title: 'Dasar Hukum & Regulasi Acuan', icon: '⚖️', content: program.legal_basis },
    { title: 'Tujuan & Sasaran Pembinaan', icon: '🎯', content: program.objectives },
    { title: 'Ruang Lingkup Materi & Silabus Pelatihan', icon: '📋', content: program.scope },
    { title: 'Persyaratan & Kualifikasi Peserta', icon: '👤', content: program.requirements },
    { title: 'Kelengkapan Dokumen & Persyaratan Administrasi', icon: '📄', content: program.documents },
    { title: 'Fasilitas Peserta & Keuntungan Pelatihan', icon: '🎁', content: program.facilities },
    { title: 'Tata Cara & Prosedur Pendaftaran', icon: '📝', content: program.registration_procedure },
  ];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Breadcrumb */}
      <nav className="text-xs font-semibold text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-primary-700">Home</Link>
        <span>/</span>
        <Link href="/pelatihan" className="hover:text-primary-700">Pelatihan</Link>
        <span>/</span>
        <span className="text-slate-900 line-clamp-1">{program.name}</span>
      </nav>

      {/* Program Hero Header with Picture */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {imageSrc && (
          <div className="lg:col-span-4 relative min-h-[260px] bg-slate-900">
            <img
              src={imageSrc}
              alt={program.hero_media?.alt_text || program.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent lg:hidden"></div>
          </div>
        )}

        <div className={`${imageSrc ? 'lg:col-span-8' : 'lg:col-span-12'} p-6 sm:p-10 flex flex-col justify-center`}>
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            {isKemnaker && (
              <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold text-xs px-3 py-1 rounded-md flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-emerald-700" />
                SERTIFIKASI RESMI KEMNAKER RI
              </span>
            )}
            {isBnsp && (
              <span className="bg-blue-100 text-blue-900 border border-blue-300 font-extrabold text-xs px-3 py-1 rounded-md flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-blue-700" />
                LISENSI PROFESI BNSP RI
              </span>
            )}
            {program.duration && (
              <span className="bg-slate-100 text-slate-700 font-semibold text-xs px-3 py-1 rounded-md flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                Durasi: {program.duration}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight mb-4">
            {program.title || program.name}
          </h1>

          {program.summary && (
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
              {program.summary}
            </p>
          )}

          {/* Quick Highlight Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-700">
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Metode Pelaksanaan</span>
              <span>Online / Onsite TUK</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Masa Berlaku</span>
              <span>3 Tahun Resmi</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Kelulusan</span>
              <span>Sertifikat &amp; SKP</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Investasi</span>
              <span className="text-primary-700 font-bold">
                {program.base_price ? `Rp ${program.base_price.toLocaleString('id-ID')}` : 'Hubungi Admin'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Structured Database Sections */}
          {sections.map((sec, idx) => {
            if (!sec.content || sec.content.length === 0) return null;
            return (
              <section key={idx} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
                  <span className="text-2xl">{sec.icon}</span> {sec.title}
                </h2>
                <StructuredContent blocks={sec.content} />
              </section>
            );
          })}

          {/* 5-Step Sertifikasi Process Roadmap */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              🚀 5 Tahapan Mengikuti Pelatihan Hingga Terbit Sertifikat
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-800 font-black flex items-center justify-center shrink-0 text-sm">1</div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Pendaftaran &amp; Verifikasi Berkas</h3>
                  <p className="text-xs text-slate-600">Konsultasikan jadwal, kirim formulir pendaftaran, KTP, Ijazah, dan Surat Tugas dari perusahaan.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-800 font-black flex items-center justify-center shrink-0 text-sm">2</div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Pembelajaran &amp; Pembekalan Materi</h3>
                  <p className="text-xs text-slate-600">Mengikuti sesi teori regulasi K3, studi kasus, dan workshop bersama instruktur berpengalaman.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-800 font-black flex items-center justify-center shrink-0 text-sm">3</div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Praktik Lapangan &amp; Penyusunan Laporan</h3>
                  <p className="text-xs text-slate-600">Pelaksanaan PKL / observasi lapangan dan presentasi seminar laporan K3 kelompok.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-800 font-black flex items-center justify-center shrink-0 text-sm">4</div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Evaluasi Ujian &amp; Asesmen Sertifikasi</h3>
                  <p className="text-xs text-slate-600">Ujian teori dan wawancara asesmen kompetensi yang diawasi langsung oleh Pengawas Kemnaker / Asesor BNSP.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center shrink-0 text-sm">5</div>
                <div>
                  <h3 className="font-bold text-emerald-900 text-sm">Penerbitan Sertifikat &amp; SKP Resmi</h3>
                  <p className="text-xs text-slate-600">Surat Keterangan Lulus (SKL) terbit segera, disusul Sertifikat Resmi, Lisensi K3, dan SKP Kemnaker RI.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Semantic Schedule Table */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              📅 Tabel Jadwal Batch 2026 &amp; Rincian Biaya
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Jadwal pelaksanaan terdekat dan biaya resmi pembinaan {program.name}.
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                <thead className="bg-slate-100 uppercase text-xs font-bold text-slate-900 border-b border-slate-200">
                  <tr>
                    <th scope="col" className="px-4 py-3">Batch</th>
                    <th scope="col" className="px-4 py-3">Tanggal Pelaksanaan</th>
                    <th scope="col" className="px-4 py-3">Metode Pelatihan</th>
                    <th scope="col" className="px-4 py-3">Biaya Investasi</th>
                    <th scope="col" className="px-4 py-3">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {program.batches && program.batches.length > 0 ? (
                    program.batches.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-semibold text-slate-900">Batch {b.batch_number}</td>
                        <td className="px-4 py-3">{b.start_date}</td>
                        <td className="px-4 py-3">{b.is_online ? '🌐 Online Zoom' : `📍 ${b.location_name}`}</td>
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
                        <a
                          href={getWaLink(`Halo Admin PENA Consultant, saya ingin konsultasi pendaftaran ${program.name}.`)}
                          target="_blank"
                          rel="noopener nofollow"
                          className="text-primary-700 font-bold hover:underline"
                        >
                          Daftar Sekarang →
                        </a>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Related Articles Silo Mesh */}
          {relatedArticles.length > 0 && (
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary-600" /> Panduan &amp; Regulasi Terkait
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map((art) => (
                  <Link
                    key={art.slug}
                    href={`/panduan/${art.slug}`}
                    className="p-4 rounded-xl border border-slate-200 hover:border-primary-500 hover:bg-slate-50 transition-all flex flex-col justify-between"
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

          {/* Corporate RFQ Form embedded */}
          <CorporateQuoteForm defaultProgram={program.name} />
        </div>

        {/* Sticky Sidebar Right Rail */}
        <div className="space-y-6">
          <div className="sticky top-24 bg-white p-6 rounded-2xl border border-slate-200 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase font-black tracking-wider text-primary-700">
                PENDAFTARAN BATCH 2026
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                Slot Tersedia
              </span>
            </div>

            <div>
              <span className="text-xs text-slate-400 block font-medium">Biaya Investasi Mulai:</span>
              {program.base_price ? (
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-black text-slate-900">
                    Rp {program.base_price.toLocaleString('id-ID')}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">/ peserta</span>
                </div>
              ) : (
                <span className="text-xl font-black text-primary-700">Hubungi Konsultan</span>
              )}
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Sertifikat &amp; Lisensi Resmi Kemnaker / BNSP</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Modul, Hardcopy Kit &amp; Materi Lengkap</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Bimbingan Ujian hingga Dinyatakan Kompeten</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Keahlian Diakui di Seluruh Indonesia</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href={getWaLink(`Halo Admin PENA Consultant, saya ingin mendaftar pelatihan ${program.name}.`)}
                target="_blank"
                rel="noopener nofollow"
                className="w-full block text-center bg-gradient-to-r from-emerald-600 to-primary-700 hover:from-emerald-700 hover:to-primary-800 text-white font-black py-4 rounded-xl shadow-lg transition-all text-sm"
              >
                💬 Daftar via WhatsApp Sekarang
              </a>
              <a
                href={getWaLink(`Halo Admin PENA Consultant, kami ingin minta proposal in-house training untuk ${program.name}.`)}
                target="_blank"
                rel="noopener nofollow"
                className="w-full block text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 rounded-xl text-xs transition-all"
              >
                Minta Proposal In-House Korporat
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}