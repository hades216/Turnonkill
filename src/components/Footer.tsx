import { Link } from 'react-router-dom';
import { Clock, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';
import { BUSINESS, SERVICES } from '../data/business';
import { buildGeneralWhatsAppUrl } from '../utils/booking';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="surface-dark-luxe text-white border-t border-white/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 text-white focus-visible:outline-2 focus-visible:outline-[#F28C28] rounded"
            >
              <span className="font-display text-2xl font-extrabold tracking-tight">
                {BUSINESS.name}
              </span>
            </Link>
            <p className="text-gradient-gold font-display font-bold text-base inline-block">
              {BUSINESS.tagline}
            </p>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              Plumbing, electrical, painting, AC servicing, and everyday home
              repairs in Bahria Town, Rawalpindi, and Islamabad.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={BUSINESS.phoneHref}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-white/10 hover:bg-white/20 border border-white/15 text-sm font-semibold text-white transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-[#FFB84D]" aria-hidden="true" />
                {BUSINESS.phoneDisplay}
              </a>
              <a
                href={buildGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shiny shine-hover inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-bold whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-sm font-bold tracking-wide text-white mb-4">
              Quick Links
            </h2>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/" className="hover:text-[#F28C28] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#F28C28] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#F28C28] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/our-work" className="hover:text-[#F28C28] transition-colors">
                  Our Work
                </Link>
              </li>
              <li>
                <Link to="/service-areas" className="hover:text-[#F28C28] transition-colors">
                  Service Areas
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#F28C28] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F28C28] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="lg:col-span-3">
            <h2 className="font-display text-sm font-bold tracking-wide text-white mb-4">
              Our Services
            </h2>
            <ul className="space-y-2.5 text-sm text-slate-300">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    to={service.route}
                    className="hover:text-[#F28C28] transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  to="/book-a-service"
                  className="text-[#F28C28] font-semibold hover:underline"
                >
                  Book a Service →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-3">
            <h2 className="font-display text-sm font-bold tracking-wide text-white mb-4">
              Contact Information
            </h2>
            <ul className="space-y-3.5 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#F28C28] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="block text-xs text-slate-400">Phone / WhatsApp</span>
                  <a
                    href={BUSINESS.phoneHref}
                    className="font-semibold text-white hover:text-[#F28C28] tabular-nums"
                  >
                    {BUSINESS.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#F28C28] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="block text-xs text-slate-400">Hours</span>
                  <span className="text-white font-medium">{BUSINESS.hours}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#F28C28] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="block text-xs text-slate-400">Address</span>
                  <span>{BUSINESS.address}</span>
                </div>
              </li>
              <li>
                <a
                  href={BUSINESS.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#F28C28] font-semibold hover:underline"
                >
                  <Navigation className="w-4 h-4" aria-hidden="true" />
                  Get Google Maps Directions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {year} {BUSINESS.name}. All rights reserved. Serving Bahria Town,
            Rawalpindi, and Islamabad.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link
              to="/terms-and-conditions"
              className="hover:text-white transition-colors"
            >
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
