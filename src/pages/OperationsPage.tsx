import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plane, Box, Anchor, FileCheck, Maximize2, Headphones } from 'lucide-react';
import { BrandedImage } from '../components/gallery/BrandedImage';
import { InnerPageBanner } from '../components/layout/InnerPageBanner';

export interface PrincipalActivity {
  id: number;
  title: string;
  originalPoint: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

export const PRINCIPAL_ACTIVITIES: PrincipalActivity[] = [
  {
    id: 1,
    title: 'Export, Import & Air Cargo Handling',
    originalPoint: 'Cargo handling of Export Import & Air Cargo',
    description: 'Multimodal freight handling, CFS transfers, and staging coordination for containerized ocean exports, imports, and time-critical air cargo consignments.',
    icon: Plane,
    tag: 'ACTIVITY 01',
  },
  {
    id: 2,
    title: 'Industrial Packing Material & Palletisation',
    originalPoint: 'Packing Material (Palletisation)',
    description: 'Custom palletisation using Euro and standard wooden pallets, heat-treated (ISPM-15) materials, barrier foil wrapping, and tailored packaging supplies.',
    icon: Box,
    tag: 'ACTIVITY 02',
  },
  {
    id: 3,
    title: 'Marine Lashing & Timber Chocking',
    originalPoint: 'Lashing & Chocking',
    description: 'Heavy ratchet tie-downs, high-tensile steel wire securing, and custom hardwood chocking engineered to withstand rough ocean roll, pitch, and transit forces.',
    icon: Anchor,
    tag: 'ACTIVITY 03',
  },
  {
    id: 4,
    title: 'Customs Clearance for EXIM & SEZ Goods',
    originalPoint: 'Custom Clearance of Export Import & SEZ Goods',
    description: 'End-to-end procedural support, export-import documentation compliance, and seamless clearance processing for standard commercial and SEZ consignments.',
    icon: FileCheck,
    tag: 'ACTIVITY 04',
  },
  {
    id: 5,
    title: 'Project & Over-Dimensional Cargo (ODC) Specialist',
    originalPoint: 'Specialist in Project (ODC) handling from N/Sheva and Mundra',
    description: 'Specialized heavy rigging, flat rack stuffing, and maritime securing for oversized industrial machinery and ODC movements via Nhava Sheva (JNPT) and Mundra ports.',
    icon: Maximize2,
    tag: 'ACTIVITY 05',
  },
  {
    id: 6,
    title: 'Dedicated Client & Field Support Services',
    originalPoint: 'Other Client Services',
    description: 'Mobile on-site stuffing assistance, emergency field securing, dedicated logistics manpower deployment, and customized cargo protection solutions.',
    icon: Headphones,
    tag: 'ACTIVITY 06',
  },
];

export const OperationsPage: React.FC = () => {
  return (
    <div className="space-y-0 bg-[#FBFBFC]">
      {/* 1. Page Header */}
      <InnerPageBanner
        badge="OPERATIONAL EXCELLENCE"
        badgeSubtext="NHAVA SHEVA (JNPT) & MUNDRA PORT CORRIDORS"
        title="MSK Operational Capabilities"
        description="Direct on-site execution at Nhava Sheva (JNPT), Mundra, and industrial client premises. Precision export packaging, container stuffing, project cargo rigging, and maritime cargo securing."
      />

      {/* 2. Principal Activities Section (Replaces Crossed-Out Cards & 6-Step Protocol) */}
      <section className="py-14 sm:py-20 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          {/* Section Header */}
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#B62825] text-xs font-mono font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B62825]" />
              <span>CORE OPERATIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-[#1E293B] tracking-tight">
              Principal Activities
            </h2>
            <p className="text-[15px] sm:text-base text-[#64748B] font-body leading-relaxed">
              Verified operational services delivered across container freight stations, industrial manufacturing plants, and primary western shipping gateways.
            </p>
          </div>

          {/* 6 Principal Activities Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {PRINCIPAL_ACTIVITIES.map((activity) => {
              const Icon = activity.icon;
              return (
                <div
                  key={activity.id}
                  className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#B62825] shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 space-y-5"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] group-hover:bg-red-50 text-[#173F70] group-hover:text-[#B62825] flex items-center justify-center border border-[#E2E8F0] group-hover:border-red-200 transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono font-bold tracking-wider text-[#94A3B8] group-hover:text-[#B62825] uppercase transition-colors">
                        {activity.tag}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg sm:text-xl font-bold font-heading text-[#1E293B] group-hover:text-[#B62825] transition-colors leading-snug">
                        {activity.title}
                      </h3>
                      <p className="text-[14px] text-[#64748B] leading-relaxed font-body">
                        {activity.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#F1F5F9] text-[11.5px] font-mono text-[#94A3B8]">
                    <span className="font-semibold text-[#173F70]">Profile Scope:</span> {activity.originalPoint}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 3. Operational Photography Grid (PRESERVED FIELD DOCUMENTS) */}
          <div className="space-y-6 pt-6 border-t border-[#E2E8F0]">
            <div className="space-y-2">
              <span className="editorial-badge bg-[#F8FAFC] text-[#173F70] border-neutral-300">
                FIELD DOCUMENTATION
              </span>
              <h3 className="text-2xl font-bold text-[#173F70] font-heading">
                Field Documentation &amp; Quayside Operations
              </h3>
              <p className="text-sm text-[#64748B]">
                Photographs from operational assignments at JNPT terminals and packing sheds.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="rounded-xl overflow-hidden border border-[#E2E8F0] bg-white group shadow-xs">
                <BrandedImage
                  src="/images/operations/container-loading/rigging-crew-crane-loading.jpg"
                  alt="MSK Logistics rigging operations on container vessel"
                  aspectRatio="aspect-[16/11]"
                />
                <div className="p-3.5 bg-white">
                  <h5 className="font-bold text-xs text-[#1E293B] truncate">Quayside Crane Handling</h5>
                  <p className="text-[11px] text-[#64748B] font-mono truncate">Flat Rack Loading &amp; Guidance</p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-[#E2E8F0] bg-white group shadow-xs">
                <BrandedImage
                  src="/images/operations/warehouse/shaded-warehouse-main-bay.jpg"
                  alt="Shaded warehouse export packaging bays"
                  aspectRatio="aspect-[16/11]"
                />
                <div className="p-3.5 bg-white">
                  <h5 className="font-bold text-xs text-[#1E293B] truncate">Shaded Packing Shed</h5>
                  <p className="text-[11px] text-[#64748B] font-mono truncate">Covered Cargo Staging Bays</p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-[#E2E8F0] bg-white group shadow-xs">
                <BrandedImage
                  src="/images/operations/cargo-lashing/trailer-chassis-ratchet-lashing.jpg"
                  alt="Heavy cargo ratchet lashing on trailer chassis"
                  aspectRatio="aspect-[16/11]"
                />
                <div className="p-3.5 bg-white">
                  <h5 className="font-bold text-xs text-[#1E293B] truncate">Chassis Ratchet Lashing</h5>
                  <p className="text-[11px] text-[#64748B] font-mono truncate">High-Tensile Webbing &amp; Chocking</p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-[#E2E8F0] bg-white group shadow-xs">
                <BrandedImage
                  src="/images/operations/office/msk-jnpt-office-signboard.jpg"
                  alt="Official MSK Logistic Solution JNPT Navi Mumbai office"
                  aspectRatio="aspect-[16/11]"
                />
                <div className="p-3.5 bg-white">
                  <h5 className="font-bold text-xs text-[#1E293B] truncate">Navi Mumbai Office</h5>
                  <p className="text-[11px] text-[#64748B] font-mono truncate">JNPT Township • Registered Desk</p>
                </div>
              </div>
            </div>
          </div>

          {/* 4. CTA Banner */}
          <div className="bg-[#173F70] rounded-2xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-heading">
                Book an Operations Team for On-Site Packing
              </h3>
              <p className="text-blue-100 text-sm max-w-xl">
                Our mobile rigging and packing crews deploy across Navi Mumbai, Taloja, Rabale, Mahape, and JNPT port areas.
              </p>
            </div>
            <Link
              to="/request-quote"
              className="bg-[#B62825] hover:bg-[#9E2220] text-white font-bold py-3.5 px-6 rounded-xl inline-flex items-center gap-2 shadow-lg transition-all flex-shrink-0"
            >
              <span>Schedule Operational Team</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
};
