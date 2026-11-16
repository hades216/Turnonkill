import fs from 'node:fs/promises';
import path from 'node:path';
import {
  buildBookingWhatsAppUrl,
  buildContactWhatsAppUrl,
  getCombinedSelectedServices,
  validateBookingForm,
  validateContactForm,
  type BookingFormData,
  type ContactFormData,
} from '../../src/utils/booking';
import { BUSINESS } from '../../src/data/business';

interface GeocodedLocation {
  label: string;
  address: string;
  lat: number;
  lng: number;
  formattedAddress: string;
}

interface GeocodedCacheEntry {
  expiresAt: number;
  hq: GeocodedLocation | null;
  areas: GeocodedLocation[];
  quotaExceeded: boolean;
}

let geocodeCache: GeocodedCacheEntry | null = null;

const TMP_DIR = '/tmp/homefixer-data';

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

async function appendTempRecord<T>(filename: string, record: T): Promise<void> {
  try {
    await fs.mkdir(TMP_DIR, { recursive: true });
    const filePath = path.join(TMP_DIR, filename);
    let existing: T[] = [];
    try {
      const raw = await fs.readFile(filePath, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        existing = parsed as T[];
      }
    } catch {
      existing = [];
    }
    existing.unshift(record);
    await fs.writeFile(filePath, JSON.stringify(existing, null, 2), 'utf-8');
  } catch {
    // Ephemeral /tmp storage is best-effort in serverless environments
  }
}

async function geocodeAddress(
  label: string,
  address: string,
  apiKey: string
): Promise<{ location: GeocodedLocation | null; quotaExceeded: boolean }> {
  const url = new URL('https://maps.googleapis.com/maps/api/geocode/json');
  url.searchParams.set('address', address);
  url.searchParams.set('key', apiKey);

  const response = await fetch(url.toString());
  const data = (await response.json()) as {
    status?: string;
    results?: Array<{
      formatted_address?: string;
      geometry?: { location?: { lat: number; lng: number } };
    }>;
  };

  if (
    response.status === 429 ||
    data.status === 'OVER_QUERY_LIMIT' ||
    data.status === 'OVER_DAILY_LIMIT'
  ) {
    return { location: null, quotaExceeded: true };
  }

  const first = data.results?.[0];
  const loc = first?.geometry?.location;
  if (data.status === 'OK' && loc) {
    return {
      location: {
        label,
        address,
        lat: loc.lat,
        lng: loc.lng,
        formattedAddress: first.formatted_address || address,
      },
      quotaExceeded: false,
    };
  }
  return { location: null, quotaExceeded: false };
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204 });
  }

  const url = new URL(req.url);
  const route = url.pathname.replace(/^\/(\.netlify\/functions\/api|api)/, '') || '/';

  if (req.method === 'GET' && route === '/health') {
    return jsonResponse({ ok: true, service: BUSINESS.name, runtime: 'netlify' });
  }

  if (req.method === 'GET' && route === '/maps/config') {
    const apiKey =
      process.env.GOOGLE_MAPS_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY || '';
    return jsonResponse({
      hasKey: Boolean(apiKey),
      apiKey,
    });
  }

  if (req.method === 'GET' && route === '/maps/locations') {
    const apiKey =
      process.env.GOOGLE_MAPS_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY || '';
    if (!apiKey) {
      return jsonResponse({
        geocoded: false,
        hq: null,
        areas: [],
        quotaExceeded: false,
      });
    }

    const now = Date.now();
    if (geocodeCache && geocodeCache.expiresAt > now) {
      return jsonResponse({
        geocoded: Boolean(geocodeCache.hq),
        hq: geocodeCache.hq,
        areas: geocodeCache.areas,
        quotaExceeded: geocodeCache.quotaExceeded,
      });
    }

    try {
      const hqResult = await geocodeAddress('HOME FIXER', BUSINESS.address, apiKey);
      let quotaExceeded = hqResult.quotaExceeded;
      const areas: GeocodedLocation[] = [];

      if (!quotaExceeded) {
        const areaTargets = [
          { label: 'Bahria Town', address: 'Bahria Town, Rawalpindi, Pakistan' },
          { label: 'Rawalpindi', address: 'Rawalpindi, Pakistan' },
          { label: 'Islamabad', address: 'Islamabad, Pakistan' },
        ];
        for (const target of areaTargets) {
          const r = await geocodeAddress(target.label, target.address, apiKey);
          if (r.quotaExceeded) {
            quotaExceeded = true;
            break;
          }
          if (r.location) {
            areas.push(r.location);
          }
        }
      }

      if (!quotaExceeded && hqResult.location) {
        geocodeCache = {
          expiresAt: now + 24 * 60 * 60 * 1000,
          hq: hqResult.location,
          areas,
          quotaExceeded: false,
        };
      }

      return jsonResponse({
        geocoded: Boolean(hqResult.location),
        hq: hqResult.location,
        areas,
        quotaExceeded,
      });
    } catch {
      return jsonResponse({
        geocoded: false,
        hq: null,
        areas: [],
        quotaExceeded: false,
      });
    }
  }

  if (req.method === 'POST' && route === '/bookings') {
    let payload: BookingFormData;
    try {
      payload = (await req.json()) as BookingFormData;
    } catch {
      return jsonResponse({ error: 'Invalid JSON request body.' }, 400);
    }

    const validation = validateBookingForm(payload);
    if (!validation.isValid) {
      return jsonResponse(
        { error: 'Validation failed', errors: validation.errors },
        400
      );
    }

    const referenceId = `HF-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    const record = {
      ...payload,
      id: referenceId,
      createdAt: new Date().toISOString(),
      selectedServices: getCombinedSelectedServices(
        payload.primaryService,
        payload.additionalServices || []
      ),
      status: 'Recorded' as const,
    };

    await appendTempRecord('bookings.json', record);
    const whatsappUrl = buildBookingWhatsAppUrl(payload, referenceId);

    return jsonResponse(
      {
        recorded: true,
        booking: {
          id: record.id,
          createdAt: record.createdAt,
          selectedServices: record.selectedServices,
          area: record.area,
          preferredDate: record.preferredDate,
          preferredTime: record.preferredTime,
          status: record.status,
        },
        whatsappUrl,
      },
      201
    );
  }

  if (req.method === 'POST' && route === '/contact') {
    let payload: ContactFormData;
    try {
      payload = (await req.json()) as ContactFormData;
    } catch {
      return jsonResponse({ error: 'Invalid JSON request body.' }, 400);
    }

    const validation = validateContactForm(payload);
    if (!validation.isValid) {
      return jsonResponse(
        { error: 'Validation failed', errors: validation.errors },
        400
      );
    }

    const referenceId = `INQ-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    const record = {
      ...payload,
      id: referenceId,
      createdAt: new Date().toISOString(),
      status: 'Recorded' as const,
    };

    await appendTempRecord('inquiries.json', record);
    const whatsappUrl = buildContactWhatsAppUrl(payload);

    return jsonResponse(
      {
        recorded: true,
        inquiry: {
          id: record.id,
          createdAt: record.createdAt,
          status: record.status,
        },
        whatsappUrl,
      },
      201
    );
  }

  return jsonResponse({ error: 'API route not found.' }, 404);
}
