import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  MapPin, 
  PhoneCall, 
  Maximize2, 
  X, 
  Layers, 
  Compass, 
  Anchor,
  ExternalLink
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/company';
import { InnerPageBanner } from '../components/layout/InnerPageBanner';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';
import { ScrollReveal } from '../components/common/ScrollReveal';

interface RoadFleetPhoto {
  id: string;
  driveFilename: string;
  imagePath: string;
  title: string;
  badge: string;
  technicalTag: string;
  alt: string;
  caption: string;
  description: string;
  specifications: { label: string; value: string }[];
}

const ROAD_FLEET_RECORDS: RoadFleetPhoto[] = [
  {
    id: 'wa0018-cylindrical-haulage',
    driveFilename: 'IMG-20261022-WA0018.jpg',
    imagePath: '/images/shipments/breakbulk/breakbulk-cylindrical-haulage.jpg',
    title: 'Multi-Axle Heavy Haulage Prime Mover with Cylindrical Cargo',
    badge: 'Multi-Axle Modular Haulage',
    technicalTag: 'Multi-Axle Modular Haulage',
    alt: 'Heavy haulage multi-axle prime mover transporting oversized cylindrical pressure vessel under crane hook at port terminal',
    caption: 'Heavy haulage prime mover transporting oversized cylindrical unit under quayside crane boom at Nhava Sheva (JNPT)',
    description: 'Turnkey road movement of an over-dimensional cylindrical pressure vessel on a multi-axle heavy haulage trailer bed. Positioned directly under the mobile crane hook for tandem hoisting onto ocean transport platforms. Synchronized with terminal gate-in windows to avoid demurrage.',
    specifications: [
      { label: 'Vehicle Configuration', value: 'Multi-Axle Prime Mover + Modular Bed' },
      { label: 'Cargo Profile', value: 'Over-Dimensional Cylindrical Vessel' },
      { label: 'Restraint System', value: 'High-Tensile Wire Slings & Saddles' },
      { label: 'Corridor', value: 'Fabrication Plant to JNPT Terminal' }
    ]
  },
  {
    id: 'wa0006-lowbed-machinery',
    driveFilename: 'IMG-20261022-WA0006.jpg',
    imagePath: '/images/shipments/breakbulk/breakbulk-lowbed-machinery-lashing.jpg',
    title: 'Low-Bed Trailer Machinery Transport & Heavy Ratchet Lashing',
    badge: 'Low-Bed Industrial Haulage',
    technicalTag: 'Low-Bed Heavy Machinery',
    alt: 'Heavy industrial machinery secured with heavy-duty ratchet binders and timber spreaders on low-bed trailer',
    caption: 'Heavy skidded industrial machinery secured with ratchet binders on low-bed trailer at container terminal staging area',
    description: 'Multi-axle low-bed trailer haulage engineered for ultra-heavy, high-center-of-gravity industrial machinery. Features certified timber floor spreaders to distribute point loads and Grade 80 chain turnbuckles combined with 5-ton ratchet binders anchored directly into chassis points.',
    specifications: [
      { label: 'Trailer Profile', value: 'Heavy-Duty Drop-Deck Low-Bed' },
      { label: 'Floor Engineering', value: 'Hardwood Dunnage Point-Load Spreaders' },
      { label: 'Tie-Down Rating', value: '5-Ton Ratchet Straps + Grade 80 Chains' },
      { label: 'Staging Facility', value: 'Port Container Staging Yard' }
    ]
  },
  {
    id: 'wa0007-heavy-rigging',
    driveFilename: 'IMG-20261022-WA0007.jpg',
    imagePath: '/images/shipments/breakbulk/breakbulk-heavy-rigging-trailer.jpg',
    title: 'Project Cargo Rigging & Highway Transport Assembly',
    badge: 'Project Rigging & Staging',
    technicalTag: 'Project Cargo Trailer Rigging',
    alt: 'Heavy project cargo secured on trailer alongside logistics prime mover at JNPT port yard',
    caption: 'Project cargo trailer with prime mover and perimeter container stacks during export clearance staging',
    description: 'Complete project cargo road haulage setup with prime mover connection, corner edge protectors, and specialized tie-down rigging. The consignment is pre-staged in port perimeter buffer yards ahead of vessel berthing tides.',
    specifications: [
      { label: 'Prime Mover', value: 'Heavy Industrial Tractor Unit' },
      { label: 'Edge Protection', value: 'Steel Reinforced Corner Saddles' },
      { label: 'Transit Protocol', value: 'Highway Clearance & Escort Aligned' },
      { label: 'Terminal Gateway', value: 'Nhava Sheva (JNPT) / Mundra' }
    ]
  },
  {
    id: 'wa0008-chassis-lashing',
    driveFilename: 'IMG-20261022-WA0008.jpg',
    imagePath: '/images/operations/cargo-lashing/trailer-chassis-ratchet-lashing.jpg',
    title: 'Trailer Chassis Ratchet Securing & Stake Pocket Anchoring',
    badge: 'Trailer Chassis Ratchet Securing',
    technicalTag: 'Chassis Tie-Down Engineering',
    alt: 'Multi-axle trailer chassis ratchet lashing and stake pocket direct tie-downs',
    caption: 'Multi-axle trailer chassis tie-downs with protective corner sleeves for rough road and highway transit',
    description: 'Detailed inspection view of chassis-level securing. High-tensile polyester webbing straps are hooked directly into forged chassis stake pockets with heavy-duty ratchet tensioners to eliminate lateral swaying and vibration loosening on Indian highway corridors.',
    specifications: [
      { label: 'Anchor Method', value: 'Forged Stake Pocket Direct Hooks' },
      { label: 'Strap Material', value: 'High-Tensile 50mm Polyester Webbing' },
      { label: 'Safety Factor', value: '2:1 Certified Highway Dynamic Margin' },
      { label: 'Inspection Protocol', value: 'Every 100 km Highway Restraint Audit' }
    ]
  }
];

export const RoadTransportPage: React.FC = () => {
  const [activeLightbox, setActiveLightbox] = useState<RoadFleetPhoto | null>(null);

  return (
    <div className="space-y-0 bg-[#FFFFFF] text-[#1E293B] overflow-x-hidden">
      {/* 1. Header Banner with Breadcrumbs */}
      <InnerPageBanner
        breadcrumb={
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Services', to: '/services', hasDropdown: true },
              { label: 'Road Transport & Heavy Fleet', isCurrent: true },
            ]}
          />
        }
        badge="HEAVY ROAD HAULAGE & FLEET LOGISTICS"
        badgeSubtext="FACTORY-TO-PORT HIGHWAY CORRIDORS • NHAVA SHEVA (JNPT) & MUNDRA"
        title="Road Transport & Heavy Haulage Fleet"
        description="Multi-axle hydraulic modular trailers, low-bed haulage, and factory-to-port heavy cargo transport connecting industrial manufacturing centers directly to Western India's maritime gateways."
      />

      {/* 2. Operational Overview & Key Capabilities */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content */}
            <ScrollReveal direction="left" delay={50} className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#B62825] border border-red-200 text-xs font-mono font-bold uppercase tracking-wider">
                  <Truck className="w-3.5 h-3.5 text-[#B62825]" />
                  <span>END-TO-END ROAD CONNECTIVITY</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#1E293B] tracking-tight">
                  Dedicated Heavy Road Haulage for Export &amp; Import Consignments
                </h2>
                <div className="w-16 h-1 bg-[#B62825]" />
              </div>

              <div className="space-y-4 text-base text-[#475569] leading-relaxed font-body">
                <p>
                  Maritime export shipments begin long before cargo reaches the container terminal quayside. <strong>MSK Logistics</strong> coordinates dedicated road haulage, heavy multi-axle trailer movements, and low-bed machinery transport bridging industrial manufacturing hubs across <strong>Panipat, Delhi NCR, Gujarat, Maharashtra, Pune, and Nashik</strong> directly to <strong>Nhava Sheva (JNPT) and Mundra port terminals</strong>.
                </p>
                <p>
                  Whether transporting standard ISO container boxes, loaded high cube containers, or massive Over-Dimensional Cargo (ODC) pressure vessels, our fleet logistics are engineered around strict axle load compliance, route survey validation, bridge clearance assessments, and synchronized port gate-in schedules.
                </p>
                <p>
                  To prevent terminal congestion penalties and container detention, MSK maintains active <strong>"Loaded on Wheels"</strong> holding services and container buffer yards in the Conex CFS corridor, guaranteeing immediate readiness when carrier gate-in windows open.
                </p>
              </div>

              {/* Verified Capability Badges */}
              <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#334155] font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B62825]" />
                  Multi-Axle Hydraulic Pullers
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#334155] font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B62825]" />
                  Drop-Deck Low-Bed Trailers
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#334155] font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B62825]" />
                  Route Feasibility &amp; Escorts
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#334155] font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B62825]" />
                  Loaded on Wheels Buffer
                </span>
              </div>
            </ScrollReveal>

            {/* Right Summary Card */}
            <ScrollReveal direction="right" delay={150} className="lg:col-span-5 bg-[#F8FAFC] p-7 sm:p-8 rounded-2xl border border-[#E2E8F0] space-y-6 shadow-sm hover-lift">
              <div className="space-y-2 pb-4 border-b border-[#E2E8F0]">
                <span className="text-xs font-mono font-bold text-[#B62825] uppercase tracking-wider block">
                  FLEET SPECIFICATIONS &amp; DISPATCH
                </span>
                <h3 className="text-xl font-bold font-heading text-[#1E293B]">
                  Road Transport Capabilities
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white border border-[#E2E8F0] text-[#B62825] shrink-0 mt-0.5">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1E293B]">Multi-Axle Modular Lines</h4>
                    <p className="text-[#64748B] text-xs leading-relaxed mt-0.5">
                      Hydraulic axle lines capable of handling non-standard payloads from 20 tons to 250+ tons with compensated load balancing.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white border border-[#E2E8F0] text-[#B62825] shrink-0 mt-0.5">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1E293B]">Low-Bed &amp; Semi-Low Bed Trailers</h4>
                    <p className="text-[#64748B] text-xs leading-relaxed mt-0.5">
                      Depressed deck beds designed for over-height machinery, power transformers, heavy excavators, and cylindrical tanks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white border border-[#E2E8F0] text-[#B62825] shrink-0 mt-0.5">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1E293B]">Route Survey &amp; Clearance Protocol</h4>
                    <p className="text-[#64748B] text-xs leading-relaxed mt-0.5">
                      Physical route clearance surveys, toll plaza height assessments, civil engineering clearances, and pilot vehicle escorts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white border border-[#E2E8F0] text-[#B62825] shrink-0 mt-0.5">
                    <Anchor className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1E293B]">Port Terminal Coordination</h4>
                    <p className="text-[#64748B] text-xs leading-relaxed mt-0.5">
                      Direct coordination with JNPT (INNSA) and Mundra port container terminal gates for timely trailer turnaround.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct 24/7 Action */}
              <div className="p-4 rounded-xl bg-neutral-900 text-white space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-red-400 font-bold uppercase">24×7 Road Fleet Desk</span>
                  <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold">EMERGENCY</span>
                </div>
                <a
                  href={`tel:${COMPANY_DETAILS.emergencyPhone}`}
                  className="text-lg font-bold font-mono text-white hover:text-red-400 transition-colors flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-red-500" />
                  <span>{COMPANY_DETAILS.emergencyPhoneDisplay}</span>
                </a>
                <p className="text-[11px] text-slate-400">
                  Immediate dispatch, vehicle breakdown response, and highway pilot escort support.
                </p>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* 3. Authentic MSK Road Fleet Gallery Showcase */}
      <section className="py-16 sm:py-24 bg-[#0B0B0D] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          {/* Section Header */}
          <ScrollReveal direction="up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B62825]/20 border border-[#B62825]/40 text-[#B62825] text-xs font-mono font-bold tracking-wider uppercase">
                <Truck className="w-3.5 h-3.5 text-[#B62825]" />
                <span>HEAVY HAULAGE OPERATIONS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight">
                Our Road Fleet in <span className="text-[#B62825]">Action</span>
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Field photographs of heavy road transport operations executed by MSK Logistics. Highlighting multi-axle prime movers, low-bed heavy equipment tie-downs, quayside crane hook staging, and certified chassis ratchet lashing.
              </p>
            </div>

            <Link
              to="/request-quote?service=road-transport"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#B62825] hover:bg-[#9E2220] text-white text-xs font-mono font-bold transition-all shadow-md self-start md:self-auto shrink-0 hover:scale-105 active:scale-95"
            >
              <span>Request Road Haulage Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>

          {/* 4 Road Fleet Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ROAD_FLEET_RECORDS.map((item, index) => (
              <ScrollReveal
                key={item.id}
                direction="up"
                delay={index * 80}
                className="h-full"
              >
                <div
                  onClick={() => setActiveLightbox(item)}
                  className="group cursor-pointer rounded-2xl bg-[#141418] border border-white/10 hover:border-[#B62825] overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between h-full hover-lift"
                >
                  {/* Image Section */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black">
                    <img
                      src={item.imagePath}
                      alt={item.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-black/30 pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-[#B62825] text-white uppercase shadow-md">
                        MSK FLEET OPERATION
                      </span>
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-black/80 text-neutral-300 border border-white/20 uppercase backdrop-blur-sm">
                        {item.technicalTag}
                      </span>
                    </div>

                    {/* Zoom Indicator */}
                    <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="p-2 rounded-lg bg-black/80 text-white flex items-center gap-1.5 text-xs font-mono backdrop-blur-sm">
                        <Maximize2 className="w-3.5 h-3.5 text-red-400" />
                        <span>Enlarge Photo</span>
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 sm:p-7 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#B62825] font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{item.technicalTag}</span>
                    </div>

                    <h3 className="text-xl font-bold font-heading text-white group-hover:text-red-400 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                      {item.description}
                    </p>

                    {/* Specifications Table */}
                    <div className="pt-3 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                      {item.specifications.map((spec, sIdx) => (
                        <div key={sIdx} className="p-2 rounded-lg bg-white/[0.03] border border-white/5">
                          <span className="text-[#64748B] block text-[10px] uppercase">{spec.label}</span>
                          <span className="text-neutral-200 font-bold truncate block">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Zero AI Guarantee Note */}
          <ScrollReveal direction="up" delay={100} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#94A3B8]">
            <div className="space-y-1">
              <strong className="text-white block font-mono uppercase text-xs">
                Zero AI Hallucination Standard:
              </strong>
              <p className="leading-relaxed">
                All road fleet and heavy transport photographs displayed above are 100% genuine operational records executed by MSK Logistics connecting Indian industrial corridors to Nhava Sheva (JNPT) and Mundra port terminals. We do not use simulated or generic transport stock photos.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0 font-mono text-emerald-400 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Verified Fleet Documentation</span>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* 4. Strategic Transit Corridors & Buffer Operations */}
      <section className="py-16 sm:py-20 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto space-y-3">
            <span className="editorial-badge bg-black text-white border-white/20">
              CONNECTIVITY &amp; CORRIDORS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#1E293B]">
              Key Industrial Transit Corridors
            </h2>
            <p className="text-[#64748B] text-sm sm:text-base leading-relaxed">
              Fast, direct highway haulage engineered for time-critical maritime vessel departure tides.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal direction="up" delay={50} className="h-full">
              <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-3 h-full hover-lift">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#B62825] flex items-center justify-center font-bold font-mono">
                  01
                </div>
                <h3 className="text-lg font-bold text-[#1E293B]">Northern Export Corridor</h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Regular container and ODC haulage connecting <strong>Panipat, Delhi NCR, Haryana, and Rajasthan</strong> manufacturing hubs to Western ports via the Western Dedicated Freight &amp; Expressway networks.
                </p>
                <div className="pt-2 text-xs font-mono text-[#B62825] font-semibold">
                  Transit: 36 – 48 Hours to JNPT Gate
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={150} className="h-full">
              <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-3 h-full hover-lift">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#B62825] flex items-center justify-center font-bold font-mono">
                  02
                </div>
                <h3 className="text-lg font-bold text-[#1E293B]">Western Manufacturing Belt</h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Direct heavy machinery movement across <strong>Gujarat (Ahmedabad, Vadodara, Surat, Hazira)</strong> connecting into both Mundra and Nhava Sheva maritime container facilities.
                </p>
                <div className="pt-2 text-xs font-mono text-[#B62825] font-semibold">
                  Transit: 18 – 24 Hours to JNPT Gate
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={250} className="h-full">
              <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-3 h-full hover-lift">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#B62825] flex items-center justify-center font-bold font-mono">
                  03
                </div>
                <h3 className="text-lg font-bold text-[#1E293B]">Maharashtra Industrial Hubs</h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Same-day and next-day shuttle services connecting <strong>Pune (Chakan, Bhosari, Talegaon), Nashik, Aurangabad, and Mumbai</strong> industrial zones directly into JNPT CFS buffer yards.
                </p>
                <div className="pt-2 text-xs font-mono text-[#B62825] font-semibold">
                  Transit: 4 – 12 Hours to JNPT Gate
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Buffer Services Callout */}
          <ScrollReveal direction="up" delay={100} className="p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#B62825] font-bold uppercase">
                <ShieldCheck className="w-4 h-4 text-[#B62825]" />
                <span>LOADED ON WHEELS &amp; BUFFER STAGING</span>
              </div>
              <h3 className="text-xl font-bold font-heading text-[#1E293B]">
                Need Pre-Port Staging Before Gate-In Opens?
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Port terminal gates typically open only 4 to 5 days prior to vessel arrival. MSK provides dedicated trailer holding and open hardstanding buffer services at our Conex CFS facility, keeping your cargo secure and mobile until the exact gate-in hour.
              </p>
            </div>
            <Link
              to="/warehouse"
              className="btn-secondary text-xs sm:text-sm py-2.5 px-5 shrink-0 hover:scale-105 active:scale-95"
            >
              <span>Explore Warehouse &amp; Yard Facilities</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </ScrollReveal>

        </div>
      </section>

      {/* 5. Contact & Quote CTA */}
      <section className="py-16 sm:py-20 pb-28 sm:pb-24 bg-white">
        <ScrollReveal direction="up" className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-2xl">
            <div className="space-y-3 max-w-2xl">
              <span className="editorial-badge bg-white/10 text-white border-white/20">
                DIRECT OPERATIONAL DESK
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading">
                Book Road Transport or Inquire for Heavy ODC Movement
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Connect directly with our transport dispatchers at CBD Belapur and Nhava Sheva. Accurate transit calculations, trailer availability, and transparent quote turnaround.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  Balaji Bhawan, CBD Belapur, Navi Mumbai
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  JNPT Township Colony, Sector - 3
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
              <Link
                to="/request-quote?service=road-transport"
                className="btn-primary text-sm py-3 px-6 text-center hover:scale-105 active:scale-95"
              >
                <span>Request Transport Quote</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <a
                href={`tel:${COMPANY_DETAILS.emergencyPhone}`}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-mono font-bold transition-all border border-white/20 text-center flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
              >
                <PhoneCall className="w-4 h-4 text-red-400" />
                <span>Call 24×7 Desk</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 6. Accessible Lightbox Modal (BUG 15: Open enlarged fleet images from top with dedicated new tab option) */}
      {activeLightbox && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-md p-4 sm:p-6 md:p-8 flex flex-col items-center justify-start animate-in fade-in duration-200"
          onClick={() => setActiveLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Road Fleet Image Viewer"
        >
          <div
            className="relative max-w-5xl w-full flex flex-col items-stretch my-auto sm:my-4 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="w-full flex items-center justify-between py-2 px-1 text-white text-xs font-mono">
              <div className="flex items-center gap-2 truncate pr-4">
                <span className="font-bold text-neutral-200">{activeLightbox.title}</span>
                <span className="text-neutral-500">•</span>
                <span className="text-red-400 font-semibold">{activeLightbox.technicalTag}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={activeLightbox.imagePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#B62825] hover:bg-[#9E2220] text-white text-xs font-mono font-bold transition-all shadow-md cursor-pointer"
                  title="Open full-size image in new browser tab"
                >
                  <span>Open in New Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setActiveLightbox(null)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-red-600 text-white transition-colors cursor-pointer"
                  aria-label="Close image viewer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Box */}
            <div className="relative w-full flex items-center justify-center overflow-hidden rounded-xl bg-black border border-white/15">
              <img
                src={activeLightbox.imagePath}
                alt={activeLightbox.alt}
                className="w-full max-h-[78vh] object-contain cursor-zoom-in"
                onClick={() => window.open(activeLightbox.imagePath, '_blank', 'noopener,noreferrer')}
                title="Click image to open in new tab"
              />
            </div>

            {/* Modal Caption */}
            <div className="w-full p-4 rounded-lg bg-neutral-900/90 border border-white/10 text-xs text-neutral-300 font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="leading-relaxed flex-1">{activeLightbox.caption}</p>
              <span className="text-[11px] text-slate-400 shrink-0">
                Click image or button above to inspect full 4K resolution in new tab
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

