import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Camera, Shield, Users, Award, MapPin } from 'lucide-react';
import { getPrograms } from '@/lib/data';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://penaconsultant.com/galeri',
  },
  title: 'Galeri Dokumentasi Pelatihan K3 — PENA Consultant',
  description: 'Dokumentasi foto dan video pelaksanaan pembinaan sertifikasi K3 resmi Kemnaker RI & BNSP di berbagai Tempat Uji Kompetensi (TUK) dan perusahaan mitra.',
};

export default function GaleriPage() {
  const images = Array.from({ length: 30 }, (_, i) => {
    const idx = String(i + 1).padStart(3, '0');
    return `/media/pelatihan-${idx}.webp`;
  });

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-3">
        <span className="text-xs font-bold uppercase text-primary-700 bg-primary-50 px-3 py-1 rounded-md inline-flex items-center gap-1.5">
          <Camera className="w-3.5 h-3.5" /> DOKUMENTASI PELATIHAN
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
          Galeri Kegiatan Pembinaan &amp; Praktik Lapangan K3
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          Dokumentasi riil sesi teori interaktif, simulasi pemadaman api (fire ground), pengukuran faktor lingkungan kerja, dan asesmen sertifikasi resmi Kemnaker RI &amp; BNSP.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((src, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group">
            <div className="aspect-video relative overflow-hidden bg-slate-900">
              <img
                src={src}
                alt={`Dokumentasi Pelatihan K3 PENA Consultant #${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="p-4 flex items-center justify-between text-xs text-slate-600">
              <span className="font-semibold text-slate-900">Pembinaan K3 Batch 2026</span>
              <span className="text-emerald-700 font-bold">✓ TUK Resmi</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}