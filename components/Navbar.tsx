'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Menu, X, Phone, Calendar, BookOpen, Building2, MapPin, Award } from 'lucide-react';
import { getWaLink } from '@/lib/types';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Pelatihan K3', href: '/pelatihan', icon: Shield },
    { name: 'Ahli K3 Umum', href: '/pelatihan/ahli-k3-umum', icon: Award },
    { name: 'Jadwal Pelatihan', href: '/jadwal', icon: Calendar },
    { name: 'Panduan K3', href: '/panduan', icon: BookOpen },
    { name: 'Cabang & TUK', href: '/cabang', icon: MapPin },
    { name: 'Industri', href: '/industri', icon: Building2 },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo with Official Badges */}
          <Link href="/" className="flex items-center gap-3.5 group" aria-label="PENA Consultant Beranda">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-900 to-primary-950 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <img src="/logo.svg" alt="Logo Resmi PENA Consultant" width="28" height="28" className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900">PENA</span>
                <span className="text-xl font-extrabold text-primary-700">CONSULTANT</span>
              </div>
              <span className="text-[10px] text-slate-600 font-semibold tracking-wider uppercase block">
                PJK3 Kemnaker RI &bull; TUK BNSP
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navigasi Utama">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:text-primary-700 hover:bg-slate-100 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* WhatsApp CTA Action */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={getWaLink('Halo Admin PENA Consultant, saya ingin konsultasi pendaftaran pelatihan K3.')}
              target="_blank"
              rel="noopener nofollow"
              aria-label="Konsultasi Pendaftaran K3 via WhatsApp"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-primary-700 hover:from-emerald-700 hover:to-primary-800 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Daftar / Konsultasi</span>
            </a>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100"
              aria-label={isOpen ? 'Tutup Menu Navigasi' : 'Buka Menu Navigasi'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <nav className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2 shadow-xl" aria-label="Navigasi Seluler">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-slate-800 hover:bg-slate-50 hover:text-primary-700"
              >
                <Icon className="w-4 h-4 text-primary-600" />
                <span>{item.name}</span>
              </Link>
            );
          })}
          <div className="pt-4 border-t border-slate-100">
            <a
              href={getWaLink('Halo Admin PENA Consultant, saya ingin konsultasi pelatihan K3.')}
              target="_blank"
              rel="noopener nofollow"
              aria-label="Hubungi Konsultan via WhatsApp"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm py-3 rounded-xl shadow"
            >
              <Phone className="w-4 h-4" />
              <span>Hubungi Konsultan via WhatsApp</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
