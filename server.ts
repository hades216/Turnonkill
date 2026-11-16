import 'dotenv/config';
import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createServer as createViteServer } from 'vite';
import {
  buildBookingWhatsAppUrl,
  buildContactWhatsAppUrl,
  getCombinedSelectedServices,
  validateBookingForm,
  validateContactForm,
  type BookingFormData,
  type ContactFormData,
} from './src/utils/booking';
import { BUSINESS } from './src/data/business';

const PORT = Number(process.env.PORT || 3000);
const DATA_DIR = path.resolve(process.cwd(), 'data');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

interface StoredBooking extends BookingFormData {
  id: string;
  createdAt: string;
  selectedServices: string[];
  status: 'Recorded';
}

interface StoredInquiry extends ContactFormData {
  id: string;
  createdAt: string;
  status: 'Recorded';
}

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

async function ensureJsonArray<T>(filePath: string): Promise<T[]> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function appendRecord<T>(filePath: string, record: T): Promise<void> {
  const existing = await ensureJsonArray<T>(filePath);
  existing.unshift(record);
  await fs.writeFile(filePath, JSON.stringify(existing, null, 2), 'utf-8');
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

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '2mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'HOME FIXER' });
  });

  app.get('/api/maps/config', (_req, res) => {
    const apiKey =
      process.env.GOOGLE_MAPS_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY || '';
    res.json({
      hasKey: Boolean(apiKey),
      apiKey,
    });
  });

  app.get('/api/maps/locations', async (_req, res) => {
    const apiKey =
      process.env.GOOGLE_MAPS_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY || '';
    if (!apiKey) {
      res.json({
        geocoded: false,
        hq: null,
        areas: [],
        quotaExceeded: false,
      });
      return;
    }

    const now = Date.now();
    if (geocodeCache && geocodeCache.expiresAt > now) {
      res.json({
        geocoded: Boolean(geocodeCache.hq),
        hq: geocodeCache.hq,
        areas: geocodeCache.areas,
        quotaExceeded: geocodeCache.quotaExceeded,
      });
      return;
    }

    try {
      const hqResult = await geocodeAddress(
        'HOME FIXER',
        BUSINESS.address,
        apiKey
      );
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

      // Cache up to 24h (well within 30-day Maps ToS caching limit)
      if (!quotaExceeded && hqResult.location) {
        geocodeCache = {
          expiresAt: now + 24 * 60 * 60 * 1000,
          hq: hqResult.location,
          areas,
          quotaExceeded: false,
        };
      }

      res.json({
        geocoded: Boolean(hqResult.location),
        hq: hqResult.location,
        areas,
        quotaExceeded,
      });
    } catch {
      res.json({
        geocoded: false,
        hq: null,
        areas: [],
        quotaExceeded: false,
      });
    }
  });

  app.post('/api/bookings', async (req, res) => {
    const payload = req.body as BookingFormData;
    const validation = validateBookingForm(payload);
    if (!validation.isValid) {
      res.status(400).json({
        error: 'Validation failed',
        errors: validation.errors,
      });
      return;
    }

    const referenceId = `HF-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    const record: StoredBooking = {
      ...payload,
      id: referenceId,
      createdAt: new Date().toISOString(),
      selectedServices: getCombinedSelectedServices(
        payload.primaryService,
        payload.additionalServices || []
      ),
      status: 'Recorded',
    };

    try {
      await appendRecord(BOOKINGS_FILE, record);
      const whatsappUrl = buildBookingWhatsAppUrl(payload, referenceId);
      res.status(201).json({
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
      });
    } catch {
      res.status(500).json({
        error: 'Unable to save booking request on server.',
      });
    }
  });

  app.post('/api/contact', async (req, res) => {
    const payload = req.body as ContactFormData;
    const validation = validateContactForm(payload);
    if (!validation.isValid) {
      res.status(400).json({
        error: 'Validation failed',
        errors: validation.errors,
      });
      return;
    }

    const referenceId = `INQ-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    const record: StoredInquiry = {
      ...payload,
      id: referenceId,
      createdAt: new Date().toISOString(),
      status: 'Recorded',
    };

    try {
      await appendRecord(INQUIRIES_FILE, record);
      const whatsappUrl = buildContactWhatsAppUrl(payload);
      res.status(201).json({
        recorded: true,
        inquiry: {
          id: record.id,
          createdAt: record.createdAt,
          status: record.status,
        },
        whatsappUrl,
      });
    } catch {
      res.status(500).json({
        error: 'Unable to save enquiry on server.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HOME FIXER server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
