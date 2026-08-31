

import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { getWaLink } from '@/lib/types';

export default function FloatingWhatsApp() {
  return (
    <aside aria-label="WhatsApp Floating Help Desk" className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group">
      <div className="hidden sm:block bg-white text-slate-900 text-xs font-bold py-1.5 px-3.5 rounded-full shadow-lg border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        💬 Butuh Bantuan? Chat Konsultan K3
      </div>
      <a
        href={getWaLink('Halo Admin PENA Consultant, saya ingin konsultasi program pelatihan K3.')}
        target="_blank"
        rel="noopener nofollow"
        className="w-14 h-14 bg-gradient-to-tr from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 relative"
        aria-label="Hubungi Customer Support PENA Consultant via WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 text-[9px] font-black text-slate-950 items-center justify-center">1</span>
        </span>
        <MessageCircle className="w-7 h-7 fill-white/20" aria-hidden="true" />
      </a>
    </aside>
  );
}