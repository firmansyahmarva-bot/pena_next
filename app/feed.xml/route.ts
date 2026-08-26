import { NextResponse } from 'next/server';
import { getPrograms, getArticles, getLocations } from '@/lib/data';

export const dynamic = 'force-static';

export async function GET() {
  const programs = getPrograms();
  const articles = getArticles().slice(0, 50);
  const locations = getLocations();

  const now = new Date().toUTCString();

  let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>PENA Consultant — Sertifikasi &amp; Pelatihan K3 Resmi Kemnaker RI &amp; BNSP</title>
    <link>https://penaconsultant.com</link>
    <description>Pusat pembinaan, jadwal pelatihan, dan sertifikasi profesi K3 resmi Kemnaker RI dan BNSP di Indonesia.</description>
    <language>id-ID</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="https://penaconsultant.com/feed.xml" rel="self" type="application/rss+xml" />
`;

  // Top Programs
  programs.forEach((p) => {
    rss += `    <item>
      <title><![CDATA[Pelatihan & Sertifikasi ${p.name} 2026]]></title>
      <link>https://penaconsultant.com/pelatihan/${p.slug}</link>
      <guid isPermaLink="true">https://penaconsultant.com/pelatihan/${p.slug}</guid>
      <description><![CDATA[${p.summary || p.meta_description || ''}]]></description>
      <pubDate>${now}</pubDate>
    </item>\n`;
  });

  // Recent Articles
  articles.forEach((a) => {
    rss += `    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>https://penaconsultant.com/panduan/${a.slug}</link>
      <guid isPermaLink="true">https://penaconsultant.com/panduan/${a.slug}</guid>
      <description><![CDATA[${a.meta_description || a.summary || ''}]]></description>
      <pubDate>${now}</pubDate>
    </item>\n`;
  });

  // Locations
  locations.forEach((l) => {
    rss += `    <item>
      <title><![CDATA[Pelatihan K3 di ${l.name} — Jadwal & Tempat Uji Kompetensi]]></title>
      <link>https://penaconsultant.com/cabang/${l.slug}</link>
      <guid isPermaLink="true">https://penaconsultant.com/cabang/${l.slug}</guid>
      <description><![CDATA[Layanan sertifikasi K3 resmi Kemnaker RI & BNSP di wilayah ${l.name}.]]></description>
      <pubDate>${now}</pubDate>
    </item>\n`;
  });

  rss += `  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}