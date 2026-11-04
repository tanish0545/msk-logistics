const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'archive_unused_20261103');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log('Created archive folder:', targetDir);
}

const filesToArchive = [
  'public/images/hero/layer-forklift.png',
  'public/images/hero/layer-plane.png',
  'public/images/hero/layer-ship.png',
  'public/images/hero/layer-train.png',
  'public/images/hero/layer-truck.png',
  'public/images/hero/temp_plane_area.png',
  'public/images/hero/cinematic-port-hero-unified.jpg',
  'public/images/hero/concept09-port-background.jpg',
  'public/images/hero/hero-transport-environment.png'
];

let movedCount = 0;
let totalBytes = 0;

for (const relPath of filesToArchive) {
  const fullPath = path.join(__dirname, '..', relPath);
  if (fs.existsSync(fullPath)) {
    const filename = path.basename(fullPath);
    const dest = path.join(targetDir, filename);
    const size = fs.statSync(fullPath).size;
    fs.renameSync(fullPath, dest);
    movedCount++;
    totalBytes += size;
    console.log(`Archived ${filename} (${(size / 1024 / 1024).toFixed(2)} MB)`);
  } else {
    console.log(`File not found, skipping: ${relPath}`);
  }
}

console.log(`Archived ${movedCount} files totaling ${(totalBytes / 1024 / 1024).toFixed(2)} MB to ${targetDir}`);

