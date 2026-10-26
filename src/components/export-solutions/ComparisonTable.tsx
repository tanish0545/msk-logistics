import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

export const ComparisonTable: React.FC = () => {
  const comparisonRows = [
    {
      feature: 'Cargo / Products',
      option01: 'Provided by the client (ready at staging point)',
      option02: 'Provided by the client (ready at staging point)',
      notes: 'Customer is responsible for cargo preparedness and technical documentation.'
    },
    {
      feature: 'Shipping Container Supply',
      option01: 'Arranged & provided by the client prior to work',
      option02: 'Must be arranged & provided by the client separately',
      notes: 'Critical Policy: MSK Logistics does not supply, lease, or arrange containers under either option.'
    },
    {
      feature: 'Container Sourcing Responsibility',
      option01: "Client's responsibility (line or merchant container)",
      option02: "Client's responsibility (independently sourced by client)",
      notes: 'Client coordinates equipment release and positioning timeline.'
    },
    {
      feature: 'Export Packaging Scope',
      option01: 'Performed by MSK as agreed (crating, pallets, wraps)',
      option02: 'Performed by MSK as agreed (crating, pallets, wraps)',
      notes: 'Engineered protective packing matching maritime export requirements.'
    },
    {
      feature: 'Container Stuffing Scope',
      option01: 'Performed by MSK as agreed (loading & sequencing)',
      option02: 'Performed by MSK as agreed (loading & sequencing)',
      notes: 'Methodical weight distribution and axle-rating compliance inside the container.'
    },
    {
      feature: 'Cargo Lashing & Securing Scope',
      option01: 'Performed by MSK as agreed (chains, straps, chocks)',
      option02: 'Performed by MSK as agreed (chains, straps, chocks)',
      notes: 'Rigorous multi-directional restraint against dynamic ocean forces.'
    },
    {
      feature: 'Commercial Pricing Basis',
      option01: 'Quotation based on agreed work scope & materials',
      option02: 'Quotation based on agreed work scope & materials',
      notes: 'Itemized quotation based on cargo dimensions, weights, and required lashing gear.'
    }
  ];

  return (
    <div className="w-full space-y-8">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-[#E2E2E2] shadow-sm bg-white">
        <table className="w-full border-collapse text-left text-[14px]">
          <thead>
            <tr className="bg-[#343434] text-white">
              <th className="p-4 sm:p-5 font-heading font-semibold text-[15px] w-1/4">
                Operational Scope & Division
              </th>
              <th className="p-4 sm:p-5 font-heading font-semibold text-[15px] w-3/8 bg-[#173F70]">
                <div className="flex items-center justify-between">
                  <span>Option 01: Client Container & Cargo Ready</span>
                  <span className="text-[10px] font-mono bg-white/20 text-white px-2 py-0.5 rounded font-bold">
                    OPTION 01
                  </span>
                </div>
              </th>
              <th className="p-4 sm:p-5 font-heading font-semibold text-[15px] w-3/8 bg-[#B62825]">
                <div className="flex items-center justify-between">
                  <span>Option 02: Client Cargo, Container to Be Arranged</span>
                  <span className="text-[10px] font-mono bg-black/30 text-white px-2 py-0.5 rounded font-bold">
                    OPTION 02
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E2E2]">
            {comparisonRows.map((row, idx) => (
              <tr 
                key={idx}
                className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F5F5F3]'}
              >
                <td className="p-4 sm:p-5 font-medium text-[#343434]">
                  <div>{row.feature}</div>
                  <div className="text-[11px] text-[#666666] mt-0.5">{row.notes}</div>
                </td>

                <td className="p-4 sm:p-5 text-[#343434] bg-blue-50/20 font-medium">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#173F70] shrink-0 mt-0.5" />
                    <span>{row.option01}</span>
                  </div>
                </td>

                <td className="p-4 sm:p-5 text-[#343434] bg-red-50/15">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#B62825] shrink-0 mt-0.5" />
                    <span>{row.option02}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-[#F5F5F3] border-t-2 border-[#E2E2E2]">
              <td className="p-4 sm:p-5 font-semibold text-[#343434]">
                Quotation Request
              </td>
              <td className="p-4 sm:p-5 bg-blue-50/30">
                <Link 
                  to="/request-quote?solution=client_container_and_cargo"
                  className="w-full bg-[#173F70] hover:bg-[#0F2D52] text-white font-bold py-2.5 px-4 rounded-lg text-xs sm:text-sm text-center inline-block transition-all shadow"
                >
                  Request Quote for Option 01 &rarr;
                </Link>
              </td>
              <td className="p-4 sm:p-5 bg-red-50/20">
                <Link 
                  to="/request-quote?solution=client_cargo_container_arranged_by_client"
                  className="w-full bg-[#B62825] hover:bg-[#9E2220] text-white font-bold py-2.5 px-4 rounded-lg text-xs sm:text-sm text-center inline-block transition-all shadow"
                >
                  Request Quote for Option 02 &rarr;
                </Link>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Mobile Stacked View */}
      <div className="md:hidden space-y-4">
        {comparisonRows.map((row, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-[#E2E2E2] shadow-sm space-y-3">
            <div className="font-bold text-[#343434] text-[15px] border-b border-[#E2E2E2] pb-2 font-heading">
              {row.feature}
            </div>

            <div className="space-y-2 text-[13px]">
              <div className="p-3.5 bg-blue-50/50 rounded-lg border border-blue-100">
                <div className="text-[11px] font-mono font-bold text-[#173F70] uppercase mb-1">
                  Option 01 — Container & Cargo Ready
                </div>
                <div className="text-[#343434] font-medium">{row.option01}</div>
              </div>

              <div className="p-3.5 bg-red-50/50 rounded-lg border border-red-100">
                <div className="text-[11px] font-mono font-bold text-[#B62825] uppercase mb-1">
                  Option 02 — Container to Be Arranged
                </div>
                <div className="text-[#343434] font-medium">{row.option02}</div>
              </div>
            </div>

            <p className="text-[11px] text-[#666666] pt-1">
              {row.notes}
            </p>
          </div>
        ))}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
          <Link 
            to="/request-quote?solution=client_container_and_cargo"
            className="w-full bg-[#173F70] text-white font-bold py-3 px-4 rounded-xl text-center text-sm shadow"
          >
            Select Option 01 &rarr;
          </Link>
          <Link 
            to="/request-quote?solution=client_cargo_container_arranged_by_client"
            className="w-full bg-[#B62825] text-white font-bold py-3 px-4 rounded-xl text-center text-sm shadow"
          >
            Select Option 02 &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};
