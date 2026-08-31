import React from 'react';
import Link from 'next/link';
import { 
  Shield, Phone, Mail, MapPin, CheckCircle2, Award, Video, 
  HelpCircle, BookOpen, Building2, UserCheck, Layers, FileText, ArrowRight 
} from 'lucide-react';
import { getPrograms, getIndustries, getLocations, getWaLink } from '@/lib/data';

const CLUSTERS = [
  { name: 'Sertifikasi K3 Kemnaker & BNSP', href: '/panduan/sertifikasi-k3' },
  { name: 'K3 Teknis & Spesialis', href: '/panduan/k3-teknis' },
  { name: 'SMK3 (PP 50/2012 & ISO 45001)', href: '/panduan/smk3' },
  { name: 'Regulasi & Perundangan K3', href: '/panduan/regulasi-k3' },
  { name: 'Karier & Profesi HSE', href: '/panduan/karier-k3' },
];

const FLAGSHIP_PROGRAMS = [
  { name: 'Ahli K3 Umum Kemnaker RI', href: '/pelatihan/ahli-k3-umum' },
  { name: 'Ahli K3 Listrik & Teknisi', href: '/pelatihan/ahli-k3-listrik' },
  { name: 'Ahli & Petugas K3 Kimia', href: '/pelatihan/ahli-k3-kimia' },
  { name: 'Ahli Muda K3 Konstruksi', href: '/pelatihan/ahli-muda-k3-konstruksi' },
  { name: 'Petugas P3K di Tempat Kerja', href: '/pelatihan/petugas-p3k' },
  { name: 'Operator Crane Kelas 3', href: '/pelatihan/operator-crane-kelas-3' },
  { name: 'Operator Forklift Kelas 2', href: '/pelatihan/operator-forklift-kelas-2' },
  { name: 'Auditor SMK3 PP 50/2012', href: '/pelatihan/auditor-sistem-manajemen-k3' },
  { name: 'Lead Auditor ISO 45001:2018', href: '/pelatihan/lead-auditor-iso-45001-2018' },
  { name: 'Pengawas K3 Migas & Offshore', href: '/pelatihan/pengawas-k3-industri-migas' },
];

export default function Footer() {
  const industries = getIndustries();
  const locations = getLocations();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand & Accreditations Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-800 to-primary-950 flex items-center justify-center shadow-md">
                <img src="/logo.svg" alt="PENA Consultant" className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-lg font-black tracking-tight text-white">PENA</span>
                  <span className="text-lg font-extrabold text-primary-400">CONSULTANT</span>
                </div>
                <span className="text-[9px] text-slate-400 font-semibold tracking-wider uppercase block">
                  PJK3 Kemnaker RI &bull; TUK BNSP
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed">
              Lembaga Jasa Keselamatan dan Kesehatan Kerja (PJK3) resmi terakreditasi Kementerian Ketenagakerjaan RI dan Tempat Uji Kompetensi (TUK) berlisensi BNSP. Melayani public batch &amp; in-house training korporat di seluruh Indonesia.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <img src="/images/kemnaker-badge.svg" alt="Kemnaker RI" className="h-8 w-auto rounded" />
              <img src="/images/bnsp-badge.svg" alt="BNSP RI" className="h-8 w-auto rounded" />
            </div>

            {/* Quick Interactive Tool Badges */}
            <div className="pt-3 flex flex-wrap gap-2">
              <Link
                href="/webinar-gratis"
                className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/60 px-2.5 py-1 rounded-md transition-colors"
              >
                <Video className="w-3 h-3 text-emerald-400" />
                Webinar K3 Gratis
              </Link>
              <Link
                href="/pelatihan/ahli-k3-umum/tryout"
                className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-950/80 hover:bg-amber-900 text-amber-300 border border-amber-800/60 px-2.5 py-1 rounded-md transition-colors"
              >
                <Award className="w-3 h-3 text-amber-400" />
                Tryout AK3U 50 Soal
              </Link>
            </div>
          </div>

          {/* Column 2: Flagship Training Programs */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-wider text-amber-400 mb-4 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> Program Pelatihan Populer
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {FLAGSHIP_PROGRAMS.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="hover:text-emerald-400 transition-colors line-clamp-1">
                    &bull; {p.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/pelatihan" className="text-primary-400 font-bold hover:underline flex items-center gap-1">
                  Lihat Seluruh 70+ Program Pelatihan →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Topic Silos & Evidence Hubs */}
          <div className="space-y-6">
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" /> Klaster Panduan K3
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                {CLUSTERS.map((c) => (
                  <li key={c.href}>
                    <Link href={c.href} className="hover:text-emerald-400 transition-colors block">
                      &bull; {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" /> Profil &amp; Rekam Jejak
              </h4>
              <div className="flex flex-wrap gap-2 text-[11px]">
                <Link href="/instruktur" className="text-slate-400 hover:text-white underline">Instruktur K3</Link>
                <span className="text-slate-600">&bull;</span>
                <Link href="/mitra" className="text-slate-400 hover:text-white underline">Mitra Korporasi</Link>
                <span className="text-slate-600">&bull;</span>
                <Link href="/studi-kasus" className="text-slate-400 hover:text-white underline">Studi Kasus</Link>
                <span className="text-slate-600">&bull;</span>
                <Link href="/galeri" className="text-slate-400 hover:text-white underline">Dokumentasi Foto</Link>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & In-House RFQ */}
          <div>
            <h4 className="text-white font-black text-xs uppercase tracking-wider text-amber-400 mb-4 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" /> Layanan Konsultasi &amp; PJK3
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary-400 shrink-0 mt-0.5" />
                <span>Head Office: Yogyakarta &bull; TUK Regional: DKI Jakarta, Surabaya, Balikpapan, Medan, Batam.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary-400 shrink-0" />
                <span>Hotline: +62 812-9687-0884</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary-400 shrink-0" />
                <span>info@penaconsultant.com</span>
              </div>
            </div>
            <div className="mt-5">
              <a
                href={getWaLink('Halo Admin PENA Consultant, saya ingin konsultasi penawaran in-house training sertifikasi K3 untuk perusahaan kami.')}
                target="_blank"
                rel="noopener nofollow"
                className="block text-center bg-gradient-to-r from-emerald-600 to-primary-700 hover:from-emerald-700 text-white font-black text-xs py-3 px-4 rounded-xl shadow-lg transition-all"
              >
                💬 Minta Proposal / Jadwal In-House
              </a>
            </div>
          </div>
        </div>

        {/* Middle Section: Complete Crawl Depth Link Mesh (23 Cities & 15 Industries) */}
        <div className="space-y-6 pt-2 pb-8 border-b border-slate-800/80">
          {/* 23 City Branch Hubs */}
          <div className="space-y-2">
            <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-primary-400" /> Jaringan 23 Tempat Uji Kompetensi (TUK) &amp; Cabang Kota:
            </span>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {locations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/cabang/${loc.slug}`}
                  className="bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-emerald-300 px-2 py-1 rounded border border-slate-800 transition-colors"
                >
                  Pelatihan K3 {loc.name}
                </Link>
              ))}
            </div>
          </div>

          {/* 15 Industry Sectors */}
          <div className="space-y-2">
            <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-primary-400" /> 15 Sektor Industri Kepatuhan Keselamatan Kerja:
            </span>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {industries.map((ind) => (
                <Link
                  key={ind.slug}
                  href={`/industri/${ind.slug}`}
                  className="bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-emerald-300 px-2 py-1 rounded border border-slate-800 transition-colors"
                >
                  K3 {ind.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Legal & Utility Bar */}
        <div className="pt-2 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} PT PENA Consultant (Pusat Edukasi Nasional). All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/tentang" className="hover:text-slate-300">Tentang Kami</Link>
            <Link href="/panduan" className="hover:text-slate-300">Direktori Panduan</Link>
            <Link href="/jadwal" className="hover:text-slate-300">Jadwal 2026</Link>
            <Link href="/faq" className="hover:text-slate-300">FAQ</Link>
            <Link href="/kontak" className="hover:text-slate-300">Kontak</Link>
            <Link href="/kebijakan-privasi" className="hover:text-slate-300">Kebijakan Privasi</Link>
            <Link href="/rekan-pelatihan" className="hover:text-slate-300">Rekan Pelatihan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}