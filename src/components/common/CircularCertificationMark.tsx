import React, { useId } from 'react';
import { Link } from 'react-router-dom';

interface CircularCertificationMarkProps {
  className?: string;
  size?: number; // base size in pixels
}

/**
 * Modern Circular Certification Mark for MSK Logistics
 * - Outer dotted circular ring in titanium silver
 * - Thin solid silver circular border
 * - Upper curved text: CERTIFIED (rotated with outer assembly)
 * - Lower curved text: CERTIFIED (inverted 180 degrees, rotated with outer assembly)
 * - Two small MSK red circular markers at left & right
 * - Two thin inner circular red outlines
 * - Centre text: ISO 9001:2015 (completely stationary)
 * - Continuous smooth 25s rotation of outer assembly
 */
export const CircularCertificationMark: React.FC<CircularCertificationMarkProps> = ({
  className = '',
}) => {
  const id = useId().replace(/:/g, '');
  const upperArcId = `upperArc-${id}`;
  const lowerArcId = `lowerArc-${id}`;

  return (
    <div className={`relative select-none ${className}`}>
      <Link
        to="/about#certifications"
        aria-label="ISO 9001:2015 Certified Management System"
        className="group relative block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B62825] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0D] rounded-full transition-transform duration-300 hover:scale-105 active:scale-95"
        title="MSK Logistics — ISO 9001:2015 Certified"
      >
        {/* Subtle Ambient Backlight Aura */}
        <div
          className="absolute inset-1 rounded-full bg-[#B62825]/10 blur-md group-hover:bg-[#B62825]/20 group-hover:blur-lg transition-all duration-300 pointer-events-none"
          aria-hidden="true"
        />

        {/* SVG Certification Mark (100x100 to 110x110 responsive container) */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-[104px] lg:h-[104px] drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)] group-hover:drop-shadow-[0_6px_22px_rgba(182,40,37,0.35)] transition-all">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              {/* Upper Semicircle Arc (left to right along the top) */}
              <path
                id={upperArcId}
                d="M 28 100 A 72 72 0 0 1 172 100"
                fill="none"
              />
              {/* Lower Semicircle Arc (left to right along the bottom, inverting text 180 degrees) */}
              <path
                id={lowerArcId}
                d="M 28 100 A 72 72 0 0 0 172 100"
                fill="none"
              />
            </defs>

            {/* Dark Obsidian Circular Base */}
            <circle cx="100" cy="100" r="95" fill="#0B0B0D" fillOpacity="0.85" />

            {/* ============================================================= */}
            {/* 1. ROTATING OUTER CIRCULAR ASSEMBLY (1 revolution every 25s)  */}
            {/* ============================================================= */}
            <g className="animate-iso-outer-spin origin-center">
              {/* 1. Outer dotted circular ring in titanium silver */}
              <circle
                cx="100"
                cy="100"
                r="92"
                stroke="#D9DEE5"
                strokeWidth="1.2"
                strokeDasharray="3 4.5"
                fill="none"
                opacity="0.65"
              />

              {/* 2. Thin solid silver circular border */}
              <circle
                cx="100"
                cy="100"
                r="85"
                stroke="#D9DEE5"
                strokeWidth="1"
                fill="none"
                opacity="0.85"
              />

              {/* 3. Upper curved text: CERTIFIED */}
              <text
                fill="#D9DEE5"
                fontSize="11.5"
                fontFamily="'Space Grotesk', system-ui, -apple-system, sans-serif"
                fontWeight="700"
                letterSpacing="3.5px"
                className="select-none"
              >
                <textPath href={`#${upperArcId}`} startOffset="50%" textAnchor="middle">
                  CERTIFIED
                </textPath>
              </text>

              {/* 4. Lower curved text: CERTIFIED (following bottom arc, inverted 180 degrees) */}
              <text
                fill="#D9DEE5"
                fontSize="11.5"
                fontFamily="'Space Grotesk', system-ui, -apple-system, sans-serif"
                fontWeight="700"
                letterSpacing="3.5px"
                className="select-none"
              >
                <textPath href={`#${lowerArcId}`} startOffset="50%" textAnchor="middle">
                  CERTIFIED
                </textPath>
              </text>

              {/* 5. Two small MSK red circular markers at left & right (9 and 3 o'clock) */}
              <circle cx="28" cy="100" r="2.8" fill="#B62825" />
              <circle cx="172" cy="100" r="2.8" fill="#B62825" />

              {/* 6. Two thin inner circular red outlines */}
              <circle
                cx="100"
                cy="100"
                r="56"
                stroke="#B62825"
                strokeWidth="1"
                fill="none"
                opacity="0.85"
              />
              <circle
                cx="100"
                cy="100"
                r="52"
                stroke="#B62825"
                strokeWidth="0.8"
                fill="none"
                opacity="0.6"
              />
            </g>

            {/* ============================================================= */}
            {/* 2. COMPLETELY STATIONARY CENTRE TEXT: ISO 9001:2015           */}
            {/* ============================================================= */}
            <g className="pointer-events-none select-none">
              {/* Centre Top: ISO */}
              <text
                x="100"
                y="94"
                textAnchor="middle"
                fill="#F4F5F7"
                fontFamily="'Space Grotesk', system-ui, -apple-system, sans-serif"
                fontSize="21"
                fontWeight="800"
                letterSpacing="2.5px"
                className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              >
                ISO
              </text>

              {/* Subtle Red Center Separator Line */}
              <line
                x1="80"
                y1="100"
                x2="120"
                y2="100"
                stroke="#B62825"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.9"
              />

              {/* Centre Bottom: 9001:2015 */}
              <text
                x="100"
                y="116"
                textAnchor="middle"
                fill="#D9DEE5"
                fontFamily="'JetBrains Mono', ui-monospace, monospace"
                fontSize="12"
                fontWeight="700"
                letterSpacing="1.2px"
                className="drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
              >
                9001:2015
              </text>
            </g>
          </svg>
        </div>
      </Link>
    </div>
  );
};
