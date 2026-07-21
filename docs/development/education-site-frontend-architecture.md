# Education Site — Frontend Architecture

**Date:** 2026-07-21
**Scope:** the SvelteKit rebuild of `index.html` under `education/` (per ADR-001, ADR-002)
**Stack:** Svelte 5 (runes) + SvelteKit 2 + TypeScript + `adapter-static`

## Principles

1. **Static output, app-framework skills.** Everything prerenders; the site ships the same static HTML it does today. The value is in the structure we practice, not runtime features.
2. **Svelte-native over ported.** The current charts build SVG imperatively (`createElementNS`, `setAttribute`). The end state renders SVG **declaratively in templates** (`{#each}` over data) — that is idiomatic Svelte and the core training exercise. Imperative mounting via `onMount` is allowed only as a short-lived migration step (Phase 1).
3. **Data is content, code is presentation.** All numbers live in `src/lib/data/`; components never hard-code a statistic. Yearly report updates must touch data files only.
4. **Runes, not legacy patterns.** Svelte 5 idioms throughout: `$props()`, `$state`, `$derived`, `$effect` (sparingly); no `export let`, no stores where module-level rune state suffices.

## Project structure

```
education/
├── svelte.config.js            # adapter-static
├── vite.config.ts
├── tsconfig.json
├── static/                     # favicon, og-image
├── scripts/                    # one-off geo generation (see Interactive map)
└── src/
    ├── app.html
    ├── app.css                 # design tokens (:root), reset, typography — lifted from index.html
    ├── routes/
    │   ├── +layout.ts          # export const prerender = true
    │   ├── +layout.svelte      # app.css, header nav, <Tooltip/> singleton
    │   ├── +page.svelte        # home: action + data (per spec IA)
    │   ├── learn/+page.svelte  # knowledge: species, threats, conservation
    │   └── en/report/+page.svelte  # EN essentials (backlog #23, Sprint 5 candidate)
    └── lib/
        ├── data/
        │   ├── strandings.ts   # typed datasets (see Data layer)
        │   ├── taiwan-geo.ts   # county SVG paths + centroids — generated at build time, committed
        │   └── site.ts         # hero stats, species cards, threats, steps, MARN nodes copy-as-data
        ├── components/
        │   ├── sections/       # grouped by route, per the spec's IA
        │   │   ├── home/       # Hero, HowToReport, ReportFormTeaser, DataDashboard, Cta
        │   │   └── learn/      # SpeciesSection, ThreatsSection, ConservationSection
        │   ├── charts/
        │   │   ├── BarChartHorizontal.svelte
        │   │   ├── ColumnChart.svelte
        │   │   ├── StackedColumnChart.svelte
        │   │   ├── TaiwanMap.svelte      # county bubble map (see Interactive map)
        │   │   ├── ChartCard.svelte      # title + subtitle + takeaway + legend slot wrapper
        │   │   └── Legend.svelte
        │   └── ui/
        │       ├── Nav.svelte            # header navigation (通報／數據／知識分享)
        │       ├── SectionHead.svelte    # eyebrow + h2 + lead
        │       ├── SpeciesCard.svelte
        │       ├── StatBadge.svelte      # hero stats
        │       ├── KpiCard.svelte
        │       ├── StepCard.svelte
        │       ├── DoDontList.svelte
        │       └── BubbleCanvas.svelte   # hero background, isolated
        ├── actions/
        │   ├── reveal.ts       # scroll-reveal (IntersectionObserver)
        │   └── tooltip.ts      # chart tooltip binding
        └── state/
            └── tooltip.svelte.ts   # module-level $state for the tooltip singleton
```

Rules of thumb:

- `routes/` stays thin — pages compose, `lib/` implements.
- `sections/` own layout and copy wiring; `charts/` and `ui/` are **presentational**: data in via `$props()`, no imports from `data/`.
- One component per file; a component that needs scrolling to read is a component to split.

## Data layer

Typed TypeScript modules (not raw JSON) so imports get autocompletion and the compiler catches shape drift:

```ts
// src/lib/data/strandings.ts
export interface YearlyStranding { year: number; dead: number; live: number }
export interface SpeciesCount   { name: string; count: number; highlight?: boolean }

export const trend: YearlyStranding[] = [
  { year: 2019, dead: 132, live: 18 },
  // ...
];
```

- Keyed by **period** — annual reports and quarterly snapshots share one schema (e.g. `{ year: 2026, quarter: 1 }` vs `{ year: 2025 }`), so adding the 2026 report or backfilling a historical quarter is additive. (Per spec P0-3; historical quarterly reports to be supplied by Andrea.)
- Derived numbers (percentages, totals, "51% from outlying islands") are **computed with `$derived`**, never stored — one source of truth.
- Copy that is structurally repeated (species cards, threat cards, steps, do/don't lists, KPI cards) also lives in `data/site.ts` as arrays; sections `{#each}` over them. This is what makes the future bilingual version tractable: translate data files, not markup.

## Charts

Declarative SVG components, one per chart type, mirroring the current hBar / colChart / stackChart:

```svelte
<script lang="ts">
  interface Item { label: string; value: number; highlight?: boolean }
  let { items, format = (d: Item) => String(d.value) }: {
    items: Item[]; format?: (d: Item) => string;
  } = $props();

  const max = $derived(Math.max(...items.map(i => i.value)));
</script>

<svg viewBox="0 0 {width} {height}" role="img" aria-label={ariaLabel}>
  {#each items as item, i}
    <rect ... use:tooltip={format(item)} />
  {/each}
</svg>
```

- **Layout math in plain functions** (scale helpers in the component or a `charts/scales.ts`) — testable without a browser.
- **Enter animations** via CSS transitions triggered by the reveal action (matches current behavior), honoring `prefers-reduced-motion`.
- **Responsiveness** via `bind:clientWidth` on the container instead of manual resize listeners + re-render.
- **Accessibility:** every chart gets `role="img"` + a meaningful `aria-label`; tooltips are supplementary, never the only way to read a value (values are already rendered as text labels).
- No chart library. The hand-rolled approach is a feature here: it keeps the bundle at ~zero and the rewrite is the Svelte exercise. Revisit only if the multi-year dashboard outgrows it (the interactive map is covered below without a library).

## Interactive map (Taiwan stranding map)

A county-level bubble map — real county boundaries with one glowing dot per county, sized by stranding count. This is the right form for the data we have: annual reports aggregate by county, so there are no per-event GPS points to plot yet.

**Design decisions (what makes it look good):**

- Accurate coastline: MOI open-data county boundaries, simplified with mapshaper — smooth but correct outlines are the foundation.
- Dark-ocean stage: the map lives in the `band-dark` section, deep-navy land on darker ocean, so the dots actually glow.
- Glow = layered SVG (solid core + translucent halo + `feGaussianBlur` filter) with a breathing pulse animation; honors `prefers-reduced-motion`.
- Area-true encoding: dot radius ∝ √count, so Lienchiang (26) vs Keelung (2) reads at a glance.
- The map extent must include Lienchiang, Kinmen, and Penghu — the outlying islands are 51% of the story; the geography should tell it by itself.
- Color follows the existing palette: coral (`--series-2`) for outlying-island hotspots, aqua for main-island counties.

**Geometry pipeline (build-time, output committed):**

```
MOI county GeoJSON → mapshaper simplify → project to SVG paths (Mercator)
→ src/lib/data/taiwan-geo.ts  (typed county paths + centroids, committed)
```

A one-off generation script under `scripts/`; re-run only if boundaries ever change. Nothing is fetched at runtime.

**Rendering:** `TaiwanMap.svelte` declaratively renders `<path>` per county and the dot layers via `{#each}`, exactly like the other charts: data via `$props()`, tooltips via the shared `use:tooltip` ("連江縣：26 隻"), reveal animation lights the dots in sequence. The whole map prerenders — land and dots are static SVG in the built HTML; pulse and hover are progressive enhancement.

**Placement:** in the homepage data dashboard, paired with the county bar chart — the map gives geographic intuition, the bars give exact ranking.

**Explicit non-goal:** no MapLibre/Leaflet. A pan/zoom tile map earns its ~200 kB only when per-event GPS points, clustering, and zoom exist — that is the report-system dashboard's job once the data pipeline produces coordinates (ADR-003 territory).

## Cross-cutting behaviors

- **Scroll reveal** — `use:reveal` action wrapping IntersectionObserver; adds a class, unobserves after firing. Replaces the two global observers in the current file.
- **Tooltip** — one `<Tooltip/>` rendered in the layout, driven by module state (`tooltip.svelte.ts` exporting `$state`); chart elements bind via `use:tooltip={content}`. No per-chart DOM juggling.
- **Bubble canvas** — stays imperative canvas code, but contained in `BubbleCanvas.svelte` with `onMount` + cleanup on destroy; respects `prefers-reduced-motion`.

## Styling

- Design tokens follow [visual-direction.md](../design/visual-direction.md) — the new navy/slate/amber/paper ramps and usage mapping replace the current `--ocean-*` / mint / coral variables. Tokens live in `app.css` `:root` and are the shared design language the report app will reuse (per ADR-002, promote to `shared/` when that app starts).
- Typography is the system-resolved Noto Sans TC stack site-wide — **no webfont files, no `static/fonts/`, zero font bytes** (per visual-direction and [brand.md](../design/brand.md)); the brand wordmark's amber tittle uses the layered-glyph technique (amber `i` under an ink dotless `ı`) or an outlined SVG asset.
- Component-specific rules live in each component's scoped `<style>`; `app.css` keeps only tokens, reset, typography, and layout utilities (`.wrap`).
- No Tailwind/CSS framework: the existing hand-written CSS is good, and scoped styles solve the only real problem it had (one giant stylesheet).

## Dependencies

The current site has **zero dependencies**; the rebuild keeps that property at runtime. Everything below is build-time tooling (`devDependencies`) — the deployed output remains dependency-free static HTML/CSS/JS.

### `dependencies`

None. A fully prerendered site ships no framework runtime packages; even `svelte` itself belongs in `devDependencies` (its output is compiled into the bundle).

### `devDependencies` (installed by `npx sv create`, listed here as the reviewed baseline)

| Package | Purpose | Notes |
|---------|---------|-------|
| `svelte` ^5 | Component compiler | Runes require v5 |
| `@sveltejs/kit` ^2 | App framework: routing, prerendering | |
| `@sveltejs/adapter-vercel` | Vercel deployment (fully prerendered → static CDN output) | Replaces the default `adapter-auto` |
| `@sveltejs/vite-plugin-svelte` | Vite integration | Version pinned by the scaffolder |
| `vite` | Build tool / dev server | |
| `typescript` ^5 | Type checking | |
| `svelte-check` | Template-aware type checking (`npm run check`) | |
| `prettier` + `prettier-plugin-svelte` | Formatting | Scaffolder option |
| `eslint` + `eslint-plugin-svelte` | Linting | Scaffolder option |

Added per phase, not upfront:

| Package | Phase | Purpose |
|---------|-------|---------|
| `vitest` | 2 | Unit tests for scale/derived-stat helpers |
| `@playwright/test` | 3 (optional) | Smoke test: page renders, charts present, tooltip works |
| `mapshaper`, `d3-geo` | 4 | One-off geometry generation script (build-time only; output committed as `taiwan-geo.ts`, ships zero bytes) |

### Deliberately NOT installed

| Category | Examples | Why not |
|----------|----------|---------|
| Chart libraries | d3, Chart.js, LayerCake | Hand-rolled SVG is the training exercise and keeps the bundle ~zero; revisit only for the multi-year dashboard |
| Map libraries | MapLibre GL, Leaflet | County-level data needs no tiles/pan/zoom (see Interactive map); defer until per-event GPS points exist in the report system |
| CSS frameworks | Tailwind, PicoCSS | Existing hand-written CSS + scoped styles suffice (see Styling) |
| i18n libraries | paraglide-js | Deferred until the bilingual version starts (ADR-001 "to revisit") |
| Component/UI kits | shadcn-svelte, Skeleton | A content page with bespoke design gains nothing |
| Any runtime dependency | — | The static-output guarantee is the point |

### Policy

- `package-lock.json` is committed; CI installs with `npm ci`.
- Node LTS (currently 24) — record in `"engines"` and `.nvmrc`.
- Adding a dependency requires a one-line justification in the PR/commit message; anything that ships bytes to the client needs a stronger reason than build tooling.
- Upgrades: run `npm outdated` when starting a work session on the app; majors (Svelte/Kit/Vite) only at phase boundaries, following official migration guides.

## Build & deployment

- `+layout.ts`: `export const prerender = true;` — the whole site is static HTML at build time.
- `@sveltejs/adapter-vercel` (ADR-001 deployment update): with full prerender the output is still pure static pages on the CDN. Internal links go through `resolve()` regardless — correct SvelteKit practice and keeps a future host switch free.
- Vercel git integration (Root Directory = `education/`): push to main → production deploy; every PR → preview URL, used for visual-parity acceptance.
- Anchor navigation (`#report`, `#know`) and smooth scroll behavior preserved as-is.

## Testing (kept light, per acceptance criteria in ADR-001)

- **Vitest** for pure logic: scale/layout helpers, derived-stat functions (e.g. percentage of outlying-island strandings).
- **Playwright** smoke test (optional, add when CI exists): page renders, five charts present, tooltip appears on hover.
- Manual acceptance: Lighthouse ≥ current single-file scores; RWD breakpoints at 860px behave identically.

## Migration phases

| Phase | Deliverable | Definition of done |
|-------|-------------|--------------------|
| 0 | Scaffold: `npx sv create education` (TS, adapter-vercel), tokens in `app.css`, empty sections composed in `+page.svelte` | `npm run build` outputs static HTML, deployed on Vercel |
| 1 | Lift-and-shift: sections carry over markup/styles; data extracted to `lib/data/`; charts temporarily mounted from the legacy functions via `onMount` | Page visually identical to `index.html` |
| 2 | Svelte-native charts: rewrite the three chart types declaratively; reveal/tooltip as actions; delete legacy chart code | No `createElementNS` left; behavior identical |
| 3 | Polish: a11y labels, `prefers-reduced-motion`, Lighthouse comparison, remove root `index.html` (git history keeps it) | ADR-001 acceptance items checked off |
| 4 | Taiwan map: geometry generation script, `TaiwanMap.svelte` (glow, pulse, tooltip), integrated into `ThreatsSection` | Map + dots prerender as static SVG; extent includes outlying islands; reduced-motion respected |

Phase boundaries are commit boundaries — each phase leaves the site deployable. Phases 0–3 reach parity with the current page; Phase 4 is the first net-new feature.
