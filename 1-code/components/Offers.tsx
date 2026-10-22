'use client';
import { KeyedVideo } from './KeyedVideo';
import { useInView } from '@/lib/useInView';

const TEXT = 'The origin of every vision-where bold ideas, imagination, and possibilities are explored without boundaries.';
const OFFERS = [
  { title: 'IDEATION', left: '17.36%', video: '/videos/offer-gas.mp4', crop: 0.42 },
  { title: 'CONCEPTION', left: '43.89%', video: '/videos/offer-water.mp4', crop: 0.62 },
  { title: 'MATERIALIZATION', left: '70.83%', video: '/videos/offer-ice.mp4', crop: 0.82 },
];

/** 3 — gas · water · ice clips (black keyed out, 80% opacity); OFFERS title slides in from the left. */
export function Offers() {
  const on = useInView('offers');
  return (
    <section id="offers" className="section offers" aria-label="Offers">
      <h2 aria-hidden className="slide-title slide-title--l" style={{ opacity: on ? 1 : 0, transform: `translateX(${on ? '0px' : '-60vw'})` }}>OFFERS</h2>
      <div className="offers__grid">
        {OFFERS.map((o) => (
          <article key={o.title} className="offer" style={{ left: o.left }}>
            <div className="offer__img" role="img" aria-label={o.title}><KeyedVideo src={o.video} crop={o.crop} /></div>
            <div className="offer__box">
              <h3 className="offer__title">{o.title}</h3>
              <p>{TEXT}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
