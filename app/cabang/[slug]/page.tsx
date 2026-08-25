import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';
import { getLocations, getLocationBySlug, getWaLink } from '@/lib/data';
import StructuredContent from '@/components/StructuredContent';

export async function generateStaticParams() {
  return getLocations().map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocationBySlug(slug);
  if (!loc) return {};
  return {
    title: `Pelatihan & Sertifikasi K3 di ${loc.name} — Jadwal & Biaya`,
    description: `Lembaga pelatihan K3 resmi Kemnaker RI & BNSP di ${loc.name}. Pendaftaran batch pembinaan reguler dan in-house training perusahaan.`,
  };
}

export default async function BranchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const loc = getLocationBySlug(slug);
  if (!loc) notFound();

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <span className="text-xs font-bold uppercase text-primary-700 bg-primary-50 px-3 py-1 rounded-md inline-block">
          📍 TEMPAT UJI KOMPETENSI
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900">
          Pelatihan &amp; Sertifikasi K3 di {loc.name}
        </h1>

        {loc.address && (
          <div className="p-4 bg-slate-50 rounded-lg text-sm text-slate-700 flex items-start gap-2.5">
            <MapPin className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900">Alamat TUK / Kantor Perwakilan:</strong>
              <span>{loc.address}</span>
            </div>
          </div>
        )}

        {loc.intro?.length > 0 && <StructuredContent blocks={loc.intro} />}

        <div className="pt-4">
          <a
            href={getWaLink(`Halo Admin PENA Consultant, saya ingin konsultasi pelatihan K3 untuk wilayah ${loc.name}.`)}
            target="_blank"
            rel="noopener nofollow"
            className="w-full block text-center bg-gradient-to-r from-emerald-600 to-primary-700 hover:from-emerald-700 text-white font-black py-4 rounded-xl shadow-lg text-base transition-all"
          >
            💬 Konsultasi Jadwal di {loc.name} via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}