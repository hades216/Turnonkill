import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Phone } from 'lucide-react';
import { BUSINESS } from '../data/business';
import { HERO_SLIDES } from '../data/media';

export function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.2]);

  const totalSlides = HERO_SLIDES.length; // Exactly 3 slides

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % totalSlides) + totalSlides) % totalSlides);
    },
    [totalSlides]
  );

  const nextSlide = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prevSlide = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (paused || shouldReduceMotion) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [paused, shouldReduceMotion, totalSlides]);

  const currentSlide = HERO_SLIDES[activeIndex];

  return (
    <section
      ref={sectionRef}
      aria-label="Featured Home Services"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="relative w-full min-h-[92vh] lg:min-h-screen flex items-end lg:items-center overflow-hidden bg-[#0B0F17]"
    >
      {/* Crystal-Clear Background Slides with Scroll Parallax + Slow Zoom */}
      <motion.div
        style={shouldReduceMotion ? undefined : { y: bgY }}
        className="absolute inset-0 will-change-transform"
      >
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={slide.id}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
                isActive ? 'opacity-100 z-0' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.imageAlt}
                loading={index === 0 ? 'eager' : 'lazy'}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover object-center brightness-[1.03] contrast-[1.03] ${
                  isActive && !shouldReduceMotion ? 'animate-hero-zoom' : ''
                }`}
              />
            </div>
          );
        })}
      </motion.div>

      {/* Neutral Left-Side Contrast Scrim Only — Leaves Hero Photography Clear & True-Color */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-full lg:w-[68%] z-10 bg-gradient-to-r from-black/72 via-black/32 to-transparent pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-36 z-10 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none"
      />

      {/* Foreground Content with Scroll Lift */}
      <motion.div
        style={
          shouldReduceMotion
            ? undefined
            : { y: contentY, opacity: contentOpacity }
        }
        className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-24 lg:py-32"
      >
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide mb-4">
            <span className="text-gradient-gold">{BUSINESS.tagline}</span>
            <span aria-hidden="true" className="text-white/50">
              ·
            </span>
            <span className="text-white/90">
              Bahria Town · Rawalpindi · Islamabad
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1
                className="font-display text-white font-extrabold tracking-tight leading-[1.08] text-balance drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)]"
                style={{ fontSize: 'clamp(2.25rem, 4.4vw, 3.85rem)' }}
              >
                {currentSlide.headline}
              </h1>

              <p className="mt-5 text-base sm:text-lg text-white/90 leading-relaxed max-w-xl drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)]">
                {currentSlide.supportingText}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to={currentSlide.ctaTo}
                  className="btn-shiny shine-hover inline-flex items-center gap-2.5 px-6 py-3.5 rounded-md font-bold text-sm sm:text-base whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>{currentSlide.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>

                <a
                  href={BUSINESS.phoneHref}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-md bg-black/45 hover:bg-black/65 backdrop-blur-md text-white font-semibold text-sm sm:text-base border border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-colors duration-150 whitespace-nowrap tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#FFB84D]" aria-hidden="true" />
                  <span>{BUSINESS.phoneDisplay}</span>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Bottom Slider Controls: 3 Slide Indicators + Arrows */}
      <div className="absolute bottom-6 sm:bottom-8 inset-x-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pr-20 sm:pr-56 flex flex-wrap items-center justify-start gap-5 sm:gap-8">
          <div className="flex items-center gap-3" role="group" aria-label="Slide indicators">
            {HERO_SLIDES.map((slide, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Show slide ${index + 1}: ${slide.headline}`}
                  aria-current={isActive ? 'true' : 'false'}
                  className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F28C28] ${
                    isActive
                      ? 'w-10 bg-gradient-to-r from-[#FFB84D] to-[#F28C28] shadow-[0_0_12px_rgba(242,140,40,0.65)]'
                      : 'w-2.5 bg-white/55 hover:bg-white/85'
                  }`}
                />
              );
            })}
            <span className="ml-2 text-xs font-medium text-white/85 tabular-nums">
              0{activeIndex + 1} / 0{totalSlides}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-11 h-11 rounded-md bg-black/45 hover:bg-black/70 backdrop-blur-md text-white border border-white/25 inline-flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-[#F28C28]"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-11 h-11 rounded-md bg-black/45 hover:bg-black/70 backdrop-blur-md text-white border border-white/25 inline-flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-[#F28C28]"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
