'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Award, Clock, CheckCircle2, AlertCircle, ArrowRight, Shield, RefreshCw } from 'lucide-react';
import { getWaLink } from '@/lib/types';

const SAMPLE_QUESTIONS = [
  {
    id: 1,
    question: 'Berdasarkan Undang-Undang No. 1 Tahun 1970, pengawasan K3 di tempat kerja dilakukan oleh:',
    options: [
      'Pegawai Pengawas Ketenagakerjaan dan Ahli K3',
      'Satuan Polisi Pamong Praja (Satpol PP)',
      'Manajer HRD Perusahaan Saja',
      'Dinas Pemadam Kebakaran Saja',
    ],
    answerIndex: 0,
    explanation: 'Sesuai Pasal 5 UU No. 1 Tahun 1970, pengawasan ditaatinya undang-undang ini dilakukan oleh Pegawai Pengawas dan Ahli Keselamatan Kerja yang ditunjuk resmi oleh Menteri Ketenagakerjaan.',
  },
  {
    id: 2,
    question: 'Dasar hukum kewajiban pembentukan Panitia Pembina Keselamatan dan Kesehatan Kerja (P2K3) di tempat kerja adalah:',
    options: [
      'Permenaker No. 04/MEN/1987',
      'Permenaker No. 05/MEN/2018',
      'PP No. 50 Tahun 2012',
      'UU No. 13 Tahun 2003',
    ],
    answerIndex: 0,
    explanation: 'Permenaker No. 04/MEN/1987 mengatur tata cara pembentukan dan susunan Panitia Pembina Keselamatan dan Kesehatan Kerja (P2K3) serta penunjukan Ahli Keselamatan Kerja sebagai Sekretaris P2K3.',
  },
  {
    id: 3,
    question: 'Sesuai PP No. 50 Tahun 2012, perusahaan wajib menerapkan Sistem Manajemen K3 (SMK3) apabila mempekerjakan pekerja sekurang-kurangnya:',
    options: [
      '100 orang tenaga kerja atau memiliki potensi bahaya tinggi',
      '50 orang tenaga kerja tanpa memandang risiko',
      '200 orang tenaga kerja saja',
      '500 orang tenaga kerja untuk semua industri',
    ],
    answerIndex: 0,
    explanation: 'Pasal 5 ayat (2) PP No. 50 Tahun 2012 mewajibkan penerapan SMK3 bagi perusahaan yang mempekerjakan pekerja/buruh paling sedikit 100 (seratus) orang atau mempunyai tingkat potensi bahaya tinggi.',
  },
  {
    id: 4,
    question: 'Dalam hierarki pengendalian risiko K3 (Hierarchy of Controls), metode pengendalian yang paling efektif berada pada tingkat:',
    options: [
      'Eliminasi (Elimination)',
      'Substitusi (Substitution)',
      'Rekayasa Teknik (Engineering Control)',
      'Alat Pelindung Diri (APD/PPE)',
    ],
    answerIndex: 0,
    explanation: 'Eliminasi adalah langkah pertama dan paling efektif karena menghilangkan sumber bahaya sepenuhnya dari tempat kerja sebelum mengandalkan pengendalian substitusi, rekayasa, administratif, atau APD.',
  },
  {
    id: 5,
    question: 'Berapa masa berlaku Surat Keputusan Penunjukan (SKP) Ahli K3 Umum yang diterbitkan oleh Kemnaker RI?',
    options: [
      '3 (Tiga) Tahun dan dapat diperpanjang',
      '1 (Satu) Tahun',
      '5 (Lima) Tahun',
      'Seumur Hidup',
    ],
    answerIndex: 0,
    explanation: 'SKP Ahli K3 Umum berlaku selama 3 (tiga) tahun sesuai Permenaker No. 02/MEN/1992 dan wajib diperpanjang sebelum masa berlakunya habis dengan rekomendasi dari perusahaan tempat bekerja.',
  },
];

export default function Ak3uTryoutPage() {
  const [started, setStarted] = useState(false);
  const [userData, setUserData] = useState({ name: '', phone: '', email: '', company: '' });
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    setStarted(true);
  };

  const handleSelectAnswer = (qIdx: number, optIdx: number) => {
    const updated = [...userAnswers];
    updated[qIdx] = optIdx;
    setUserAnswers(updated);
  };

  const calculateScore = () => {
    let score = 0;
    SAMPLE_QUESTIONS.forEach((q, idx) => {
      if (userAnswers[idx] === q.answerIndex) score += 20; // 5 questions * 20 = 100
    });
    return score;
  };

  return (
    <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Breadcrumb */}
      <nav className="text-xs font-semibold text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-primary-700">Home</Link>
        <span>/</span>
        <Link href="/pelatihan/ahli-k3-umum" className="hover:text-primary-700">Ahli K3 Umum</Link>
        <span>/</span>
        <span className="text-slate-900">Tryout &amp; Simulasi Ujian AK3U</span>
      </nav>

      {/* Hero */}
      <div className="text-center space-y-3">
        <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold text-xs px-3 py-1 rounded-full inline-block">
          100% GRATIS &bull; SIMULASI UJIAN ONLINE AK3U
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          Simulasi Ujian Ahli K3 Umum Kemnaker RI 2026
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          Uji pemahaman Anda seputar regulasi UU 1/1970, kelembagaan P2K3, SMK3 PP 50/2012, dan hierarki pengendalian bahaya kerja.
        </p>
      </div>

      {!started ? (
        <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-slate-900">Daftar &amp; Mulai Simulasi Ujian</h2>
            <p className="text-xs text-slate-500">
              Isi data diri untuk memulai sesi tryout dan menerima pembahasan kunci jawaban.
            </p>
          </div>

          <form onSubmit={handleStart} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap <span className="text-red-500">*</span></label>
              <input
                type="text"
                required
                placeholder="Contoh: Andi Pratama, S.T."
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nomor WhatsApp <span className="text-red-500">*</span></label>
              <input
                type="tel"
                required
                placeholder="081234567890"
                value={userData.phone}
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                required
                placeholder="andi@perusahaan.com"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary-700 hover:bg-primary-800 text-white font-extrabold py-3.5 rounded-xl text-sm transition-all shadow-md"
            >
              Mulai Ujian Sekarang →
            </button>
          </form>
        </div>
      ) : !submitted ? (
        <div className="space-y-6">
          <div className="bg-primary-900 text-white p-4 rounded-2xl flex items-center justify-between">
            <span className="text-xs font-bold">Peserta: {userData.name}</span>
            <span className="text-xs bg-white/20 px-3 py-1 rounded-md font-semibold">Total: 5 Soal</span>
          </div>

          <div className="space-y-6">
            {SAMPLE_QUESTIONS.map((q, qIdx) => (
              <div key={q.id} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <span className="text-xs font-bold text-primary-700 uppercase">Soal #{qIdx + 1}</span>
                <p className="text-sm sm:text-base font-bold text-slate-900">{q.question}</p>
                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectAnswer(qIdx, optIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                        userAnswers[qIdx] === optIdx
                          ? 'border-primary-600 bg-primary-50 text-primary-950 font-bold ring-2 ring-primary-500'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}. {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm px-8 py-4 rounded-xl shadow-lg transition-all"
            >
              Kirim Jawaban &amp; Lihat Hasil Nilai →
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-8 text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-3xl font-black shadow-inner">
            {calculateScore()}
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Hasil Evaluasi Tryout AK3U</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {calculateScore() >= 80 ? '🎉 Selamat! Pemahaman dasar K3 Anda sangat baik.' : 'Terus tingkatkan pemahaman regulasi K3 Anda.'}
            </p>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl text-left space-y-4 border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900">Rekomendasi Langkah Berikutnya:</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dapatkan sertifikasi resmi dan Surat Keputusan Penunjukan (SKP) Ahli K3 Umum Kemnaker RI dengan bergabung pada batch pembinaan terbaru PENA Consultant.
            </p>
            <a
              href={getWaLink(`Halo Admin PENA Consultant, saya telah menyelesaikan Simulasi Ujian AK3U dengan skor ${calculateScore()}/100 dan ingin berkonsultasi mengenai pendaftaran batch resmi.`)}
              target="_blank"
              rel="noopener nofollow"
              className="w-full block text-center bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl text-xs shadow-md transition-all"
            >
              💬 Konsultasi Pendaftaran Batch AK3U via WhatsApp →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}