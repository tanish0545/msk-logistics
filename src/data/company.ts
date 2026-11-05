export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  tag: string;
  keyActivities: string[];
  customerResponsibilities: string[];
  operationalScope: string[];
}

export const COMPANY_DETAILS = {
  legalName: 'MSK Logistics Pvt. Ltd.',
  publicName: 'MSK Logistics Pvt. Ltd.',
  tagline: 'Beyond Logistics, We Deliver Trust.',
  brandTagline: 'Beyond Logistics, We Deliver Trust.',
  headlineCopy: 'Reliable export packing solutions designed around your cargo, container arrangements, and shipment requirements.',
  location: 'Navi Mumbai, Maharashtra, India',
  address: 'Office No-A-428, 4th Floor, Balaji Bhawan, Plot No-42A, Sector 11, CBD Belapur, Navi Mumbai 400 614, Maharashtra, India',
  registeredOffice: 'Office No-A-428, 4th Floor, Balaji Bhawan, Plot No-42A, Sector 11, CBD Belapur, Navi Mumbai 400 614, Maharashtra, India',
  branchOffice: 'JNPT Township Colony, Sector - 3, Building No. B/48, Office No. 3, Navi Mumbai 400702, Maharashtra, India',
  email: 'info@msklogisticsolution.com',
  emailHref: 'mailto:info@msklogisticsolution.com',
  infoEmail: 'info@msklogisticsolution.com',
  infoEmailHref: 'mailto:info@msklogisticsolution.com',
  accountsEmail: 'accounts@msklogisticsolution.com',
  accountsEmailHref: 'mailto:accounts@msklogisticsolution.com',
  phone: '+91 81045 92823',
  phoneHref: 'tel:+918104592823',
  emergencyPhone: '8108672929',
  emergencyPhoneDisplay: '+91 81086 72929',
  emergencyPhoneHref: 'tel:8108672929',
  emergencyAvailability: '24×7 Available',
  gateway: 'Nhava Sheva (JNPT) • Western Gateway Maritime Corridors',
  operationalCoordinates: '18.9894° N, 73.0416° E',
  docRef: 'DOC. REF: MSK-EXP-2026',
};

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: 'ocean-cargo',
    slug: 'ocean-cargo',
    title: 'Ocean Cargo',
    tag: 'SEC. 01 / OCEAN FREIGHT',
    shortDescription: 'Comprehensive ocean freight handling, maritime container coordination, and vessel hold stowage operating through Nhava Sheva (JNPT) and western shipping gateways.',
    fullDescription: 'MSK Logistics coordinates dedicated ocean cargo operations for export and import consignments. Operating from Western India’s primary maritime corridor at JNPT, we manage container staging, FCL/LCL transfers, terminal port gate-in schedules, and secure vessel stowage preparation.',
    image: '/images/import-export/fcl-dedicated-shipping.webp',
    keyActivities: [
      'Cargo handling of Export Import & Ocean Cargo',
      'Port terminal gate-in and vessel schedule alignment at JNPT',
      'FCL dedicated container coordination and LCL consolidation handling',
      'Container staging and marine interchange protocol verification',
      'Customs clearance support for EXIM and SEZ goods'
    ],
    customerResponsibilities: [
      'Provide booking note, shipping line details, and container release order',
      'Confirm vessel cut-off dates and terminal gate opening schedule',
      'Supply customs shipping bills and compliant export documentation',
      'Specify temperature or atmospheric transit requirements for ocean legs'
    ],
    operationalScope: [
      'Port corridor transit and CFS transfer coordination',
      'Vessel cut-off schedule tracking and terminal compliance',
      'Seamless hand-off to marine terminal and shipping line operators'
    ]
  },
  {
    id: 'air-cargo',
    slug: 'air-cargo',
    title: 'Air Cargo',
    tag: 'SEC. 02 / AIR FREIGHT',
    shortDescription: 'Time-critical air cargo handling, airport terminal transfers, specialized aircraft palletisation, and expedited export customs processing.',
    fullDescription: 'Air shipments demand swift turnaround, strict weight adherence, and secure packaging protection. MSK Logistics provides dedicated air cargo logistics, executing certified lightweight wooden skidding, carton palletisation, airport staging, and customs clearance for export, import, and SEZ shipments.',
    image: '/images/services/air-cargo.png',
    keyActivities: [
      'Cargo handling of Air Cargo and expedited export transfers',
      'Custom palletisation and banding tailored to air freight ULD standards',
      'VCI barrier foil and vacuum protection for high-value airborne parts',
      'Customs clearance assistance for Air EXIM and SEZ goods',
      'Airport cargo terminal positioning and hand-off execution'
    ],
    customerResponsibilities: [
      'Provide airway bill (AWB) booking references and flight schedule',
      'Confirm cargo gross weight and dimensional volume limits',
      'Ensure dangerous goods (DGR) declarations are completed if applicable',
      'Coordinate airport staging timeline with our operations team'
    ],
    operationalScope: [
      'Rapid export crating and air-compliant palletisation',
      'Documentation review for airport terminal acceptance',
      'Transit buffer and direct delivery to airport air cargo terminals'
    ]
  },
  {
    id: 'container-stuffing',
    slug: 'container-stuffing',
    title: 'Container Stuffing Logistics',
    tag: 'SEC. 03 / STUFFING',
    shortDescription: 'Methodical container loading, OEM yard box packing, and precision weight-distribution planning across standard dry vans, open tops, and specialized export containers.',
    fullDescription: 'Container stuffing requires meticulous sequencing to optimize container volume while preserving axle and container floor weight ratings. MSK Logistics coordinates stuffing operations at leading CFS facilities including Punjab and Polaris, ensuring safe placement, ODC staging, zero cargo movement, and total marine transit integrity.',
    image: '/images/services/container-stuffing.webp',
    keyActivities: [
      'Container pre-loading structural and cleanliness inspection',
      'Cargo loading sequence planning based on weight distribution',
      'Container stuffing operations across Punjab and Polaris CFS facilities',
      'Forklift and mobile crane positioning coordination for heavy units',
      'ODC and OEM yard packaging box stuffing and securing'
    ],
    customerResponsibilities: [
      'Ensure cargo is ready and packed for container positioning',
      'Confirm container availability and gate-in timeline at the site',
      'Provide loading priority lists for multi-product shipments',
      'Verify container tare weight and shipping line payload limits'
    ],
    operationalScope: [
      'Staging area coordination and sequence planning',
      'Sequential stuffing execution by trained rigging specialists',
      'Weight distribution alignment with marine safety standards'
    ]
  },
  {
    id: 'special-project',
    slug: 'special-project',
    title: 'Special Project Cargo Handling',
    tag: 'SEC. 04 / SPECIAL PROJECT CARGO',
    shortDescription: 'Specialist in Over-Dimensional Cargo (ODC), heavy machinery rigging, flat-rack securing, and project cargo execution from Nhava Sheva and Mundra ports.',
    fullDescription: 'Heavy and oversized project cargo demands specialized industrial engineering. MSK Logistics is a recognized specialist in Project and Over-Dimensional Cargo (ODC) handling operating through Nhava Sheva and Mundra gateways, providing flat rack container securing, heavy low-bed trailer haulage, and specialized mobile crane rigging for complex industrial freight.',
    image: '/images/shipments/break-bulk/breakbulk-night-crane-qc04-hoist.jpg',
    keyActivities: [
      'Specialist in Project (ODC) handling from Nhava Sheva and Mundra',
      'Flat-rack and open-top heavy machinery positioning and tie-down',
      'Heavy-duty turnbuckle, high-tensile wire rope, and chain lashing',
      'Low-bed hydraulic trailer movement and route clearance coordination',
      'Customized hardwood timber bed chocking and structural skidding'
    ],
    customerResponsibilities: [
      'Supply precise engineering drawings with center of gravity and lifting lugs',
      'Confirm total dimensions (length, width, height) including protrusions',
      'Coordinate flat-rack container availability with shipping line carriers',
      'Approve specialized securing plan prior to terminal gate dispatch'
    ],
    operationalScope: [
      'Heavy lift and mobile crane rigging on site',
      'Over-dimensional structural calculations and multi-point lashings',
      'Port terminal liaison for out-of-gauge (OOG) vessel loading'
    ]
  },
  {
    id: 'cargo-lashing',
    slug: 'cargo-lashing',
    title: 'Cargo Lashing',
    tag: 'SEC. 05 / CARGO LASHING',
    shortDescription: 'Certified marine cargo lashing, timber chocking, container securing, and high-tensile composite strapping engineered for complete sea freight protection.',
    fullDescription: 'MSK Logistics delivers certified cargo lashing and securing disciplines encompassing container box lashing, flat rack tie-downs, certified timber chocking, heavy-duty ratchet lashing, and cargo nets engineered for severe maritime transit conditions.',
    image: '/images/services/cargo-lashing.webp',
    keyActivities: [
      'Marine cargo lashing and timber chocking with heavy ratchet straps and wire ropes',
      'Container box lashing, flat rack turnbuckle rigging, and safety nets',
      'ODC & heavy machinery floor chocking with ISPM-15 hardwood beams',
      'Composite polyester strapping and dynamic cargo stabilization',
      'Pre-shipment lashing survey inspection and certification'
    ],
    customerResponsibilities: [
      'Identify internal fragile points and cargo handling requirements',
      'Specify destination country timber packaging regulations (e.g., ISPM-15)',
      'Confirm transit mode (sea freight, air freight, or intermodal rail/road)',
      'Inspect agreed securing work before final container door locking'
    ],
    operationalScope: [
      'Internal anchor point verification and tensile testing',
      'Dynamic force mitigation with certified restraint materials',
      'Final handover inspection and photographic documentation'
    ]
  },
  {
    id: 'hazardous-cargo',
    slug: 'hazardous-cargo',
    title: 'Hazardous Cargo Handling & Packaging',
    tag: 'SEC. 06 / DANGEROUS GOODS (DG)',
    shortDescription: 'Technical packaging, UN-certified container securing, chemical drum lashing, and regulatory coordination in accordance with IMDG Code and IATA DGR standards.',
    fullDescription: 'Dangerous Goods (DG) and hazardous chemical consignments require rigorous adherence to international maritime and aviation protocols. MSK Logistics coordinates certified container stuffing, chemical drum securing, IBC tote restraint, and regulatory documentation checks at Nhava Sheva (JNPT) and Mundra. All operations are strictly subject to verified cargo classification, manufacturer Safety Data Sheets (SDS), carrier line acceptance, and statutory port authority approvals.',
    image: '/images/hazardous/un3265-corrosive-class-8-drums.jpg',
    keyActivities: [
      'Dangerous Goods (DG) container loading, timber bulkheading, and segregation planning',
      'UN-rated steel and HDPE chemical drum palletisation and composite strapping',
      'Intermediate Bulk Container (IBC) tote securing and base-level anti-skid chocking',
      'IMDG Code maritime segregation table verification for multi-product ocean containers',
      'Pre-stowage dangerous cargo inspection and port terminal gate-in coordination'
    ],
    customerResponsibilities: [
      'Provide 16-point manufacturer Safety Data Sheet (SDS / MSDS) before booking',
      'Confirm accurate UN Number, Proper Shipping Name (PSN), Hazard Class, and Packing Group',
      'Supply certified Shipper’s Declaration for Dangerous Goods (DGD) and packaging test certificates',
      'Ensure primary packaging meets UN certification standards (UN packaging codes)',
      'Confirm shipping line and port terminal acceptance for specific class and port cut-offs'
    ],
    operationalScope: [
      'Technical packaging review against IMDG / IATA DGR requirements',
      'Engineered internal container dunnage, segregation barriers, and high-tensile lashing',
      'Dedicated handling in compliance with carrier approvals and port authority safety protocols'
    ]
  }
];

/**
 * Dedicated Warehouse Facility Record (Exclusively Managed within Warehouse Section)
 */
export const WAREHOUSE_FACILITY_RECORD: ServiceItem = {
  id: 'warehouse',
  slug: 'warehouse',
  title: 'Warehouse',
  tag: 'FACILITY / WAREHOUSING',
  shortDescription: 'Dedicated open yard staging grounds and shaded covered warehouse facilities at Nhava Sheva for cargo buffer holding, consolidation, and pre-stuffing prep.',
  fullDescription: 'Strategically positioned adjacent to Jawaharlal Nehru Port (JNPT), MSK Logistics offers comprehensive warehousing solutions comprising open-air yard staging for heavy machinery and weather-resistant units, alongside covered warehouse bays for moisture-sensitive export packing and palletisation.',
  image: '/images/operations/warehouse/shaded-warehouse-main-bay.jpg',
  keyActivities: [
    'Open yard container buffer holding prior to port terminal gate opening',
    'Covered warehouse packing bays with overhead metal roof shelter',
    'Pre-stuffing equipment sorting, consolidation, and staging laydown',
    'Truck and heavy low-bed trailer movement coordination',
    'Sheltered carpentry, palletisation, and barrier foil packing'
  ],
  customerResponsibilities: [
    'Specify storage duration, expected gate-in date, and buffer requirements',
    'Indicate weather sensitivity (open yard vs. shaded covered storage)',
    'Provide delivery truck driver details and positioning timelines',
    'Authorize cargo handling protocols during warehouse staging'
  ],
  operationalScope: [
    '24×7 monitored staging and container buffer operations',
    'Seamless transit between warehouse bays and port container terminals',
    'Integrated packaging, palletisation, and stuffing on-site'
  ]
};

export const EXPORT_SOLUTIONS = {
  option01: {
    id: 'client_container_and_cargo',
    legacyId: 'complete',
    optionNumber: '01',
    badge: 'OPTION 01 — CONTAINER & CARGO READY',
    title: 'Client-Arranged Container & Cargo',
    subheading: 'You provide the cargo and the container. MSK handles the packing work.',
    summary: 'Already have your cargo and container arranged? MSK Logistics performs the agreed export packaging, container stuffing, and cargo lashing work.',
    customerCargo: 'Provided by the client.',
    containerStatus: 'Arranged and provided by the client.',
    containerSourcing: "Client's responsibility.",
    mskPackaging: 'Performed by MSK as agreed.',
    mskStuffing: 'Performed by MSK as agreed.',
    mskLashing: 'Performed by MSK as agreed.',
    pricingNote: 'Quotation based on the agreed work scope.',
    image: '/images/import-export/client-container-cargo.webp',
    criticalNotice: 'MSK Logistics does not supply or arrange the shipping container under this arrangement.'
  },
  option02: {
    id: 'client_cargo_container_arranged_by_client',
    legacyId: 'client-arranged',
    optionNumber: '02',
    badge: 'OPTION 02 — CONTAINER TO BE ARRANGED',
    title: 'Client Cargo, Container to Be Arranged',
    subheading: 'You provide the cargo and arrange the container separately.',
    summary: 'Have products ready but no container yet? Arrange a suitable container independently, then MSK Logistics can perform the agreed export packaging, container stuffing, and cargo lashing work.',
    customerCargo: 'Provided by the client.',
    containerStatus: 'Must be arranged and provided by the client.',
    containerSourcing: "Client's responsibility.",
    mskPackaging: 'Performed by MSK as agreed.',
    mskStuffing: 'Performed by MSK as agreed.',
    mskLashing: 'Performed by MSK as agreed.',
    pricingNote: 'Quotation based on the agreed work scope.',
    image: '/images/import-export/client-cargo-ready.webp',
    criticalNotice: 'MSK Logistics does not supply or arrange the shipping container under this arrangement.'
  },
  // Backward compatibility aliases
  get complete() { return this.option01; },
  get clientArranged() { return this.option02; }
};

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Select Your Export Packing Arrangement',
    description: 'Choose between Client-Arranged Container & Cargo (Option 01) or Client Cargo, Container to Be Arranged (Option 02).'
  },
  {
    step: '02',
    title: 'Share Cargo & Shipment Details',
    description: 'Provide cargo specifications, approximate weight, dimensions, packaging requirements, and operational location.'
  },
  {
    step: '03',
    title: 'Requirement Review & Planning',
    description: 'MSK operational specialists review the cargo characteristics to plan appropriate materials, stuffing sequence, and lashing methods.'
  },
  {
    step: '04',
    title: 'Quotation & Scope Confirmation',
    description: 'Receive a transparent quotation detailing agreed work scope, container responsibility, material specifications, and exclusions.'
  },
  {
    step: '05',
    title: 'Confirm Schedule & Staging',
    description: 'Finalize packing schedule, container positioning timeline, and site access coordination at the designated packing facility.'
  },
  {
    step: '06',
    title: 'Execute Packaging, Stuffing & Lashing',
    description: 'Our experienced industrial crew carries out the agreed packaging, precise container stuffing, and heavy-duty cargo securing.'
  },
  {
    step: '07',
    title: 'Inspection & Completion Handover',
    description: 'Final work verification is completed before container door sealing, with agreed documentation and photographs handed over.'
  }
];

export const OPERATIONAL_COMMITMENTS = [
  {
    title: 'Clearly Defined Service Scope',
    description: 'Transparent deliverables with itemized boundaries between customer responsibilities and MSK operational tasks.'
  },
  {
    title: 'Integrated Packaging, Stuffing & Lashing',
    description: 'Coordinated execution where packaging protection and container tie-down engineering work seamlessly together.'
  },
  {
    title: 'Flexible Container Arrangements',
    description: 'Adaptable to either turnkey container sourcing or packing into client/carrier-provided containers.'
  },
  {
    title: 'Cargo-Specific Engineering',
    description: 'Securing methods engineered around actual machinery weights, center-of-gravity, and marine shipping dynamics.'
  },
  {
    title: 'Direct Operational Communication',
    description: 'Direct contact with operations personnel at JNPT / Navi Mumbai without call-center intermediaries.'
  },
  {
    title: 'Quote-Based Work Planning',
    description: 'Detailed pre-work evaluation ensuring no hidden container charges or unexpected scope changes during execution.'
  }
];
