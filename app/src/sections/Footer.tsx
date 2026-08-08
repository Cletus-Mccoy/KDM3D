import { Link } from 'react-router';

interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

interface FooterProps {
  linkGroups: FooterLinkGroup[];
  crossLink: { label: string; to: string };
  showPrintMetrics?: boolean;
}

export default function Footer({ linkGroups, crossLink, showPrintMetrics = false }: FooterProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      className="section-dark"
      style={{
        padding: '5rem var(--container-px) 2rem',
        borderTop: '1px solid rgba(255,232,214,0.1)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top: Wordmark */}
        <div className="mb-16">
          <h2
            className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter"
            style={{ color: 'var(--color-paper)', opacity: 0.15 }}
          >
            KADANS KONSULT
          </h2>
        </div>

        {/* Middle: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h4
                className="font-bold text-sm mb-4"
                style={{ color: 'var(--color-paper)' }}
              >
                {group.title}
              </h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleClick(e, link.href)}
                      className="footer-link"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div>
            <h4
              className="font-bold text-sm mb-4"
              style={{ color: 'var(--color-paper)' }}
            >
              Contact
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:kasper.daems@kadanskonsult.be"
                  className="footer-link"
                >
                  kasper.daems@kadanskonsult.be
                </a>
              </li>
              <li>
                <span className="footer-link">Bergenhof 54, 3111 Rotselaar</span>
              </li>
              <li>
                <Link to={crossLink.to} className="footer-link">
                  {crossLink.label}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom: Copyright + Metrics */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,232,214,0.1)' }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p
              className="font-mono text-xs tracking-wider"
              style={{ color: 'rgba(255,232,214,0.4)' }}
            >
              &copy; {new Date().getFullYear()} Kadans Konsult BV. Alle rechten voorbehouden.
              {' '}— BE 0803.578.880 — Bergenhof 54, 3111 Rotselaar
            </p>
            <p
              className="font-mono text-xs tracking-wider"
              style={{ color: 'rgba(255,232,214,0.4)' }}
            >
              Made with ❤️ in Belgium by{' '}
              <a
                href="https://truyens.pro"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition-colors"
                style={{ color: 'rgba(255,232,214,0.6)' }}
              >
                truyens.pro
              </a>
            </p>
          </div>
          {showPrintMetrics && (
            <div className="flex items-center gap-6">
              <span className="tech-metrics">
                LAYER HEIGHT: 0.12MM
              </span>
              <span className="tech-metrics">
                INFILL: 20%
              </span>
              <span className="tech-metrics">
                SPEED: 60MM/S
              </span>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
