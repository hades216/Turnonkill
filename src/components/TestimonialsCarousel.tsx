import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, Quote } from 'lucide-react';
import { SAMPLE_TESTIMONIAL_PREVIEWS } from '../data/business';
import { buildGeneralWhatsAppUrl } from '../utils/booking';

export function TestimonialsCarousel() {
  const [activeOffset, setActiveOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const items = SAMPLE_TESTIMONIAL_PREVIEWS;

  const shiftNext = () => {
    setActiveOffset((prev) => (prev + 1) % items.length);
  };
  const shiftPrev = () => {
    setActiveOffset((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsSwiping(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        shiftPrev();
      } else {
        shiftNext();
      }
    }
    touchStartX.current = null;
    setIsSwiping(false);
  };

  const orderedItems = [
    ...items.slice(activeOffset),
    ...items.slice(0, activeOffset),
  ];

  // Duplicate items for seamless continuous left-to-right marquee
  const trackItems = [...orderedItems, ...orderedItems];

  return (
    <section
      aria-label="Customer Reviews"
      className="py-20 lg:py-24 surface-dark-luxe text-white overflow-hidden border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-xl">
          <p className="text-xs font-bold tracking-wide text-gradient-gold inline-block mb-2">
            Reviews
          </p>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white tracking-tight text-balance">
            Customer Feedback
          </h2>
          <p className="mt-2.5 text-slate-300 text-sm sm:text-base leading-relaxed">
            Verified homeowner reviews from completed visits go here — no
            made-up ratings.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href={buildGeneralWhatsAppUrl(
              'Hello HOME FIXER, here is my feedback on a recent repair visit:'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" aria-hidden="true" />
            <span>Share Feedback</span>
          </a>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={shiftPrev}
              aria-label="Previous feedback card"
              className="w-11 h-11 rounded-md bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors inline-flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={shiftNext}
              aria-label="Next feedback card"
              className="w-11 h-11 rounded-md bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors inline-flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Continuous Left-to-Right Marquee (Pauses on Hover, Touch Swipe Supported) */}
      <div
        className="marquee-container relative w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="animate-marquee-ltr flex gap-5 px-4"
          style={isSwiping ? { animationPlayState: 'paused' } : undefined}
        >
          {trackItems.map((item, idx) => (
            <article
              key={`${item.id}-${idx}`}
              className="card-glass-sheen shine-hover w-[300px] sm:w-[360px] shrink-0 rounded-xl p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-bold text-[#FFB84D]">
                    {item.service} · {item.area}
                  </span>
                  <Quote
                    className="w-4 h-4 text-white/30 shrink-0"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-slate-100 text-sm sm:text-base leading-relaxed">
                  {item.quote}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/12 flex items-center justify-between text-xs text-slate-400">
                <span>{item.label}</span>
                <span>Awaiting customer post</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
