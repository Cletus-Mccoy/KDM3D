export type PortfolioTrack = 'maker' | 'consulting';

export interface PortfolioItem {
  title: string;
  category: string;
  track: PortfolioTrack;
  image: string;
  ratio: string;
  /** True until replaced with a real, shipped project. Renders a "Voorbeeld" badge. */
  placeholder?: boolean;
}

// TODO(content): replace with Kasper's real maker-service projects (title, category, photo).
export const portfolioItems: PortfolioItem[] = [
  {
    title: 'Architecturale maquettes',
    category: 'Maatwerk',
    track: 'maker',
    image: '/images/portfolio-1.jpg',
    ratio: '4/3',
    placeholder: true,
  },
  {
    title: 'Organische lattice structuur',
    category: 'Prototyping',
    track: 'maker',
    image: '/images/portfolio-2.jpg',
    ratio: '3/4',
    placeholder: true,
  },
  {
    title: 'Desk organizer',
    category: 'Functioneel design',
    track: 'maker',
    image: '/images/portfolio-3.jpg',
    ratio: '4/3',
    placeholder: true,
  },
  {
    title: 'Mechanische onderdelen',
    category: 'Technisch',
    track: 'maker',
    image: '/images/portfolio-4.jpg',
    ratio: '16/9',
    placeholder: true,
  },
  {
    title: 'Artistieke sculptuur',
    category: 'Kunst',
    track: 'maker',
    image: '/images/portfolio-5.jpg',
    ratio: '3/4',
    placeholder: true,
  },
  {
    title: 'Industriele brackets',
    category: 'Productie',
    track: 'maker',
    image: '/images/portfolio-6.jpg',
    ratio: '4/3',
    placeholder: true,
  },
  // TODO(content): enrich with real project specifics (scope, results, photos) per engagement.
  {
    title: 'AluSense — Reliability Engineering',
    category: 'Project & Reliability Engineer',
    track: 'consulting',
    image: '/images/service-validate.jpg',
    ratio: '16/9',
    placeholder: true,
  },
  {
    title: 'Stellantis e-Transmissions — Geartrain productie',
    category: 'Process & Manufacturing Engineer',
    track: 'consulting',
    image: '/images/service-design.jpg',
    ratio: '16/9',
    placeholder: true,
  },
  {
    title: 'Ontex — OEE & Lean Manufacturing',
    category: 'Process Engineer (via Ausy Belgium)',
    track: 'consulting',
    image: '/images/portfolio-4.jpg',
    ratio: '16/9',
    placeholder: true,
  },
];
