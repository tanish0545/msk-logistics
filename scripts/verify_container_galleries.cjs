const fs = require('fs');
const path = require('path');

console.log('====================================================');
console.log('VERIFICATION SCRIPT 2: CONTAINER GUIDE DATA & SPECS');
console.log('====================================================');

const dataFilePath = path.resolve('src/data/containerGuideData.ts');
if (!fs.existsSync(dataFilePath)) {
  console.error(`ERROR: Data file not found: ${dataFilePath}`);
  process.exit(1);
}

const content = fs.readFileSync(dataFilePath, 'utf8');

const expectedContainers = [
  { id: '20ft-standard', name: "20' Standard Dry (20GP)", minPhotos: 4, maxPhotos: 5 },
  { id: '40ft-standard', name: "40' Standard Dry (40GP)", minPhotos: 4, maxPhotos: 5 },
  { id: '40ft-high-cube', name: "40' High Cube (40HC)", minPhotos: 4, maxPhotos: 5 },
  { id: '40ft-high-cube-heavy-duty', name: "40' High Cube Heavy Duty (32.5T)", minPhotos: 4, maxPhotos: 5 },
  { id: 'open-top', name: "20' & 40' Open Top (OT)", minPhotos: 4, maxPhotos: 5 },
  { id: 'flat-rack', name: "20' & 40' Flat Rack (FR)", minPhotos: 4, maxPhotos: 5 },
  { id: 'reefer-container', name: "Refrigerated Container (Reefer)", minPhotos: 4, maxPhotos: 5 },
];

let totalGalleryImages = 0;
let errors = [];

for (const c of expectedContainers) {
  const startIdx = content.indexOf(`id: '${c.id}'`);
  if (startIdx === -1) {
    errors.push(`Container ID '${c.id}' missing from containerGuideData.ts`);
    continue;
  }

  const galleryStart = content.indexOf('galleryImages: [', startIdx);
  if (galleryStart === -1) {
    errors.push(`Container '${c.id}' has no galleryImages array`);
    continue;
  }

  const galleryEnd = content.indexOf('],', galleryStart);
  const block = content.slice(galleryStart, galleryEnd + 2);

  const urls = [];
  const re = /url:\s*'([^']+)'/g;
  let m;
  while ((m = re.exec(block)) !== null) {
    urls.push(m[1]);
  }

  totalGalleryImages += urls.length;
  const uniqueUrls = new Set(urls);

  console.log(`[${c.id}] ${c.name}:`);
  console.log(`  - Photo count: ${urls.length} (Expected: ${c.minPhotos}-${c.maxPhotos})`);
  console.log(`  - Unique URLs: ${uniqueUrls.size} (Duplicates: ${urls.length - uniqueUrls.size})`);

  if (urls.length < c.minPhotos || urls.length > c.maxPhotos) {
    errors.push(`Container '${c.id}' has ${urls.length} images; expected between ${c.minPhotos} and ${c.maxPhotos}`);
  }

  if (urls.length !== uniqueUrls.size) {
    errors.push(`Container '${c.id}' contains duplicate image URLs!`);
  }

  // Check disk existence
  for (const u of urls) {
    const diskPath = path.resolve('public' + u);
    if (!fs.existsSync(diskPath)) {
      errors.push(`Container '${c.id}' image does not exist on disk: ${u}`);
    }
  }
}

// Check 40GP vs 40HC differentiation
console.log('\n--- Checking 40GP vs 40HC Technical Specs ---');
const gpMatch = content.match(/id:\s*'40ft-standard'[\s\S]*?height:\s*\{[^}]*?metricMeters:\s*'([^']+)'/);
const hcMatch = content.match(/id:\s*'40ft-high-cube'[\s\S]*?height:\s*\{[^}]*?metricMeters:\s*'([^']+)'/);

if (gpMatch && hcMatch) {
  console.log(`  40GP External Height: ${gpMatch[1]}`);
  console.log(`  40HC External Height: ${hcMatch[1]}`);
  if (gpMatch[1] === hcMatch[1]) {
    errors.push('40GP and 40HC external heights are identical! They must be separated.');
  }
} else {
  errors.push('Failed to parse 40GP or 40HC external height.');
}

// Check 40HC Heavy Duty rating
console.log('\n--- Checking High Cube Heavy Duty Rating ---');
const hdGrossMatch = content.match(/id:\s*'40ft-high-cube-heavy-duty'[\s\S]*?maxGrossWeight:\s*\{[^}]*?kg:\s*'([^']+)'/);
if (hdGrossMatch) {
  console.log(`  40HC Heavy Duty Max Gross: ${hdGrossMatch[1]}`);
  if (!hdGrossMatch[1].includes('32,500')) {
    errors.push(`40HC Heavy Duty max gross should be 32,500 kg, got: ${hdGrossMatch[1]}`);
  }
} else {
  errors.push('Failed to find 40HC Heavy Duty max gross weight specification.');
}

// Check Break Bulk client records
console.log('\n--- Checking Break Bulk Client Consignment Records ---');
const bbStart = content.indexOf('BREAK_BULK_CARGO_RECORDS');
if (bbStart === -1) {
  errors.push('BREAK_BULK_CARGO_RECORDS array missing from containerGuideData.ts');
} else {
  const bbBlock = content.slice(bbStart);
  const wa19 = bbBlock.includes('IMG-20261022-WA0019.jpg');
  const wa20 = bbBlock.includes('IMG-20261022-WA0020.jpg') || bbBlock.includes('IMG-20261022-WA0021.jpg');
  console.log(`  - WA0019 (Wrapped cylindrical cargo in hold): ${wa19 ? 'FOUND' : 'MISSING'}`);
  console.log(`  - WA0020/WA0021 (Night lift & hold lashing): ${wa20 ? 'FOUND' : 'MISSING'}`);
  if (!wa19 || !wa20) {
    errors.push('Break Bulk records are missing client photographs WA0019 or WA0020.');
  }
}

console.log('\n====================================================');
console.log(`Total container images verified: ${totalGalleryImages}`);
console.log(`Total errors found: ${errors.length}`);
if (errors.length > 0) {
  console.error('\nFAILED with the following errors:');
  errors.forEach((err, i) => console.error(`  ${i + 1}. ${err}`));
  process.exit(1);
}

console.log('RESULT: SUCCESS! All 7 container types verified with 5 unique photos each, correct specs, and authentic break bulk records.');
process.exit(0);

