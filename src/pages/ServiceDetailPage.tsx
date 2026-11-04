import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  MapPin, 
  FileText, 
  Clock, 
  PhoneCall, 
  ShieldCheck 
} from 'lucide-react';
import { CORE_SERVICES, COMPANY_DETAILS, type ServiceItem } from '../data/company';
import { BrandedImage } from '../components/common/BrandedImage';
import { InnerPageBanner } from '../components/layout/InnerPageBanner';
import { ScrollReveal } from '../components/common/ScrollReveal';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  if (slug === 'warehouse') {
    return <Navigate to="/warehouse" replace />;
  }

  // Find service by slug or fallback aliases
  let service: ServiceItem | undefined = CORE_SERVICES.find(
    s => s.slug === slug || s.id === slug
  );

  // Aliases for legacy paths
  if (!service) {
    if (slug === 'export-packaging') {
      service = CORE_SERVICES.find(s => s.id === 'cargo-lashing') || CORE_SERVICES[5];
    } else if (slug === 'cargo-lashing') {
      service = CORE_SERVICES.find(s => s.id === 'cargo-lashing') || CORE_SERVICES[5];
    } else if (slug === 'special-project-cargo-handling') {
      service = CORE_SERVICES.find(s => s.id === 'special-project') || CORE_SERVICES[4];
    }
  }

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  // Related services (other 5 services)
  const otherServices = CORE_SERVICES.filter(s => s.id !== service!.id).slice(0, 3);

  return (
    <div className="space-y-0 bg-[#FAFAFA]">
      {/* 1. Header Banner */}
      <InnerPageBanner
        breadcrumb={
          <>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#AEB6C2]" />
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#AEB6C2]" />
            <span className="text-[#B62825] font-semibold">{service.title}</span>
          </>
        }
        badge={service.tag}
        badgeSubtext="NHAVA SHEVA (JNPT) • WESTERN CORRIDOR"
        title={`${service.title} Solutions`}
        description={service.shortDescription}
        meta={
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#B62825]" />
              <span>Gateway: JNPT / Nhava Sheva Port</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#B62825]" />
              <span>Execution: 24×7 Operational Staging</span>
            </div>
          </div>
        }
      />

      {/* 2. Main Content Grid */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E2E2E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Scope & Operational Protocol */}
            <ScrollReveal direction="left" delay={50} className="lg:col-span-7 space-y-8">
              <div className="space-y-4 text-[15px] sm:text-[16px] text-[#52627A] leading-relaxed">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#B62825] text-xs font-mono font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B62825]" />
                  <span>OPERATIONAL METHODOLOGY</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1E293B] font-heading">
                  Overview &amp; Engineering Standards
                </h2>
                <p>
                  {service.fullDescription}
                </p>
                <p>
                  Every assignment at MSK Logistics is executed in accordance with strict marine safety, CFS handling, and port interchange guidelines. We align directly with container terminal gate-in windows, shipping line release orders, and vessel cut-off timelines to guarantee uninterrupted cargo movement.
                </p>
              </div>

              {/* Key Activities */}
              <div className="space-y-4 bg-[#F8FAFC] p-7 sm:p-8 rounded-2xl border border-[#E2E8F0]">
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold text-[#B62825] uppercase tracking-wider">
                    EXECUTION CHECKLIST
                  </span>
                  <h3 className="text-xl font-bold text-[#1E293B] font-heading">
                    Key Operational Activities
                  </h3>
                </div>
                <div className="space-y-3 pt-2">
                  {service.keyActivities.map((act, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-[14.5px] text-[#334155]">
                      <CheckCircle2 className="w-4 h-4 text-[#B62825] shrink-0 mt-1" />
                      <span className="leading-snug">{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scope & Logistics Protocol */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-white border border-[#E2E8F0] space-y-3 shadow-xs">
                  <h4 className="font-bold text-sm text-[#1E293B] font-heading flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#173F70]" />
                    <span>Customer Requirements</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-[#64748B]">
                    {service.customerResponsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#B62825] font-bold">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-xl bg-white border border-[#E2E8F0] space-y-3 shadow-xs">
                  <h4 className="font-bold text-sm text-[#1E293B] font-heading flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#B62825]" />
                    <span>Operational Scope</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-[#64748B]">
                    {service.operationalScope.map((scope, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#173F70] font-bold">•</span>
                        <span>{scope}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 24x7 Dispatch Banner */}
              <div className="p-5 rounded-xl bg-red-50 border border-red-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#B62825] text-white flex items-center justify-center shrink-0">
                    <PhoneCall className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-[#1E293B]">24×7 Operations Escalation Desk</h5>
                    <p className="text-xs text-[#64748B]">Emergency stuffing, gate-in urgency, and lashing crews</p>
                  </div>
                </div>
                <a
                  href={COMPANY_DETAILS.emergencyPhoneHref}
                  className="px-4 py-2 rounded-lg bg-[#B62825] text-white font-mono font-bold text-xs hover:bg-[#9E2220] transition-colors shrink-0 text-center hover:scale-105 active:scale-95"
                >
                  CALL {COMPANY_DETAILS.emergencyPhoneDisplay}
                </a>
              </div>
            </ScrollReveal>

            {/* Right Column: Branded Photography & Action Card */}
            <ScrollReveal direction="right" delay={150} className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              <div className="rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-md bg-white hover-lift">
                <BrandedImage
                  src={service.image}
                  alt={service.title}
                  aspectRatio="aspect-[16/11]"
                  imageClassName="w-full h-full object-cover"
                />
                <div className="p-4 bg-slate-900 text-white flex items-center justify-between text-xs font-mono">
                  <span>FACILITY: NHAVA SHEVA (JNPT)</span>
                  <span className="text-[#B62825] font-bold">VERIFIED DISCIPLINE</span>
                </div>
              </div>

              {/* Booking CTA Card */}
              <div className="bg-[#000000] rounded-2xl p-7 text-white space-y-4 shadow-lg border border-white/10 hover-lift">
                <span className="text-[11px] font-mono font-bold text-red-300 uppercase tracking-wider block">
                  BOOK SERVICE FOR YOUR SHIPMENT
                </span>
                <h3 className="text-xl font-bold font-heading text-white">
                  Ready to Coordinate {service.title}?
                </h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  Connect with our commercial desk for custom equipment arrangements, weight calculations, and scheduling.
                </p>
                <div className="pt-2 flex flex-col gap-2.5">
                  <Link
                    to={`/request-quote?service=${service.slug}`}
                    className="w-full py-3 px-4 rounded-xl bg-[#B62825] hover:bg-[#9E2220] text-white font-bold text-xs uppercase tracking-wider text-center transition-all inline-flex items-center justify-center gap-2 shadow-sm hover:scale-105 active:scale-95"
                  >
                    <span>Request Quotation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/contact"
                    className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs text-center transition-all border border-white/20 hover:scale-105 active:scale-95"
                  >
                    Speak with Field Coordinator
                  </Link>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Related Services Strip */}
          <div className="pt-12 border-t border-[#E2E8F0] space-y-6">
            <ScrollReveal direction="up" className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#B62825] uppercase tracking-wider">
                  COMPLETE SERVICE SUITE
                </span>
                <h3 className="text-2xl font-bold font-heading text-[#1E293B]">
                  Explore Other Logistics Disciplines
                </h3>
              </div>
              <Link to="/services" className="text-xs font-bold text-[#173F70] hover:text-[#B62825] inline-flex items-center gap-1 hover:translate-x-1 transition-transform">
                <span>View all 6 services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherServices.map((other, oIdx) => (
                <ScrollReveal
                  key={other.id}
                  direction="up"
                  delay={oIdx * 80}
                  className="h-full"
                >
                  <Link
                    to={`/services/${other.slug}`}
                    className="group bg-white p-5 rounded-xl border border-[#E2E8F0] hover:border-[#B62825]/50 hover:shadow-md transition-all space-y-3 h-full flex flex-col justify-between hover-lift"
                  >
                    <div className="space-y-3">
                      <div className="text-[11px] font-mono font-semibold text-[#B62825]">
                        {other.tag}
                      </div>
                      <h4 className="font-bold text-base text-[#1E293B] group-hover:text-[#B62825] transition-colors font-heading">
                        {other.title}
                      </h4>
                      <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                        {other.shortDescription}
                      </p>
                    </div>
                    <div className="pt-2 text-xs font-bold text-[#173F70] group-hover:text-[#B62825] inline-flex items-center gap-1">
                      <span>Learn more</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

