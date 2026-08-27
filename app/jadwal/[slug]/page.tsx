import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Shield, MapPin, CheckCircle2, Clock } from 'lucide-react';
import { getBatches, getBatchBySlug, getProgramBySlug, getWaLink } from '@/lib/data';

export async function generateStaticParams() {
  return getBatches().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const batch = getBatchBySlug(slug);
  if (!batch) return {};
  const pageTitle = `Jadwal Pelatihan ${batch.offering_name} Batch ${batch.batch_number} (2026)`;
  const pageDesc = `Daftar batch ${batch.batch_number} pelatihan ${batch.offering_name} resmi Kemnaker RI / BNSP. Tanggal mulai ${batch.start_date || 'TBA 2026'}, metode ${batch.mode}, kuota terbatas.`;
  const pageUrl = `https://penaconsultant.com/jadwal/${slug}`;
  return {
    alternates: { canonical: pageUrl },
    title: pageTitle,
    description: pageDesc,
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: pageUrl,
      siteName: 'PENA Consultant',
      locale: 'id_ID',
      type: 'website',
      images: [{ url: 'https://penaconsultant.com/images/og-share-card.png', width: 1200, height: 630, alt: pageTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDesc,
      images: ['https://penaconsultant.com/images/og-share-card.png'],
    },
  };
}

export default async function BatchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const batch = getBatchBySlug(slug);
  if (!batch) notFound();

  const program = batch.offering_slug ? getProgramBySlug(batch.offering_slug) : null;

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <span className="text-xs font-bold uppercase text-primary-700 bg-primary-50 px-3 py-1 rounded-md inline-block">
          📅 DETAIL BATCH #{batch.batch_number}
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900">
          {batch.offering_name}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Tanggal Pelaksanaan:</span>
            <strong className="text-base text-slate-900">{batch.start_date}</strong>
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Metode Pelatihan:</span>
            <strong className="text-base text-slate-900">{batch.is_online ? '🌐 Online Interaktif' : `📍 ${batch.location_name}`}</strong>
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Biaya Investasi:</span>
            <strong className="text-base text-emerald-700">
              {batch.normal_price ? `Rp ${batch.normal_price.toLocaleString('id-ID')}` : 'Hubungi Admin'}
            </strong>
          </div>
        </div>

        <div className="pt-6">
          <a
            href={getWaLink(`Halo Admin PENA Consultant, saya ingin mendaftar ${batch.offering_name} Batch ${batch.batch_number} (Tanggal: ${batch.start_date}).`)}
            target="_blank"
            rel="noopener nofollow"
            className="w-full block text-center bg-gradient-to-r from-emerald-600 to-primary-700 hover:from-emerald-700 text-white font-black py-4 rounded-xl shadow-lg text-base transition-all"
          >
            💬 Daftar Batch Ini Sekarang via WhatsApp
          </a>
        </div>
      </div>

      {program && (
        <div className="text-center">
          <Link href={`/pelatihan/${program.slug}`} className="text-sm font-bold text-primary-700 hover:underline">
            ← Lihat Silabus &amp; Persyaratan Lengkap {program.name}
          </Link>
        </div>
      )}
    </div>
  );
}