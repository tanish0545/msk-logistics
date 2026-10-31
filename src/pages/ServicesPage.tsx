import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, Anchor, ShieldCheck } from 'lucide-react';
import { CORE_SERVICES } from '../data/company';
import { ServiceCard } from '../components/services/ServiceCard';
import { CartingTreeDiagram } from '../components/services/CartingTreeDiagram';
import { InnerPageBanner } from '../components/layout/InnerPageBanner';

export const ServicesPage: React.FC = () => {
  return (
    <div className="space-y-0">
      {/* Services Banner */}
      <InnerPageBanner
        badge="SERVICE DIRECTORY"
        badgeSubtext="NHAVA SHEVA (JNPT) EXPORT DISCIPLINES"
        title="Export Packaging, Container Stuffing & Cargo Lashing"
        description="Engineered cargo preparation services designed to ensure structural integrity and maritime transport safety."
      />

      {/* Services Grid */}
      <section className="py-20 bg-white border-b border-[#E2E2E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CORE_SERVICES.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>

          {/* Integration Overview */}
          <div className="p-8 sm:p-10 rounded-xl bg-[#F5F5F3] border border-[#E2E2E2] space-y-6">
            <div className="max-w-3xl space-y-3">
              <span className="editorial-badge bg-white text-[#B62825] border-red-200">
                INTEGRATED EXECUTION
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#343434] font-heading">
                How Our Three Services Function Together
              </h2>
              <p className="text-[15px] text-[#666666] leading-relaxed">
                Export packaging, container stuffing, and cargo securing are not independent silos—they are sequential layers of the same protective barrier. Effective securing requires proper packaging anchor points, while efficient stuffing depends on accurate crating dimensions. MSK Logistics coordinates all three stages under one continuous operational plan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#E2E2E2]">
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#343434] text-[15px]">
                  <Box className="w-4 h-4 text-[#B62825]" />
                  <span>1. Protective Barrier</span>
                </div>
                <p className="text-[13px] text-[#666666]">
                  Goods are crated, moisture-wrapped, or palletized to prevent physical abrasion and atmospheric damage.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#343434] text-[15px]">
                  <Anchor className="w-4 h-4 text-[#B62825]" />
                  <span>2. Structural Positioning</span>
                </div>
                <p className="text-[13px] text-[#666666]">
                  Cargos are positioned to balance container axle weights and optimize cubic space without crushing hazards.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#343434] text-[15px]">
                  <ShieldCheck className="w-4 h-4 text-[#B62825]" />
                  <span>3. Dynamic Restraint</span>
                </div>
                <p className="text-[13px] text-[#666666]">
                  High-tensile straps, chains, and timber chocks anchor the load against heavy sea acceleration and pitch.
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <Link to="/export-packing-solutions" className="btn-primary text-[14px]">
                <span>Explore Two Service Arrangements</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <Link to="/request-quote" className="btn-secondary text-[14px]">
                <span>Request a Quote for Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Carting Section: Operational Relationship Tree (Point 03) */}
      <section className="py-20 bg-[#F5F5F3] border-b border-[#E2E2E2]" id="carting">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="editorial-badge bg-white text-[#B62825] border-red-200">
              OPERATIONAL STRUCTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#343434] font-heading tracking-tight">
              Carting Hierarchy &amp; Facility Network
            </h2>
            <p className="text-[15px] sm:text-base text-[#666666] leading-relaxed">
              Clear organizational hierarchy illustrating the relationship between Carting operations and our three associated facility companies at Nhava Sheva.
            </p>
          </div>

          {/* Interactive Tree Diagram */}
          <CartingTreeDiagram />
        </div>
      </section>
    </div>
  );
};
