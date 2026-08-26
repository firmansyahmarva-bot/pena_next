import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const KEY_FILE = path.join(process.cwd(), 'scripts', 'service_account.json');
const QUEUE_FILE = path.join(process.cwd(), 'scripts', 'indexing_queue.json');
const RECORD_FILE = path.join(process.cwd(), 'INDEXING_DISPATCH_RECORD.md');

if (!fs.existsSync(KEY_FILE)) {
  console.error('❌ Missing scripts/service_account.json');
  process.exit(1);
}

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
  if (!data.access_token) throw new Error(`Google Auth Failed: ${JSON.stringify(data)}`);
  return data.access_token;
}

async function submitUrl(url, token) {
  const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ url: url, type: 'URL_UPDATED' }),
  });
  const result = await res.json();
  return { status: res.status, result };
}

async function run() {
  if (!fs.existsSync(QUEUE_FILE)) {
    console.error('❌ Missing scripts/indexing_queue.json');
    process.exit(1);
  }

  const queue = JSON.parse(fs.readFileSync(QUEUE_FILE, 'utf8'));
  const pending = queue.pending_tomorrow || [];

  if (pending.length === 0) {
    console.log('🎉 All URLs have already been submitted! Queue is complete.');
    process.exit(0);
  }

  console.log(`\n=============================================================`);
  console.log(`🔑 GOOGLE INDEXING BATCH DISPATCHER`);
  console.log(`📧 Service Account: ${keyData.client_email}`);
  console.log(`📦 Remaining Queue Size: ${pending.length}`);
  console.log(`⚡ Batch Limit for Today: 200 URLs`);
  console.log(`=============================================================\n`);

  console.log('🔄 Authenticating with Google Cloud OAuth2...');
  const token = await getGoogleAccessToken();
  console.log('✓ Successfully authenticated!\n');

  const batchToPush = pending.slice(0, 195);
  const remainingAfterBatch = pending.slice(195);

  let successCount = 0;
  const newlyPushed = [];

  for (let i = 0; i < batchToPush.length; i++) {
    const url = batchToPush[i];
    process.stdout.write(`[${i + 1}/${batchToPush.length}] ${url} ... `);

    try {
      const { status, result } = await submitUrl(url, token);
      if (status === 200) {
        console.log(`✓ 200 OK (Googlebot Dispatched)`);
        successCount++;
        newlyPushed.push({
          url,
          status: '200 OK',
          dispatched_at: new Date().toISOString().split('T')[0],
          engine: 'Google Indexing API',
        });
      } else {
        console.log(`⚠️ Status ${status}: ${result.error?.message || JSON.stringify(result)}`);
        if (result.error?.code === 429) {
          console.log('\n🛑 Google daily quota limit reached (200 requests/day).');
          break;
        }
      }
    } catch (err) {
      console.log(`❌ Error: ${err.message}`);
    }

    await new Promise(r => setTimeout(r, 120));
  }

  // Update Queue File
  queue.pushed_today = [...(queue.pushed_today || []), ...newlyPushed];
  queue.total_pushed_today = queue.pushed_today.length;
  queue.pending_tomorrow = remainingAfterBatch;
  queue.total_pending_tomorrow = remainingAfterBatch.length;
  queue.last_updated = new Date().toISOString();
  fs.writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2), 'utf8');

  console.log(`\n=============================================================`);
  console.log(`🎉 BATCH FINISHED!`);
  console.log(`✓ Successfully Pushed in this Run: ${successCount}`);
  console.log(`📦 Remaining for Next Run: ${remainingAfterBatch.length}`);
  console.log(`💾 Updated records in scripts/indexing_queue.json & INDEXING_DISPATCH_RECORD.md`);
  console.log(`=============================================================\n`);
}

run().catch(err => console.error('Execution Error:', err));