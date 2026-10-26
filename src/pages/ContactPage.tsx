import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  Send, 
  CheckCircle2, 
  Compass,
  ExternalLink
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

  const mapQuery = encodeURIComponent(COMPANY_DETAILS.address);
  const mapEmbedUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  const mapExternalUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <div className="space-y-0 bg-[#FAFAFA]">
      {/* 1. Page Header — Clean & Proportionate */}
      <section className="bg-[#173F70] text-white py-12 sm:py-14 border-b border-[#0F2D52] relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-[#173F70] via-[#1A457D] to-[#173F70] opacity-95 pointer-events-none" 
          aria-hidden="true" 
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-3.5 relative z-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="editorial-badge bg-white/10 text-white border-white/20">
              REGISTERED OFFICE
            </span>
            <span className="text-xs font-mono text-blue-200">
              NAVI MUMBAI • NHAVA SHEVA (JNPT)
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white tracking-tight">
            Connect With MSK Logistics
          </h1>
          <p className="text-blue-100 text-[15px] sm:text-base max-w-2xl font-body leading-relaxed">
            Reach our registered office and operational desk in Navi Mumbai for export packaging, stuffing, and cargo securing requirements.
          </p>
        </div>
      </section>

      {/* 2. Main Contact Grid */}
      <section className="py-14 sm:py-18 bg-white border-b border-[#E2E2E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left Column: Official Contact Info (5 cols) */}
            <div className="lg:col-span-5 space-y-8 bg-[#F8FAFC] p-7 sm:p-9 rounded-2xl border border-[#E2E8F0] shadow-xs">
              <div className="space-y-2">
                <span className="editorial-badge bg-white text-[#B62825] border-red-200">
                  OFFICIAL DETAILS
                </span>
                <h2 className="text-2xl font-bold text-[#1E293B] font-heading">
                  {COMPANY_DETAILS.publicName}
                </h2>
              </div>

              {/* Verified Details */}
              <div className="space-y-5 text-[14px] text-[#334155]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#B62825] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1E293B] mb-0.5">Registered Office Address:</strong>
                    <span className="text-[#64748B] leading-relaxed">{COMPANY_DETAILS.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#B62825] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1E293B] mb-0.5">Phone:</strong>
                    <a 
                      href={COMPANY_DETAILS.phoneHref}
                      className="text-[#173F70] font-semibold hover:text-[#B62825] transition-colors"
                    >
                      {COMPANY_DETAILS.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#B62825] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1E293B] mb-0.5">Email:</strong>
                    <a 
                      href={COMPANY_DETAILS.emailHref}
                      className="text-[#173F70] hover:text-[#B62825] transition-colors break-all font-medium"
                    >
                      {COMPANY_DETAILS.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Compass className="w-5 h-5 text-[#B62825] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1E293B] mb-0.5">Maritime Gateway:</strong>
                    <span className="text-[#64748B]">{COMPANY_DETAILS.gateway}</span>
                  </div>
                </div>
              </div>

              {/* Quote CTA Banner */}
              <div className="p-5 bg-white rounded-xl border border-[#E2E8F0] space-y-3 shadow-xs">
                <div className="font-bold text-[#1E293B] text-[15px]">
                  Need a Specific Cargo Quote?
                </div>
                <p className="text-[13px] text-[#64748B] leading-relaxed">
                  For detailed cargo packaging, container stuffing, and lashing quotations, submit our comprehensive quote request form.
                </p>
                <Link to="/request-quote" className="btn-primary w-full text-center py-2.5 text-[13px]">
                  <span>Go to Quote Request Form</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>

            {/* Right Column: General Enquiry Form (7 cols) */}
            <div className="lg:col-span-7 bg-white p-7 sm:p-9 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-6">
              <div className="space-y-2">
                <span className="editorial-badge bg-[#F8FAFC] text-[#1E293B] border-neutral-300">
                  ENQUIRY DESK
                </span>
                <h2 className="text-2xl font-bold text-[#1E293B] font-heading">
                  Send a Direct Message
                </h2>
                <p className="text-[14px] text-[#64748B]">
                  Fill out the form below for service enquiries, operational scheduling, or facility coordination.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-center space-y-4">
                  <div className="w-12 h-12 bg-emerald-50 text-[#10B981] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1E293B] font-heading">
                    Enquiry Received
                  </h3>
                  <p className="text-[14px] text-[#64748B] max-w-md mx-auto">
                    Thank you for reaching out. Your enquiry has been received and routed to our Navi Mumbai desk. We will respond shortly via email or phone.
                  </p>
                  <button 
                    type="button" 
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        subject: 'General Logistics Enquiry',
                        message: ''
                      });
                    }}
                    className="text-[13px] text-[#B62825] font-semibold underline pt-2 hover:text-[#9E2220]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-[14px]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#1E293B] font-medium mb-1 text-xs uppercase tracking-wider font-mono">
                        Your Name <span className="text-[#B62825]">*</span>
                      </label>
                      <input 
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                        placeholder="e.g. Anand K."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825] bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[#1E293B] font-medium mb-1 text-xs uppercase tracking-wider font-mono">
                        Company Name (Optional)
                      </label>
                      <input 
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData(p => ({ ...p, company: e.target.value }))}
                        placeholder="e.g. Export Industries Ltd."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825] bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[#1E293B] font-medium mb-1 text-xs uppercase tracking-wider font-mono">
                        Business Email <span className="text-[#B62825]">*</span>
                      </label>
                      <input 
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825] bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[#1E293B] font-medium mb-1 text-xs uppercase tracking-wider font-mono">
                        Phone Number
                      </label>
                      <input 
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825] bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#1E293B] font-medium mb-1 text-xs uppercase tracking-wider font-mono">
                      Subject
                    </label>
                    <input 
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData(p => ({ ...p, subject: e.target.value }))}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825] bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[#1E293B] font-medium mb-1 text-xs uppercase tracking-wider font-mono">
                      Message / Enquiry Details <span className="text-[#B62825]">*</span>
                    </label>
                    <textarea 
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                      placeholder="Share details regarding your packaging, container stuffing, or cargo securing requirements..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825] bg-white transition-all"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="btn-primary py-3 px-6 text-[14px] rounded-lg"
                  >
                    <Send className="w-4 h-4 mr-1.5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* 3. Responsive Google Maps Embed Section */}
          <div className="bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#B62825] uppercase tracking-wider">
                  <MapPin className="w-4 h-4" />
                  <span>LOCATION MAP</span>
                </div>
                <h3 className="text-xl font-bold font-heading text-[#1E293B]">
                  Registered Office Location
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B]">
                  JNPT Township Colony, Sector - 3, Building No. B/48, Office No. 3, Navi Mumbai 400702, Maharashtra, India.
                </p>
              </div>

              <a
                href={mapExternalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs py-2 px-4 inline-flex items-center gap-1.5 self-start sm:self-auto whitespace-nowrap shadow-xs"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Map Frame */}
            <div className="relative w-full h-[360px] sm:h-[420px] rounded-xl overflow-hidden border border-[#E2E8F0] bg-neutral-100 shadow-inner">
              <iframe
                title="MSK Logistics Registered Office Map"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
