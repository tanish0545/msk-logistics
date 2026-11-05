export interface DimensionUnit {
  metricMeters: string;
  metricMm: string;
  imperial: string;
}

export interface ContainerGalleryImage {
  url: string;
  caption: string;
  alt: string;
  isAuthenticClient?: boolean;
  referenceTag?: string;
}

export interface ContainerDetail {
  id: string;
  name: string;
  code: string;
  category: 'Standard' | 'High Cube' | 'Specialized' | 'Temperature Controlled';
  exteriorImage: string;
  exteriorCaption: string;
  exteriorAlt: string;
  interiorImage: string;
  interiorCaption: string;
  interiorAlt: string;
  clientFieldImage?: string;
  clientFieldCaption?: string;
  clientFieldAlt?: string;
  galleryImages: ContainerGalleryImage[];
  externalDimensions: {
    length: DimensionUnit;
    width: DimensionUnit;
    height: DimensionUnit;
  };
  internalDimensions: {
    length: DimensionUnit;
    width: DimensionUnit;
    height: DimensionUnit;
  };
  doorOpening: {
    width: DimensionUnit;
    height: DimensionUnit;
  };
  topOpening?: {
    length: DimensionUnit;
    width: DimensionUnit;
  };
  maxGrossWeight: {
    kg: string;
    lbs: string;
  };
  tareWeight: {
    kg: string;
    lbs: string;
  };
  maxPayload: {
    kg: string;
    lbs: string;
  };
  cubicCapacity: {
    cbm: string;
    cuft: string;
  };
  recommendedUse: string;
  stuffingAdvice: string;
  operationalDisclaimer: string;
}

export const CONTAINER_LIST: ContainerDetail[] = [
  // 1. 20ft Standard Dry Container
  {
    id: '20ft-standard',
    name: "20' Standard Dry Container",
    code: "20' GP / Standard Dry",
    category: 'Standard',
    exteriorImage: '/images/containers/20ft-standard-dry-exterior.jpg',
    exteriorCaption: "20ft Standard Dry Container (ISO 22G1) exterior view with heavy-duty locking bars and 8'6\" standard height",
    exteriorAlt: "Exterior three-quarter view of standard 20ft dry shipping container with blue corrugated steel walls and double cargo doors",
    interiorImage: '/images/containers/20ft-standard-dry-interior.jpg',
    interiorCaption: "20ft Dry interior showing marine plywood plank flooring, corrugated steel walls, and upper/lower lashing D-rings",
    interiorAlt: "Interior view looking inside an empty 20ft shipping container showing wooden plank floorboards and steel sidewalls with tie-down rings",
    galleryImages: [
      {
        url: '/images/containers/20ft-standard-dry-exterior.jpg',
        caption: "20ft Standard Dry Container (ISO 22G1) exterior: 6.06m length, standard 8'6\" (2.59m) height, Corten steel corrugated walls, and dual locking cams per door.",
        alt: "Exterior three-quarter view of 20ft standard dry container",
      },
      {
        url: '/images/containers/20ft-standard-dry-interior.jpg',
        caption: "Internal cargo hold: 5.90m depth with 28mm marine plywood flooring, corrugated side panels, and top/bottom perimeter lashing D-rings.",
        alt: "Interior perspective of 20ft shipping container looking toward front bulkhead",
      },
      {
        url: '/images/containers/20ft-standard-dry-doors.jpg',
        caption: "Rear double door hardware: Dual galvanized lockrods, customs high-security bolt seal bracket, and certified CSC safety plate stamped for 30,480 kg max gross weight.",
        alt: "Close-up of 20ft container rear doors, lockrods, and CSC safety plate",
      },
      {
        url: '/images/containers/20ft-standard-dry-yard.jpg',
        caption: "Terminal yard staging: Compact 20ft standard dry container (6.06m length) positioned on terminal concrete pavement, highlighting realistic 20-foot proportions.",
        alt: "20ft standard dry container staged in container yard with terminal cranes in background",
      },
    ],
    externalDimensions: {
      length: { metricMeters: '6.06 m', metricMm: '6,058 mm', imperial: "20' 0\"" },
      width: { metricMeters: '2.44 m', metricMm: '2,438 mm', imperial: "8' 0\"" },
      height: { metricMeters: '2.59 m', metricMm: '2,591 mm', imperial: "8' 6\"" },
    },
    internalDimensions: {
      length: { metricMeters: '5.90 m', metricMm: '5,898 mm', imperial: "19' 4\"" },
      width: { metricMeters: '2.35 m', metricMm: '2,352 mm', imperial: "7' 8\"" },
      height: { metricMeters: '2.39 m', metricMm: '2,393 mm', imperial: "7' 10\"" },
    },
    doorOpening: {
      width: { metricMeters: '2.34 m', metricMm: '2,343 mm', imperial: "7' 8\"" },
      height: { metricMeters: '2.28 m', metricMm: '2,280 mm', imperial: "7' 5\"" },
    },
    maxGrossWeight: { kg: '30,480 kg', lbs: '67,200 lbs' },
    tareWeight: { kg: '2,200 – 2,350 kg', lbs: '4,850 – 5,180 lbs' },
    maxPayload: { kg: '28,130 – 28,280 kg', lbs: '62,020 – 62,350 lbs' },
    cubicCapacity: { cbm: '33.2 m³', cuft: '1,172 cu ft' },
    recommendedUse: 'High-density cargo, industrial machinery spare parts, steel coils, bagged minerals, and compact palletized goods.',
    stuffingAdvice: 'Concentrate heavier weight near the center floor beams. Use timber chocking against container corner posts to prevent shifting.',
    operationalDisclaimer: 'Measurements reflect ISO 1496/1 standard series. Exact tare weight and door clearances vary slightly across shipping lines and manufacturers.',
  },

  // 2. 40ft Standard Dry Container
  {
    id: '40ft-standard',
    name: "40' Standard Dry Container",
    code: "40' GP / Standard Dry",
    category: 'Standard',
    exteriorImage: '/images/containers/40ft-standard-dry-exterior.jpg',
    exteriorCaption: "40ft Standard Dry Container (ISO 42G1) exterior view showing its full 12.19m length and 8'6\" standard height",
    exteriorAlt: "Exterior perspective of green 40ft standard dry container showing double doors and long corrugated side profile",
    interiorImage: '/images/containers/40ft-standard-dry-interior.jpg',
    interiorCaption: "40ft Dry deep interior perspective looking down the full 12-meter cargo floor to the corrugated bulkhead",
    interiorAlt: "Wide-angle interior view looking down the deep 40ft shipping container cargo hold with wooden floor and lashing rails",
    galleryImages: [
      {
        url: '/images/containers/40ft-standard-dry-exterior.jpg',
        caption: "40ft Standard Dry Container (ISO 42G1) exterior: Full 12.19m length and standard 8'6\" (2.59m) profile with corrugated Corten steel panels.",
        alt: "Exterior view of 40ft standard dry container",
        referenceTag: "Exterior Profile (12.19m)",
      },
      {
        url: '/images/containers/40ft-standard-dry-interior.jpg',
        caption: "Internal 12.03m wooden cargo floor, side corrugated panels, and structural corner posts with 67.7 m³ cubic capacity.",
        alt: "Interior perspective of 40ft standard shipping container looking towards front bulkhead",
        referenceTag: "Internal Cargo Floor",
      },
      {
        url: '/images/containers/40ft-standard-dry-doors.jpg',
        caption: "Rear double doors & hardware: Four galvanized locking bars, center customs security hasp, rubber gaskets, and certified CSC safety plate stamped for 30,480 kg max gross weight.",
        alt: "Rear double doors of 40ft standard dry container showing locking rods and CSC plate",
        referenceTag: "Locking Hardware & CSC Plate",
      },
      {
        url: '/images/containers/40ft-standard-dry-yard.jpg',
        caption: "Terminal yard staging: Full-length 12.19m exterior perspective of 40ft standard dry container (ISO 42G1) staged on terminal apron with gantry cranes in background.",
        alt: "40ft standard dry container staged on concrete terminal ground",
        referenceTag: "Terminal Yard Staging",
      },
    ],
    externalDimensions: {
      length: { metricMeters: '12.19 m', metricMm: '12,192 mm', imperial: "40' 0\"" },
      width: { metricMeters: '2.44 m', metricMm: '2,438 mm', imperial: "8' 0\"" },
      height: { metricMeters: '2.59 m', metricMm: '2,591 mm', imperial: "8' 6\"" },
    },
    internalDimensions: {
      length: { metricMeters: '12.03 m', metricMm: '12,032 mm', imperial: "39' 5\"" },
      width: { metricMeters: '2.35 m', metricMm: '2,352 mm', imperial: "7' 8\"" },
      height: { metricMeters: '2.39 m', metricMm: '2,393 mm', imperial: "7' 10\"" },
    },
    doorOpening: {
      width: { metricMeters: '2.34 m', metricMm: '2,343 mm', imperial: "7' 8\"" },
      height: { metricMeters: '2.28 m', metricMm: '2,280 mm', imperial: "7' 5\"" },
    },
    maxGrossWeight: { kg: '30,480 kg', lbs: '67,200 lbs' },
    tareWeight: { kg: '3,750 kg', lbs: '8,260 lbs' },
    maxPayload: { kg: '26,730 kg', lbs: '58,940 lbs' },
    cubicCapacity: { cbm: '67.7 m³', cuft: '2,390 cu ft' },
    recommendedUse: 'Voluminous export goods, multi-tier crated components, automotive subassemblies, and general freight.',
    stuffingAdvice: 'Distribute payload evenly across the entire floor. Avoid heavy point-loading in the middle section without load-spreading dunnage beams.',
    operationalDisclaimer: 'Internal volume and payload ratings are typical values. Always check CSC plate data on the specific container assigned.',
  },

  // 3. 40ft High Cube Container
  {
    id: '40ft-high-cube',
    name: "40' High Cube Container",
    code: "40' HC / High Cube",
    category: 'High Cube',
    exteriorImage: '/images/containers/40ft-high-cube-exterior.jpg',
    exteriorCaption: "40ft High Cube Container (ISO 45G1) exterior view with prominent 9'6\" (2.89m) height hazard zebra warning stripes",
    exteriorAlt: "Exterior three-quarter view of 40ft High Cube container showing the extra vertical height and black-yellow zebra hazard stripes",
    interiorImage: '/images/containers/40ft-high-cube-interior.jpg',
    interiorCaption: "40ft High Cube interior view showing the generous 2.69m internal vertical ceiling clearance through tall doors",
    interiorAlt: "Interior view looking into 40ft High Cube container highlighting the extra 30cm vertical clearance above wooden floor",
    galleryImages: [
      {
        url: '/images/containers/40ft-high-cube-exterior.jpg',
        caption: "40ft High Cube Container (ISO 45G1) exterior: 9'6\" (2.89m) height with yellow-black hazard zebra warning decals along top front and rear rails.",
        alt: "Exterior view of 40ft High Cube container with zebra decals",
        referenceTag: "9'6\" High Cube Exterior",
      },
      {
        url: '/images/containers/40ft-high-cube-interior.jpg',
        caption: "Generous 2.69m internal vertical clearance: Open doors showing full-height door aperture and 76.2 m³ internal usable volume.",
        alt: "Interior perspective of 40ft High Cube shipping container showing tall roof clearance",
        referenceTag: "2.69m Vertical Clearance",
      },
      {
        url: '/images/containers/40ft-high-cube-doors.jpg',
        caption: "Rear door equipment detail: Prominent 'CAUTION 9'6\" HIGH (2.89M)' hazard zebra decal, ISO 45G1 markings, and high-tensile locking hardware.",
        alt: "Technical close-up of 40ft High Cube rear doors with 9'6\" hazard warning stripe",
        referenceTag: "Door Hardware & 9'6\" Decal",
      },
      {
        url: '/images/containers/40ft-high-cube-yard.jpg',
        caption: "Terminal yard staging: 40ft High Cube container (ISO 45G1) displaying full 9'6\" (2.89m) vertical profile, corner castings, and black-and-yellow hazard zebra decals.",
        alt: "40ft High Cube container staged in port terminal yard",
        referenceTag: "Yard Staging & Top Rails",
      },
    ],
    externalDimensions: {
      length: { metricMeters: '12.19 m', metricMm: '12,192 mm', imperial: "40' 0\"" },
      width: { metricMeters: '2.44 m', metricMm: '2,438 mm', imperial: "8' 0\"" },
      height: { metricMeters: '2.89 m', metricMm: '2,896 mm', imperial: "9' 6\"" },
    },
    internalDimensions: {
      length: { metricMeters: '12.03 m', metricMm: '12,032 mm', imperial: "39' 5\"" },
      width: { metricMeters: '2.35 m', metricMm: '2,352 mm', imperial: "7' 8\"" },
      height: { metricMeters: '2.69 m', metricMm: '2,698 mm', imperial: "8' 10\"" },
    },
    doorOpening: {
      width: { metricMeters: '2.34 m', metricMm: '2,343 mm', imperial: "7' 8\"" },
      height: { metricMeters: '2.58 m', metricMm: '2,585 mm', imperial: "8' 5\"" },
    },
    maxGrossWeight: { kg: '30,480 kg', lbs: '67,200 lbs' },
    tareWeight: { kg: '3,900 kg', lbs: '8,600 lbs' },
    maxPayload: { kg: '26,580 kg', lbs: '58,600 lbs' },
    cubicCapacity: { cbm: '76.2 – 76.4 m³', cuft: '2,694 cu ft' },
    recommendedUse: 'Taller industrial crating (height > 2.3m), double-stacked pallets, and lightweight bulky cargo.',
    stuffingAdvice: 'The extra 305mm (1 foot) height allows vertical clearance for taller machinery crates. Cargo with higher centers of gravity requires upper rail lashing.',
    operationalDisclaimer: 'Identified by black and yellow hazard zebra stripes along top perimeter rails. Verify road bridge height clearance along transport corridors.',
  },

  // 4. 40ft High Cube Heavy Duty (32.5T Certified)
  {
    id: '40ft-high-cube-heavy-duty',
    name: "40' High Cube Heavy Duty (32.5T)",
    code: "40' HC HD / Heavy Duty",
    category: 'High Cube',
    exteriorImage: '/images/containers/40ft-high-cube-heavy-duty-exterior.jpg',
    exteriorCaption: "40ft High Cube Heavy Duty container (ISO 45G1) with reinforced Corten steel frame, 9'6\" zebra stripes, and certified 32,500 kg maximum gross weight rating",
    exteriorAlt: "Exterior perspective of 40ft High Cube Heavy Duty container in container yard with 32,500 kg max gross markings and zebra stripes",
    interiorImage: '/images/containers/40ft-high-cube-heavy-duty-interior.jpg',
    interiorCaption: "Heavy Duty 40ft High Cube interior featuring heavy-gauge floor cross-bearers, 28mm hardwood planking, and certified 5-ton floor lashing D-rings",
    interiorAlt: "Interior view of heavy duty 40ft High Cube container showing reinforced floor and lashing points",
    galleryImages: [
      {
        url: '/images/containers/40ft-high-cube-heavy-duty-exterior.jpg',
        caption: "40ft High Cube Heavy Duty (32.5T): Dedicated heavy-spec unit with reinforced Corten corner posts, stenciled MAX. GROSS 32,500 KG / 71,650 LB, and 9'6\" zebra stripes.",
        alt: "Exterior view of 40ft High Cube Heavy Duty container in container yard",
      },
      {
        url: '/images/containers/40ft-high-cube-heavy-duty-interior.jpg',
        caption: "Reinforced interior structure: Heavy-gauge steel cross-members beneath hardwood flooring and certified 5-ton floor lashing D-rings for dense machinery.",
        alt: "Heavy duty container floor with 5T lashing D-rings and 2.69m internal clearance",
      },
      {
        url: '/images/containers/40ft-high-cube-heavy-duty-doors.jpg',
        caption: "Certified equipment detail: CSC safety approval plate stamped with 32,500 kg (71,650 lbs) max gross rating, dual galvanized lockrods, and 9'6\" caution decal.",
        alt: "40ft High Cube Heavy Duty rear doors showing 32,500 kg CSC plate and locking cams",
      },
    ],
    externalDimensions: {
      length: { metricMeters: '12.19 m', metricMm: '12,192 mm', imperial: "40' 0\"" },
      width: { metricMeters: '2.44 m', metricMm: '2,438 mm', imperial: "8' 0\"" },
      height: { metricMeters: '2.89 m', metricMm: '2,896 mm', imperial: "9' 6\"" },
    },
    internalDimensions: {
      length: { metricMeters: '12.03 m', metricMm: '12,032 mm', imperial: "39' 5\"" },
      width: { metricMeters: '2.35 m', metricMm: '2,352 mm', imperial: "7' 8\"" },
      height: { metricMeters: '2.69 m', metricMm: '2,698 mm', imperial: "8' 10\"" },
    },
    doorOpening: {
      width: { metricMeters: '2.34 m', metricMm: '2,343 mm', imperial: "7' 8\"" },
      height: { metricMeters: '2.58 m', metricMm: '2,585 mm', imperial: "8' 5\"" },
    },
    maxGrossWeight: { kg: '32,500 kg', lbs: '71,650 lbs' },
    tareWeight: { kg: '3,950 – 4,100 kg', lbs: '8,710 – 9,040 lbs' },
    maxPayload: { kg: '28,400 – 28,550 kg', lbs: '62,610 – 62,940 lbs' },
    cubicCapacity: { cbm: '76.2 – 76.4 m³', cuft: '2,694 cu ft' },
    recommendedUse: 'Heavy dense machinery, metal castings, structural skids, and voluminous industrial cargo requiring maximum gross weight limit.',
    stuffingAdvice: 'Use heavy hardwood load-spreading runners to distribute concentrated equipment weight across multiple floor cross-members.',
    operationalDisclaimer: 'Requires verified 32,500 kg CSC rating on container data plate. Ensure road transport trailer is certified for heavy payloads.',
  },

  // 5. Open Top Container
  {
    id: 'open-top',
    name: "20' & 40' Open Top Container",
    code: 'Open Top (OT)',
    category: 'Specialized',
    exteriorImage: '/images/containers/open-top-exterior.jpg',
    exteriorCaption: "Open Top Container (ISO 22U1 / 42U1) exterior view with weather-tight tarpaulin secured by steel TIR cables over roof bows",
    exteriorAlt: "Exterior elevated view of Open Top container with green heavy-duty waterproof tarpaulin secured with TIR cables",
    interiorImage: '/images/containers/open-top-interior.jpg',
    interiorCaption: "Open Top interior view looking directly up through the roofless top showing tubular steel roof bows and blue sky",
    interiorAlt: "Interior view looking inside Open Top container showing removable curved roof bows and unobstructed open sky for crane loading",
    galleryImages: [
      {
        url: '/images/containers/open-top-exterior.jpg',
        caption: "Open Top container (ISO 22U1 / 42U1) exterior: Heavy-duty weather-tight PVC tarpaulin secured with customs-compliant TIR steel cable through perimeter eyelets.",
        alt: "Exterior view of Open Top container with weather-tight tarpaulin",
      },
      {
        url: '/images/containers/open-top-interior.jpg',
        caption: "Top-loading aperture: Removable curved steel roof bows over 28mm hardwood floor, providing unobstructed vertical loading access for overhead gantry cranes.",
        alt: "Interior view looking inside Open Top container through roof bows to open sky",
      },
      {
        url: '/images/shipments/open-top/open-top-crane-loading.jpg',
        caption: "Crane loading operations: Mobile crane lowering heavy industrial machinery directly through the open container roof aperture into exact bed position.",
        alt: "Mobile crane lowering industrial cargo through open top container roof",
      },
      {
        url: '/images/containers/open-top-swing-header-detail.jpg',
        caption: "Door header detail: Unlatched swing-out rear door header on heavy steel hinge, tarpaulin grommets, and TIR lacing enabling direct forklift or crane cargo roll-in.",
        alt: "Close-up of Open Top container swing-out door header on steel hinge",
      },
    ],
    externalDimensions: {
      length: { metricMeters: '6.06 m / 12.19 m', metricMm: '6,058 / 12,192 mm', imperial: "20' 0\" / 40' 0\"" },
      width: { metricMeters: '2.44 m', metricMm: '2,438 mm', imperial: "8' 0\"" },
      height: { metricMeters: '2.59 m', metricMm: '2,591 mm', imperial: "8' 6\"" },
    },
    internalDimensions: {
      length: { metricMeters: '5.89 m / 12.02 m', metricMm: '5,898 / 12,024 mm', imperial: "19' 4\" / 39' 5\"" },
      width: { metricMeters: '2.35 m', metricMm: '2,352 mm', imperial: "7' 8\"" },
      height: { metricMeters: '2.35 m', metricMm: '2,348 mm', imperial: "7' 8\"" },
    },
    doorOpening: {
      width: { metricMeters: '2.34 m', metricMm: '2,340 mm', imperial: "7' 8\"" },
      height: { metricMeters: '2.28 m (swing-out header)', metricMm: '2,275 mm', imperial: "7' 5\"" },
    },
    topOpening: {
      length: { metricMeters: '5.44 m / 11.57 m', metricMm: '5,438 / 11,570 mm', imperial: "17' 10\" / 37' 11\"" },
      width: { metricMeters: '2.23 m', metricMm: '2,230 mm', imperial: "7' 4\"" },
    },
    maxGrossWeight: { kg: '30,480 – 32,500 kg', lbs: '67,200 – 71,650 lbs' },
    tareWeight: { kg: '2,350 kg / 3,850 kg', lbs: '5,180 / 8,490 lbs' },
    maxPayload: { kg: '28,130 kg / 28,650 kg', lbs: '62,020 / 63,160 lbs' },
    cubicCapacity: { cbm: '32.5 m³ / 66.5 m³', cuft: '1,148 / 2,350 cu ft' },
    recommendedUse: 'Over-height industrial machinery, long pipes, boilers, and heavy cargo loaded vertically by overhead gantry or crane.',
    stuffingAdvice: 'Swing-out rear door header must be latched securely before road transit. Ensure removable roof bows support tarpaulin to prevent water pooling.',
    operationalDisclaimer: 'Requires weather-tight TIR approved tarpaulin. Over-height cargo protruding above roof line requires in-gauge / out-of-gauge carrier booking.',
  },

  // 6. Flat Rack Container
  {
    id: 'flat-rack',
    name: "20' & 40' Flat Rack Container",
    code: 'Flat Rack (FR)',
    category: 'Specialized',
    exteriorImage: '/images/containers/flat-rack-exterior.jpg',
    exteriorCaption: "Flat Rack Container (ISO 45P3 / 25P3) exterior view showing reinforced open platform bed and collapsible end bulkheads",
    exteriorAlt: "Exterior perspective of yellow heavy-duty Flat Rack shipping container with open sides and collapsible steel end walls",
    interiorImage: '/images/containers/flat-rack-interior.jpg',
    interiorCaption: "Flat Rack deck platform view looking across the hardwood plank bed with forged lashing D-rings and open sky",
    interiorAlt: "Deck level view across the open Flat Rack platform showing heavy hardwood floor and perimeter tie-down rings",
    clientFieldImage: '/images/containers/container-40ft-flat-rack.jpg',
    clientFieldCaption: "Field operational record: 40ft Flat Rack (MSDU 998398 6) loaded with lashed project cargo at terminal",
    clientFieldAlt: "40ft Flat Rack container with heavy project cargo at Nhava Sheva",
    galleryImages: [
      {
        url: '/images/containers/flat-rack-exterior.jpg',
        caption: "Flat Rack Container (ISO 45P3) exterior: Heavy steel platform bed and folding end bulkheads",
        alt: "Exterior view of Flat Rack container",
        referenceTag: "Platform Bed & Bulkheads",
      },
      {
        url: '/images/containers/container-20ft-flat-rack.jpg',
        caption: "20ft Flat Rack (MSDU 380109 2) loaded with weather-protected machinery and high-tensile ratchet straps",
        alt: "20ft Flat Rack with secured industrial machinery",
        isAuthenticClient: true,
        referenceTag: '20ft Flat Rack Platform',
      },
      {
        url: '/images/containers/container-40ft-flat-rack.jpg',
        caption: "40ft Flat Rack (MSDU 998398 6) with dual machinery assemblies and 5-ton orange ratchet straps",
        alt: "40ft Flat Rack platform with heavy industrial machinery",
        isAuthenticClient: true,
        referenceTag: '40ft Flat Rack Platform',
      },
      {
        url: '/images/containers/container-flat-rack-dual-stowage.jpg',
        caption: "Overhead view of dual 40ft Flat Racks secured side-by-side inside vessel hold cell guides",
        alt: "Dual flat racks stowed in ship cell guide hold",
        isAuthenticClient: true,
        referenceTag: 'Cell Guide Stowage',
      },
      {
        url: '/images/operations/cargo-lashing/flat-rack-heavy-duty-orange-lashing.jpg',
        caption: "High-tensile perimeter ratchet securing anchored directly to container stake pockets",
        alt: "Flat Rack perimeter ratchet securing",
        isAuthenticClient: true,
        referenceTag: 'Perimeter Webbing Securing',
      },
    ],
    externalDimensions: {
      length: { metricMeters: '6.06 m / 12.19 m', metricMm: '6,058 / 12,192 mm', imperial: "20' 0\" / 40' 0\"" },
      width: { metricMeters: '2.44 m', metricMm: '2,438 mm', imperial: "8' 0\"" },
      height: { metricMeters: '2.59 m', metricMm: '2,591 mm', imperial: "8' 6\"" },
    },
    internalDimensions: {
      length: { metricMeters: '5.62 m / 11.65 m (between posts)', metricMm: '5,620 / 11,650 mm', imperial: "18' 5\" / 38' 2\"" },
      width: { metricMeters: '2.20 m (floor) / 2.37 m (chassis)', metricMm: '2,200 / 2,374 mm', imperial: "7' 2\" / 7' 9\"" },
      height: { metricMeters: '2.21 m (to top of post)', metricMm: '2,213 mm', imperial: "7' 3\"" },
    },
    doorOpening: {
      width: { metricMeters: 'Open sides & top', metricMm: 'Unrestricted', imperial: 'Open structure' },
      height: { metricMeters: 'Collapsible end walls', metricMm: 'Unrestricted', imperial: 'Open structure' },
    },
    maxGrossWeight: { kg: '34,000 – 50,000 kg', lbs: '74,950 – 110,230 lbs' },
    tareWeight: { kg: '2,800 kg / 5,200 kg', lbs: '6,170 / 11,460 lbs' },
    maxPayload: { kg: 'Up to 31,200 – 44,800 kg', lbs: '68,780 – 98,770 lbs' },
    cubicCapacity: { cbm: 'Open Envelope (OOG Capable)', cuft: 'N/A' },
    recommendedUse: 'Out-of-gauge (OOG) machinery, transformers, industrial engines, structural steel skids, and heavy project freight.',
    stuffingAdvice: 'Secure using certified high-tensile lashing chains, wire ropes, turnbuckles, and timber chocking bolted directly to stake pockets.',
    operationalDisclaimer: 'Cargo exceeding 2.44m width or 2.59m height is classified Out-Of-Gauge (OOG) and requires carrier slot pre-approval and lash inspection.',
  },

  // 7. Reefer (Refrigerated) Container
  {
    id: 'reefer-container',
    name: "20' & 40' Refrigerated Container (Reefer)",
    code: 'Reefer (RF / HR)',
    category: 'Temperature Controlled',
    exteriorImage: '/images/containers/reefer-exterior.jpg',
    exteriorCaption: "Refrigerated Container (Reefer) exterior view showing Carrier Transicold cooling machinery and digital control panel",
    exteriorAlt: "Exterior perspective of white insulated Reefer container with integrated refrigeration machinery unit, fan grille, and temperature display",
    interiorImage: '/images/containers/reefer-interior.jpg',
    interiorCaption: "Reefer interior view showing extruded aluminum T-bar airflow floor, insulated food-grade walls, and maximum load line",
    interiorAlt: "Interior view of refrigerated shipping container showing specialized aluminum T-floor channels and front cooling evaporator unit",
    galleryImages: [
      {
        url: '/images/containers/reefer-exterior.jpg',
        caption: "Refrigerated Container (Reefer) exterior: Integrated Carrier Transicold cooling machinery, 380V/440V 3-phase power receptacle, and micro-controller digital temperature display.",
        alt: "Exterior view of refrigerated container with integrated Carrier refrigeration unit",
        referenceTag: "Reefer Exterior Profile",
      },
      {
        url: '/images/containers/reefer-interior.jpg',
        caption: "Internal airflow design: Extruded aluminum T-bar floor channels and red maximum load limit line ensuring uninterrupted bottom-air circulation for temperature-sensitive cargo.",
        alt: "Interior view of Reefer container showing aluminum T-bar floor and front cooling evaporator",
        referenceTag: "Aluminum T-Bar Airflow Floor",
      },
      {
        url: '/images/containers/reefer-machinery-detail.jpg',
        caption: "Carrier Transicold machinery detail: Close-up view of refrigeration unit with digital microprocessor temperature display (-18.0°C), heavy-duty 3-phase power cable, and electrical warning placards.",
        alt: "Technical close-up of Carrier Transicold refrigeration unit on Reefer container",
        referenceTag: "Carrier Transicold Machinery",
      },
    ],
    externalDimensions: {
      length: { metricMeters: '6.06 m / 12.19 m', metricMm: '6,058 / 12,192 mm', imperial: "20' 0\" / 40' 0\"" },
      width: { metricMeters: '2.44 m', metricMm: '2,438 mm', imperial: "8' 0\"" },
      height: { metricMeters: '2.59 m / 2.89 m (HC)', metricMm: '2,591 / 2,896 mm', imperial: "8' 6\" / 9' 6\"" },
    },
    internalDimensions: {
      length: { metricMeters: '5.44 m / 11.58 m', metricMm: '5,444 / 11,583 mm', imperial: "17' 10\" / 38' 0\"" },
      width: { metricMeters: '2.29 m', metricMm: '2,286 mm', imperial: "7' 6\"" },
      height: { metricMeters: '2.27 m / 2.55 m (HC)', metricMm: '2,275 / 2,544 mm', imperial: "7' 5\" / 8' 4\"" },
    },
    doorOpening: {
      width: { metricMeters: '2.29 m', metricMm: '2,286 mm', imperial: "7' 6\"" },
      height: { metricMeters: '2.22 m / 2.50 m (HC)', metricMm: '2,224 / 2,499 mm', imperial: "7' 3\"" },
    },
    maxGrossWeight: { kg: '30,480 – 34,000 kg', lbs: '67,200 – 74,950 lbs' },
    tareWeight: { kg: '2,950 kg / 4,400 kg', lbs: '6,500 / 9,700 lbs' },
    maxPayload: { kg: '27,530 kg / 29,600 kg', lbs: '60,700 / 65,250 lbs' },
    cubicCapacity: { cbm: '28.3 m³ / 67.5 m³ (HC)', cuft: '999 / 2,383 cu ft' },
    recommendedUse: 'Temperature-sensitive pharmaceuticals, chemical resins, temperature-critical industrial goods, and perishable cargo.',
    stuffingAdvice: 'Never pack cargo beyond the red maximum load line indicator inside the container to preserve airflow circulation across the T-bar floor.',
    operationalDisclaimer: 'Internal volume is slightly reduced due to thick polyurethane thermal insulation and the integrated front compressor unit.',
  },
];

/**
 * Authentic Client Break Bulk (BBC) & Cylindrical Project Cargo Records
 * Features the exact client photographs requested in Phase 1 Part D:
 * (1) Wrapped cylindrical cargo inside container / vessel hold: IMG-20261022-WA0019.jpg
 * (2) Related cargo being lifted by crane at night: IMG-20261022-WA0020.jpg & WA0021.jpg
 * (3) Haulage on multi-axle trailer under crane: IMG-20261022-WA0018.jpg
 * (4) Mobile crane heavy lift: IMG-20261022-WA0015.jpg
 */
export interface BreakBulkRecord {
  id: string;
  driveFilename: string;
  imagePath: string;
  title: string;
  caption: string;
  alt: string;
  technicalDescription: string;
  projectTag: string;
}

export const BREAK_BULK_CARGO_RECORDS: BreakBulkRecord[] = [
  {
    id: 'bb-cylindrical-internal-lashing',
    driveFilename: 'IMG-20261022-WA0019.jpg',
    imagePath: '/images/drive-staging/IMG-20261022-WA0019.jpg',
    title: 'Blue Tarpaulin-Wrapped Cylindrical Cargo & Vessel Hold Lashing Network',
    caption: 'Cylindrical industrial pressure vessel wrapped in protective blue tarpaulin secured inside vessel cargo hold with heavy yellow ratchet lashings',
    alt: 'Cylindrical cargo wrapped in protective blue tarpaulin and crate secured inside cargo hold',
    technicalDescription: 'Over-dimensional industrial cylindrical vessel wrapped in weather-proof blue protective tarpaulin stowed inside cellular vessel hold space alongside crated equipment. Restrained using paired heavy-duty yellow polyester ratchet lashings configured in an opposed criss-cross network to eliminate rotational roll and longitudinal surge forces during ocean voyage.',
    projectTag: 'Vessel Hold Lashing Network',
  },
  {
    id: 'bb-cylindrical-night-lift-wa0020',
    driveFilename: 'IMG-20261022-WA0020.jpg',
    imagePath: '/images/drive-staging/IMG-20261022-WA0020.jpg',
    title: 'QC 04 Container Crane Night Hoist of Blue Cylindrical Equipment',
    caption: 'Tandem spreader lift by port gantry crane QC 04 hoisting the blue wrapped cylindrical unit at night',
    alt: 'Night crane QC 04 lifting blue tarpaulin wrapped cylindrical cargo under port lights',
    technicalDescription: 'Round-the-clock quay operations at Nhava Sheva. The blue wrapped cylindrical consignment is suspended from port gantry crane QC 04 with certified multi-leg wire rope bridles and spreader beam under high-intensity port floodlights.',
    projectTag: 'Quayside Heavy-Lift Night Operations',
  },
  {
    id: 'bb-cylindrical-night-lift-wa0021',
    driveFilename: 'IMG-20261022-WA0021.jpg',
    imagePath: '/images/drive-staging/IMG-20261022-WA0021.jpg',
    title: 'Marine Hold Staging & Cross-Webbing Lashing Protocol',
    caption: 'Final precision positioning and cross-webbing lashing inside vessel hold during nocturnal loading operations',
    alt: 'Cylindrical cargo positioned into vessel hold with heavy cross-lashing',
    technicalDescription: 'Continuous night loading sequence showing the cylindrical vessel lowered into the ship cell guide. Port riggers apply heavy-duty marine webbing and corner edge protectors to secure the load against high-sea dynamic pitch and heave.',
    projectTag: 'Under-Deck Cell Guide Positioning',
  },
  {
    id: 'bb-cylindrical-road-haulage',
    driveFilename: 'IMG-20261022-WA0018.jpg',
    imagePath: '/images/drive-staging/IMG-20261022-WA0018.jpg',
    title: 'Multi-Axle Heavy Haulage Prime Mover Under Crane Boom',
    caption: 'Heavy haulage prime mover transporting oversized cylindrical unit under crane boom at port terminal',
    alt: 'Heavy haulage truck transporting wrapped cylindrical cargo',
    technicalDescription: 'Turnkey highway haulage from fabrication plant to JNPT terminal on an articulated multi-axle trailer bed, aligned under the crane boom ready for ocean vessel loading.',
    projectTag: 'Multi-Axle Highway Haulage Consignment',
  },
  {
    id: 'bb-cylindrical-mobile-lift',
    driveFilename: 'IMG-20261022-WA0015.jpg',
    imagePath: '/images/drive-staging/IMG-20261022-WA0015.jpg',
    title: 'Telescopic Mobile Crane Heavy Lift onto Flat Rack Bed',
    caption: 'Telescopic mobile crane lifting massive cylindrical cargo onto yellow Flat Rack container platform',
    alt: 'Telescopic mobile crane lifting cylindrical cargo onto Flat Rack container',
    technicalDescription: 'Heavy mobile crane transfer from road trailer to Flat Rack platform (MSDU 995998 0). Rigging supervised by certified signalmen with forged shackles and high-capacity spreader wire bridles.',
    projectTag: 'Telescopic Mobile Crane Transfer',
  },
];
