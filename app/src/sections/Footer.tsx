const footerLinks = [
  {
    title: 'Navigatie',
    links: [
      { label: 'Home', href: '#home' },
      { label: 'Over Mij', href: '#over-mij' },
      { label: 'Diensten', href: '#diensten' },
      { label: 'Portfolio', href: '#portfolio' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Diensten',
    links: [
      { label: '3D-printen op maat', href: '#diensten' },
      { label: 'Design ondersteuning', href: '#diensten' },
      { label: 'Design validatie', href: '#diensten' },
    ],
  },
  {
    title: 'Materialen',
    links: [
      { label: 'PLA', href: '#' },
      { label: 'PETG', href: '#' },
      { label: 'Resin', href: '#' },
      { label: 'TPU (Flexibel)', href: '#' },
    ],
  },
];

export default function Footer() {
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
          {footerLinks.map((group) => (
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
                  href="mailto:kasper.daems@gmail.com"
                  className="footer-link"
                >
                  kasper.daems@gmail.com
                </a>
              </li>
              <li>
                <span className="footer-link">+32 471 23 45 67</span>
              </li>
              <li>
                <span className="footer-link">België</span>
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
              &copy; {new Date().getFullYear()} KADANS KONSULT. Alle rechten voorbehouden.
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
        </div>
      </div>
    </footer>
  );
}
