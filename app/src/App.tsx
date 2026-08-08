import { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { useLenis } from './hooks/useLenis';
import MakerPage from './pages/MakerPage';
import ConsultingPage from './pages/ConsultingPage';

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
    <Routes>
      <Route path="/" element={<MakerPage />} />
      <Route path="/consulting" element={<ConsultingPage />} />
    </Routes>
  );
}
