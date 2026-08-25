import fs from 'fs';
import path from 'path';

const DOMAIN = 'penaconsultant.com';
const INDEXNOW_KEY = '60b45789f81a4eb8b387e671239c8901';
const KEY_LOCATION = `https://${DOMAIN}/${INDEXNOW_KEY}.txt`;

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

console.log(`📡 Preparing to submit ${allUrls.length} URLs to IndexNow API for ${DOMAIN}...`);

async function submitBatch(urls) {
  const payload = {
    host: DOMAIN,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    console.log(`✓ IndexNow Response Status: ${res.status} (${res.statusText || 'OK'})`);
  } catch (err) {
    console.error('⨯ IndexNow Submission Error:', err.message);
  }
}

// Split into batches of 500
const chunkSize = 500;
for (let i = 0; i < allUrls.length; i += chunkSize) {
  const chunk = allUrls.slice(i, i + chunkSize);
  console.log(`Pushing batch ${Math.floor(i / chunkSize) + 1} (${chunk.length} URLs)...`);
  await submitBatch(chunk);
}

console.log('🎉 IndexNow Submission Finished!');