import React from 'react';
import { Link } from 'react-router-dom';
import { Home, FileQuestion } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#F5F5F3] py-20 px-4">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-xl border border-[#E2E2E2] shadow-sm text-center space-y-6">
        <div className="w-16 h-16 bg-red-50 text-[#B62825] rounded-full flex items-center justify-center mx-auto">
          <FileQuestion className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="text-[12px] font-mono-code font-bold text-[#B62825]">
            ERROR 404 — ROUTE NOT FOUND
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#343434] font-heading">
            Page Not Located
          </h1>
          <p className="text-[14px] text-[#666666] leading-relaxed">
            The page or operational route you requested is unavailable or has moved within the MSK Logistics portal.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <Link to="/" className="btn-primary w-full text-center py-3 text-[14px]">
            <Home className="w-4 h-4 mr-1.5" />
            <span>Return to Homepage</span>
          </Link>
          <Link to="/services" className="btn-secondary w-full text-center py-2.5 text-[14px]">
            <span>Explore Services Directory</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
