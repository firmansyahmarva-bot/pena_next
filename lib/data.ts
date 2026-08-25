import fs from 'fs';
import path from 'path';
import { Program, Article, Industry, Location, ScheduleBatch } from './types';

export * from './types';

const contentDir = path.join(process.cwd(), 'content');

function readJsonDir<T>(subDir: string): T[] {
  const dirPath = path.join(contentDir, subDir);
  if (!fs.existsSync(dirPath)) return [];
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.json'));
  return files.map(file => {
    const raw = fs.readFileSync(path.join(dirPath, file), 'utf-8');
    return JSON.parse(raw) as T;
  });
}

function readJsonFile<T>(subDir: string, slug: string): T | undefined {
  const filePath = path.join(contentDir, subDir, `${slug}.json`);
  if (!fs.existsSync(filePath)) return undefined;
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

export const getPrograms = (): Program[] => readJsonDir<Program>('programs');
export const getProgramBySlug = (slug: string): Program | undefined => readJsonFile<Program>('programs', slug);

export const getArticles = (): Article[] => readJsonDir<Article>('articles');
export const getArticleBySlug = (slug: string): Article | undefined => readJsonFile<Article>('articles', slug);

export const getIndustries = (): Industry[] => readJsonDir<Industry>('industries');
export const getIndustryBySlug = (slug: string): Industry | undefined => readJsonFile<Industry>('industries', slug);

export const getLocations = (): Location[] => readJsonDir<Location>('locations');
export const getLocationBySlug = (slug: string): Location | undefined => readJsonFile<Location>('locations', slug);

export const getBatches = (): ScheduleBatch[] => readJsonDir<ScheduleBatch>('batches');
export const getBatchBySlug = (slug: string): ScheduleBatch | undefined => readJsonFile<ScheduleBatch>('batches', slug);

export const getTestimonials = () => {
  const file = path.join(contentDir, 'global', 'testimonials.json');
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf-8')) : [];
};

export const getMitra = () => {
  const file = path.join(contentDir, 'global', 'mitra.json');
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf-8')) : [];
};

export const getFaqs = () => {
  const file = path.join(contentDir, 'global', 'faqs.json');
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf-8')) : [];
};