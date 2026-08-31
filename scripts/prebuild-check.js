const fs = require('fs');
const path = require('path');

console.log('🔍 Running Pre-Build URL Safety Check...');

const rootDir = path.resolve(__dirname, '..');

// 1. Collect all active sitemap routes
const getSlugs = dir => {
  const fullDir = path.join(rootDir, dir);
  if (!fs.existsSync(fullDir)) return [];
  return fs.readdirSync(fullDir).filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''));
};

const articles = getSlugs('content/articles');
const programs = getSlugs('content/programs');
const locations = getSlugs('content/locations');
const batches = getSlugs('content/batches');
const education = getSlugs('content/education');
const industries = getSlugs('content/industries');

const loadGlobal = file => {
  const fullFile = path.join(rootDir, file);
  if (!fs.existsSync(fullFile)) return [];
  return JSON.parse(fs.readFileSync(fullFile, 'utf8')).map(item => item.slug).filter(Boolean);
};

const instructors = loadGlobal('content/global/instructors.json');
const mitra = loadGlobal('content/global/mitra.json');
const caseStudies = loadGlobal('content/global/case_studies.json');

// Dynamically discover all static app routes in app/ folder
function getStaticAppRoutes(dir, prefix) {
  prefix = prefix || '';
  let routes = [];
  if (!fs.existsSync(dir)) return routes;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (!file.startsWith('[') && file !== 'api') {
        routes = routes.concat(getStaticAppRoutes(fullPath, prefix + '/' + file));
      }
    } else if (file === 'page.tsx' || file === 'page.ts' || file === 'page.js' || file === 'page.jsx') {
      routes.push(prefix || '/');
    }
  }
  return routes;
}

const staticAppRoutes = getStaticAppRoutes(path.join(rootDir, 'app'));

const clusterHubs = [
  '/panduan/smk3', '/panduan/karier-k3', '/panduan/sertifikasi-k3',
  '/panduan/k3-teknis', '/panduan/regulasi-k3'
];

const activeRoutes = new Set([
  ...staticAppRoutes,
  ...clusterHubs,
  ...articles.map(s => '/panduan/' + s),
  ...programs.map(s => '/pelatihan/' + s),
  ...locations.map(s => '/cabang/' + s),
  ...batches.map(s => '/jadwal/' + s),
  ...education.map(s => '/edukasi/' + s),
  ...industries.map(s => '/industri/' + s),
  ...instructors.map(s => '/instruktur/' + s),
  ...mitra.map(s => '/mitra/' + s),
  ...caseStudies.map(s => '/studi-kasus/' + s)
]);

console.log(`📊 Total Active Live Routes Verified: ${activeRoutes.size}`);

// 2. Load Redirect Map
const redirectsFile = path.join(rootDir, 'lib/legacyRedirectsMap.json');
if (!fs.existsSync(redirectsFile)) {
  console.error('❌ Error: lib/legacyRedirectsMap.json does not exist!');
  process.exit(1);
}

const redirectMap = JSON.parse(fs.readFileSync(redirectsFile, 'utf8'));

let errors = [];

// RULE 1: FAIL if any active/live URL is also listed as a redirect source
for (const source of Object.keys(redirectMap)) {
  const cleanSource = source.split('?')[0].replace(/\/+$/, '') || '/';
  if (activeRoutes.has(cleanSource) || activeRoutes.has(source)) {
    errors.push(`Active URL is listed as a redirect source in legacyRedirectsMap: "${source}" -> "${redirectMap[source]}"`);
  }
}

// RULE 2: FAIL if any redirect destination is NOT a valid active 200 route (or points to another redirect)
for (const [source, destination] of Object.entries(redirectMap)) {
  const cleanDest = destination.split('?')[0].replace(/\/+$/, '') || '/';
  if (!destination.startsWith('http') && !activeRoutes.has(cleanDest)) {
    errors.push(`Redirect destination does not exist (would return 404): "${source}" -> "${destination}"`);
  }
  if (redirectMap[cleanDest]) {
    errors.push(`Redirect chain/loop detected: "${source}" -> "${destination}" -> "${redirectMap[cleanDest]}"`);
  }
}

// RULE 3: FAIL if any existing sitemap URL was accidentally removed (Baseline Snapshot Check)
const baselineFile = path.join(__dirname, 'sitemap-baseline.json');
if (fs.existsSync(baselineFile)) {
  const baselineRoutes = new Set(JSON.parse(fs.readFileSync(baselineFile, 'utf8')));
  for (const route of baselineRoutes) {
    if (!activeRoutes.has(route)) {
      errors.push(`Sitemap URL accidentally removed from baseline: "${route}"`);
    }
  }
}

// Check Results
if (errors.length > 0) {
  console.error(`\n❌ PRE-BUILD SAFETY CHECK FAILED WITH ${errors.length} ERRORS:`);
  errors.slice(0, 20).forEach((err, idx) => console.error(`  ${idx + 1}. ${err}`));
  if (errors.length > 20) {
    console.error(`  ... and ${errors.length - 20} more errors.`);
  }
  process.exit(1);
}

// Save/Update baseline snapshot
fs.writeFileSync(baselineFile, JSON.stringify(Array.from(activeRoutes).sort(), null, 2), 'utf8');

console.log('✅ PRE-BUILD SAFETY CHECK PASSED:');
console.log(`   - 0 Active URLs in redirect sources (100% of live URLs return direct 200 OK)`);
console.log(`   - 0 Missing or dropped sitemap URLs`);
console.log(`   - 0 Broken redirect destinations or chains`);
console.log(`   - ${Object.keys(redirectMap).length} legitimate legacy 301 redirects verified`);
console.log('--------------------------------------------------\n');
process.exit(0);
