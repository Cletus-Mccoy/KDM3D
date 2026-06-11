import { useEffect } from 'react';
import { useLenis } from './hooks/useLenis';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Manifesto from './sections/Manifesto';
import OverMij from './sections/OverMij';
import Diensten from './sections/Diensten';
import Portfolio from './sections/Portfolio';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function App() {
  // Initialize smooth scroll
  useLenis();

  // Preload critical images
  useEffect(() => {
    const images = [
      '/images/hero-bg.jpg',
      '/images/about-kasper.jpg',
    ];
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div className="relative">
      <Navigation />
      <main>
        <Hero />
        <Manifesto />
        <OverMij />
        <Diensten />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
