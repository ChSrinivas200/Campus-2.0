import { useEffect } from 'react';

/**
 * useScrollAnimations Hook
 * 1. IntersectionObserver for Scroll-Triggered Reveals (.reveal-on-scroll, .reveal-pop)
 * 2. Parallax translateY offsets for elements with [data-parallax-speed]
 * 3. Respects prefers-reduced-motion
 */
export function useScrollAnimations() {
  useEffect(() => {
    // 1. Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 2. IntersectionObserver for Reveal on Scroll
    const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-pop');
    
    if (prefersReducedMotion) {
      revealElements.forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            // Unobserve once revealed to keep performance high
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    // 3. Parallax Scroll Handler for [data-parallax-speed]
    const parallaxElements = document.querySelectorAll('[data-parallax-speed]');
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset;
          const windowHeight = window.innerHeight;

          parallaxElements.forEach((el) => {
            const speed = parseFloat(el.getAttribute('data-parallax-speed') || '0.1');
            const rect = el.getBoundingClientRect();
            const elementTop = rect.top + scrollY;

            // Only calculate parallax if near current viewport (within 1.5 screens)
            if (scrollY + windowHeight > elementTop - 300 && scrollY < elementTop + rect.height + 300) {
              const distanceFromCenter = (scrollY + windowHeight / 2) - (elementTop + rect.height / 2);
              const translateY = Math.round(distanceFromCenter * speed);
              el.style.transform = `translate3d(0, ${translateY}px, 0)`;
            }
          });

          ticking = false;
        });

        ticking = true;
      }
    };

    if (parallaxElements.length > 0) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      if (window.__lenis) {
        window.__lenis.on('scroll', handleScroll);
      }
      handleScroll(); // Initial pass
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (window.__lenis) {
        window.__lenis.off('scroll', handleScroll);
      }
    };
  }, []);
}
