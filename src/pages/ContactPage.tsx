import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  Compass,
  ExternalLink
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/company';
import { IsoCertificationBadge } from '../components/common/IsoCertificationBadge';
import { InnerPageBanner } from '../components/layout/InnerPageBanner';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: 'Export Packaging & Cargo Securing Enquiry',
    message: '',
    honeypot: '', // Anti-spam honeypot
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submissionRef, setSubmissionRef] = useState<string | null>(null);

  // Client-side validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Please provide your full name.';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Please provide your business email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email format (e.g., name@company.com).';
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Please specify an enquiry subject.';
    }

    if (!formData.message.trim()) {
      errors.message = 'Please provide details regarding your enquiry.';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Enquiry message must be at least 10 characters.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Validate
    if (!validateForm()) return;

    // Prevent duplicate submissions
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          subject: formData.subject,
          message: formData.message,
          honeypot: formData.honeypot,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setSubmitSuccess(true);
        setSubmissionRef(data.id || `MSK-${Date.now().toString().slice(-6)}`);
        // Clear form upon confirmed successful delivery
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: 'Export Packaging & Cargo Securing Enquiry',
          message: '',
          honeypot: '',
        });
        setFieldErrors({});
      } else {
        // Display specific error message from server
        setSubmitError(
          data.message || 
          'Unable to deliver message at this moment. Please email info@msklogisticsolution.com directly or call our operations desk.'
        );
      }
    } catch (err) {
      // Network failure
      setSubmitError(
        'A network connection error occurred while submitting your enquiry. Please verify your connection or contact info@msklogisticsolution.com directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const mapQuery = encodeURIComponent(COMPANY_DETAILS.address);
  const mapEmbedUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  const mapExternalUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <div className="space-y-0 bg-[#FAFAFA]">
      {/* 1. Page Header */}
      <InnerPageBanner
        badge="COMMERCIAL INQUIRIES"
        badgeSubtext="NAVI MUMBAI & NHAVA SHEVA (JNPT)"
        title="Connect With MSK Logistics"
        description="Reach our registered office and operational desk in Navi Mumbai for export packaging, stuffing, and cargo securing requirements."
      />

      {/* 2. Main Contact Grid */}
      <section className="py-14 sm:py-18 bg-white border-b border-[#E2E2E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left Column: Official Contact Info (5 cols) */}
            <div className="lg:col-span-5 space-y-7 bg-[#F8FAFC] p-7 sm:p-9 rounded-2xl border border-[#E2E8F0] shadow-xs">
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
                    <strong className="block text-[#1E293B] mb-0.5">Direct Operations Desk:</strong>
                    <a 
                      href={COMPANY_DETAILS.phoneHref}
                      className="text-[#173F70] font-semibold hover:text-[#B62825] transition-colors"
                    >
                      {COMPANY_DETAILS.phone}
                    </a>
                  </div>
                </div>

                {/* Email Address 1: General & Service Enquiries */}
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#B62825] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <strong className="block text-[#1E293B]">General &amp; Service Enquiries:</strong>
                    <a 
                      href={COMPANY_DETAILS.infoEmailHref}
                      className="text-[#173F70] hover:text-[#B62825] font-semibold transition-colors break-all inline-block"
                    >
                      {COMPANY_DETAILS.infoEmail}
                    </a>
                    <p className="text-[12px] text-[#94A3B8]">
                      Quotes, container stuffing scheduling &amp; operational bookings
                    </p>
                  </div>
                </div>

                {/* Email Address 2: Accounts & Billing */}
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#B62825] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <strong className="block text-[#1E293B]">Accounts &amp; Invoicing:</strong>
                    <a 
                      href={COMPANY_DETAILS.accountsEmailHref}
                      className="text-[#173F70] hover:text-[#B62825] font-semibold transition-colors break-all inline-block"
                    >
                      {COMPANY_DETAILS.accountsEmail}
                    </a>
                    <p className="text-[12px] text-[#94A3B8]">
                      Billing documentation, statements &amp; administrative queries
                    </p>
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

              {/* ISO 9001:2015 Certification Seal */}
              <div className="pt-2 border-t border-[#E2E8F0]">
                <IsoCertificationBadge size="md" className="w-full" />
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

            {/* Right Column: Working Contact Form (7 cols) */}
            <div className="lg:col-span-7 bg-white p-7 sm:p-9 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-6">
              <div className="space-y-2">
                <span className="editorial-badge bg-[#F8FAFC] text-[#1E293B] border-neutral-300">
                  ENQUIRY DESK
                </span>
                <h2 className="text-2xl font-bold text-[#1E293B] font-heading">
                  Send a Direct Message
                </h2>
                <p className="text-[14px] text-[#64748B]">
                  Inquiries submitted here are routed directly to <span className="font-semibold text-[#173F70]">info@msklogisticsolution.com</span>.
                </p>
              </div>

              {/* Confirmed Success State */}
              {submitSuccess ? (
                <div className="p-8 sm:p-10 bg-[#F8FAFC] rounded-2xl border border-emerald-200 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-14 h-14 bg-emerald-50 text-[#10B981] rounded-full flex items-center justify-center mx-auto shadow-xs border border-emerald-100">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1E293B] font-heading">
                    Message Delivered Successfully
                  </h3>
                  <p className="text-[14.5px] text-[#475569] max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. Your enquiry has been received and routed to <strong className="text-[#173F70]">info@msklogisticsolution.com</strong>. Our operations desk will review your details and respond promptly.
                  </p>
                  {submissionRef && (
                    <div className="inline-block px-3.5 py-1.5 rounded-md bg-white border border-[#E2E8F0] text-xs font-mono text-[#64748B]">
                      Reference: <span className="font-semibold text-[#1E293B]">{submissionRef}</span>
                    </div>
                  )}
                  <div className="pt-2">
                    <button 
                      type="button" 
                      onClick={() => {
                        setSubmitSuccess(false);
                        setSubmissionRef(null);
                        setSubmitError(null);
                      }}
                      className="inline-flex items-center gap-1.5 text-[13.5px] text-[#B62825] font-semibold hover:text-[#9E2220] transition-colors"
                    >
                      <span>Send Another Message</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4 text-[14px]">
                  
                  {/* Error Notification Banner */}
                  {submitError && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-[13.5px] space-y-1.5 animate-in fade-in duration-200">
                      <div className="flex items-center gap-2 font-semibold">
                        <AlertCircle className="w-4 h-4 text-[#B62825] shrink-0" />
                        <span>Submission Notice</span>
                      </div>
                      <p className="text-red-700 leading-relaxed pl-6">
                        {submitError}
                      </p>
                      <div className="pl-6 pt-1">
                        <a 
                          href={`mailto:info@msklogisticsolution.com?subject=${encodeURIComponent(formData.subject || 'Enquiry')}&body=${encodeURIComponent(formData.message || '')}`}
                          className="font-semibold text-[#B62825] underline hover:text-[#9E2220]"
                        >
                          Click here to open email client directly &rarr;
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Honeypot Field for Spam Bot Protection (Hidden from legitimate users) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="form_website">Leave this field blank</label>
                    <input
                      type="text"
                      id="form_website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={(e) => setFormData(p => ({ ...p, honeypot: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-[#1E293B] font-medium mb-1 text-xs uppercase tracking-wider font-mono">
                        Full Name <span className="text-[#B62825]">*</span>
                      </label>
                      <input 
                        type="text"
                        required
                        disabled={isSubmitting}
                        value={formData.name}
                        onChange={(e) => {
                          setFormData(p => ({ ...p, name: e.target.value }));
                          if (fieldErrors.name) setFieldErrors(p => ({ ...p, name: '' }));
                        }}
                        placeholder="e.g. Sunil Kumar"
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825] bg-white transition-all ${
                          fieldErrors.name ? 'border-red-400 bg-red-50/20' : 'border-[#E2E8F0]'
                        }`}
                      />
                      {fieldErrors.name && (
                        <p className="text-red-600 text-xs mt-1 font-medium">{fieldErrors.name}</p>
                      )}
                    </div>

                    {/* Company Name */}
                    <div>
                      <label className="block text-[#1E293B] font-medium mb-1 text-xs uppercase tracking-wider font-mono">
                        Company Name (Optional)
                      </label>
                      <input 
                        type="text"
                        disabled={isSubmitting}
                        value={formData.company}
                        onChange={(e) => setFormData(p => ({ ...p, company: e.target.value }))}
                        placeholder="e.g. Export Industries Ltd."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825] bg-white transition-all"
                      />
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-[#1E293B] font-medium mb-1 text-xs uppercase tracking-wider font-mono">
                        Business Email <span className="text-[#B62825]">*</span>
                      </label>
                      <input 
                        type="email"
                        required
                        disabled={isSubmitting}
                        value={formData.email}
                        onChange={(e) => {
                          setFormData(p => ({ ...p, email: e.target.value }));
                          if (fieldErrors.email) setFieldErrors(p => ({ ...p, email: '' }));
                        }}
                        placeholder="name@company.com"
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825] bg-white transition-all ${
                          fieldErrors.email ? 'border-red-400 bg-red-50/20' : 'border-[#E2E8F0]'
                        }`}
                      />
                      {fieldErrors.email && (
                        <p className="text-red-600 text-xs mt-1 font-medium">{fieldErrors.email}</p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-[#1E293B] font-medium mb-1 text-xs uppercase tracking-wider font-mono">
                        Phone Number
                      </label>
                      <input 
                        type="tel"
                        disabled={isSubmitting}
                        value={formData.phone}
                        onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E8F0] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825] bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-[#1E293B] font-medium mb-1 text-xs uppercase tracking-wider font-mono">
                      Subject / Service Enquiry <span className="text-[#B62825]">*</span>
                    </label>
                    <input 
                      type="text"
                      required
                      disabled={isSubmitting}
                      value={formData.subject}
                      onChange={(e) => {
                        setFormData(p => ({ ...p, subject: e.target.value }));
                        if (fieldErrors.subject) setFieldErrors(p => ({ ...p, subject: '' }));
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825] bg-white transition-all ${
                        fieldErrors.subject ? 'border-red-400 bg-red-50/20' : 'border-[#E2E8F0]'
                      }`}
                    />
                    {fieldErrors.subject && (
                      <p className="text-red-600 text-xs mt-1 font-medium">{fieldErrors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[#1E293B] font-medium mb-1 text-xs uppercase tracking-wider font-mono">
                      Message / Enquiry Details <span className="text-[#B62825]">*</span>
                    </label>
                    <textarea 
                      rows={4}
                      required
                      disabled={isSubmitting}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData(p => ({ ...p, message: e.target.value }));
                        if (fieldErrors.message) setFieldErrors(p => ({ ...p, message: '' }));
                      }}
                      placeholder="Share cargo dimensions, container stuffing schedules, lashing specifications, or site locations..."
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-[14px] focus:outline-none focus:ring-2 focus:ring-[#B62825] bg-white transition-all ${
                        fieldErrors.message ? 'border-red-400 bg-red-50/20' : 'border-[#E2E8F0]'
                      }`}
                    />
                    {fieldErrors.message && (
                      <p className="text-red-600 text-xs mt-1 font-medium">{fieldErrors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary py-3.5 px-7 text-[14px] rounded-xl inline-flex items-center justify-center gap-2 shadow-md disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message to MSK Desk</span>
                        </>
                      )}
                    </button>
                    <span className="block text-xs text-[#94A3B8] mt-2 font-mono">
                      Recipient: info@msklogisticsolution.com • Direct Routing
                    </span>
                  </div>
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
                  {COMPANY_DETAILS.address}
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
