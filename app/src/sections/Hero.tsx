import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!section || !bg || !overlay || !content) return;

    // Parallax scroll effect
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    scrollTl.fromTo(bg, { scale: 1.2 }, { scale: 1, ease: 'none' });
    scrollTl.to(overlay, { opacity: 0.85, ease: 'none' }, 0);
    scrollTl.to(content, { y: -80, opacity: 0.3, ease: 'none' }, 0);

    // Entrance animation
    const entranceTl = gsap.timeline({ delay: 0.3 });
    entranceTl.fromTo(
      '.hero-title-line',
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', stagger: 0.15 }
    );
    entranceTl.fromTo(
      '.hero-tagline',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    );
    entranceTl.fromTo(
      '.hero-cta',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    );
    entranceTl.fromTo(
      '.scroll-indicator',
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      '-=0.2'
    );

    return () => {
      scrollTl.kill();
      entranceTl.kill();
    };
  }, []);

  const handleScrollDown = () => {
    const el = document.querySelector('#over-mij');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="hero-section"
    >
      <img
        ref={bgRef}
        src="/images/hero-bg.jpg"
        alt="3D printer in action"
        className="hero-bg"
      />
      <div ref={overlayRef} className="hero-overlay" style={{ opacity: 0.4 }} />

      <div ref={contentRef} className="hero-content">
        <div className="overflow-hidden mb-2">
          <h1 className="hero-title hero-title-line">KDM 3D</h1>
        </div>
        <div className="overflow-hidden">
          <p className="hero-tagline hero-title-line">
            Precision Crafted Layers
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 hero-cta">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hero-cta"
          >
            <Quote size={16} />
            Vraag een offerte
          </a>
          <a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/30 text-white font-mono text-sm tracking-wider uppercase hover:bg-white/10 transition-all duration-300"
          >
            Bekijk werk
          </a>
        </div>
      </div>

      <button
        onClick={handleScrollDown}
        className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
        aria-label="Scroll down"
      >
        <span className="font-mono text-[0.625rem] tracking-widest uppercase">Scroll</span>
        <ArrowDown size={18} />
      </button>
    </section>
  );
}
