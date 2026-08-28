import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ShieldCheck, MapPin, ArrowRight, Laptop, Building2, Clock, Users, CheckCircle2 } from 'lucide-react';
import { getBatches, getWaLink } from '@/lib/data';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://penaconsultant.com/jadwal',
  },
  title: 'Jadwal Pelatihan & Sertifikasi K3 Terbaru 2026 | PENA Consultant',
  description: 'Jadwal resmi pembinaan sertifikasi K3 Kemnaker RI & BNSP batch 2026. Kelas Public Online Zoom dan Onsite TUK di 23 kota seluruh Indonesia.',
  openGraph: {
    title: 'Jadwal Pelatihan & Sertifikasi K3 Terbaru 2026 | PENA Consultant',
    description: 'Jadwal resmi pembinaan sertifikasi K3 Kemnaker RI & BNSP batch 2026. Kelas Public Online Zoom dan Onsite TUK di 23 kota seluruh Indonesia.',
    url: 'https://penaconsultant.com/jadwal',
    siteName: 'PENA Consultant',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: 'https://penaconsultant.com/images/og-share-card.png', width: 1200, height: 630, alt: 'Jadwal Pelatihan K3 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jadwal Pelatihan & Sertifikasi K3 Terbaru 2026 | PENA Consultant',
    description: 'Jadwal resmi pembinaan sertifikasi K3 Kemnaker RI & BNSP batch 2026. Kelas Public Online Zoom dan Onsite TUK di 23 kota seluruh Indonesia.',
    images: ['https://penaconsultant.com/images/og-share-card.png'],
  },
};

export default function JadwalHubPage() {
  const batches = getBatches();
  const breadcrumbs = [
    { name: 'Home', url: 'https://penaconsultant.com' },
    { name: 'Jadwal Pelatihan K3', url: 'https://penaconsultant.com/jadwal' },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-4 h-4" /> KALENDER BATCH RESMI TAHUN 2026
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Jadwal Pelatihan &amp; Sertifikasi K3 Terdekat
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Temukan jadwal batch pembinaan resmi Kementerian Ketenagakerjaan RI dan uji kompetensi BNSP. Tersedia kelas Online interaktif Zoom Pro dan Onsite di 23 kota Tempat Uji Kompetensi (TUK).
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 text-left">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-2xl font-black text-blue-600 block">{batches.length}+</span>
              <span className="text-xs font-medium text-slate-600">Batch Terjadwal</span>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-2xl font-black text-emerald-600 block">Kemnaker &amp; BNSP</span>
              <span className="text-xs font-medium text-slate-600">Sertifikasi Resmi</span>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-2xl font-black text-amber-600 block">Online &amp; Onsite</span>
              <span className="text-xs font-medium text-slate-600">Metode Fleksibel</span>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-2xl font-black text-purple-600 block">Terverifikasi</span>
              <span className="text-xs font-medium text-slate-600">Barcode TemanK3</span>
            </div>
          </div>
        </div>

        {/* Table Schedule */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-100/80 text-slate-900 uppercase text-xs font-bold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Program Pelatihan &amp; Batch</th>
                <th className="px-6 py-4">Lisensi</th>
                <th className="px-6 py-4">Tanggal Batch</th>
                <th className="px-6 py-4">Metode Pelaksanaan</th>
                <th className="px-6 py-4">Biaya Investasi</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Pendaftaran</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {batches.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/jadwal/${b.slug}`} className="font-bold text-slate-900 hover:text-blue-600 block">
                      {b.offering_name}
                    </Link>
                    <span className="text-[11px] font-semibold text-slate-400">Batch #{b.batch_number}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 font-semibold text-xs text-blue-900 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                      {b.certification_body === 'kemnaker' ? 'Kemnaker RI' : 'BNSP RI'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    <span className="flex items-center gap-1 text-xs sm:text-sm">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> {b.start_date}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      {b.is_online ? <Laptop className="w-3.5 h-3.5 text-blue-600" /> : <Building2 className="w-3.5 h-3.5 text-slate-500" />}
                      {b.is_online ? 'Online Zoom' : `Onsite ${b.location_name}`}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {b.promo_price ? (
                      <div>
                        <span className="font-black text-emerald-700 block text-xs sm:text-sm">
                          Rp {b.promo_price.toLocaleString('id-ID')}
                        </span>
                        <span className="text-[10px] text-slate-400 line-through">
                          Rp {b.normal_price?.toLocaleString('id-ID')}
                        </span>
                      </div>
                    ) : (
                      <span className="font-black text-slate-900 text-xs sm:text-sm">
                        {b.normal_price ? `Rp ${b.normal_price.toLocaleString('id-ID')}` : 'Hubungi Admin'}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {b.availability === 'available' ? 'Tersedia' : 'Sisa 3 Kursi'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link
                      href={`/jadwal/${b.slug}`}
                      className="inline-flex items-center justify-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors shadow-2xs"
                    >
                      Detail &amp; Daftar <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}