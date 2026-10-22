'use client';
import Link from 'next/link';
import { useLayoutEffect, useRef, useState } from 'react';

export type SectionId = 'about' | 'projects' | 'offers' | 'contact';
export type Layout = 'grid' | 'three' | 'one';
const NAV: SectionId[] = ['about', 'projects', 'offers', 'contact'];

type Props = {
  active: SectionId;
  visible?: boolean;
  onNavigate?: (id: SectionId) => void; // home page: smooth-scroll instead of routing
  layout?: Layout;
  onLayout?: (l: Layout) => void;
};

export function Header({ active, visible = true, onNavigate, layout, onLayout }: Props) {
  const style = { opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' } as const;
  const nav = useRef<HTMLElement>(null);
  const [ind, setInd] = useState<{ x: number; top: number } | null>(null);
  useLayoutEffect(() => {
    const place = () => {
      const a = nav.current?.querySelectorAll('a')[NAV.indexOf(active)] as HTMLElement | undefined;
      if (a) setInd({ x: a.offsetLeft, top: a.offsetTop + a.offsetHeight - 3 });
    };
    place(); document.fonts?.ready.then(place);
    window.addEventListener('resize', place); return () => window.removeEventListener('resize', place);
  }, [active]);
  return (
    <>
      <div className="frame" style={{ opacity: visible ? 1 : 0 }} aria-hidden />
      <header className="header" style={style}>
        <Link href="/#about" className="header__logo" onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate('about'); } }}>CASCADE</Link>
        <nav ref={nav} className="header__nav" aria-label="Main">
          <span className="header__ind" aria-hidden style={{ top: ind?.top ?? 48, transform: `translateX(${ind?.x ?? 0}px)`, opacity: ind ? 1 : 0 }} />
          {NAV.map((id) => (
            <Link key={id} href={`/#${id}`} className="header__link" aria-current={active === id}
              onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate(id); } }}>
              {id.toUpperCase()}
            </Link>
          ))}
        </nav>
        {layout && onLayout && (
          <div className="switcher" role="group" aria-label="Projects layout">
            <button aria-pressed={layout === 'one'} title="Single" onClick={() => onLayout('one')}><i /></button>
            <button aria-pressed={layout === 'three'} title="Carousel" onClick={() => onLayout('three')}><i /><i /><i /></button>
            <button aria-pressed={layout === 'grid'} title="Grid" onClick={() => onLayout('grid')}>
              <span className="switcher__grid">{Array.from({ length: 9 }, (_, i) => <i key={i} />)}</span>
            </button>
          </div>
        )}
      </header>
    </>
  );
}
