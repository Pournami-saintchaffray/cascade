'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Project } from '@/lib/projects';
import { useLoop } from '@/lib/useLoop';
import { Header, type Layout } from './Header';
import { Arrow } from './Arrows';

/** 2a — big looping gallery; neighbours slide out behind the side gradients.
 *  Close with the pink ×, Esc, or a click anywhere on the waterfall background. */
export function ProjectGallery({ project }: { project: Project }) {
  const router = useRouter();
  const images = project.gallery ?? [project.image, project.colorImage].filter(Boolean) as string[];
  const [idx, setIdx] = useState(0);
  const [layout, setLayout] = useState<Layout>('three');
  const items = useLoop(images.length, idx);
  const meta = project.meta ?? [project.name];
  const close = () => router.push('/#projects');
  const changeLayout = (l: Layout) => { sessionStorage.setItem('cascade-layout', l); close(); };

  useEffect(() => {
    const saved = sessionStorage.getItem('cascade-layout') as Layout | null;
    if (saved) setLayout(saved);
    const k = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setIdx((i) => i + 1);
      if (e.key === 'ArrowLeft') setIdx((i) => i - 1);
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onBg = (e: React.MouseEvent) => {
    const t = e.target as HTMLElement;
    if (t.closest('button,a,img,.info')) return;
    close();
  };

  return (
    <>
      <Header active="projects" layout={layout} onLayout={changeLayout} />
      <main className="project" aria-label={project.name} onClick={onBg}>
        <div className="wallpaper" aria-hidden />
        <div className="band-h" />
        <div className="gallery">
          {items.map(({ i, k, jump }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={images[i]} src={images[i]} alt={k === 0 ? `${project.name} — image ${i + 1}` : ''} aria-hidden={k !== 0}
              loading={Math.abs(k) <= 1 ? 'eager' : 'lazy'}
              style={{ left: `calc(50% + ${k * 80 - 36}vw)`, width: '72vw', transition: jump ? 'none' : 'left .8s var(--ease)' }} />
          ))}
        </div>
        <div className="side-fade side-fade--l" style={{ width: '22vw', background: 'linear-gradient(90deg,#fff 26%,rgba(255,255,255,0))' }} />
        <div className="side-fade side-fade--r" style={{ width: '22vw', background: 'linear-gradient(270deg,#fff 26%,rgba(255,255,255,0))' }} />
        <button className="project__close" aria-label="Close project" onClick={close}>
          <svg viewBox="0 0 16 16" aria-hidden><path d="M2.5 2.5 L13.5 13.5 M13.5 2.5 L2.5 13.5" stroke="currentColor" strokeWidth="2.2" fill="none" /></svg>
        </button>
        {images.length > 1 && <>
          <Arrow big dir="l" top="54%" onClick={() => setIdx((i) => i - 1)} />
          <Arrow big dir="r" top="54%" onClick={() => setIdx((i) => i + 1)} />
        </>}
        <div className="info">
          <div className="info__bar">
            {meta.map((m, i) => (
              <div key={i} className={`info__cell ${i === meta.length - 1 && meta.length > 1 ? 'info__cell--year' : ''}`}>{m}</div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
