import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://penaconsultant.com/pelatihan/ahli-k3-umum/tryout',
  },
  title: 'Simulasi Ujian Tryout Ahli K3 Umum Online — PENA Consultant',
  description: 'Uji kesiapan ujian pembinaan Ahli K3 Umum Kemnaker RI dengan simulasi tryout online interaktif 100 soal, pembahasan regulasi, dan skor langsung.',
  openGraph: {
    title: 'Simulasi Ujian Tryout Ahli K3 Umum Online — PENA Consultant',
    description: 'Uji kesiapan ujian pembinaan Ahli K3 Umum Kemnaker RI dengan simulasi tryout online interaktif 100 soal, pembahasan regulasi, dan skor langsung.',
    url: 'https://penaconsultant.com/pelatihan/ahli-k3-umum/tryout',
    siteName: 'PENA Consultant',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: 'https://penaconsultant.com/images/og-share-card.png', width: 1200, height: 630, alt: 'Simulasi Tryout Ahli K3 Umum' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simulasi Ujian Tryout Ahli K3 Umum Online — PENA Consultant',
    description: 'Uji kesiapan ujian pembinaan Ahli K3 Umum Kemnaker RI dengan simulasi tryout online interaktif 100 soal, pembahasan regulasi, dan skor langsung.',
    images: ['https://penaconsultant.com/images/og-share-card.png'],
  },
};

export default function TryoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}