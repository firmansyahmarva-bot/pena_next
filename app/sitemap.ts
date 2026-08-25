import { MetadataRoute } from 'next';
import { getPrograms, getArticles, getLocations, getIndustries, getBatches } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://penaconsultant.com';
  const now = new Date().toISOString();

  // Static root routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/pelatihan`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/webinar`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/panduan`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/jadwal`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/cabang`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/industri`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/kontak`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];

  // 73 Programs
  const programRoutes: MetadataRoute.Sitemap = getPrograms().map((p) => ({
    url: `${baseUrl}/pelatihan/${p.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: p.slug === 'ahli-k3-umum' ? 1.0 : 0.9,
  }));

  // 328 Articles
  const articleRoutes: MetadataRoute.Sitemap = getArticles().map((a) => ({
    url: `${baseUrl}/panduan/${a.slug}`,
    lastModified: a.published_at || now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 23 Locations
  const locationRoutes: MetadataRoute.Sitemap = getLocations().map((l) => ({
    url: `${baseUrl}/cabang/${l.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 15 Industries
  const industryRoutes: MetadataRoute.Sitemap = getIndustries().map((i) => ({
    url: `${baseUrl}/industri/${i.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // 60 Batches
  const batchRoutes: MetadataRoute.Sitemap = getBatches().map((b) => ({
    url: `${baseUrl}/jadwal/${b.slug}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...programRoutes,
    ...articleRoutes,
    ...locationRoutes,
    ...industryRoutes,
    ...batchRoutes,
  ];
}