'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Calendar, BookOpen, Building2, MapPin, Phone, Menu, X, ArrowRight } from 'lucide-react';
import { getWaLink } from '@/lib/types';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-sm">
      {/* Top Banner Bar */}
      <div className="bg-primary-950 text-slate-200 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Shield className="w-3.5 h-3.5" /> PJK3 Resmi Kemnaker RI &amp; TUK LSP BNSP
            </span>
            <span>·</span>
            <span>Jadwal Pelatihan Batch 2026 Telah Dibuka</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-300">Konsultasi Bebas Biaya:</span>
            <a 
              href={getWaLink('Halo Admin PENA Consultant, saya ingin konsultasi program K3.')}
              target="_blank"
              rel="noopener nofollow"
              className="text-amber-400 font-bold hover:underline flex items-center gap-1"
            >
              <Phone className="w-3 h-3" /> +62 812-9687-0884
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo with Image */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/logo.svg"
              alt="PENA Consultant Logo"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <Link href="/pelatihan" className="hover:text-primary-700 transition-colors flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-primary-600" />
              Program Pelatihan
            </Link>
            <Link href="/jadwal" className="hover:text-primary-700 transition-colors flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary-600" />
              Jadwal Batch
            </Link>
            <Link href="/panduan" className="hover:text-primary-700 transition-colors flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-primary-600" />
              Panduan K3
            </Link>
            <Link href="/industri" className="hover:text-primary-700 transition-colors flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-primary-600" />
              Sektor Industri
            </Link>
            <Link href="/cabang" className="hover:text-primary-700 transition-colors flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary-600" />
              Lokasi TUK
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={getWaLink('Halo Admin PENA Consultant, saya ingin konsultasi pelatihan K3.')}
              target="_blank"
              rel="noopener nofollow"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-primary-700 hover:from-emerald-700 hover:to-primary-800 text-white font-black text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <span>Konsultasi WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <Link
            href="/pelatihan"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-800 font-semibold hover:bg-primary-50 hover:text-primary-700"
          >
            <Shield className="w-5 h-5 text-primary-600" />
            Program Pelatihan (70+ Skema)
          </Link>
          <Link
            href="/jadwal"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-800 font-semibold hover:bg-primary-50 hover:text-primary-700"
          >
            <Calendar className="w-5 h-5 text-primary-600" />
            Jadwal Kalender Batch 2026
          </Link>
          <Link
            href="/panduan"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-800 font-semibold hover:bg-primary-50 hover:text-primary-700"
          >
            <BookOpen className="w-5 h-5 text-primary-600" />
            Panduan &amp; Regulasi K3 (320+ Artikel)
          </Link>
          <Link
            href="/industri"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-800 font-semibold hover:bg-primary-50 hover:text-primary-700"
          >
            <Building2 className="w-5 h-5 text-primary-600" />
            Solusi K3 per Industri
          </Link>
          <Link
            href="/cabang"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-800 font-semibold hover:bg-primary-50 hover:text-primary-700"
          >
            <MapPin className="w-5 h-5 text-primary-600" />
            Cabang &amp; Tempat Uji Kompetensi (TUK)
          </Link>
          <div className="pt-2">
            <a
              href={getWaLink('Halo Admin PENA Consultant, saya ingin konsultasi pelatihan K3.')}
              target="_blank"
              rel="noopener nofollow"
              className="w-full flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg shadow"
            >
              💬 Konsultasi via WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}