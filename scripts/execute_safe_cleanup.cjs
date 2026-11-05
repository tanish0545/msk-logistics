const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PROJECT_ROOT = 'c:/MSK-Logistics';
const ARCHIVE_ROOT = 'C:/MSK-Logistics-Cleanup-Archive';

function hashFile(p) {
  if (!fs.existsSync(p)) return null;
  const stat = fs.statSync(p);
  if (stat.isDirectory()) return null;
  return crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
}

function safeMoveFile(srcRel, archiveSubdir, reason, classification) {
  const srcFull = path.join(PROJECT_ROOT, srcRel);
  if (!fs.existsSync(srcFull)) {
    console.warn('Source does not exist, skipping:', srcRel);
    return null;
  }
  const stat = fs.statSync(srcFull);
  const size = stat.size;
  const hash = hashFile(srcFull);
  const destFull = path.join(ARCHIVE_ROOT, archiveSubdir, path.basename(srcRel));

  fs.mkdirSync(path.dirname(destFull), { recursive: true });
  fs.copyFileSync(srcFull, destFull);
  fs.unlinkSync(srcFull);

  return {
    file: path.basename(srcRel),
    originalFolder: path.dirname(srcRel),
    size,
    classification,
    reason,
    hash,
    archivedTo: path.relative(ARCHIVE_ROOT, destFull)
  };
}

function safeMoveDirectory(srcRel, archiveSubdir, reason, classification) {
  const srcFull = path.join(PROJECT_ROOT, srcRel);
  if (!fs.existsSync(srcFull)) {
    console.warn('Source dir does not exist, skipping:', srcRel);
    return [];
  }

  const results = [];
  function copyAndRemove(srcDir, destDir) {
    fs.mkdirSync(destDir, { recursive: true });
    for (const f of fs.readdirSync(srcDir)) {
      const sPath = path.join(srcDir, f);
      const dPath = path.join(destDir, f);
      const st = fs.statSync(sPath);
      if (st.isDirectory()) {
        copyAndRemove(sPath, dPath);
        fs.rmdirSync(sPath);
      } else {
        const sz = st.size;
        const h = crypto.createHash('sha256').update(fs.readFileSync(sPath)).digest('hex');
        fs.copyFileSync(sPath, dPath);
        fs.unlinkSync(sPath);
        results.push({
          file: f,
          originalFolder: path.relative(PROJECT_ROOT, path.dirname(sPath)),
          size: sz,
          classification,
          reason,
          hash: h,
          archivedTo: path.relative(ARCHIVE_ROOT, dPath)
        });
      }
    }
  }

  const destFull = path.join(ARCHIVE_ROOT, archiveSubdir);
  copyAndRemove(srcFull, destFull);
  if (fs.existsSync(srcFull)) {
    try { fs.rmdirSync(srcFull); } catch (e) {}
  }

  return results;
}

const manifest = [];

console.log('=== Step 1: Moving Video Duplicates & Disposable Files ===');
const v1 = safeMoveFile('public/videos/logistics-hero2.mp4', 'public/videos', 'Exact byte-for-byte duplicate of logistics-hero2-v2.mp4', 'Duplicate');
if (v1) manifest.push(v1);

const v2 = safeMoveFile('public/videos/logistics-hero.mp4', 'public/videos', '0-byte empty file placeholder', 'Testing artifact');
if (v2) manifest.push(v2);

const v3 = safeMoveFile('public/videos/Website Content.doc', 'public/videos', 'Client text document placed in videos folder', 'Archived document');
if (v3) manifest.push(v3);

console.log('=== Step 2: Moving Obsolete Hero Layers (archive_unused_20261103) ===');
const archFiles = safeMoveDirectory('public/images/archive_unused_20261103', 'public/images/archive_unused_20261103', 'Obsolete multi-layer canvas hero test assets', 'Testing artifact');
manifest.push(...archFiles);

console.log('=== Step 3: Moving Intermediate Raw Hero Export ===');
const h1 = safeMoveFile('public/images/hero/msk-cinematic-port-raw.png', 'public/images/hero', 'Intermediate raw uncropped hero export before final approved asset', 'Testing artifact');
if (h1) manifest.push(h1);

console.log('=== Step 4: Moving Root Test Files & Audits ===');
const r1 = safeMoveFile('test_drive_img.jpg', 'root', 'Test drive photo placed in root directory', 'Testing artifact');
if (r1) manifest.push(r1);

const r2 = safeMoveFile('capture_circular_mark.cjs', 'root', 'Ad-hoc screenshot test script', 'Testing artifact');
if (r2) manifest.push(r2);

const audits = [
  'IMAGE_ASSET_INVENTORY.md',
  'IMAGE_CONTENT_MAPPING.md',
  'MSK_CLIENT_REQUIREMENTS_AUDIT.md',
  'PROJECT_RECOVERY_AUDIT.md',
  'RECOVERY_ACTION_PLAN.md',
  'UNUSED_FILES_REVIEW.md'
];
for (const a of audits) {
  const m = safeMoveFile(a, 'audits', 'Historical Antigravity session audit report', 'Temporary report');
  if (m) manifest.push(m);
}

console.log('=== Step 5: Moving Obsolete Code & Pages in src/ ===');
const c1 = safeMoveFile('src/components/container-guide/TechnicalContainerInspector.tsx', 'src/components/container-guide', 'Section explicitly removed from Container Guide by client command', 'Unused component');
if (c1) manifest.push(c1);

const c2 = safeMoveFile('src/pages/WarehousingPage.tsx', 'src/pages', 'Old stub page replaced by complete WarehousePage.tsx', 'Unused page stub');
if (c2) manifest.push(c2);

console.log('=== Step 6: Moving One-off Patch Scripts ===');
const patchScripts = [
  'scripts/patch_navbar.cjs',
  'scripts/patch_navbar_idea08.cjs',
  'scripts/update_hub_container.cjs',
  'scripts/check_pid_details.cjs',
  'scripts/archive_unused_hero_assets.cjs',
  'scripts/test_screenshot_now.cjs'
];
for (const s of patchScripts) {
  const m = safeMoveFile(s, 'scripts', 'One-off patch or diagnostic script from earlier task', 'Temporary script');
  if (m) manifest.push(m);
}

console.log('=== Step 7: Moving scratch/ Directory (950 files, 85 MB) ===');
const scratchFiles = safeMoveDirectory('scratch', 'scratch', 'Temporary Chrome browser test profiles, crop pngs, and test email htmls', 'Development artifact');
manifest.push(...scratchFiles);

console.log('\nTotal items safely moved to archive:', manifest.length);

const totalBytes = manifest.reduce((acc, cur) => acc + cur.size, 0);
console.log('Total disk space recovered:', (totalBytes / (1024 * 1024)).toFixed(2), 'MB');

const manifestPath = path.join(ARCHIVE_ROOT, 'CLEANUP_MANIFEST.json');
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log('Manifest written to:', manifestPath);

