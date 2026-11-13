import React from 'react';
import { Users, ShieldCheck, Workflow } from 'lucide-react';
import { ScrollReveal } from '../common/ScrollReveal';
import { MskButton } from '../common/MskButton';

export const HomeTeamPreview: React.FC = () => {
  return (
    <section id="homepage-our-team" className="py-20 sm:py-28 bg-[#0B0B0D] text-[#D9DEE5] border-t border-white/10 relative overflow-hidden">
      {/* Background ambient MSK Red glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[340px] bg-[#B62825]/12 rounded-full blur-[140px] pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <ScrollReveal direction="up" className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-xs font-mono font-bold uppercase tracking-widest text-[#B62825]">
              <Users className="w-3.5 h-3.5" />
              <span>DEDICATED LOGISTICS PROFESSIONALS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white tracking-tight leading-tight">
              The People Behind <span className="text-[#B62825]">MSK Logistics</span>
            </h2>
            <p className="text-base sm:text-lg text-[#94A3B8] font-body leading-relaxed">
              Experienced cargo specialists, rigging engineers, and operational coordinators managing technical export packaging, container stuffing, and maritime transit at Nhava Sheva (JNPT).
            </p>
          </div>

          <div className="shrink-0">
            <MskButton
              to="/company/staff"
              variant="metallic"
              size="md"
              showArrow
            >
              Meet Our Full Team & Staff
            </MskButton>
          </div>
        </ScrollReveal>

        {/* Featured Split Hero Card */}
        <ScrollReveal direction="up" delay={80}>
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7)] bg-[#0D0F14] grid grid-cols-1 lg:grid-cols-12 items-stretch group">
            
            {/* Left 7 Columns: Authentic Original MSK Team Photograph */}
            <div className="lg:col-span-7 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[480px] overflow-hidden bg-neutral-950">
              <img
                src="/images/team/msk-team-containers.jpg"
                alt="MSK Logistics dedicated team standing in front of shipping containers at Nhava Sheva terminal"
                className="w-full h-full object-cover object-center sm:object-[center_38%] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                loading="eager"
                decoding="async"
              />

              {/* Contrast gradients */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent opacity-80 lg:hidden pointer-events-none" 
                aria-hidden="true" 
              />
              <div 
                className="hidden lg:block absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0D0F14]/90 pointer-events-none" 
                aria-hidden="true" 
              />

              {/* Watermark / Badge Overlay */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow">
                  <span className="w-2 h-2 rounded-full bg-[#B62825]" />
                  <span>ON-SITE AT TERMINAL</span>
                </span>
              </div>
            </div>

            {/* Right 5 Columns: Credentials & Operational Trust Metrics */}
            <div className="lg:col-span-5 p-7 sm:p-9 lg:p-10 flex flex-col justify-between space-y-6 relative z-10 border-t lg:border-t-0 lg:border-l border-white/10">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono font-bold text-[#B62825] uppercase tracking-wider">
                    OPERATIONAL INTEGRITY
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight mt-1">
                    Direct Hands-On Execution
                  </h3>
                  <p className="text-sm text-[#94A3B8] font-body leading-relaxed mt-2.5">
                    Our team coordinates directly with container freight stations (CFS), port authorities, and survey bodies to ensure every consignment complies with stringent marine safety regulations.
                  </p>
                </div>

                {/* 3 Pillars */}
                <div className="space-y-4 pt-1">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#B62825]/15 border border-[#B62825]/40 flex items-center justify-center text-[#B62825] shrink-0 mt-0.5">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold font-heading text-white">
                        Specialized Rigging & Packing Crew
                      </h4>
                      <p className="text-xs text-[#94A3B8] mt-0.5 leading-snug">
                        Trained in heavy-lift rigging, timber chocking, and moisture-barrier applications.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#B62825]/15 border border-[#B62825]/40 flex items-center justify-center text-[#B62825] shrink-0 mt-0.5">
                      <Workflow className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold font-heading text-white">
                        Coordinated Terminal Operations
                      </h4>
                      <p className="text-xs text-[#94A3B8] mt-0.5 leading-snug">
                        Immediate presence across Speedy, Punjab, and Polaris CFS terminals in JNPT.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#B62825]/15 border border-[#B62825]/40 flex items-center justify-center text-[#B62825] shrink-0 mt-0.5">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold font-heading text-white">
                        Zero-Tolerance Transit Security
                      </h4>
                      <p className="text-xs text-[#94A3B8] mt-0.5 leading-snug">
                        Rigorous pre-departure sign-off and photo documentation for every container.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Footer Details */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[#64748B] block">REGISTERED HUB</span>
                  <span className="text-white font-bold">CBD Belapur, Navi Mumbai</span>
                </div>
                <div className="text-right">
                  <span className="text-[#64748B] block">FIELD TERMINALS</span>
                  <span className="text-[#B62825] font-bold">Nhava Sheva (JNPT)</span>
                </div>
              </div>

            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
