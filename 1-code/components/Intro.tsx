'use client';
import { useEffect, useRef } from 'react';

const clamp = (v: number) => Math.max(0, Math.min(1, v));

/** 0 — waterfall video; CASCADE grows from its centre as the user scrolls. */
export function Intro({ onProgress }: { onProgress: (p: number) => void }) {
  const root = useRef<HTMLElement>(null);
  const word = useRef<HTMLSpanElement>(null);
  const sticky = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const el = root.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const p = clamp(-r.top / Math.max(1, r.height - window.innerHeight));
      // direct style writes: no React re-render per scroll frame
      // scale via font-size (not transform) so the glyphs are re-drawn as vectors and stay sharp at any zoom
      if (word.current) word.current.style.fontSize = `calc(clamp(40px, 5.2vw, 86px) * ${1 + Math.pow(p, 2.4) * 60})`;
      // intro fades out; About follows after a short strip of plain waterfall
      if (sticky.current) sticky.current.style.opacity = String(1 - clamp((p - 0.86) / 0.14));
      const about = document.getElementById('about');
      // once the intro is done, lift About above the side-gradient frame so the tagline sits in front of it
      if (about) about.style.zIndex = p >= 0.999 ? '45' : '1';
      onProgress(p);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    document.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('wheel', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll, { capture: true });
      window.removeEventListener('wheel', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [onProgress]);

  return (
    <section ref={root} className="intro" aria-label="Intro">
      <div ref={sticky} className="intro__sticky">
        <video className="intro__video" src="/videos/waterfall-intro.mp4" autoPlay muted loop playsInline preload="auto" />
        <div className="intro__center">
          <span ref={word} className="intro__word">
            CASCADE
          </span>
        </div>
      </div>
    </section>
  );
}
