import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Layers, 
  Anchor, 
  ArrowRight, 
  Maximize2, 
  Compass, 
  Box,
  FileCheck2,
  Lock
} from 'lucide-react';
import { InnerPageBanner } from '../components/layout/InnerPageBanner';
import { ScrollReveal } from '../components/common/ScrollReveal';

interface VisualCard {
  id: string;
  image: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  technicalSpecs: string[];
}

const HAZARDOUS_VISUALS: VisualCard[] = [
  {
    id: 'port-terminal-staging',
    image: '/images/services/hazardous-cargo/dg-port-terminal-hero.jpg',
    tag: 'PORT STAGING & TERMINAL YARD',
    title: 'Maritime DG Yard Staging & ISO Placarding',
    subtitle: 'Nhava Sheva (JNPT) & Mundra port hazardous cargo staging',
    description: 'Designated hazardous cargo container staging within port terminal isolation yards. Containers feature full four-sided IMDG hazard diamonds, class placards, and emergency isolation clearance under round-the-clock terminal safety surveillance.',
    technicalSpecs: [
      'Four-sided IMDG hazard diamond placards matching primary & secondary risks',
      'Port terminal gate-in coordination within designated hazardous cargo cut-off windows',
      'Compliance with JNPT / Mundra port authority dangerous goods handling guidelines',
      'Continuous thermal and isolation monitoring prior to vessel cellular loading'
    ]
  },
  {
    id: 'palletized-chemical-drums',
    image: '/images/services/hazardous-cargo/chemical-drums-palletized.jpg',
    tag: 'UN-RATED DRUM PACKAGING',
    title: 'UN-Certified Steel Chemical Drums & Heavy Palletisation',
    subtitle: 'Class 3 Flammables, Class 8 Corrosives & Chemical Precursors',
    description: 'Precision palletisation of UN-rated 200-litre (55-gallon) steel drums on certified heavy-duty timber skids. Each unit is strapped with high-tensile composite banding, corner edge protectors, and tamper-evident hazard classification diamonds.',
    technicalSpecs: [
      'UN Packaging Certification markings verified on drum chimes (e.g. UN 1A1/X/250)',
      'Four-drum configuration banded with 19mm composite polyester lashing straps',
      'Heat-treated ISPM-15 compliant wooden pallets with non-slip base padding',
      'Hazard diamond labels placed visibly on drum heads and vertical sidewalls'
    ]
  },
  {
    id: 'industrial-ibc-totes',
    image: '/images/services/hazardous-cargo/industrial-ibc-tote.jpg',
    tag: 'INTERMEDIATE BULK CONTAINERS (IBC)',
    title: '1,000-Litre UN-Approved Composite IBC Totes',
    subtitle: 'Liquid chemical transit in galvanized steel tubular cages',
    description: 'Securing and loading of 1000L Intermediate Bulk Containers (IBCs) with high-density polyethylene (HDPE) inner bottles supported within tubular galvanized steel grids. Engineered bottom chocking ensures zero lateral sliding under marine pitching.',
    technicalSpecs: [
      'UN 31HA1/Y composite IBC specification with pressure-relief venting caps',
      'Integrated four-way forklift entry pallets secured with anti-slip friction mats',
      'Secondary valve-locking mechanisms and drip-containment seal verification',
      'Floor chocking with 100x100mm timber dunnage against container anchor rings'
    ]
  },
  {
    id: 'container-segregation-bulkhead',
    image: '/images/services/hazardous-cargo/dg-container-segregation.jpg',
    tag: 'IMDG SEGREGATION & SECURING',
    title: 'Engineered Timber Bulkheading & Cargo Segregation',
    subtitle: 'Container internal compartment separation adhering to IMDG tables',
    description: 'Internal container compartment separation utilizing structural hardwood bulkheads and cross-bracing. Incompatible chemical lots or mixed consignments are partitioned with certified heavy-duty ratchet lashings and marine timber dunnage.',
    technicalSpecs: [
      'IMDG Code Chapter 7.2 segregation table compliance (Away From / Separated From)',
      'Structural timber bulkheads engineered to withstand 0.8g forward surge forces',
      'Heavy-duty 5-ton polyester ratchet straps anchored to ISO container corner castings',
      'Airbags and cellular dunnage placed between cargo rows to eliminate void spaces'
    ]
  }
];

const DG_CLASSES = [
  { classNum: 'Class 2', name: 'Gases', desc: 'Flammable (2.1), Non-Flammable/Non-Toxic (2.2), Toxic (2.3) compressed gases in cylinders & tanks', color: 'from-amber-500/20 to-amber-600/10', border: 'border-amber-500/30' },
  { classNum: 'Class 3', name: 'Flammable Liquids', desc: 'Solvents, paints, adhesives, alcohols with flash point <= 60°C (Packing Groups I, II, III)', color: 'from-red-600/20 to-red-700/10', border: 'border-red-600/30' },
  { classNum: 'Class 4', name: 'Flammable Solids', desc: 'Substances liable to spontaneous combustion (4.2) or emitting flammable gases on water contact (4.3)', color: 'from-orange-500/20 to-orange-600/10', border: 'border-orange-500/30' },
  { classNum: 'Class 5', name: 'Oxidizers & Organic Peroxides', desc: 'Oxidizing agents (5.1) and organic peroxides (5.2) requiring controlled thermal environments', color: 'from-yellow-500/20 to-yellow-600/10', border: 'border-yellow-500/30' },
  { classNum: 'Class 6', name: 'Toxic & Infectious Substances', desc: 'Toxic chemicals (6.1) liable to cause health hazards via inhalation, ingestion, or absorption', color: 'from-purple-500/20 to-purple-600/10', border: 'border-purple-500/30' },
  { classNum: 'Class 8', name: 'Corrosives', desc: 'Acids, alkalis, and corrosive chemicals causing severe damage to organic tissue and metal surfaces', color: 'from-slate-500/20 to-slate-600/10', border: 'border-slate-500/30' },
  { classNum: 'Class 9', name: 'Miscellaneous DG', desc: 'Lithium batteries, environmentally hazardous chemicals, genetically modified organisms, elevated temp', color: 'from-blue-500/20 to-blue-600/10', border: 'border-blue-500/30' },
];

export const HazardousCargoPage: React.FC = () => {
  const [activeImageModal, setActiveImageModal] = useState<string | null>(null);

  return (
    <div className="space-y-0 bg-[#0B0B0D] text-white selection:bg-[#B62825] selection:text-white">
      {/* ========================================================================= */}
      {/* 1. HERO BANNER                                                            */}
      {/* ========================================================================= */}
      <InnerPageBanner
        badge="DANGEROUS GOODS (DG) &amp; HAZARDOUS CARGO"
        badgeSubtext="IMDG CODE • IATA DGR • UN-CERTIFIED PACKAGING • NHAVA SHEVA (JNPT) &amp; MUNDRA"
        title="Hazardous Cargo Handling, Technical Packaging &amp; DG Securing"
        description="Engineered cargo securing, chemical drum palletisation, IBC tote restraint, container segregation, and maritime compliance strictly subject to manufacturer SDS, cargo classification, carrier line acceptance, and statutory safety approvals."
      />

      {/* ========================================================================= */}
      {/* 2. REGULATORY STATUS & STATUTORY COMPLIANCE DISCLAIMER (Factual Honesty)   */}
      {/* ========================================================================= */}
      <section className="py-6 bg-[#16161A] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <ScrollReveal direction="up" delay={50}>
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center gap-4 text-xs sm:text-sm text-amber-200">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <strong className="text-white block font-mono text-xs uppercase tracking-wider">
                  Regulatory Framework &amp; Carrier Acceptance Notice:
                </strong>
                <p className="text-amber-200/90 leading-relaxed font-body text-xs sm:text-[13px]">
                  All dangerous goods operations managed by MSK Logistics are strictly operational, packaging, and securing disciplines. Every movement is conditional upon verified manufacturer Safety Data Sheets (SDS), statutory cargo classification, carrier shipping line approval, and terminal port gate-in permissions. MSK Logistics does not issue sovereign statutory DG permits or formulate chemical classifications.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FOUR CORE TECHNICAL VISUALS SHOWCASE                                    */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#0F0F12] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          <ScrollReveal direction="up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B62825]/20 border border-[#B62825]/40 text-[#B62825] text-xs font-mono font-bold tracking-wider uppercase">
                <Layers className="w-3.5 h-3.5 text-[#B62825]" />
                <span>DG OPERATIONAL CAPABILITIES &amp; SECURING</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white">
                Engineered Packaging &amp; <span className="text-[#B62825]">Container Securing</span>
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Photorealistic operational documentation of hazardous chemical packaging, intermediate bulk containers, containerized cargo segregation, and port staging across Western India gateways.
              </p>
            </div>

            <Link
              to="/request-quote?service=hazardous-cargo"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#B62825] hover:bg-[#9E2220] text-white text-xs font-mono font-bold transition-all shadow-lg shadow-[#B62825]/30 self-start md:self-auto shrink-0"
            >
              <span>Submit DG Enquiry with SDS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {HAZARDOUS_VISUALS.map((card, index) => (
              <ScrollReveal
                key={card.id}
                direction={index % 2 === 0 ? 'left' : 'right'}
                delay={(index % 2) * 100}
                className="h-full"
              >
                <div
                  className="group rounded-2xl bg-[#16161A] border border-white/10 hover:border-[#B62825] overflow-hidden shadow-2xl transition-all duration-300 flex flex-col justify-between h-full hover-lift"
                >
                  {/* Visual Area */}
                  <div 
                    className="relative aspect-[16/10] overflow-hidden bg-black cursor-pointer"
                    onClick={() => setActiveImageModal(card.image)}
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#16161A] via-transparent to-black/30 pointer-events-none" />
                    
                    {/* Category Stamp */}
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-[#B62825] text-white uppercase shadow-md">
                        {card.tag}
                      </span>
                    </div>

                    {/* Zoom indicator */}
                    <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="p-2 rounded-lg bg-black/80 text-white flex items-center gap-1.5 text-xs font-mono backdrop-blur-sm">
                        <Maximize2 className="w-3.5 h-3.5 text-red-400" />
                        <span>Enlarge View</span>
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl font-bold font-heading text-white group-hover:text-red-400 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-xs font-mono text-slate-400">
                        {card.subtitle}
                      </p>
                      <p className="text-xs sm:text-sm text-[#AEB6C2] leading-relaxed pt-1">
                        {card.description}
                      </p>
                    </div>

                    {/* Technical Specifications List */}
                    <div className="pt-4 border-t border-white/10 space-y-2">
                      <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        Technical Control Points:
                      </span>
                      <ul className="space-y-1.5">
                        {card.technicalSpecs.map((spec, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2 text-xs text-[#D9DEE5]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#B62825] shrink-0 mt-0.5" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. COMPREHENSIVE DG TERMINOLOGY REFERENCE GUIDE                           */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#0B0B0D] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          <ScrollReveal direction="up" className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono uppercase">
              <Compass className="w-3.5 h-3.5 text-[#B62825]" />
              <span>INTERNATIONAL COMPLIANCE LEXICON</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
              Essential Dangerous Goods <span className="text-[#B62825]">Terminology &amp; Standards</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-body">
              Every hazardous consignment handled through MSK Logistics is validated against international statutory standards before booking, container placement, or terminal gate-in.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. UN Number */}
            <ScrollReveal direction="up" delay={0}>
              <div className="p-6 rounded-2xl bg-[#16161A] border border-white/10 space-y-3 h-full hover-lift">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-[#B62825]/20 text-[#B62825] font-mono text-xs font-bold">UN NUMBER</span>
                  <FileCheck2 className="w-5 h-5 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-white font-heading">4-Digit UN Identifier</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  A four-digit number assigned by the United Nations Committee of Experts to identify hazardous substances (e.g., UN 1263 for Paint, UN 1993 for Flammable Liquids, UN 1805 for Phosphoric Acid). Required on all commercial and customs invoices.
                </p>
              </div>
            </ScrollReveal>

            {/* 2. Hazard Class */}
            <ScrollReveal direction="up" delay={80}>
              <div className="p-6 rounded-2xl bg-[#16161A] border border-white/10 space-y-3 h-full hover-lift">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 font-mono text-xs font-bold">HAZARD CLASS</span>
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-white font-heading">9 International Hazard Classes</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Primary and secondary classification (Classes 1 through 9) defining the chemical risk profile: gases, flammables, oxidizers, toxic agents, corrosives, and environmental hazards that dictate stowage compatibility.
                </p>
              </div>
            </ScrollReveal>

            {/* 3. Packing Group */}
            <ScrollReveal direction="up" delay={160}>
              <div className="p-6 rounded-2xl bg-[#16161A] border border-white/10 space-y-3 h-full hover-lift">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-400 font-mono text-xs font-bold">PACKING GROUP</span>
                  <Box className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white font-heading">Packing Groups (I, II, III)</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Indicates the degree of danger: <strong className="text-white">PG I</strong> = Great Danger, <strong className="text-white">PG II</strong> = Medium Danger, <strong className="text-white">PG III</strong> = Minor Danger. Determines the structural strength rating required for primary drums and containers.
                </p>
              </div>
            </ScrollReveal>

            {/* 4. Safety Data Sheet */}
            <ScrollReveal direction="up" delay={80}>
              <div className="p-6 rounded-2xl bg-[#16161A] border border-white/10 space-y-3 h-full hover-lift">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">SDS / MSDS</span>
                  <FileText className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white font-heading">16-Section Safety Data Sheet</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Manufacturer-certified 16-point technical dossier detailing Section 14 (Transport Information), flash point, emergency measures, containment procedures, and proper shipping names. Mandatory prior to quotation.
                </p>
              </div>
            </ScrollReveal>

            {/* 5. IMDG Code */}
            <ScrollReveal direction="up" delay={160}>
              <div className="p-6 rounded-2xl bg-[#16161A] border border-white/10 space-y-3 h-full hover-lift">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-400 font-mono text-xs font-bold">IMDG CODE</span>
                  <Anchor className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-lg font-bold text-white font-heading">IMO Maritime Dangerous Goods</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  International Maritime Organization (IMO) convention regulating vessel stowage, segregation matrices, container packing certificates, and marine pollutant declarations for ocean freight at JNPT and Mundra.
                </p>
              </div>
            </ScrollReveal>

            {/* 6. IATA DGR */}
            <ScrollReveal direction="up" delay={240}>
              <div className="p-6 rounded-2xl bg-[#16161A] border border-white/10 space-y-3 h-full hover-lift">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-400 font-mono text-xs font-bold">IATA DGR</span>
                  <Lock className="w-5 h-5 text-rose-400" />
                </div>
                <h3 className="text-lg font-bold text-white font-heading">Aviation Dangerous Goods Rules</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  International Air Transport Association regulations governing net quantity per package, passenger vs cargo aircraft-only (CAO) limitations, and air waybill dangerous goods declarations (DGD).
                </p>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. HAZARD CLASS OVERVIEW MATRIX                                           */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-[#121216] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          
          <ScrollReveal direction="up" className="space-y-2">
            <span className="text-xs font-mono font-bold text-[#B62825] uppercase tracking-wider">
              CARGO CLASSIFICATION MATRIX
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              Classes Commonly Coordinated for Industrial Clients
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Subject to specific carrier acceptance and port authority permissions across Nhava Sheva (JNPT) and Mundra. Note: MSK Logistics does not handle Class 1 (Explosives) or Class 7 (Radioactive) commercial freight.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {DG_CLASSES.map((dg, idx) => (
              <ScrollReveal
                key={dg.classNum}
                direction="up"
                delay={(idx % 4) * 60}
                className="h-full"
              >
                <div 
                  className={`p-5 rounded-xl bg-gradient-to-br ${dg.color} border ${dg.border} space-y-2 flex flex-col justify-between h-full hover-lift`}
                >
                  <div>
                    <span className="px-2 py-0.5 rounded bg-black/60 text-white font-mono text-xs font-bold">
                      {dg.classNum}
                    </span>
                    <h3 className="text-base font-bold text-white pt-2 font-heading">
                      {dg.name}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      {dg.desc}
                    </p>
                  </div>
                  <div className="pt-2 text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Subject to Carrier &amp; SDS Review</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. STEP-BY-STEP OPERATIONAL PROTOCOL                                      */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#0B0B0D] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold text-[#B62825] uppercase tracking-wider">
              METHODICAL EXECUTION
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white">
              The 5-Stage Dangerous Goods Securing Protocol
            </h2>
            <p className="text-sm text-slate-400">
              How MSK Logistics manages dangerous cargo packaging and securing from documentation through port gate-in.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            
            <ScrollReveal direction="up" delay={0}>
              <div className="p-5 rounded-xl bg-[#16161A] border border-white/10 space-y-2 h-full hover-lift">
                <span className="w-7 h-7 rounded-full bg-[#B62825] text-white font-mono text-xs font-bold flex items-center justify-center">1</span>
                <h3 className="text-sm font-bold text-white">SDS &amp; UN Audit</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Detailed examination of manufacturer SDS Section 14, flash point, UN number, and carrier line acceptance criteria.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={80}>
              <div className="p-5 rounded-xl bg-[#16161A] border border-white/10 space-y-2 h-full hover-lift">
                <span className="w-7 h-7 rounded-full bg-[#B62825] text-white font-mono text-xs font-bold flex items-center justify-center">2</span>
                <h3 className="text-sm font-bold text-white">UN Packaging Check</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Physical verification of UN certification codes embossed on drums, IBC totes, or outer fibreboard boxes.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={160}>
              <div className="p-5 rounded-xl bg-[#16161A] border border-white/10 space-y-2 h-full hover-lift">
                <span className="w-7 h-7 rounded-full bg-[#B62825] text-white font-mono text-xs font-bold flex items-center justify-center">3</span>
                <h3 className="text-sm font-bold text-white">Stuffing &amp; Bulkheading</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Stowage planning, segregation table compliance, heavy hardwood bulkheading, and certified anti-surge lashing.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={240}>
              <div className="p-5 rounded-xl bg-[#16161A] border border-white/10 space-y-2 h-full hover-lift">
                <span className="w-7 h-7 rounded-full bg-[#B62825] text-white font-mono text-xs font-bold flex items-center justify-center">4</span>
                <h3 className="text-sm font-bold text-white">Placarding &amp; CPC</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Application of 4-sided exterior container IMDG placards and execution of Container Packing Certificate (CPC).
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={320}>
              <div className="p-5 rounded-xl bg-[#16161A] border border-white/10 space-y-2 h-full hover-lift">
                <span className="w-7 h-7 rounded-full bg-[#B62825] text-white font-mono text-xs font-bold flex items-center justify-center">5</span>
                <h3 className="text-sm font-bold text-white">Terminal Gate-In</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Escorted haulage to port terminal hazardous staging yard within strict dangerous goods gate opening windows.
                </p>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. DUAL ACTION CTA FOR DG INQUIRIES                                       */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-[#B62825] to-[#8C1E1C] text-white">
        <ScrollReveal direction="up" className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white font-mono text-xs font-bold tracking-wider uppercase">
              TECHNICAL OPERATIONS DESK
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading tracking-tight">
              Planning a Chemical or Dangerous Goods Consignment?
            </h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed font-body">
              Contact our engineering team with your 16-point Safety Data Sheet (SDS), cargo volume, and target shipping schedule. We will review carrier feasibility and container securing requirements.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              to="/request-quote?service=hazardous-cargo"
              className="px-7 py-3.5 rounded-xl bg-white text-[#B62825] hover:bg-neutral-100 font-bold text-sm text-center shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              Request DG Quote
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-xl bg-black/40 hover:bg-black/60 text-white border border-white/30 font-medium text-sm text-center backdrop-blur-sm transition-all hover:bg-black/80"
            >
              Contact Operations Desk
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Lightbox Modal */}
      {activeImageModal && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setActiveImageModal(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/20">
            <img
              src={activeImageModal}
              alt="Hazardous Cargo View"
              className="w-full h-full object-contain max-h-[85vh]"
            />
            <button
              onClick={() => setActiveImageModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/80 text-white hover:bg-red-600 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
