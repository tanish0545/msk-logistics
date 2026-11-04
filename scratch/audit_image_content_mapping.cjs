const fs = require('fs');
const path = require('path');

const targetPages = [
  { name: 'Home', file: 'src/pages/HomePage.tsx' },
  { name: 'About', file: 'src/pages/AboutPage.tsx' },
  { name: 'Services', file: 'src/pages/ServicesPage.tsx' },
  { name: 'Import & Export', file: 'src/pages/ImportExportPage.tsx' },
  { name: 'Container Guide', file: 'src/pages/ContainerGuidePage.tsx' },
  { name: 'Warehouse', file: 'src/pages/WarehousePage.tsx' },
  { name: 'Operations', file: 'src/pages/OperationsPage.tsx' },
  { name: 'Cargo Lashing', file: 'src/pages/CargoLashingPage.tsx' },
  { name: 'Container Stuffing', file: 'src/pages/ContainerStuffingPage.tsx' },
  { name: 'Contact', file: 'src/pages/ContactPage.tsx' },
  { name: 'Export Packaging', file: 'src/pages/ExportPackagingPage.tsx' },
  { name: 'Branches', file: 'src/pages/BranchesPage.tsx' },
  { name: 'Clients', file: 'src/pages/ClientsPage.tsx' },
  { name: 'Staff', file: 'src/pages/StaffPage.tsx' },
  { name: 'Knowledge', file: 'src/pages/KnowledgePage.tsx' },
  { name: 'How It Works', file: 'src/pages/HowItWorksPage.tsx' }
];

const dataFiles = [
  'src/data/containerGuideData.ts',
  'src/data/warehouseData.ts',
  'src/data/imageAssets.ts',
  'src/data/shipmentGalleryData.ts',
  'src/data/company.ts'
];

console.log('Auditing image-to-content across pages and data sources...');

const results = [];

for (const p of targetPages) {
  if (!fs.existsSync(p.file)) continue;
  const content = fs.readFileSync(p.file, 'utf8');
  const matches = content.match(/['"](\/images\/[^'"]+)['"]/g) || [];
  const cleanMatches = [...new Set(matches.map(m => m.slice(1, -1)))];
  
  for (const imgUrl of cleanMatches) {
    results.push({
      page: p.name,
      file: p.file,
      url: imgUrl,
      source: 'Page JSX'
    });
  }
}

for (const df of dataFiles) {
  if (!fs.existsSync(df)) continue;
  const content = fs.readFileSync(df, 'utf8');
  const matches = content.match(/['"](\/images\/[^'"]+)['"]/g) || [];
  const cleanMatches = [...new Set(matches.map(m => m.slice(1, -1)))];
  
  for (const imgUrl of cleanMatches) {
    results.push({
      page: path.basename(df, path.extname(df)),
      file: df,
      url: imgUrl,
      source: 'Data File'
    });
  }
}

console.log(`Total image usage references recorded: ${results.length}`);
fs.writeFileSync('scratch/page_image_mapping.json', JSON.stringify(results, null, 2));

