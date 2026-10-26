/**
 * MSK LOGISTICS — CLIENT ASSET & PHOTOGRAPH CHECKLIST
 * This file tracks original client-supplied assets vs. representative temporary graphics.
 * Update this checklist as genuine high-resolution client project photos are provided.
 */

export interface AssetRecord {
  category: string;
  expectedFilename: string;
  folderPath: string;
  currentStatus: 'Client-Supplied (Original)' | 'Representative Technical Graphic (Awaiting Client Photo)';
  description: string;
  requiredResolution: string;
}

export const ASSET_CHECKLIST: AssetRecord[] = [
  // 1. Logo
  {
    category: 'Brand Logo',
    expectedFilename: 'msk-logistics-logo.png',
    folderPath: 'public/images/logo/',
    currentStatus: 'Client-Supplied (Original)',
    description: 'Official MSK Logistics Solution primary color logo with curved red/charcoal road mark.',
    requiredResolution: 'Vector or 600px+ transparent PNG (Active)',
  },

  // 2. Flat Rack Shipments
  {
    category: 'Flat Rack Shipment',
    expectedFilename: 'flat-rack-heavy-machinery-lashing.svg',
    folderPath: 'public/images/shipments/flat-rack/',
    currentStatus: 'Representative Technical Graphic (Awaiting Client Photo)',
    description: 'Original photograph of heavy industrial machinery lashed onto MSK-handled 40ft Flat Rack.',
    requiredResolution: '1920×1200 landscape JPG/WebP (High Quality)',
  },
  {
    category: 'Flat Rack Shipment',
    expectedFilename: 'flat-rack-oversized-cargo-chocking.svg',
    folderPath: 'public/images/shipments/flat-rack/',
    currentStatus: 'Representative Technical Graphic (Awaiting Client Photo)',
    description: 'Original photograph of cylindrical boiler or pressure vessel on contoured timber cradle.',
    requiredResolution: '1920×1200 landscape JPG/WebP',
  },
  {
    category: 'Flat Rack Shipment',
    expectedFilename: 'flat-rack-structural-skids.svg',
    folderPath: 'public/images/shipments/flat-rack/',
    currentStatus: 'Representative Technical Graphic (Awaiting Client Photo)',
    description: 'Original photograph of modular skid units secured on Flat Rack bed.',
    requiredResolution: '1920×1200 landscape JPG/WebP',
  },

  // 3. Breakbulk Shipments
  {
    category: 'Breakbulk Shipment',
    expectedFilename: 'breakbulk-heavy-equipment-rigging.svg',
    folderPath: 'public/images/shipments/breakbulk/',
    currentStatus: 'Representative Technical Graphic (Awaiting Client Photo)',
    description: 'Original field photograph of non-containerized heavy equipment rigging & deck lashing.',
    requiredResolution: '1920×1200 landscape JPG/WebP',
  },
  {
    category: 'Breakbulk Shipment',
    expectedFilename: 'breakbulk-project-cargo-stowage.svg',
    folderPath: 'public/images/shipments/breakbulk/',
    currentStatus: 'Representative Technical Graphic (Awaiting Client Photo)',
    description: 'Original photograph of vessel cargo hold stowage and wire lashing.',
    requiredResolution: '1920×1200 landscape JPG/WebP',
  },
  {
    category: 'Breakbulk Shipment',
    expectedFilename: 'breakbulk-industrial-skidded-units.svg',
    folderPath: 'public/images/shipments/breakbulk/',
    currentStatus: 'Representative Technical Graphic (Awaiting Client Photo)',
    description: 'Original photograph of power transformer or reactor on multi-axle trailer.',
    requiredResolution: '1920×1200 landscape JPG/WebP',
  },

  // 4. Open Top Shipments
  {
    category: 'Open Top Shipment',
    expectedFilename: 'open-top-overheight-cargo-tarpaulin.svg',
    folderPath: 'public/images/shipments/open-top/',
    currentStatus: 'Representative Technical Graphic (Awaiting Client Photo)',
    description: 'Original photograph of over-height equipment with blue TIR tarpaulin lashing.',
    requiredResolution: '1920×1200 landscape JPG/WebP',
  },
  {
    category: 'Open Top Shipment',
    expectedFilename: 'open-top-crane-loading-machinery.svg',
    folderPath: 'public/images/shipments/open-top/',
    currentStatus: 'Representative Technical Graphic (Awaiting Client Photo)',
    description: 'Original photograph showing vertical crane loading through open roof with swing header open.',
    requiredResolution: '1920×1200 landscape JPG/WebP',
  },
  {
    category: 'Open Top Shipment',
    expectedFilename: 'open-top-bow-securing-lashing.svg',
    folderPath: 'public/images/shipments/open-top/',
    currentStatus: 'Representative Technical Graphic (Awaiting Client Photo)',
    description: 'Original photograph of roof bows and internal cross lashings in Open Top container.',
    requiredResolution: '1920×1200 landscape JPG/WebP',
  },

  // 5. Container Guide
  {
    category: 'Container Guide',
    expectedFilename: '20ft-standard-dry-container.svg',
    folderPath: 'public/images/containers/',
    currentStatus: 'Representative Technical Graphic (Awaiting Client Photo)',
    description: 'ISO blueprint/photo of 20ft Standard Dry Van.',
    requiredResolution: '1600×1000 vector or clean photograph',
  },
  {
    category: 'Container Guide',
    expectedFilename: '40ft-standard-dry-container.svg',
    folderPath: 'public/images/containers/',
    currentStatus: 'Representative Technical Graphic (Awaiting Client Photo)',
    description: 'ISO blueprint/photo of 40ft Standard Dry Van.',
    requiredResolution: '1600×1000 vector or clean photograph',
  },
  {
    category: 'Container Guide',
    expectedFilename: '40ft-high-cube-container.svg',
    folderPath: 'public/images/containers/',
    currentStatus: 'Representative Technical Graphic (Awaiting Client Photo)',
    description: 'ISO blueprint/photo of 40ft High Cube container.',
    requiredResolution: '1600×1000 vector or clean photograph',
  },
  {
    category: 'Container Guide',
    expectedFilename: 'open-top-container.svg',
    folderPath: 'public/images/containers/',
    currentStatus: 'Representative Technical Graphic (Awaiting Client Photo)',
    description: 'ISO blueprint/photo of Open Top container with tarpaulin.',
    requiredResolution: '1600×1000 vector or clean photograph',
  },
  {
    category: 'Container Guide',
    expectedFilename: 'flat-rack-container.svg',
    folderPath: 'public/images/containers/',
    currentStatus: 'Representative Technical Graphic (Awaiting Client Photo)',
    description: 'ISO blueprint/photo of Flat Rack container with collapsible ends.',
    requiredResolution: '1600×1000 vector or clean photograph',
  },
  {
    category: 'Container Guide',
    expectedFilename: 'reefer-container.svg',
    folderPath: 'public/images/containers/',
    currentStatus: 'Representative Technical Graphic (Awaiting Client Photo)',
    description: 'ISO blueprint/photo of Refrigerated Container.',
    requiredResolution: '1600×1000 vector or clean photograph',
  },

  // 6. Warehouse
  {
    category: 'Open Warehouse',
    expectedFilename: 'open-yard-staging-area.svg',
    folderPath: 'public/images/warehouse/open/',
    currentStatus: 'Representative Technical Graphic (Awaiting Client Photo)',
    description: 'Original photograph of MSK open yard facility near JNPT.',
    requiredResolution: '1920×1200 landscape JPG/WebP',
  },
  {
    category: 'Shaded Warehouse',
    expectedFilename: 'shaded-packing-shed.svg',
    folderPath: 'public/images/warehouse/shaded/',
    currentStatus: 'Representative Technical Graphic (Awaiting Client Photo)',
    description: 'Original photograph of covered packing canopy / shed facility.',
    requiredResolution: '1920×1200 landscape JPG/WebP',
  },
];
