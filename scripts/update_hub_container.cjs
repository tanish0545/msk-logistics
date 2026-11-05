const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'navigation', 'Services3DHubDropdown.tsx');
let code = fs.readFileSync(filePath, 'utf8');

// Replace the defs and container to put the 3D container directly inside the main SVG
// First check if the file contains the old structure
const oldStart = `            {/* Connector Lines to all 6 nodes */}`;
const oldEnd = `          {/* 6 Radial Service Node Buttons Placed Around the Central 3D Hub */}`;

if (!code.includes(oldStart) || !code.includes(oldEnd)) {
  console.error("Could not find markers!");
  process.exit(1);
}

// Prepare the replacement SVG with container inside
const newSvgAndContainer = `            {/* Connector Lines to all 6 nodes */}
            {SERVICE_NODES.map((node) => {
              const isHovered = hoveredNodeId === node.id;
              return (
                <g key={\`line-\${node.id}\`} className="transition-all duration-300">
                  {/* Base / Inactive or Active Path */}
                  <line
                    x1={node.nodeAnchor.x}
                    y1={node.nodeAnchor.y}
                    x2={node.hubAnchor.x}
                    y2={node.hubAnchor.y}
                    stroke={isHovered ? 'url(#activeLineGradient)' : '#E2E8F0'}
                    strokeWidth={isHovered ? 2.2 : 1.2}
                    strokeDasharray={isHovered ? 'none' : '3 3'}
                    className="transition-all duration-300"
                  />

                  {/* Terminal dot at node connection point */}
                  <circle
                    cx={node.nodeAnchor.x}
                    cy={node.nodeAnchor.y}
                    r={isHovered ? 3.5 : 2.5}
                    fill={isHovered ? '#B62825' : '#94A3B8'}
                    className="transition-all duration-300"
                  />

                  {/* Junction dot on pedestal perimeter */}
                  <circle
                    cx={node.hubAnchor.x}
                    cy={node.hubAnchor.y}
                    r={isHovered ? 4 : 2.5}
                    fill={isHovered ? '#B62825' : '#CBD5E1'}
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}

            {/* Ground Contact Shadow Directly under 3D Container */}
            <ellipse 
              cx="270" 
              cy="204" 
              rx="46" 
              ry="16" 
              fill="#000000" 
              fillOpacity={hoveredNodeId ? "0.38" : "0.22"} 
              className="transition-all duration-300"
            />

            {/* Central 3D Shipping Container Illustration (Grounded on Pedestal Disc) */}
            <g 
              id="central3DContainer"
              className="pointer-events-none transition-all duration-500 ease-out"
              style={{
                transformOrigin: '270px 204px',
                transform: hoveredNodeId ? 'scale(1.04) translateY(-3px)' : 'scale(1) translateY(0)',
                filter: hoveredNodeId 
                  ? 'drop-shadow(0 14px 22px rgba(182,40,37,0.42))' 
                  : 'drop-shadow(0 8px 16px rgba(182,40,37,0.25))'
              }}
            >
              <g transform="translate(200, 96)">
                {/* 1. TOP ROOF (Isometric Polygon) */}
                <polygon points="70,12 122,38 70,64 18,38" fill="url(#roofGrad)" />
                {/* Roof Transverse Ribs */}
                <line x1="31" y1="31" x2="83" y2="57" stroke="#EA4335" strokeWidth="0.8" strokeOpacity="0.7" />
                <line x1="44" y1="25" x2="96" y2="51" stroke="#EA4335" strokeWidth="0.8" strokeOpacity="0.7" />
                <line x1="57" y1="18" x2="109" y2="44" stroke="#EA4335" strokeWidth="0.8" strokeOpacity="0.7" />

                {/* 2. LEFT SIDE WALL (Corrugated Steel) */}
                <polygon points="18,38 70,64 70,108 18,82" fill="url(#leftFaceGrad)" />
                {/* Left Wall Corrugation Stripes (Alternating Light & Shadow) */}
                {[28, 38, 48, 58].map((xOffset, idx) => {
                  const topY = 38 + ((xOffset - 18) / (70 - 18)) * (64 - 38);
                  const botY = 82 + ((xOffset - 18) / (70 - 18)) * (108 - 82);
                  return (
                    <g key={\`l-corrugation-\${idx}\`}>
                      <line x1={xOffset} y1={topY} x2={xOffset} y2={botY} stroke="#B62825" strokeWidth="1.2" strokeOpacity="0.6" />
                      <line x1={xOffset + 1.5} y1={topY + 0.7} x2={xOffset + 1.5} y2={botY + 0.7} stroke="#4A0B0A" strokeWidth="1" strokeOpacity="0.9" />
                    </g>
                  );
                })}
                {/* Subtle White Stencil Text on Left Side */}
                <text 
                  x="44" 
                  y="85" 
                  fill="#FFFFFF" 
                  fillOpacity="0.7" 
                  fontSize="6.5" 
                  fontWeight="900" 
                  fontFamily="monospace"
                  transform="rotate(26, 44, 85) skewX(-20)"
                  letterSpacing="1"
                >
                  MSK
                </text>

                {/* 3. RIGHT FRONT WALL (Double Rear Doors) */}
                <polygon points="70,64 122,38 122,82 70,108" fill="url(#rightFaceGrad)" />
                
                {/* High Cube Top Zebra Height Warning Decal */}
                <polygon points="70,64 122,38 122,43 70,69" fill="#FACC15" />
                <line x1="78" y1="60" x2="82" y2="62" stroke="#000000" strokeWidth="1.5" />
                <line x1="90" y1="54" x2="94" y2="56" stroke="#000000" strokeWidth="1.5" />
                <line x1="102" y1="48" x2="106" y2="50" stroke="#000000" strokeWidth="1.5" />
                <line x1="114" y1="42" x2="118" y2="44" stroke="#000000" strokeWidth="1.5" />

                {/* Vertical Door Seam & Rubber Gaskets */}
                <line x1="96" y1="45" x2="96" y2="95" stroke="#1E293B" strokeWidth="1.4" />
                
                {/* Four Vertical Galvanized Locking Bars */}
                <line x1="82" y1="55" x2="82" y2="99" stroke="#E2E8F0" strokeWidth="1.4" />
                <line x1="88" y1="52" x2="88" y2="96" stroke="#E2E8F0" strokeWidth="1.4" />
                <line x1="104" y1="44" x2="104" y2="88" stroke="#E2E8F0" strokeWidth="1.4" />
                <line x1="110" y1="41" x2="110" y2="85" stroke="#E2E8F0" strokeWidth="1.4" />

                {/* Locking Cams / Handles (Silver) */}
                <rect x="80.5" y="76" width="3" height="3" fill="#FFFFFF" rx="0.5" />
                <rect x="86.5" y="73" width="3" height="3" fill="#FFFFFF" rx="0.5" />
                <rect x="102.5" y="65" width="3" height="3" fill="#FFFFFF" rx="0.5" />
                <rect x="108.5" y="62" width="3" height="3" fill="#FFFFFF" rx="0.5" />

                {/* CSC Safety Approval Plate Rectangle */}
                <rect x="75" y="80" width="8" height="5" fill="#E2E8F0" fillOpacity="0.8" rx="0.5" />

                {/* 4. HEAVY STEEL CORNER CASTINGS WITH ISO APERTURES */}
                <circle cx="70" cy="12" r="2.5" fill="url(#castingGrad)" stroke="#111" strokeWidth="0.5" />
                <circle cx="18" cy="38" r="2.5" fill="url(#castingGrad)" stroke="#111" strokeWidth="0.5" />
                <circle cx="122" cy="38" r="2.5" fill="url(#castingGrad)" stroke="#111" strokeWidth="0.5" />
                <circle cx="70" cy="108" r="3" fill="url(#castingGrad)" stroke="#111" strokeWidth="0.5" />
                <circle cx="18" cy="82" r="2.5" fill="url(#castingGrad)" stroke="#111" strokeWidth="0.5" />
                <circle cx="122" cy="82" r="2.5" fill="url(#castingGrad)" stroke="#111" strokeWidth="0.5" />
              </g>
            </g>
          </svg>

          `;

// We also need to ensure the defs in the main SVG has roofGrad, leftFaceGrad, rightFaceGrad, castingGrad
const oldDefs = `<filter id="containerShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#B62825" floodOpacity="0.25" />
              </filter>
            </defs>`;

const newDefs = `<filter id="containerShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#B62825" floodOpacity="0.25" />
              </filter>

              {/* 3D Top Roof Gradient */}
              <linearGradient id="roofGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D93834" />
                <stop offset="50%" stopColor="#C42A27" />
                <stop offset="100%" stopColor="#B62825" />
              </linearGradient>

              {/* 3D Left Face Gradient (In Shade) */}
              <linearGradient id="leftFaceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#981F1D" />
                <stop offset="100%" stopColor="#6E1311" />
              </linearGradient>

              {/* 3D Right Face Gradient (Facing Light) */}
              <linearGradient id="rightFaceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B62825" />
                <stop offset="100%" stopColor="#8C1917" />
              </linearGradient>

              {/* Corner Casting Steel */}
              <linearGradient id="castingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#555555" />
                <stop offset="100%" stopColor="#222222" />
              </linearGradient>
            </defs>`;

// Find the slice to replace between oldStart and oldEnd
const startIndex = code.indexOf(oldStart);
const endIndex = code.indexOf(oldEnd);

const replacedSection = code.substring(0, startIndex) + newSvgAndContainer + code.substring(endIndex);

let finalCode = replacedSection;
if (finalCode.includes(oldDefs)) {
  finalCode = finalCode.replace(oldDefs, newDefs);
} else {
  // If defs already has some or uses different formatting, let's normalize
  console.log("oldDefs not found directly, checking defs");
}

fs.writeFileSync(filePath, finalCode, 'utf8');
console.log("Successfully updated Services3DHubDropdown.tsx!");

