import React from 'react';
import { Network, Building2 } from 'lucide-react';

interface ChildCompany {
  id: string;
  name: string;
  delayClass: string;
}

const CHILD_COMPANIES: ChildCompany[] = [
  { id: 'speedy', name: 'Speedy', delayClass: 'animate-tree-child-1' },
  { id: 'punjab', name: 'Punjab', delayClass: 'animate-tree-child-2' },
  { id: 'pollaris', name: 'Pollaris', delayClass: 'animate-tree-child-3' },
];

/**
 * MSK LOGISTICS — CARTING TREE DIAGRAM (Point 03)
 * 
 * Exact Hierarchy:
 * CARTING (Parent Category)
 * ├── Speedy (Child Company)
 * ├── Punjab (Child Company)
 * └── Pollaris (Child Company)
 * 
 * Features:
 * - Desktop: Centered CARTING above 3 horizontally aligned child cards with clean connecting lines.
 * - Mobile: Stacked vertical tree with a left-side trunk spine and horizontal branches.
 * - Restrained animations: Parent entrance -> stem/branch expansion -> staggered child card reveal.
 * - Interaction: Hover lift, subtle MSK-red border highlight, visible keyboard focus rings.
 */
export const CartingTreeDiagram: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Visual Frame Container */}
      <div className="relative bg-white/95 rounded-2xl border border-[#E2E2E2] p-6 sm:p-10 lg:p-12 shadow-xs">
        
        {/* Subtle decorative grid watermark */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.025] rounded-2xl"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #0B0B0D 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />

        {/* =================================================================== */}
        {/* 1. PARENT NODE — CARTING                                            */}
        {/* =================================================================== */}
        <div className="flex justify-center relative z-10">
          <div
            tabIndex={0}
            role="region"
            aria-label="Parent Category: CARTING"
            className="animate-tree-parent group relative inline-flex flex-col items-center justify-center px-8 sm:px-12 py-5 sm:py-6 rounded-xl bg-[#0B0B0D] text-white border-2 border-[#B62825] shadow-lg shadow-[#0B0B0D]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#B62825]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B62825] focus-visible:ring-offset-2 min-w-[240px] sm:min-w-[280px]"
          >
            {/* Top Indicator Accent */}
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B62825] shadow-[0_0_8px_rgba(182,40,37,0.85)] shrink-0" />
              <span className="font-mono-code text-[11px] font-bold tracking-[0.2em] text-[#AEB6C2] uppercase">
                PARENT CATEGORY
              </span>
            </div>

            {/* Primary CARTING Label */}
            <div className="flex items-center gap-3">
              <Network className="w-6 h-6 text-[#B62825] shrink-0" />
              <span className="text-2xl sm:text-3xl font-extrabold font-heading text-[#F4F5F7] tracking-wider">
                CARTING
              </span>
            </div>

            {/* Scope Identifier */}
            <span className="text-[12px] font-body text-[#AEB6C2] mt-1.5 tracking-wide">
              Primary CFS Movement Category
            </span>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 2. DESKTOP & TABLET TREE CONNECTOR LINES                            */}
        {/* =================================================================== */}
        <div className="hidden md:block relative z-0">
          {/* Central Vertical Connector Stem (from bottom of parent) */}
          <div className="flex justify-center">
            <div className="animate-tree-stem w-0.5 h-10 lg:h-12 bg-[#94A3B8] relative">
              {/* Central Junction Node where parent stem meets horizontal branch */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#B62825] shadow-xs" />
            </div>
          </div>

          {/* 3-Column Child Grid with Integrated Gap-Proof Branching Lines */}
          <div className="grid grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {/* Column 1: Speedy */}
            <div className="flex flex-col items-center">
              {/* Column 1 Line Segment (Top) */}
              <div className="relative w-full h-10 lg:h-12">
                {/* Horizontal line extending right into the gap to meet Column 2 */}
                <div className="animate-tree-branch absolute top-0 left-1/2 -right-3 lg:-right-4 h-0.5 bg-[#94A3B8]" />
                {/* Corner junction dot */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#B62825]" />
                {/* Vertical drop line down into card center */}
                <div className="animate-tree-stem absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-[#94A3B8]" />
                {/* Terminal dot above card */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#34343A]" />
              </div>

              {/* Child Card */}
              <ChildCompanyCard name="Speedy" delayClass="animate-tree-child-1" index={1} />
            </div>

            {/* Column 2: Punjab */}
            <div className="flex flex-col items-center">
              {/* Column 2 Line Segment (Top) */}
              <div className="relative w-full h-10 lg:h-12">
                {/* Horizontal line spanning across column and reaching both gaps */}
                <div className="animate-tree-branch absolute top-0 -left-3 lg:-left-4 -right-3 lg:-right-4 h-0.5 bg-[#94A3B8]" />
                {/* Central junction dot where parent stem connects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#B62825]" />
                {/* Vertical drop line down into card center */}
                <div className="animate-tree-stem absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-[#94A3B8]" />
                {/* Terminal dot above card */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#34343A]" />
              </div>

              {/* Child Card */}
              <ChildCompanyCard name="Punjab" delayClass="animate-tree-child-2" index={2} />
            </div>

            {/* Column 3: Pollaris */}
            <div className="flex flex-col items-center">
              {/* Column 3 Line Segment (Top) */}
              <div className="relative w-full h-10 lg:h-12">
                {/* Horizontal line extending left into the gap to meet Column 2 */}
                <div className="animate-tree-branch absolute top-0 -left-3 lg:-left-4 right-1/2 h-0.5 bg-[#94A3B8]" />
                {/* Corner junction dot */}
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#B62825]" />
                {/* Vertical drop line down into card center */}
                <div className="animate-tree-stem absolute top-0 bottom-0 right-1/2 translate-x-1/2 w-0.5 bg-[#94A3B8]" />
                {/* Terminal dot above card */}
                <div className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#34343A]" />
              </div>

              {/* Child Card */}
              <ChildCompanyCard name="Pollaris" delayClass="animate-tree-child-3" index={3} />
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 3. MOBILE VERTICAL TREE (< 768px)                                   */}
        {/* =================================================================== */}
        <div className="md:hidden flex flex-col items-center mt-2 relative z-0">
          {/* Vertical Stem from Parent */}
          <div className="animate-tree-stem w-0.5 h-8 bg-[#94A3B8] relative">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#B62825]" />
          </div>

          {/* Left-Spine Tree Container */}
          <div className="w-full relative pl-8 pr-2 pt-2 space-y-4 max-w-sm mx-auto">
            {/* Continuous Vertical Trunk Spine along the left */}
            <div className="animate-tree-stem absolute left-3 top-2 bottom-8 w-0.5 bg-[#94A3B8]" />

            {/* Stacked Child Cards with Horizontal Branches */}
            {CHILD_COMPANIES.map((company, index) => (
              <div key={company.id} className="relative">
                {/* Horizontal connector from left spine into card */}
                <div className="animate-tree-branch absolute -left-5 top-1/2 -translate-y-1/2 w-5 h-0.5 bg-[#94A3B8]" />
                {/* Junction Node */}
                <div className="absolute -left-5 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#B62825]" />

                <ChildCompanyCard 
                  name={company.name} 
                  delayClass={company.delayClass} 
                  index={index + 1} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Context Footnote */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-[#EAEAEA] flex flex-wrap items-center justify-between gap-4 text-[12px] font-mono-code text-[#666666]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B62825]" />
            <span>HIERARCHY: CARTING &rarr; SPEEDY • PUNJAB • POLLARIS</span>
          </div>
          <span className="text-[#888888]">OPERATIONAL CARTING ARRANGEMENTS</span>
        </div>

      </div>
    </div>
  );
};

interface ChildCompanyCardProps {
  name: string;
  delayClass: string;
  index: number;
}

const ChildCompanyCard: React.FC<ChildCompanyCardProps> = ({ name, delayClass, index }) => {
  return (
    <div
      tabIndex={0}
      role="article"
      aria-label={`${name} - Associated Company (Node 0${index})`}
      className={`${delayClass} group relative w-full bg-white rounded-xl border border-[#E2E2E2] p-6 sm:p-7 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-[#B62825] hover:shadow-lg hover:shadow-[#B62825]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B62825] focus-visible:border-[#B62825] cursor-default`}
    >
      {/* Top Meta Indicator */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F5F5F3] text-[11px] font-mono-code font-semibold text-[#666666] border border-[#E2E2E2] group-hover:border-[#B62825]/30 group-hover:text-[#B62825] transition-colors">
          <Building2 className="w-3.5 h-3.5 text-[#B62825] shrink-0" />
          <span>ASSOCIATED COMPANY • 0{index}</span>
        </span>
        <span 
          className="w-2 h-2 rounded-full bg-[#10B981] group-hover:scale-125 transition-transform" 
          title="Active Associated Node" 
        />
      </div>

      {/* Company Name */}
      <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#343434] group-hover:text-[#B62825] transition-colors tracking-tight">
        {name}
      </h3>

      {/* Descriptive Relationship Label */}
      <p className="text-[13px] font-body text-[#666666] mt-1.5 leading-normal">
        Child Company
      </p>

      {/* Subtle Connection Status Footer */}
      <div className="mt-4 pt-3 border-t border-[#F0F0F0] flex items-center justify-between text-[11.5px] font-mono-code text-[#888888]">
        <span>Carting Network</span>
        <span className="text-[#B62825] font-semibold opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
          Connected &rarr;
        </span>
      </div>
    </div>
  );
};
