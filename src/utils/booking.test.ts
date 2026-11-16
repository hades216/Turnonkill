import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildBookingWhatsAppUrl,
  buildGeneralWhatsAppUrl,
  filterGalleryItems,
  getCombinedSelectedServices,
  validateBookingForm,
  validateContactForm,
  type BookingFormData,
} from './booking';

const validBooking: BookingFormData = {
  fullName: 'Tariq Mahmood',
  phoneNumber: '0342 0520846',
  whatsappNumber: '03420520846',
  email: 'tariq@example.com',
  serviceAddress: 'House 14, Street 6, Phase 7',
  area: 'Bahria Town',
  primaryService: 'plumbing',
  additionalServices: ['ac', 'plumbing'],
  preferredDate: '2026-11-20',
  preferredTime: 'Morning (9:00 AM – 12:00 PM)',
  problemDescription: 'Kitchen sink drain pipe is leaking under the cabinet.',
  imageNames: ['sink-leak.jpg'],
};

test('validateBookingForm rejects empty required fields with clear messages', () => {
  const result = validateBookingForm({
    fullName: '',
    phoneNumber: '123',
    whatsappNumber: '',
    email: 'invalid-email',
    serviceAddress: '',
    area: '',
    primaryService: '',
    additionalServices: [],
    preferredDate: '',
    preferredTime: '',
    problemDescription: 'short',
    imageNames: [],
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.phoneNumber);
  assert.ok(result.errors.email);
  assert.ok(result.errors.serviceAddress);
  assert.ok(result.errors.area);
  assert.ok(result.errors.primaryService);
  assert.ok(result.errors.preferredDate);
  assert.ok(result.errors.preferredTime);
  assert.ok(result.errors.problemDescription);
});

test('validateBookingForm accepts complete multi-service request', () => {
  const result = validateBookingForm(validBooking);
  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test('getCombinedSelectedServices deduplicates primary and additional services', () => {
  const combined = getCombinedSelectedServices('plumbing', ['ac', 'plumbing', 'electrical']);
  assert.deepEqual(combined, ['plumbing', 'ac', 'electrical']);
});

test('buildBookingWhatsAppUrl encodes all fields and correct international number', () => {
  const url = buildBookingWhatsAppUrl(validBooking, 'HF-1001');
  assert.ok(url.startsWith('https://wa.me/923420520846?text='));
  const decoded = decodeURIComponent(url.split('?text=')[1]);
  assert.match(decoded, /Booking Reference: HF-1001/);
  assert.match(decoded, /Plumbing Services, AC Services/);
  assert.match(decoded, /Tariq Mahmood/);
  assert.match(decoded, /Bahria Town/);
  assert.match(decoded, /House 14, Street 6, Phase 7/);
});

test('buildGeneralWhatsAppUrl uses verified default greeting', () => {
  const url = buildGeneralWhatsAppUrl();
  assert.ok(url.startsWith('https://wa.me/923420520846?text='));
  const decoded = decodeURIComponent(url.split('?text=')[1]);
  assert.match(decoded, /Hello HOME FIXER/);
});

test('validateContactForm validates name, phone, optional email, and message', () => {
  const bad = validateContactForm({
    fullName: 'A',
    phoneNumber: '999',
    email: 'bad',
    area: 'Islamabad',
    message: 'Hi',
  });
  assert.equal(bad.isValid, false);
  assert.ok(bad.errors.fullName);
  assert.ok(bad.errors.phoneNumber);
  assert.ok(bad.errors.email);
  assert.ok(bad.errors.message);

  const good = validateContactForm({
    fullName: 'Sana Khan',
    phoneNumber: '03001234567',
    email: '',
    area: 'Rawalpindi',
    message: 'Need ceiling lighting troubleshooting in two bedrooms.',
  });
  assert.equal(good.isValid, true);
});

test('filterGalleryItems filters accurately by category and returns all for All', () => {
  const sample = [
    { id: '1', category: 'Plumbing' },
    { id: '2', category: 'Electrical' },
    { id: '3', category: 'Plumbing' },
  ];
  assert.equal(filterGalleryItems(sample, 'All').length, 3);
  assert.equal(filterGalleryItems(sample, 'Plumbing').length, 2);
  assert.equal(filterGalleryItems(sample, 'AC Services').length, 0);
});
