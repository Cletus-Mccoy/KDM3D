import { useEffect } from 'react';
import Navigation from '../sections/Navigation';
import ConsultingHero from '../sections/consulting/ConsultingHero';
import Manifesto from '../sections/Manifesto';
import ConsultingAbout from '../sections/consulting/ConsultingAbout';
import ConsultingServices from '../sections/consulting/ConsultingServices';
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
      { label: 'Lean & Operational Excellence', href: '#diensten' },
      { label: 'Manufacturing & automatisering', href: '#diensten' },
      { label: 'Rapid prototyping', href: '#diensten' },
    ],
  },
];

export default function ConsultingPage() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'KADANS KONSULT - Engineering Consulting';
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="relative">
      <Navigation
        navLinks={navLinks}
        crossLink={{ label: '3D-Printservice →', to: '/maker' }}
      />
      <main>
        <ConsultingHero />
        <Manifesto text="Denken in oplossingen, laag voor laag" />
        <ConsultingAbout />
        <ConsultingServices />
        <Portfolio
          track="consulting"
          title="Consulting projecten"
          description="Een selectie van technische adviestrajecten en engineering-projecten."
        />
        <Contact
          formId="mnjybgrr"
          track="consulting"
          title="Laten we samenwerken"
          description="Heb je een technisch vraagstuk? Neem contact op voor een vrijblijvende intake. Ik reageer binnen 24 uur."
        />
      </main>
      <Footer
        linkGroups={footerLinkGroups}
        crossLink={{ label: '3D-Printservice →', to: '/maker' }}
      />
    </div>
  );
}
