# Khun-Sin (鯤鯓) — Taiwan Cetacean Conservation, Digitized

**Live: [www.khun-sin.com](https://www.khun-sin.com)** · [English](https://www.khun-sin.com/en)

> Found a stranded whale or dolphin in Taiwan? Call **118** — the Coast Guard's
> free 24-hour hotline. Never drag or push a live animal back into the sea.
> Report it even if it has already died.

A project to promote cetacean (whale and dolphin) conservation in Taiwan by
**turning rescue and stranding data into something people can actually use** —
for the public, for field volunteers, and for researchers.

The name **鯤鯓 (khun-sin)** comes from an old term for a great sea creature /
the whale-like sandbanks off Taiwan's coast — a nod to both the animals and the
island's shoreline.

## The core idea

The problem isn't a lack of care — it's that the data is stuck. Today, cetacean
care is mostly recorded **on paper**, and rescue coordination happens in **Line
group chats**. That makes information hard to aggregate, easy to lose during
handoffs, and impossible to see as a whole. The downstream analysis and the
public-facing story both go hungry.

So the strategy is deliberately **not** "build a promotional website." It is:

> **Build one data pipeline that grows three faces:**
> structured field forms → a central database → automatically generated public visualization.

Everything in this repo serves that pipeline.

## The three pillars

1. **Standard form (the backbone)** — mobile-first, offline-capable, controlled
   vocabulary, photos that carry GPS, one case number that follows an event from
   first report to closure. Progressive stages: public report → local volunteer
   triage → professional (Level A) field response → care log & case closure.
   Explicitly aligned with the Ocean Conservation Administration's **MARN**
   rescue record — a digital front-end for MARN, not a competing system.
2. **Central database (the heart)** — one "stranding event" at its core with many
   child records; standardized codes and coordinates, layered permissions
   (public / volunteer / coordinator / researcher / open data), automatic merging
   of duplicate reports, and an audit trail per entry.
3. **Public reporting entry (the face)** — a login-free, single-page report form
   whose key differentiator is a **feedback loop**: give reporters a case number
   so they can follow what happened next. The public map and dashboard are
   generated from the same database.

## What exists today

- **`education/`** — the **education site**, a SvelteKit rebuild of the original
  single-file page. It is the *public face* pillar's first deliverable: Taiwan's
  cetacean stranding data made readable for a general audience, with an
  interactive Taiwan stranding map, seven-year trends, seasonality, county and
  cause breakdowns, species cards, and a full English mirror. All numbers live in
  typed data files so a new annual MARN report is a data edit, not a markup edit.
- **`docs/`** — product vision, requirements, ADRs, testing and design docs. See
  [`docs/README.md`](docs/README.md) for the layout, and
  [`docs/product/education-site-rebuild-spec.md`](docs/product/education-site-rebuild-spec.md)
  for the education-site PRD.

The **report / case-management system** (pillars 1 and 2) is the real goal and is
still to be built — the education site is also the training ground where the
components, design tokens, and deployment pipeline are proven before that work
starts.

## Data source

All statistics come from the Ocean Conservation Administration's
**海保救援網 (MARN)** annual stranding reports (2019–2025) and the 2026 Q1 report.
No numeric literal from those reports lives in a component — every number is
sourced from `education/src/lib/data/` and derived stats are computed, never
stored.

## Tech stack

SvelteKit 2 + Svelte 5, TypeScript, deployed on Vercel (`@sveltejs/adapter-vercel`).
Every route is prerendered and the site ships **no runtime dependencies** —
`dependencies` in `education/package.json` is empty, charts and maps are
hand-rolled SVG, and there is no webfont. Maps are generated at build time from
Natural Earth geometry via `d3-geo` / `topojson-client`.

```bash
cd education
npm install
npm run dev      # or: npm run build && npm run preview
npm test         # unit tests for the data, schema and formatting helpers
```

## License

[MIT](LICENSE). The stranding figures belong to the Ocean Conservation
Administration and are reproduced here with attribution, not licensed by this
project.

## A note on scope

Khun-Sin is **not** a legal entity and never collects conservation donations
itself (Taiwan's Charitable Solicitation Act restricts public fundraising to
qualified organizations). Support is **referral-first**: it links out to
established organizations, plus an honestly-framed "support this site's
operations" link — operations only, never worded as conservation giving.
