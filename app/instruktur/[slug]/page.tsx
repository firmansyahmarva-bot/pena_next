import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { UserCheck, Award, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import instructorsData from '@/content/global/instructors.json';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import StructuredContent from '@/components/StructuredContent';
import { getWaLink } from '@/lib/types';

export async function generateStaticParams() {
  const instructors = instructorsData as any[];
  return instructors.map((inst) => ({ slug: inst.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const inst = (instructorsData as any[]).find((i) => i.slug === slug);
  if (!inst) return {};
  return {
    title: `Profil ${inst.name} — Instruktur K3 PENA Consultant`,
    description: `Profil profesional ${inst.name}, instruktur dan praktisi keselamatan kerja senior di PT PENA Consultant.`,
  };
}

export default async function InstrukturSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const inst = (instructorsData as any[]).find((i) => i.slug === slug);
  if (!inst) notFound();

  const breadcrumbs = [
    { name: 'Home', url: 'https://penaconsultant.com' },
    { name: 'Instruktur K3', url: 'https://penaconsultant.com/instruktur' },
    { name: inst.name, url: `https://penaconsultant.com/instruktur/${inst.slug}` },
  ];

  const bioBlocks = inst.bio?.blocks || (Array.isArray(inst.bio) ? inst.bio : null);
  const credBlocks = inst.credentials?.blocks || (Array.isArray(inst.credentials) ? inst.credentials : null);

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <nav className="text-xs font-semibold text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-primary-700">Home</Link>
          <span>/</span>
          <Link href="/instruktur" className="hover:text-primary-700">Instruktur K3</Link>
          <span>/</span>
          <span className="text-slate-900">{inst.name}</span>
        </nav>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-slate-100">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-800 to-primary-950 text-white font-black text-2xl flex items-center justify-center shadow-lg shrink-0">
              {inst.name.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
            </div>
            <div className="space-y-1">
              <span className="bg-emerald-100 text-emerald-900 font-extrabold text-[11px] px-2.5 py-1 rounded-md inline-block">
                ✓ Instruktur Terakreditasi
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900">{inst.name}</h1>
              <p className="text-sm font-semibold text-primary-700">Instruktur Senior &amp; Asesor Kompetensi K3</p>
            </div>
          </div>

          {credBlocks && (
            <div className="space-y-3">
              <h2 className="text-base font-bold text-slate-900">Kredensial &amp; Sertifikasi</h2>
              <StructuredContent blocks={credBlocks} />
            </div>
          )}

          {bioBlocks && (
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-base font-bold text-slate-900">Biografi &amp; Pengalaman Kerja</h2>
              <StructuredContent blocks={bioBlocks} />
            </div>
          )}

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500 font-medium">Ingin mengundang narasumber ini untuk In-House Training perusahaan Anda?</span>
            <a
              href={getWaLink(`Halo Admin PENA Consultant, saya ingin konsultasi in-house training bersama instruktur ${inst.name}.`)}
              target="_blank"
              rel="noopener nofollow"
              className="bg-primary-700 hover:bg-primary-800 text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow transition-all shrink-0"
            >
              Request In-House Training →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}