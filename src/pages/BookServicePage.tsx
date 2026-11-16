import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  CalendarCheck,
  Check,
  CheckCircle2,
  Clock,
  ImagePlus,
  MessageCircle,
  Phone,
  Trash2,
} from 'lucide-react';
import { BUSINESS, SERVICES, type ServiceId } from '../data/business';
import { MEDIA } from '../data/media';
import {
  buildBookingWhatsAppUrl,
  getCombinedSelectedServices,
  getServiceTitles,
  validateBookingForm,
  type BookingFormData,
  type ValidationErrors,
} from '../utils/booking';
import { PageMeta } from '../components/PageMeta';
import { PageHero } from '../components/PageHero';

const TIME_WINDOWS = [
  'Morning (9:00 AM – 12:00 PM)',
  'Afternoon (12:00 PM – 4:00 PM)',
  'Evening (4:00 PM – 8:00 PM)',
  'Night / Urgent Enquiry (Coordinate via Call)',
];

const AREA_OPTIONS = [
  'Bahria Town',
  'Rawalpindi',
  'Islamabad',
  'Nearby Surrounding Area (Subject to Confirmation)',
];

interface UploadedPreview {
  name: string;
  previewUrl: string;
}

export function BookServicePage() {
  const [searchParams] = useSearchParams();
  const initialServiceParam = searchParams.get('service') as ServiceId | null;
  const initialAreaParam = searchParams.get('area');

  const validInitialService = SERVICES.some((s) => s.id === initialServiceParam)
    ? (initialServiceParam as ServiceId)
    : '';

  const [form, setForm] = useState<BookingFormData>({
    fullName: '',
    phoneNumber: '',
    whatsappNumber: '',
    email: '',
    serviceAddress: '',
    area: initialAreaParam || 'Bahria Town',
    primaryService: validInitialService,
    additionalServices: [],
    preferredDate: '',
    preferredTime: TIME_WINDOWS[0],
    problemDescription: '',
    imageNames: [],
  });

  const [previews, setPreviews] = useState<UploadedPreview[]>([]);
  const [errors, setErrors] = useState<ValidationErrors<BookingFormData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [resultState, setResultState] = useState<{
    mode: 'recorded' | 'whatsapp-handoff';
    referenceId?: string;
    whatsappUrl: string;
    submittedSummary: BookingFormData;
  } | null>(null);

  const selectedServiceIds = useMemo(
    () =>
      getCombinedSelectedServices(form.primaryService, form.additionalServices),
    [form.primaryService, form.additionalServices]
  );

  const selectedServiceNames = useMemo(
    () => getServiceTitles(selectedServiceIds),
    [selectedServiceIds]
  );

  const updateField = <K extends keyof BookingFormData>(
    key: K,
    value: BookingFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const toggleAdditionalService = (id: ServiceId) => {
    setForm((prev) => {
      const exists = prev.additionalServices.includes(id);
      const nextAdditional = exists
        ? prev.additionalServices.filter((s) => s !== id)
        : [...prev.additionalServices, id];
      return { ...prev, additionalServices: nextAdditional };
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 4);
    const nextPreviews: UploadedPreview[] = files.map((file) => ({
      name: file.name,
      previewUrl: URL.createObjectURL(file),
    }));
    setPreviews((prev) => {
      const merged = [...prev, ...nextPreviews].slice(0, 4);
      updateField(
        'imageNames',
        merged.map((m) => m.name)
      );
      return merged;
    });
  };

  const removePreview = (index: number) => {
    setPreviews((prev) => {
      const next = prev.filter((_, idx) => idx !== index);
      updateField(
        'imageNames',
        next.map((m) => m.name)
      );
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage('');

    const validation = validateBookingForm(form);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setSubmitting(true);
    const fallbackWhatsApp = buildBookingWhatsAppUrl(form);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const data = (await response.json()) as {
          recorded: boolean;
          booking: { id: string };
          whatsappUrl: string;
        };
        setResultState({
          mode: 'recorded',
          referenceId: data.booking.id,
          whatsappUrl: data.whatsappUrl || fallbackWhatsApp,
          submittedSummary: { ...form },
        });
      } else {
        const errData = (await response.json().catch(() => ({}))) as {
          errors?: ValidationErrors<BookingFormData>;
          error?: string;
        };
        if (errData.errors) {
          setErrors(errData.errors);
        } else {
          setSubmitMessage(
            errData.error ||
              'Server recording was unavailable. Please complete your request via the WhatsApp handoff below.'
          );
          setResultState({
            mode: 'whatsapp-handoff',
            whatsappUrl: fallbackWhatsApp,
            submittedSummary: { ...form },
          });
        }
      }
    } catch {
      setResultState({
        mode: 'whatsapp-handoff',
        whatsappUrl: fallbackWhatsApp,
        submittedSummary: { ...form },
      });
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setResultState(null);
    setErrors({});
    setSubmitMessage('');
    setPreviews([]);
    setForm({
      fullName: '',
      phoneNumber: '',
      whatsappNumber: '',
      email: '',
      serviceAddress: '',
      area: 'Bahria Town',
      primaryService: '',
      additionalServices: [],
      preferredDate: '',
      preferredTime: TIME_WINDOWS[0],
      problemDescription: '',
      imageNames: [],
    });
  };

  return (
    <div>
      <PageMeta
        title="Book a Service — Request Home Maintenance | HOME FIXER"
        description="Book plumbing, electrical, painting, AC servicing, or general home maintenance with HOME FIXER. Request multiple services in one booking."
        path="/book-a-service"
      />

      <PageHero
        kicker="Service Request"
        title="Book a Home Maintenance Service"
        description="Select one or multiple services, enter your location and preferred timing, and review your request before submitting."
        image={MEDIA.heroPlumbing}
        imageAlt="Plumber preparing residential fittings"
        breadcrumbLabel="Book a Service"
      />

      <section className="py-16 lg:py-24 surface-light-pearl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {resultState ? (
            <div
              role="status"
              className="max-w-3xl mx-auto card-pearl-sheen rounded-xl p-8 sm:p-10 space-y-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#142B45] text-[#F28C28] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#142B45]">
                    {resultState.mode === 'recorded'
                      ? 'Service Request Recorded'
                      : 'Ready for WhatsApp Handoff'}
                  </h2>
                  {resultState.referenceId && (
                    <p className="mt-1 text-sm font-bold text-[#F28C28] tabular-nums">
                      Booking Reference: {resultState.referenceId}
                    </p>
                  )}
                  <p className="mt-2 text-sm sm:text-base text-[#202A35]/85 leading-relaxed">
                    {resultState.mode === 'recorded'
                      ? 'Your booking request has been saved in our system. To connect directly with our team or share photos right away, open the pre-filled WhatsApp message below.'
                      : 'We could not confirm server recording, so we have prepared a complete WhatsApp handoff containing all of your booking details.'}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-lg bg-[#F8F8F5] border border-slate-200 space-y-2.5 text-sm text-[#202A35]">
                <p>
                  <span className="font-semibold text-[#142B45]">Services: </span>
                  {getServiceTitles(
                    getCombinedSelectedServices(
                      resultState.submittedSummary.primaryService,
                      resultState.submittedSummary.additionalServices
                    )
                  ).join(', ')}
                </p>
                <p>
                  <span className="font-semibold text-[#142B45]">Customer: </span>
                  {resultState.submittedSummary.fullName} (
                  {resultState.submittedSummary.phoneNumber})
                </p>
                <p>
                  <span className="font-semibold text-[#142B45]">Location: </span>
                  {resultState.submittedSummary.area} —{' '}
                  {resultState.submittedSummary.serviceAddress}
                </p>
                <p>
                  <span className="font-semibold text-[#142B45]">Preferred Slot: </span>
                  {resultState.submittedSummary.preferredDate} ·{' '}
                  {resultState.submittedSummary.preferredTime}
                </p>
                <p>
                  <span className="font-semibold text-[#142B45]">Problem Notes: </span>
                  {resultState.submittedSummary.problemDescription}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={resultState.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-md bg-[#25D366] hover:bg-[#1fb858] text-[#0b2917] font-bold text-sm sm:text-base transition-colors"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  <span>Send Details on WhatsApp</span>
                </a>

                <a
                  href={BUSINESS.phoneHref}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-md bg-[#142B45] text-white font-semibold text-sm sm:text-base hover:bg-[#202A35] transition-colors tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#F28C28]" aria-hidden="true" />
                  <span>Call {BUSINESS.phoneDisplay}</span>
                </a>

                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-3.5 rounded-md border border-slate-300 text-[#142B45] font-semibold text-sm hover:border-[#142B45] transition-colors"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Booking Form */}
              <form
                onSubmit={handleSubmit}
                noValidate
                className="lg:col-span-8 card-pearl-sheen rounded-xl p-6 sm:p-10 space-y-8"
              >
                {submitMessage && (
                  <div
                    role="alert"
                    className="p-4 rounded-md bg-amber-50 border border-amber-200 text-sm text-amber-900"
                  >
                    {submitMessage}
                  </div>
                )}

                {/* Step 1: Select Primary & Additional Services */}
                <fieldset className="space-y-4">
                  <legend className="font-display text-xl font-bold text-[#142B45]">
                    1. Select Services
                  </legend>

                  <div>
                    <label
                      htmlFor="primary-service"
                      className="block text-sm font-semibold text-[#142B45] mb-1.5"
                    >
                      Primary Service <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="primary-service"
                      value={form.primaryService}
                      onChange={(e) =>
                        updateField(
                          'primaryService',
                          e.target.value as ServiceId | ''
                        )
                      }
                      className="w-full px-4 py-3 rounded-md border border-slate-300 bg-white text-[#202A35] text-sm focus:outline-none focus:border-[#142B45] focus:ring-2 focus:ring-[#142B45]/15"
                    >
                      <option value="">Choose a primary service...</option>
                      {SERVICES.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                    {errors.primaryService && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.primaryService}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="block text-sm font-semibold text-[#142B45] mb-2">
                      Add Additional Services (Optional — Multi-Service Support)
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {SERVICES.map((service) => {
                        const isPrimary = form.primaryService === service.id;
                        const isChecked =
                          isPrimary ||
                          form.additionalServices.includes(service.id);
                        return (
                          <button
                            key={service.id}
                            type="button"
                            disabled={isPrimary}
                            onClick={() => toggleAdditionalService(service.id)}
                            aria-pressed={isChecked}
                            className={`flex items-center justify-between gap-3 px-4 py-3 rounded-md border text-left text-sm transition-all ${
                              isChecked
                                ? 'btn-dark-shiny border-transparent text-white shadow-sm'
                                : 'bg-white/85 border-slate-200 text-slate-800 hover:border-[#0F233F]'
                            } ${isPrimary ? 'opacity-85 cursor-default' : ''}`}
                          >
                            <span className="font-medium">
                              {service.title}
                              {isPrimary ? ' (Primary)' : ''}
                            </span>
                            {isChecked && (
                              <Check
                                className="w-4 h-4 text-[#F28C28] shrink-0"
                                aria-hidden="true"
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </fieldset>

                {/* Step 2: Contact Information */}
                <fieldset className="pt-6 border-t border-slate-200 space-y-4">
                  <legend className="font-display text-xl font-bold text-[#142B45]">
                    2. Contact Information
                  </legend>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="booking-name"
                        className="block text-sm font-semibold text-[#142B45] mb-1.5"
                      >
                        Full Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        value={form.fullName}
                        onChange={(e) => updateField('fullName', e.target.value)}
                        placeholder="Enter your full name"
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
                        htmlFor="booking-phone"
                        className="block text-sm font-semibold text-[#142B45] mb-1.5"
                      >
                        Phone Number <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="booking-phone"
                        type="tel"
                        value={form.phoneNumber}
                        onChange={(e) =>
                          updateField('phoneNumber', e.target.value)
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

                    <div>
                      <label
                        htmlFor="booking-whatsapp"
                        className="block text-sm font-semibold text-[#142B45] mb-1.5"
                      >
                        WhatsApp Number (Optional)
                      </label>
                      <input
                        id="booking-whatsapp"
                        type="tel"
                        value={form.whatsappNumber}
                        onChange={(e) =>
                          updateField('whatsappNumber', e.target.value)
                        }
                        placeholder="If different from phone number"
                        className="w-full px-4 py-2.5 rounded-md border border-slate-300 bg-white text-[#202A35] text-sm focus:outline-none focus:border-[#142B45] focus:ring-2 focus:ring-[#142B45]/15"
                      />
                      {errors.whatsappNumber && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.whatsappNumber}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="booking-email"
                        className="block text-sm font-semibold text-[#142B45] mb-1.5"
                      >
                        Email (Optional)
                      </label>
                      <input
                        id="booking-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 rounded-md border border-slate-300 bg-white text-[#202A35] text-sm focus:outline-none focus:border-[#142B45] focus:ring-2 focus:ring-[#142B45]/15"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                </fieldset>

                {/* Step 3: Location & Schedule */}
                <fieldset className="pt-6 border-t border-slate-200 space-y-4">
                  <legend className="font-display text-xl font-bold text-[#142B45]">
                    3. Service Location &amp; Preferred Timing
                  </legend>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="booking-area"
                        className="block text-sm font-semibold text-[#142B45] mb-1.5"
                      >
                        Area / Location <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="booking-area"
                        value={form.area}
                        onChange={(e) => updateField('area', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-md border border-slate-300 bg-white text-[#202A35] text-sm focus:outline-none focus:border-[#142B45] focus:ring-2 focus:ring-[#142B45]/15"
                      >
                        {AREA_OPTIONS.map((area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                      {errors.area && (
                        <p className="mt-1 text-xs text-red-600">{errors.area}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="booking-address"
                        className="block text-sm font-semibold text-[#142B45] mb-1.5"
                      >
                        Service Address <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="booking-address"
                        type="text"
                        value={form.serviceAddress}
                        onChange={(e) =>
                          updateField('serviceAddress', e.target.value)
                        }
                        placeholder="House / Flat #, Street, Phase / Sector"
                        className="w-full px-4 py-2.5 rounded-md border border-slate-300 bg-white text-[#202A35] text-sm focus:outline-none focus:border-[#142B45] focus:ring-2 focus:ring-[#142B45]/15"
                      />
                      {errors.serviceAddress && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.serviceAddress}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="booking-date"
                        className="block text-sm font-semibold text-[#142B45] mb-1.5"
                      >
                        Preferred Date <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="booking-date"
                        type="date"
                        value={form.preferredDate}
                        onChange={(e) =>
                          updateField('preferredDate', e.target.value)
                        }
                        className="w-full px-4 py-2.5 rounded-md border border-slate-300 bg-white text-[#202A35] text-sm focus:outline-none focus:border-[#142B45] focus:ring-2 focus:ring-[#142B45]/15"
                      />
                      {errors.preferredDate && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.preferredDate}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="booking-time"
                        className="block text-sm font-semibold text-[#142B45] mb-1.5"
                      >
                        Preferred Time <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="booking-time"
                        value={form.preferredTime}
                        onChange={(e) =>
                          updateField('preferredTime', e.target.value)
                        }
                        className="w-full px-4 py-2.5 rounded-md border border-slate-300 bg-white text-[#202A35] text-sm focus:outline-none focus:border-[#142B45] focus:ring-2 focus:ring-[#142B45]/15"
                      >
                        {TIME_WINDOWS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                      {errors.preferredTime && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.preferredTime}
                        </p>
                      )}
                    </div>
                  </div>
                </fieldset>

                {/* Step 4: Describe the Problem & Optional Photos */}
                <fieldset className="pt-6 border-t border-slate-200 space-y-4">
                  <legend className="font-display text-xl font-bold text-[#142B45]">
                    4. Describe the Problem &amp; Photos
                  </legend>

                  <div>
                    <label
                      htmlFor="booking-description"
                      className="block text-sm font-semibold text-[#142B45] mb-1.5"
                    >
                      Describe the Problem <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="booking-description"
                      rows={4}
                      value={form.problemDescription}
                      onChange={(e) =>
                        updateField('problemDescription', e.target.value)
                      }
                      placeholder="Briefly describe what needs fixing or servicing..."
                      className="w-full px-4 py-2.5 rounded-md border border-slate-300 bg-white text-[#202A35] text-sm focus:outline-none focus:border-[#142B45] focus:ring-2 focus:ring-[#142B45]/15"
                    />
                    {errors.problemDescription && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.problemDescription}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="booking-photos"
                      className="block text-sm font-semibold text-[#142B45] mb-1.5"
                    >
                      Upload Images (Optional, up to 4 photos)
                    </label>
                    <label
                      htmlFor="booking-photos"
                      className="flex items-center justify-center gap-2.5 px-4 py-4 rounded-md border border-dashed border-slate-300 bg-[#F8F8F5] hover:border-[#142B45] cursor-pointer text-sm text-[#142B45] font-medium transition-colors"
                    >
                      <ImagePlus
                        className="w-5 h-5 text-[#F28C28]"
                        aria-hidden="true"
                      />
                      <span>Select photos of the issue (optional)</span>
                      <input
                        id="booking-photos"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="sr-only"
                      />
                    </label>

                    {previews.length > 0 && (
                      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {previews.map((item, idx) => (
                          <div
                            key={`${item.name}-${idx}`}
                            className="relative rounded-md overflow-hidden border border-slate-200 aspect-square bg-slate-100"
                          >
                            <img
                              src={item.previewUrl}
                              alt={`Uploaded preview ${item.name}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removePreview(idx)}
                              aria-label={`Remove ${item.name}`}
                              className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-[#142B45]/85 text-white inline-flex items-center justify-center hover:bg-red-600"
                            >
                              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </fieldset>

                <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-shiny shine-hover inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-md disabled:opacity-60 font-bold text-base"
                  >
                    <CalendarCheck className="w-5 h-5" aria-hidden="true" />
                    <span>
                      {submitting
                        ? 'Recording Request...'
                        : 'Submit Service Request'}
                    </span>
                  </button>

                  <p className="text-xs text-slate-600">
                    Appointment timing is confirmed directly with our team.
                  </p>
                </div>
              </form>

              {/* Live Request Review Sidebar */}
              <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                <div className="surface-dark-luxe text-white rounded-xl border border-white/15 p-7 space-y-5 shadow-xl">
                  <div>
                    <p className="text-xs font-bold text-gradient-gold inline-block mb-1">
                      Request Summary
                    </p>
                    <h2 className="font-display text-xl font-bold">
                      Review Your Selection
                    </h2>
                  </div>

                  <div className="space-y-3 text-sm border-t border-white/15 pt-4">
                    <div>
                      <span className="text-slate-400 text-xs block">
                        Selected Services
                      </span>
                      <span className="font-medium text-white">
                        {selectedServiceNames.length > 0
                          ? selectedServiceNames.join(', ')
                          : 'None selected yet'}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 text-xs block">Area</span>
                      <span className="font-medium text-white">
                        {form.area || 'Not selected'}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 text-xs block">
                        Preferred Date &amp; Time
                      </span>
                      <span className="font-medium text-white">
                        {form.preferredDate
                          ? `${form.preferredDate} · ${form.preferredTime}`
                          : 'Choose a preferred date'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/15 space-y-2.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Clock
                        className="w-4 h-4 text-[#F28C28] shrink-0"
                        aria-hidden="true"
                      />
                      <span>{BUSINESS.hours}</span>
                    </div>
                    <p>
                      Need immediate assistance? Call{' '}
                      <a
                        href={BUSINESS.phoneHref}
                        className="text-white font-bold underline tabular-nums"
                      >
                        {BUSINESS.phoneDisplay}
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
