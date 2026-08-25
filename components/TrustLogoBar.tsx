import React from 'react';
import { ShieldCheck, Award, Building, CheckCircle2 } from 'lucide-react';

export default function TrustLogoBar() {
  const clients = [
    'PT Pertamina (Persero)',
    'PT PLN (Persero)',
    'PT Telkom Indonesia',
    'PT Wijaya Karya (WIKA)',
    'PT Adhi Karya',
    'PT Semen Indonesia',
    'PT Bukit Asam',
    'PT Freeport Indonesia',
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400">
            DIPERCAYA OLEH 500+ PERUSAHAAN BUMN, MULTINASIONAL &amp; KONTRAKTOR K3
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-75 grayscale hover:grayscale-0 transition-all">
          {clients.map((c, i) => (
            <div key={i} className="flex items-center gap-2 text-slate-700 font-bold text-xs sm:text-sm bg-slate-50 px-4 py-2 rounded-lg border border-slate-200/80 shadow-sm">
              <Building className="w-4 h-4 text-primary-600" />
              <span>{c}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}