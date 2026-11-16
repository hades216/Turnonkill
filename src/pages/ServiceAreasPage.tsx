import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import { BUSINESS } from '../data/business';
import { MEDIA } from '../data/media';
import { buildGeneralWhatsAppUrl } from '../utils/booking';
import { PageMeta } from '../components/PageMeta';
import { PageHero } from '../components/PageHero';
import { ServiceMapSection } from '../components/ServiceMapSection';
import { FinalCtaBand } from '../components/FinalCtaBand';
import { MotionReveal } from '../components/MotionSection';

const AREA_CARDS = [
  {
    number: '01',
    name: 'Bahria Town',
    summary:
      'Plumbing, electrical, painting, AC servicing, and everyday repairs across all phases.',
  },
  {
    number: '02',
    name: 'Rawalpindi',
    summary:
      'Home maintenance and repair visits across Rawalpindi neighborhoods.',
  },
  {
    number: '03',
    name: 'Islamabad',
    summary:
      'Home visits across Islamabad sectors coordinated from our G-6 Markaz office.',
  },
] as const;

export function ServiceAreasPage() {
  return (
    <div>
      <PageMeta
        title="Service Areas — Bahria Town, Rawalpindi & Islamabad | HOME FIXER"
        description="HOME FIXER serves Bahria Town, Rawalpindi, Islamabad, and nearby areas on confirmation."
        path="/service-areas"
      />

      <PageHero
        kicker="Coverage"
        title="Bahria Town, Rawalpindi & Islamabad"
        description="Where we send technicians every day. Nearby locations are confirmed on call or WhatsApp."
        image={MEDIA.modernVillaExterior}
        imageAlt="Modern residential villa exterior"
        breadcrumbLabel="Service Areas"
      />

      <section className="py-16 lg:py-20 surface-soft-silk">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AREA_CARDS.map((area, idx) => (
              <MotionReveal key={area.name} delay={idx * 0.05}>
                <Link
                  to={`/book-a-service?area=${encodeURIComponent(area.name)}`}
                  className="group shine-hover surface-dark-luxe rounded-xl p-7 text-white border border-white/15 shadow-xl flex flex-col justify-between h-full transition-transform duration-200 hover:-translate-y-1"
                >
                  <div>
                    <span className="font-display text-sm font-extrabold text-gradient-gold inline-block tabular-nums">
                      {area.number}
                    </span>
                    <h2 className="mt-2 font-display text-2xl font-bold text-white">
                      {area.name}
                    </h2>
                    <p className="mt-2.5 text-sm sm:text-base text-slate-300 leading-relaxed">
                      {area.summary}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/15 inline-flex items-center gap-2 text-sm font-bold text-[#FFB84D] group-hover:text-white transition-colors">
                    <span>Book in {area.name}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </div>
                </Link>
              </MotionReveal>
            ))}
          </div>

          <div className="mt-10 p-7 rounded-xl card-pearl-sheen flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-xl font-bold text-[#0F233F]">
                Somewhere Nearby? Ask Us Directly.
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Send your sector or neighborhood on WhatsApp or call to check
                availability.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={BUSINESS.phoneHref}
                className="btn-dark-shiny shine-hover inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm font-semibold tabular-nums"
              >
                <Phone className="w-4 h-4 text-[#FFB84D]" aria-hidden="true" />
                <span>{BUSINESS.phoneDisplay}</span>
              </a>
              <a
                href={buildGeneralWhatsAppUrl(
                  'Hello HOME FIXER, can you confirm if you cover my location?'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="shine-hover inline-flex items-center gap-2 px-5 py-3 rounded-md bg-gradient-to-r from-[#34D399] via-[#25D366] to-[#16A34A] text-[#062413] text-sm font-bold shadow-md transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <ServiceMapSection />

      <FinalCtaBand />
    </div>
  );
}
