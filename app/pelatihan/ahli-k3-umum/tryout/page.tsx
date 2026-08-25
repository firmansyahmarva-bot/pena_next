'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Award, Clock, CheckCircle2, AlertCircle, ArrowRight, Shield, RefreshCw, 
  ChevronLeft, ChevronRight, FileText, Check, X, HelpCircle, Phone
} from 'lucide-react';
import { getWaLink } from '@/lib/types';
import tryoutQuestionsData from '@/content/global/tryout_questions.json';

interface Question {
  id: number;
  category: string;
  question: string;
  options: Record<string, string>;
  correct_option: string;
  explanation: string;
}

export default function Ak3uTryoutPage() {
  const [started, setStarted] = useState(false);
  const [userData, setUserData] = useState({ name: '', phone: '', email: '', company: '' });
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  const [submitted, setSubmitted] = useState(false);

  // Initialize 50 randomized questions on start
  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    // Shuffle and pick 50 questions
    const shuffled = [...(tryoutQuestionsData as Question[])].sort(() => 0.5 - Math.random()).slice(0, 50);
    setActiveQuestions(shuffled);
    setCurrentIndex(0);
    setUserAnswers({});
    setTimeLeft(3600);
    setStarted(true);
    setSubmitted(false);
  };

  // Timer effect
  useEffect(() => {
    if (!started || submitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [started, submitted]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (questionId: number, optKey: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optKey }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    activeQuestions.forEach((q) => {
      if (userAnswers[q.id]?.toUpperCase() === q.correct_option?.toUpperCase()) {
        correctCount++;
      }
    });
    return {
      correctCount,
      total: activeQuestions.length,
      percentage: Math.round((correctCount / activeQuestions.length) * 100),
    };
  };

  const currentQ = activeQuestions[currentIndex];

  return (
    <div className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Breadcrumb */}
      <nav className="text-xs font-semibold text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-primary-700">Home</Link>
        <span>/</span>
        <Link href="/pelatihan/ahli-k3-umum" className="hover:text-primary-700">Ahli K3 Umum</Link>
        <span>/</span>
        <span className="text-slate-900">Simulasi Ujian AK3U 50 Soal</span>
      </nav>

      {/* Screen 1: Registration Form */}
      {!started ? (
        <div className="space-y-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold text-xs px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-xs">
              <Award className="w-4 h-4 text-emerald-700" /> 100% GRATIS &bull; 50 SOAL ACAK &bull; EVALUASI KOMPETENSI
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
              Simulasi Ujian Ahli K3 Umum Kemnaker RI 2026
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Uji kesiapan kompetensi Anda menghadapi ujian pembinaan sertifikasi Ahli K3 Umum (AK3U) resmi Kemnaker RI. 50 soal pilihan ganda acak dari bank soal regulasi UU 1/1970, kelembagaan P2K3, SMK3 PP 50/2012, K3 Listrik, Kebakaran, Kimia, &amp; Konstruksi.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
            {/* Registration Form (7 cols) */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
              <div className="space-y-1 border-b border-slate-100 pb-4">
                <h2 className="text-2xl font-black text-slate-900">Mulai Simulasi Ujian (50 Soal)</h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Isi data diri di bawah ini untuk memulai sesi simulasi. Hasil evaluasi kompetensi &amp; sertifikat nilai akan dikirim langsung via WhatsApp.
                </p>
              </div>

              <form onSubmit={handleStart} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nama Lengkap (Sesuai E-Sertifikat) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso, S.T."
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nomor WhatsApp <span className="text-red-500">*</span>
                    </label>
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
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Alamat Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="budi@perusahaan.com"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Perusahaan / Instansi / Universitas (Opsional)
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: PT Pertamina / Fresh Graduate"
                    value={userData.company}
                    onChange={(e) => setUserData({ ...userData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-primary-700 hover:from-emerald-700 hover:to-primary-800 text-white font-black text-sm py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>Mulai Ujian Sekarang (50 Soal)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Exam Rules (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-4">
                <h3 className="text-lg font-bold">Petunjuk &amp; Ketentuan Ujian:</h3>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Jumlah Soal:</strong> 50 soal pilihan ganda acak dari bank soal Kemnaker RI.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Durasi Waktu:</strong> 60 menit (Timer otomatis berjalan saat ujian dimulai).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Passing Grade:</strong> Nilai 70 (Minimal 35 jawaban benar dari 50 soal).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Evaluasi Instan:</strong> Kunci jawaban dan pembahasan detail akan ditampilkan di akhir.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : !submitted ? (
        /* Screen 2: Active 50-Question Exam Simulator */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Question Sheet (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              {/* Question Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <span className="bg-primary-50 text-primary-700 font-black text-xs px-3 py-1 rounded-md uppercase">
                  {currentQ.category || 'Regulasi K3'}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  Soal {currentIndex + 1} dari {activeQuestions.length}
                </span>
              </div>

              {/* Question Text */}
              <h2 className="text-base sm:text-xl font-bold text-slate-900 leading-relaxed">
                {currentQ.question}
              </h2>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {Object.entries(currentQ.options).map(([optKey, optText]) => {
                  const isSelected = userAnswers[currentQ.id]?.toUpperCase() === optKey.toUpperCase();
                  return (
                    <button
                      key={optKey}
                      type="button"
                      onClick={() => handleSelectOption(currentQ.id, optKey)}
                      className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'border-primary-600 bg-primary-50 text-primary-950 font-bold ring-2 ring-primary-500 shadow-xs'
                          : 'border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-md flex items-center justify-center font-black text-xs shrink-0 ${
                        isSelected ? 'bg-primary-700 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {optKey}
                      </span>
                      <span className="pt-0.5">{optText}</span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Nav Controls */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" /> Soal Sebelumnya
                </button>

                {currentIndex < activeQuestions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentIndex((prev) => Math.min(activeQuestions.length - 1, prev + 1))}
                    className="px-6 py-2.5 rounded-xl bg-primary-700 hover:bg-primary-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    Soal Berikutnya <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSubmitted(true)}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1.5 shadow-md"
                  >
                    Selesai &amp; Kirim Ujian <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar: Timer & 50-Question Palette (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-5">
              {/* Timer Box */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold">Sisa Waktu:</span>
                </div>
                <span className="text-xl font-black font-mono text-emerald-400">
                  {formatTime(timeLeft)}
                </span>
              </div>

              {/* Question Navigation Grid (1 to 50) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Lembar Jawaban ({Object.keys(userAnswers).length}/50)</span>
                </div>
                <div className="grid grid-cols-5 gap-2 max-h-72 overflow-y-auto p-1">
                  {activeQuestions.map((q, idx) => {
                    const isAnswered = !!userAnswers[q.id];
                    const isCurrent = currentIndex === idx;
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-9 rounded-lg text-xs font-black transition-all ${
                          isCurrent
                            ? 'bg-primary-700 text-white ring-2 ring-primary-500 shadow-md'
                            : isAnswered
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={() => setSubmitted(true)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Kirim Jawaban &amp; Lihat Nilai</span>
                <Check className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Screen 3: Detailed Evaluation & Explanation Results */
        <div className="space-y-10 max-w-4xl mx-auto">
          {/* Result Score Card */}
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-6 text-center">
            <div className={`w-28 h-28 rounded-full mx-auto flex items-center justify-center text-4xl font-black shadow-inner ${
              calculateScore().percentage >= 70 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {calculateScore().percentage}
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-900">
                {calculateScore().percentage >= 70 ? '🎉 Selamat, Anda Lulus Evaluasi!' : 'Evaluasi Kompetensi Selesai'}
              </h2>
              <p className="text-sm text-slate-600">
                Peserta: <strong>{userData.name}</strong> &bull; Benar: <strong>{calculateScore().correctCount}</strong> dari {calculateScore().total} Soal
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl text-left space-y-4 border border-slate-200">
              <span className="text-xs font-black uppercase text-primary-700 block tracking-wide">
                REKOMENDASI KELULUSAN RESMI KEMNAKER RI
              </span>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Hasil tryout ini menunjukkan kesiapan Anda menghadapi ujian komprehensif Ahli K3 Umum. Bergabunglah dengan batch pembinaan resmi PENA Consultant untuk memperoleh Surat Keputusan Penunjukan (SKP) dan Lisensi Resmi Kemnaker RI.
              </p>
              <a
                href={getWaLink(`Halo Admin PENA Consultant, saya telah menyelesaikan Simulasi Ujian AK3U (50 Soal) dengan skor ${calculateScore().percentage}/100 (${calculateScore().correctCount}/50 benar). Saya ingin mendaftar batch pembinaan resmi Ahli K3 Umum terdekat.`)}
                target="_blank"
                rel="noopener nofollow"
                className="w-full block text-center bg-gradient-to-r from-emerald-600 to-primary-700 hover:from-emerald-700 text-white font-extrabold py-4 rounded-xl text-sm shadow-lg transition-all"
              >
                💬 Konsultasi Pendaftaran Batch Resmi via WhatsApp →
              </a>
            </div>
          </div>

          {/* Detailed Question Review with Explanations */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-slate-900">Pembahasan Detail Kunci Jawaban (50 Soal)</h3>
            <div className="space-y-4">
              {activeQuestions.map((q, idx) => {
                const userAns = userAnswers[q.id]?.toUpperCase();
                const isCorrect = userAns === q.correct_option?.toUpperCase();
                return (
                  <div key={q.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-primary-700">Soal #{idx + 1} &bull; {q.category}</span>
                      <span className={`text-xs font-black px-2.5 py-1 rounded-md flex items-center gap-1 ${
                        isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {isCorrect ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                        {isCorrect ? 'Jawaban Benar' : 'Jawaban Salah'}
                      </span>
                    </div>

                    <p className="text-sm font-bold text-slate-900">{q.question}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {Object.entries(q.options).map(([k, v]) => (
                        <div
                          key={k}
                          className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                            k.toUpperCase() === q.correct_option?.toUpperCase()
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                              : k.toUpperCase() === userAns && !isCorrect
                              ? 'bg-red-50 border-red-300 text-red-950 font-semibold'
                              : 'bg-slate-50 border-slate-200 text-slate-600'
                          }`}
                        >
                          <span className="w-5 h-5 rounded bg-white font-bold flex items-center justify-center text-[10px] border shadow-2xs">
                            {k}
                          </span>
                          <span>{v}</span>
                        </div>
                      ))}
                    </div>

                    {q.explanation && (
                      <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-xl text-xs text-amber-950 leading-relaxed">
                        <strong>💡 Pembahasan:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}