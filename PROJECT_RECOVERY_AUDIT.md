# MSK LOGISTICS — PROJECT RECOVERY & QUALITY CONTROL AUDIT REPORT

**Project:** `C:\MSK-Logistics`  
**Audit Date:** November 3, 2026  
**Scope:** Complete Codebase, Image Assets, Components, and Content Truthfulness Audit  
**Status:** Audit Complete — Zero Destructive Actions Taken (Awaiting Client Approval)  
**Backup Checkpoint:** Git branch `backup-pre-recovery-audit-da47d49` & physical snapshot directory `backups/pre_recovery_snapshot`  

---

## 1. Executive Summary & Exact Metric Counts

Following your directive to **STOP FEATURE DEVELOPMENT** and stabilize the project, an exhaustive, multi-dimensional audit was executed across all images, components, data dictionaries, and rendered pages. Here are the confirmed numbers:

| Audit Metric | Exact Count | Severity | Status / Description |
| :--- | :---: | :---: | :--- |
| **Total Image Files on Disk** | **159** | Info | All physical image assets residing in `public/` and `src/assets/`. |
| **Active / Referenced Image Files** | **121** | Normal | Images imported or referenced in live TSX, TS, or CSS files. |
| **Unreferenced / Dead Images** | **38** | Medium | Images taking up ~26.4 MB of storage with zero code references. |
| **Identical Binary Duplicate Groups** | **30 groups (66 files)** | High | Exact duplicate files copied across multiple directories under different names. |
| **Missing Image References** | **0** | Pass | Zero 404 broken image paths in the current build. |
| **Blurry or Optically Compromised Images** | **4** | High | Hero AI composite (`msk-cinematic-port-final.png`), upscaled cutouts, and artificial sky edits. |
| **Incorrect / Overclaimed Image Captions** | **8** | High | Authentic photos labeled with unverified forwarder names (*Deugro, Jaguar, Yogiji, Transglobal*). |
| **Unused / Dead Components** | **7** | Medium | Components created during previous iterations that are never imported anywhere. |
| **Total Potentially Removable / Archivable Files** | **45** | Cleanup | 38 dead images + 7 dead components (~26.5 MB recoverable). |

---

## 2. Categorization of Confirmed vs. Suspected Problems

### Confirmed Problems (Empirically Verified)

1. **Hero Image Blur & Optical Softening (Confirmed):**
   - **Source:** `public/images/hero/msk-cinematic-port-final.png` (5.27 MB, 2560×1280).
   - **Root Cause:** The image was generated at 1024×509 (`msk-cinematic-port-raw.png`, 751 KB) and upscaled by 2.5× to 2560×1280. When rendered in Chromium with the CSS rule `imageRendering: '-webkit-optimize-contrast'`, downscaling creates pixel aliasing and unnatural sharpness artifacts around edges while internal textures (train lettering, gantry cables, asphalt) remain soft and muddy.
   - **CSS Overlays:** Four separate CSS linear gradients are layered on top of the image (left-to-right black wash, mobile vertical wash, top header vignette, and bottom ground transition), obscuring the vehicles on smaller screens.

2. **Excessive Image Duplication (Confirmed):**
   - 30 distinct groups of identical binary duplicates exist in the project (66 files total).
   - Authentic client WhatsApp photos from `public/images/drive-staging/` were copied into `public/images/containers/`, `public/images/operations/`, and `public/images/shipments/` with new names.
   - Example: `IMG-20261022-WA0023.jpg` exists as 3 identical copies:
     1. `public/images/drive-staging/IMG-20261022-WA0023.jpg`
     2. `public/images/containers/container-20ft-flat-rack.jpg`
     3. `public/images/shipments/flat-rack/flat-rack-20ft-tarpaulin-lashed.jpg`

3. **Unverified Client / Forwarder Attributions (Confirmed):**
   - Badges and cards on `/operations`, `/warehouse`, and `/services/cargo-lashing` display specific corporate names: "*Deugro Hold Lashing*", "*Jaguar & Transglobal*", "*Yogiji & BBM Machinery*".
   - While these names appeared in handwritten client notes as operational references or consignees, labeling specific photos as formal joint project evidence without written client confirmation creates legal and contractual exposure.

4. **Dead & Abandoned Components (Confirmed):**
   - 7 components are completely unimported by any live route or component: `HeroVideo.tsx`, `HeroVideoSequence.tsx`, `IndustrialBadge.tsx`, `InteractiveCard.tsx`, `RotatingLogisticsCursor.tsx`, `StaggeredGrid.tsx`, and `CartingTreeDiagram.tsx`.

### Suspected Problems (Requiring Client Clarification)

1. **Spelling of "Aquario" vs "Aquatic" Bay:**
   - Client handwritten notes mention a packing bay that has been transcribed as both "Aquario" and "Aquatic". Currently referenced as "Aquario (also referenced as Aquatic)" in warehouse copy. Client confirmation needed on preferred legal/signage spelling.
2. **"Aryan Shed" Status:**
   - Referenced in client notes as a covered shed facility at Conex CFS. It is currently included in the Shaded Warehouse section as a covered staging zone.
3. **Client / Forwarder Logos on `/clients` Page:**
   - The `/clients` page currently includes logos for Goodrich, Jaguar, Transglobal, Astra, Drift, Greenwich, Hublinks, Alliance, Omkar, and Sahara. Client must confirm whether written authorization exists to publicly display these corporate trademarks.

---

## 3. Detailed Audit Documents Produced

1. [`PROJECT_RECOVERY_AUDIT.md`](file:///C:/MSK-Logistics/PROJECT_RECOVERY_AUDIT.md) — This master audit document.
2. [`IMAGE_ASSET_INVENTORY.md`](file:///C:/MSK-Logistics/IMAGE_ASSET_INVENTORY.md) — Comprehensive row-by-row table of all 159 images (dimensions, sizes, subjects, usage, and decisions).
3. [`IMAGE_CONTENT_MAPPING.md`](file:///C:/MSK-Logistics/IMAGE_CONTENT_MAPPING.md) — Section-by-section audit of images vs displayed captions and factual accuracy.
4. [`UNUSED_FILES_REVIEW.md`](file:///C:/MSK-Logistics/UNUSED_FILES_REVIEW.md) — Full analysis of 38 unreferenced images, 7 dead components, and duplicate data files.
5. [`RECOVERY_ACTION_PLAN.md`](file:///C:/MSK-Logistics/RECOVERY_ACTION_PLAN.md) — Phased, step-by-step proposal and clean folder structure for client approval.

---

## 4. Strict Stop Condition Enforced

As explicitly instructed:
- **No files have been deleted.**
- **No images have been generated.**
- **No pages have been redesigned.**
- **No Git history has been altered.**
- **All functional forms, APIs, and routes remain 100% operational.**

Please review these findings and let me know which stabilization phase you would like to approve first.
