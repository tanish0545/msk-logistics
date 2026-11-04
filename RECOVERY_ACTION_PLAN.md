# RECOVERY ACTION PLAN & PROPOSED CLEAN ARCHITECTURE — MSK LOGISTICS

**Audit Date:** November 3, 2026  
**Status:** Proposal Awaiting Client / User Explicit Approval (Zero actions taken yet).  

## 1. Principles of Stabilization

1. **No Destructive Operations Without Approval:** All original client photographs (`drive-staging/IMG-20261022-WA0002.jpg` through `WA0030.jpg`) are permanently preserved.
2. **Single Canonical Path per Photo:** Eliminate triple-copying of photographs. One file, one location, referenced everywhere via data constants.
3. **Fact-First Visual Honesty:** Remove all unverified forwarder names (*Deugro, Jaguar, Yogiji, Transglobal, BBM*) from gallery badges and captions unless backed by signed client consignment documents.
4. **Resolve Hero Blur Optically:** Address the hero sharpness at the source without running new generative prompts.

---

## 2. Proposed Clean Asset Structure

```text
public/images/
  brand/
    msk-logistics-logo.png            # Official logo (150px header standard)
    iso-9001-2015-certified.jpg       # Single canonical ISO seal
    office-jnpt-signboard.jpg         # WA0030 JNPT office
  hero/
    msk-cinematic-transport-master.png # Single high-fidelity hero master
    global-freight-montage-reference.png # Original reference montage
  containers/
    20gp/                             # 5 distinct verified photos
    40gp/                             # 5 distinct verified photos
    40hc/                             # 5 distinct verified photos
    40hc-heavy-duty/                  # 5 distinct verified photos (Sandvik crate WA0005)
    open-top/                         # 5 distinct verified photos
    flat-rack/                        # 5 distinct verified photos (WA0023, WA0026, WA0009)
    reefer/                           # 5 distinct verified photos
  break-bulk/
    cylindrical-cargo-hold.jpg        # WA0019 (Wrapped cylindrical consignment in hold)
    night-hold-cross-lashing.jpg      # WA0020 (Night crane lift & vessel hold cross-lashing)
    cylindrical-road-haulage.jpg      # WA0018 (Multi-axle trailer road haulage)
    mobile-crane-heavy-lift.jpg       # WA0015 (50T telescopic mobile crane lift)
  warehouse/
    open-yard-conex-staging.jpg       # WA0025 (Conex CFS open yard buffer)
    shaded-warehouse-main-bay.jpg     # WA0011 (Covered warehouse & Aryan Shed bay)
    pallet-strapping-staging.jpg      # WA0013 (Pallet strapping & staging)
    covered-staging-bays.jpg          # WA0014 (Covered staging bays)
    industrial-rolls-storage.jpg      # WA0016 (Industrial materials covered storage)
  operations/
    odc-fr-ratchet-lashing.jpg        # WA0024 (Heavy-duty orange ratchet lashing)
    trailer-chassis-lashing.jpg       # WA0008 (Trailer chassis ratchet tie-down)
    vessel-hold-cross-lashing.jpg     # WA0020 (Marine hold cross-lashing network)
    flat-rack-timber-chocking.jpg     # WA0026 (Plywood GSA and timber chocking)
    crane-rigging-crew.jpg            # WA0010 (Vessel crane rigging crew)
    vessel-cell-guides.jpg            # WA0012 (Cellular guide bay stowage)
    skidded-equipment-staging.jpg     # WA0003 (Skidded equipment staging)
    vci-skid-wrapping.jpg             # WA0002 (VCI moisture barrier wrapping)
```

---

## 3. Step-by-Step Implementation Roadmap (Pending User Approval)

### Step 1: Hero Sharpness & Rendering Fix

- **Problem:** In `HeroConcept09.tsx`, the hero image uses an AI-upscaled 2560×1280 asset (`msk-cinematic-port-final.png`) that was enlarged from a 1024×509 source. The CSS property `imageRendering: '-webkit-optimize-contrast'` creates jagged downscaling artifacts on desktop.
- **Fix:**
  1. Remove the `-webkit-optimize-contrast` style so standard smooth bicubic filtering is applied.
  2. Standardize container height and remove redundant overlapping gradient overlays on desktop so vehicles are not obscured by excessive black wash.
  3. Verify that the original transport identities (ship, airplane, train, truck, forklift) are crisply visible without artificial blur.

### Step 2: Consolidate Duplicate Image Assets

- **Problem:** 30 duplicate hash groups (66 files) exist across `drive-staging`, `containers`, `operations`, and `shipments`.
- **Fix:** Retain canonical assets in their logical folders, update `imageAssets.ts` and `containerGuideData.ts` to point to canonical paths, and archive identical copies.

### Step 3: Remove Dead & Unimported Code

- **Problem:** 7 unused components (`HeroVideo`, `HeroVideoSequence`, `IndustrialBadge`, `InteractiveCard`, `RotatingLogisticsCursor`, `StaggeredGrid`, `CartingTreeDiagram`) clutter the codebase.
- **Fix:** Safely move these 7 components into an `archive/components` directory or remove them cleanly after user approval.

### Step 4: Correct Gallery Badges & Captions

- **Problem:** Gallery items on `/operations` and `/services/cargo-lashing` display badges like "Deugro Hold Lashing", "Jaguar & Transglobal", "Yogiji & BBM".
- **Fix:** Remove the unverified forwarder names from the badges. Replace with factual engineering descriptions: "Marine Hold Cross-Lashing", "Heavy-Duty Flat Rack Perimeter Lashing", "Multi-Axle Trailer Chassis Tie-Down".

