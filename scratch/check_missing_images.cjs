const fs = require('fs');

const filesToCheck = [
  'src/data/containerGuideData.ts',
  'src/data/warehouseData.ts',
  'src/data/imageAssets.ts',
  'src/pages/WarehousePage.tsx',
  'src/pages/ContainerGuidePage.tsx',
  'src/pages/CargoLashingPage.tsx',
  'src/pages/OperationsPage.tsx'
];

let missing = [];
for (const f of filesToCheck) {
  if (!fs.existsSync(f)) {
    console.log('File does not exist:', f);
    continue;
  }
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.match(/\/images\/[a-zA-Z0-9_\-\.\/]+/g) || [];
  for (const m of matches) {
    // clean up any trailing quote or punctuation
    const clean = m.replace(/['",\)]+$/, '');
    const diskPath = 'public' + clean;
    if (!fs.existsSync(diskPath)) {
      missing.push({ file: f, url: clean, diskPath });
    }
  }
}

console.log('Total checked files:', filesToCheck.length);
console.log('Missing images count:', missing.length);
if (missing.length > 0) {
  console.log('Missing images details:', JSON.stringify(missing, null, 2));
} else {
  console.log('ALL images referenced across these files exist on disk!');
}

