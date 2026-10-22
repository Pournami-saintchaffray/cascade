'use client';
import { DropVideo } from './DropVideo';
import { useInView } from '@/lib/useInView';

/** 1 — landing: the drop behind the tagline (1:1 on the 1440×900 frame, 1cqw = 14.4px). */
export function About() {
  return (
    <section id="about" className="section about" aria-label="About">
      <div className="about__stage">
        <div className="about__bubble"><DropVideo src="/videos/about-drop.mp4" /></div>
        <h1 className="about__title">
          <span>CASCADE GIVES FORM TO THE INTANGIBLE,</span>
          <span>SHAPING IDEAS INTO EXPERIENCES</span>
        </h1>
      </div>
    </section>
  );
}

/** 1b — description page; paragraph 1 slides in from the left, paragraph 2 from the right. */
export function AboutDescription() {
  const on = useInView('about-desc');
  const slide = (from: string, delay = 0) => ({
    opacity: on ? 1 : 0, transform: `translateX(${on ? '0px' : from})`,
    transition: `transform 1.1s cubic-bezier(.2,.7,.2,1) ${delay}s, opacity 1.1s ${delay}s`,
  });
  return (
    <section id="about-desc" className="section about about-desc" aria-label="About Cascade">
      <div className="about__stage">
        <div className="about__panel">
          <p style={slide('-40vw')}>WE ARE A BOUTIQUE AGENCY OPERATING <b>ACROSS SCALE AND MEDIUM</b><br />SEAMLESSLY NAVIGATING FROM <b>DIGITAL TO MATERIAL</b>,<br />BETWEEN <b>SENSES AND TEMPORALITIES</b>.</p>
          <p style={slide('40vw', 0.15)}>BACKED BY A SOLID <b>EXPERIENCE IN MAKING</b>,<br />WE CELEBRATE THE <b>EXTRAORDINARY</b> WITH THE CONCEPTION OF <b>POWERFUL NARRATIVES</b>,<br />PUSHING THE BOUNDARIES OF <b>IMAGINATION</b> AND <b>CULTURAL EXPRESSION.</b></p>
        </div>
      </div>
    </section>
  );
}
