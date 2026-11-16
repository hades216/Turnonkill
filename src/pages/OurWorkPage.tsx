import { Link } from 'react-router-dom';
import { CalendarCheck } from 'lucide-react';
import { MEDIA } from '../data/media';
import { PageMeta } from '../components/PageMeta';
import { PageHero } from '../components/PageHero';
import { ServiceGallerySection } from '../components/ServiceGallerySection';
import { FinalCtaBand } from '../components/FinalCtaBand';

export function OurWorkPage() {
  return (
    <div>
      <PageMeta
        title="Our Work — Service Gallery | HOME FIXER"
        description="Browse service photos across Plumbing, Electrical, Painting, AC Services, and General Home Maintenance by HOME FIXER."
        path="/our-work"
      />

      <PageHero
        kicker="Our Work"
        title="Service Gallery"
        description="A look at the five trades we handle every day across Bahria Town, Rawalpindi, and Islamabad."
        image={MEDIA.modernBathroomPlumbing}
        imageAlt="Modern bathroom with brushed chrome fixtures"
        breadcrumbLabel="Our Work"
      />

      <ServiceGallerySection
        showFilters={true}
        heading="Browse by Trade"
        subheading="Sample service photos — real project photos from completed jobs coming soon. Click any photo to enlarge."
      />

      <section className="py-12 surface-soft-silk border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-bold text-gradient-navy">
              Ready to Fix Something at Home?
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Book one job or several together in under a minute.
            </p>
          </div>
          <Link
            to="/book-a-service"
            className="btn-shiny shine-hover inline-flex items-center gap-2 px-6 py-3 rounded-md font-bold text-sm whitespace-nowrap"
          >
            <CalendarCheck className="w-4 h-4" aria-hidden="true" />
            <span>Book a Service</span>
          </Link>
        </div>
      </section>

      <FinalCtaBand />
    </div>
  );
}
