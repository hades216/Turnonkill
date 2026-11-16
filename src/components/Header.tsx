import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { BUSINESS, SERVICES } from '../data/business';

export function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesDropdownOpen(false);
        setMobileOpen(false);
      }
    };
    const onClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setServicesDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, []);

  const solidHeader = !isHome || scrolled || mobileOpen;

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `whitespace-nowrap shrink-0 text-sm font-medium transition-colors duration-150 py-1 border-b-2 ${
      isActive
        ? 'text-[#F28C28] border-[#F28C28]'
        : 'text-white/90 hover:text-white border-transparent hover:border-white/50'
    }`;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        solidHeader
          ? 'bg-gradient-to-r from-[#07111F]/95 via-[#0F233F]/95 to-[#091526]/95 backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.45)] border-b border-white/15'
          : 'bg-gradient-to-b from-black/55 via-black/20 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F28C28] rounded"
          aria-label="HOME FIXER Home"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="shrink-0"
          >
            <path
              d="M3.5 12.5L14 4L24.5 12.5V23.5C24.5 24.0523 24.0523 24.5 23.5 24.5H4.5C3.94772 24.5 3.5 24.0523 3.5 23.5V12.5Z"
              stroke="#F28C28"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M10.5 24.5V16.5H17.5V24.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-display text-lg lg:text-xl font-extrabold tracking-tight">
            {BUSINESS.name}
          </span>
        </Link>

        {/* Zone 2: Concise Single-Line Desktop Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-6"
        >
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About Us
          </NavLink>

          <div className="relative" ref={dropdownRef}>
            <div className="flex items-center gap-1">
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `whitespace-nowrap shrink-0 text-sm font-medium transition-colors duration-150 py-1 border-b-2 ${
                    isActive || pathname.startsWith('/services/')
                      ? 'text-[#F28C28] border-[#F28C28]'
                      : 'text-white/90 hover:text-white border-transparent hover:border-white/50'
                  }`
                }
              >
                Services
              </NavLink>
              <button
                type="button"
                aria-label="Toggle Services Menu"
                aria-expanded={servicesDropdownOpen}
                onClick={() => setServicesDropdownOpen((prev) => !prev)}
                className="p-1 text-white/80 hover:text-white transition-colors rounded focus-visible:outline-2 focus-visible:outline-[#F28C28]"
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-150 ${
                    servicesDropdownOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
            </div>

            {servicesDropdownOpen && (
              <div className="absolute left-0 top-full mt-3 w-64 bg-white rounded-lg shadow-xl border border-slate-200 py-2 text-[#202A35]">
                <Link
                  to="/services"
                  className="block px-4 py-2.5 text-sm font-semibold text-[#142B45] hover:bg-[#ECEFF2] transition-colors border-b border-slate-100"
                >
                  All Services Overview
                </Link>
                {SERVICES.map((service) => (
                  <Link
                    key={service.id}
                    to={service.route}
                    className="block px-4 py-2 text-sm text-[#202A35] hover:bg-[#ECEFF2] hover:text-[#142B45] transition-colors"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink to="/our-work" className={navLinkClass}>
            Our Work
          </NavLink>
          <NavLink to="/service-areas" className={navLinkClass}>
            Service Areas
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/book-a-service"
            className="btn-shiny shine-hover hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-md text-sm font-bold whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Book a Service
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-[#F28C28]"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-gradient-to-b from-[#07111F] via-[#0F233F] to-[#091526] border-t border-white/15 px-4 pt-3 pb-6 space-y-1 max-h-[82vh] overflow-y-auto shadow-2xl">
          <Link
            to="/"
            className="block px-3 py-2.5 rounded-md text-base font-medium text-white hover:bg-white/10"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2.5 rounded-md text-base font-medium text-white hover:bg-white/10"
          >
            About Us
          </Link>
          <Link
            to="/services"
            className="block px-3 py-2.5 rounded-md text-base font-medium text-white hover:bg-white/10"
          >
            All Services
          </Link>
          <div className="pl-4 space-y-1 border-l border-white/15 ml-3 my-1">
            {SERVICES.map((service) => (
              <Link
                key={service.id}
                to={service.route}
                className="block px-3 py-2 rounded-md text-sm text-white/80 hover:text-white hover:bg-white/10"
              >
                {service.title}
              </Link>
            ))}
          </div>
          <Link
            to="/our-work"
            className="block px-3 py-2.5 rounded-md text-base font-medium text-white hover:bg-white/10"
          >
            Our Work
          </Link>
          <Link
            to="/service-areas"
            className="block px-3 py-2.5 rounded-md text-base font-medium text-white hover:bg-white/10"
          >
            Service Areas
          </Link>
          <Link
            to="/faq"
            className="block px-3 py-2.5 rounded-md text-base font-medium text-white hover:bg-white/10"
          >
            FAQ
          </Link>
          <Link
            to="/contact"
            className="block px-3 py-2.5 rounded-md text-base font-medium text-white hover:bg-white/10"
          >
            Contact
          </Link>

          <div className="pt-4 mt-3 border-t border-white/15 flex flex-col gap-3">
            <Link
              to="/book-a-service"
              className="btn-shiny shine-hover w-full text-center px-5 py-3 rounded-md font-bold text-base"
            >
              Book a Service
            </Link>
            <a
              href={BUSINESS.phoneHref}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-white/10 text-white font-semibold text-base hover:bg-white/15 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#F28C28]" aria-hidden="true" />
              Call {BUSINESS.phoneDisplay} ({BUSINESS.hours})
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
