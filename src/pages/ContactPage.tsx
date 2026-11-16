import { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Send,
} from 'lucide-react';
import { BUSINESS } from '../data/business';
import { MEDIA } from '../data/media';
import {
  buildContactWhatsAppUrl,
  buildGeneralWhatsAppUrl,
  validateContactForm,
  type ContactFormData,
  type ValidationErrors,
} from '../utils/booking';
import { PageMeta } from '../components/PageMeta';
import { PageHero } from '../components/PageHero';
import { ServiceMapSection } from '../components/ServiceMapSection';

const INITIAL_FORM: ContactFormData = {
  fullName: '',
  phoneNumber: '',
  email: '',
  area: 'Bahria Town',
  message: '',
};

export function ContactPage() {
  const [form, setForm] = useState<ContactFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<ValidationErrors<ContactFormData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [confirmation, setConfirmation] = useState<{
    mode: 'recorded' | 'whatsapp-handoff';
    referenceId?: string;
    whatsappUrl: string;
  } | null>(null);

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    const validation = validateContactForm(form);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setSubmitting(true);
    const fallbackWhatsApp = buildContactWhatsAppUrl(form);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const data = (await response.json()) as {
          recorded: boolean;
          inquiry: { id: string };
          whatsappUrl: string;
        };
        setConfirmation({
          mode: 'recorded',
          referenceId: data.inquiry.id,
          whatsappUrl: data.whatsappUrl || fallbackWhatsApp,
        });
        setForm(INITIAL_FORM);
      } else {
        const errBody = (await response.json().catch(() => ({}))) as {
          errors?: ValidationErrors<ContactFormData>;
          error?: string;
        };
        if (errBody.errors) {
          setErrors(errBody.errors);
        } else {
          setSubmitError(
            errBody.error ||
              'Unable to save enquiry on server. You can hand off directly via WhatsApp below.'
          );
          setConfirmation({
            mode: 'whatsapp-handoff',
            whatsappUrl: fallbackWhatsApp,
          });
        }
      }
    } catch {
      setConfirmation({
        mode: 'whatsapp-handoff',
        whatsappUrl: fallbackWhatsApp,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageMeta
        title="Contact Us — 24-Hour Home Maintenance Support | HOME FIXER"
        description="Contact HOME FIXER at 0342 0520846 (Open 24 Hours) or visit Plaza 88, G-6 Markaz, Islamabad. Send an enquiry or message us on WhatsApp."
        path="/contact"
      />

      <PageHero
        kicker="Contact Us"
        title="Get in Touch With HOME FIXER"
        description="Reach our team 24 hours a day by phone, WhatsApp, or our enquiry form for plumbing, electrical, painting, AC, and general home maintenance."
        image={MEDIA.heroAcComfort}
        imageAlt="HVAC technician servicing a split AC unit"
        breadcrumbLabel="Contact"
      />

      <section className="py-20 lg:py-24 surface-light-pearl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Direct Contact Details */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <p className="text-xs font-bold tracking-wide text-gradient-copper inline-block mb-2">
                  Direct Channels
                </p>
                <h2 className="font-display text-3xl font-bold text-gradient-navy">
                  Talk to Our Team
                </h2>
                <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  Call directly or send a WhatsApp message with photos or
                  details of what needs repair.
                </p>
              </div>

              <div className="space-y-4 card-pearl-sheen p-7 rounded-xl">
                <div className="flex items-start gap-3.5">
                  <Phone
                    className="w-5 h-5 text-[#F28C28] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      Phone Number
                    </p>
                    <a
                      href={BUSINESS.phoneHref}
                      className="text-lg font-bold text-[#142B45] hover:text-[#F28C28] tabular-nums"
                    >
                      {BUSINESS.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-3 border-t border-slate-100">
                  <Clock
                    className="w-5 h-5 text-[#F28C28] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      Operating Hours
                    </p>
                    <p className="text-base font-semibold text-[#142B45]">
                      {BUSINESS.hours}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 pt-3 border-t border-slate-100">
                  <MapPin
                    className="w-5 h-5 text-[#F28C28] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      Business Address
                    </p>
                    <p className="text-sm text-[#202A35] leading-relaxed">
                      {BUSINESS.address}
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <a
                    href={BUSINESS.phoneHref}
                    className="btn-dark-shiny shine-hover inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold"
                  >
                    <Phone className="w-4 h-4 text-[#FFB84D]" aria-hidden="true" />
                    <span>Call Now</span>
                  </a>
                  <a
                    href={buildGeneralWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shine-hover inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-gradient-to-r from-[#34D399] via-[#25D366] to-[#16A34A] text-[#062413] text-sm font-bold shadow-md transition-transform hover:-translate-y-0.5"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>WhatsApp Us</span>
                  </a>
                  <a
                    href={BUSINESS.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-white/85 hover:bg-white border border-slate-200 text-[#0F233F] text-sm font-semibold transition-colors"
                  >
                    <Navigation className="w-4 h-4 text-[#F28C28]" aria-hidden="true" />
                    <span>Directions</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 card-pearl-sheen p-7 sm:p-10 rounded-xl">
              <h2 className="font-display text-2xl font-bold text-gradient-navy mb-2">
                Send an Enquiry
              </h2>
              <p className="text-sm text-slate-600 mb-6">
                Fill in your details below to record an enquiry or hand it off
                directly to our WhatsApp desk.
              </p>

              {confirmation ? (
                <div
                  role="status"
                  className="p-6 rounded-xl bg-[#F8F8F5] border border-slate-200 space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-6 h-6 text-[#142B45] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-display text-lg font-bold text-[#142B45]">
                        {confirmation.mode === 'recorded'
                          ? 'Enquiry Recorded'
                          : 'Continue via WhatsApp Handoff'}
                      </h3>
                      {confirmation.referenceId && (
                        <p className="text-sm font-semibold text-[#F28C28] mt-0.5 tabular-nums">
                          Reference: {confirmation.referenceId}
                        </p>
                      )}
                      <p className="mt-2 text-sm text-[#202A35]/85 leading-relaxed">
                        {confirmation.mode === 'recorded'
                          ? 'Your enquiry has been saved with HOME FIXER. For immediate response, you can also send this pre-filled message on WhatsApp.'
                          : 'Server persistence is currently unavailable, so no confirmation has been faked. Click below to hand off your exact message directly via WhatsApp.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href={confirmation.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-[#25D366] hover:bg-[#1fb858] text-[#0b2917] font-bold text-sm transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Send on WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setConfirmation(null)}
                      className="px-5 py-3 rounded-md bg-white border border-slate-300 text-[#142B45] font-semibold text-sm hover:border-[#142B45] transition-colors"
                    >
                      Send Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {submitError && (
                    <div
                      role="alert"
                      className="p-3.5 rounded-md bg-red-50 border border-red-200 text-sm text-red-800"
                    >
                      {submitError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-semibold text-[#142B45] mb-1.5"
                      >
                        Full Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={form.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        placeholder="Your full name"
                        className="w-full px-4 py-2.5 rounded-md border border-slate-300 bg-white text-[#202A35] text-sm focus:outline-none focus:border-[#142B45] focus:ring-2 focus:ring-[#142B45]/15"
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-sm font-semibold text-[#142B45] mb-1.5"
                      >
                        Phone Number <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={form.phoneNumber}
                        onChange={(e) =>
                          handleChange('phoneNumber', e.target.value)
                        }
                        placeholder="03XX XXXXXXX"
                        className="w-full px-4 py-2.5 rounded-md border border-slate-300 bg-white text-[#202A35] text-sm focus:outline-none focus:border-[#142B45] focus:ring-2 focus:ring-[#142B45]/15"
                      />
                      {errors.phoneNumber && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.phoneNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-semibold text-[#142B45] mb-1.5"
                      >
                        Email (Optional)
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 rounded-md border border-slate-300 bg-white text-[#202A35] text-sm focus:outline-none focus:border-[#142B45] focus:ring-2 focus:ring-[#142B45]/15"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-area"
                        className="block text-sm font-semibold text-[#142B45] mb-1.5"
                      >
                        Area / Location
                      </label>
                      <select
                        id="contact-area"
                        value={form.area}
                        onChange={(e) => handleChange('area', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-md border border-slate-300 bg-white text-[#202A35] text-sm focus:outline-none focus:border-[#142B45] focus:ring-2 focus:ring-[#142B45]/15"
                      >
                        <option value="Bahria Town">Bahria Town</option>
                        <option value="Rawalpindi">Rawalpindi</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Nearby Area (Confirm Availability)">
                          Nearby Area (Confirm Availability)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-semibold text-[#142B45] mb-1.5"
                    >
                      How Can We Help? <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={form.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Describe your plumbing, electrical, painting, AC, or home maintenance question..."
                      className="w-full px-4 py-2.5 rounded-md border border-slate-300 bg-white text-[#202A35] text-sm focus:outline-none focus:border-[#142B45] focus:ring-2 focus:ring-[#142B45]/15"
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-shiny shine-hover inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-md disabled:opacity-60 font-bold text-sm sm:text-base"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>{submitting ? 'Submitting...' : 'Submit Enquiry'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <ServiceMapSection />
    </div>
  );
}
