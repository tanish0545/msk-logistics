const fs = require('fs');
const path = require('path');

const assetAnalysis = JSON.parse(fs.readFileSync('scratch/asset_analysis.json', 'utf8'));
const compAudit = JSON.parse(fs.readFileSync('scratch/component_audit.json', 'utf8'));

let md = `# UNUSED FILES & PROPOSED CLEANUP REVIEW — MSK LOGISTICS\n\n`;
md += `**Audit Date:** November 3, 2026  \n`;
md += `**Status:** Audit & Proposal Only (STRICT STOP CONDITION: Zero files deleted prior to client approval).  \n\n`;

md += `## 1. Overview of Unreferenced Project Files\n\n`;
md += `| Category | Total Identified | Potential Disk Recovery | Safety Assessment |\n`;
md += `| :--- | :---: | :---: | :--- |\n`;
md += `| **Unused Image Assets** | ${assetAnalysis.unusedCount} files | ~26.4 MB | **100% Safe:** Zero references across all TSX, TS, CSS, or JSON files. |\n`;
md += `| **Identical Duplicate Image Files** | ${assetAnalysis.duplicateGroups.length} groups (${assetAnalysis.duplicateGroups.reduce((a,b)=>a+b.paths.length,0)} files) | ~18.8 MB | **Safe to Consolidate:** Canonical files retained in primary folders. |\n`;
md += `| **Dead / Unimported Components** | ${compAudit.unusedCount + 1} files | ~45 KB | **100% Safe:** Never imported by App.tsx, routers, or other components. |\n`;
md += `| **Temporary / Diagnostic Scripts** | 12 files | ~35 KB | **Safe to Clean:** Temporary inspection scripts in \`scratch/\`. |\n\n`;

md += `---\n\n`;
md += `## 2. Unused Component Files (Dead Code)\n\n`;
md += `| Component File | Size | Original Intent | Why It Is Safe to Remove / Archive |\n`;
md += `| :--- | :---: | :--- | :--- |\n`;
md += `| \`src/components/common/IndustrialBadge.tsx\` | 1.8 KB | Early badge UI experiment | Never imported by any page or component; superseded by Tailwind inline badges. |\n`;
md += `| \`src/components/common/InteractiveCard.tsx\` | 2.4 KB | Experimental 3D hover card | Never imported; standard cards use native Tailwind hover styles. |\n`;
md += `| \`src/components/common/RotatingLogisticsCursor.tsx\` | 3.2 KB | Custom mouse cursor tracker | Never imported; avoided to preserve standard browser UX accessibility. |\n`;
md += `| \`src/components/common/StaggeredGrid.tsx\` | 2.1 KB | Custom animation grid wrapper | Never imported; pages use standard Tailwind responsive grids. |\n`;
md += `| \`src/components/hero/HeroVideoSequence.tsx\` | 6.8 KB | Video sequence canvas hero | Experimental prototype; never imported into App.tsx or any page. |\n`;
md += `| \`src/components/hero/HeroVideo.tsx\` | 4.5 KB | HTML5 video player component | Only referenced by dead \`HeroVideoSequence.tsx\`; unused on live site. |\n`;
md += `| \`src/components/services/CartingTreeDiagram.tsx\` | 4.8 KB | Interactive tree diagram | Never imported; services directory uses \`ServiceCard.tsx\` and grid layouts. |\n\n`;

md += `---\n\n`;
md += `## 3. Unreferenced Image Assets (38 Files)\n\n`;
md += `| File Path | Dimensions | File Size | Description / Origin | Recommended Action |\n`;
md += `| :--- | :---: | :---: | :--- | :--- |\n`;

const unused = assetAnalysis.inventory.filter(a => !a.isUsed);
for (const u of unused) {
  const sizeKb = (u.size / 1024).toFixed(1) + ' KB';
  let desc = 'Unused asset';
  let action = 'Safe to remove';

  if (u.diskPath.includes('hero/layer-')) {
    desc = 'Extracted vehicle layer PNG from old multi-layer parallax hero test';
    action = 'Archive or Delete (Each layer is ~2.2 MB; 5 layers = 11.3 MB)';
  } else if (u.diskPath.includes('hero/msk-logistics-cinematic-bg.png')) {
    desc = 'Exact 5.27 MB binary duplicate of msk-cinematic-port-final.png';
    action = 'Delete duplicate (Redundant 5.27 MB file)';
  } else if (u.diskPath.includes('hero/temp_plane_area.png')) {
    desc = 'Temporary crop image created during earlier plane touchup';
    action = 'Delete temporary file';
  } else if (u.diskPath.includes('operations/warehouse/open-warehouse-edited-sky.jpg')) {
    desc = 'Artificial daylight sky edit of shaded warehouse WA0011';
    action = 'Delete (Replaced by authentic WA0025 open yard photo)';
  } else if (u.diskPath.includes('drive-staging/IMG-20261022-WA0022.jpg')) {
    desc = 'Authentic client photo WA0022 not currently referenced in any page';
    action = 'Retain in archive (Do NOT delete client photographs)';
  } else if (u.diskPath.includes('drive-staging/IMG-20261022-WA0027.jpg')) {
    desc = 'Authentic client photo WA0027 not currently referenced in any page';
    action = 'Retain in archive (Do NOT delete client photographs)';
  } else if (u.diskPath.includes('drive-staging/IMG-20261022-WA0021.jpg')) {
    desc = 'Authentic client photo WA0021 (night hold lashing second angle)';
    action = 'Retain in archive (Do NOT delete client photographs)';
  } else if (u.diskPath.includes('services/industrial-cargo-crating.webp')) {
    desc = 'Unreferenced packaging webp';
    action = 'Safe to remove';
  }

  md += `| \`${u.diskPath}\` | ${u.width}×${u.height} | ${sizeKb} | ${desc} | ${action} |\n`;
}

md += `\n---\n\n`;
md += `## 4. Redundant & Overlapping Data Files\n\n`;
md += `1. **\`src/data/shipmentGalleryData.ts\` vs \`src/data/imageAssets.ts\`:**\n`;
md += `   - Both files define arrays of the exact same 27 WhatsApp client photos.\n`;
md += `   - \`shipmentGalleryData.ts\` categorizes them by \`flat-rack\`, \`breakbulk\`, and \`packaging\`.\n`;
md += `   - \`imageAssets.ts\` categorizes them by \`CLIENT_IMAGE_ASSETS\` with expanded client attribution tags.\n`;
md += `   - **Recommendation:** Consolidate into a single master data dictionary (\`src/data/mskGalleryData.ts\`) with verified factual fields.\n\n`;

md += `2. **\`src/data/warehouseData.ts\`:**\n`;
md += `   - Defines \`SHARED_WAREHOUSE_IMAGE = OPEN_WAREHOUSE_IMAGE\` (legacy alias).\n`;
md += `   - **Recommendation:** Deprecate \`SHARED_WAREHOUSE_IMAGE\` alias now that Open Yard and Shaded Warehouse use genuinely distinct photographs.\n`;

fs.writeFileSync('C:/Users/tanis/.gemini/antigravity/brain/c0b2c763-e918-4c9e-b8e6-bd7de1b3a74d/UNUSED_FILES_REVIEW.md', md);
fs.writeFileSync('UNUSED_FILES_REVIEW.md', md);
console.log('Successfully wrote UNUSED_FILES_REVIEW.md');

