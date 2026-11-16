import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MapPin, Phone } from 'lucide-react';
import { BUSINESS, SERVICES, WHY_CHOOSE_ITEMS } from '../data/business';
import { MEDIA } from '../data/media';
import { PageMeta } from '../components/PageMeta';
import { PageHero } from '../components/PageHero';
import { ResilientImage } from '../components/ResilientImage';
import { FinalCtaBand } from '../components/FinalCtaBand';
import { MotionReveal, ParallaxFrame } from '../components/MotionSection';

export function AboutPage() {
  return (
    <div>
      <PageMeta
        title="About Us — Making Home Maintenance Easier | HOME FIXER"
        description="About HOME FIXER — plumbing, electrical, painting, AC servicing, and everyday home repairs in Bahria Town, Rawalpindi, and Islamabad."
        path="/about"
      />

      <PageHero
        kicker={`About ${BUSINESS.name} · ${BUSINESS.tagline}`}
        title="Home Repairs Without the Runaround."
        description="One experienced team for plumbing, electrical, painting, AC servicing, and everyday home fixes."
        image={MEDIA.modernHomeInterior}
        imageAlt="Well-maintained contemporary home living room"
        breadcrumbLabel="About Us"
      />

      {/* Company Overview */}
      <section className="py-20 lg:py-24 surface-light-pearl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <MotionReveal className="lg:col-span-6 space-y-5">
              <p className="text-xs font-bold tracking-wide text-gradient-copper inline-block">
                Who We Are
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-gradient-navy tracking-tight text-balance">
                One Team for Everyday Home Repairs
              </h2>
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                {BUSINESS.description}
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                No chasing five different numbers for a leaking tap, a tripped
                breaker, a bedroom AC service, or wall touch-ups. Call or
                message once and we handle it.
              </p>

              <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-slate-200/80">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#F28C28] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-sm text-[#0F233F]">Hours</p>
                    <p className="text-sm text-slate-600">{BUSINESS.hours}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#F28C28] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-sm text-[#0F233F]">Areas</p>
                    <p className="text-sm text-slate-600">
                      Bahria Town, Rawalpindi &amp; Islamabad
                    </p>
                  </div>
                </div>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.08} className="lg:col-span-6">
              <ParallaxFrame
                offset={26}
                className="rounded-xl shadow-[0_24px_54px_-16px_rgba(15,35,63,0.25)] border border-white aspect-[4/3]"
              >
                <ResilientImage
                  src={MEDIA.homeTechnician}
                  alt="HOME FIXER technician inspecting modern kitchen cabinetry"
                  loading="lazy"
                  fallbackTitle="HOME FIXER"
                  className="w-full h-full object-cover"
                />
              </ParallaxFrame>
            </MotionReveal>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 lg:py-24 surface-soft-silk border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-12">
            <p className="text-xs font-bold tracking-wide text-gradient-copper inline-block mb-2">
              How We Work
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gradient-navy tracking-tight text-balance">
              Practical Care for Your Home
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_ITEMS.map((item, idx) => (
              <MotionReveal
                key={item.title}
                delay={idx * 0.04}
                className="card-pearl-sheen shine-hover rounded-xl p-6"
              >
                <span className="font-display text-xs font-extrabold text-gradient-copper tabular-nums inline-block">
                  {item.number}
                </span>
                <h3 className="mt-1.5 font-display text-lg font-bold text-[#0F233F]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </MotionReveal>
            ))}
          </div>

          <div className="mt-14 p-8 rounded-xl surface-dark-luxe text-white border border-white/15 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-xl font-bold">
                See All {SERVICES.length} Home Services
              </h3>
              <p className="mt-1 text-sm text-slate-300">
                Check what each trade covers or book multiple jobs together.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/services"
                className="btn-shiny shine-hover inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm font-bold"
              >
                <span>Browse Services</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href={BUSINESS.phoneHref}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold transition-colors tabular-nums"
              >
                <Phone className="w-4 h-4 text-[#FFB84D]" aria-hidden="true" />
                <span>{BUSINESS.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <FinalCtaBand />
    </div>
  );
}
