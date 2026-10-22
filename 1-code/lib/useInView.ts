'use client';
import { useEffect, useState } from 'react';

/** true while the element's box crosses the middle 40% of the viewport — drives the slide-in titles/text. */
export function useInView(id: string) {
  const [inView, set] = useState(false);
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const n = document.getElementById(id); if (!n) return;
      const b = n.getBoundingClientRect();
      set(b.top < innerHeight * 0.7 && b.bottom > innerHeight * 0.3);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(check); };
    check();
    document.addEventListener('scroll', on, { passive: true, capture: true });
    window.addEventListener('resize', on);
    return () => { document.removeEventListener('scroll', on, { capture: true }); window.removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, [id]);
  return inView;
}
