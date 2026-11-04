# UNUSED FILES & PROPOSED CLEANUP REVIEW — MSK LOGISTICS

**Audit Date:** November 3, 2026  
**Status:** Audit & Proposal Only (STRICT STOP CONDITION: Zero files deleted prior to client approval).  

## 1. Overview of Unreferenced Project Files

| Category | Total Identified | Potential Disk Recovery | Safety Assessment |
| :--- | :---: | :---: | :--- |
| **Unused Image Assets** | 38 files | ~26.4 MB | **100% Safe:** Zero references across all TSX, TS, CSS, or JSON files. |
| **Identical Duplicate Image Files** | 30 groups (66 files) | ~18.8 MB | **Safe to Consolidate:** Canonical files retained in primary folders. |
| **Dead / Unimported Components** | 7 files | ~45 KB | **100% Safe:** Never imported by App.tsx, routers, or other components. |
| **Temporary / Diagnostic Scripts** | 12 files | ~35 KB | **Safe to Clean:** Temporary inspection scripts in `scratch/`. |

---

## 2. Unused Component Files (Dead Code)

| Component File | Size | Original Intent | Why It Is Safe to Remove / Archive |
| :--- | :---: | :--- | :--- |
| `src/components/common/IndustrialBadge.tsx` | 1.8 KB | Early badge UI experiment | Never imported by any page or component; superseded by Tailwind inline badges. |
| `src/components/common/InteractiveCard.tsx` | 2.4 KB | Experimental 3D hover card | Never imported; standard cards use native Tailwind hover styles. |
| `src/components/common/RotatingLogisticsCursor.tsx` | 3.2 KB | Custom mouse cursor tracker | Never imported; avoided to preserve standard browser UX accessibility. |
| `src/components/common/StaggeredGrid.tsx` | 2.1 KB | Custom animation grid wrapper | Never imported; pages use standard Tailwind responsive grids. |
| `src/components/hero/HeroVideoSequence.tsx` | 6.8 KB | Video sequence canvas hero | Experimental prototype; never imported into App.tsx or any page. |
| `src/components/hero/HeroVideo.tsx` | 4.5 KB | HTML5 video player component | Only referenced by dead `HeroVideoSequence.tsx`; unused on live site. |
| `src/components/services/CartingTreeDiagram.tsx` | 4.8 KB | Interactive tree diagram | Never imported; services directory uses `ServiceCard.tsx` and grid layouts. |

---

## 3. Unreferenced Image Assets (38 Files)

| File Path | Dimensions | File Size | Description / Origin | Recommended Action |
| :--- | :---: | :---: | :--- | :--- |
| `public/favicon-192.png` | 192×192 | 27.1 KB | Unused asset | Safe to remove |
| `public/favicon.svg` | 512×512 | 140.8 KB | Unused asset | Safe to remove |
| `public/icons.svg` | 16×17 | 4.9 KB | Unused asset | Safe to remove |
| `public/images/certifications/iso-9001-2015-certified.jpg` | 779×755 | 90.5 KB | Unused asset | Safe to remove |
| `public/images/drive-staging/IMG-20261022-WA0021.jpg` | 721×1280 | 84.2 KB | Authentic client photo WA0021 (night hold lashing second angle) | Retain in archive (Do NOT delete client photographs) |
| `public/images/drive-staging/IMG-20261022-WA0022.jpg` | 721×1280 | 68.6 KB | Authentic client photo WA0022 not currently referenced in any page | Retain in archive (Do NOT delete client photographs) |
| `public/images/drive-staging/IMG-20261022-WA0027.jpg` | 1156×867 | 128.7 KB | Authentic client photo WA0027 not currently referenced in any page | Retain in archive (Do NOT delete client photographs) |
| `public/images/hero/cinematic-port-hero-unified.jpg` | 2048×920 | 328.3 KB | Unused asset | Safe to remove |
| `public/images/hero/concept09-port-background.jpg` | 1376×768 | 727.6 KB | Unused asset | Safe to remove |
| `public/images/hero/global-freight-environmental-showcase.png` | 1920×1080 | 1798.5 KB | Unused asset | Safe to remove |
| `public/images/hero/global-freight-transportation-montage.png` | 1774×887 | 1935.4 KB | Unused asset | Safe to remove |
| `public/images/hero/hero-transport-environment.png` | 1920×1080 | 1628.3 KB | Unused asset | Safe to remove |
| `public/images/hero/layer-forklift.png` | 1774×887 | 2198.7 KB | Extracted vehicle layer PNG from old multi-layer parallax hero test | Archive or Delete (Each layer is ~2.2 MB; 5 layers = 11.3 MB) |
| `public/images/hero/layer-plane.png` | 1774×887 | 2195.6 KB | Extracted vehicle layer PNG from old multi-layer parallax hero test | Archive or Delete (Each layer is ~2.2 MB; 5 layers = 11.3 MB) |
| `public/images/hero/layer-ship.png` | 1774×887 | 2260.9 KB | Extracted vehicle layer PNG from old multi-layer parallax hero test | Archive or Delete (Each layer is ~2.2 MB; 5 layers = 11.3 MB) |
| `public/images/hero/layer-train.png` | 1774×887 | 2203.2 KB | Extracted vehicle layer PNG from old multi-layer parallax hero test | Archive or Delete (Each layer is ~2.2 MB; 5 layers = 11.3 MB) |
| `public/images/hero/layer-truck.png` | 1774×887 | 2242.1 KB | Extracted vehicle layer PNG from old multi-layer parallax hero test | Archive or Delete (Each layer is ~2.2 MB; 5 layers = 11.3 MB) |
| `public/images/hero/msk-cinematic-port-final.jpg` | 2048×920 | 328.3 KB | Unused asset | Safe to remove |
| `public/images/hero/msk-cinematic-port-raw.png` | 1024×509 | 733.4 KB | Unused asset | Safe to remove |
| `public/images/hero/msk-logistics-cinematic-bg.png` | 2560×1280 | 5147.6 KB | Exact 5.27 MB binary duplicate of msk-cinematic-port-final.png | Delete duplicate (Redundant 5.27 MB file) |
| `public/images/hero/temp_plane_area.png` | 1500×450 | 616.9 KB | Temporary crop image created during earlier plane touchup | Delete temporary file |
| `public/images/import-export/client-cargo-ready.jpg` | 1376×768 | 409.5 KB | Unused asset | Safe to remove |
| `public/images/import-export/lcl-consolidation.jpg` | 1376×768 | 428.7 KB | Unused asset | Safe to remove |
| `public/images/iso/iso-9001-2015-seal.png` | 720×720 | 569.2 KB | Unused asset | Safe to remove |
| `public/images/iso/iso-9001-2015.jpg` | 779×755 | 90.5 KB | Unused asset | Safe to remove |
| `public/images/operations/warehouse/open-warehouse-edited-sky.jpg` | 1600×1200 | 413.8 KB | Artificial daylight sky edit of shaded warehouse WA0011 | Delete (Replaced by authentic WA0025 open yard photo) |
| `public/images/operations/warehouse/open-warehouse-yard-staging.jpg` | 1600×1200 | 413.8 KB | Unused asset | Safe to remove |
| `public/images/services/cargo-lashing.jpg` | 1376×768 | 326.0 KB | Unused asset | Safe to remove |
| `public/images/services/container-interior.webp` | 1376×768 | 228.4 KB | Unused asset | Safe to remove |
| `public/images/services/export-packaging.jpg` | 1376×768 | 407.6 KB | Unused asset | Safe to remove |
| `public/images/services/export-pallets.webp` | 1376×768 | 364.5 KB | Unused asset | Safe to remove |
| `public/images/services/industrial-cargo-crating.webp` | Unknown×Unknown | 221.8 KB | Unreferenced packaging webp | Safe to remove |
| `public/images/team/msk-logistics-team-original.jpg` | 768×1024 | 385.6 KB | Unused asset | Safe to remove |
| `public/images/warehouse/open/open-yard-container-buffer.svg` | 800×280 | 1.9 KB | Unused asset | Safe to remove |
| `public/images/warehouse/shaded/covered-cargo-staging-bay.svg` | 800×500 | 1.8 KB | Unused asset | Safe to remove |
| `src/assets/hero.png` | 1024×512 | 811.5 KB | Unused asset | Safe to remove |
| `src/assets/react.svg` | 256×228 | 4.0 KB | Unused asset | Safe to remove |
| `src/assets/vite.svg` | 77×47 | 8.5 KB | Unused asset | Safe to remove |

---

## 4. Redundant & Overlapping Data Files

1. **`src/data/shipmentGalleryData.ts` vs `src/data/imageAssets.ts`:**
   - Both files define arrays of the exact same 27 WhatsApp client photos.
   - `shipmentGalleryData.ts` categorizes them by `flat-rack`, `breakbulk`, and `packaging`.
   - `imageAssets.ts` categorizes them by `CLIENT_IMAGE_ASSETS` with expanded client attribution tags.
   - **Recommendation:** Consolidate into a single master data dictionary (`src/data/mskGalleryData.ts`) with verified factual fields.

2. **`src/data/warehouseData.ts`:**
   - Defines `SHARED_WAREHOUSE_IMAGE = OPEN_WAREHOUSE_IMAGE` (legacy alias).
   - **Recommendation:** Deprecate `SHARED_WAREHOUSE_IMAGE` alias now that Open Yard and Shaded Warehouse use genuinely distinct photographs.
