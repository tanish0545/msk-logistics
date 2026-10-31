import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, CheckCircle2 } from 'lucide-react';
import { BrandedImage } from '../components/common/BrandedImage';
import { InnerPageBanner } from '../components/layout/InnerPageBanner';

export const StaffPage: React.FC = () => {
  return (
    <div className="space-y-0 bg-[#FBFBFC]">
      {/* 1. Header Banner */}
      <InnerPageBanner
        badge="OUR TEAM"
        badgeSubtext="OPERATIONAL EXCELLENCE & PROFESSIONAL DISCIPLINE"
        title="Our People, Our Strength"
        description="Our people are skilled and professional in their work, playing an important role in delivering services and solutions to our clients. We strive to remain responsive to changing market conditions and evolving client requirements."
      />

      {/* 2. Main Content */}
      <section className="py-14 sm:py-20 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          
          {/* Authentic Team Visual Composition */}
          <div className="max-w-lg lg:max-w-xl mx-auto w-full rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-md bg-[#16171C]">
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#0B0B0D]">
              <BrandedImage 
                src="/images/team/msk-logistics-team.webp" 
                alt="MSK Logistics On-Site Field Rigging and Packing Team"
                aspectRatio="aspect-[3/4]"
                className="w-full h-full"
                imageClassName="w-full h-full !object-contain object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/90 via-[#0B0B0D]/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-16 z-10 text-white space-y-1">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#34343A]/80 backdrop-blur-md text-[11px] font-mono-code text-[#D9DEE5] border border-[#D9DEE5]/20">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  <span>ON-SITE OPERATIONS TEAM</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                  Field Rigging &amp; Securing Specialists
                </h3>
              </div>
            </div>
            <div className="p-4 sm:p-5 bg-[#0B0B0D] text-[#AEB6C2] text-[12px] font-mono-code flex flex-wrap items-center justify-between gap-3 border-t border-[#34343A]/60">
              <span>OPERATIONAL FOCUS: EXPORT PACKAGING • CONTAINER STUFFING • CARGO SECURING</span>
              <span className="text-[#B62825] font-bold">ESTABLISHED MAY 2019</span>
            </div>
          </div>

          {/* Core Philosophy & Leadership Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: Professional Philosophy */}
            <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#B62825] text-xs font-mono font-semibold">
                  <Award className="w-3.5 h-3.5" />
                  <span>WORKFORCE PHILOSOPHY</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1E293B] font-heading">
                  Skilled Execution in Dynamic Port Environments
                </h2>
                <p className="text-[15px] sm:text-base text-[#475569] leading-relaxed font-body">
                  Our people are skilled and professional in their work, playing an important role in delivering services and solutions to our clients. We strive to remain responsive to changing market conditions and evolving client requirements.
                </p>
                <p className="text-[14px] text-[#64748B] leading-relaxed font-body">
                  Every packing assignment, heavy lashing project, and container stuffing operation requires rigorous on-site coordination. Our teams adhere to strict safety protocols, schedule discipline, and certified handling procedures across CFS hubs and client factory premises.
                </p>
              </div>

              <div className="pt-4 border-t border-[#F1F5F9] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-[#64748B]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B62825] shrink-0" />
                  <span>Certified Lashing Standards</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B62825] shrink-0" />
                  <span>Schedule Punctuality</span>
                </div>
              </div>
            </div>

            {/* Right: Leadership Anchor */}
            <div className="lg:col-span-5 p-8 sm:p-10 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="editorial-badge bg-[#F8FAFC] text-[#173F70] border-neutral-300">
                  LEADERSHIP
                </span>
                <h3 className="text-2xl font-bold text-[#1E293B] font-heading">
                  Sunil Naresh Kadu
                </h3>
                <div className="text-[13px] font-mono font-bold text-[#B62825] uppercase tracking-wider">
                  Proprietor
                </div>
                <p className="text-[14px] text-[#64748B] leading-relaxed font-body pt-2">
                  Founded MSK Logistics Solution in May 2019 with a focus on reliable cargo handling, container stuffing, and maritime lashing across Nhava Sheva. Under his stewardship, the company maintains strong client relationships, customized protection standards, and schedule adherence.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-mono text-[#475569] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[#94A3B8]">FOUNDED:</span>
                  <span className="font-bold text-[#1E293B]">May 2019</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#94A3B8]">LOCATION:</span>
                  <span className="font-bold text-[#1E293B]">Navi Mumbai, India</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#94A3B8]">OPERATING HUBS:</span>
                  <span className="font-bold text-[#1E293B]">JNPT &amp; CBD Belapur</span>
                </div>
              </div>
            </div>

          </div>

          {/* Action Callout */}
          <div className="bg-[#173F70] rounded-2xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-1.5">
              <h3 className="text-2xl font-bold font-heading">
                Need Skilled Logistics Support On-Site?
              </h3>
              <p className="text-blue-100 text-sm max-w-xl font-body">
                Our certified crews are ready to deploy for export crating, container stuffing, and heavy cargo lashing.
              </p>
            </div>
            <Link
              to="/request-quote"
              className="bg-[#B62825] hover:bg-[#9E2220] text-white font-bold py-3.5 px-6 rounded-xl inline-flex items-center gap-2 shadow-lg transition-all flex-shrink-0"
            >
              <span>Connect With Our Team</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
};
