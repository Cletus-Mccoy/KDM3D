import { useScrollReveal } from '../hooks/useScrollReveal';

const projects = [
  {
    title: 'Architecturale maquettes',
    category: 'Maatwerk',
    image: '/images/portfolio-1.jpg',
    ratio: '4/3',
  },
  {
    title: 'Organische lattice structuur',
    category: 'Prototyping',
    image: '/images/portfolio-2.jpg',
    ratio: '3/4',
  },
  {
    title: 'Desk organizer',
    category: 'Functioneel design',
    image: '/images/portfolio-3.jpg',
    ratio: '4/3',
  },
  {
    title: 'Mechanische onderdelen',
    category: 'Technisch',
    image: '/images/portfolio-4.jpg',
    ratio: '16/9',
  },
  {
    title: 'Artistieke sculptuur',
    category: 'Kunst',
    image: '/images/portfolio-5.jpg',
    ratio: '3/4',
  },
  {
    title: 'Industriele brackets',
    category: 'Productie',
    image: '/images/portfolio-6.jpg',
    ratio: '4/3',
  },
];

export default function Portfolio() {
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 40 });
  const gridRef = useScrollReveal<HTMLDivElement>({ y: 40, stagger: 0.1 });

  return (
    <section
      id="portfolio"
      className="section-light"
      style={{ padding: 'var(--section-py) var(--container-px)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="section-label">Portfolio</p>
          <h2 className="section-title">Eerdere projecten</h2>
          <p
            className="section-body mx-auto"
            style={{ maxWidth: 550 }}
          >
            Een selectie van 3D-geprinte projecten die ik heb mogen realiseren.
            Van functionele prototypes tot artistieke objecten.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div
          ref={gridRef}
          data-stagger
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
        >
          {projects.map((project) => (
            <div
              key={project.title}
              data-reveal-child
              className="portfolio-item"
              style={{ '--ratio': project.ratio } as React.CSSProperties}
            >
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
              />
              <div className="portfolio-item-overlay">
                <p className="portfolio-item-title">{project.title}</p>
                <p className="portfolio-item-category">{project.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
