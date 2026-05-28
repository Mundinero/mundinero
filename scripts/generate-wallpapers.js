const fs   = require('fs');
const path = require('path');

const WALLPAPERS_DIR = 'Wallpapers';
const INDEX_PATH     = 'index.html';

const files = fs.readdirSync(WALLPAPERS_DIR)
  .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
  .map(f => f.normalize('NFC'))
  .sort();

const entries = files.map(file => {
  const base = file.replace(/\.[^.]+$/, '');
  const firstUnderscore = base.indexOf('_');

  let credit;
  if (firstUnderscore === -1) {
    credit = base;
  } else {
    const author   = base.slice(0, firstUnderscore);
    const location = base.slice(firstUnderscore + 1).split('_').join(', ');
    credit = `${author} · ${location}`;
  }

  const src = `${WALLPAPERS_DIR}/${file}`;
  return `  { src: '${src}', credit: '${credit}' }`;
});

const arrayStr = `[\n${entries.join(',\n')},\n]`;

let html = fs.readFileSync(INDEX_PATH, 'utf8');
html = html.replace(
  /const WALLPAPERS = \[[\s\S]*?\];/,
  `const WALLPAPERS = ${arrayStr};`
);
fs.writeFileSync(INDEX_PATH, html);

console.log(`Wallpapers actualizados: ${entries.length} imágenes`);
entries.forEach(e => console.log(' ', e.trim()));
