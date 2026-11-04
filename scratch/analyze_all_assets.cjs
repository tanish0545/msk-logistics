const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Helper to parse image dimensions from buffer without third-party dependencies
function getImageDimensions(buffer, ext) {
  try {
    if (ext === '.png') {
      if (buffer.length >= 24 && buffer.toString('ascii', 1, 4) === 'PNG') {
        const width = buffer.readUInt32BE(16);
        const height = buffer.readUInt32BE(20);
        return { width, height, type: 'png' };
      }
    } else if (ext === '.jpg' || ext === '.jpeg') {
      let offset = 2;
      while (offset < buffer.length) {
        if (buffer[offset] !== 0xFF) break;
        const marker = buffer[offset + 1];
        if (marker === 0xC0 || marker === 0xC1 || marker === 0xC2) {
          const height = buffer.readUInt16BE(offset + 5);
          const width = buffer.readUInt16BE(offset + 7);
          return { width, height, type: 'jpg' };
        }
        const len = buffer.readUInt16BE(offset + 2);
        offset += 2 + len;
      }
    } else if (ext === '.webp') {
      if (buffer.length >= 30 && buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') {
        const chunkHeader = buffer.toString('ascii', 12, 16);
        if (chunkHeader === 'VP8 ') {
          const width = buffer.readUInt16LE(26) & 0x3fff;
          const height = buffer.readUInt16LE(28) & 0x3fff;
          return { width, height, type: 'webp (VP8)' };
        } else if (chunkHeader === 'VP8L') {
          const b1 = buffer[21];
          const b2 = buffer[22];
          const b3 = buffer[23];
          const b4 = buffer[24];
          const width = 1 + (((b2 & 0x3f) << 8) | b1);
          const height = 1 + (((b4 & 0x0f) << 10) | (b3 << 2) | ((b2 & 0xc0) >> 6));
          return { width, height, type: 'webp (VP8L)' };
        } else if (chunkHeader === 'VP8X') {
          const width = 1 + buffer.readUIntLE(24, 3);
          const height = 1 + buffer.readUIntLE(27, 3);
          return { width, height, type: 'webp (VP8X)' };
        }
      }
    } else if (ext === '.svg') {
      const str = buffer.toString('utf8', 0, Math.min(2000, buffer.length));
      const wMatch = str.match(/width=["'](\d+)(?:px)?["']/i);
      const hMatch = str.match(/height=["'](\d+)(?:px)?["']/i);
      const vbMatch = str.match(/viewBox=["']\s*[\d\.\-]+\s+[\d\.\-]+\s+([\d\.\-]+)\s+([\d\.\-]+)\s*["']/i);
      if (wMatch && hMatch) {
        return { width: parseInt(wMatch[1], 10), height: parseInt(hMatch[1], 10), type: 'svg' };
      } else if (vbMatch) {
        return { width: Math.round(parseFloat(vbMatch[1])), height: Math.round(parseFloat(vbMatch[2])), type: 'svg' };
      }
      return { width: 'Vector', height: 'Vector', type: 'svg' };
    }
  } catch (e) {}
  return { width: 'Unknown', height: 'Unknown', type: ext.slice(1) };
}

function findFiles(dir, exts) {
  let list = [];
  if (!fs.existsSync(dir)) return list;
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (item !== 'node_modules' && item !== '.git' && item !== 'dist') {
        list = list.concat(findFiles(full, exts));
      }
    } else {
      const ext = path.extname(item).toLowerCase();
      if (exts.includes(ext)) {
        list.push(full);
      }
    }
  }
  return list;
}

// 1. Collect all project code files
const codeFiles = findFiles('src', ['.ts', '.tsx', '.css', '.json'])
  .concat(findFiles('api', ['.ts', '.json']))
  .concat(['index.html', 'vite.config.ts']);

console.log(`Found ${codeFiles.length} source code files to scan for image references.`);

// Build full text search blob of all code files
const codeContents = codeFiles.map(f => ({
  file: f,
  content: fs.readFileSync(f, 'utf8')
}));

// 2. Collect all images in public and src
const imageDirs = ['public', 'src/assets'];
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'];
let allImageFiles = [];
for (const d of imageDirs) {
  allImageFiles = allImageFiles.concat(findFiles(d, imageExtensions));
}

console.log(`Found ${allImageFiles.length} total image asset files on disk.`);

// 3. Analyze each image asset
const assetInventory = [];
const hashGroups = new Map();

for (const imgPath of allImageFiles) {
  const normPath = imgPath.replace(/\\/g, '/');
  const buffer = fs.readFileSync(imgPath);
  const ext = path.extname(imgPath).toLowerCase();
  const dims = getImageDimensions(buffer, ext);
  const size = buffer.length;

  // Compute SHA-256 for exact binary duplicate detection
  const sha256 = crypto.createHash('sha256').update(buffer).digest('hex');
  if (!hashGroups.has(sha256)) {
    hashGroups.set(sha256, []);
  }
  hashGroups.get(sha256).push(normPath);

  // Search usage in code
  const filename = path.basename(normPath);
  // Match path as used in public, e.g. /images/... or relative import
  const publicRef = normPath.startsWith('public/') ? normPath.replace('public', '') : normPath;
  
  const usages = [];
  for (const c of codeContents) {
    if (c.content.includes(publicRef) || c.content.includes(filename)) {
      usages.push(c.file);
    }
  }

  assetInventory.push({
    diskPath: normPath,
    publicRef,
    filename,
    ext,
    size,
    width: dims.width,
    height: dims.height,
    type: dims.type,
    sha256,
    usages,
    isUsed: usages.length > 0
  });
}

// Identify duplicates
const duplicateGroups = [];
for (const [hash, paths] of hashGroups.entries()) {
  if (paths.length > 1) {
    duplicateGroups.push({ hash, paths });
  }
}

console.log(`Unique hashes: ${hashGroups.size}`);
console.log(`Duplicate hash groups (exact identical content): ${duplicateGroups.length}`);
console.log(`Total images in duplicate groups: ${duplicateGroups.reduce((acc, g) => acc + g.paths.length, 0)}`);

const unusedAssets = assetInventory.filter(a => !a.isUsed);
console.log(`Unused images: ${unusedAssets.length}`);
console.log(`Used images: ${assetInventory.length - unusedAssets.length}`);

// Save analysis to JSON for reports
fs.writeFileSync('scratch/asset_analysis.json', JSON.stringify({
  totalImages: assetInventory.length,
  duplicateGroups,
  unusedCount: unusedAssets.length,
  usedCount: assetInventory.length - unusedAssets.length,
  inventory: assetInventory
}, null, 2));

console.log('Saved detailed asset analysis to scratch/asset_analysis.json');

