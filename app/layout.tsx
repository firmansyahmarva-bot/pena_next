import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export const metadata: Metadata = {
  title: 'PENA Consultant — Pusat Pelatihan & Sertifikasi K3 Resmi Kemnaker RI & BNSP',
  description: 'Penyelenggara pembinaan, sertifikasi profesi K3, dan in-house training resmi Kemnaker RI & BNSP di Indonesia. Jadwal batch 2026, biaya terjangkau & materi lengkap.',
  metadataBase: new URL('https://penaconsultant.co.id'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-primary-500 selection:text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <FloatingWhatsApp />
        <Footer />
      </body>
    </html>
  );
}