import React from 'react';
import { Program } from '@/lib/types';

export function CourseJsonLd({ program }: { program: Program }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: program.title || program.name,
    description: program.meta_description || program.summary || '',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'PENA Consultant',
      url: 'https://penaconsultant.co.id',
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
      price: program.base_price ? String(program.base_price) : '7500000',
      priceCurrency: 'IDR',
      availability: 'https://schema.org/InStock',
      validFrom: '2026-01-01',
      url: `https://penaconsultant.co.id/pelatihan/${program.slug}`,
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