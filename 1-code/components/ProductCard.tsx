import Link from 'next/link';
import { labelOf, type Project } from '@/lib/projects';

/** Grey render; cross-fades to the colourful render on hover. Name tag sits below. */
export function ProductCard({ p, style, className = '', labelGap }: { p: Project; style?: React.CSSProperties; className?: string; labelGap?: string }) {
  return (
    <Link href={`/projects/${p.slug}`} className={`card ${className}`} style={style} aria-label={p.name}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="card__base" src={p.image} alt="" loading="lazy" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={`card__color ${p.colorImage ? '' : 'card__color--tint'}`} src={p.colorImage ?? p.image} alt="" loading="lazy" />
      <span className="card__label" style={labelGap ? { top: `calc(100% + ${labelGap})` } : undefined}>{labelOf(p)}</span>
    </Link>
  );
}
