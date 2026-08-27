import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getEducationPrograms } from '@/lib/data';
import { GraduationCap, Sparkles, BookOpen, Users, Award, ArrowRight, CheckCircle2, MessageCircle, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://penaconsultant.com/edukasi',
  },
  title: 'PENA Edukasi & Kampus: Program Pelatihan Mahasiswa, Dosen, Guru & Sekolah 2026',
  description: 'Pusat pelatihan 1 hari, sertifikasi SKPI BNSP, Ahli K3 Umum Goes to Campus, workshop persiapan karir, public speaking, dan IHT guru sekolah resmi bersertifikat.',
  openGraph: {
    title: 'PENA Edukasi & Kampus: Program Pelatihan Mahasiswa, Dosen & Guru 2026',
    description: 'Pusat pelatihan 1 hari, sertifikasi SKPI BNSP, Ahli K3 Umum Goes to Campus, workshop persiapan karir, public speaking, dan IHT guru sekolah resmi bersertifikat.',
    url: 'https://penaconsultant.com/edukasi',
    siteName: 'PENA Consultant',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: 'https://penaconsultant.com/images/og-share-card.png', width: 1200, height: 630, alt: 'PENA Edukasi & Kampus' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PENA Edukasi & Kampus: Program Pelatihan Mahasiswa, Dosen & Guru 2026',
    description: 'Pusat pelatihan 1 hari, sertifikasi SKPI BNSP, Ahli K3 Umum Goes to Campus, workshop persiapan karir, public speaking, dan IHT guru sekolah resmi bersertifikat.',
    images: ['https://penaconsultant.com/images/og-share-card.png'],
  },
};

const CATEGORIES = [
  { id: 'all', name: 'Semua Program Edukasi' },
  { id: 'k3-sertifikasi-kampus', name: '🏆 K3 & SKPI BNSP Kampus' },
  { id: 'karier-fresh-graduate', name: '🚀 Karier & HR Simulation' },
  { id: 'mindset-produktivitas', name: '💡 Mindset & AI Produktivitas' },
  { id: 'public-speaking-leadership', name: '🎤 Public Speaking & BEM' },
  { id: 'guru-dosen-sekolah', name: '👨‍🏫 Guru, Dosen & Sekolah' },
];

export default function EdukasiHubPage() {
  const programs = getEducationPrograms();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Bagaimana cara kampus atau sekolah mengundang PENA Consultant?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pihak BEM, Himpunan, Biro Kemahasiswaan, atau Kepala Sekolah cukup menghubungi Account Manager Edukasi kami via WhatsApp di 0812-9687-0884 untuk konsultasi kebutuhan materi, tanggal, dan pengiriman proposal resmi (KAK / TOR).'
        }
      },
      {
        '@type': 'Question',
        name: 'Apakah biaya pelatihan bersifat fleksibel untuk anggaran kampus?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ya, kami menyediakan skema estimasi investasi mulai dari Rp 7.500.000 per sesi kampus (kapasitas 50-300 peserta), skema patungan/subsidi kolektif mahasiswa, maupun paket kemitraan MoU tingkat fakultas.'
        }
      },
      {
        '@type': 'Question',
        name: 'Apakah peserta mendapatkan sertifikat resmi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Seluruh peserta mendapatkan E-Certificate resmi dari PENA Consultant yang dapat digunakan untuk poin SKPI (Surat Keterangan Pendamping Ijazah), portofolio kerja, atau sertifikat 32 JP untuk pelaporan E-Kinerja guru/dosen.'
        }
      }
    ]
  };

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Header */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4">
          <GraduationCap className="w-4 h-4" /> PENA EDUKASI &amp; KAMPUS HUB 2026
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Empowering Next-Gen Leaders, Kampus &amp; Pendidik
        </h1>
        <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed max-w-3xl mx-auto">
          Pusat pelatihan 1 hari berdaya dampak tinggi untuk mahasiswa, aktivis organisasi BEM, fresh graduate, guru, dan dosen. Dari sertifikasi resmi Ahli K3 Umum &amp; SKPI BNSP hingga persiapan karier impian.
        </p>

        {/* Quick Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 max-w-3xl mx-auto text-left">
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-2xl font-black text-blue-600 block">30+</span>
            <span className="text-xs font-medium text-slate-600">Modul Kampus &amp; Sekolah</span>
          </div>
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-2xl font-black text-emerald-600 block">15.000+</span>
            <span className="text-xs font-medium text-slate-600">Alumni Terlatih</span>
          </div>
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-2xl font-black text-amber-600 block">SKPI / 32 JP</span>
            <span className="text-xs font-medium text-slate-600">Sertifikat Resmi</span>
          </div>
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-2xl font-black text-purple-600 block">Fleksibel</span>
            <span className="text-xs font-medium text-slate-600">Onsite / Aula / Zoom</span>
          </div>
        </div>
      </div>

      {/* Program Grid */}
      <div className="mb-20">
        <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Katalog Program Edukasi Unggulan</h2>
            <p className="text-sm text-slate-500 mt-1">Pilih modul yang sesuai dengan kebutuhan audiens kampus atau institusi Anda</p>
          </div>
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
            {programs.length} Program Aktif
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {programs.map((p) => (
            <div
              key={p.slug}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-400 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Category Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                    {p.category_name}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{p.duration}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-2">
                  <Link href={`/edukasi/${p.slug}`}>
                    {p.title}
                  </Link>
                </h3>

                {/* Hero Tagline */}
                <p className="text-xs font-medium text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                  {p.hero_tagline}
                </p>

                {/* Modules Preview */}
                <div className="space-y-1.5 mb-4 border-t border-slate-100 pt-3">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Fokus Bahasan:</span>
                  {p.modules.slice(0, 2).map((m: { title: string }, idx: number) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{m.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="border-t border-slate-100 pt-4 mt-2">
                <div className="mb-3">
                  <span className="text-[11px] text-slate-400 block font-medium">Estimasi Investasi:</span>
                  <span className="text-xs font-bold text-slate-800 line-clamp-1">{p.price_estimate}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href={`/edukasi/${p.slug}`}
                    className="w-full text-center py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    Detail Silabus <ArrowRight className="w-3 h-3" />
                  </Link>
                  <a
                    href={`https://wa.me/6281296870884?text=Halo%20PENA%20Consultant,%20saya%20tertarik%20mengajukan%20proposal%20edukasi%20sesi:%20${encodeURIComponent(p.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 shadow-sm"
                  >
                    <MessageCircle className="w-3 h-3" /> Proposal WA
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Institutional Partnership CTA */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden mb-16 shadow-xl">
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-300 block mb-2">
            KEMITRAAN KAMPUS, BEM &amp; YAYASAN SEKOLAH
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Ingin Mengadakan Sesi Khusus di Kampus atau Sekolah Anda?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
            Tim instruktur dan praktisi ahli PENA Consultant siap hadir langsung ke aula kampus, auditorium sekolah, atau menyelenggarakan sesi virtual interaktif dengan format yang dapat dikustomisasi sepenuhnya.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/6281296870884?text=Halo%20Tim%20PENA%20Edukasi,%20saya%20dari%20instansi/kampus%20ingin%20konsultasi%20jadwal%20dan%20proposal%20kemitraan."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
            >
              <MessageCircle className="w-4 h-4" /> Hubungi Account Manager Edukasi (WhatsApp)
            </a>
            <Link
              href="/kontak"
              className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-all text-sm flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4" /> Form Permohonan Resmi
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}