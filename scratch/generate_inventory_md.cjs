const fs = require('fs');
const path = require('path');

const analysis = JSON.parse(fs.readFileSync('scratch/asset_analysis.json', 'utf8'));
const duplicateMap = new Map();
analysis.duplicateGroups.forEach((g, gIdx) => {
  g.paths.forEach(p => duplicateMap.set(p, { group: gIdx + 1, allInGroup: g.paths }));
});

function classifySubjectAndDecision(asset) {
  const p = asset.diskPath;
  let subject = 'Logistics / Cargo';
  let decision = 'Keep (Active)';

  if (p.includes('hero/msk-cinematic-port-final.png')) {
    subject = 'Composite Logistics Port (AI upscaled 2560x1280: ship, plane, train, truck, forklift)';
    decision = 'Replace / Optimize (AI upscale softening observed; needs high-fidelity master)';
  } else if (p.includes('hero/msk-logistics-cinematic-bg.png')) {
    subject = 'Duplicate of msk-cinematic-port-final.png';
    decision = 'Proposed for removal (Exact 5.27 MB binary duplicate of msk-cinematic-port-final.png)';
  } else if (p.includes('hero/layer-')) {
    subject = 'Isolated vehicle layer cutout (extracted from original montage)';
    decision = 'Archive (Unused abandoned multi-layer animation layer)';
  } else if (p.includes('hero/global-freight-transportation-montage.png')) {
    subject = 'Original transport reference montage with alpha channel (1774x887)';
    decision = 'Retain as Source Authority (Original transport composition reference)';
  } else if (p.includes('drive-staging/IMG-20261022-WA00')) {
    subject = `Authentic MSK Field Photo (${path.basename(p)})`;
    decision = 'Retain as Source Authority (Primary authentic client archive)';
  } else if (p.includes('operations/warehouse/open-warehouse-edited-sky.jpg') || p.includes('operations/warehouse/open-warehouse-yard-staging.jpg')) {
    subject = 'Artificial daylight sky edit of shaded warehouse WA0011';
    decision = 'Proposed for removal (Manipulated sky composite, replaced by authentic WA0025)';
  } else if (!asset.isUsed) {
    subject = `Unreferenced asset (${path.basename(p)})`;
    decision = 'Proposed for removal / archive (Unused on all live pages)';
  } else if (duplicateMap.has(p)) {
    const dup = duplicateMap.get(p);
    subject = `Duplicate of group ${dup.group} (${path.basename(dup.allInGroup[0])})`;
    decision = 'Consolidate (Pointing to duplicate file; consolidate to single canonical path)';
  } else if (p.includes('containers/')) {
    if (p.endsWith('.svg')) {
      subject = '2D Vector schematic container drawing';
      decision = 'Keep (Technical illustration)';
    } else if (p.includes('exterior') || p.includes('interior')) {
      subject = 'Generic photorealistic ISO container (Photostock/AI-assisted 3D rendering)';
      decision = 'Keep with correct generic labeling (Not authentic MSK client facility)';
    } else {
      subject = 'Field container operation';
      decision = 'Keep';
    }
  } else if (p.includes('clients/')) {
    subject = `Client / Forwarder Logo (${path.basename(p, path.extname(p))})`;
    decision = 'Review with Client (Ensure written authorization before live display)';
  } else if (p.includes('logo/') || p.includes('favicon')) {
    subject = 'Official MSK Logistics corporate brand identity';
    decision = 'Keep (Protected brand asset)';
  }

  return { subject, decision };
}

let md = '# IMAGE ASSET INVENTORY — MSK LOGISTICS\n\n';
md += `**Audit Date:** November 3, 2026  \n`;
md += `**Total Image Assets Audited:** ${analysis.totalImages}  \n`;
md += `**Active / Referenced Assets:** ${analysis.usedCount}  \n`;
md += `**Unused / Dead Assets:** ${analysis.unusedCount}  \n`;
md += `**Identical Duplicate Groups:** ${analysis.duplicateGroups.length} (${analysis.duplicateGroups.reduce((a,b)=>a+b.paths.length,0)} files)  \n\n`;
md += `This inventory provides an exhaustive, row-by-row accounting of every physical image asset in the repository. No assets have been deleted during this audit.\n\n`;
md += `| Asset Path | Dimensions | File Size | Actual Visual Subject | Current Usage | Recovery Decision |\n`;
md += `| :--- | :---: | :---: | :--- | :--- | :--- |\n`;

for (const a of analysis.inventory) {
  const { subject, decision } = classifySubjectAndDecision(a);
  const dims = `${a.width}×${a.height}`;
  const sizeKb = (a.size / 1024).toFixed(1) + ' KB';
  const usageStr = a.isUsed ? `Used in ${a.usages.length} file(s)` : '**UNUSED**';
  md += `| \`${a.diskPath}\` | ${dims} | ${sizeKb} | ${subject} | ${usageStr} | ${decision} |\n`;
}

fs.writeFileSync('C:/Users/tanis/.gemini/antigravity/brain/c0b2c763-e918-4c9e-b8e6-bd7de1b3a74d/IMAGE_ASSET_INVENTORY.md', md);
fs.writeFileSync('IMAGE_ASSET_INVENTORY.md', md);
console.log('Successfully wrote IMAGE_ASSET_INVENTORY.md');

