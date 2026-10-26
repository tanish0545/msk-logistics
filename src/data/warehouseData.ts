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

/**
 * Requirement 6: Both Open and Shaded Warehouse modes MUST use the exact same image file.
 * Shaded mode applies a semi-transparent charcoal or navy overlay using CSS.
 */
export const SHARED_WAREHOUSE_IMAGE = '/images/operations/warehouse/shaded-warehouse-main-bay.jpg';

export const WAREHOUSE_CATEGORIES: WarehouseCategory[] = [
  {
    id: 'open',
    name: 'Open Warehouse & Yard Staging',
    badge: 'MODE 01 — OPEN YARD STAGING',
    baseImage: SHARED_WAREHOUSE_IMAGE,
    imageAlt: 'Open warehouse and staging ground layout for industrial cargo and container buffer holding',
    imageCaption: 'Natural ambient daylight representation: Open staging ground for heavy fabrications and container buffer holding.',
    briefDescription: 'Open-air storage and industrial yard environment designed for weather-resistant goods, heavy steel fabrications, container holding, and short-term transit buffer staging ahead of port gate-in.',
    intendedPurpose: [
      'Short-term container buffer holding prior to port terminal gate opening',
      'Staging area for heavy low-bed trailers and mobile hydraulic cranes',
      'Temporary positioning of heavy out-of-gauge (OOG) machinery on skids',
      'Pre-stuffing structural equipment laydown and sorting',
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
    badge: 'MODE 02 — SHADED PACKING BAY',
    baseImage: SHARED_WAREHOUSE_IMAGE,
    imageAlt: 'Shaded warehouse and covered packing bay with sheltered canopy protection',
    imageCaption: 'Shaded canopy treatment: Sheltered bay protecting moisture-sensitive cargo and precision crating assemblies.',
    briefDescription: 'Covered canopy and sheltered warehouse environment designed to protect moisture-sensitive industrial cargo, crating timber, barrier foil wrapping, and finished assemblies against coastal humidity and weather.',
    intendedPurpose: [
      'Sheltered carpentry and timber crating fabrication shielded from precipitation',
      'Application of VCI barrier foil and vacuum sealing for high-precision components',
      'Protected staging of delicate electrical panels and machined spare parts',
      'Dry stuffing and container inspection under roof protection',
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
