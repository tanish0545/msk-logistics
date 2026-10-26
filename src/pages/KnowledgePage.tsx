import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ShieldCheck, CheckCircle2, ArrowRight, FileText, Anchor } from 'lucide-react';

export const KnowledgePage: React.FC = () => {
  return (
    <div className="space-y-0">
      {/* Page Header */}
      <section className="bg-[#343434] text-white py-16 sm:py-20 border-b border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
          <span className="editorial-badge bg-white/10 text-white border-white/20">
            TECHNICAL KNOWLEDGE BASE
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white">
            Export Packaging & Marine Securing Knowledge
          </h1>
          <p className="text-neutral-300 text-[16px] sm:text-[18px] max-w-3xl font-body leading-relaxed">
            Essential guidelines on international phytosanitary compliance, CTU Code cargo securing standards, moisture mitigation, and ocean freight packaging best practices.
          </p>
        </div>
      </section>

      {/* Main Knowledge Articles */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E2E2E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Article 1: ISPM-15 */}
            <div className="p-8 rounded-xl bg-[#F8F9FA] border border-[#E2E2E2] space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#B62825]">
                <FileText className="w-4 h-4" />
                <span>REGULATORY COMPLIANCE</span>
              </div>
              <h2 className="text-xl font-bold font-heading text-[#343434]">
                Understanding ISPM-15 Wood Packaging Standards
              </h2>
              <p className="text-sm text-[#666666] leading-relaxed">
                The International Standards for Phytosanitary Measures No. 15 (ISPM-15) mandates that raw coniferous and non-coniferous hardwood or softwood packing material used in international trade must undergo heat treatment (HT) to a core temperature of 56°C for a minimum of 30 minutes.
              </p>
              <div className="space-y-2 text-xs text-[#52627A] pt-2 border-t border-[#E2E2E2]">
                <div className="font-semibold text-[#343434]">Key Implementation Rules:</div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B62825]" />
                  <span>Legible IPPC certified phytosanitary stamp on both visible sides</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B62825]" />
                  <span>Debarked timber used to prevent bark-beetle infestations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B62825]" />
                  <span>Exempt: Manufactured wood products (plywood, MDF, hardboard)</span>
                </div>
              </div>
            </div>

            {/* Article 2: CTU Code */}
            <div className="p-8 rounded-xl bg-[#F8F9FA] border border-[#E2E2E2] space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#B62825]">
                <Anchor className="w-4 h-4" />
                <span>MARITIME SAFETY CODE</span>
              </div>
              <h2 className="text-xl font-bold font-heading text-[#343434]">
                IMO / ILO / UNECE CTU Code Essentials
              </h2>
              <p className="text-sm text-[#666666] leading-relaxed">
                The Code of Practice for Packing of Cargo Transport Units (CTU Code) provides global recommendations for cargo securing. During heavy weather, a vessel can roll through angles greater than 30°, generating lateral g-forces exceeding 0.8g that easily tear inadequate securing.
              </p>
              <div className="space-y-2 text-xs text-[#52627A] pt-2 border-t border-[#E2E2E2]">
                <div className="font-semibold text-[#343434]">CTU Securing Principles:</div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B62825]" />
                  <span>Form-locking: Direct timber blocking against container corner posts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B62825]" />
                  <span>Force-locking: Top-over lashing with high pretension</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B62825]" />
                  <span>Direct lashing: Diagonal and cross lashing using anchor eyelets</span>
                </div>
              </div>
            </div>

            {/* Article 3: Moisture Protection */}
            <div className="p-8 rounded-xl bg-[#F8F9FA] border border-[#E2E2E2] space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#B62825]">
                <ShieldCheck className="w-4 h-4" />
                <span>ENVIRONMENTAL PRESERVATION</span>
              </div>
              <h2 className="text-xl font-bold font-heading text-[#343434]">
                Preventing Container Rain & Corrosion
              </h2>
              <p className="text-sm text-[#666666] leading-relaxed">
                As containers sail through varying climatic zones—such as from tropical India through the Red Sea or Cape route to colder temperate ports—internal humidity condenses on container ceilings, resulting in "container rain" that rusts precision machinery.
              </p>
              <div className="space-y-2 text-xs text-[#52627A] pt-2 border-t border-[#E2E2E2]">
                <div className="font-semibold text-[#343434]">MSK Protection Strategy:</div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B62825]" />
                  <span>Multi-layer aluminum barrier foil with hermetic vacuum sealing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B62825]" />
                  <span>Calcium chloride and high-absorption clay desiccant bags</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B62825]" />
                  <span>Volatile Corrosion Inhibitor (VCI) films for machined bare steel</span>
                </div>
              </div>
            </div>

            {/* Article 4: Pre-Stuffing Checklist */}
            <div className="p-8 rounded-xl bg-[#F8F9FA] border border-[#E2E2E2] space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#B62825]">
                <BookOpen className="w-4 h-4" />
                <span>QUALITY ASSURANCE</span>
              </div>
              <h2 className="text-xl font-bold font-heading text-[#343434]">
                10-Point Pre-Stuffing Container Inspection
              </h2>
              <p className="text-sm text-[#666666] leading-relaxed">
                Before any cargo enters a shipping container, MSK Logistics executes a comprehensive pre-loading audit to verify structural integrity, weather-tightness, and safety.
              </p>
              <div className="space-y-2 text-xs text-[#52627A] pt-2 border-t border-[#E2E2E2]">
                <div className="font-semibold text-[#343434]">Audit Points Checked:</div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B62825]" />
                  <span>Daylight test: Inspecting inside container with closed doors for pinholes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B62825]" />
                  <span>Floor cleanliness, dryness, and absence of protruding nails</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B62825]" />
                  <span>Testing all lashing rings along bottom and top side rails</span>
                </div>
              </div>
            </div>
          </div>

          {/* Consultation CTA */}
          <div className="bg-[#173F70] rounded-2xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-heading">
                Have Specific Compliance or Packaging Inquiries?
              </h3>
              <p className="text-blue-100 text-sm max-w-xl">
                Our export packing specialists can recommend the optimal timber crating, barrier wrapping, and lashing configuration for your specific cargo.
              </p>
            </div>
            <Link
              to="/request-quote"
              className="bg-[#B62825] hover:bg-[#9E2220] text-white font-bold py-3.5 px-6 rounded-xl inline-flex items-center gap-2 shadow-lg transition-all flex-shrink-0"
            >
              <span>Discuss Your Cargo Specs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
