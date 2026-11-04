const fs = require('fs');
const path = require('path');

console.log('====================================================');
console.log('VERIFICATION SCRIPT 1: PROJECT IMAGE ASSET EXISTENCE');
console.log('====================================================');

const filesToScan = [
  'src/data/containerGuideData.ts',
  'src/data/warehouseData.ts',
  'src/data/imageAssets.ts',
  'src/pages/WarehousePage.tsx',
  'src/pages/ContainerGuidePage.tsx',
  'src/pages/CargoLashingPage.tsx',
  'src/pages/OperationsPage.tsx',
  'src/pages/HomePage.tsx',
  'src/components/hero/HeroConcept09.tsx'
];

let totalReferences = 0;
let missingImages = [];
let zeroByteImages = [];
let verifiedImages = new Set();

for (const relFile of filesToScan) {
  const fullFilePath = path.resolve(relFile);
  if (!fs.existsSync(fullFilePath)) {
    console.error(`ERROR: Source file not found: ${relFile}`);
    process.exit(1);
  }
  const content = fs.readFileSync(fullFilePath, 'utf8');
  // Match paths starting with /images/
  const regex = /\/images\/[a-zA-Z0-9_\-\.\/]+/g;
  const matches = content.match(regex) || [];

  for (const rawUrl of matches) {
    const cleanUrl = rawUrl.replace(/['",\)]+$/, '');
    totalReferences++;
    verifiedImages.add(cleanUrl);

    const diskPath = path.resolve('public' + cleanUrl);
    if (!fs.existsSync(diskPath)) {
      missingImages.push({ sourceFile: relFile, url: cleanUrl, diskPath });
    } else {
      const stat = fs.statSync(diskPath);
      if (stat.size === 0) {
        zeroByteImages.push({ sourceFile: relFile, url: cleanUrl, size: stat.size });
      }
    }
  }
}

console.log(`Source files audited: ${filesToScan.length}`);
console.log(`Total image occurrences found: ${totalReferences}`);
console.log(`Unique image paths referenced: ${verifiedImages.size}`);
console.log(`Missing images count: ${missingImages.length}`);
console.log(`Zero-byte images count: ${zeroByteImages.length}`);

if (missingImages.length > 0) {
  console.error('\nFAILED: The following referenced images were NOT found on disk:');
  missingImages.forEach((m, idx) => {
    console.error(`  ${idx + 1}. [${m.sourceFile}] -> ${m.url}`);
  });
  process.exit(1);
}

if (zeroByteImages.length > 0) {
  console.error('\nFAILED: The following referenced images have 0 bytes:');
  zeroByteImages.forEach((z, idx) => {
    console.error(`  ${idx + 1}. [${z.sourceFile}] -> ${z.url}`);
  });
  process.exit(1);
}

console.log('\nRESULT: SUCCESS! 100% of referenced image assets exist on disk and have valid file sizes.');
process.exit(0);

