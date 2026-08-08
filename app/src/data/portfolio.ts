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
  // TODO(content): replace with Kasper's real engineering consulting case studies.
  {
    title: 'Voorbeeldproject — technisch advies',
    category: 'Consulting',
    track: 'consulting',
    image: '/images/portfolio-4.jpg',
    ratio: '16/9',
    placeholder: true,
  },
];
