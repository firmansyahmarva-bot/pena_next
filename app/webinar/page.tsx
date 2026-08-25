'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Video, Gift, CheckCircle2, Users, Calendar, ArrowRight, Shield, Award, 
  HelpCircle, MessageSquare, BookOpen, Clock, FileText, ChevronRight, Check
} from 'lucide-react';
import { getWaLink } from '@/lib/types';
import CorporateQuoteForm from '@/components/CorporateQuoteForm';

const UPCOMING_WEBINARS = [
  {
    category: 'Manajemen Risiko',
    title: 'Strategi Penyusunan HIRADC & Job Safety Analysis (JSA) Sesuai Standar Audit SMK3',
    speaker: 'Ir. H. Hendra Wijaya, S.T., M.KKK. (Lead Auditor SMK3)',
    date: 'Setiap Sabtu (Batch Bulanan)',
    target_offering_name: 'Ahli K3 Umum Kemnaker RI',
    target_offering_url: '/pelatihan/ahli-k3-umum',
  },
  {
    category: 'K3 Spesialis Kimia',
    title: 'Kepatuhan Pengendalian Bahan Kimia Berbahaya & Lembar Data Keselamatan (LDK/MSDS)',
    speaker: 'Drs. H. Mulyono, M.Kes. (Spesialis K3 Kimia)',
    date: 'Batch Terdekat (Online Zoom)',
    target_offering_name: 'Petugas & Ahli K3 Kimia',
    target_offering_url: '/pelatihan/ahli-k3-kimia',
  },
  {
    category: 'K3 Spesialis Listrik',
    title: 'Audit Keselamatan Instalasi Listrik & Kepatuhan PUIL 2011 di Fasilitas Industri',
    speaker: 'Ir. Bambang Suroso, M.T. (Praktisi PUIL & K3 Listrik)',
    date: 'Batch Terdekat (Online Zoom)',
    target_offering_name: 'Teknisi & Ahli K3 Listrik',
    target_offering_url: '/pelatihan/ahli-k3-listrik',
  },
  {
    category: 'K3 Konstruksi',
    title: 'Implementasi SMKK & Pengawasan Pekerjaan Kritis di Proyek Infrastruktur (Permen PUPR 10/2021)',
    speaker: 'Achmad Fauzi, S.T., IPM. (Ahli Utama K3 Konstruksi)',
    date: 'Batch Terdekat (Online Zoom)',
    target_offering_name: 'Ahli Muda K3 Konstruksi',
    target_offering_url: '/pelatihan/ahli-muda-k3-konstruksi',
  },
];

export default function WebinarGratisPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    topic: 'Strategi Penyusunan HIRADC & JSA',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo Admin PENA Consultant, saya ingin mendaftar Webinar K3 Gratis 2026:
- *Nama*: ${formData.name}
- *WhatsApp*: ${formData.phone}
- *Email*: ${formData.email}
- *Perusahaan*: ${formData.company || '-'}
- *Pilihan Topik*: ${formData.topic}

Mohon kirimkan link Zoom meeting dan konfirmasi pendaftaran saya. Terima kasih!`;
    window.open(getWaLink(text), '_blank');
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Breadcrumb */}
      <nav className="text-xs font-semibold text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-primary-700">Home</Link>
        <span>/</span>
        <span className="text-slate-900">Webinar K3 Gratis 2026</span>
      </nav>

      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 font-black text-xs px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-xs">
          <Gift className="w-4 h-4 text-emerald-700" /> 100% GRATIS &bull; E-CERTIFICATE &bull; ONLINE ZOOM
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
          Webinar K3 Gratis &amp; Workshop Online Interaktif 2026
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Tingkatkan kompetensi keselamatan kerja Anda bersama Lead Auditor &amp; Praktisi Senior PT PENA Consultant. Dapatkan wawasan regulasi Kemnaker RI, studi kasus kecelakaan kerja industri, dan E-Sertifikat kehadiran gratis.
        </p>
      </div>

      {/* 2-Col Lead Hunter Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="space-y-1 border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-black text-slate-900">Form Pendaftaran Peserta Webinar</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Daftarkan nama &amp; WhatsApp Anda untuk menerima link akses Zoom dan modul materi PDF gratis.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nama Lengkap (Sesuai E-Sertifikat) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Budi Pratama, S.T."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nomor WhatsApp Aktif <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 08123456789"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Alamat Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="budi@perusahaan.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Perusahaan / Instansi / Universitas
              </label>
              <input
                type="text"
                placeholder="Contoh: PT Pertamina / Fresh Graduate"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Pilihan Topik Webinar Prioritas <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-primary-500 focus:outline-none"
              >
                <option value="Strategi Penyusunan HIRADC & JSA">Strategi Penyusunan HIRADC &amp; Job Safety Analysis (JSA)</option>
                <option value="Audit & Implementasi SMK3 PP 50/2012">Audit &amp; Implementasi SMK3 PP 50/2012 &amp; ISO 45001:2018</option>
                <option value="K3 Spesialis Kimia & MSDS Pabrik">K3 Spesialis Kimia &amp; Pengendalian B3 (Kepmenaker 187/1999)</option>
                <option value="K3 Kelistrikan Industri & PUIL 2011">K3 Kelistrikan Industri &amp; Kepatuhan PUIL 2011</option>
                <option value="K3 Konstruksi & SMKK PUPR 10/2021">K3 Konstruksi &amp; SMKK PUPR 10/2021</option>
                <option value="K3 Ruang Terbatas (Confined Space)">K3 Ruang Terbatas (Confined Space Entry &amp; Rescue)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-primary-700 hover:from-emerald-700 hover:to-primary-800 text-white font-extrabold text-sm py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Daftar Webinar Sekarang (Notifikasi via WhatsApp)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Info Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-primary-950 to-slate-900 p-8 rounded-3xl text-white shadow-xl space-y-5">
            <span className="text-amber-400 font-extrabold text-xs uppercase tracking-wider block">
              FASILITAS PESERTA WEBINAR
            </span>
            <h3 className="text-xl font-bold">Benefit Mengikuti Webinar PENA Consultant</h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>E-Certificate Kehadiran:</strong> Diterbitkan gratis dengan nomor unik untuk CV Anda.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Materi Slide PDF:</strong> Rangkuman materi regulasi dan studi kasus industri.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Sesi Tanya Jawab Interaktif:</strong> Diskusi langsung dengan Lead Auditor K3.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Grup Komunitas K3:</strong> Update regulasi dan lowongan kerja HSE se-Indonesia.</span>
              </li>
            </ul>
          </div>

          {/* Tryout Simulator Callout Card */}
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-3xl space-y-3">
            <span className="text-[11px] font-black uppercase text-amber-800 tracking-wide block">
              🎯 SIMULASI UJIAN K3 ONLINE
            </span>
            <h4 className="text-base font-bold text-slate-900">Uji Pemahaman Regulasi K3 Anda</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sambil menunggu batch webinar, coba simulator 50 soal ujian Ahli K3 Umum Kemnaker RI secara gratis dengan kunci jawaban instan.
            </p>
            <Link
              href="/pelatihan/ahli-k3-umum/tryout"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 hover:text-amber-950 underline pt-1"
            >
              Mulai Ujian Simulator Sekarang →
            </Link>
          </div>
        </div>
      </div>

      {/* Upcoming Webinar Grid */}
      <section className="space-y-6 pt-6">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Jadwal &amp; Topik Webinar K3 Mendatang</h2>
          <p className="text-xs sm:text-sm text-slate-500">Materi pembelajaran dibawakan langsung oleh narasumber ahli &amp; praktisi bersertifikasi.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {UPCOMING_WEBINARS.map((w, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-primary-500 hover:shadow-md transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <span className="bg-primary-50 text-primary-700 font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-md inline-block">
                  {w.category}
                </span>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">{w.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  <strong>Narasumber:</strong> {w.speaker}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100">
                <Link
                  href={w.target_offering_url}
                  className="text-xs font-bold text-primary-700 hover:text-primary-900 flex items-center gap-1"
                >
                  Program: {w.target_offering_name} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table: Webinar vs Pembinaan Resmi */}
      <section className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-900">
            Perbandingan Webinar Publik vs Pembinaan Sertifikasi Resmi
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Pahami perbedaan antara webinar pengenalan dan program sertifikasi kompetensi resmi Kemnaker RI / BNSP.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-900 border-b border-slate-200">
                <th className="p-4 font-bold">Karakteristik</th>
                <th className="p-4 font-bold text-emerald-800 bg-emerald-50/60">Webinar K3 Publik (Gratis)</th>
                <th className="p-4 font-bold text-primary-800 bg-primary-50/60">Pembinaan Sertifikasi Resmi (Kemnaker / BNSP)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="p-4 font-semibold text-slate-900">Tujuan Utama</td>
                <td className="p-4 bg-emerald-50/30">Edukasi Publik, Pembaruan Informasi &amp; Overview K3</td>
                <td className="p-4 bg-primary-50/30 font-semibold text-primary-950">Penerbitan Lisensi Penunjukan SKP &amp; Sertifikat Kompetensi Sah</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-900">Durasi Sesi</td>
                <td className="p-4 bg-emerald-50/30">1,5 - 2 Jam (Online Zoom Interaktif)</td>
                <td className="p-4 bg-primary-50/30 font-semibold text-primary-950">12 - 17 Hari Kerja (Blended / Tatap Muka TUK)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-900">Fasilitas Dokumen</td>
                <td className="p-4 bg-emerald-50/30">E-Sertifikat Kehadiran &amp; Slide Presentasi PDF</td>
                <td className="p-4 bg-primary-50/30 font-semibold text-primary-950">Sertifikat Kemnaker RI, SKP, Kartu Lisensi, &amp; E-Badge TemanK3</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-900">Evaluasi Hasil</td>
                <td className="p-4 bg-emerald-50/30">Kuesioner Presensi Kehadiran Singkat</td>
                <td className="p-4 bg-primary-50/30 font-semibold text-primary-950">Ujian Evaluasi Kemnaker RI / Uji Asesmen Asesor BNSP</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900">Pertanyaan Umum (FAQ) Webinar K3</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900">1. Apakah webinar ini benar-benar 100% gratis?</h3>
            <p className="text-slate-600 leading-relaxed">
              Ya, seluruh sesi Zoom webinar publik PT PENA Consultant tidak dipungut biaya pendaftaran sama sekali (100% Gratis).
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900">2. Kapan tanggal pasti pelaksanaan sesi webinar?</h3>
            <p className="text-slate-600 leading-relaxed">
              Webinar dilaksanakan secara berkala setelah kuota 50 peserta per batch terpenuhi. Seluruh pendaftar akan menerima notifikasi H-2 via WhatsApp &amp; Email.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900">3. Apakah peserta memperoleh E-Sertifikat Kehadiran?</h3>
            <p className="text-slate-600 leading-relaxed">
              Ya, E-Sertifikat Kehadiran resmi diterbitkan secara gratis dalam format PDF bagi peserta yang mengikuti sesi hingga selesai dan mengisi form evaluasi presensi.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900">4. Apakah modul presentasi PDF dibagikan?</h3>
            <p className="text-slate-600 leading-relaxed">
              Ya, modul presentasi narasumber dan rangkuman materi regulasi K3 dibagikan gratis di grup komunitas WhatsApp peserta setelah acara berlangsung.
            </p>
          </div>
        </div>
      </section>

      {/* Corporate RFQ */}
      <CorporateQuoteForm defaultProgram="Webinar In-House K3 Korporat" />
    </div>
  );
}