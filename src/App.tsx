import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ScrollProgressBar } from './components/MotionSection';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { OurWorkPage } from './pages/OurWorkPage';
import { ServiceAreasPage } from './pages/ServiceAreasPage';
import { ContactPage } from './pages/ContactPage';
import { BookServicePage } from './pages/BookServicePage';
import { FaqPage } from './pages/FaqPage';
import { PrivacyPolicyPage, TermsPage } from './pages/LegalPages';

function NotFoundPage() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center surface-light-pearl px-4 py-32 text-center">
      <div className="max-w-md space-y-4">
        <p className="text-xs font-bold text-gradient-copper inline-block">
          Page Not Found
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-gradient-navy">
          We Couldn&apos;t Find That Page
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Return to the HOME FIXER homepage or request a home maintenance
          service directly.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="btn-dark-shiny shine-hover px-5 py-2.5 rounded-md text-sm font-semibold"
          >
            Back to Home
          </Link>
          <Link
            to="/book-a-service"
            className="btn-shiny shine-hover px-5 py-2.5 rounded-md text-sm font-bold"
          >
            Book a Service
          </Link>
        </div>
      </div>
    </section>
  );
}

function AppShell() {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);

  useEffect(() => {
    const onQuotaExceeded = () => setMapsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', onQuotaExceeded);
    return () =>
      window.removeEventListener('gmp-quota-exceeded', onQuotaExceeded);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#091322] text-[#1E293B]">
      <ScrollProgressBar />

      {mapsQuotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner,
            visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      <Header />

      <main className="flex-1 page-turn-stage overflow-x-clip">
        <AnimatePresence
          initial={false}
          mode="wait"
          onExitComplete={() => window.scrollTo({ top: 0, behavior: 'auto' })}
        >
          <motion.div
            key={location.pathname}
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    rotateY: 20,
                    x: 44,
                    scale: 0.965,
                    transformOrigin: 'left center',
                  }
            }
            animate={{
              opacity: 1,
              rotateY: 0,
              x: 0,
              scale: 1,
              transformOrigin: 'left center',
            }}
            exit={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 0,
                    rotateY: -18,
                    x: -36,
                    scale: 0.965,
                    transformOrigin: 'left center',
                  }
            }
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
            className="will-change-transform"
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route
                path="/services/plumbing"
                element={<ServiceDetailPage serviceId="plumbing" />}
              />
              <Route
                path="/services/electrical"
                element={<ServiceDetailPage serviceId="electrical" />}
              />
              <Route
                path="/services/painting"
                element={<ServiceDetailPage serviceId="painting" />}
              />
              <Route
                path="/services/ac"
                element={<ServiceDetailPage serviceId="ac" />}
              />
              <Route
                path="/services/general-maintenance"
                element={<ServiceDetailPage serviceId="general-maintenance" />}
              />
              <Route path="/our-work" element={<OurWorkPage />} />
              <Route path="/service-areas" element={<ServiceAreasPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/book-a-service" element={<BookServicePage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-and-conditions" element={<TermsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
