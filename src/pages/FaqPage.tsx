import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, MessageCircle, Phone } from 'lucide-react';
import { BUSINESS, FAQ_ITEMS } from '../data/business';
import { MEDIA } from '../data/media';
import { buildGeneralWhatsAppUrl } from '../utils/booking';
import { PageMeta } from '../components/PageMeta';
import { PageHero } from '../components/PageHero';
import { FinalCtaBand } from '../components/FinalCtaBand';

export function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      <PageMeta
        title="Frequently Asked Questions | HOME FIXER"
        description="Answers to common questions about requesting home repairs, available services, booking multiple services, and service areas covered by HOME FIXER."
        path="/faq"
      />

      <PageHero
        kicker="Help & Information"
        title="Frequently Asked Questions"
        description="Straightforward answers on how to request a service, combine multiple trades, and coordinate visits with HOME FIXER."
        image={MEDIA.modernHomeInterior}
        imageAlt="Bright residential living area"
        breadcrumbLabel="FAQ"
      />

      <section className="py-20 lg:py-24 surface-light-pearl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={item.question}
                  className="card-pearl-sheen rounded-xl overflow-hidden"
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-display font-bold text-base sm:text-lg text-[#0F233F] hover:bg-white/60 transition-colors"
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#F28C28] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm sm:text-base text-slate-700 leading-relaxed border-t border-slate-200/70">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 p-8 rounded-xl surface-dark-luxe text-white border border-white/15 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-xl font-bold">
                Still Have a Question?
              </h2>
              <p className="mt-1 text-sm text-slate-300">
                Contact our team directly by phone, WhatsApp, or our contact
                page.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={BUSINESS.phoneHref}
                className="btn-shiny shine-hover inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-bold tabular-nums"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>{BUSINESS.phoneDisplay}</span>
              </a>
              <a
                href={buildGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="shine-hover inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-gradient-to-r from-[#34D399] via-[#25D366] to-[#16A34A] text-[#062413] text-sm font-bold shadow-md"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center px-5 py-2.5 rounded-md bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold transition-colors"
              >
                Contact Form
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FinalCtaBand />
    </div>
  );
}
