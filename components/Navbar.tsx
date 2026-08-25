'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Menu, X, Phone, Calendar, BookOpen, Building2, MapPin, Video, HelpCircle } from 'lucide-react';
import { getWaLink } from '@/lib/types';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Pelatihan K3', href: '/pelatihan', icon: Shield },
    { name: 'Webinar Online', href: '/webinar', icon: Video },
    { name: 'Jadwal 2026', href: '/jadwal', icon: Calendar },
    { name: 'Panduan K3', href: '/panduan', icon: BookOpen },
    { name: 'Cabang & TUK', href: '/cabang', icon: MapPin },
    { name: 'Sektor Industri', href: '/industri', icon: Building2 },
    { name: 'FAQ', href: '/faq', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo with Official Badges */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-900 to-primary-950 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <img src="/logo.svg" alt="PENA Consultant" className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900">PENA</span>
                <span className="text-xl font-extrabold text-primary-700">CONSULTANT</span>
              </div>
              <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase block">
                PJK3 Kemnaker RI &bull; TUK BNSP
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:text-primary-700 hover:bg-slate-50 transition-colors"
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
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-primary-700 hover:from-emerald-700 hover:to-primary-800 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Daftar / Konsultasi</span>
            </a>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2 shadow-xl">
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
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm py-3 rounded-xl shadow"
            >
              <Phone className="w-4 h-4" />
              <span>Hubungi Konsultan via WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}