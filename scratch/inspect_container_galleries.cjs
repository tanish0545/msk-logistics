const fs = require('fs');
const content = fs.readFileSync('src/data/containerGuideData.ts', 'utf8');
const types = [
  '20ft-standard',
  '40ft-standard',
  '40ft-high-cube',
  '40ft-high-cube-heavy-duty',
  'open-top',
  'flat-rack',
  'reefer'
];

for (const t of types) {
  const blockStart = content.indexOf(`id: '${t}'`);
  if (blockStart === -1) {
    console.log(t, 'MISSING BLOCK');
    continue;
  }
  const galleryStart = content.indexOf('galleryImages: [', blockStart);
  const galleryEnd = content.indexOf('],', galleryStart);
  const block = content.slice(galleryStart, galleryEnd + 2);
  const matches = block.match(/url:\s*'([^']+)'/g) || [];
  console.log(`\n=== Container: ${t} (Count: ${matches.length}) ===`);
  matches.forEach((m, idx) => {
    console.log(`  ${idx + 1}. ${m}`);
  });
}

