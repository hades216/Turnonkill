import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { SERVICES } from '../data/business';
import { MEDIA, SERVICE_IMAGES } from '../data/media';
import { PageMeta } from '../components/PageMeta';
import { PageHero } from '../components/PageHero';
import { ResilientImage } from '../components/ResilientImage';
import { FinalCtaBand } from '../components/FinalCtaBand';
import { MotionReveal } from '../components/MotionSection';

export function ServicesPage() {
  return (
    <div>
      <PageMeta
        title="Home Maintenance Services — Plumbing, Electrical, Painting & AC | HOME FIXER"
        description="Plumbing, electrical, painting, AC servicing, and general home repairs by HOME FIXER in Bahria Town, Rawalpindi, and Islamabad."
        path="/services"
      />

      <PageHero
        kicker="Our Services"
        title="Home Repair & Maintenance Services"
        description="Five essential home services. Book one job or combine several in a single visit."
        image={MEDIA.heroElectrical}
        imageAlt="Residential electrician inspecting modern electrical panel"
        breadcrumbLabel="Services"
      />

      <section className="py-20 lg:py-24 surface-light-pearl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {SERVICES.map((service, idx) => {
            const img = SERVICE_IMAGES[service.id];
            const reverse = idx % 2 === 1;
            return (
              <MotionReveal key={service.id} delay={idx * 0.04}>
                <article className="card-pearl-sheen shine-hover rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  <div
                    className={`lg:col-span-5 min-h-[260px] overflow-hidden ${
                      reverse ? 'lg:order-2' : ''
                    }`}
                  >
                    <ResilientImage
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      fallbackTitle={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  <div
                    className={`lg:col-span-7 p-8 lg:p-10 flex flex-col justify-between ${
                      reverse ? 'lg:order-1' : ''
                    }`}
                  >
                    <div>
                      <div className="flex items-baseline gap-2.5 mb-2">
                        <span className="font-display text-sm font-extrabold text-gradient-copper tabular-nums">
                          {service.number}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          {service.shortTitle}
                        </span>
                      </div>
                      <h2 className="font-display text-2xl sm:text-3xl font-bold text-gradient-navy">
                        {service.title}
                      </h2>
                      <p className="mt-2.5 text-slate-700 text-base leading-relaxed">
                        {service.overview}
                      </p>

                      <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.offerings.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm text-slate-700"
                          >
                            <Check
                              className="w-4 h-4 text-[#F28C28] shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-200/70 flex flex-wrap items-center gap-3">
                      <Link
                        to={`/book-a-service?service=${service.id}`}
                        className="btn-shiny shine-hover inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-bold"
                      >
                        <span>Book {service.shortTitle}</span>
                      </Link>
                      <Link
                        to={service.route}
                        className="btn-dark-shiny shine-hover inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-4 h-4 text-[#FFB84D]" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              </MotionReveal>
            );
          })}
        </div>
      </section>

      <FinalCtaBand />
    </div>
  );
}
