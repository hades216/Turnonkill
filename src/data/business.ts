export const BUSINESS = {
  name: 'HOME FIXER',
  category: 'Home Maintenance & Repairs',
  tagline: 'Your Home. Our Fix.',
  secondaryTaglines: [
    'Every Home Problem Has a Fix.',
    'Reliable Repairs. Comfortable Living.',
  ],
  description:
    'Home Fixer is your one-stop solution for professional home maintenance and repair services in Bahria Town, Rawalpindi. We offer expert plumbing, electrical work, painting, and AC services with guaranteed quality and affordable rates. Our skilled team is dedicated to making your home repairs hassle-free and reliable.',
  address:
    'Plaza 88, Center, Main Civic Centre, Civic, G-6 Markaz, Islamabad, 44000, Pakistan.',
  phoneDisplay: '0342 0520846',
  phoneHref: 'tel:+923420520846',
  whatsappNumber: '923420520846',
  whatsappBaseUrl: 'https://wa.me/923420520846',
  hours: 'Open 24 Hours',
  primaryAreas: ['Bahria Town', 'Rawalpindi', 'Islamabad'] as const,
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Plaza+88+Center+Main+Civic+Centre+G-6+Markaz+Islamabad+44000+Pakistan',
} as const;

export type ServiceId =
  | 'plumbing'
  | 'electrical'
  | 'painting'
  | 'ac'
  | 'general-maintenance';

export interface ServiceDefinition {
  id: ServiceId;
  number: string;
  title: string;
  shortTitle: string;
  route: string;
  summary: string;
  overview: string;
  offerings: string[];
  benefits: { title: string; detail: string }[];
  seoTitle: string;
  seoDescription: string;
}

export const SERVICES: ServiceDefinition[] = [
  {
    id: 'plumbing',
    number: '01',
    title: 'Plumbing Services',
    shortTitle: 'Plumbing',
    route: '/services/plumbing',
    summary:
      'Leaking pipes, dripping taps, bathroom fittings, and kitchen drains.',
    overview:
      'Fast, clean plumbing repairs for kitchens, bathrooms, and water lines in Bahria Town, Rawalpindi, and Islamabad.',
    offerings: [
      'Leaking pipes and water joints',
      'Taps, mixers, and shower heads',
      'Kitchen and bathroom drain clearing',
      'Flush tanks and basin fittings',
    ],
    benefits: [
      {
        title: 'Clean Work',
        detail:
          'We work carefully around tiles, stone vanities, and kitchen cabinets.',
      },
      {
        title: 'Stop Leaks Early',
        detail:
          'Fixing small drips right away keeps walls, paint, and woodwork dry.',
      },
      {
        title: 'Clear Up Front',
        detail:
          'Confirm what needs fixing directly with our team before work starts.',
      },
    ],
    seoTitle: 'Plumbing Services in Bahria Town, Rawalpindi & Islamabad | HOME FIXER',
    seoDescription:
      'Plumbing repairs, leaking pipes, taps, and bathroom or kitchen plumbing by HOME FIXER in Bahria Town, Rawalpindi, and Islamabad.',
  },
  {
    id: 'electrical',
    number: '02',
    title: 'Electrical Services',
    shortTitle: 'Electrical',
    route: '/services/electrical',
    summary:
      'Switches, sockets, ceiling lights, breakers, and wiring fault checks.',
    overview:
      'Safe electrical troubleshooting, lighting installation, and switch or socket repairs for homes across Bahria Town, Rawalpindi, and Islamabad.',
    offerings: [
      'Fault and short-circuit checks',
      'Switches, sockets, and dimmers',
      'Ceiling lights, fans, and outdoor lights',
      'Breaker and DB board repairs',
    ],
    benefits: [
      {
        title: 'Safe Fault Finding',
        detail:
          'Proper testing to track down tripped breakers and loose connections.',
      },
      {
        title: 'Neat Fitting',
        detail:
          'Lights, fans, and wall switches installed level and tidy.',
      },
      {
        title: 'Open 24 Hours',
        detail:
          'Call any time when power drops or a circuit needs urgent attention.',
      },
    ],
    seoTitle: 'Electrical Services in Rawalpindi & Islamabad | HOME FIXER',
    seoDescription:
      'Electrical fault finding, switches, sockets, and lighting installation by HOME FIXER in Bahria Town, Rawalpindi, and Islamabad.',
  },
  {
    id: 'painting',
    number: '03',
    title: 'Painting Services',
    shortTitle: 'Painting',
    route: '/services/painting',
    summary:
      'Interior rooms, ceilings, exterior walls, and clean wall touch-ups.',
    overview:
      'Smooth wall painting and neat edge masking for bedrooms, living areas, and exterior walls—without paint mess on your floors.',
    offerings: [
      'Interior walls and ceilings',
      'Exterior facades and boundary walls',
      'Wall patching, sanding, and priming',
      'Single-room or full-home repainting',
    ],
    benefits: [
      {
        title: 'Floors Protected',
        detail:
          'Drop sheets and masking tape keep furniture, floors, and trim clean.',
      },
      {
        title: 'Even Finish',
        detail:
          'Clean surface prep and smooth coats that hold up well indoors and out.',
      },
      {
        title: 'Your Choice of Scope',
        detail:
          'Book a single bedroom refresh, quick touch-up, or full exterior job.',
      },
    ],
    seoTitle: 'House Painting Services (Interior & Exterior) | HOME FIXER',
    seoDescription:
      'Interior and exterior house painting and wall repainting by HOME FIXER across Bahria Town, Rawalpindi, and Islamabad.',
  },
  {
    id: 'ac',
    number: '04',
    title: 'AC Services',
    shortTitle: 'AC Services',
    route: '/services/ac',
    summary:
      'Split AC servicing, coil cleaning, cooling checks, and tune-ups.',
    overview:
      'Thorough indoor and outdoor split AC cleaning, drain unblocking, and cooling checks to keep rooms cool all season.',
    offerings: [
      'Split AC deep cleaning',
      'Filter and coil washing',
      'Water leak and drain clearing',
      'Cooling and airflow checks',
    ],
    benefits: [
      {
        title: 'Better Cooling',
        detail:
          'Clean coils and filters help your AC cool faster and run quieter.',
      },
      {
        title: 'No Mess Indoors',
        detail:
          'Careful servicing keeps bedroom and lounge walls dry beneath the unit.',
      },
      {
        title: 'Combine With Other Jobs',
        detail:
          'Book AC servicing alongside electrical or plumbing checks in one visit.',
      },
    ],
    seoTitle: 'AC Servicing & Maintenance in Bahria Town, Rawalpindi & Islamabad | HOME FIXER',
    seoDescription:
      'Split AC servicing, cleaning, and cooling checks by HOME FIXER in Bahria Town, Rawalpindi, and Islamabad.',
  },
  {
    id: 'general-maintenance',
    number: '05',
    title: 'General Home Maintenance',
    shortTitle: 'General Repairs',
    route: '/services/general-maintenance',
    summary:
      'Door locks, cabinet hinges, shelves, minor fixes, and odd home jobs.',
    overview:
      'One reliable team for everyday home repairs—loose hinges, locks, curtain rods, shelves, and small fixes around the house.',
    offerings: [
      'Door locks and cabinet hinges',
      'Curtain rods, mirrors, and shelves',
      'Minor wall patching and sealing',
      'Combined multi-job home visits',
    ],
    benefits: [
      {
        title: 'One Visit, Many Fixes',
        detail:
          'Knock out your whole home repair list without juggling different people.',
      },
      {
        title: 'Quick to Arrange',
        detail:
          'Send one request online, message on WhatsApp, or call anytime.',
      },
      {
        title: 'Straight Answers',
        detail:
          'Tell us what needs fixing and confirm your visit directly with us.',
      },
    ],
    seoTitle: 'General Home Maintenance & Repairs in Bahria Town & Rawalpindi | HOME FIXER',
    seoDescription:
      'Everyday home repairs and general maintenance by HOME FIXER in Bahria Town, Rawalpindi, and Islamabad.',
  },
];

export const WHY_CHOOSE_ITEMS = [
  {
    number: '01',
    title: 'Experienced Technicians',
    description:
      'Skilled hands for plumbing, electrical, painting, AC, and general repairs.',
  },
  {
    number: '02',
    title: 'Open 24 Hours',
    description:
      'Call or message day or night whenever something needs fixing at home.',
  },
  {
    number: '03',
    title: 'Fair Rates',
    description:
      'Practical pricing discussed clearly before any repair starts.',
  },
  {
    number: '04',
    title: 'All Trades, One Call',
    description:
      'Book plumbing, electrical, AC, painting, and odd jobs together.',
  },
  {
    number: '05',
    title: 'Tidy Work',
    description:
      'Floors protected during work and cleaned up before we leave.',
  },
  {
    number: '06',
    title: 'Easy Booking',
    description:
      'Request a visit online, on WhatsApp, or straight over the phone.',
  },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Pick a Service',
    description:
      'Choose plumbing, electrical, painting, AC, or general repairs.',
  },
  {
    step: '02',
    title: 'Reach Out',
    description:
      'Book online, message on WhatsApp, or call 0342 0520846.',
  },
  {
    step: '03',
    title: 'Confirm Time',
    description:
      'Agree on your address, repair details, and visit slot.',
  },
  {
    step: '04',
    title: 'Job Done',
    description:
      'Our technician sorts the issue cleanly at your doorstep.',
  },
] as const;

export interface SampleTestimonialPreview {
  id: string;
  label: string;
  area: string;
  service: string;
  quote: string;
}

export const SAMPLE_TESTIMONIAL_PREVIEWS: SampleTestimonialPreview[] = [
  {
    id: 'sample-1',
    label: 'Review Slot 01',
    area: 'Bahria Town',
    service: 'Plumbing & AC',
    quote:
      'Recently booked a plumber or AC check with us? Verified homeowner reviews from Bahria Town go right here.',
  },
  {
    id: 'sample-2',
    label: 'Review Slot 02',
    area: 'Rawalpindi',
    service: 'Electrical',
    quote:
      'Send your honest feedback after a switch, lighting, or breaker job via WhatsApp to appear in this space.',
  },
  {
    id: 'sample-3',
    label: 'Review Slot 03',
    area: 'Islamabad',
    service: 'Painting',
    quote:
      'Only real reviews from completed visits are posted here—no made-up ratings or filler quotes.',
  },
  {
    id: 'sample-4',
    label: 'Review Slot 04',
    area: 'Bahria Town',
    service: 'General Repairs',
    quote:
      'Finished a multi-job visit? Let neighbors know how our team did by sharing a quick review on WhatsApp.',
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How do I book a repair with HOME FIXER?',
    answer:
      'Use our Book a Service form, message us on WhatsApp at 0342 0520846, or call us directly anytime.',
  },
  {
    question: 'What services do you cover?',
    answer:
      'Plumbing, Electrical, Painting, AC servicing, and General Home Maintenance.',
  },
  {
    question: 'Can I book more than one service in a single visit?',
    answer:
      'Yes. Pick your main service on the booking page and check off any extra trades you need in the same visit.',
  },
  {
    question: 'How are visit times confirmed?',
    answer:
      'Once you send your address, preferred day, and issue notes, our team confirms the exact time slot with you directly.',
  },
  {
    question: 'Which areas do you serve?',
    answer:
      'Bahria Town, Rawalpindi, Islamabad, and nearby areas (subject to quick confirmation with our team).',
  },
  {
    question: 'What are your hours and address?',
    answer:
      'We are open 24 hours at 0342 0520846. Our listed address is Plaza 88, Center, Main Civic Centre, Civic, G-6 Markaz, Islamabad, 44000, Pakistan.',
  },
];
