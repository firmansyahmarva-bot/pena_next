'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Shield, Calculator } from 'lucide-react';
import { getWaLink } from '@/lib/types';

export default function CorporateQuoteForm({ defaultProgram = '' }: { defaultProgram?: string }) {
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [participants, setParticipants] = useState('5-10');
  const [location, setLocation] = useState('In-House Perusahaan');
  const [selectedProgram, setSelectedProgram] = useState(defaultProgram || 'Ahli K3 Umum Kemnaker RI');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Halo Tim PENA Consultant, kami ingin meminta Proposal & Penawaran Harga Corporate In-House Training K3:
- Perusahaan: ${company || 'PT ...'}
- PIC: ${name || 'Bapak/Ibu'}
- Program: ${selectedProgram}
- Jumlah Peserta: ${participants} orang
- Lokasi Pelaksanaan: ${location}

Mohon dapat dikirimkan surat penawaran resmi (RFQ). Terima kasih.`;

    window.open(getWaLink(msg), '_blank');
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-primary-950 to-slate-950 text-white p-6 sm:p-10 rounded-2xl border border-primary-800/40 shadow-2xl">
      <div className="max-w-xl mb-6">
        <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
          <Calculator className="w-3.5 h-3.5" /> KALKULATOR PENAWARAN B2B
        </span>
        <h3 className="text-2xl font-black mt-3">Minta Proposal &amp; Penawaran In-House</h3>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Dapatkan diskon paket korporat, jadwal fleksibel, dan sertifikat resmi Kemnaker RI / BNSP untuk karyawan Anda.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Nama Perusahaan / Instansi</label>
            <input
              type="text"
              required
              placeholder="Contoh: PT Sumber Makmur"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-lg px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Nama PIC / Jabatan</label>
            <input
              type="text"
              required
              placeholder="Contoh: Budi Santoso (HR Manager)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-lg px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Program Pelatihan</label>
            <input
              type="text"
              required
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-400"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Estimasi Peserta</label>
            <select
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-400"
            >
              <option value="1-4">1 - 4 Orang (Public Batch)</option>
              <option value="5-10">5 - 10 Orang (In-House Mini)</option>
              <option value="11-25">11 - 25 Orang (In-House Full)</option>
              <option value="25+">&gt; 25 Orang (Corporate Scale)</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Rencana Lokasi</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-400"
            >
              <option value="In-House Perusahaan">On-Site di Pabrik/Kantor Kami</option>
              <option value="Online Zoom">Online Interactive Training</option>
              <option value="TUK PENA Jogja/Jakarta">TUK PENA Consultant (Jogja/Jakarta)</option>
            </select>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Generate &amp; Kirim Request Proposal via WhatsApp</span>
          </button>
        </div>
      </form>
    </div>
  );
}