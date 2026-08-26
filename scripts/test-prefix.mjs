import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const KEY_FILE = path.join(process.cwd(), 'scripts', 'service_account.json');
const keyData = JSON.parse(fs.readFileSync(KEY_FILE, 'utf8'));

function base64UrlEncode(str) {
  return Buffer.from(str).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
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
  const signature = signer.sign(keyData.private_key, 'base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  const jwt = `${signatureInput}.${signature}`;
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });

  const data = await res.json();
  return data.access_token;
}

async function testUrl(url, token) {
  const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ url: url, type: 'URL_UPDATED' }),
  });
  const result = await res.json();
  console.log(`Testing [${url}] => Status ${res.status}: ${res.status === 200 ? '✓ 200 OK (VERIFIED!)' : (result.error?.message || 'Error')}`);
}

async function run() {
  const token = await getGoogleAccessToken();
  console.log('✓ Testing URL variations against your Google Search Console properties:\n');

  // Test PENA Consultant
  await testUrl('https://penaconsultant.com/', token);
  await testUrl('https://www.penaconsultant.com/', token);
  await testUrl('http://penaconsultant.com/', token);
  await testUrl('http://www.penaconsultant.com/', token);

  // Test Wahana Totalita
  await testUrl('https://wahanatotalita.com/', token);
  await testUrl('https://www.wahanatotalita.com/', token);

  // Test LSP APKONT
  await testUrl('https://lsp-apkont.net/', token);
  await testUrl('https://www.lsp-apkont.net/', token);
  await testUrl('http://lsp-apkont.net/', token);
  await testUrl('http://www.lsp-apkont.net/', token);
}

run();