import { useScrollReveal } from '../hooks/useScrollReveal';
import { portfolioItems, type PortfolioTrack } from '../data/portfolio';

interface PortfolioProps {
  track: PortfolioTrack;
  title?: string;
  description?: string;
}

export default function Portfolio({
  track,
  title = 'Eerdere projecten',
  description = 'Een selectie van 3D-geprinte projecten die ik heb mogen realiseren. Van functionele prototypes tot artistieke objecten.',
}: PortfolioProps) {
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 40 });
  const gridRef = useScrollReveal<HTMLDivElement>({ y: 40, stagger: 0.1 });
  const projects = portfolioItems.filter((item) => item.track === track);

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
          <h2 className="section-title">{title}</h2>
          <p
            className="section-body mx-auto"
            style={{ maxWidth: 550 }}
          >
            {description}
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
              {project.placeholder && (
                <span className="portfolio-item-placeholder-badge">
                  Voorbeeld
                </span>
              )}
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
