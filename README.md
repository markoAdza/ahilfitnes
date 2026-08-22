# Ahil Fitness

Marketing site for Ahil Fitness — a 24/7 gym with three locations in Hrastnik, Zagorje and
Sevnica. Built with Next.js 15 (App Router), TypeScript and Tailwind CSS v4.

Four pages: **Home** (`/`), **Equipment** (`/equipment`), **Pricing** (`/pricing`) and
**FAQ** (`/faq`). Everything prerenders as static HTML — no database, no API, no environment
variables.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build (all 4 routes prerender) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

## Editing content

All copy, prices and contact details live in [`lib/`](lib/) — you should not need to touch a
component to change what the site says.

| File | Contains |
| --- | --- |
| [`lib/site.ts`](lib/site.ts) | **Phone numbers, addresses, amenities**, nav items, social links |
| [`lib/pricing.ts`](lib/pricing.ts) | The three plans, the full price-list table, the add-on groups |
| [`lib/equipment.ts`](lib/equipment.ts) | The 16 equipment items and the 4 Home category cards |
| [`lib/faq.ts`](lib/faq.ts) | The 10 questions and answers |

### Placeholder data to replace

These came from the original design and are **not real**:

- `site.phone` — `+386 1 234 5678`, used by the navbar and every call-to-action
- The Hrastnik and Zagorje street addresses and phone numbers in `site.locations`

Sevnica's details (`Glavni trg 19, 8290 Sevnica`, `+386 7 816 9012`) came from the design and are
kept as-is. Editing `lib/site.ts` updates every page, card, footer and `tel:` link at once.

### Design tokens

Colours and type scales are defined once in [`app/globals.css`](app/globals.css) under `@theme`.
Note `--color-lime-ink` (`#5c7a00`): the neon brand lime only reaches ~1.7:1 contrast on white, so
links and the active nav item use this darkened lime instead (4.9:1, WCAG AA). The neon
`--color-lime` is still used for fills, badges, and text on dark backgrounds.

## Buttons and forms

There is no backend by design, so nothing can silently fail:

- **Join Now**, **Select Plan** and **Talk to Us** are `tel:` links to `site.phone`
- **Start Your Journey** smooth-scrolls to the pricing section on the Home page
- The footer newsletter confirms inline and sends nothing anywhere

To capture real sign-ups later, wire the newsletter form in
[`components/Footer.tsx`](components/Footer.tsx) to a form service or a server action.

## Images

The six photos and the logo live in [`public/images/`](public/images/). The original design
screenshots and source assets are kept in [`images/`](images/) for reference — that folder is
outside `public/`, so it is never served or bundled.

Equipment cards on `/equipment` use line icons over a dark panel rather than photographs, because
individual equipment photography was not available. The icon set is
[`components/EquipmentIcon.tsx`](components/EquipmentIcon.tsx); to switch a card to a photo, drop
the file in `public/images/` and swap the panel in
[`components/EquipmentFilterGrid.tsx`](components/EquipmentFilterGrid.tsx).

## Deploying

### 1. Push to GitHub

```bash
# Create an empty repository named "ahil-fitness" on github.com first, then:
git remote add origin https://github.com/<your-username>/ahil-fitness.git
git branch -M main
git push -u origin main
```

### 2. Import on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and pick the `ahil-fitness` repository.
2. Accept the defaults — Vercel detects Next.js on its own. There are no environment variables
   and no build settings to change.
3. Deploy. Every later push to `main` redeploys automatically.

### 3. After the first deploy

Set `site.url` in [`lib/site.ts`](lib/site.ts) to the real domain. It is used for canonical URLs
and OpenGraph tags, so social previews will be wrong until it matches the live address.

## Accessibility and SEO notes

- Every hover-revealed detail (location addresses, category checklists) is in the DOM at all times
  and only collapses behind `@media (hover: hover)`, so nothing is hidden on touch devices or from
  search crawlers.
- The accordion, equipment filters and card expanders are real `<button>` elements with
  `aria-expanded` / `aria-pressed`, and work by keyboard.
- The FAQ page emits `FAQPage` JSON-LD structured data.
- Each page sets its own `title`, `description` and OpenGraph tags; the shared template lives in
  [`app/layout.tsx`](app/layout.tsx).
