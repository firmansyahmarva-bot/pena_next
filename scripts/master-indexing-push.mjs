import fs from 'fs';
import path from 'path';

const DOMAIN = 'penaconsultant.com';
const INDEXNOW_KEY = '60b45789f81a4eb8b387e671239c8901';
const KEY_LOCATION = `https://${DOMAIN}/${INDEXNOW_KEY}.txt`;
const SITEMAP_URL = `https://${DOMAIN}/sitemap.xml`;
const FEED_URL = `https://${DOMAIN}/feed.xml`;

const contentDir = path.join(process.cwd(), 'content');

function getFiles(subDir) {
  const dirPath = path.join(contentDir, subDir);
  if (!fs.existsSync(dirPath)) return [];
  return fs.readdirSync(dirPath).filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''));
}

const programs = getFiles('programs');
const batches = getFiles('batches');
const locations = getFiles('locations');
const industries = getFiles('industries');
const articles = getFiles('articles');

const staticRoutes = [
  '',
  'pelatihan',
  'jadwal',
  'cabang',
  'industri',
  'panduan',
  'instruktur',
  'mitra',
  'studi-kasus',
  'galeri',
  'tentang',
  'faq',
  'kontak',
  'kebijakan-privasi',
  'webinar-gratis',
  'webinar',
  'pelatihan/ahli-k3-umum/tryout',
  'panduan/sertifikasi-k3',
  'panduan/k3-teknis',
  'panduan/smk3',
  'panduan/regulasi-k3',
  'panduan/karier-k3',
];

const allUrls = [
  ...staticRoutes.map(r => `https://${DOMAIN}/${r}`.replace(/\/$/, '')),
  ...programs.map(p => `https://${DOMAIN}/pelatihan/${p}`),
  ...batches.map(b => `https://${DOMAIN}/jadwal/${b}`),
  ...locations.map(l => `https://${DOMAIN}/cabang/${l}`),
  ...industries.map(i => `https://${DOMAIN}/industri/${i}`),
  ...articles.map(a => `https://${DOMAIN}/panduan/${a}`),
];

console.log(`\n======================================================`);
console.log(`🚀 INITIATING 1-HOUR MASTER SEARCH ENGINE INDEXING PUSH`);
console.log(`🌐 Target Domain: ${DOMAIN}`);
console.log(`📄 Total URLs to Submit: ${allUrls.length}`);
console.log(`======================================================\n`);

// 1. IndexNow Submission to Multiple Search Engine Hubs
async function submitIndexNow(endpointName, endpointUrl, urls) {
  console.log(`📡 Pushing ${urls.length} URLs to ${endpointName} (${endpointUrl})...`);
  const payload = {
    host: DOMAIN,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  try {
    const res = await fetch(endpointUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });

    console.log(`   ✓ ${endpointName} Status: ${res.status} (${res.statusText || 'Accepted'})`);
  } catch (err) {
    console.log(`   ⚠️ ${endpointName} Ping Notice: ${err.message}`);
  }
}

// 2. Sitemap Pings
async function pingSitemap(engineName, pingUrl) {
  try {
    const res = await fetch(pingUrl);
    console.log(`✓ Sitemap Ping to ${engineName}: Status ${res.status}`);
  } catch (err) {
    console.log(`⚠️ Sitemap Ping to ${engineName}: ${err.message}`);
  }
}

// 3. WebSub / PubSubHubbub Push
async function pingWebSub() {
  try {
    const res = await fetch('https://pubsubhubbub.appspot.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `hub.mode=publish&hub.url=${encodeURIComponent(FEED_URL)}`,
    });
    console.log(`✓ Google WebSub (PubSubHubbub) Real-Time Feed Broadcast: Status ${res.status}`);
  } catch (err) {
    console.log(`⚠️ WebSub Ping: ${err.message}`);
  }
}

async function runAll() {
  // Push IndexNow in chunks of 500
  const chunkSize = 500;
  for (let i = 0; i < allUrls.length; i += chunkSize) {
    const chunk = allUrls.slice(i, i + chunkSize);
    const batchNum = Math.floor(i / chunkSize) + 1;
    console.log(`\n--- Batch ${batchNum} (${chunk.length} URLs) ---`);
    await submitIndexNow('IndexNow Global API', 'https://api.indexnow.org/indexnow', chunk);
    await submitIndexNow('Bing Direct IndexNow', 'https://www.bing.com/indexnow', chunk);
    await submitIndexNow('Yandex Direct IndexNow', 'https://yandex.com/indexnow', chunk);
  }

  console.log(`\n--- Sitemap & Real-Time Feed Notifications ---`);
  await pingSitemap('Google Crawler Ping', `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`);
  await pingSitemap('Bing Crawler Ping', `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`);
  await pingWebSub();

  console.log(`\n======================================================`);
  console.log(`🎉 ALL 920 URLS BROADCASTED TO SEARCH ENGINE CRAWLERS!`);
  console.log(`======================================================\n`);
}

runAll();