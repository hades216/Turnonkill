import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { BUSINESS, SERVICES, type ServiceId } from '../data/business';
import { MEDIA, SERVICE_IMAGES } from '../data/media';
import { buildGeneralWhatsAppUrl } from '../utils/booking';
import { PageMeta } from '../components/PageMeta';
import { PageHero } from '../components/PageHero';
import { ResilientImage } from '../components/ResilientImage';
import { FinalCtaBand } from '../components/FinalCtaBand';
import { MotionReveal, ParallaxFrame } from '../components/MotionSection';

const SECONDARY_IMAGES: Record<ServiceId, { src: string; alt: string }> = {
  plumbing: {
    src: MEDIA.heroPlumbing,
    alt: 'Plumber fitting chrome drain piping under a bathroom vanity',
  },
  electrical: {
    src: MEDIA.heroElectrical,
    alt: 'Electrician checking home circuit breaker panel with a multimeter',
  },
  painting: {
    src: MEDIA.modernVillaExterior,
    alt: 'Freshly painted contemporary villa facade',
  },
  ac: {
    src: MEDIA.heroAcComfort,
    alt: 'AC technician servicing a wall-mounted split air conditioner unit',
  },
  'general-maintenance': {
    src: MEDIA.modernHomeInterior,
    alt: 'Well-kept modern living and dining room',
  },
};

export function ServiceDetailPage({ serviceId }: { serviceId: ServiceId }) {
  const service = SERVICES.find((s) => s.id === serviceId) || SERVICES[0];
  const heroImg = SECONDARY_IMAGES[service.id];
  const primaryImg = SERVICE_IMAGES[service.id];
  const otherServices = SERVICES.filter((s) => s.id !== service.id);

  return (
    <div>
      <PageMeta
        title={service.seoTitle}
        description={service.seoDescription}
        path={service.route}
      />

      <PageHero
        kicker={`${service.number} · ${BUSINESS.name}`}
        title={service.title}
        description={service.overview}
        image={heroImg.src}
        imageAlt={heroImg.alt}
        breadcrumbLabel={service.title}
      />

      {/* Core Overview & Offerings */}
      <section className="py-20 lg:py-24 surface-light-pearl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <MotionReveal className="lg:col-span-6 space-y-6">
              <p className="text-xs font-bold tracking-wide text-gradient-copper inline-block">
                What We Fix
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-gradient-navy tracking-tight text-balance">
                {service.shortTitle} Done Right
              </h2>
              <p className="text-slate-700 text-base leading-relaxed">
                {service.summary} Tell us what needs attention and our team will
                confirm the details directly with you.
              </p>

              <ul className="space-y-3.5 pt-2">
                {service.offerings.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-base text-slate-800"
                  >
                    <CheckCircle2
                      className="w-5 h-5 text-[#F28C28] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to={`/book-a-service?service=${service.id}`}
                  className="btn-shiny shine-hover inline-flex items-center gap-2 px-6 py-3.5 rounded-md font-bold text-sm sm:text-base"
                >
                  <CalendarCheck className="w-4 h-4" aria-hidden="true" />
                  <span>Book {service.shortTitle}</span>
                </Link>
                <a
                  href={buildGeneralWhatsAppUrl(
                    `Hello HOME FIXER, I would like to ask about ${service.title}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-dark-shiny shine-hover inline-flex items-center gap-2 px-5 py-3.5 rounded-md font-semibold text-sm sm:text-base"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" aria-hidden="true" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.08} className="lg:col-span-6">
              <ParallaxFrame
                offset={24}
                className="rounded-xl shadow-[0_24px_54px_-16px_rgba(15,35,63,0.25)] border border-white aspect-[4/3]"
              >
                <ResilientImage
                  src={primaryImg.src}
                  alt={primaryImg.alt}
                  loading="lazy"
                  fallbackTitle={service.title}
                  className="w-full h-full object-cover"
                />
              </ParallaxFrame>
            </MotionReveal>
          </div>
        </div>
      </section>

      {/* Benefits Strip */}
      <section className="py-20 surface-soft-silk border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-10">
            <p className="text-xs font-bold tracking-wide text-gradient-copper inline-block mb-2">
              Why Book With Us
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-gradient-navy">
              What to Expect
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.benefits.map((benefit, idx) => (
              <MotionReveal
                key={benefit.title}
                delay={idx * 0.05}
                className="card-pearl-sheen shine-hover rounded-xl p-6"
              >
                <span className="font-display text-xs font-extrabold text-gradient-copper tabular-nums inline-block">
                  0{idx + 1}
                </span>
                <h3 className="mt-1.5 font-display text-lg font-bold text-[#0F233F]">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {benefit.detail}
                </p>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-16 surface-dark-luxe text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="font-display text-2xl font-bold text-white">
              Other Services
            </h2>
            <a
              href={BUSINESS.phoneHref}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#FFB84D] hover:text-white tabular-nums"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>Call {BUSINESS.phoneDisplay}</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherServices.map((other) => (
              <Link
                key={other.id}
                to={other.route}
                className="card-glass-sheen shine-hover p-5 rounded-xl flex flex-col justify-between group"
              >
                <div>
                  <p className="text-xs font-bold text-gradient-gold inline-block tabular-nums">
                    {other.number}
                  </p>
                  <h3 className="font-display font-bold text-base text-white mt-1">
                    {other.title}
                  </h3>
                </div>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#FFB84D] group-hover:text-white transition-colors">
                  View <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCtaBand />
    </div>
  );
}
