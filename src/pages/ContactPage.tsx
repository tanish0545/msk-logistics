import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  Send, 
  CheckCircle2, 
  Compass
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/company';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: 'General Logistics Enquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    const existing = JSON.parse(localStorage.getItem('msk_contact_messages') || '[]');
    existing.push({
      ...formData,
      id: `MSG-${Date.now()}`,
      date: new Date().toISOString()
    });
    localStorage.setItem('msk_contact_messages', JSON.stringify(existing));
    
    setSubmitted(true);
  };

  return (
    <div className="space-y-0">
      {/* Page Header */}
      <section className="bg-[#343434] text-white py-16 sm:py-20 border-b border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
          <span className="editorial-badge bg-white/10 text-white border-white/20">
            CONTACT OFFICE
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white">
            Connect With MSK Logistics
          </h1>
          <p className="text-neutral-300 text-[16px] sm:text-[18px] max-w-2xl font-body leading-relaxed">
            Reach our registered office and operational desk in Navi Mumbai for export packaging, stuffing, and cargo securing requirements.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E2E2E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Contact Details Card (5 cols) */}
            <div className="lg:col-span-5 space-y-8 bg-[#F5F5F3] p-7 sm:p-9 rounded-xl border border-[#E2E2E2]">
              <div className="space-y-2">
                <span className="editorial-badge bg-white text-[#B62825] border-red-200">
                  OFFICIAL CONTACT INFO
                </span>
                <h2 className="text-2xl font-bold text-[#343434] font-heading">
                  {COMPANY_DETAILS.publicName}
                </h2>
              </div>

              {/* Verified Details */}
              <div className="space-y-5 text-[14px] text-[#343434]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#B62825] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#343434] mb-0.5">Office Address:</strong>
                    <span className="text-[#666666] leading-relaxed">{COMPANY_DETAILS.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#B62825] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#343434] mb-0.5">Phone:</strong>
                    <a 
                      href={COMPANY_DETAILS.phoneHref}
                      className="text-[#343434] font-semibold hover:text-[#B62825] transition-colors"
                    >
                      {COMPANY_DETAILS.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#B62825] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#343434] mb-0.5">Email:</strong>
                    <a 
                      href={COMPANY_DETAILS.emailHref}
                      className="text-[#343434] hover:text-[#B62825] transition-colors break-all"
                    >
                      {COMPANY_DETAILS.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Compass className="w-5 h-5 text-[#B62825] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#343434] mb-0.5">Maritime Gateway:</strong>
                    <span className="text-[#666666]">{COMPANY_DETAILS.gateway}</span>
                  </div>
                </div>
              </div>

              {/* Quote CTA Banner */}
              <div className="p-5 bg-white rounded-lg border border-[#E2E2E2] space-y-3">
                <div className="font-bold text-[#343434] text-[15px]">
                  Need a Specific Shipment Quote?
                </div>
                <p className="text-[13px] text-[#666666]">
                  For detailed cargo packaging, container stuffing, and lashing quotations, submit our comprehensive quote request form.
                </p>
                <Link to="/request-quote" className="btn-primary w-full text-center py-2.5 text-[13px]">
                  <span>Go to Quote Request Form</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>

            {/* General Enquiry Form (7 cols) */}
            <div className="lg:col-span-7 bg-white p-7 sm:p-9 rounded-xl border border-[#E2E2E2] shadow-sm space-y-6">
              <div className="space-y-2">
                <span className="editorial-badge bg-neutral-100 text-[#343434] border-neutral-300">
                  ENQUIRY DESK
                </span>
                <h2 className="text-2xl font-bold text-[#343434] font-heading">
                  Send a Direct Message
                </h2>
                <p className="text-[14px] text-[#666666]">
                  Fill out the form below for general enquiries, operational capabilities, or facility visits.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 bg-[#F5F5F3] rounded-lg border border-[#E2E2E2] text-center space-y-4">
                  <div className="w-12 h-12 bg-red-50 text-[#B62825] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-[#343434] font-heading">
                    Enquiry Received
                  </h3>
                  <p className="text-[14px] text-[#666666]">
                    Thank you for reaching out. Your enquiry has been received and routed to our Navi Mumbai desk. We will respond shortly via email or phone.
                  </p>
                  <button 
                    type="button" 
                    onClick={() => setSubmitted(false)}
                    className="text-[13px] text-[#B62825] font-semibold underline pt-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-[14px]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#343434] font-medium mb-1">
                        Your Name <span className="text-[#B62825]">*</span>
                      </label>
                      <input 
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                        placeholder="e.g. Anand K."
                        className="w-full px-3.5 py-2.5 rounded-md border border-[#E2E2E2] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#343434] font-medium mb-1">
                        Company Name (Optional)
                      </label>
                      <input 
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData(p => ({ ...p, company: e.target.value }))}
                        placeholder="e.g. Export Logistics Ltd."
                        className="w-full px-3.5 py-2.5 rounded-md border border-[#E2E2E2] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#343434] font-medium mb-1">
                        Business Email <span className="text-[#B62825]">*</span>
                      </label>
                      <input 
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2.5 rounded-md border border-[#E2E2E2] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#343434] font-medium mb-1">
                        Phone Number
                      </label>
                      <input 
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-md border border-[#E2E2E2] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#343434] font-medium mb-1">
                      Subject
                    </label>
                    <input 
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData(p => ({ ...p, subject: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-md border border-[#E2E2E2] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#343434] font-medium mb-1">
                      Message / Enquiry Details <span className="text-[#B62825]">*</span>
                    </label>
                    <textarea 
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                      placeholder="Share details regarding your packaging, container stuffing, or cargo lashing requirements..."
                      className="w-full px-3.5 py-2.5 rounded-md border border-[#E2E2E2] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825]"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="btn-primary py-3 px-6 text-[14px]"
                  >
                    <Send className="w-4 h-4 mr-1.5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
