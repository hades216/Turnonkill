import { BUSINESS, SERVICES, type ServiceId } from '../data/business';

export interface BookingFormData {
  fullName: string;
  phoneNumber: string;
  whatsappNumber: string;
  email: string;
  serviceAddress: string;
  area: string;
  primaryService: ServiceId | '';
  additionalServices: ServiceId[];
  preferredDate: string;
  preferredTime: string;
  problemDescription: string;
  imageNames: string[];
}

export interface ContactFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  area: string;
  message: string;
}

export type ValidationErrors<T> = Partial<Record<keyof T, string>>;

export function normalizePhoneDigits(raw: string): string {
  return raw.replace(/[^\d+]/g, '');
}

export function isValidPhone(raw: string): boolean {
  const digits = raw.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

export function isValidEmail(raw: string): boolean {
  if (!raw.trim()) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw.trim());
}

export function getCombinedSelectedServices(
  primaryService: ServiceId | '',
  additionalServices: ServiceId[]
): ServiceId[] {
  const result: ServiceId[] = [];
  if (primaryService) {
    result.push(primaryService);
  }
  for (const svc of additionalServices) {
    if (!result.includes(svc)) {
      result.push(svc);
    }
  }
  return result;
}

export function getServiceTitles(serviceIds: ServiceId[]): string[] {
  return serviceIds.map((id) => {
    const match = SERVICES.find((s) => s.id === id);
    return match ? match.title : id;
  });
}

export function validateBookingForm(data: BookingFormData): {
  isValid: boolean;
  errors: ValidationErrors<BookingFormData>;
} {
  const errors: ValidationErrors<BookingFormData> = {};

  if (!data.fullName.trim() || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }
  if (!data.phoneNumber.trim() || !isValidPhone(data.phoneNumber)) {
    errors.phoneNumber = 'Please enter a valid phone number (10 to 15 digits).';
  }
  if (data.whatsappNumber.trim() && !isValidPhone(data.whatsappNumber)) {
    errors.whatsappNumber = 'Please enter a valid WhatsApp number or leave this optional field blank.';
  }
  if (data.email.trim() && !isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address or leave it blank.';
  }
  if (!data.area.trim()) {
    errors.area = 'Please select your area or location.';
  }
  if (!data.serviceAddress.trim() || data.serviceAddress.trim().length < 6) {
    errors.serviceAddress = 'Please enter your complete street/house service address.';
  }
  if (!data.primaryService) {
    errors.primaryService = 'Please choose a primary service.';
  }
  if (!data.preferredDate.trim()) {
    errors.preferredDate = 'Please choose a preferred date.';
  }
  if (!data.preferredTime.trim()) {
    errors.preferredTime = 'Please choose a preferred time window.';
  }
  if (!data.problemDescription.trim() || data.problemDescription.trim().length < 8) {
    errors.problemDescription = 'Please briefly describe what needs repair or servicing.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateContactForm(data: ContactFormData): {
  isValid: boolean;
  errors: ValidationErrors<ContactFormData>;
} {
  const errors: ValidationErrors<ContactFormData> = {};

  if (!data.fullName.trim() || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }
  if (!data.phoneNumber.trim() || !isValidPhone(data.phoneNumber)) {
    errors.phoneNumber = 'Please enter a valid phone number (10 to 15 digits).';
  }
  if (data.email.trim() && !isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address or leave it blank.';
  }
  if (!data.message.trim() || data.message.trim().length < 8) {
    errors.message = 'Please enter a brief message describing how we can help.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildGeneralWhatsAppUrl(customMessage?: string): string {
  const text =
    customMessage?.trim() ||
    'Hello HOME FIXER, I would like to request a home maintenance service. Please contact me.';
  return `${BUSINESS.whatsappBaseUrl}?text=${encodeURIComponent(text)}`;
}

export function buildBookingWhatsAppUrl(
  data: BookingFormData,
  referenceId?: string
): string {
  const combinedIds = getCombinedSelectedServices(
    data.primaryService,
    data.additionalServices
  );
  const serviceNames = getServiceTitles(combinedIds);

  const lines: string[] = [
    'Hello HOME FIXER, I would like to book a home maintenance service.',
  ];
  if (referenceId) {
    lines.push(`Booking Reference: ${referenceId}`);
  }
  lines.push(`Services Requested: ${serviceNames.join(', ') || 'Not specified'}`);
  lines.push(`Name: ${data.fullName.trim()}`);
  lines.push(`Phone: ${data.phoneNumber.trim()}`);
  if (data.whatsappNumber.trim()) {
    lines.push(`WhatsApp: ${data.whatsappNumber.trim()}`);
  }
  if (data.email.trim()) {
    lines.push(`Email: ${data.email.trim()}`);
  }
  lines.push(`Area: ${data.area.trim()}`);
  lines.push(`Service Address: ${data.serviceAddress.trim()}`);
  lines.push(`Preferred Date & Time: ${data.preferredDate} (${data.preferredTime})`);
  lines.push(`Issue Description: ${data.problemDescription.trim()}`);
  if (data.imageNames.length > 0) {
    lines.push(
      `Photos Noted (${data.imageNames.length}): ${data.imageNames.join(', ')} (will attach in chat if needed)`
    );
  }

  return `${BUSINESS.whatsappBaseUrl}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export function buildContactWhatsAppUrl(data: ContactFormData): string {
  const lines = [
    'Hello HOME FIXER, I have an enquiry from your website.',
    `Name: ${data.fullName.trim()}`,
    `Phone: ${data.phoneNumber.trim()}`,
  ];
  if (data.area.trim()) {
    lines.push(`Area: ${data.area.trim()}`);
  }
  if (data.email.trim()) {
    lines.push(`Email: ${data.email.trim()}`);
  }
  lines.push(`Message: ${data.message.trim()}`);
  return `${BUSINESS.whatsappBaseUrl}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export function filterGalleryItems<T extends { category: string }>(
  items: T[],
  selectedCategory: string
): T[] {
  if (!selectedCategory || selectedCategory === 'All') {
    return items;
  }
  return items.filter((item) => item.category === selectedCategory);
}
