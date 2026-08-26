import fs from 'fs';
import path from 'path';

const logFile = path.join(process.cwd(), '404_audit_logs.json');

if (!fs.existsSync(logFile)) {
  console.log('ℹ️ No 404 logs recorded yet in local 404_audit_logs.json.');
  console.log('ℹ️ You can also inspect live 404 logs via API: https://penaconsultant.com/api/log-404');
  process.exit(0);
}

const data = JSON.parse(fs.readFileSync(logFile, 'utf8'));
console.log(`\n📋 Captured ${data.length} Unique 404 URLs:\n`);
console.table(data.map(d => ({
  Path: d.path,
  Hits: d.hits,
  'Last Seen': d.last_seen,
  'Referrer': d.referrers.slice(0, 2).join(', '),
})));

console.log('\n💡 Suggested next.config.mjs Redirects:\n');
console.log(JSON.stringify(data.map(d => ({
  source: d.path,
  destination: '/pelatihan',
  permanent: true,
})), null, 2));