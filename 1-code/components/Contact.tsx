/** 4 — positions taken 1:1 from the 1440×900 design frame (cqw = 1/100 of 1440).
 *  Text + white box layer sits above the side-gradient frame; the GIF layer stays beneath it. */
export function Contact() {
  return (
    <section id="contact" className="section contact" aria-label="Contact">
      <div className="contact__stage">
        <div className="contact__layer contact__layer--front">
          <div className="contact__box" aria-hidden />
          <h2>GET IN TOUCH</h2>
          <a className="contact__mail" href="mailto:contact@cascade.com">contact@cascade.com</a>
          <p className="contact__addr">Address: 19 Rue des Frigos, 75013 Paris<br />Ph no: +33 745313303</p>
          <a className="contact__link" style={{ left: '5.21cqw' }} href="#" target="_blank" rel="noreferrer">Instagram</a>
          <a className="contact__link" style={{ left: '12.78cqw' }} href="#" target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="contact__link" style={{ left: '19.44cqw' }} href="#">Careers</a>
        </div>
        <div className="contact__layer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="contact__media" src="/images/contact-pattern.gif" alt="" />
        </div>
      </div>
    </section>
  );
}
