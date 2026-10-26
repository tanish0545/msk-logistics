export interface WarehouseCategory {
  id: 'open' | 'shaded';
  name: string;
  badge: string;
  baseImage: string;
  imageAlt: string;
  imageCaption: string;
  briefDescription: string;
  intendedPurpose: string[];
  operationalScopeNote: string;
  suitability: string[];
}

export const OPEN_WAREHOUSE_IMAGE = '/images/operations/warehouse/open-warehouse-yard-staging.jpg';
export const SHADED_WAREHOUSE_IMAGE = '/images/operations/warehouse/shaded-warehouse-main-bay.jpg';
export const SHARED_WAREHOUSE_IMAGE = OPEN_WAREHOUSE_IMAGE;

export const WAREHOUSE_CATEGORIES: WarehouseCategory[] = [
  {
    id: 'open',
    name: 'Open Warehouse & Yard Staging',
    badge: 'MODE 01 — OPEN WAREHOUSE',
    baseImage: OPEN_WAREHOUSE_IMAGE,
    imageAlt: 'Open-air warehouse staging area with natural daylight sky above stacked cartons and wrapped cargo packages',
    imageCaption: 'Open warehouse staging area: Unobstructed natural sky above stacked export cartons, wrapped packages, and concrete staging floor.',
    briefDescription: 'Open-air staging and yard environment under natural daylight sky, showing cargo staging for weather-resistant consignments, palletized crates, and transit buffer holding ahead of port gate-in.',
    intendedPurpose: [
      'Short-term container buffer holding prior to port terminal gate opening',
      'Staging area for heavy low-bed trailers and mobile hydraulic cranes',
      'Temporary positioning of heavy out-of-gauge (OOG) machinery on skids',
      'Pre-stuffing structural equipment laydown and sorting under open sky',
    ],
    operationalScopeNote: 'Staging arrangements, crane positioning, and vehicle movements are coordinated directly with our Nhava Sheva operational desk based on specific vessel schedules.',
    suitability: [
      'Raw structural steel, pipes, and beams',
      'Heavy machinery pre-packed in weatherproof export crating',
      'Empty and laden shipping container holding',
      'Over-dimension breakbulk components',
    ],
  },
  {
    id: 'shaded',
    name: 'Shaded Warehouse & Packing Bay',
    badge: 'MODE 02 — SHADED WAREHOUSE',
    baseImage: SHADED_WAREHOUSE_IMAGE,
    imageAlt: 'Covered warehouse facility with overhead metal roof shelter protecting stacked cartons and wrapped cargo packages',
    imageCaption: 'Shaded warehouse facility: Heavy-duty metal roof structure protecting stacked export cartons, wrapped materials, and staging bays from weather.',
    briefDescription: 'Covered warehouse environment with overhead metal roof structure designed to protect moisture-sensitive industrial cargo, packaged cartons, crating timber, and barrier foil wrapping against coastal humidity and weather.',
    intendedPurpose: [
      'Sheltered carpentry and timber crating fabrication shielded from precipitation',
      'Application of VCI barrier foil and vacuum sealing for high-precision components',
      'Protected staging of delicate electrical panels and machined spare parts',
      'Dry stuffing and container inspection under overhead metal roof shelter',
    ],
    operationalScopeNote: 'Covered packing bays offer protected staging for cargo requiring barrier foil, desiccants, or climate-isolated preparation prior to container stuffing.',
    suitability: [
      'Machined bare metal surfaces vulnerable to atmospheric corrosion',
      'Electrical switchgears, transformers, and electronic controls',
      'ISPM-15 treated wooden crating awaiting stuffing',
      'Desiccant and barrier foil vacuum-packed consignments',
    ],
  },
];

