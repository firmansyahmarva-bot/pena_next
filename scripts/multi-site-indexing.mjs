import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const KEY_FILE = path.join(process.cwd(), 'scripts', 'service_account.json');

if (!fs.existsSync(KEY_FILE)) {
  console.error('❌ Missing scripts/service_account.json');
  process.exit(1);
}

const keyData = JSON.parse(fs.readFileSync(KEY_FILE, 'utf8'));

function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

async function getGoogleAccessToken() {
  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const claimSet = {
    iss: keyData.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedClaimSet = base64UrlEncode(JSON.stringify(claimSet));
  const signatureInput = `${encodedHeader}.${encodedClaimSet}`;

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signatureInput);
  const signature = signer.sign(keyData.private_key, 'base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const jwt = `${signatureInput}.${signature}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });

  const data = await res.json();
  if (!data.access_token) {
    throw new Error(`Google Auth Failed: ${JSON.stringify(data)}`);
  }
  return data.access_token;
}

// Fetch sitemap helper
async function fetchSitemapUrls(sitemapUrl, fallbackDomain) {
  try {
    const res = await fetch(sitemapUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    const locMatches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1].trim());
    
    // Filter out image files / sitemap index files
    const cleanUrls = locMatches.filter(u => !u.endsWith('.xml') && !u.match(/\.(jpg|png|webp|svg|pdf)$/i));
    if (cleanUrls.length > 0) return cleanUrls;
  } catch (err) {
    console.log(`   ℹ️ Live sitemap fetch notice (${err.message}). Using core routes.`);
  }

  return [
    `https://${fallbackDomain}`,
    `https://${fallbackDomain}/about`,
    `https://${fallbackDomain}/tentang`,
    `https://${fallbackDomain}/kontak`,
    `https://${fallbackDomain}/layanan`,
    `https://${fallbackDomain}/sertifikasi`,
  ];
}

// Get pena URLs
function getPenaUrls() {
  const contentDir = path.join(process.cwd(), 'content');
  const getFiles = (sub) => {
    const p = path.join(contentDir, sub);
    if (!fs.existsSync(p)) return [];
    return fs.readdirSync(p).filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''));
  };

  const programs = getFiles('programs').slice(0, 25);
  const locations = getFiles('locations');
  const articles = getFiles('articles').slice(0, 15);

  return [
    'https://penaconsultant.com',
    'https://penaconsultant.com/pelatihan',
    'https://penaconsultant.com/cabang',
    'https://penaconsultant.com/panduan',
    'https://penaconsultant.com/jadwal',
    'https://penaconsultant.com/pelatihan/ahli-k3-umum/tryout',
    'https://penaconsultant.com/webinar-gratis',
    ...programs.map(p => `https://penaconsultant.com/pelatihan/${p}`),
    ...locations.map(l => `https://penaconsultant.com/cabang/${l}`),
    ...articles.map(a => `https://penaconsultant.com/panduan/${a}`),
  ];
}

async function submitUrl(url, token) {
  const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      url: url,
      type: 'URL_UPDATED',
    }),
  });

  const result = await res.json();
  return { status: res.status, result };
}

async function pushSite(siteName, domain, urls, token) {
  console.log(`\n=============================================================`);
  console.log(`🚀 [SITE PUSH] ${siteName.toUpperCase()} (${domain})`);
  console.log(`📄 Total URLs to Submit: ${urls.length}`);
  console.log(`=============================================================`);

  let success = 0;
  let skipped = 0;

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    process.stdout.write(`   [${i + 1}/${urls.length}] ${url} ... `);

    try {
      const { status, result } = await submitUrl(url, token);
      if (status === 200) {
        console.log(`✓ 200 OK (Googlebot Dispatched)`);
        success++;
      } else {
        const msg = result.error?.message || `HTTP ${status}`;
        console.log(`⚠️ ${msg}`);
        skipped++;
        if (result.error?.code === 429) {
          console.log('\n🛑 Daily Google quota limit reached (200 requests/day).');
          break;
        }
      }
    } catch (err) {
      console.log(`❌ ${err.message}`);
      skipped++;
    }

    await new Promise(r => setTimeout(r, 120));
  }

  console.log(`--- Finished ${siteName}: ${success} Dispatched, ${skipped} Warnings/Skipped ---\n`);
  return { success, skipped };
}

async function run() {
  console.log(`\n🔑 Authenticating with Google Cloud Indexing API...`);
  const token = await getGoogleAccessToken();
  console.log(`✓ Authenticated as: ${keyData.client_email}\n`);

  // 1. Site 1: PENA Consultant
  const penaUrls = getPenaUrls();
  await pushSite('1. PENA Consultant', 'penaconsultant.com', penaUrls, token);

  // 2. Site 2: Wahana Totalita
  const wahanaSitemapUrls = await fetchSitemapUrls('https://wahanatotalita.com/sitemap.xml', 'wahanatotalita.com');
  const topWahanaUrls = wahanaSitemapUrls.slice(0, 50);
  await pushSite('2. Wahana Totalita', 'wahanatotalita.com', topWahanaUrls, token);

  // 3. Site 3: LSP APKONT
  const apkontSitemapUrls = await fetchSitemapUrls('https://lsp-apkont.net/sitemap.xml', 'lsp-apkont.net');
  const topApkontUrls = apkontSitemapUrls.slice(0, 50);
  await pushSite('3. LSP APKONT', 'lsp-apkont.net', topApkontUrls, token);

  console.log(`=============================================================`);
  console.log(`🎉 ALL 3 SITES PROCESSED ONE BY ONE WITH GOOGLE INDEXING API!`);
  console.log(`=============================================================\n`);
}

run().catch(err => console.error('Execution Error:', err));