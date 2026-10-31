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
  tagline: 'Export Packing. Container Stuffing. Cargo Securing.',
  headlineCopy: 'Reliable export packing solutions designed around your cargo, container arrangements, and shipment requirements.',
  location: 'Navi Mumbai, Maharashtra, India',
  address: 'JNPT Township Colony, Sector - 3, Building No. B/48, Office No. 3, Navi Mumbai 400702, Maharashtra, India',
  email: 'info@msklogisticsolution.com',
  emailHref: 'mailto:info@msklogisticsolution.com',
  infoEmail: 'info@msklogisticsolution.com',
  infoEmailHref: 'mailto:info@msklogisticsolution.com',
  accountsEmail: 'accounts@msklogisticsolution.com',
  accountsEmailHref: 'mailto:accounts@msklogisticsolution.com',
  phone: '+91 81045 92823',
  phoneHref: 'tel:+918104592823',
  gateway: 'Nhava Sheva (JNPT) • Western Gateway Maritime Corridors',
  operationalCoordinates: '18.9894° N, 73.0416° E',
  docRef: 'DOC. REF: MSK-EXP-2026',
};

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: 'export-packaging',
    slug: 'export-packaging',
    title: 'Export Packaging',
    tag: 'SEC. 01 / PACKAGING',
    shortDescription: 'Industrial-grade packaging engineered for export shipments, protecting machinery, components, and palletized cargo against transit stresses.',
    fullDescription: 'MSK Logistics delivers structured export packaging tailored to cargo specifications, destination regulations, and transport modes. We plan packaging around cargo dimensions, weight distribution, and handling requirements to prepare your goods securely before container stuffing.',
    image: '/images/services/export-packaging.webp',
    keyActivities: [
      'Cargo-specific packaging planning & material selection',
      'Industrial wooden crating, skidding, and heavy-duty casing',
      'Corrosion protection, barrier foil wrapping & desiccants',
      'Palletization, banding, and shrink-wrapping for multi-piece shipments',
      'Pre-stuffing inspection and export compliance marking'
    ],
    customerResponsibilities: [
      'Provide accurate cargo dimensions, gross weights, and fragile points',
      'Specify destination country packaging requirements or import restrictions',
      'Supply cargo to designated packing site or arrange facility access',
      'Identify any sensitive electrical or moisture-vulnerable components'
    ],
    operationalScope: [
      'Pre-shipment packaging assessment',
      'Tailored timber and barrier material implementation',
      'Integration with subsequent stuffing and securing sequences'
    ]
  },
  {
    id: 'container-stuffing',
    slug: 'container-stuffing',
    title: 'Container Stuffing',
    tag: 'SEC. 02 / STUFFING',
    shortDescription: 'Methodical loading and weight-distribution planning inside standard dry vans, open tops, and specialized export containers.',
    fullDescription: 'Container stuffing requires meticulous sequencing to optimize container volume while preserving axle and container floor weight ratings. MSK Logistics coordinates stuffing operations with precision loading plans, ensuring safe placement and zero cargo movement.',
    image: '/images/services/container-stuffing.webp',
    keyActivities: [
      'Container pre-loading structural and cleanliness inspection',
      'Cargo loading sequence planning based on weight distribution',
      'Forklift and crane positioning coordination for heavy units',
      'Space utilization optimization to prevent in-transit shifting',
      'Preparation of cargo staging surfaces for securing anchorages'
    ],
    customerResponsibilities: [
      'Ensure cargo is ready and packed for container positioning',
      'Confirm container availability and gate-in timeline at the site',
      'Provide loading priority lists for multi-product shipments',
      'Verify container tare weight and shipping line payload limits'
    ],
    operationalScope: [
      'Staging area coordination',
      'Sequential stuffing execution',
      'Weight distribution alignment with marine safety standards'
    ]
  },
  {
    id: 'cargo-lashing',
    slug: 'cargo-lashing',
    title: 'Cargo Lashing and Securing',
    tag: 'SEC. 03 / LASHING',
    shortDescription: 'Certified lashing, chocking, and heavy-duty bracing inside shipping containers to withstand dynamic maritime ocean conditions.',
    fullDescription: 'Marine transit subjects cargo to multi-directional forces—roll, pitch, yaw, and heavy vibration. MSK Logistics provides engineered cargo securing using heavy polyester webbing, high-tensile ratchet straps, steel wire ropes, timber chocking, and turnbuckles anchored to container eyelets.',
    image: '/images/services/cargo-lashing.webp',
    keyActivities: [
      'Calculation of restraint requirements based on cargo center of gravity',
      'Heavy-duty ratchet strap, wire rope, and chain lashing installation',
      'Custom timber blocking, chocking, and floor shoring',
      'Corner-post bracing and modular void filling',
      'Post-securing tension inspection before container doors are sealed'
    ],
    customerResponsibilities: [
      'Highlight internal cargo center of gravity and lifting/lashing lugs',
      'Verify special securing requirements dictated by cargo manufacturer',
      'Confirm whether sea-freight or intermodal transit is scheduled',
      'Inspect agreed securing work prior to final container door sealing'
    ],
    operationalScope: [
      'Internal anchor point verification',
      'Dynamic force mitigation using compliant lashing gear',
      'Handover inspection for export seal application'
    ]
  }
];

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
