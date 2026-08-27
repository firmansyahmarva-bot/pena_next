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
  meta_title?: string;
  meta_description?: string;
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
  phone: string | null;
  meta_title?: string;
  meta_description?: string;
  tagline?: string;
  service_areas?: string[];
  key_industries?: string[];
  top_programs?: string[];
  target_queries?: string[];
  tuk_facilities?: string[];
  intro: StructuredBlock[];
  faqs?: Array<{ question: string; answer: string }>;
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

export const WA_NUMBER = '6281296870884';
export const getWaLink = (message: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
export interface EducationProgram {
  id: string;
  slug: string;
  category: 'k3-sertifikasi-kampus' | 'karier-fresh-graduate' | 'mindset-produktivitas' | 'public-speaking-leadership' | 'guru-dosen-sekolah';
  category_name: string;
  title: string;
  meta_title: string;
  meta_description: string;
  target_audience: string;
  duration: string;
  format: string;
  price_estimate: string;
  hero_tagline: string;
  summary: string;
  key_problems_solved: string[];
  modules: Array<{
    title: string;
    description: string;
    topics: string[];
  }>;
  concrete_outcomes: string[];
  deliverables: string[];
  target_ai_prompts: string[];
  related_k3_offering_slug?: string;
  related_k3_offering_name?: string;
  faqs: Array<{ question: string; answer: string }>;
}