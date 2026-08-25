import React from 'react';
import Link from 'next/link';
import { Shield, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { getPrograms, getIndustries, getLocations, getWaLink } from '@/lib/data';

export default function Footer() {
  const topPrograms = getPrograms().slice(0, 6);
  const industries = getIndustries().slice(0, 5);
  const locations = getLocations().slice(0, 6);

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.svg"
                alt="PENA Consultant Logo"
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Lembaga Pembinaan &amp; Sertifikasi K3 resmi terakreditasi Kemnaker RI dan berlisensi BNSP. Melayani public batch &amp; in-house training di seluruh Indonesia.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <img src="/images/kemnaker-badge.svg" alt="Kemnaker RI" className="h-9 w-auto rounded" />
              <img src="/images/bnsp-badge.svg" alt="BNSP RI" className="h-9 w-auto rounded" />
            </div>
          </div>

          {/* Program Populer */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 tracking-wide uppercase text-xs text-amber-400">
              Program Populer
            </h4>
            <ul className="space-y-2.5 text-sm">
              {topPrograms.map((p) => (
                <li key={p.slug}>
                  <Link href={`/pelatihan/${p.slug}`} className="hover:text-emerald-400 transition-colors line-clamp-1">
                    {p.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link href="/pelatihan" className="text-xs text-primary-400 font-bold hover:underline">
                  Lihat Seluruh 70+ Program →
                </Link>
              </li>
            </ul>
          </div>

          {/* Sektor & Cabang */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 tracking-wide uppercase text-xs text-amber-400">
              Sektor &amp; Lokasi TUK
            </h4>
            <div className="space-y-4">
              <div>
                <span className="text-xs text-slate-500 font-bold uppercase block mb-1.5">Sektor Industri</span>
                <div className="flex flex-wrap gap-1.5">
                  {industries.map((ind) => (
                    <Link
                      key={ind.slug}
                      href={`/industri/${ind.slug}`}
                      className="text-xs bg-slate-900 hover:bg-primary-900/50 hover:text-emerald-300 text-slate-400 px-2 py-1 rounded border border-slate-800 transition-colors"
                    >
                      {ind.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-xs text-slate-500 font-bold uppercase block mb-1.5">Kota Cabang</span>
                <div className="flex flex-wrap gap-1.5">
                  {locations.map((loc) => (
                    <Link
                      key={loc.slug}
                      href={`/cabang/${loc.slug}`}
                      className="text-xs bg-slate-900 hover:bg-primary-900/50 hover:text-emerald-300 text-slate-400 px-2 py-1 rounded border border-slate-800 transition-colors"
                    >
                      {loc.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Kontak & Konsultasi */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 tracking-wide uppercase text-xs text-amber-400">
              Kontak &amp; Konsultasi
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary-400 shrink-0 mt-1" />
                <span>Yogyakarta, DKI Jakarta, Surabaya, Balikpapan &amp; In-House Seluruh Indonesia</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary-400 shrink-0" />
                <span>+62 812-9687-0884</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary-400 shrink-0" />
                <span>info@penaconsultant.co.id</span>
              </div>
            </div>
            <div className="mt-5">
              <a
                href={getWaLink('Halo Admin PENA Consultant, saya ingin konsultasi penawaran in-house training K3.')}
                target="_blank"
                rel="noopener nofollow"
                className="block text-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs py-2.5 px-4 rounded-lg shadow transition-all"
              >
                Minta Proposal In-House Training
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PENA Consultant (Pusat Edukasi Nasional). All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/panduan" className="hover:text-slate-400">Direktori Panduan</Link>
            <Link href="/jadwal" className="hover:text-slate-400">Jadwal Pelatihan</Link>
            <Link href="/kontak" className="hover:text-slate-400">Kontak</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}