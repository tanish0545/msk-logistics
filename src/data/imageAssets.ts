export interface ClientImageAsset {
  id: string;
  driveFilename: string;
  localPath: string;
  title: string;
  category: 'container' | 'shipment' | 'operation' | 'warehouse' | 'branding';
  subcategory: 
    | 'high-cube-container'
    | 'flat-rack-container'
    | 'breakbulk-shipment'
    | 'flat-rack-shipment'
    | 'container-loading'
    | 'export-packaging'
    | 'cargo-lashing'
    | 'shaded-warehouse'
    | 'office-signboard';
  alt: string;
  caption: string;
  shortDescription: string;
  verifiedDetails: string;
  websiteSections: ('homepage-gallery' | 'container-guide' | 'import-export' | 'services' | 'operations')[];
  isoCode?: string;
}

/**
 * CLIENT GOOGLE DRIVE IMAGE LIBRARY MAPPING
 * Source Folder: https://drive.google.com/drive/folders/15DibodpfZVm1o1hX2cyKAS1QWQa8yPie
 * Catalogued: October 2026
 * All assets originate from authentic client operations at Nhava Sheva (JNPT) / Navi Mumbai.
 */
export const CLIENT_IMAGE_ASSETS: ClientImageAsset[] = [
  // 1. Containers
  {
    id: 'img-40ft-hc-terminal',
    driveFilename: 'IMG-20261022-WA0004.jpg',
    localPath: '/images/containers/container-40ft-high-cube.jpg',
    title: "40' High Cube Dry Container (9'6\" Height)",
    category: 'container',
    subcategory: 'high-cube-container',
    alt: "Authentic 40ft High Cube container with 9'6\" height warning at Nhava Sheva terminal",
    caption: "40ft High Cube Dry Container staged with shrink-wrapped industrial cargo",
    shortDescription: "Authentic 40ft High Cube container (ISO 45G1) offering 2.69m internal clearance.",
    verifiedDetails: "Marked with official 'CAUTION 9'6\" HIGH' hazard markings. Maersk / DP World yard.",
    websiteSections: ['container-guide', 'homepage-gallery', 'operations'],
    isoCode: '45G1',
  },
  {
    id: 'img-20ft-fr-lashed',
    driveFilename: 'IMG-20261022-WA0023.jpg',
    localPath: '/images/containers/container-20ft-flat-rack.jpg',
    title: "20' Flat Rack Container (25P3)",
    category: 'container',
    subcategory: 'flat-rack-container',
    alt: "20ft Flat Rack Container (MSDU 380109 2) loaded with weather-protected machinery and heavy-duty ratchet lashing",
    caption: "20ft Flat Rack with weather-protected machinery secured with heavy-duty ratchet straps",
    shortDescription: "Specialized 20ft Flat Rack container designed for heavy and oversized industrial cargo.",
    verifiedDetails: "Container ID MSDU 380109 2, ISO code 25P3, 2.9m/9'6\" corner posts, MSC equipment.",
    websiteSections: ['container-guide', 'homepage-gallery', 'import-export'],
    isoCode: '25P3',
  },
  {
    id: 'img-40ft-fr-lashed',
    driveFilename: 'IMG-20261022-WA0026.jpg',
    localPath: '/images/containers/container-40ft-flat-rack.jpg',
    title: "40' Flat Rack Container (45P3)",
    category: 'container',
    subcategory: 'flat-rack-container',
    alt: "40ft Flat Rack Container (MSDU 998398 6) with dual machinery assemblies strapped with orange tension webbings",
    caption: "40ft Flat Rack platform loaded with dual modules secured by high-tensile orange ratchet straps",
    shortDescription: "Heavy-duty 40ft Flat Rack platform loaded with dual industrial machinery consignments.",
    verifiedDetails: "Container ID MSDU 998398 6, ISO code 45P3, 9'6\" corner posts, MSC platform.",
    websiteSections: ['container-guide', 'homepage-gallery', 'import-export'],
    isoCode: '45P3',
  },
  {
    id: 'img-fr-dual-stowage',
    driveFilename: 'IMG-20261022-WA0009.jpg',
    localPath: '/images/containers/container-flat-rack-dual-stowage.jpg',
    title: 'Dual 40ft Flat Racks in Vessel Hold',
    category: 'container',
    subcategory: 'flat-rack-container',
    alt: "Aerial bird's-eye view into ship cargo hold showing dual 40ft Flat Rack containers with heavy yellow ratchet lashings",
    caption: "Overhead view of dual 40ft Flat Rack containers stowed side-by-side with deck D-ring securing",
    shortDescription: "Overhead view of dual 40ft Flat Racks secured with multi-point ratchet webbings in vessel hold.",
    verifiedDetails: "Direct aerial view looking down into container vessel cell guide alongside MSC boxes.",
    websiteSections: ['container-guide', 'homepage-gallery', 'import-export'],
  },

  // 2. Shipments - Flat Rack
  {
    id: 'img-fr-crane-loading',
    driveFilename: 'IMG-20261022-WA0010.jpg',
    localPath: '/images/shipments/flat-rack/flat-rack-crane-loading.jpg',
    title: 'Vessel Crane Loading onto Flat Rack',
    category: 'shipment',
    subcategory: 'flat-rack-shipment',
    alt: "MSK Logistics rigging team guiding crane sling lowering massive industrial component onto Flat Rack inside vessel hold",
    caption: "Rigging specialists guiding crane sling lowering heavy component into ship cell guides",
    shortDescription: "Trained ground rigging crew guiding heavy machinery onto flat rack platform under crane hook.",
    verifiedDetails: "Ground crew in safety helmets and high-vis vests guiding heavy spreader sling.",
    websiteSections: ['homepage-gallery', 'import-export', 'operations'],
  },
  {
    id: 'img-fr-vessel-cell',
    driveFilename: 'IMG-20261022-WA0012.jpg',
    localPath: '/images/shipments/flat-rack/flat-rack-vessel-cell-stowage.jpg',
    title: 'Marine Cell Guide Flat Rack Stowage',
    category: 'shipment',
    subcategory: 'flat-rack-shipment',
    alt: "Flat Rack container with heavy machinery secured in cellular container vessel guide",
    caption: "High-angle view of lashed Flat Rack container stowed inside vessel cell guide",
    shortDescription: "Precision stowage within cellular container ship guides with certified turnbuckles.",
    verifiedDetails: "High-angle view of container ship cell guide slots.",
    websiteSections: ['homepage-gallery', 'import-export'],
  },
  {
    id: 'img-fr-mobile-crane',
    driveFilename: 'IMG-20261022-WA0015.jpg',
    localPath: '/images/shipments/flat-rack/flat-rack-mobile-crane-lift.jpg',
    title: 'Heavy Lift Mobile Crane Rigging',
    category: 'shipment',
    subcategory: 'flat-rack-shipment',
    alt: "Telescopic mobile crane lifting massive cylindrical breakbulk cargo onto Flat Rack container (MSDU 995998 0)",
    caption: "Telescopic mobile crane lifting massive cylindrical cargo onto Flat Rack container",
    shortDescription: "Heavy mobile crane transfer from multi-axle trailer onto heavy-duty flat rack platform.",
    verifiedDetails: "Crane lifting from Ashok Leyland trailer onto yellow Flat Rack MSDU 995998 0.",
    websiteSections: ['homepage-gallery', 'import-export', 'operations'],
  },
  {
    id: 'img-fr-night-lashing',
    driveFilename: 'IMG-20261022-WA0019.jpg',
    localPath: '/images/shipments/flat-rack/flat-rack-night-lashing-hold.jpg',
    title: 'Night Vessel Hold Project Lashing',
    category: 'shipment',
    subcategory: 'flat-rack-shipment',
    alt: "Night-time stowage of cylindrical project cargo with heavy criss-cross ratchet straps in ship hold",
    caption: "Night-time vessel hold lashing with heavy criss-cross webbing straps on Flat Rack",
    shortDescription: "Round-the-clock marine lashing operations securing cylindrical equipment in vessel hold.",
    verifiedDetails: "Stowed between cell guide bulkheads with high-tensile yellow webbing cross-lashings.",
    websiteSections: ['homepage-gallery', 'import-export'],
  },

  // 3. Shipments - Breakbulk
  {
    id: 'img-bb-lowbed-machinery',
    driveFilename: 'IMG-20261022-WA0006.jpg',
    localPath: '/images/shipments/breakbulk/breakbulk-lowbed-machinery-lashing.jpg',
    title: 'Heavy Machinery Low-Bed Transport',
    category: 'shipment',
    subcategory: 'breakbulk-shipment',
    alt: "Heavy skidded industrial machinery secured with heavy ratchet binders on multi-axle low-bed trailer",
    caption: "Heavy skidded machinery secured with heavy ratchet binders on low-bed trailer at container terminal",
    shortDescription: "Multi-axle low-bed transport with timber spreaders and certified heavy ratchet binders.",
    verifiedDetails: "Container terminal yard with COSCO and HMM container stacks in background.",
    websiteSections: ['homepage-gallery', 'import-export', 'operations'],
  },
  {
    id: 'img-bb-heavy-rigging',
    driveFilename: 'IMG-20261022-WA0007.jpg',
    localPath: '/images/shipments/breakbulk/breakbulk-heavy-rigging-trailer.jpg',
    title: 'Project Cargo Trailer Rigging',
    category: 'shipment',
    subcategory: 'breakbulk-shipment',
    alt: "Heavy project cargo secured on trailer alongside logistics prime mover at port yard",
    caption: "Heavy project cargo trailer with prime mover and perimeter container stacks at JNPT yard",
    shortDescription: "Turnkey project cargo securing for non-containerized heavy industrial units.",
    verifiedDetails: "Trailer connected to prime mover labeled 'LOGISTICS PVT' with Triton/OOCL boxes.",
    websiteSections: ['homepage-gallery', 'import-export'],
  },
  {
    id: 'img-bb-cylindrical-haulage',
    driveFilename: 'IMG-20261022-WA0018.jpg',
    localPath: '/images/shipments/breakbulk/breakbulk-cylindrical-haulage.jpg',
    title: 'Oversized Cylindrical Cargo Haulage',
    category: 'shipment',
    subcategory: 'breakbulk-shipment',
    alt: "Ashok Leyland heavy haulage prime mover transporting massive cylindrical unit with protective mesh wrap",
    caption: "Heavy haulage prime mover transporting oversized cylindrical unit under crane hook",
    shortDescription: "Specialized road transport of wrapped cylindrical pressure vessel under mobile crane.",
    verifiedDetails: "Jai Malhar Transport truck with Ashtavinayak crane boom and Maersk containers.",
    websiteSections: ['homepage-gallery', 'import-export'],
  },
  {
    id: 'img-bb-vessel-hold',
    driveFilename: 'IMG-20261022-WA0017.jpg',
    localPath: '/images/shipments/breakbulk/breakbulk-vessel-hold-stowage.jpg',
    title: 'Direct Vessel Hold Breakbulk Stowage',
    category: 'shipment',
    subcategory: 'breakbulk-shipment',
    alt: "High-angle perspective of shrink-wrapped breakbulk machinery secured on vessel deck with ratchet straps",
    caption: "Shrink-wrapped breakbulk machinery secured to ship deck beams with ratchet tie-downs",
    shortDescription: "Direct hold stowage utilizing vessel deck anchor points and heavy timber chocking.",
    verifiedDetails: "Top-down view showing multiple wrapped machinery bases strapped to deck frames.",
    websiteSections: ['homepage-gallery', 'import-export'],
  },

  // 4. Operations - Export Packaging
  {
    id: 'img-pkg-sandvik-crate',
    driveFilename: 'IMG-20261022-WA0005.jpg',
    localPath: '/images/operations/export-packaging/sandvik-heavy-wooden-crate.jpg',
    title: 'Heavy-Duty Wooden Export Crating',
    category: 'operation',
    subcategory: 'export-packaging',
    alt: "Heavy Sandvik wooden export crate and skidded parts prepared for maritime containerization",
    caption: "Heavy-duty wooden export crating and skidded machinery parts prepared for container stuffing",
    shortDescription: "ISPM-15 treated wooden export crating with internal moisture barrier foil packaging.",
    verifiedDetails: "Engineered wooden crate marked with Sandvik branding and skidded equipment.",
    websiteSections: ['homepage-gallery', 'services', 'operations'],
  },
  {
    id: 'img-pkg-skid-wrapping',
    driveFilename: 'IMG-20261022-WA0002.jpg',
    localPath: '/images/operations/export-packaging/heavy-machinery-skid-wrapping.jpg',
    title: 'VCI Moisture Barrier Skid Packaging',
    category: 'operation',
    subcategory: 'export-packaging',
    alt: "Industrial machinery skids wrapped in protective polythene barrier film on heavy timber base",
    caption: "Industrial machinery wrapped in multi-layer stretch film and moisture barrier foil on timber skid",
    shortDescription: "Multi-layer stretch wrapping and weatherproofing for ocean transit cargo skids.",
    verifiedDetails: "Heavy machinery skids staged in container freight yard with DP World/Hapag-Lloyd boxes.",
    websiteSections: ['homepage-gallery', 'services', 'operations'],
  },
  {
    id: 'img-pkg-terminal-staging',
    driveFilename: 'IMG-20261022-WA0003.jpg',
    localPath: '/images/operations/export-packaging/skidded-equipment-terminal-staging.jpg',
    title: 'Skidded Cargo Terminal Staging',
    category: 'operation',
    subcategory: 'export-packaging',
    alt: "Heavy skidded equipment staged in front of 40ft High Cube container stacks at terminal",
    caption: "Skidded machinery positioned in front of 40ft High Cube containers for pre-stuffing audit",
    shortDescription: "Pre-stuffing inspection and staging of skidded machinery in front of 40ft High Cube boxes.",
    verifiedDetails: "Vertical view showing skidded machinery directly in front of Maersk 45G1 container.",
    websiteSections: ['homepage-gallery', 'operations'],
  },

  // 5. Operations - Cargo Lashing
  {
    id: 'img-lash-trailer-chassis',
    driveFilename: 'IMG-20261022-WA0008.jpg',
    localPath: '/images/operations/cargo-lashing/trailer-chassis-ratchet-lashing.jpg',
    title: 'High-Tensile Trailer Ratchet Lashing',
    category: 'operation',
    subcategory: 'cargo-lashing',
    alt: "Close-up of high-tensile ratchet lashing straps securing heavy equipment to transport chassis",
    caption: "High-tensile ratchet lashing straps and corner edge protectors securing cargo to trailer chassis",
    shortDescription: "Certified polyester webbing and ratchet tensioners anchored to chassis tie-down rings.",
    verifiedDetails: "Close-up view of ratchet tensioner handle and strap angle over equipment frame.",
    websiteSections: ['homepage-gallery', 'services', 'operations'],
  },
  {
    id: 'img-lash-vessel-cross',
    driveFilename: 'IMG-20261022-WA0020.jpg',
    localPath: '/images/operations/cargo-lashing/vessel-cross-webbing-lashing.jpg',
    title: 'Marine Hold Cross-Lashing Network',
    category: 'operation',
    subcategory: 'cargo-lashing',
    alt: "Night marine lashing showing cross-webbing straps securing large cylindrical equipment inside ship hold",
    caption: "Marine hold cross-lashing webbing network securing cylindrical cargo during night operations",
    shortDescription: "Engineered criss-cross webbing configuration countering roll, pitch, and heave at sea.",
    verifiedDetails: "Vessel cargo hold bulkheads with overhead floodlights and paired yellow ratchet straps.",
    websiteSections: ['homepage-gallery', 'services', 'operations'],
  },
  {
    id: 'img-lash-flat-rack-orange',
    driveFilename: 'IMG-20261022-WA0024.jpg',
    localPath: '/images/operations/cargo-lashing/flat-rack-heavy-duty-orange-lashing.jpg',
    title: 'Flat Rack Perimeter Ratchet Securing',
    category: 'operation',
    subcategory: 'cargo-lashing',
    alt: "Multiple bright orange heavy-duty ratchet straps securing wrapped cargo to 20ft Flat Rack bed rings",
    caption: "Multiple heavy-duty orange ratchet lashing straps secured to perimeter stake pockets",
    shortDescription: "Precision tensioning with heavy-duty ratchet assemblies bolted to container stake pockets.",
    verifiedDetails: "Left 3/4 angle showing 20ft Flat Rack bed lashing points and timber dunnage blocks.",
    websiteSections: ['homepage-gallery', 'operations'],
  },

  // 6. Operations - Shaded Warehouse
  {
    id: 'img-wh-main-bay',
    driveFilename: 'IMG-20261022-WA0011.jpg',
    localPath: '/images/operations/warehouse/shaded-warehouse-main-bay.jpg',
    title: 'Shaded Warehouse Export Packing Bay',
    category: 'warehouse',
    subcategory: 'shaded-warehouse',
    alt: "Vast covered warehouse interior with high industrial roof and organized stacks of export cargo",
    caption: "Wide view of MSK Logistics shaded warehouse facility with organized export cargo storage",
    shortDescription: "Spacious covered facility protecting weather-sensitive goods from rain, dust, and UV exposure.",
    verifiedDetails: "High-ceiling industrial warehouse structure with clean concrete staging bays.",
    websiteSections: ['homepage-gallery', 'operations', 'services'],
  },
  {
    id: 'img-wh-pallet-strapping',
    driveFilename: 'IMG-20261022-WA0013.jpg',
    localPath: '/images/operations/warehouse/export-pallet-strapping-staging.jpg',
    title: 'Palletized Cargo Strapping & Staging',
    category: 'warehouse',
    subcategory: 'shaded-warehouse',
    alt: "Interior of shaded warehouse showing stacked export cartons strapped with composite strapping on pallets",
    caption: "Interior view of shaded warehouse showing export cartons strapped with composite banding on pallets",
    shortDescription: "Unitized pallet strapping and staging inside covered warehouse before container stuffing.",
    verifiedDetails: "Stacked export cartons on wooden pallets secured with vertical strapping bands.",
    websiteSections: ['homepage-gallery', 'operations'],
  },
  {
    id: 'img-wh-staging-bays',
    driveFilename: 'IMG-20261022-WA0014.jpg',
    localPath: '/images/operations/warehouse/covered-staging-bays-pallets.jpg',
    title: 'Covered Warehouse Staging Bays',
    category: 'warehouse',
    subcategory: 'shaded-warehouse',
    alt: "Shaded warehouse staging bays with organized export pallets and forklift access aisles",
    caption: "Covered staging bays with marked forklift transit aisles and organized export cargo",
    shortDescription: "Designated cargo staging bays designed for rapid pre-stuffing consolidation and verification.",
    verifiedDetails: "Wide transit aisle inside warehouse facility with staged shrink-wrapped pallets.",
    websiteSections: ['homepage-gallery', 'operations'],
  },
  {
    id: 'img-wh-industrial-rolls',
    driveFilename: 'IMG-20261022-WA0016.jpg',
    localPath: '/images/operations/warehouse/industrial-rolls-covered-storage.jpg',
    title: 'Industrial Materials Covered Storage',
    category: 'warehouse',
    subcategory: 'shaded-warehouse',
    alt: "Organized rows of packaged industrial rolls stored safely inside covered warehouse facility",
    caption: "Organized rows of packaged industrial materials stored safely inside covered warehouse facility",
    shortDescription: "Dedicated indoor storage preserving moisture-sensitive industrial materials and fabrics.",
    verifiedDetails: "Longitudinal rows of packaged industrial rolls on clean warehouse floor.",
    websiteSections: ['homepage-gallery', 'operations'],
  },

  // 7. Official Branding & Certification
  {
    id: 'img-msk-office-signboard',
    driveFilename: 'IMG-20261022-WA0030.jpg',
    localPath: '/images/operations/office/msk-jnpt-office-signboard.jpg',
    title: 'MSK Logistic Solution JNPT Navi Mumbai Office',
    category: 'branding',
    subcategory: 'office-signboard',
    alt: "Official office signboard of MSK Logistic Solution at JNPT Township Colony Navi Mumbai with ISO 9001:2015",
    caption: "Official office signboard showing ISO 9001:2015 certification, GST number, and contact details",
    shortDescription: "Official signboard confirming ISO 9001:2015 certification and JNPT Navi Mumbai registration.",
    verifiedDetails: "JNPT Township Colony, Sector-3, Bldg B/48, Office 3, Navi Mumbai 400702. GST 27AXWPK456261ZX.",
    websiteSections: ['operations'],
  },
];

/**
 * Filtered array specifically curated for the Homepage Cinematic Operational Marquee Gallery
 */
export const HOMEPAGE_OPERATIONAL_GALLERY = CLIENT_IMAGE_ASSETS.filter(img => 
  img.websiteSections.includes('homepage-gallery')
);
