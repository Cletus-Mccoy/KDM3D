import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal<T extends HTMLElement>(
  options?: {
    y?: number;
    x?: number;
    opacity?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
    ease?: string;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    scale?: number;
  }
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      y = 60,
      x = 0,
      opacity = 0,
      duration = 1,
      delay = 0,
      ease = 'power3.out',
      start = 'top 85%',
      scale = 1,
    } = options || {};

    const children = el.dataset.stagger !== undefined
      ? el.querySelectorAll('[data-reveal-child]')
      : [];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    });

    if (children.length > 0) {
      tl.fromTo(
        children,
        { y, x, opacity, scale },
        {
          y: 0,
          x: 0,
          opacity: 1,
          scale: 1,
          duration,
          delay,
          ease,
          stagger: options?.stagger || 0.1,
        }
      );
    } else {
      tl.fromTo(
        el,
        { y, x, opacity, scale },
        {
          y: 0,
          x: 0,
          opacity: 1,
          scale: 1,
          duration,
          delay,
          ease,
        }
      );
    }

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
