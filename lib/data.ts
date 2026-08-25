import programsData from '../data/programs.json';
import articlesData from '../data/articles.json';
import industriesData from '../data/industries.json';
import locationsData from '../data/locations.json';
import batchesData from '../data/batches.json';
import testimonialsData from '../data/testimonials.json';
import mitraData from '../data/mitra.json';
import instructorsData from '../data/instructors.json';
import caseStudiesData from '../data/case_studies.json';
import faqsData from '../data/faqs.json';

export interface StructuredBlock {
  type: string;
  text?: string;
  style?: string;
  items?: string[];
  source?: string;
  caption?: string;
}

export interface Program {
  id: string;
  type: string;
  name: string;
  slug: string;
  path: string;
  title: string;
  meta_title: string;
  meta_description: string;
  summary: string | null;
  certification_body: 'kemnaker' | 'bnsp' | 'none' | null;
  base_price: number | null;
  duration: string | null;
  legal_basis: StructuredBlock[];
  objectives: StructuredBlock[];
  scope: StructuredBlock[];
  requirements: StructuredBlock[];
  documents: StructuredBlock[];
  facilities: StructuredBlock[];
  registration_procedure: StructuredBlock[];
  hero_media: { path: string; alt_text: string; width: number; height: number } | null;
  batches: Array<{
    id: string;
    slug: string;
    batch_number: number | null;
    start_date: string | null;
    end_date: string | null;
    is_online: boolean;
    mode: string;
    normal_price: number | null;
    promo_price: number | null;
    location_name: string;
    availability: string;
  }>;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  path: string;
  role: string;
  cluster: { name: string; slug: string } | null;
  summary: string | null;
  body: StructuredBlock[];
  related_offering_slug: string | null;
  meta_title: string;
  meta_description: string;
  published_at: string | null;
}

export interface Industry {
  id: string;
  name: string;
  slug: string;
  path: string;
  description: string | null;
  regulatory_context: StructuredBlock[];
  relevant_offering_slugs: string[];
}

export interface Location {
  id: string;
  name: string;
  slug: string;
  path: string;
  is_physical: boolean;
  address: string | null;
  intro: StructuredBlock[];
  service_areas: string[];
  phone: string | null;
}

export interface ScheduleBatch {
  id: string;
  slug: string;
  path: string;
  batch_number: number | null;
  start_date: string | null;
  end_date: string | null;
  is_online: boolean;
  mode: string;
  normal_price: number | null;
  promo_price: number | null;
  offering_name: string | null;
  offering_slug: string | null;
  certification_body: string | null;
  location_name: string;
  availability: string;
}

export const getPrograms = (): Program[] => programsData as unknown as Program[];
export const getProgramBySlug = (slug: string): Program | undefined => getPrograms().find(p => p.slug === slug);

export const getArticles = (): Article[] => articlesData as unknown as Article[];
export const getArticleBySlug = (slug: string): Article | undefined => getArticles().find(a => a.slug === slug);

export const getIndustries = (): Industry[] => industriesData as unknown as Industry[];
export const getIndustryBySlug = (slug: string): Industry | undefined => getIndustries().find(i => i.slug === slug);

export const getLocations = (): Location[] => locationsData as unknown as Location[];
export const getLocationBySlug = (slug: string): Location | undefined => getLocations().find(l => l.slug === slug);

export const getBatches = (): ScheduleBatch[] => batchesData as unknown as ScheduleBatch[];
export const getBatchBySlug = (slug: string): ScheduleBatch | undefined => getBatches().find(b => b.slug === slug);

export const getTestimonials = () => testimonialsData;
export const getMitra = () => mitraData;
export const getInstructors = () => instructorsData;
export const getCaseStudies = () => caseStudiesData;
export const getFaqs = () => faqsData;

export const WA_NUMBER = '6281296870884';
export const getWaLink = (message: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;