import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { OrganizationJsonLd, WebSiteJsonLd, DefinedTermSetJsonLd } from '@/components/JsonLd';

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'PENA Consultant — Pusat Pelatihan & Sertifikasi K3 Resmi Kemnaker RI & BNSP',
    template: '%s | PENA Consultant',
  },
  description: 'Lembaga pembinaan, sertifikasi profesi K3 resmi Kemnaker RI & BNSP di Indonesia. Jadwal batch 2026, Tempat Uji Kompetensi resmi, materi lengkap & garansi kelulusan.',
  metadataBase: new URL('https://penaconsultant.com'),
  alternates: {
    canonical: 'https://penaconsultant.com',
  },
  openGraph: {
    title: 'PENA Consultant — Pusat Pelatihan & Sertifikasi K3 Resmi Kemnaker RI & BNSP',
    description: 'Pusat pembinaan sertifikasi K3 resmi Kemnaker RI & BNSP. Public online, TUK offline di 23 kota, dan in-house training korporat.',
    url: 'https://penaconsultant.com',
    siteName: 'PENA Consultant',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: 'https://penaconsultant.com/images/og-share-card.png',
        width: 1200,
        height: 630,
        alt: 'PENA Consultant - PJK3 Resmi Kemnaker RI & BNSP',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PENA Consultant — Sertifikasi K3 Kemnaker RI & BNSP',
    description: 'Pusat pelatihan & sertifikasi K3 resmi Kemnaker RI & BNSP. Jadwal batch 2026 & biaya terjangkau.',
    images: ['https://penaconsultant.com/images/og-share-card.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={fontSans.variable}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-primary-500 selection:text-white">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <DefinedTermSetJsonLd />
        <Navbar />
        <main id="main-content" className="flex-grow">{children}</main>
        <FloatingWhatsApp />
        <Footer />
      </body>
    </html>
  );
}