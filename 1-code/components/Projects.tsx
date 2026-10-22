'use client';
import { useEffect, useRef, useState } from 'react';
import { PROJECTS } from '@/lib/projects';
import { useLoop } from '@/lib/useLoop';
import { useInView } from '@/lib/useInView';
import { ProductCard } from './ProductCard';
import { Arrow } from './Arrows';
import type { Layout } from './Header';

/** 2.1 grid · 2.2 three-in-frame carousel · 2.3 single hero carousel (both loop, ends vanish into side gradients). */
export function Projects({ layout, active }: { layout: Layout; active: boolean }) {
  const [idx, setIdx] = useState(0);
  const three = layout === 'three';
  const slot = three ? 19 : 40, w = three ? 15 : 30, range = three ? 3 : 1;
  const items = useLoop(PROJECTS.length, idx);
  const titleIn = useInView('projects');
  const n = PROJECTS.length, last = n % 3;
  // mouse / touch swipe: every ~6vw of drag turns the loop one step; a drag never opens a project
  const drag = useRef<{ x: number | null; moved: boolean }>({ x: null, moved: false });
  const swipe = {
    onPointerDown: (e: React.PointerEvent) => { drag.current = { x: e.clientX, moved: false }; },
    onPointerMove: (e: React.PointerEvent) => {
      const d = drag.current; if (d.x == null) return;
      const dx = e.clientX - d.x, step = Math.max(50, innerWidth * 0.06);
      if (Math.abs(dx) > step) { d.moved = true; d.x = e.clientX; setIdx((i) => i + (dx < 0 ? 1 : -1)); }
    },
    onPointerUp: () => { drag.current.x = null; },
    onPointerCancel: () => { drag.current.x = null; },
    onPointerLeave: () => { drag.current.x = null; },
    onClickCapture: (e: React.MouseEvent) => { if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); drag.current.moved = false; } },
    onDragStart: (e: React.DragEvent) => e.preventDefault(),
  };

  useEffect(() => {
    if (!active || layout === 'grid') return;
    const k = (e: KeyboardEvent) => { if (e.key === 'ArrowRight') setIdx((i) => i + 1); if (e.key === 'ArrowLeft') setIdx((i) => i - 1); };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  }, [active, layout]);

  return (
    <section id="projects" className="section" aria-label="Projects">
      {layout === 'grid' ? (
        <>
          <div className="band-v" />
          <div className="band-tb" />
          <div className="grid">{PROJECTS.map((p, i) => <ProductCard key={p.slug} p={p} style={last === 2 && i === n - 2 ? { gridColumn: '1 / span 1' } : undefined} />)}</div>
        </>
      ) : (
        <>
          <div className="band-h" />
          <h2 aria-hidden className="slide-title slide-title--r" style={{ opacity: titleIn ? 1 : 0, transform: `translateX(${titleIn ? '0px' : '60vw'})` }}>PROJECTS</h2>
          <div className="track" {...swipe} style={{ top: 'calc(50% + 44px)', height: three ? 'min(30vh,260px)' : 'min(46vh,420px)', touchAction: 'pan-y', userSelect: 'none', cursor: 'grab' }}>
            {items.map(({ i, k, jump }) => (
              <ProductCard key={PROJECTS[i].slug} p={PROJECTS[i]} labelGap={three ? '2.5vh' : '3vh'} style={{
                left: `calc(50% + ${k * slot - w / 2}vw)`, width: `${w}vw`,
                transition: jump || Math.abs(k) > range + 1 ? 'none' : 'left .8s var(--ease)',
              }} />
            ))}
          </div>
          <div className="side-fade side-fade--l" style={{ width: three ? '20vw' : '30vw' }} />
          <div className="side-fade side-fade--r" style={{ width: three ? '20vw' : '30vw' }} />
          <Arrow dir="l" top="calc(50% + 44px)" onClick={() => setIdx((i) => i - 1)} />
          <Arrow dir="r" top="calc(50% + 44px)" onClick={() => setIdx((i) => i + 1)} />
        </>
      )}
    </section>
  );
}
