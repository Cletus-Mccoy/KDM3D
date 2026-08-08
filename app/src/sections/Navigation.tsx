import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router';
import { Menu, X } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
}

interface NavigationProps {
  navLinks: NavLink[];
  /** Link to the other track (maker <-> consulting). */
  crossLink: { label: string; to: string };
}

export default function Navigation({ navLinks, crossLink }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    navLinks.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navLinks]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMenuOpen(false);
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    []
  );

  return (
    <nav className={`nav-fixed ${scrolled ? 'scrolled' : ''}`}>
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2"
        >
          <span
            className="font-mono text-lg font-bold tracking-tight"
            style={{ color: 'white' }}
          >
            KADANS<span style={{ color: '#F48C06' }}> KONSULT</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
            >
              {link.label}
            </a>
          ))}
          <Link to={crossLink.to} className="nav-link">
            {crossLink.label}
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? (
            <X size={24} color="white" />
          ) : (
            <Menu size={24} color="white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden absolute top-full left-0 w-full py-6 px-6 flex flex-col gap-4"
          style={{
            backgroundColor: 'rgba(43, 45, 66, 0.98)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="nav-link text-base py-2"
            >
              {link.label}
            </a>
          ))}
          <Link
            to={crossLink.to}
            onClick={() => setMenuOpen(false)}
            className="nav-link text-base py-2"
          >
            {crossLink.label}
          </Link>
        </div>
      )}
    </nav>
  );
}
