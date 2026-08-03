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

## Three pillars — an early sketch

None of this is settled. What follows is a working hypothesis, written down so
it can be argued with, and it has **not yet been tested against the people who
would use it** — the volunteers, coordinators and vets doing this work today.
Expect it to change once it has.

1. **A standard form** — mobile-first and usable with poor signal on a beach,
   with one case number following an event from first report through to closure.
   It would sit in front of the Ocean Conservation Administration's **MARN**
   record rather than compete with it.
2. **A central database** — the stranding event as the core record, with access
   layered from public through to researcher. The open questions are the ones
   that matter: how duplicate reports of the same animal get merged, and how
   much location detail can be published without drawing a crowd to a live
   stranding.
3. **A public entry point** — a login-free report form whose difference would be
   the feedback loop: a case number the reporter can follow, so that reporting
   stops feeling like shouting into a void.

Fuller notes — including how Taiwan's rescue chain works today and what
comparable systems abroad do — are in
[`docs/product/專案筆記.md`](docs/product/專案筆記.md). The design proper belongs
to ADR-003, which has not been written.

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
