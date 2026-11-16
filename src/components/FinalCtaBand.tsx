import { Link } from 'react-router-dom';
import { CalendarCheck, MessageCircle, Phone } from 'lucide-react';
import { BUSINESS } from '../data/business';
import { buildGeneralWhatsAppUrl } from '../utils/booking';

export function FinalCtaBand() {
  return (
    <section className="py-20 lg:py-24 surface-dark-luxe text-white border-t border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-bold tracking-wide text-gradient-gold inline-block mb-3">
          {BUSINESS.hours} · Bahria Town, Rawalpindi &amp; Islamabad
        </p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance">
          Need Something Fixed?
        </h2>
        <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Call, WhatsApp, or book online for plumbing, electrical, painting, AC,
          or general home repairs.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href={BUSINESS.phoneHref}
            className="shine-hover inline-flex items-center gap-2.5 px-6 py-3.5 rounded-md bg-gradient-to-b from-white to-slate-100 text-[#0F233F] shadow-lg font-bold text-sm sm:text-base transition-transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            <Phone className="w-4 h-4 text-[#F28C28]" aria-hidden="true" />
            <span>Call {BUSINESS.phoneDisplay}</span>
          </a>

          <a
            href={buildGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="shine-hover inline-flex items-center gap-2.5 px-6 py-3.5 rounded-md bg-gradient-to-r from-[#34D399] via-[#25D366] to-[#16A34A] text-[#062413] shadow-[0_10px_28px_-8px_rgba(37,211,102,0.55)] font-bold text-sm sm:text-base transition-transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>WhatsApp Us</span>
          </a>

          <Link
            to="/book-a-service"
            className="btn-shiny shine-hover inline-flex items-center gap-2.5 px-6 py-3.5 rounded-md font-bold text-sm sm:text-base whitespace-nowrap"
          >
            <CalendarCheck className="w-4 h-4" aria-hidden="true" />
            <span>Book a Service</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
