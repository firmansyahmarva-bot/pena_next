import React from 'react';
import { Program, Article } from '@/lib/types';

export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': 'https://penaconsultant.com/#organization',
    name: 'PENA Consultant',
    legalName: 'PT PENA Consultant (Pusat Edukasi Nasional)',
    url: 'https://penaconsultant.com',
    logo: 'https://penaconsultant.com/logo.svg',
    description: 'Perusahaan Jasa Keselamatan dan Kesehatan Kerja (PJK3) resmi Kemnaker RI dan Tempat Uji Kompetensi (TUK) berlisensi BNSP di Indonesia.',
    telephone: '+6281296870884',
    email: 'info@penaconsultant.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ID',
      addressRegion: 'DI Yogyakarta',
      addressLocality: 'Yogyakarta',
    },
    sameAs: [
      'https://www.linkedin.com/company/pena-consultant',
      'https://www.instagram.com/penaconsultant',
    ],
    knowsAbout: [
      'Keselamatan dan Kesehatan Kerja (K3)',
      'Sertifikasi Ahli K3 Umum Kemnaker RI',
      'Sistem Manajemen K3 (SMK3 PP 50/2012)',
      'Sertifikasi BNSP RI',
      'K3 Listrik, K3 Kimia, K3 Konstruksi, K3 Migas',
      'Lisensi SIO Operator Forklift, Crane, Boiler, Scaffolding',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      ratingCount: '1850',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleJsonLd({ article }: { article: Article }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.meta_description || article.summary || '',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://penaconsultant.com/panduan/${article.slug}`,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'p'],
    },
    datePublished: article.published_at || '2026-01-01T08:00:00+07:00',
    dateModified: '2026-08-25T12:00:00+07:00',
    inLanguage: 'id-ID',
    author: {
      '@type': 'Person',
      name: 'Tim Ahli & Asesor K3 PENA Consultant',
      jobTitle: 'Lead Auditor SMK3 Kemnaker RI',
      worksFor: {
        '@type': 'Organization',
        name: 'PENA Consultant',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'PENA Consultant',
      logo: {
        '@type': 'ImageObject',
        url: 'https://penaconsultant.com/logo.svg',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function CourseJsonLd({ program }: { program: Program }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `https://penaconsultant.com/pelatihan/${program.slug}#course`,
    name: program.title || program.name,
    description: program.meta_description || program.summary || '',
    inLanguage: 'id-ID',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'p'],
    },
    provider: {
      '@type': 'EducationalOrganization',
      name: 'PENA Consultant',
      url: 'https://penaconsultant.com',
      sameAs: [
        'https://instagram.com/penaconsultant',
        'https://linkedin.com/company/pena-consultant'
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        bestRating: '5',
        ratingCount: '1850',
      },
    },
    educationalCredentialAwarded: program.certification_body === 'kemnaker' 
      ? 'Sertifikat & SKP Ahli K3 Kemnaker RI' 
      : 'Sertifikat Kompetensi Profesi BNSP RI',
    timeRequired: program.duration ? `P12D` : 'P12D',
    offers: {
      '@type': 'Offer',
      price: program.base_price ? String(program.base_price) : '6500000',
      priceCurrency: 'IDR',
      availability: 'https://schema.org/InStock',
      validFrom: '2026-01-01',
      url: `https://penaconsultant.com/pelatihan/${program.slug}`,
    },
    hasCourseInstance: (program.batches || []).map((b) => ({
      '@type': 'CourseInstance',
      courseMode: b.is_online ? 'online' : 'onsite',
      startDate: b.start_date,
      endDate: b.end_date,
      location: {
        '@type': 'Place',
        name: b.location_name || 'TUK PENA Consultant',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'ID',
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FaqJsonLd({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h3', 'p'],
    },
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
export function WebSiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://penaconsultant.com/#website',
    url: 'https://penaconsultant.com',
    name: 'PENA Consultant',
    description: 'Pusat Pelatihan & Sertifikasi K3 Resmi Kemnaker RI & BNSP di Indonesia',
    publisher: {
      '@id': 'https://penaconsultant.com/#organization',
    },
    inLanguage: 'id-ID',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://penaconsultant.com/panduan?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
export function DefinedTermSetJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': 'https://penaconsultant.com/#k3-glossary',
    name: 'Glosarium Standar Istilah Keselamatan dan Kesehatan Kerja (K3) Indonesia',
    description: 'Kamus terminologi resmi regulasi K3 Kemnaker RI, BNSP, dan SMK3 PP 50/2012.',
    inDefinedTermSet: 'https://penaconsultant.com',
    hasDefinedTerm: [
      {
        '@type': 'DefinedTerm',
        name: 'Ahli K3 Umum',
        termCode: 'AK3U',
        description: 'Tenaga teknis berkeahlian khusus dari luar instansi pemerintah yang ditunjuk oleh Menteri Ketenagakerjaan untuk mengawasi ditaatinya UU No. 1 Tahun 1970 di tempat kerja.',
        url: 'https://penaconsultant.com/pelatihan/ahli-k3-umum',
      },
      {
        '@type': 'DefinedTerm',
        name: 'Sistem Manajemen Keselamatan dan Kesehatan Kerja',
        termCode: 'SMK3',
        description: 'Bagian dari sistem manajemen perusahaan secara keseluruhan dalam rangka pengendalian risiko yang berkaitan dengan kegiatan kerja guna terciptanya tempat kerja yang aman, efisien, dan produktif berdasarkan PP No. 50 Tahun 2012.',
        url: 'https://penaconsultant.com/panduan/smk3',
      },
      {
        '@type': 'DefinedTerm',
        name: 'Surat Izin Operator',
        termCode: 'SIO',
        description: 'Sertifikat lisensi kewenangan pengoperasian peralatan kerja berisiko tinggi seperti forklift, crane, boiler, dan bejana tekan yang diterbitkan oleh Ditjen Binwasnaker & K3 Kemnaker RI.',
        url: 'https://penaconsultant.com/pelatihan',
      },
      {
        '@type': 'DefinedTerm',
        name: 'Panitia Pembina Keselamatan dan Kesehatan Kerja',
        termCode: 'P2K3',
        description: 'Badan pembantu di tempat kerja yang merupakan wadah kerja sama antara pengusaha dan pekerja untuk mengembangkan kerja sama saling pengertian dan partisipasi efektif dalam penerapan K3 berdasarkan Permenaker No. Per.04/MEN/1987.',
        url: 'https://penaconsultant.com/panduan/regulasi-k3',
      },
      {
        '@type': 'DefinedTerm',
        name: 'Hazard Identification, Risk Assessment, and Determining Control',
        termCode: 'HIRADC',
        description: 'Metodologi sistematis untuk mengidentifikasi potensi bahaya di lingkungan kerja, menganalisis tingkat keparahan dan kemungkinan risiko, serta menetapkan hierarki pengendalian bahaya.',
        url: 'https://penaconsultant.com/panduan',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}