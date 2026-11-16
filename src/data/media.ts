import heroPlumbingImg from '../assets/images/hero_plumbing_1794782464442.jpg';
import heroElectricalImg from '../assets/images/hero_electrical_1794782466201.jpg';
import heroAcComfortImg from '../assets/images/hero_ac_comfort_1794782465772.jpg';
import modernHomeInteriorImg from '../assets/images/modern_home_interior_1794782465740.jpg';
import residentialPaintingImg from '../assets/images/residential_painting_1794782466710.jpg';
import homeTechnicianImg from '../assets/images/home_technician_1794782467359.jpg';
import modernBathroomPlumbingImg from '../assets/images/modern_bathroom_plumbing_1794782468260.jpg';
import architecturalLightingImg from '../assets/images/architectural_home_lighting_1794782467958.jpg';
import modernVillaExteriorImg from '../assets/images/modern_villa_exterior_1794782468726.jpg';
import acBedroomComfortImg from '../assets/images/ac_bedroom_comfort_1794782468964.jpg';
import type { ServiceId } from './business';

export const MEDIA = {
  heroPlumbing: heroPlumbingImg,
  heroElectrical: heroElectricalImg,
  heroAcComfort: heroAcComfortImg,
  modernHomeInterior: modernHomeInteriorImg,
  residentialPainting: residentialPaintingImg,
  homeTechnician: homeTechnicianImg,
  modernBathroomPlumbing: modernBathroomPlumbingImg,
  architecturalLighting: architecturalLightingImg,
  modernVillaExterior: modernVillaExteriorImg,
  acBedroomComfort: acBedroomComfortImg,
} as const;

export const HERO_SLIDES = [
  {
    id: 'plumbing',
    image: MEDIA.heroPlumbing,
    imageAlt:
      'Plumber fitting chrome pipes under a modern bathroom vanity',
    headline: 'Reliable Plumbing Solutions for Your Home',
    supportingText:
      'Leaky pipes, dripping taps, or bathroom fittings—sorted cleanly.',
    ctaLabel: 'Explore Plumbing Services',
    ctaTo: '/services/plumbing',
  },
  {
    id: 'electrical',
    image: MEDIA.heroElectrical,
    imageAlt:
      'Electrician inspecting a modern home breaker panel with a multimeter',
    headline: 'Professional Electrical Services You Can Trust',
    supportingText:
      'Switches, lighting, breakers, and fault finding done safely.',
    ctaLabel: 'Explore Electrical Services',
    ctaTo: '/services/electrical',
  },
  {
    id: 'ac-comfort',
    image: MEDIA.heroAcComfort,
    imageAlt:
      'AC technician servicing a split air conditioner inside a modern living room',
    headline: 'Complete Home Comfort Starts Here',
    supportingText:
      'AC servicing, painting, and everyday repairs—one call covers it all.',
    ctaLabel: 'Book a Service',
    ctaTo: '/book-a-service',
  },
] as const;

export const SERVICE_IMAGES: Record<ServiceId, { src: string; alt: string }> = {
  plumbing: {
    src: MEDIA.modernBathroomPlumbing,
    alt: 'Modern bathroom with brushed chrome shower fixtures and oak vanity',
  },
  electrical: {
    src: MEDIA.architecturalLighting,
    alt: 'Modern kitchen and dining space with warm lighting and wall switches',
  },
  painting: {
    src: MEDIA.residentialPainting,
    alt: 'Painter rolling off-white paint onto a protected living room wall',
  },
  ac: {
    src: MEDIA.acBedroomComfort,
    alt: 'Quiet bedroom cooled by a wall-mounted split air conditioner',
  },
  'general-maintenance': {
    src: MEDIA.homeTechnician,
    alt: 'Home technician checking kitchen cabinet alignment with tools',
  },
};

export type GalleryCategory =
  | 'All'
  | 'Plumbing'
  | 'Electrical'
  | 'Painting'
  | 'AC Services'
  | 'General Maintenance';

export interface GalleryItem {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, 'All'>;
  image: string;
  alt: string;
  caption: string;
  aspect: 'wide' | 'square' | 'tall';
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-plumbing-1',
    title: 'Vanity Pipework',
    category: 'Plumbing',
    image: MEDIA.heroPlumbing,
    alt: 'Plumber fitting chrome drain piping under a stone bathroom vanity',
    caption: 'Under-sink pipe fitting and leak repair',
    aspect: 'wide',
  },
  {
    id: 'gal-bathroom-2',
    title: 'Shower & Basin',
    category: 'Plumbing',
    image: MEDIA.modernBathroomPlumbing,
    alt: 'Modern shower and porcelain sink with chrome mixer fixtures',
    caption: 'Mixer taps, shower heads, and basin lines',
    aspect: 'square',
  },
  {
    id: 'gal-electrical-1',
    title: 'Breaker Panel',
    category: 'Electrical',
    image: MEDIA.heroElectrical,
    alt: 'Electrician testing breakers in a home distribution board',
    caption: 'Circuit diagnostics and breaker troubleshooting',
    aspect: 'wide',
  },
  {
    id: 'gal-electrical-2',
    title: 'Kitchen Lighting',
    category: 'Electrical',
    image: MEDIA.architecturalLighting,
    alt: 'Dining room with pendant lights, LED downlights, and matte switches',
    caption: 'Recessed downlights, pendants, and switch plates',
    aspect: 'square',
  },
  {
    id: 'gal-painting-1',
    title: 'Living Room Paint',
    category: 'Painting',
    image: MEDIA.residentialPainting,
    alt: 'Painter rolling neutral paint onto a masked living room wall',
    caption: 'Masked edges, drop cloths, and even coats',
    aspect: 'tall',
  },
  {
    id: 'gal-painting-2',
    title: 'Exterior Finish',
    category: 'Painting',
    image: MEDIA.modernVillaExterior,
    alt: 'Modern villa exterior with white and slate painted stucco walls',
    caption: 'Weather-resistant facade and wall paint',
    aspect: 'wide',
  },
  {
    id: 'gal-ac-1',
    title: 'Split AC Service',
    category: 'AC Services',
    image: MEDIA.heroAcComfort,
    alt: 'Technician inspecting an open split air conditioner unit in a living room',
    caption: 'Coil wash, filter clean, and airflow check',
    aspect: 'wide',
  },
  {
    id: 'gal-ac-2',
    title: 'Bedroom AC Care',
    category: 'AC Services',
    image: MEDIA.acBedroomComfort,
    alt: 'Quiet bedroom with wall-mounted split air conditioner unit',
    caption: 'Routine maintenance for steady, quiet cooling',
    aspect: 'square',
  },
  {
    id: 'gal-general-1',
    title: 'Cabinet Hardware',
    category: 'General Maintenance',
    image: MEDIA.homeTechnician,
    alt: 'Technician checking kitchen cabinet alignment with a level and tools',
    caption: 'Hinges, locks, and everyday interior fixes',
    aspect: 'square',
  },
  {
    id: 'gal-general-2',
    title: 'Full Home Upkeep',
    category: 'General Maintenance',
    image: MEDIA.modernHomeInterior,
    alt: 'Well-kept open living and dining room with clean woodwork and lighting',
    caption: 'Multi-room repairs and seasonal property care',
    aspect: 'wide',
  },
];
