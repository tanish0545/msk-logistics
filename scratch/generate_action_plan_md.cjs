const fs = require('fs');

let md = `# RECOVERY ACTION PLAN & PROPOSED CLEAN ARCHITECTURE — MSK LOGISTICS\n\n`;
md += `**Audit Date:** November 3, 2026  \n`;
md += `**Status:** Proposal Awaiting Client / User Explicit Approval (Zero actions taken yet).  \n\n`;

md += `## 1. Principles of Stabilization\n\n`;
md += `1. **No Destructive Operations Without Approval:** All original client photographs (\`drive-staging/IMG-20261022-WA0002.jpg\` through \`WA0030.jpg\`) are permanently preserved.\n`;
md += `2. **Single Canonical Path per Photo:** Eliminate triple-copying of photographs. One file, one location, referenced everywhere via data constants.\n`;
md += `3. **Fact-First Visual Honesty:** Remove all unverified forwarder names (*Deugro, Jaguar, Yogiji, Transglobal, BBM*) from gallery badges and captions unless backed by signed client consignment documents.\n`;
md += `4. **Resolve Hero Blur Optically:** Address the hero sharpness at the source without running new generative prompts.\n\n`;

md += `---\n\n`;
md += `## 2. Proposed Clean Asset Structure\n\n`;
md += `\`\`\`text\n`;
md += `public/images/\n`;
md += `  brand/\n`;
md += `    msk-logistics-logo.png            # Official logo (150px header standard)\n`;
md += `    iso-9001-2015-certified.jpg       # Single canonical ISO seal\n`;
md += `    office-jnpt-signboard.jpg         # WA0030 JNPT office\n`;
md += `  hero/\n`;
md += `    msk-cinematic-transport-master.png # Single high-fidelity hero master\n`;
md += `    global-freight-montage-reference.png # Original reference montage\n`;
md += `  containers/\n`;
md += `    20gp/                             # 5 distinct verified photos\n`;
md += `    40gp/                             # 5 distinct verified photos\n`;
md += `    40hc/                             # 5 distinct verified photos\n`;
md += `    40hc-heavy-duty/                  # 5 distinct verified photos (Sandvik crate WA0005)\n`;
md += `    open-top/                         # 5 distinct verified photos\n`;
md += `    flat-rack/                        # 5 distinct verified photos (WA0023, WA0026, WA0009)\n`;
md += `    reefer/                           # 5 distinct verified photos\n`;
md += `  break-bulk/\n`;
md += `    cylindrical-cargo-hold.jpg        # WA0019 (Wrapped cylindrical consignment in hold)\n`;
md += `    night-hold-cross-lashing.jpg      # WA0020 (Night crane lift & vessel hold cross-lashing)\n`;
md += `    cylindrical-road-haulage.jpg      # WA0018 (Multi-axle trailer road haulage)\n`;
md += `    mobile-crane-heavy-lift.jpg       # WA0015 (50T telescopic mobile crane lift)\n`;
md += `  warehouse/\n`;
md += `    open-yard-conex-staging.jpg       # WA0025 (Conex CFS open yard buffer)\n`;
md += `    shaded-warehouse-main-bay.jpg     # WA0011 (Covered warehouse & Aryan Shed bay)\n`;
md += `    pallet-strapping-staging.jpg      # WA0013 (Pallet strapping & staging)\n`;
md += `    covered-staging-bays.jpg          # WA0014 (Covered staging bays)\n`;
md += `    industrial-rolls-storage.jpg      # WA0016 (Industrial materials covered storage)\n`;
md += `  operations/\n`;
md += `    odc-fr-ratchet-lashing.jpg        # WA0024 (Heavy-duty orange ratchet lashing)\n`;
md += `    trailer-chassis-lashing.jpg       # WA0008 (Trailer chassis ratchet tie-down)\n`;
md += `    vessel-hold-cross-lashing.jpg     # WA0020 (Marine hold cross-lashing network)\n`;
md += `    flat-rack-timber-chocking.jpg     # WA0026 (Plywood GSA and timber chocking)\n`;
md += `    crane-rigging-crew.jpg            # WA0010 (Vessel crane rigging crew)\n`;
md += `    vessel-cell-guides.jpg            # WA0012 (Cellular guide bay stowage)\n`;
md += `    skidded-equipment-staging.jpg     # WA0003 (Skidded equipment staging)\n`;
md += `    vci-skid-wrapping.jpg             # WA0002 (VCI moisture barrier wrapping)\n`;
md += `\`\`\`\n\n`;

md += `---\n\n`;
md += `## 3. Step-by-Step Implementation Roadmap (Pending User Approval)\n\n`;
md += `### Step 1: Hero Sharpness & Rendering Fix\n\n`;
md += `- **Problem:** In \`HeroConcept09.tsx\`, the hero image uses an AI-upscaled 2560×1280 asset (\`msk-cinematic-port-final.png\`) that was enlarged from a 1024×509 source. The CSS property \`imageRendering: '-webkit-optimize-contrast'\` creates jagged downscaling artifacts on desktop.\n`;
md += `- **Fix:**\n`;
md += `  1. Remove the \`-webkit-optimize-contrast\` style so standard smooth bicubic filtering is applied.\n`;
md += `  2. Standardize container height and remove redundant overlapping gradient overlays on desktop so vehicles are not obscured by excessive black wash.\n`;
md += `  3. Verify that the original transport identities (ship, airplane, train, truck, forklift) are crisply visible without artificial blur.\n\n`;

md += `### Step 2: Consolidate Duplicate Image Assets\n\n`;
md += `- **Problem:** 30 duplicate hash groups (66 files) exist across \`drive-staging\`, \`containers\`, \`operations\`, and \`shipments\`.\n`;
md += `- **Fix:** Retain canonical assets in their logical folders, update \`imageAssets.ts\` and \`containerGuideData.ts\` to point to canonical paths, and archive identical copies.\n\n`;

md += `### Step 3: Remove Dead & Unimported Code\n\n`;
md += `- **Problem:** 7 unused components (\`HeroVideo\`, \`HeroVideoSequence\`, \`IndustrialBadge\`, \`InteractiveCard\`, \`RotatingLogisticsCursor\`, \`StaggeredGrid\`, \`CartingTreeDiagram\`) clutter the codebase.\n`;
md += `- **Fix:** Safely move these 7 components into an \`archive/components\` directory or remove them cleanly after user approval.\n\n`;

md += `### Step 4: Correct Gallery Badges & Captions\n\n`;
md += `- **Problem:** Gallery items on \`/operations\` and \`/services/cargo-lashing\` display badges like "Deugro Hold Lashing", "Jaguar & Transglobal", "Yogiji & BBM".\n`;
md += `- **Fix:** Remove the unverified forwarder names from the badges. Replace with factual engineering descriptions: "Marine Hold Cross-Lashing", "Heavy-Duty Flat Rack Perimeter Lashing", "Multi-Axle Trailer Chassis Tie-Down".\n\n`;

fs.writeFileSync('C:/Users/tanis/.gemini/antigravity/brain/c0b2c763-e918-4c9e-b8e6-bd7de1b3a74d/RECOVERY_ACTION_PLAN.md', md);
fs.writeFileSync('RECOVERY_ACTION_PLAN.md', md);
console.log('Successfully wrote RECOVERY_ACTION_PLAN.md');

