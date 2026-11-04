import React from 'react';
import { Check, ShieldCheck } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const IndustrialStickersShowcase: React.FC = () => {
  return (
    <section className="py-14 sm:py-16 bg-[#B62825] border-y border-[#8E1C1A] relative overflow-hidden select-none">
      {/* Red Corrugated Metal Background Ribbing Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.5) 12px, rgba(255,255,255,0.12) 12px, rgba(255,255,255,0.12) 24px, rgba(0,0,0,0.6) 24px, rgba(0,0,0,0.6) 36px)',
        }}
        aria-hidden="true"
      />

      {/* Industrial Rivet Line (Top & Bottom) */}
      <div className="absolute top-2 inset-x-0 flex justify-between px-6 pointer-events-none opacity-40">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-black/60 border border-white/40" />
        ))}
      </div>
      <div className="absolute bottom-2 inset-x-0 flex justify-between px-6 pointer-events-none opacity-40">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-black/60 border border-white/40" />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <ScrollReveal direction="up" className="flex flex-col items-center text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded bg-black/40 border border-white/20 text-white font-mono text-[10px] uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            <span>Industrial Decals &amp; Quality Seals</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black font-heading text-white tracking-tight">
            Certified Marine &amp; Heavy Cargo Standards
          </h3>
        </ScrollReveal>

        {/* Concept 03: 5 Authentic Industrial Badges & Stickers Grid */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-10">
          
          {/* 1. MSK APPROVED [✓] Stamp */}
          <div className="transform -rotate-2 hover:rotate-0 transition-transform duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.4)]">
            <div className="bg-white text-black px-5 py-3 rounded-md border-4 border-black border-dashed flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-black text-white flex items-center justify-center font-bold">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-heading font-black text-base sm:text-lg tracking-wider uppercase leading-none">
                  MSK APPROVED
                </span>
                <span className="font-mono text-[9px] font-bold text-neutral-600 tracking-widest uppercase mt-0.5">
                  JNPT / MUNDRA STAMP
                </span>
              </div>
            </div>
          </div>

          {/* 2. PROJECT CARGO Yellow Stencil Plate */}
          <div className="transform rotate-1 hover:rotate-0 transition-transform duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.4)]">
            <div className="relative bg-[#F59E0B] text-black px-6 py-3 rounded border-2 border-neutral-900 flex items-center gap-3">
              {/* Corner Screw Rivets */}
              <span className="absolute top-1 left-1.5 w-1.5 h-1.5 rounded-full bg-neutral-900" />
              <span className="absolute top-1 right-1.5 w-1.5 h-1.5 rounded-full bg-neutral-900" />
              <span className="absolute bottom-1 left-1.5 w-1.5 h-1.5 rounded-full bg-neutral-900" />
              <span className="absolute bottom-1 right-1.5 w-1.5 h-1.5 rounded-full bg-neutral-900" />

              {/* Crane Hook Glyph */}
              <div className="w-7 h-7 bg-black text-[#F59E0B] rounded flex items-center justify-center font-black text-xs">
                ODC
              </div>
              <div className="flex flex-col text-left">
                <span className="font-heading font-black text-base sm:text-lg tracking-wider uppercase leading-none">
                  PROJECT CARGO
                </span>
                <span className="font-mono text-[9px] font-bold text-neutral-800 tracking-widest uppercase mt-0.5">
                  HEAVY LIFT • ODC SECURED
                </span>
              </div>
            </div>
          </div>

          {/* 3. HANDLE WITH CARE Wine Glass Fragile Sticker */}
          <div className="transform -rotate-1 hover:rotate-0 transition-transform duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.4)]">
            <div className="bg-white text-[#B62825] px-5 py-3 rounded border-2 border-[#B62825] flex items-center gap-3">
              {/* Wine Glass SVG */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-7 h-7 text-[#B62825]"
              >
                <path d="M8 22h8" />
                <path d="M12 15v7" />
                <path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z" />
              </svg>
              <div className="flex flex-col text-left">
                <span className="font-heading font-black text-base sm:text-lg tracking-wider uppercase leading-none text-[#B62825]">
                  HANDLE WITH CARE
                </span>
                <span className="font-mono text-[9px] font-bold text-neutral-700 tracking-widest uppercase mt-0.5">
                  FRAGILE • EXPORT SECURED
                </span>
              </div>
            </div>
          </div>

          {/* 4. CARGO HANDLING SPECIALIST Circular Seal */}
          <div className="transform rotate-2 hover:rotate-0 transition-transform duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.4)]">
            <div className="w-24 h-24 rounded-full bg-[#000000] border-2 border-white/80 p-1 flex items-center justify-center text-center">
              <div className="w-full h-full rounded-full border border-dashed border-[#B62825] flex flex-col items-center justify-center p-1">
                <span className="text-[7.5px] font-mono font-bold text-[#AEB6C2] uppercase leading-tight tracking-tighter">
                  PORT RIGGING
                </span>
                <span className="text-[9px] font-heading font-black text-white uppercase leading-tight my-0.5">
                  CARGO HANDLING
                  <br />
                  SPECIALIST
                </span>
                <span className="text-[7.5px] font-mono font-bold text-[#B62825] uppercase leading-tight">
                  ★ JNPT ★
                </span>
              </div>
            </div>
          </div>

          {/* 5. EST. 2019 Barcode Sticker */}
          <div className="transform -rotate-2 hover:rotate-0 transition-transform duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.4)]">
            <div className="bg-white text-black px-4 py-2.5 rounded border border-neutral-300 flex flex-col items-center justify-center space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-sm tracking-wider uppercase">
                  EST. 2019
                </span>
                <span className="font-mono text-[8px] bg-black text-white px-1.5 py-0.2 rounded font-bold">
                  MSK-IN
                </span>
              </div>
              {/* CSS Barcode Lines */}
              <div className="h-5 flex items-center gap-[2px] w-28 px-1">
                <span className="w-1 h-full bg-black" />
                <span className="w-0.5 h-full bg-black" />
                <span className="w-1.5 h-full bg-black" />
                <span className="w-0.5 h-full bg-black" />
                <span className="w-1 h-full bg-black" />
                <span className="w-2 h-full bg-black" />
                <span className="w-0.5 h-full bg-black" />
                <span className="w-1 h-full bg-black" />
                <span className="w-1.5 h-full bg-black" />
                <span className="w-0.5 h-full bg-black" />
                <span className="w-1 h-full bg-black" />
                <span className="w-2 h-full bg-black" />
                <span className="w-0.5 h-full bg-black" />
              </div>
              <span className="font-mono text-[7.5px] text-neutral-600 tracking-widest">
                81045-92823-JNPT
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

