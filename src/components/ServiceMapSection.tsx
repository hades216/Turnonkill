import { useEffect, useState } from 'react';
import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import { Clock, MapPin, Navigation, Phone } from 'lucide-react';
import { BUSINESS } from '../data/business';

interface GeocodedLocation {
  label: string;
  address: string;
  lat: number;
  lng: number;
  formattedAddress: string;
}

interface MapsLocationsResponse {
  geocoded: boolean;
  hq: GeocodedLocation | null;
  areas: GeocodedLocation[];
  quotaExceeded?: boolean;
}

function LocationMarker({
  location,
  isPrimary,
  selected,
  onSelect,
  onClose,
}: {
  location: GeocodedLocation;
  isPrimary: boolean;
  selected: boolean;
  onSelect: () => void;
  onClose: () => void;
}) {
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: location.lat, lng: location.lng }}
        onClick={onSelect}
        title={location.label}
      >
        <Pin
          background={isPrimary ? '#F28C28' : '#0F233F'}
          borderColor={isPrimary ? '#0F233F' : '#FFFFFF'}
          glyphColor={isPrimary ? '#0F233F' : '#F28C28'}
          scale={isPrimary ? 1.25 : 1.0}
        />
      </AdvancedMarker>
      {selected && marker && (
        <InfoWindow anchor={marker} onCloseClick={onClose} maxWidth={260}>
          <div className="text-[#1E293B] p-1">
            <p className="font-bold text-sm text-[#0F233F]">{location.label}</p>
            <p className="text-xs text-slate-600 mt-1">
              {location.formattedAddress}
            </p>
            {isPrimary && (
              <a
                href={BUSINESS.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-xs font-semibold text-[#0F233F] underline"
              >
                Open Directions
              </a>
            )}
          </div>
        </InfoWindow>
      )}
    </>
  );
}

export function ServiceMapSection() {
  const [apiKey, setApiKey] = useState<string>(
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  );
  const [locations, setLocations] = useState<MapsLocationsResponse | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string>('HOME FIXER');
  const [activeAreaCard, setActiveAreaCard] = useState<string>('Bahria Town');

  useEffect(() => {
    let cancelled = false;
    async function loadMapsData() {
      try {
        const [cfgRes, locRes] = await Promise.all([
          fetch('/api/maps/config'),
          fetch('/api/maps/locations'),
        ]);
        if (cancelled) return;
        if (cfgRes.ok) {
          const cfg = (await cfgRes.json()) as { apiKey?: string };
          if (cfg.apiKey) setApiKey(cfg.apiKey);
        }
        if (locRes.ok) {
          const locData = (await locRes.json()) as MapsLocationsResponse;
          if (locData.quotaExceeded) {
            window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
          }
          setLocations(locData);
        }
      } catch {
        // Ignore transient fetch issues; UI renders verified address & directions fallback
      }
    }
    loadMapsData();
    return () => {
      cancelled = true;
    };
  }, []);

  const hq = locations?.hq || null;
  const allMarkers: GeocodedLocation[] = hq
    ? [hq, ...(locations?.areas || [])]
    : [];

  const areaDetails: Record<string, string> = {
    'Bahria Town':
      'All phases — plumbing, electrical, painting, AC servicing, and everyday repairs.',
    Rawalpindi:
      'Home visits across Rawalpindi neighborhoods arranged directly with our team.',
    Islamabad:
      'Home maintenance across Islamabad sectors from our G-6 Markaz office.',
  };

  return (
    <section className="py-20 lg:py-24 surface-light-pearl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Coverage Info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <p className="text-xs font-bold tracking-wide text-gradient-copper inline-block mb-2">
                Service Areas
              </p>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-gradient-navy tracking-tight text-balance">
                Where We Work
              </h2>
              <p className="mt-3 text-slate-700 text-base leading-relaxed">
                Serving Bahria Town, Rawalpindi, Islamabad, and nearby areas on
                confirmation.
              </p>

              {/* Interactive Area Selector */}
              <div className="mt-6 flex flex-wrap gap-2">
                {BUSINESS.primaryAreas.map((area) => {
                  const isActive = activeAreaCard === area;
                  return (
                    <button
                      key={area}
                      type="button"
                      onClick={() => {
                        setActiveAreaCard(area);
                        setSelectedLabel(area);
                      }}
                      className={`px-4 py-2 rounded-md text-sm font-semibold transition-all whitespace-nowrap ${
                        isActive
                          ? 'btn-dark-shiny text-white'
                          : 'bg-white/85 border border-slate-200 text-slate-700 hover:border-[#0F233F]'
                      }`}
                    >
                      {area}
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 card-pearl-sheen rounded-lg p-4 text-sm text-slate-700 leading-relaxed">
                <p className="font-bold text-[#0F233F] mb-1">
                  {activeAreaCard}
                </p>
                <p>{areaDetails[activeAreaCard]}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200/80 space-y-3 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin
                  className="w-5 h-5 text-[#F28C28] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold text-[#0F233F]">Office Address</p>
                  <p className="text-slate-600">{BUSINESS.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock
                  className="w-5 h-5 text-[#F28C28] shrink-0"
                  aria-hidden="true"
                />
                <span className="font-medium text-[#0F233F]">{BUSINESS.hours}</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={BUSINESS.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-dark-shiny shine-hover inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold whitespace-nowrap"
                >
                  <Navigation className="w-4 h-4 text-[#FFB84D]" aria-hidden="true" />
                  Get Directions
                </a>
                <a
                  href={BUSINESS.phoneHref}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0F233F] hover:text-[#F28C28] transition-colors tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#F28C28]" aria-hidden="true" />
                  {BUSINESS.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Platform Map or Glossy Coverage Panel */}
          <div className="lg:col-span-7 min-h-[380px] lg:min-h-[460px] rounded-xl overflow-hidden border border-white/80 shadow-[0_24px_54px_-18px_rgba(15,35,63,0.28)] bg-[#091526] relative">
            {apiKey && hq ? (
              <APIProvider apiKey={apiKey} libraries={['marker']}>
                <GoogleMap
                  mapId="DEMO_MAP_ID"
                  defaultCenter={{ lat: hq.lat, lng: hq.lng }}
                  defaultZoom={11}
                  gestureHandling="cooperative"
                  internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                  style={{ width: '100%', height: '100%', minHeight: '420px' }}
                >
                  {allMarkers.map((loc) => (
                    <LocationMarker
                      key={loc.label}
                      location={loc}
                      isPrimary={loc.label === 'HOME FIXER'}
                      selected={selectedLabel === loc.label}
                      onSelect={() => setSelectedLabel(loc.label)}
                      onClose={() => setSelectedLabel('')}
                    />
                  ))}
                </GoogleMap>
              </APIProvider>
            ) : (
              <div className="w-full h-full min-h-[400px] flex flex-col justify-between p-8 surface-dark-luxe text-white">
                <div className="space-y-2.5">
                  <p className="text-xs font-bold text-gradient-gold inline-block">
                    Google Maps Location
                  </p>
                  <h3 className="font-display text-2xl font-bold">
                    {BUSINESS.name} — Islamabad &amp; Rawalpindi
                  </h3>
                  <p className="text-sm text-slate-300 max-w-lg leading-relaxed">
                    {BUSINESS.address}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                  {BUSINESS.primaryAreas.map((area, idx) => (
                    <div
                      key={area}
                      className="card-glass-sheen rounded-lg p-4"
                    >
                      <p className="text-xs font-bold text-gradient-gold inline-block tabular-nums">
                        0{idx + 1}
                      </p>
                      <p className="font-display font-bold text-base text-white mt-1">
                        {area}
                      </p>
                      <p className="text-xs text-slate-300 mt-1">
                        Home service area
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href={BUSINESS.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shiny shine-hover inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm font-bold"
                  >
                    <Navigation className="w-4 h-4" aria-hidden="true" />
                    Open in Google Maps
                  </a>
                  <span className="text-xs text-slate-300">
                    Nearby areas covered on confirmation.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
