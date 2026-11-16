import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ArrowUpRight, Clock } from 'lucide-react';
import {
  BUSINESS,
  HOW_IT_WORKS_STEPS,
  SERVICES,
  WHY_CHOOSE_ITEMS,
} from '../data/business';
import { MEDIA, SERVICE_IMAGES } from '../data/media';
import { PageMeta } from '../components/PageMeta';
import { HeroSlider } from '../components/HeroSlider';
import { ResilientImage } from '../components/ResilientImage';
import { ServiceGallerySection } from '../components/ServiceGallerySection';
import { TestimonialsCarousel } from '../components/TestimonialsCarousel';
import { ServiceMapSection } from '../components/ServiceMapSection';
import { FinalCtaBand } from '../components/FinalCtaBand';
import {
  MotionReveal,
  ParallaxFrame,
  ParallaxLayer,
} from '../components/MotionSection';

export function HomePage() {
  const bannerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress: bannerProgress } = useScroll({
    target: bannerRef,
    offset: ['start end', 'end start'],
  });
  const bannerBgY = useTransform(bannerProgress, [0, 1], ['-12%', '12%']);
  const bannerScale = useTransform(bannerProgress, [0, 0.5, 1], [1.12, 1.04, 1.12]);

  return (
    <div>
      <PageMeta
        title="HOME FIXER — Home Maintenance, Plumbing, Electrical & AC Services"
        description="Plumbing, electrical, painting, AC servicing, and general home repairs in Bahria Town, Rawalpindi, and Islamabad. Open 24 Hours."
        path="/"
      />

      {/* Full-Screen 3-Slide Clear Hero with Parallax */}
      <HeroSlider />

      {/* Quick Intro — Luminous Pearl Gradient Surface + Parallax Image */}
      <section className="py-20 lg:py-28 surface-light-pearl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <MotionReveal className="lg:col-span-6 space-y-5">
              <p className="text-xs font-bold tracking-wide text-gradient-copper inline-block">
                {BUSINESS.category}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gradient-navy tracking-tight leading-[1.08] text-balance">
                Home Repairs, Made Simple.
              </h2>
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed max-w-xl">
                Plumbing, electrical work, painting, AC servicing, and everyday
                fixes across Bahria Town, Rawalpindi, and Islamabad — handled by
                one reliable team.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-6">
                <Link
                  to="/services"
                  className="btn-dark-shiny shine-hover inline-flex items-center gap-2.5 px-6 py-3.5 rounded-md font-semibold text-sm sm:text-base whitespace-nowrap"
                >
                  <span>See All Services</span>
                  <ArrowRight className="w-4 h-4 text-[#FFB84D]" aria-hidden="true" />
                </Link>
                <div className="flex items-center gap-2 text-sm text-[#0F233F] font-semibold">
                  <Clock className="w-4 h-4 text-[#F28C28]" aria-hidden="true" />
                  <span>{BUSINESS.hours}</span>
                </div>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.08} className="lg:col-span-6">
              <ParallaxFrame
                offset={28}
                className="rounded-xl shadow-[0_24px_54px_-16px_rgba(15,35,63,0.28)] border border-white/80 aspect-[4/3]"
              >
                <ResilientImage
                  src={MEDIA.modernHomeInterior}
                  alt="Bright, well-kept modern home living room"
                  loading="lazy"
                  fallbackTitle="HOME FIXER"
                  className="w-full h-full object-cover"
                />
              </ParallaxFrame>
            </MotionReveal>
          </div>
        </div>
      </section>

      {/* Main Services — Glossy Full-Bleed Bento Tiles with Shine Sweep */}
      <section className="py-20 lg:py-28 surface-dark-luxe text-white border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-xl">
              <p className="text-xs font-bold tracking-wide text-gradient-gold inline-block mb-2">
                What We Fix
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight text-balance">
                Five Trades. One Phone Call.
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#FFB84D] hover:text-white transition-colors whitespace-nowrap"
            >
              <span>All Services</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
            {SERVICES.map((service, index) => {
              const img = SERVICE_IMAGES[service.id];
              const isFeaturedTop = index < 2;
              return (
                <MotionReveal
                  key={service.id}
                  delay={index * 0.05}
                  className={isFeaturedTop ? 'md:col-span-3' : 'md:col-span-2'}
                >
                  <Link
                    to={service.route}
                    className={`group shine-hover relative rounded-xl overflow-hidden bg-[#091526] border border-white/15 shadow-[0_20px_48px_-14px_rgba(0,0,0,0.6)] flex flex-col justify-between p-6 sm:p-7 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F28C28] ${
                      isFeaturedTop
                        ? 'min-h-[330px] sm:min-h-[380px]'
                        : 'min-h-[290px] sm:min-h-[330px]'
                    }`}
                  >
                    <ResilientImage
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      fallbackTitle={service.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"
                    />

                    <div className="relative z-10 flex items-center justify-between">
                      <span className="font-display text-xs sm:text-sm font-extrabold px-2.5 py-1 rounded-md bg-black/55 backdrop-blur-md border border-white/20 text-[#FFD166] tabular-nums shadow-sm">
                        {service.number}
                      </span>
                      <span className="w-10 h-10 rounded-full bg-black/45 backdrop-blur-md border border-white/25 text-white group-hover:bg-gradient-to-br group-hover:from-[#FFB84D] group-hover:to-[#E06B0E] group-hover:text-[#091526] group-hover:border-transparent inline-flex items-center justify-center transition-all duration-200">
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </span>
                    </div>

                    <div className="relative z-10 mt-auto pt-12">
                      <h3 className="font-display text-xl lg:text-2xl font-bold text-white tracking-tight">
                        {service.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-slate-200 leading-snug line-clamp-2 max-w-md">
                        {service.summary}
                      </p>
                    </div>
                  </Link>
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose HOME FIXER — Parallax Photo + Shiny Pearl Grid */}
      <section className="py-20 lg:py-28 surface-soft-silk">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            <div className="lg:col-span-5">
              <ParallaxFrame
                offset={30}
                className="h-full min-h-[380px] rounded-xl shadow-[0_24px_54px_-16px_rgba(15,35,63,0.25)] border border-white"
              >
                <ResilientImage
                  src={MEDIA.homeTechnician}
                  alt="HOME FIXER technician inspecting kitchen cabinetry with tools"
                  loading="lazy"
                  fallbackTitle="HOME FIXER Team"
                  className="w-full h-full object-cover"
                />
              </ParallaxFrame>
            </div>

            <ParallaxLayer range={16} className="lg:col-span-7 flex flex-col justify-center">
              <p className="text-xs font-bold tracking-wide text-gradient-copper inline-block mb-2">
                Why HOME FIXER
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-gradient-navy tracking-tight text-balance">
                Straightforward Work, Done Properly.
              </h2>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {WHY_CHOOSE_ITEMS.map((item, idx) => (
                  <MotionReveal
                    key={item.title}
                    delay={idx * 0.04}
                    className="card-pearl-sheen shine-hover rounded-xl p-5"
                  >
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-display text-xs font-extrabold text-gradient-copper tabular-nums">
                        {item.number}
                      </span>
                      <h3 className="font-display font-bold text-base text-[#0F233F]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </MotionReveal>
                ))}
              </div>
            </ParallaxLayer>
          </div>
        </div>
      </section>

      {/* How It Works — Dark Luxe Glass Sheen Step Cards */}
      <section className="py-20 lg:py-24 surface-dark-luxe text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs font-bold tracking-wide text-gradient-gold inline-block mb-2">
                How It Works
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance">
                Four Steps From Call to Fix
              </h2>
            </div>
            <Link
              to="/book-a-service"
              className="btn-shiny shine-hover inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-bold whitespace-nowrap"
            >
              <span>Book a Visit</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_IT_WORKS_STEPS.map((step, idx) => (
              <MotionReveal
                key={step.step}
                delay={idx * 0.06}
                className="card-glass-sheen shine-hover rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="font-display text-3xl font-extrabold text-gradient-gold tabular-nums">
                    {step.step}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* True Scroll-Linked Parallax Banner */}
      <section
        ref={bannerRef}
        className="relative py-28 lg:py-36 overflow-hidden bg-[#091322]"
      >
        <motion.div
          aria-hidden="true"
          style={
            shouldReduceMotion
              ? undefined
              : { y: bannerBgY, scale: bannerScale }
          }
          className="absolute inset-0 will-change-transform"
        >
          <img
            src={MEDIA.architecturalLighting}
            alt=""
            className="w-full h-full object-cover brightness-90"
          />
        </motion.div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/65"
        />

        <ParallaxLayer
          range={20}
          className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white"
        >
          <p className="text-xs font-bold tracking-wide text-gradient-gold inline-block mb-3">
            {BUSINESS.secondaryTaglines[1]}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]">
            Your Home Deserves Proper Care.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/90 max-w-xl mx-auto leading-relaxed">
            One repair or a full checkup — quick, clean, and reliable.
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="btn-shiny shine-hover inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md font-bold text-base"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </ParallaxLayer>
      </section>

      {/* Gallery Preview */}
      <ServiceGallerySection limit={6} showFilters={false} />
      <div className="surface-light-pearl pb-16 -mt-8 text-center">
        <Link
          to="/our-work"
          className="btn-dark-shiny shine-hover inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-sm"
        >
          <span>View Full Gallery</span>
          <ArrowRight className="w-4 h-4 text-[#FFB84D]" aria-hidden="true" />
        </Link>
      </div>

      {/* Customer Reviews */}
      <TestimonialsCarousel />

      {/* Coverage & Map */}
      <ServiceMapSection />

      {/* Final CTA */}
      <FinalCtaBand />
    </div>
  );
}
