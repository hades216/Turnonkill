import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import {
  GALLERY_ITEMS,
  type GalleryCategory,
  type GalleryItem,
} from '../data/media';
import { filterGalleryItems } from '../utils/booking';
import { ResilientImage } from './ResilientImage';
import { MotionReveal } from './MotionSection';

const CATEGORIES: GalleryCategory[] = [
  'All',
  'Plumbing',
  'Electrical',
  'Painting',
  'AC Services',
  'General Maintenance',
];

interface ServiceGallerySectionProps {
  limit?: number;
  showFilters?: boolean;
  heading?: string;
  subheading?: string;
}

export function ServiceGallerySection({
  limit,
  showFilters = true,
  heading = 'Our Work',
  subheading = 'Sample service photos across our five trades. Real project photos coming soon.',
}: ServiceGallerySectionProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<GalleryCategory>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filtered = filterGalleryItems(GALLERY_ITEMS, selectedCategory);
  const visibleItems = limit ? filtered.slice(0, limit) : filtered;

  useEffect(() => {
    if (!lightboxItem) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxItem(null);
      } else if (e.key === 'ArrowRight') {
        const idx = visibleItems.findIndex((i) => i.id === lightboxItem.id);
        if (idx >= 0) {
          setLightboxItem(visibleItems[(idx + 1) % visibleItems.length]);
        }
      } else if (e.key === 'ArrowLeft') {
        const idx = visibleItems.findIndex((i) => i.id === lightboxItem.id);
        if (idx >= 0) {
          setLightboxItem(
            visibleItems[(idx - 1 + visibleItems.length) % visibleItems.length]
          );
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxItem, visibleItems]);

  const navigateLightbox = (direction: 1 | -1) => {
    if (!lightboxItem || visibleItems.length === 0) return;
    const idx = visibleItems.findIndex((i) => i.id === lightboxItem.id);
    const nextIdx = (idx + direction + visibleItems.length) % visibleItems.length;
    setLightboxItem(visibleItems[nextIdx]);
  };

  return (
    <section className="py-20 lg:py-24 surface-light-pearl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <p className="text-xs font-bold tracking-wide text-gradient-copper inline-block mb-2">
              Service Gallery
            </p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-gradient-navy tracking-tight text-balance">
              {heading}
            </h2>
            <p className="mt-2.5 text-slate-600 text-sm sm:text-base leading-relaxed">
              {subheading}
            </p>
          </div>

          {showFilters && (
            <div
              role="group"
              aria-label="Filter service gallery by category"
              className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-lg shadow-sm"
            >
              {CATEGORIES.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
                      active
                        ? 'btn-dark-shiny text-white shadow-sm'
                        : 'text-slate-700 hover:text-[#0F233F] hover:bg-slate-100'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleItems.map((item, idx) => {
            const isWideTile = idx % 4 === 0;
            return (
              <MotionReveal
                key={item.id}
                delay={idx * 0.04}
                className={isWideTile ? 'md:col-span-2 lg:col-span-2' : ''}
              >
                <button
                  type="button"
                  onClick={() => setLightboxItem(item)}
                  aria-label={`View larger image: ${item.title}`}
                  className="group shine-hover relative w-full text-left rounded-xl overflow-hidden bg-[#091526] border border-white/60 shadow-[0_18px_40px_-14px_rgba(15,35,63,0.28)] focus-visible:outline-2 focus-visible:outline-[#F28C28]"
                >
                  <div className="w-full overflow-hidden h-72 sm:h-80 lg:h-[360px]">
                    <ResilientImage
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      fallbackTitle={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/15 to-transparent"
                  />
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/25 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white">
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <span className="text-[#FFB84D]">{item.category}</span>
                      <span aria-hidden="true" className="text-white/40">
                        ·
                      </span>
                      <span className="text-slate-200 font-normal">
                        {item.caption}
                      </span>
                    </div>
                    <h3 className="mt-1 font-display text-lg sm:text-xl font-bold leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </button>
              </MotionReveal>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.title}
          className="fixed inset-0 z-50 bg-[#07111F]/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative max-w-5xl w-full surface-dark-luxe rounded-xl overflow-hidden shadow-2xl border border-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 text-white">
              <div>
                <p className="text-xs font-bold text-[#FFB84D]">
                  {lightboxItem.category}
                </p>
                <h3 className="font-display text-lg font-bold">
                  {lightboxItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                aria-label="Close image lightbox"
                className="w-10 h-10 rounded-md bg-white/10 hover:bg-white/20 text-white inline-flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative bg-black/50 max-h-[70vh] flex items-center justify-center">
              <img
                src={lightboxItem.image}
                alt={lightboxItem.alt}
                referrerPolicy="no-referrer"
                className="max-h-[68vh] w-auto max-w-full object-contain"
              />
              {visibleItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => navigateLightbox(-1)}
                    aria-label="Previous gallery image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/85 text-white inline-flex items-center justify-center border border-white/20"
                  >
                    <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateLightbox(1)}
                    aria-label="Next gallery image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/85 text-white inline-flex items-center justify-center border border-white/20"
                  >
                    <ChevronRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            <div className="px-5 py-4 text-sm text-slate-300 border-t border-white/10">
              {lightboxItem.caption}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
