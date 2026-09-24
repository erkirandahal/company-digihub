// Copies the Vite build (dist/) into backend/public so Laravel serves it.
// Run with: npm run build:cpanel
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const pub = path.join(root, 'backend', 'public');

if (!fs.existsSync(path.join(dist, 'index.html'))) {
  console.error('dist/index.html not found - did vite build fail?');
  process.exit(1);
}

// Remove the old hashed JS/CSS so they don't pile up
fs.rmSync(path.join(pub, 'assets'), { recursive: true, force: true });

// Copy everything from dist/ into backend/public (never touches index.php, .htaccess, storage)
for (const entry of fs.readdirSync(dist)) {
  if (['index.php', '.htaccess', 'storage'].includes(entry)) continue;
  fs.cpSync(path.join(dist, entry), path.join(pub, entry), { recursive: true });
}

const env = fs.existsSync(path.join(root, '.env.production'))
  ? fs.readFileSync(path.join(root, '.env.production'), 'utf8').trim()
  : '(no .env.production!)';
console.log('Copied dist/ -> backend/public');
console.log('Built with: ' + env);
