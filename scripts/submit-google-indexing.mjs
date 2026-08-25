/**
 * Standalone Google Indexing API Submitter
 * To use:
 * 1. Create a Service Account in Google Cloud Console with Indexing API enabled.
 * 2. Add the Service Account email as an Owner in Google Search Console.
 * 3. Place your service account JSON key at `scripts/service_account.json`.
 * 4. Run: `node scripts/submit-google-indexing.mjs`
 */
import fs from 'fs';
import path from 'path';

const KEY_FILE = path.join(process.cwd(), 'scripts', 'service_account.json');

if (!fs.existsSync(KEY_FILE)) {
  console.log('ℹ️ Notice: Place your Google Cloud service account key at `scripts/service_account.json` to enable automated Google Indexing API batch pushes.');
  process.exit(0);
}

console.log('✓ Found service_account.json, initializing Google Indexing API client...');