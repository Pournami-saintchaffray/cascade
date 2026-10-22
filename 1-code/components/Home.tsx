'use client';
import { useCallback, useEffect, useState } from 'react';
import { Header, type Layout, type SectionId } from './Header';
import { Intro } from './Intro';
import { About, AboutDescription } from './About';
import { Projects } from './Projects';
import { Offers } from './Offers';
import { Contact } from './Contact';

const IDS: SectionId[] = ['about', 'projects', 'offers', 'contact'];

export function Home() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<SectionId>('about');
  const [layout, setLayout] = useState<Layout>('three');
  const onProgress = useCallback((p: number) => setProgress((prev) => (Math.abs(prev - p) > 0.002 || p === 1 || p === 0 ? p : prev)), []);

  useEffect(() => {
    const saved = sessionStorage.getItem('cascade-layout') as Layout | null;
    if (saved) setLayout(saved);
    const hash = window.location.hash.slice(1) as SectionId;
    if (IDS.includes(hash)) requestAnimationFrame(() => { const el = document.getElementById(hash); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY }); });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id as SectionId); });
    }, { rootMargin: '-50% 0px -50% 0px' });
    IDS.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  const navigate = (id: SectionId) => {
    const el = document.getElementById(id); if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: 'smooth' });
    history.replaceState(null, '', `#${id}`);
  };
  const changeLayout = (l: Layout) => { setLayout(l); sessionStorage.setItem('cascade-layout', l); };
  const chrome = Math.max(0, Math.min(1, (progress - 0.92) / 0.08));

  return (
    <>
      <Header active={active} visible={chrome > 0.5} onNavigate={navigate}
        layout={active === 'projects' ? layout : undefined} onLayout={changeLayout} />
      <main className="page">
        <div className="wallpaper" aria-hidden />
        <Intro onProgress={onProgress} />
        <About />
        <AboutDescription />
        <Projects layout={layout} active={active === 'projects'} />
        <Offers />
        <Contact />
      </main>
    </>
  );
}
