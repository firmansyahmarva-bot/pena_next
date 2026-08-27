import React from 'react';
import type { Metadata } from 'next';
import { getFaqs, getWaLink } from '@/lib/data';
import { HelpCircle } from 'lucide-react';
import { FaqJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://penaconsultant.com/faq',
  },
  title: 'Tanya Jawab (FAQ) Pelatihan & Sertifikasi K3 — PENA Consultant',
  description: 'Jawaban atas pertanyaan umum seputar syarat pendaftaran Ahli K3, keaslian sertifikat Kemnaker/BNSP, metode online vs offline, dan in-house training.',
  openGraph: {
    title: 'Tanya Jawab (FAQ) Pelatihan & Sertifikasi K3 — PENA Consultant',
    description: 'Jawaban atas pertanyaan umum seputar syarat pendaftaran Ahli K3, keaslian sertifikat Kemnaker/BNSP, metode online vs offline, dan in-house training.',
    url: 'https://penaconsultant.com/faq',
    siteName: 'PENA Consultant',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: 'https://penaconsultant.com/images/og-share-card.png', width: 1200, height: 630, alt: 'Tanya Jawab (FAQ) Pelatihan & Sertifikasi K3 — PENA Consultant' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tanya Jawab (FAQ) Pelatihan & Sertifikasi K3 — PENA Consultant',
    description: 'Jawaban atas pertanyaan umum seputar syarat pendaftaran Ahli K3, keaslian sertifikat Kemnaker/BNSP, metode online vs offline, dan in-house training.',
    images: ['https://penaconsultant.com/images/og-share-card.png'],
  },
};

function extractAnswerText(ans: any): string {
  if (typeof ans === 'string') return ans;
  if (ans && typeof ans === 'object') {
    if (Array.isArray(ans.blocks)) {
      return ans.blocks.map((b: any) => b.data?.text || b.text || '').filter(Boolean).join(' ');
    }
    if (Array.isArray(ans)) {
      return ans.map((b: any) => b.text || '').filter(Boolean).join(' ');
    }
  }
  return 'Silakan hubungi konsultan kami untuk informasi lebih lanjut.';
}

export default function FaqPage() {
  const rawFaqs = getFaqs();

  const formattedFaqs = rawFaqs.slice(0, 20).map((f: any) => ({
    question: f.question,
    answer: extractAnswerText(f.answer),
  }));

  return (
    <>
      <FaqJsonLd faqs={formattedFaqs} />

      <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-primary-700 block mb-2 flex items-center justify-center gap-1.5">
            <HelpCircle className="w-4 h-4" /> FAQ CENTER
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900">
            Pertanyaan yang Sering Diajukan
          </h1>
          <p className="text-slate-600 mt-3">
            Temukan jawaban cepat seputar pembinaan sertifikasi K3, biaya, dan legalitas sertifikat.
          </p>
        </div>

        <div className="space-y-4">
          {formattedFaqs.map((f: any, idx: number) => (
            <details key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm group">
              <summary className="font-bold text-slate-900 cursor-pointer list-none flex justify-between items-center group-hover:text-primary-700">
                <span>{f.question}</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-3 pt-3 border-t border-slate-100 text-sm text-slate-600 leading-relaxed">
                {f.answer}
              </div>
            </details>
          ))}
        </div>

        <div className="p-8 bg-slate-100 rounded-2xl text-center space-y-3">
          <h3 className="text-lg font-bold text-slate-900">Punya Pertanyaan Lain?</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Konsultasikan langsung dengan Customer Service kami untuk informasi lengkap jadwal, biaya &amp; proposal.
          </p>
          <a
            href={getWaLink('Halo Admin PENA Consultant, saya ingin menanyakan perihal pelatihan K3.')}
            target="_blank"
            rel="noopener nofollow"
            className="inline-block bg-primary-700 hover:bg-primary-800 text-white font-bold text-xs px-6 py-3 rounded-lg shadow"
          >
            💬 Tanya via WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}