import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Shield, MapPin, ArrowRight } from 'lucide-react';
import { getBatches, getWaLink } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Jadwal Pelatihan & Sertifikasi K3 Batch 2026 — PENA Consultant',
  description: 'Kalender jadwal pembinaan K3 resmi Kemnaker RI & BNSP tahun 2026: Ahli K3 Umum, K3 Listrik, Konstruksi, Damkar, Ruang Terbatas, Forklift & Crane.',
};

export default function JadwalHubPage() {
  const batches = getBatches();

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="max-w-3xl">
        <span className="text-xs uppercase font-bold tracking-widest text-primary-700 block mb-2 flex items-center gap-1.5">
          <Calendar className="w-4 h-4" /> KALENDER BATCH 2026
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Jadwal Pelatihan &amp; Sertifikasi K3
        </h1>
        <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed">
          Temukan jadwal batch pembinaan K3 Kemnaker RI dan uji kompetensi BNSP terdekat. Tersedia kelas Online interaktif dan On-site di berbagai kota.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
        <table className="w-full text-left text-sm text-slate-700">
          <thead className="bg-slate-100 text-slate-900 uppercase text-xs font-bold border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Program Pelatihan</th>
              <th className="px-6 py-4">Sertifikasi</th>
              <th className="px-6 py-4">Tanggal Batch</th>
              <th className="px-6 py-4">Metode</th>
              <th className="px-6 py-4">Biaya Investasi</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {batches.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900">
                  <Link href={`/jadwal/${b.slug}`} className="hover:text-primary-700">
                    {b.offering_name}
                  </Link>
                </td>
                <td className="px-6 py-4 font-semibold text-emerald-800">
                  {b.certification_body === 'kemnaker' ? 'Kemnaker RI' : 'BNSP RI'}
                </td>
                <td className="px-6 py-4 font-medium">
                  {b.start_date}
                </td>
                <td className="px-6 py-4">
                  {b.is_online ? '🌐 Online' : `📍 ${b.location_name}`}
                </td>
                <td className="px-6 py-4 font-black text-slate-900">
                  {b.normal_price ? `Rp ${b.normal_price.toLocaleString('id-ID')}` : 'Hubungi Admin'}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-block px-2.5 py-1 rounded text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {b.availability === 'available' ? 'Tersedia' : 'Terbatas'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/jadwal/${b.slug}`}
                    className="inline-flex items-center text-xs font-bold text-primary-700 hover:underline"
                  >
                    Detail &amp; Daftar →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}