import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://penaconsultant.com/webinar-gratis',
  },
  title: 'Webinar K3 Gratis 2026 — PENA Consultant',
  description: 'Daftar webinar K3 gratis bersertifikat. Pembahasan regulasi terbaru K3, peluang karier HSE, dan konsultasi interaktif dengan praktisi berpengalaman.',
  openGraph: {
    title: 'Webinar K3 Gratis 2026 — PENA Consultant',
    description: 'Daftar webinar K3 gratis bersertifikat. Pembahasan regulasi terbaru K3, peluang karier HSE, dan konsultasi interaktif dengan praktisi berpengalaman.',
    url: 'https://penaconsultant.com/webinar-gratis',
    siteName: 'PENA Consultant',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: 'https://penaconsultant.com/images/og-share-card.png', width: 1200, height: 630, alt: 'Webinar K3 Gratis PENA Consultant' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webinar K3 Gratis 2026 — PENA Consultant',
    description: 'Daftar webinar K3 gratis bersertifikat. Pembahasan regulasi terbaru K3, peluang karier HSE, dan konsultasi interaktif dengan praktisi berpengalaman.',
    images: ['https://penaconsultant.com/images/og-share-card.png'],
  },
};

export default function WebinarGratisLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}