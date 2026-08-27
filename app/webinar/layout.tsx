import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://penaconsultant.com/webinar',
  },
  title: 'Webinar & Workshop Edukasi K3 Nasional — PENA Consultant',
  description: 'Ikuti webinar K3 nasional bersama dewan pakar keselamatan kerja. Bahas update regulasi Kemnaker RI dan sertifikat kepesertaan gratis.',
  openGraph: {
    title: 'Webinar & Workshop Edukasi K3 Nasional — PENA Consultant',
    description: 'Ikuti webinar K3 nasional bersama dewan pakar keselamatan kerja. Bahas update regulasi Kemnaker RI dan sertifikat kepesertaan gratis.',
    url: 'https://penaconsultant.com/webinar',
    siteName: 'PENA Consultant',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: 'https://penaconsultant.com/images/og-share-card.png', width: 1200, height: 630, alt: 'Webinar K3 PENA Consultant' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Webinar & Workshop Edukasi K3 Nasional — PENA Consultant',
    description: 'Ikuti webinar K3 nasional bersama dewan pakar keselamatan kerja. Bahas update regulasi Kemnaker RI dan sertifikat kepesertaan gratis.',
    images: ['https://penaconsultant.com/images/og-share-card.png'],
  },
};

export default function WebinarLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}