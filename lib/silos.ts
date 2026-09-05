import { Program, Article, Industry, Location, ScheduleBatch } from './types';
import { getPrograms, getArticles, getIndustries, getLocations, getBatches } from './data';

export interface ArticleSiloData {
  primaryProgram: Program | null;
  secondaryPrograms: Program[];
  upcomingBatches: ScheduleBatch[];
  relevantIndustries: Industry[];
  topLocations: Location[];
  clusterArticles: Article[];
}

export function getArticleSiloData(article: Article): ArticleSiloData {
  const allPrograms = getPrograms();
  const allBatches = getBatches();
  const allIndustries = getIndustries();
  const allLocations = getLocations();
  const allArticles = getArticles();

  // 1. Primary Program Resolution
  let primaryProgram: Program | null = null;
  if (article.related_offering_slug) {
    primaryProgram = allPrograms.find(p => p.slug === article.related_offering_slug) || null;
  }

  // Fallback heuristic matching via title / summary / cluster
  if (!primaryProgram) {
    const textToMatch = `${article.title} ${article.summary || ''} ${article.cluster?.name || ''}`.toLowerCase();
    
    // Check keyword match in programs
    let bestScore = 0;
    for (const prog of allPrograms) {
      let score = 0;
      const progName = prog.name.toLowerCase();
      const progWords = progName.split(/\s+/).filter(w => w.length > 3);
      
      for (const word of progWords) {
        if (textToMatch.includes(word)) score += 2;
      }
      if (textToMatch.includes(progName)) score += 10;
      
      if (score > bestScore) {
        bestScore = score;
        primaryProgram = prog;
      }
    }
  }

  // Ultimate fallback to cornerstone program
  if (!primaryProgram) {
    primaryProgram = allPrograms.find(p => p.slug === 'ahli-k3-umum') || allPrograms[0] || null;
  }

  // 2. Secondary Programs (Related catalog)
  const secondaryPrograms = allPrograms
    .filter(p => p.slug !== primaryProgram?.slug)
    .slice(0, 3);

  // 3. Upcoming Batches matching primary program or online
  let upcomingBatches = allBatches.filter(b => b.offering_slug === primaryProgram?.slug);
  if (upcomingBatches.length === 0) {
    upcomingBatches = allBatches.slice(0, 3);
  } else {
    upcomingBatches = upcomingBatches.slice(0, 4);
  }

  // 4. Relevant Industries
  const titleLower = `${article.title} ${article.summary || ''}`.toLowerCase();
  let relevantIndustries = allIndustries.filter(ind => {
    const indName = ind.name.toLowerCase();
    return titleLower.includes(indName) || (ind.relevant_offering_slugs && primaryProgram && ind.relevant_offering_slugs.includes(primaryProgram.slug));
  });
  if (relevantIndustries.length === 0) {
    relevantIndustries = allIndustries.slice(0, 4);
  } else {
    relevantIndustries = relevantIndustries.slice(0, 4);
  }

  // 5. Top City Hubs
  const topLocations = allLocations.slice(0, 6);

  // 6. Cluster Articles
  const clusterArticles = allArticles
    .filter(a => a.cluster?.slug === article.cluster?.slug && a.slug !== article.slug)
    .slice(0, 4);

  return {
    primaryProgram,
    secondaryPrograms,
    upcomingBatches,
    relevantIndustries,
    topLocations,
    clusterArticles,
  };
}

export function getProgramSiloData(program: Program) {
  const allBatches = getBatches();
  const allArticles = getArticles();
  const allIndustries = getIndustries();
  const allLocations = getLocations();

  const programBatches = allBatches.filter(b => b.offering_slug === program.slug);
  const relatedArticles = allArticles
    .filter(a => a.related_offering_slug === program.slug || a.title.toLowerCase().includes(program.name.toLowerCase().slice(0, 15)))
    .slice(0, 6);
  
  const relevantIndustries = allIndustries
    .filter(i => i.relevant_offering_slugs?.includes(program.slug))
    .slice(0, 4);

  const topLocations = allLocations.slice(0, 6);

  return {
    programBatches,
    relatedArticles,
    relevantIndustries: relevantIndustries.length > 0 ? relevantIndustries : allIndustries.slice(0, 4),
    topLocations,
  };
}

export function getLocationSiloData(location: Location) {
  const allPrograms = getPrograms();
  const allBatches = getBatches();
  const allIndustries = getIndustries();
  const allArticles = getArticles();

  const featuredPrograms = allPrograms
    .filter(p => location.top_programs?.some(tp => p.name.toLowerCase().includes(tp.toLowerCase()) || tp.toLowerCase().includes(p.slug)))
    .slice(0, 6);

  let localBatches = allBatches
    .filter(b => b.location_name.toLowerCase().includes(location.name.toLowerCase()) || b.is_online)
    .slice(0, 4);
  if (localBatches.length === 0) {
    localBatches = allBatches.slice(0, 4);
  }

  const localArticles = allArticles
    .filter(a => a.title.toLowerCase().includes(location.name.toLowerCase()) || (location.key_industries && location.key_industries.some(ki => a.title.toLowerCase().includes(ki.toLowerCase()))))
    .slice(0, 4);

  return {
    featuredPrograms: featuredPrograms.length > 0 ? featuredPrograms : allPrograms.slice(0, 6),
    localBatches,
    localArticles: localArticles.length > 0 ? localArticles : allArticles.slice(0, 4),
  };
}
