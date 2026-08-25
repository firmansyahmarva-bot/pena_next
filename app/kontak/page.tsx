import React from 'react';
import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Shield } from 'lucide-react';
import { getWaLink } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Kontak & Layanan Konsultasi K3 — PENA Consultant',
  description: 'Hubungi tim konsultan K3 PENA Consultant untuk pendaftaran pelatihan, permintaan proposal in-house training, dan konsultasi kepatuhan SMK3.',
};

export default function KontakPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase font-bold tracking-widest text-primary-700 block mb-2">
          HUBUNGI KAMI
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900">
          Konsultasi Kebutuhan K3 Anda
        </h1>
        <p className="text-slate-600 mt-3">
          Tim spesialis kami siap membantu pemilihan skema sertifikasi Kemnaker RI &amp; BNSP yang tepat.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Kantor &amp; Kontak Resmi</h2>
          <div className="space-y-4 text-sm text-slate-700">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
              <div>
                <strong>Pusat Pelatihan (TUK):</strong>
                <p>Yogyakarta, DKI Jakarta, Surabaya, Balikpapan</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary-600 shrink-0" />
              <div>
                <strong>WhatsApp / Telepon:</strong>
                <p>+62 812-9687-0884</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary-600 shrink-0" />
              <div>
                <strong>Email Informasi:</strong>
                <p>info@penaconsultant.co.id</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary-950 p-8 rounded-2xl text-white flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">RESPON CEPAT</span>
            <h2 className="text-2xl font-bold">Chat Langsung dengan Konsultan K3</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Dapatkan informasi jadwal batch 2026, rincian biaya, formulir pendaftaran, dan proposal resmi dalam hitungan menit.
            </p>
          </div>
          <a
            href={getWaLink('Halo Admin PENA Consultant, saya ingin konsultasi kebutuhan pelatihan K3.')}
            target="_blank"
            rel="noopener nofollow"
            className="w-full text-center bg-gradient-to-r from-emerald-500 to-primary-600 hover:from-emerald-600 text-white font-black py-4 rounded-xl shadow-lg transition-all"
          >
            💬 Chat via WhatsApp Sekarang
          </a>
        </div>
      </div>
    </div>
  );
}