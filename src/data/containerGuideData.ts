export interface DimensionUnit {
  metricMeters: string;
  metricMm: string;
  imperial: string;
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
    maxPayload: { kg: 'Approx. 28,130 – 28,280 kg', lbs: '62,020 – 62,350 lbs' },
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
    tareWeight: { kg: '3,700 – 3,850 kg', lbs: '8,150 – 8,490 lbs' },
    maxPayload: { kg: 'Approx. 26,630 – 26,780 kg', lbs: '58,710 – 59,050 lbs' },
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
    clientFieldImage: '/images/containers/container-40ft-high-cube.jpg',
    clientFieldCaption: "Authentic client operational field record at JNPT terminal showing Maersk 40ft High Cube (45G1) container",
    clientFieldAlt: "Actual photograph of 40ft High Cube container at Nhava Sheva container terminal",
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
    tareWeight: { kg: '3,900 – 4,050 kg', lbs: '8,600 – 8,930 lbs' },
    maxPayload: { kg: 'Approx. 26,430 – 26,580 kg', lbs: '58,270 – 58,600 lbs' },
    cubicCapacity: { cbm: '76.3 m³', cuft: '2,694 cu ft' },
    recommendedUse: 'Taller industrial crating (height > 2.3m), double-stacked pallets, and lightweight bulky cargo.',
    stuffingAdvice: 'The extra 305mm (1 foot) height allows vertical clearance for taller machinery crates. Cargo with higher centers of gravity requires upper rail lashing.',
    operationalDisclaimer: 'Identified by black and yellow hazard zebra stripes along top perimeter rails. Verify road bridge height clearance along transport corridors.',
  },

  // 4. Open Top Container
  {
    id: 'open-top',
    name: "20' & 40' Open Top Container",
    code: 'Open Top (OT)',
    category: 'Specialized',
    exteriorImage: '/images/containers/open-top-exterior.jpg',
    exteriorCaption: "Open Top Container (ISO 22U1) exterior view with weather-tight tarpaulin secured by steel TIR cables over roof bows",
    exteriorAlt: "Exterior elevated view of Open Top container with green heavy-duty waterproof tarpaulin secured with TIR cables",
    interiorImage: '/images/containers/open-top-interior.jpg',
    interiorCaption: "Open Top interior view looking directly up through the roofless top showing tubular steel roof bows and blue sky",
    interiorAlt: "Interior view looking inside Open Top container showing removable curved roof bows and unobstructed open sky for crane loading",
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
    tareWeight: { kg: '2,350 kg / 3,950 kg', lbs: '5,180 / 8,700 lbs' },
    maxPayload: { kg: '28,130 kg / 28,550 kg', lbs: '62,020 / 62,940 lbs' },
    cubicCapacity: { cbm: '32.5 m³ / 66.5 m³', cuft: '1,148 / 2,350 cu ft' },
    recommendedUse: 'Over-height industrial machinery, long pipes, boilers, and heavy cargo loaded vertically by overhead gantry or crane.',
    stuffingAdvice: 'Swing-out rear door header must be latched securely before road transit. Ensure removable roof bows support tarpaulin to prevent water pooling.',
    operationalDisclaimer: 'Requires weather-tight TIR approved tarpaulin. Over-height cargo protruding above roof line requires in-gauge / out-of-gauge carrier booking.',
  },

  // 5. Flat Rack Container
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
    clientFieldCaption: "Authentic client operational field record: 40ft Flat Rack (MSDU 998398 6) loaded with lashed project cargo at terminal",
    clientFieldAlt: "Actual photograph of 40ft Flat Rack container with heavy project cargo at Nhava Sheva",
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

  // 6. Reefer (Refrigerated) Container
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
      height: { metricMeters: '2.22 m / 2.50 m (HC)', metricMm: '2,224 / 2,499 mm', imperial: "7' 3\" / 8' 2\"" },
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
