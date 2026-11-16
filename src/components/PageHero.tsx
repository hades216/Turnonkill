import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { ResilientImage } from './ResilientImage';

interface PageHeroProps {
  kicker: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  breadcrumbLabel: string;
}

export function PageHero({
  kicker,
  title,
  description,
  image,
  imageAlt,
  breadcrumbLabel,
}: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);

  return (
    <section
      ref={ref}
      className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-[#0B0F17] text-white overflow-hidden"
    >
      <motion.div
        style={shouldReduceMotion ? undefined : { y: bgY }}
        className="absolute inset-0 opacity-85 will-change-transform"
      >
        <ResilientImage
          src={image}
          alt={imageAlt}
          loading="eager"
          className="w-full h-full object-cover brightness-[1.03] contrast-[1.03]"
        />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/42 to-black/15"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-300 mb-5">
          <Link to="/" className="hover:text-[#FFB84D] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
          <span className="text-white font-medium">{breadcrumbLabel}</span>
        </nav>

        <p className="text-xs font-bold tracking-wide text-gradient-gold mb-2 inline-block">
          {kicker}
        </p>
        <h1
          className="font-display font-extrabold tracking-tight text-white max-w-3xl text-balance leading-[1.1] drop-shadow-[0_2px_14px_rgba(0,0,0,0.4)]"
          style={{ fontSize: 'clamp(2rem, 3.8vw, 3.25rem)' }}
        >
          {title}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
}
