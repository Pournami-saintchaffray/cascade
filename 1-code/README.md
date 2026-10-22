# CASCADE — website

Next.js 15 (App Router, TypeScript). Fonts: Jost (logo) + Inter (all other text) via `next/font`. Colours: #20273d (header) / #596496 / #FF00FF.

```bash
npm install
npm run dev    # http://localhost:3000
npm run build && npm start
```

`npm run dev` / `npm run build` first run `scripts/fix-routes.mjs`, which renames `app/projects/-slug-` → `app/projects/[slug]` (bracket folder names could not be exported).

## Structure (synced with "Cascade Website v2")
- `/` — 0 intro (waterfall video, CASCADE grows) → 1 About landing (drop + tagline) → 1b About description (paragraphs slide in) → 2 Projects (grid · 3-up · single, switch top-right; PROJECTS title slides in; name tags under products; grey → colour on hover) → 3 Offers (gas / water / ice clips, OFFERS title slides in) → 4 Contact
- `/projects/[slug]` — big looping gallery with pink arrows; close with the pink ×, Esc, or a click on the background; layout switcher returns to Projects in that layout.
- Header: #20273d → transparent gradient, white type, pink nav underline.

## Content
- Projects: `lib/projects.ts` (`label`, `colorImage`, `meta`, `description`, `gallery` per project). Only Audemars Piguet Gstaad has `meta` text so far.
- Galleries: `public/images/gallery/<slug>/` — compress before launch (currently several hundred MB).
- Contact form/email is a plain mailto link.
