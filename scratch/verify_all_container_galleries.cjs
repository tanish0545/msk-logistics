const fs = require('fs');
const content = fs.readFileSync('src/data/containerGuideData.ts', 'utf8');

const containerIds = [
  '20ft-standard',
  '40ft-standard',
  '40ft-high-cube',
  '40ft-high-cube-heavy-duty',
  'open-top',
  'flat-rack',
  'reefer-container'
];

let totalGalleries = 0;
let hasDuplicateInAny = false;

for (const id of containerIds) {
  const start = content.indexOf(`id: '${id}'`);
  if (start === -1) {
    console.log('MISSING:', id);
    continue;
  }
  const galleryStart = content.indexOf('galleryImages: [', start);
  const galleryEnd = content.indexOf('],', galleryStart);
  const block = content.slice(galleryStart, galleryEnd + 2);
  const urls = [];
  const re = /url:\s*'([^']+)'/g;
  let m;
  while ((m = re.exec(block)) !== null) {
    urls.push(m[1]);
  }
  totalGalleries += urls.length;
  const uniqueUrls = new Set(urls);
  const hasDup = urls.length !== uniqueUrls.size;
  if (hasDup) hasDuplicateInAny = true;
  console.log(`Container: ${id}`);
  console.log(`  Count: ${urls.length}, Unique: ${uniqueUrls.size}, Duplicates: ${hasDup ? 'YES' : 'NONE'}`);
  urls.forEach((u, i) => console.log(`    ${i + 1}. ${u}`));
}

console.log(`\nTotal container gallery images: ${totalGalleries} across 7 types.`);
console.log(`Any duplicates within same container? ${hasDuplicateInAny ? 'YES (FAIL)' : 'NO (PASS)'}`);

