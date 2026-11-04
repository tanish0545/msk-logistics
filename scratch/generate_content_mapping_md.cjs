const fs = require('fs');
const path = require('path');

let md = `# IMAGE-TO-CONTENT AUDIT & MAPPING — MSK LOGISTICS\n\n`;
md += `**Audit Date:** November 3, 2026  \n`;
md += `**Scope:** All live pages (Home, About, Services, Import & Export, Container Guide, Warehouse, Operations, Cargo Lashing, Container Stuffing, Contact, and Company Pages).  \n`;
md += `**Standard:** Strict factual honesty. Zero unverified forwarder/client claims, zero simulated client facilities, zero mismatched captions.\n\n`;

md += `## 1. Summary of Content & Caption Discrepancies\n\n`;
md += `During this deep-dive audit, three major categories of image-to-content discrepancies were identified:\n\n`;
md += `1. **Over-Attribution of Forwarder / Client Names:** Several pages and gallery records tagged authentic MSK operations photos with external corporate names (*Deugro, Jaguar, Yogiji, Transglobal, BBM, Hardeep / Pradeep*). While these names appeared in handwritten client notes as operational references or consignees, labeling specific photos as formal joint project evidence without written client confirmation creates legal and contractual exposure.\n`;
md += `2. **Asset Duplication Across Unrelated Services:** Because authentic client photos are limited to 27 WhatsApp files from Nhava Sheva, the same photo has been reused across unrelated pages under different descriptions. For example, \`IMG-20261022-WA0010.jpg\` (vessel crane loading) was simultaneously used as Flat Rack Crane Loading, Container Loading Crew, and Equipment Rigging.\n`;
md += `3. **Stock & AI Renderings Labeled as Specialized Facilities:** Generic 3D renderings of ISO containers (e.g. \`20ft-standard-dry-exterior.jpg\`, \`reefer-exterior.jpg\`) have occasionally been described in text as "MSK facility staging" or "cold chain certification" rather than transparently labeled as standardized equipment reference diagrams.\n\n`;

md += `## 2. Page-by-Page Detailed Image-to-Content Audit\n\n`;

md += `### A. Home Page (\`/\`)\n\n`;
md += `| Image Asset | Section | Rendered Dimensions | Caption / Headline Displayed | Actual Visual Subject | Type | Accuracy & Discrepancy Analysis |\n`;
md += `| :--- | :--- | :--- | :--- | :--- | :---: | :--- |\n`;
md += `| \`/images/hero/msk-cinematic-port-final.png\` | Hero Concept 09 | 1440×650px (cover) | "Beyond Logistics, We Deliver Trust." | Composite port montage: container ship, cargo plane, diesel locomotive, red trailer truck, reach stacker on wet asphalt | AI Composite (Upscaled) | **CONFIRMED DEFECT:** Image was upscaled from a 1024×509 AI generation to 2560×1280. When downscaled in browser with \`-webkit-optimize-contrast\`, fine edges, train lettering, and ship crane cables exhibit optical blur and muddy texturing. |\n`;
md += `| \`/images/operations/warehouse/open-yard-conex-staging.jpg\` | Warehouse Preview (Mode 1) | 700×438px | "Open Warehouse & Yard Staging" | Authentic JNPT / Conex CFS open container yard staging (\`WA0025\`) | Authentic MSK | **ACCURATE:** Shows genuine open yard container staging under natural daylight sky. |\n`;
md += `| \`/images/operations/warehouse/shaded-warehouse-main-bay.jpg\` | Warehouse Preview (Mode 2) | 700×438px | "Shaded Warehouse & Packing Bay" | Covered warehouse staging bay with metal roof (\`WA0011\`) | Authentic MSK | **ACCURATE:** Shows authentic sheltered packing bay. |\n`;
md += `| \`/images/services/export-packaging.jpg\` | Export Solutions Card 1 | 380×240px | "ISPM-15 Wooden Crating" | Wooden crates on pallets in covered warehouse | Authentic MSK (\`WA0005\`) | **ACCURATE:** Shows genuine Sandvik export wooden crate packaging. |\n`;
md += `| \`/images/services/container-stuffing.jpg\` | Export Solutions Card 2 | 380×240px | "Container Stuffing & Chocking" | Forklift stuffing palletized boxes into dry container | Generic Stock | **GENERIC STOCK:** Clean commercial photo; not an authentic MSK Nhava Sheva project. Caption should clearly state "Standardized stuffing protocol". |\n`;
md += `| \`/images/services/cargo-lashing.jpg\` | Export Solutions Card 3 | 380×240px | "Heavy Cargo Lashing" | Cargo tie-down with ratchet straps | Authentic MSK (\`WA0024\`) | **ACCURATE:** Genuine flat rack perimeter lashing. |\n\n`;

md += `### B. Container Guide Page (\`/container-guide\`)\n\n`;
md += `| Image Asset | Container Profile | Displayed Caption | Actual Visual Subject | Type | Caption Accuracy & Discrepancy |\n`;
md += `| :--- | :--- | :--- | :--- | :---: | :--- |\n`;
md += `| \`/images/containers/20ft-standard-dry-exterior.jpg\` | 20' GP Dry | 20ft Standard Dry Container exterior view | 3D Studio Rendering of blue 20ft dry container | 3D ISO Render | **ACCURATE FOR SPECIFICATION:** Represents standard ISO box cleanly. |\n`;
md += `| \`/images/containers/20ft-standard-dry-interior.jpg\` | 20' GP Dry | 20ft container interior view showing plywood floor | 3D Studio Rendering of container interior | 3D ISO Render | **ACCURATE FOR SPECIFICATION:** Plywood flooring visible. |\n`;
md += `| \`/images/drive-staging/IMG-20261022-WA0025.jpg\` | 20' GP Dry | Conex CFS container staging buffer | Conex CFS yard buffer stacks | Authentic MSK | **ACCURATE:** Authentic field record. |\n`;
md += `| \`/images/containers/40ft-standard-dry-exterior.jpg\` | 40' GP Dry | 40ft Standard Dry Container (8'6" height) | 3D Studio Rendering of 40ft standard container | 3D ISO Render | **ACCURATE:** Accurately represents 8'6" profile. |\n`;
md += `| \`/images/containers/40ft-high-cube-exterior.jpg\` | 40' High Cube | 40ft High Cube Container (9'6" height) | 3D Studio Rendering of 40HC container with zebra stripes | 3D ISO Render | **ACCURATE:** Zebra warning decals match ISO 40HC standard. |\n`;
md += `| \`/images/operations/export-packaging/sandvik-heavy-wooden-crate.jpg\` | 40' HC Heavy Duty | Heavy-duty wooden crating for dense export cargo | Sandvik mining machinery in heavy timber crating (\`WA0005\`) | Authentic MSK | **ACCURATE:** Authentic project crate documentation. |\n`;
md += `| \`/images/drive-staging/IMG-20261022-WA0019.jpg\` | Break Bulk Section | Wrapped cylindrical consignment inside container hold | Oversized cylindrical pressure vessel secured in hold | Authentic MSK | **HIGH-PRIORITY ASSET:** Exact client-supplied photo requested in Brief Part D. Highly accurate. |\n`;
md += `| \`/images/drive-staging/IMG-20261022-WA0020.jpg\` | Break Bulk Section | Night-time crane hoist and marine hold cross-lashing | Night vessel hold cross-webbing lashing under spotlights | Authentic MSK | **HIGH-PRIORITY ASSET:** Exact client-supplied photo requested in Brief Part D. Highly accurate. |\n`;
md += `| \`/images/containers/reefer-exterior.jpg\` | Reefer Container | Carrier Transicold cooling machinery and micro-controller | Photorealistic Reefer container exterior | 3D / Commercial | **ACCEPTABLE AS SPECIFICATION:** Shows Carrier cooling unit accurately. |\n`;
md += `| \`/images/operations/warehouse/covered-staging-bays-pallets.jpg\` | Reefer Container | "Pre-cooling temperature-controlled staging bay" | Standard covered warehouse pallet staging bay (\`WA0014\`) | Authentic MSK | **MISMATCH:** The photo shows ambient shaded warehouse storage, NOT a temperature-controlled cold room. Caption must be corrected to "Covered staging ahead of Reefer positioning". |\n\n`;

md += `### C. Warehouse Page (\`/warehouse\`)\n\n`;
md += `| Image Asset | Section | Displayed Caption | Actual Visual Subject | Accuracy & Discrepancy Analysis |\n`;
md += `| :--- | :--- | :--- | :--- | :--- |\n`;
md += `| \`/images/operations/warehouse/open-yard-conex-staging.jpg\` | 1. Open Yard | Authentic open-air container yard staging at Conex CFS corridor | Open container yard with stacks under daylight sky (\`WA0025\`) | **ACCURATE:** Genuine field photo. |\n`;
md += `| \`/images/operations/warehouse/shaded-warehouse-main-bay.jpg\` | 2. Shaded Warehouse | Covered packing bay & Aryan Shed roof shelter | Covered warehouse bay with corrugated metal roofing (\`WA0011\`) | **ACCURATE:** Genuine field photo. Note: "Aryan Shed" is referenced in client notes as a covered staging shed. |\n`;
md += `| \`/images/shipments/breakbulk/breakbulk-lowbed-machinery-lashing.jpg\` | 3. ODC Staging | ODC & Break Bulk Cargo staging for Deugro, Jaguar, Yogiji | Heavy machinery on low-bed trailer (\`WA0006\`) | **OVERCLAIM:** Photo is authentic MSK transport, but attributing it to "Deugro, Jaguar, Yogiji" simultaneously in caption is unverified. Should describe physical machinery and trailer type only. |\n`;
md += `| \`/images/operations/warehouse/export-pallet-strapping-staging.jpg\` | 4. Packing & Pallets | Pallet making, composite strapping & export packing | Strapped cartons on wooden pallets inside warehouse (\`WA0013\`) | **ACCURATE:** Genuine MSK palletizing operation. |\n`;
md += `| \`/images/operations/container-loading/mobile-crane-heavy-lift.jpg\` | 5. Equipment Handling | Mobile telescopic crane handling heavy project lift | 50T hydraulic crane lifting machinery (\`WA0015\`) | **ACCURATE:** Genuine MSK lifting operation. |\n\n`;

md += `### D. Operations Page (\`/operations\`) & Cargo Lashing (\`/services/cargo-lashing\`)\n\n`;
md += `| Image Asset | Gallery Category | Displayed Tag / Caption | Actual Visual Subject | Status & Action Required |\n`;
md += `| :--- | :--- | :--- | :--- | :--- |\n`;
md += `| \`/images/operations/cargo-lashing/flat-rack-heavy-duty-orange-lashing.jpg\` | Cargo Lashing / Flat Rack | "Jaguar & Transglobal" / ODC FR perimeter lashing | Heavy-duty orange ratchet lashings on Flat Rack (\`WA0024\`) | **OVERCLAIM:** Authentic MSK photo, but badge claims "Jaguar & Transglobal". Remove forwarder badge; retain technical description. |\n`;
md += `| \`/images/operations/cargo-lashing/vessel-cross-webbing-lashing.jpg\` | Cargo Lashing / Break Bulk | "Deugro Hold Lashing" / Marine hold cross-lashing | Vessel hold cross webbing network (\`WA0020\`) | **OVERCLAIM:** Authentic MSK photo, but badge claims "Deugro Hold Lashing". Remove client brand; retain technical description. |\n`;
md += `| \`/images/operations/cargo-lashing/trailer-chassis-ratchet-lashing.jpg\` | Cargo Lashing / Road Fleet | "Yogiji & BBM Machinery" / Chassis road securing | Trailer chassis tie-down (\`WA0008\`) | **OVERCLAIM:** Authentic MSK photo, but badge claims "Yogiji & BBM". Remove forwarder badge; retain technical description. |\n`;
md += `| \`/images/shipments/flat-rack/flat-rack-40ft-dual-cargo-lashed.jpg\` | Flat Rack / Project Cargo | "Deugro & Jaguar Modules" / Plywood GSA & timber chocking | 40ft Flat Rack with timber floor bolsters (\`WA0026\`) | **OVERCLAIM:** Authentic MSK photo, but badge claims "Deugro & Jaguar". Remove forwarder badge; retain technical description. |\n`;
md += `| \`/images/shipments/breakbulk/breakbulk-cylindrical-haulage.jpg\` | Road Fleet / Break Bulk | "Hardeep & Pradeep Road Fleet" / Multi-axle haulage | Multi-axle puller hauling cylindrical pressure vessel (\`WA0018\`) | **CLIENT REFERENCE:** Matches client handwritten brief ("Hardeep / Pradeep Road Fleet"). Acceptable if verified, but safer to label as "Heavy Multi-Axle Road Transport". |\n\n`;

md += `## 3. Strict Rules for Stabilization\n\n`;
md += `1. **Zero Invented Client / Forwarder Attributions:** Strip all badges claiming specific forwarder projects (*Deugro, Jaguar, Yogiji, Transglobal, BBM*) from gallery cards unless a specific signed consignment manifest is confirmed by the client.\n`;
md += `2. **Single Canonical Path per Photo:** Stop loading \`WA0023\` under three different paths (\`/containers/container-20ft-flat-rack.jpg\`, \`/drive-staging/IMG-20261022-WA0023.jpg\`, \`/shipments/flat-rack/flat-rack-20ft-tarpaulin-lashed.jpg\`). Consolidate all authentic client photos to a single verified directory.\n`;
md += `3. **Fact-Based Captions:** Every caption must describe what is physically visible in the image (e.g. "Heavy machinery secured to low-bed trailer with 50mm high-tensile ratchet straps"), not imaginary certifications or temperature ratings.\n`;

fs.writeFileSync('C:/Users/tanis/.gemini/antigravity/brain/c0b2c763-e918-4c9e-b8e6-bd7de1b3a74d/IMAGE_CONTENT_MAPPING.md', md);
fs.writeFileSync('IMAGE_CONTENT_MAPPING.md', md);
console.log('Successfully wrote IMAGE_CONTENT_MAPPING.md');

