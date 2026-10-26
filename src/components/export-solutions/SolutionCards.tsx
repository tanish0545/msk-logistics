import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { EXPORT_SOLUTIONS } from '../../data/company';
import { BrandedImage } from '../common/BrandedImage';
import { ScrollReveal } from '../common/ScrollReveal';

export const SolutionCards: React.FC = () => {
  const opt1 = EXPORT_SOLUTIONS.option01;
  const opt2 = EXPORT_SOLUTIONS.option02;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
      {/* Option 01: Client-Arranged Container & Cargo */}
      <ScrollReveal direction="left" delay={0} className="h-full">
        <div className="h-full bg-white rounded-2xl border-2 border-[#173F70] overflow-hidden shadow-lg hover:shadow-[0_20px_35px_-8px_rgba(23,63,112,0.18)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group focus-within:ring-2 focus-within:ring-[#173F70] focus-within:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none">

        <div>
          {/* Visual Header with Real Service Photo */}
          <div className="relative">
            <BrandedImage
              src={opt1.image}
              alt={opt1.title}
              aspectRatio="aspect-[16/9]"
              imageClassName="group-hover:scale-105 transition-transform duration-500 motion-reduce:transform-none"
            />
            <div className="absolute top-4 left-4 z-10">
              <span className="editorial-badge bg-[#173F70] text-white border-white/20 shadow-md">
                {opt1.badge}
              </span>
            </div>
          </div>

          <div className="p-7 sm:p-9 space-y-6">
            <div>
              <div className="text-xs font-mono font-bold text-[#B62825] uppercase tracking-wider mb-1">
                SERVICE ARRANGEMENT {opt1.optionNumber}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#173F70] font-heading leading-tight">
                {opt1.title}
              </h3>
              <p className="mt-2 text-sm sm:text-[15px] font-semibold text-[#343434]">
                {opt1.subheading}
              </p>
              <p className="mt-3 text-sm text-[#666666] leading-relaxed">
                {opt1.summary}
              </p>
            </div>

            {/* Scope & Responsibilities Breakdown */}
            <div className="space-y-3 bg-[#F5F5F3] p-5 rounded-xl border border-[#E2E2E2] text-xs sm:text-[13px]">
              <div className="font-mono font-bold uppercase text-[#173F70] text-[11px] tracking-wider mb-2">
                Operational Scope & Division:
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#173F70] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#343434]">Cargo / Products:</strong>{' '}
                  <span className="text-[#666666]">{opt1.customerCargo}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#173F70] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#343434]">Container:</strong>{' '}
                  <span className="text-[#666666]">{opt1.containerStatus}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B62825] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#B62825]">Export Packaging:</strong>{' '}
                  <span className="text-[#343434]">{opt1.mskPackaging}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B62825] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#B62825]">Container Stuffing:</strong>{' '}
                  <span className="text-[#343434]">{opt1.mskStuffing}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B62825] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#B62825]">Cargo Lashing & Securing:</strong>{' '}
                  <span className="text-[#343434]">{opt1.mskLashing}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E2E2E2] flex items-center justify-between text-[11px] font-mono text-[#666666]">
                <span>Commercial Basis:</span>
                <strong className="text-[#173F70]">{opt1.pricingNote}</strong>
              </div>
            </div>

            {/* Critical Policy Notice */}
            <div className="flex items-start gap-2.5 text-[12px] text-[#666666] bg-amber-50/60 p-3.5 rounded-lg border border-amber-200">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p>
                <strong>Important Policy:</strong> {opt1.criticalNotice}
              </p>
            </div>
          </div>
        </div>

        <div className="p-7 sm:p-9 pt-0">
          <Link 
            to={`/request-quote?solution=${opt1.id}`}
            className="w-full bg-[#173F70] hover:bg-[#0F2D52] text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all duration-200 shadow-md inline-flex items-center justify-center gap-2 group-hover:bg-[#B62825] group/btn"
          >
            <span>Request Quote for Option 01</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1 motion-reduce:transform-none" />
          </Link>
        </div>
      </div>
      </ScrollReveal>

      {/* Option 02: Client Cargo, Container to Be Arranged */}
      <ScrollReveal direction="right" delay={140} className="h-full">
        <div className="h-full bg-white rounded-2xl border-2 border-neutral-300 hover:border-[#B62825] overflow-hidden shadow-lg hover:shadow-[0_20px_35px_-8px_rgba(182,40,37,0.18)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group focus-within:ring-2 focus-within:ring-[#B62825] focus-within:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none">

        <div>
          {/* Visual Header with Real Service Photo */}
          <div className="relative">
            <BrandedImage
              src={opt2.image}
              alt={opt2.title}
              aspectRatio="aspect-[16/9]"
              imageClassName="group-hover:scale-105 transition-transform duration-500 motion-reduce:transform-none"
            />
            <div className="absolute top-4 left-4 z-10">
              <span className="editorial-badge bg-[#343434] text-white border-white/20 shadow-md">
                {opt2.badge}
              </span>
            </div>
          </div>

          <div className="p-7 sm:p-9 space-y-6">
            <div>
              <div className="text-xs font-mono font-bold text-[#B62825] uppercase tracking-wider mb-1">
                SERVICE ARRANGEMENT {opt2.optionNumber}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#343434] font-heading leading-tight">
                {opt2.title}
              </h3>
              <p className="mt-2 text-sm sm:text-[15px] font-semibold text-[#173F70]">
                {opt2.subheading}
              </p>
              <p className="mt-3 text-sm text-[#666666] leading-relaxed">
                {opt2.summary}
              </p>
            </div>

            {/* Scope & Responsibilities Breakdown */}
            <div className="space-y-3 bg-[#F5F5F3] p-5 rounded-xl border border-[#E2E2E2] text-xs sm:text-[13px]">
              <div className="font-mono font-bold uppercase text-[#343434] text-[11px] tracking-wider mb-2">
                Operational Scope & Division:
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#343434] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#343434]">Cargo / Products:</strong>{' '}
                  <span className="text-[#666666]">{opt2.customerCargo}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#343434]">Container:</strong>{' '}
                  <span className="text-[#666666]">{opt2.containerStatus}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-700">Container Sourcing:</strong>{' '}
                  <span className="text-[#666666]">{opt2.containerSourcing}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B62825] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#B62825]">Export Packaging:</strong>{' '}
                  <span className="text-[#343434]">{opt2.mskPackaging}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B62825] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#B62825]">Container Stuffing:</strong>{' '}
                  <span className="text-[#343434]">{opt2.mskStuffing}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B62825] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#B62825]">Cargo Lashing & Securing:</strong>{' '}
                  <span className="text-[#343434]">{opt2.mskLashing}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E2E2E2] flex items-center justify-between text-[11px] font-mono text-[#666666]">
                <span>Commercial Basis:</span>
                <strong className="text-[#343434]">{opt2.pricingNote}</strong>
              </div>
            </div>

            {/* Critical Policy Notice */}
            <div className="flex items-start gap-2.5 text-[12px] text-[#666666] bg-amber-50/60 p-3.5 rounded-lg border border-amber-200">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p>
                <strong>Important Policy:</strong> {opt2.criticalNotice}
              </p>
            </div>
          </div>
        </div>

        <div className="p-7 sm:p-9 pt-0">
          <Link 
            to={`/request-quote?solution=${opt2.id}`}
            className="w-full bg-[#B62825] hover:bg-[#9E2220] text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all duration-200 shadow-md inline-flex items-center justify-center gap-2 group/btn"
          >
            <span>Request Quote for Option 02</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1 motion-reduce:transform-none" />
          </Link>
        </div>
      </div>
      </ScrollReveal>
    </div>
  );
};
