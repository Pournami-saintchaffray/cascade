export type Project = {
  slug: string;
  name: string;
  label?: string;         // short name under the product (defaults to the part before " · ")
  image: string;          // grey hero render
  colorImage?: string;    // colourful render shown on hover
  meta?: string[];        // info bar cells (client | project | type | location | year)
  description?: string[];
  gallery?: string[];     // project page images: drawings first, realistic renders last
};

const AP_DESC = [
  'Conceptualized, designed, and delivered bespoke furniture and branded elements for the Offshore Collection launch, a premium brand activation hosted at an exclusive Gstaad resort.',
  'Developed a refined and immersive environment tailored to a high-end clientele, translating the collection’s identity into a distinctive spatial and product experience.',
  'Designed custom furniture pieces featuring hand-selected colour gradients, individually developed and painted onto layered wood surfaces to create a unique textured finish and sense of depth. The bespoke material treatment combined colour, craftsmanship, and layered detailing to create one-of-a-kind products that reinforced the exclusivity of the collection.',
  'Collaborated across design and production to translate the creative concept into fully realized pieces, balancing aesthetic intent, materiality, fabrication.',
];

export const PROJECTS: Project[] = [
  { slug: 'alula', name: 'ALULA', meta: ['ALULA', 'THE INCENSE ROAD EXPERIENCE', 'MUSEUM', 'SAUDI ARABIA', '2026'], image: '/images/products/alula.png', colorImage: '/images/products/alula-colour.png', gallery: ['/images/web/alula/07.jpg','/images/web/alula/08.jpg','/images/web/alula/09.jpg','/images/web/alula/10.jpg','/images/web/alula/11.jpg','/images/web/alula/12.jpg','/images/web/alula/13.jpg','/images/web/alula/15.jpg','/images/web/alula/06.jpg','/images/web/alula/05.jpg','/images/web/alula/14.jpg','/images/web/alula/04.jpg','/images/web/alula/01.jpg','/images/web/alula/03.jpg','/images/web/alula/02.jpg'] },
  { slug: 'ap-basecamp', name: 'AUDEMARS PIGUET · BASECAMP', meta: ['AUDEMARS PIGUET', 'BASECAMP', 'BRAND EVENT', 'SWITZERLAND', '2026'], image: '/images/products/ap-basecamp.png', colorImage: '/images/products/ap-basecamp-colour.png', gallery: ['/images/web/ap-basecamp/02.jpg','/images/web/ap-basecamp/01.jpg','/images/web/ap-basecamp/04.jpg','/images/web/ap-basecamp/06.jpg','/images/web/ap-basecamp/07.jpg','/images/web/ap-basecamp/03.jpg','/images/web/ap-basecamp/05.jpg'] },
  { slug: 'europ', name: 'EUROP', meta: ['EUROP ASSISTANCE', 'POP UP', 'PARIS , FRANCE', '2026'], image: '/images/products/europ.png', colorImage: '/images/products/europ-colour.png', gallery: ['/images/web/europ/07.jpg','/images/web/europ/08.jpg','/images/web/europ/09.jpg','/images/web/europ/10.jpg','/images/web/europ/11.jpg','/images/web/europ/12.jpg','/images/web/europ/06.jpg','/images/web/europ/04.jpg','/images/web/europ/01.jpg','/images/web/europ/03.jpg','/images/web/europ/02.jpg','/images/web/europ/05.jpg'] },
  { slug: 'mbf', name: 'MB&F', meta: ['MB&F', 'HOROLOGICAL MACHINE LAUNCH', 'POP UP', '2026'], image: '/images/products/mbf.png', colorImage: '/images/products/mbf-colour.png', gallery: ['/images/web/mbf/10.jpg','/images/web/mbf/02.jpg','/images/web/mbf/01.jpg','/images/web/mbf/03.jpg','/images/web/mbf/04.jpg','/images/web/mbf/05.jpg','/images/web/mbf/06.jpg','/images/web/mbf/12.jpg','/images/web/mbf/07.jpg','/images/web/mbf/08.jpg','/images/web/mbf/11.jpg','/images/web/mbf/09.jpg'] },
  { slug: 'hopscotch', name: 'HOPSCOTCH', meta: ['SKP', '20TH ANNIVERSARY EVENT', 'BRAND EVENT', 'CHINA', '2027'], label: 'SKP', image: '/images/products/hopscotch.png', colorImage: '/images/products/hopscotch-colour.png', gallery: ['/images/web/hopscotch/01.jpg','/images/web/hopscotch/02.jpg','/images/web/hopscotch/03.jpg','/images/web/hopscotch/04.jpg','/images/web/hopscotch/06.jpg','/images/web/hopscotch/05.jpg','/images/web/hopscotch/07.jpg','/images/web/hopscotch/08.jpg'] },
  { slug: 'audemars-piguet', name: 'AUDEMARS PIGUET', meta: ['AUDEMARS PIGUET', 'ROYAL OAK OFFSHORE LAUNCH', 'POP UP', 'SWITZERLAND', '2026'], image: '/images/products/ap.png', colorImage: '/images/products/ap-colour.png',
    description: AP_DESC,
    gallery: ['/images/web/ap/07.jpg','/images/web/ap/06.jpg','/images/web/ap/12.jpg','/images/web/ap/05.jpg','/images/web/ap/15.jpg','/images/web/ap/13.jpg','/images/web/ap/09.jpg','/images/web/ap/14.jpg','/images/web/ap/10.jpg','/images/web/ap/11.jpg','/images/web/ap/01.jpg','/images/web/ap/02.jpg','/images/web/ap/08.jpg','/images/web/ap/03.jpg','/images/web/ap/04.jpg'] },
  { slug: 'renault', name: 'RENAULT', meta: ['RENAULT', 'TWINGO LAUNCH', 'BRAND EVENT', 'SWITZERLAND', '2025'], image: '/images/products/renault.png', colorImage: '/images/products/renault-colour.png', gallery: ['/images/web/renault/01.jpg','/images/web/renault/r07.jpg','/images/web/renault/r08.jpg','/images/web/renault/r11.jpg','/images/web/renault/r09.jpg','/images/web/renault/r10.jpg','/images/web/renault/04.jpg','/images/web/renault/02.jpg','/images/web/renault/06.jpg','/images/web/renault/03.jpg','/images/web/renault/05.jpg'] },
  { slug: 'ferdie', name: 'FERDIE', meta: ['FERDIE', 'CHRISTMAS COLLECTION', 'POP UP', 'PARIS , FRANCE', '2026'], image: '/images/products/ferdie.png', colorImage: '/images/products/ferdie-colour.png', gallery: ['/images/web/ferdie/01.jpg','/images/web/ferdie/02.jpg','/images/web/ferdie/05.jpg','/images/web/ferdie/04.jpg','/images/web/ferdie/03.jpg'] },
  { slug: 'hopscotch-2', name: 'HOPSCOTCH', meta: ['SKP', '20TH ANNIVERSARY EVENT', 'BRAND EVENT', 'CHINA', '2027'], label: 'SKP', image: '/images/products/hopscotch-2.png', colorImage: '/images/products/hopscotch-2-colour.png', gallery: ['/images/web/hopscotch/01.jpg','/images/web/hopscotch/02.jpg','/images/web/hopscotch/03.jpg','/images/web/hopscotch/04.jpg','/images/web/hopscotch/06.jpg','/images/web/hopscotch/05.jpg','/images/web/hopscotch/07.jpg','/images/web/hopscotch/08.jpg'] }
];

export const labelOf = (p: Project) => p.label ?? p.name.split(' · ')[0];
export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
