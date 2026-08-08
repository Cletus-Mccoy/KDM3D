import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ManifestoProps {
  text?: string;
}

export default function Manifesto({ text = 'We bouwen de toekomst, laag voor laag' }: ManifestoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const text = textRef.current;
    const section = sectionRef.current;
    if (!text || !section) return;

    gsap.fromTo(
      text,
      { filter: 'blur(10px) brightness(30%)', opacity: 0.2 },
      {
        filter: 'blur(0px) brightness(100%)',
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom-=15%',
          end: 'top center+=15%',
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === section)
        .forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-light"
      style={{ padding: '20vh var(--container-px)' }}
    >
      <div className="max-w-5xl mx-auto text-center">
        <p className="section-label mb-8">Manifesto</p>
        <h2
          ref={textRef}
          className="cinematic-blur-text"
          style={{
            fontSize: 'clamp(1.75rem, 5vw, 4rem)',
            lineHeight: 1.1,
            fontWeight: 900,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: 'var(--color-void)',
          }}
        >
          {text}
        </h2>
      </div>
    </section>
  );
}
