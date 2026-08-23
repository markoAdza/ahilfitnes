# Ahil Fitness

Marketing site for Ahil Fitness — a 24-hour gym with three locations in Hrastnik, Zagorje and
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
| [`lib/site.ts`](lib/site.ts) | **Phone numbers, addresses, amenities**, reception hours, nav items, social links |
| [`lib/pricing.ts`](lib/pricing.ts) | The three plans and the grouped price list |
| [`lib/equipment.ts`](lib/equipment.ts) | The 16 equipment items and the 4 category summaries |
| [`lib/faq.ts`](lib/faq.ts) | The 10 questions and answers |

Figures are quoted in one place and read everywhere else: the "from €37 a month" line on Home
comes from `fromPrice` in `lib/pricing.ts`, the location count comes from `locations.length`, and
`lib/faq.ts` interpolates `site.phone` instead of repeating it. Change a number in `lib/` and every
page that mentions it follows.

### Placeholder data to replace

These came from the original design and are **not real**:

- `site.phone` — `+386 1 234 5678`, used by the navbar and every call to action
- `site.reception` — the staffed hours quoted on the FAQ page and in the footer
- The Hrastnik and Zagorje street addresses and phone numbers in `site.locations`
- Sevnica's photo is a stand-in, so that no two location cards show the same room

Sevnica's details (`Glavni trg 19, 8290 Sevnica`, `+386 7 816 9012`) came from the design and are
kept as-is.

## Design system

Everything is defined once in [`app/globals.css`](app/globals.css) under `@theme`.

**Colour** — warm near-monochrome. Ink (`#17140f`) and paper carry the design; `sand` is the
alternating section ground; `line` / `line-soft` are the hairlines that separate blocks and rows.
There is exactly one accent, a clay red (`--color-accent`, 6.4:1 on white), and it is rationed to
three jobs: the active navbar underline, the "Recommended" plan label, and link hover. Primary
buttons are ink, never accent — that is what keeps the accent readable as a signal.

**Type** — two faces with clear roles. Archivo for headings at 500–600, Inter for interface and
body copy. The scale lives in the `type-display` / `type-h1` / `type-h2` / `type-h3` utilities;
`type-label` is the only place uppercase is used. Prices and tables set
`font-variant-numeric: tabular-nums` (the `nums` utility) so columns of figures align.

**Shape** — one 2px radius everywhere, and hairline rules rather than borders-plus-shadows. There
are no filled pill badges: labels are set in `type-label` with no background.

**Rhythm** — sections alternate white and `sand` grounds at `py-20 md:py-28`, and each opens with
a hairline rule, a `type-label` eyebrow and a left-aligned heading via
[`SectionHeading`](components/ui/SectionHeading.tsx).

## Buttons and forms

There is no backend by design, so nothing can silently fail. Every call to action is a `tel:` link
to `site.phone`, and the labels say so — **Call to join**, **Call to sign up**, **Talk to us** —
rather than implying an online signup that does not exist.

There is no newsletter form. The previous one had no backend and confirmed "you're on the list"
regardless, which is the one thing a signup form must not do.

## Images

The six photos and the logo live in [`public/images/`](public/images/). The original design
screenshots and source assets are kept in [`images/`](images/) for reference — that folder is
outside `public/`, so it is never served or bundled.

Photography appears only where it carries information: the hero, the three location cards, one
supporting shot in the Home equipment section, and one per category on `/equipment`. Interior page
headers are type-only, which is why `/equipment`, `/pricing` and `/faq` have no banner image.

## Accessibility and SEO notes

- Nothing is hidden behind hover. Location addresses, phone numbers and equipment specifications
  are in the DOM and visible at all times, on every device.
- `/equipment` is fully static: categories are anchors (`#cardio`, `#strength`, …) rather than a
  client-side filter, so each one is linkable and crawlable without JavaScript.
- The FAQ accordion is a real `<button>` with `aria-expanded` / `aria-controls`, and the answer
  panels are labelled regions.
- The price list is a `<table>` with `scope="colgroup"` group headers and `scope="row"` service
  names, so it reads correctly in a screen reader.
- Body text is 7.9:1 on white and the muted tone is 5.6:1; the accent clears 6.4:1, so it is safe
  for text as well as fills.
- The FAQ page emits `FAQPage` JSON-LD structured data.
- Each page sets its own `title`, `description` and OpenGraph tags; the shared template lives in
  [`app/layout.tsx`](app/layout.tsx).

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
