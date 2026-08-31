import { MetadataRoute } from 'next';
import { getPrograms, getArticles, getLocations, getIndustries, getBatches, getEducationPrograms } from '@/lib/data';
import instructorsData from '@/content/global/instructors.json';
import mitraData from '@/content/global/mitra.json';
import caseStudiesData from '@/content/global/case_studies.json';

const CLUSTERS = ['smk3', 'karier-k3', 'sertifikasi-k3', 'k3-teknis', 'regulasi-k3'];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://penaconsultant.com';
  const now = new Date().toISOString();

  // Static root routes & Special Landing Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/k3`, lastModified: now, changeFrequency: 'daily', priority: 0.95 },
    { url: `${baseUrl}/pelatihan`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/webinar-gratis`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/galeri`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/pelatihan/ahli-k3-umum/tryout`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/panduan`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/jadwal`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/cabang`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/industri`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/instruktur`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/mitra`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/studi-kasus`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/tentang`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/kebijakan-privasi`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/kontak`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/rekan-pelatihan`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];

  // 5 Cluster Hubs: /panduan/smk3, /panduan/k3-teknis, etc.
  const clusterRoutes: MetadataRoute.Sitemap = CLUSTERS.map((c) => ({
    url: `${baseUrl}/panduan/${c}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 73 Programs
  const programRoutes: MetadataRoute.Sitemap = getPrograms().map((p) => ({
    url: `${baseUrl}/pelatihan/${p.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: p.slug === 'ahli-k3-umum' ? 1.0 : 0.9,
  }));

  // 328 Canonical Flat Articles
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

  // Instructors
  const instructorRoutes: MetadataRoute.Sitemap = (instructorsData as any[]).map((inst) => ({
    url: `${baseUrl}/instruktur/${inst.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Mitra (Corporate Clients)
  const mitraRoutes: MetadataRoute.Sitemap = (mitraData as any[]).map((m) => ({
    url: `${baseUrl}/mitra/${m.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Case Studies
  const caseStudyRoutes: MetadataRoute.Sitemap = (caseStudiesData as any[]).map((cs) => ({
    url: `${baseUrl}/studi-kasus/${cs.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

    // 30 Education & Campus Programs
  const educationRoutes: MetadataRoute.Sitemap = getEducationPrograms().map((e) => ({
    url: `${baseUrl}/edukasi/${e.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
  return [
    ...staticRoutes,
    ...clusterRoutes,
    ...programRoutes,
    ...articleRoutes,
    ...locationRoutes,
    ...industryRoutes,
    ...batchRoutes,
    ...instructorRoutes,
    ...mitraRoutes,
    ...caseStudyRoutes,
    ...educationRoutes,
  ];
}
