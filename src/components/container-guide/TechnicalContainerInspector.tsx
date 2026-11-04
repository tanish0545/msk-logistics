import React, { useState } from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export type ContainerInspectorType = '20GP' | '40GP' | '40HC' | '40HCHD' | 'OT' | 'FR' | 'REEFER';

interface ContainerSpecData {
  type: ContainerInspectorType;
  label: string;
  fullName: string;
  description: string;
  length: string;
  width: string;
  height: string;
  payload: string;
  tare: string;
  maxGross: string;
  cbm: string;
  isoCode: string;
  isSpecialized?: boolean;
}

const CONTAINER_SPECS: Record<ContainerInspectorType, ContainerSpecData> = {
  '20GP': {
    type: '20GP',
    label: '20GP',
    fullName: "20' GP (General Purpose)",
    description: 'Standard 20ft dry freight shipping container for dense, heavy or palletised commercial ocean cargo.',
    length: '6.06 m',
    width: '2.44 m',
    height: '2.59 m',
    payload: '28,130 kg',
    tare: '2,200 kg',
    maxGross: '30,480 kg',
    cbm: '33.2 CBM',
    isoCode: '22G1',
  },
  '40GP': {
    type: '40GP',
    label: '40GP',
    fullName: "40' GP (General Purpose)",
    description: "Standard 40ft dry freight container with 8'6\" height for voluminous export and general freight loads.",
    length: '12.19 m',
    width: '2.44 m',
    height: '2.59 m',
    payload: '26,730 kg',
    tare: '3,750 kg',
    maxGross: '30,480 kg',
    cbm: '67.7 CBM',
    isoCode: '42G1',
  },
  '40HC': {
    type: '40HC',
    label: '40HC',
    fullName: "40' HC (High Cube)",
    description: "Extra-height 40ft container providing 30 cm (1 foot) additional vertical clearance for tall crating and bulky items.",
    length: '12.19 m',
    width: '2.44 m',
    height: '2.89 m',
    payload: '26,580 kg',
    tare: '3,900 kg',
    maxGross: '30,480 kg',
    cbm: '76.4 CBM',
    isoCode: '45G1',
  },
  '40HCHD': {
    type: '40HCHD',
    label: '40HC HD',
    fullName: "40' HC Heavy Duty (32.5T)",
    description: 'Heavy-Duty High Cube container with reinforced Corten steel corner posts and floor cross-members rated for 32,500 kg.',
    length: '12.19 m',
    width: '2.44 m',
    height: '2.89 m',
    payload: '28,550 kg',
    tare: '3,950 kg',
    maxGross: '32,500 kg',
    cbm: '76.4 CBM',
    isoCode: '45G1 / HD',
  },
  'OT': {
    type: 'OT',
    label: 'OT',
    fullName: 'Open Top Container (OT)',
    description: 'Removable soft tarpaulin top and swing-out door header enabling overhead crane top-loading of oversized items.',
    length: '12.19 m',
    width: '2.44 m',
    height: '2.59 m',
    payload: '28,650 kg',
    tare: '3,850 kg',
    maxGross: '32,500 kg',
    cbm: '66.5 CBM',
    isoCode: '42U1',
    isSpecialized: true,
  },
  'FR': {
    type: 'FR',
    label: 'FR',
    fullName: 'Flat Rack Container (FR)',
    description: 'Collapsible-end flat rack container engineered for Over-Dimensional Cargo (ODC) and out-of-gauge heavy machinery.',
    length: '12.19 m',
    width: '2.44 m',
    height: '2.59 m',
    payload: '44,800 kg',
    tare: '5,200 kg',
    maxGross: '50,000 kg',
    cbm: 'Open Envelope',
    isoCode: '45P3',
    isSpecialized: true,
  },
  'REEFER': {
    type: 'REEFER',
    label: 'Reefer',
    fullName: 'Refrigerated Container (Reefer)',
    description: 'Temperature-controlled insulated container with Carrier Transicold cooling unit and aluminum T-bar floor (-30°C to +30°C).',
    length: '12.19 m',
    width: '2.44 m',
    height: '2.89 m',
    payload: '29,600 kg',
    tare: '4,400 kg',
    maxGross: '34,000 kg',
    cbm: '67.5 CBM',
    isoCode: '45R1',
    isSpecialized: true,
  },
};

interface TechnicalContainerInspectorProps {
  activeType?: ContainerInspectorType;
  onSelectType?: (type: ContainerInspectorType) => void;
}

export const TechnicalContainerInspector: React.FC<TechnicalContainerInspectorProps> = ({
  activeType: controlledActiveType,
  onSelectType,
}) => {
  const [internalActiveType, setInternalActiveType] = useState<ContainerInspectorType>('20GP');
  const activeType = controlledActiveType || internalActiveType;
  const spec = CONTAINER_SPECS[activeType];

  const handleSelect = (type: ContainerInspectorType) => {
    setInternalActiveType(type);
    if (onSelectType) {
      onSelectType(type);
    }
  };

  const isHighCube = activeType === '40HC' || activeType === '40HCHD' || activeType === 'REEFER';
  const isShort20 = activeType === '20GP';
  const isOpenTop = activeType === 'OT';
  const isFlatRack = activeType === 'FR';
  const isReefer = activeType === 'REEFER';

  return (
    <div className="bg-[#000000] text-white rounded-3xl border border-white/15 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Subtle illuminated red accent at top */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#B62825] to-transparent pointer-events-none" />

      {/* Header Matching Concept 05 */}
      <div className="space-y-2 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#B62825]/20 border border-[#B62825]/40 text-[#B62825] text-xs font-mono font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-[#B62825]" />
          <span>Interactive Technical Inspector</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight">
          Container <span className="text-[#B62825]">Guide</span>
        </h2>
        <p className="text-sm sm:text-base text-[#94A3B8] font-body max-w-2xl">
          Specifications, dimensions and capacity for your cargo planning. Full ISO range: 20GP, 40GP, 40HC, Heavy Duty, Open Top, Flat Rack, and Reefer.
        </p>
      </div>

      {/* 1. Container Type Selector Buttons — Single primary selector */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-8">
        {(['20GP', '40GP', '40HC', '40HCHD', 'OT', 'FR', 'REEFER'] as ContainerInspectorType[]).map((type) => {
          const isActive = activeType === type;
          const buttonSpec = CONTAINER_SPECS[type];
          return (
            <button
              key={type}
              type="button"
              onClick={() => handleSelect(type)}
              className={`py-2 px-4 sm:px-6 rounded-xl font-mono text-xs sm:text-sm font-black transition-all duration-200 cursor-pointer select-none ${
                isActive
                  ? 'bg-[#B62825] text-white shadow-[0_4px_20px_rgba(182,40,37,0.5)] scale-105 ring-2 ring-[#B62825]/40'
                  : 'bg-[#141416] text-[#AEB6C2] hover:bg-[#1E1E22] hover:text-white border border-white/10'
              }`}
            >
              {buttonSpec.label}
            </button>
          );
        })}
      </div>

      {/* 2. Main Technical Stage: Details on Left, 3D Isometric Illustration on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Title & Key Metric Specifications Strip */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#B62825] font-bold uppercase tracking-widest">
                ISO CODE: {spec.isoCode}
              </span>
              {spec.isSpecialized && (
                <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30 font-bold uppercase">
                  SPECIALIZED
                </span>
              )}
            </div>
            <h3 className="text-2xl sm:text-3xl font-heading font-black text-white mt-1">
              {spec.fullName}
            </h3>
            <p className="text-xs sm:text-sm text-[#AEB6C2] font-body mt-2 leading-relaxed">
              {spec.description}
            </p>
          </div>

          {/* 4 Key Metrics Strip Matching Concept 05 */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-[#0B0B0D] border border-white/10">
              <span className="text-[10px] font-mono text-[#AEB6C2] uppercase">Length</span>
              <div className="text-lg sm:text-xl font-mono font-bold text-white mt-0.5">
                {spec.length}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0B0B0D] border border-white/10">
              <span className="text-[10px] font-mono text-[#AEB6C2] uppercase">Width</span>
              <div className="text-lg sm:text-xl font-mono font-bold text-white mt-0.5">
                {spec.width}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0B0B0D] border border-white/10">
              <span className="text-[10px] font-mono text-[#AEB6C2] uppercase">Height</span>
              <div className="text-lg sm:text-xl font-mono font-bold text-white mt-0.5">
                {spec.height}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0B0B0D] border border-[#B62825]/40 shadow-sm">
              <span className="text-[10px] font-mono text-red-300 uppercase">Payload Capacity</span>
              <div className="text-lg sm:text-xl font-mono font-bold text-[#FFFFFF] mt-0.5">
                {spec.payload}
              </div>
            </div>
          </div>

          {/* Secondary Specifications Summary */}
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs font-mono text-[#AEB6C2]">
            <div>
              <span className="text-white/40">Tare:</span> <span className="text-white font-bold">{spec.tare}</span>
            </div>
            <div>
              <span className="text-white/40">Max Gross:</span> <span className="text-white font-bold">{spec.maxGross}</span>
            </div>
            <div>
              <span className="text-white/40">Cube:</span> <span className="text-white font-bold">{spec.cbm}</span>
            </div>
          </div>

          <div className="pt-1 flex items-center gap-3">
            <Link
              to={`/request-quote?container=${encodeURIComponent(spec.fullName)}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#B62825] hover:bg-[#9E2220] text-white text-xs font-bold transition-all shadow-md"
            >
              <span>Quote This Container</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column: 3D / Isometric Container Illustration with Dimension Lines */}
        <div className="lg:col-span-7 relative flex items-center justify-center p-4 min-h-[320px] sm:min-h-[380px]">
          
          {/* Subtle Ambient Radial Lighting */}
          <div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(182,40,37,0.15)_0%,transparent_70%)] pointer-events-none"
            aria-hidden="true" 
          />

          {/* Technical Drawing Canvas */}
          <div className="relative w-full max-w-[560px] aspect-[16/10] select-none">
            
            {/* SVG Isometric Technical Container */}
            <svg
              viewBox="0 0 600 380"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
            >
              {/* Floor Shadow */}
              <polygon
                points={isShort20 ? "130,320 380,290 430,315 170,345" : "120,320 480,280 540,310 180,350"}
                fill="#000000"
                opacity="0.6"
              />

              {/* CONTAINER 3D MESH */}
              
              {/* 1. Left Front Door Panel (Isometric projection) */}
              <polygon
                points={isHighCube ? "140,145 220,120 220,295 140,320" : "140,160 220,135 220,295 140,320"}
                fill={isReefer ? "#D0D7DE" : isFlatRack ? "#1E293B" : "#8E1C1A"}
                stroke={isReefer ? "#FFFFFF" : isFlatRack ? "#64748B" : "#B62825"}
                strokeWidth="2"
              />

              {/* 2. Right Side Wall (Long Corrugated Face or Flat Rack Open Sides) */}
              {isFlatRack ? (
                // Flat Rack: Low platform bed with collapsible end walls
                <g>
                  {/* Bed Platform Floor */}
                  <polygon
                    points="220,275 500,225 500,245 220,295"
                    fill="#F59E0B"
                    stroke="#D97706"
                    strokeWidth="2"
                  />
                  {/* Far End Bulkhead */}
                  <polygon
                    points="480,110 500,105 500,225 480,230"
                    fill="#D97706"
                    stroke="#F59E0B"
                    strokeWidth="2"
                  />
                  {/* Lashing D-Rings along bed */}
                  {[260, 310, 360, 410, 460].map((rx, idx) => (
                    <circle key={idx} cx={rx} cy={275 - idx * 10} r="4" fill="#FFFFFF" stroke="#000000" strokeWidth="1.5" />
                  ))}
                </g>
              ) : (
                <polygon
                  points={
                    isShort20
                      ? (isHighCube ? "220,120 380,95 380,270 220,295" : "220,135 380,110 380,270 220,295")
                      : (isHighCube ? "220,120 500,70 500,245 220,295" : "220,135 500,85 500,245 220,295")
                  }
                  fill={isReefer ? "#F1F5F9" : "#B62825"}
                  stroke={isReefer ? "#CBD5E1" : "#D32F2F"}
                  strokeWidth="2"
                />
              )}

              {/* 3. Top Roof Face (or Open Top bows) */}
              {!isFlatRack && (
                isOpenTop ? (
                  // Open Top: Removable roof bows and tarpaulin edge
                  <g>
                    <polygon
                      points={isShort20 ? "140,160 300,135 380,110 220,135" : "140,160 420,110 500,85 220,135"}
                      fill="#064E3B"
                      stroke="#059669"
                      strokeWidth="1.5"
                      opacity="0.85"
                    />
                    {/* Curved Roof Bows */}
                    {[180, 260, 340, 420].map((bx, idx) => (
                      <path
                        key={idx}
                        d={`M ${bx},145 Q ${bx + 40},130 ${bx + 80},132`}
                        stroke="#FCD34D"
                        strokeWidth="2.5"
                        fill="none"
                      />
                    ))}
                  </g>
                ) : (
                  <polygon
                    points={
                      isShort20
                        ? (isHighCube ? "140,145 300,120 380,95 220,120" : "140,160 300,135 380,110 220,135")
                        : (isHighCube ? "140,145 420,95 500,70 220,120" : "140,160 420,110 500,85 220,135")
                    }
                    fill={isReefer ? "#E2E8F0" : "#D32F2F"}
                    stroke={isReefer ? "#FFFFFF" : "#EF5350"}
                    strokeWidth="1.5"
                    opacity="0.95"
                  />
                )
              )}

              {/* High Cube Zebra Warning Stripes along top perimeter */}
              {isHighCube && !isFlatRack && (
                <g>
                  {Array.from({ length: isShort20 ? 8 : 14 }).map((_, i) => {
                    const zx = 230 + i * 18;
                    const zy = 120 - i * 3.5;
                    return (
                      <polygon
                        key={i}
                        points={`${zx},${zy} ${zx + 8},${zy - 1.5} ${zx + 4},${zy + 10} ${zx - 4},${zy + 11.5}`}
                        fill={i % 2 === 0 ? "#FBBF24" : "#18181B"}
                      />
                    );
                  })}
                </g>
              )}

              {/* Corrugated Vertical Rib Lines on Long Side */}
              {!isFlatRack && Array.from({ length: isShort20 ? 10 : 18 }).map((_, i) => {
                const xTop = 235 + i * 14.5;
                const yTop = (isHighCube ? 117 : 132) - i * 2.5;
                const xBot = xTop;
                const yBot = yTop + (isHighCube ? 175 : 160);
                return (
                  <line
                    key={i}
                    x1={xTop}
                    y1={yTop}
                    x2={xBot}
                    y2={yBot}
                    stroke={isReefer ? "#CBD5E1" : "#8E1C1A"}
                    strokeWidth="2"
                    strokeOpacity="0.8"
                  />
                );
              })}

              {/* Front Door Vertical Locking Bars */}
              {!isFlatRack && (
                <>
                  <line x1="165" y1={isHighCube ? "137" : "152"} x2="165" y2="312" stroke={isReefer ? "#475569" : "#D9DEE5"} strokeWidth="2.5" />
                  <line x1="195" y1={isHighCube ? "128" : "143"} x2="195" y2="303" stroke={isReefer ? "#475569" : "#D9DEE5"} strokeWidth="2.5" />
                  {/* Locking handles */}
                  <rect x="160" y="230" width="10" height="4" fill="#FFFFFF" />
                  <rect x="190" y="221" width="10" height="4" fill="#FFFFFF" />
                </>
              )}

              {/* Reefer Cooling Grille on Front Face */}
              {isReefer && (
                <g>
                  <rect x="150" y="150" width="60" height="40" fill="#0F172A" rx="4" stroke="#64748B" strokeWidth="1" />
                  <circle cx="180" cy="170" r="14" fill="#1E293B" stroke="#94A3B8" strokeWidth="1" />
                  <line x1="180" y1="158" x2="180" y2="182" stroke="#38BDF8" strokeWidth="2" />
                  <line x1="168" y1="170" x2="192" y2="170" stroke="#38BDF8" strokeWidth="2" />
                  <rect x="155" y="195" width="20" height="8" fill="#10B981" rx="2" />
                </g>
              )}

              {/* Corner Castings */}
              <rect x="136" y={isHighCube ? "141" : "156"} width="8" height="8" fill="#18181B" stroke="#FFFFFF" strokeWidth="0.8" />
              <rect x="216" y={isHighCube ? "116" : "131"} width="8" height="8" fill="#18181B" stroke="#FFFFFF" strokeWidth="0.8" />
              <rect x="136" y="314" width="8" height="8" fill="#18181B" stroke="#FFFFFF" strokeWidth="0.8" />
              <rect x="216" y="289" width="8" height="8" fill="#18181B" stroke="#FFFFFF" strokeWidth="0.8" />
              <rect x={isShort20 ? "374" : "494"} y={isHighCube ? "66" : "81"} width="8" height="8" fill="#18181B" stroke="#FFFFFF" strokeWidth="0.8" />
              <rect x={isShort20 ? "374" : "494"} y={isShort20 ? "264" : "239"} width="8" height="8" fill="#18181B" stroke="#FFFFFF" strokeWidth="0.8" />

              {/* Stencil Marking on Container Side */}
              <text
                x={isShort20 ? "270" : "330"}
                y="200"
                fill={isReefer ? "#0F172A" : "#FFFFFF"}
                fontSize={isShort20 ? "28" : "34"}
                fontWeight="900"
                fontFamily="sans-serif"
                letterSpacing="2"
                transform={`rotate(-10 ${isShort20 ? 270 : 330} 200) skewX(-15)`}
                opacity="0.95"
              >
                {spec.label}
              </text>
              <text
                x={isShort20 ? "270" : "330"}
                y="225"
                fill={isReefer ? "#334155" : "#FFFFFF"}
                fontSize="11"
                fontWeight="700"
                fontFamily="monospace"
                letterSpacing="1"
                transform={`rotate(-10 ${isShort20 ? 270 : 330} 225) skewX(-15)`}
                opacity="0.75"
              >
                MSKU • ISO {spec.isoCode}
              </text>

              {/* ========================================================= */}
              {/* DIMENSION LINES & CALLOUT ARROWS                          */}
              {/* ========================================================= */}

              {/* Top Dimension: LENGTH */}
              <g stroke="#FFFFFF" strokeWidth="1.2">
                <line x1="220" y1="125" x2="220" y2="70" strokeOpacity="0.4" strokeDasharray="3 3" />
                <line x1={isShort20 ? "380" : "500"} y1={isShort20 ? "95" : "75"} x2={isShort20 ? "380" : "500"} y2="20" strokeOpacity="0.4" strokeDasharray="3 3" />
                <line x1="225" y1="70" x2={isShort20 ? "375" : "495"} y2="20" stroke="#FFFFFF" />
                <polygon points="225,70 233,67 232,73" fill="#FFFFFF" />
                <polygon points={`${isShort20 ? 375 : 495},20 ${isShort20 ? 367 : 487},17 ${isShort20 ? 368 : 488},23`} fill="#FFFFFF" />
              </g>
              <text
                x={isShort20 ? "300" : "355"}
                y="38"
                fill="#FFFFFF"
                fontSize="13"
                fontWeight="bold"
                fontFamily="monospace"
                textAnchor="middle"
              >
                {spec.length}
              </text>

              {/* Front Dimension: WIDTH */}
              <g stroke="#FFFFFF" strokeWidth="1.2">
                <line x1="140" y1="170" x2="110" y2="180" strokeOpacity="0.4" strokeDasharray="3 3" />
                <line x1="220" y1="145" x2="190" y2="155" strokeOpacity="0.4" strokeDasharray="3 3" />
                <line x1="110" y1="180" x2="190" y2="155" stroke="#FFFFFF" />
                <polygon points="110,180 118,177 117,183" fill="#FFFFFF" />
                <polygon points="190,155 182,152 183,158" fill="#FFFFFF" />
              </g>
              <text
                x="142"
                y="160"
                fill="#FFFFFF"
                fontSize="12"
                fontWeight="bold"
                fontFamily="monospace"
                textAnchor="middle"
              >
                {spec.width}
              </text>

              {/* Vertical Dimension: HEIGHT */}
              <g stroke="#FFFFFF" strokeWidth="1.2">
                <line x1={isShort20 ? "390" : "510"} y1={isHighCube ? "70" : "85"} x2={isShort20 ? "420" : "540"} y2={isHighCube ? "70" : "85"} strokeOpacity="0.4" strokeDasharray="3 3" />
                <line x1={isShort20 ? "390" : "510"} y1={isShort20 ? "270" : "245"} x2={isShort20 ? "420" : "540"} y2={isShort20 ? "270" : "245"} strokeOpacity="0.4" strokeDasharray="3 3" />
                <line x1={isShort20 ? "415" : "535"} y1={isHighCube ? "75" : "90"} x2={isShort20 ? "415" : "535"} y2={isShort20 ? "265" : "240"} stroke="#FFFFFF" />
                <polygon points={`${isShort20 ? 415 : 535},${isHighCube ? 75 : 90} ${isShort20 ? 411 : 531},${isHighCube ? 83 : 98} ${isShort20 ? 419 : 539},${isHighCube ? 83 : 98}`} fill="#FFFFFF" />
                <polygon points={`${isShort20 ? 415 : 535},${isShort20 ? 265 : 240} ${isShort20 ? 411 : 531},${isShort20 ? 257 : 232} ${isShort20 ? 419 : 539},${isShort20 ? 257 : 232}`} fill="#FFFFFF" />
              </g>
              <text
                x={isShort20 ? "445" : "565"}
                y="170"
                fill="#FFFFFF"
                fontSize="13"
                fontWeight="bold"
                fontFamily="monospace"
                textAnchor="middle"
              >
                {spec.height}
              </text>
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
};
