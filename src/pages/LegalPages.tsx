import { Link } from 'react-router-dom';
import { BUSINESS } from '../data/business';
import { MEDIA } from '../data/media';
import { PageMeta } from '../components/PageMeta';
import { PageHero } from '../components/PageHero';

export function PrivacyPolicyPage() {
  return (
    <div>
      <PageMeta
        title="Privacy Policy | HOME FIXER"
        description="Editable privacy information template for HOME FIXER describing how booking and contact enquiries are handled."
        path="/privacy-policy"
      />

      <PageHero
        kicker="Legal Information · Editable Template"
        title="Privacy Policy"
        description="Structured informational notice outlining how customer enquiry and service-request details are collected and used."
        image={MEDIA.modernHomeInterior}
        imageAlt="Modern home interior"
        breadcrumbLabel="Privacy Policy"
      />

      <section className="py-16 lg:py-20 surface-light-pearl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 card-pearl-sheen rounded-xl p-8 sm:p-12 space-y-8 text-slate-800">
          <div className="p-4 rounded-lg bg-[#ECEFF2] text-sm text-[#142B45]">
            <strong>Note:</strong> This structured policy document is provided
            as an editable template for {BUSINESS.name} and should be reviewed
            by the business owner or legal counsel before asserting formal legal
            compliance.
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[#142B45]">
              1. Information You Provide
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#202A35]/85">
              When you submit a service request or enquiry through our website,
              we collect only the details you choose to enter—such as your full
              name, phone number, optional WhatsApp number or email address,
              service address, area, selected services, preferred appointment
              window, and problem description.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[#142B45]">
              2. How Information Is Used
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#202A35]/85">
              Information submitted is used strictly to review your repair
              request, contact you to coordinate an appointment, and dispatch
              relevant home maintenance assistance in Bahria Town, Rawalpindi,
              or Islamabad.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[#142B45]">
              3. Third-Party Services &amp; Google Maps
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#202A35]/85">
              This website integrates Google Maps features to display our listed
              address and service coverage areas. Use of Google Maps features
              is subject to Google&apos;s{' '}
              <a
                href="https://maps.google.com/help/terms_maps/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[#142B45] font-medium"
              >
                Maps End User Additional Terms of Service
              </a>{' '}
              and{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[#142B45] font-medium"
              >
                Google Privacy Policy
              </a>
              . When you choose to open WhatsApp links, your message is sent
              directly via WhatsApp.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[#142B45]">
              4. Contact for Privacy Questions
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#202A35]/85">
              To update or ask about a submitted service enquiry, contact{' '}
              {BUSINESS.name} at{' '}
              <a
                href={BUSINESS.phoneHref}
                className="font-semibold text-[#142B45] underline"
              >
                {BUSINESS.phoneDisplay}
              </a>{' '}
              or at {BUSINESS.address}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-200 text-sm">
            <Link to="/terms-and-conditions" className="text-[#142B45] font-semibold hover:text-[#F28C28]">
              View Terms and Conditions →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export function TermsPage() {
  return (
    <div>
      <PageMeta
        title="Terms and Conditions | HOME FIXER"
        description="Editable terms and conditions outline for requesting residential maintenance and repair services from HOME FIXER."
        path="/terms-and-conditions"
      />

      <PageHero
        kicker="Legal Information · Editable Template"
        title="Terms and Conditions"
        description="Structured service-request guidelines for homeowners using the HOME FIXER website."
        image={MEDIA.modernVillaExterior}
        imageAlt="Contemporary residential villa exterior"
        breadcrumbLabel="Terms and Conditions"
      />

      <section className="py-16 lg:py-20 surface-light-pearl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 card-pearl-sheen rounded-xl p-8 sm:p-12 space-y-8 text-slate-800">
          <div className="p-4 rounded-lg bg-[#ECEFF2] text-sm text-[#142B45]">
            <strong>Note:</strong> This document is an editable template for{' '}
            {BUSINESS.name}. Specific pricing, scheduling, and service terms are
            confirmed directly with our team prior to work commencing.
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[#142B45]">
              1. Service Requests &amp; Scope Confirmation
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#202A35]/85">
              Submitting a booking form or WhatsApp message constitutes a
              request for assistance. Specific repair tasks, applicable rates,
              and appointment times are confirmed directly with {BUSINESS.name}{' '}
              before a visit takes place.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[#142B45]">
              2. Service Areas
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#202A35]/85">
              Primary residential coverage includes Bahria Town, Rawalpindi, and
              Islamabad. Requests from nearby areas are handled subject to
              confirmation with our team.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[#142B45]">
              3. Visual Content
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#202A35]/85">
              Illustrative photography and sample layout previews on this
              website represent general service categories and layout structure
              and do not represent unverified project claims or guarantees.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[#142B45]">
              4. Contact Details
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#202A35]/85">
              {BUSINESS.name} · {BUSINESS.address} · Phone:{' '}
              <a
                href={BUSINESS.phoneHref}
                className="font-semibold text-[#142B45] underline"
              >
                {BUSINESS.phoneDisplay}
              </a>{' '}
              ({BUSINESS.hours}).
            </p>
          </div>

          <div className="pt-4 border-t border-slate-200 text-sm">
            <Link to="/privacy-policy" className="text-[#142B45] font-semibold hover:text-[#F28C28]">
              View Privacy Policy →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
