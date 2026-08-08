import Navigation from '../sections/Navigation';
import Hero from '../sections/Hero';
import Manifesto from '../sections/Manifesto';
import OverMij from '../sections/OverMij';
import Diensten from '../sections/Diensten';
import Portfolio from '../sections/Portfolio';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Over Mij', href: '#over-mij' },
  { label: 'Diensten', href: '#diensten' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

const footerLinkGroups = [
  {
    title: 'Navigatie',
    links: navLinks,
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

export default function MakerPage() {
  return (
    <div className="relative">
      <Navigation
        navLinks={navLinks}
        crossLink={{ label: 'Engineering Consulting →', to: '/consulting' }}
      />
      <main>
        <Hero />
        <Manifesto />
        <OverMij />
        <Diensten />
        <Portfolio track="maker" />
        <Contact formId="mnjybgrr" track="maker" />
      </main>
      <Footer
        linkGroups={footerLinkGroups}
        crossLink={{ label: 'Engineering Consulting →', to: '/consulting' }}
        showPrintMetrics
      />
    </div>
  );
}
