# Spec: Education Site Rebuild (khun-sin)

**Status:** Draft for review
**Date:** 2026-07-21
**Author:** PM (with Andrea)
**Grounded in:** [專案筆記.md](專案筆記.md), [ADR-001](../development/ADR-001-education-site-framework.md), [ADR-002](../development/ADR-002-repository-structure.md), [Frontend Architecture](../development/education-site-frontend-architecture.md)

## Problem statement

The education site — Taiwan's cetacean stranding data made readable for the general public — exists today as a single 701-line HTML file. It works, but every yearly MARN report update means hand-editing numbers scattered through markup, a bilingual version is structurally impossible, and none of the effort invested carries over to the project's real goal: the stranding-report system. Meanwhile the page's story has a gap: the data says 51% of strandings happen in three outlying-island counties, but nothing on the page lets readers *see* that geography.

**Positioning (decided 2026-07-21):** the site is the future **public face of the reporting pipeline** (the 門面 in the project's three-pillar vision). The homepage leads with action and data — how to respond to a stranding, a reserved slot for the upcoming report form, and the data visualizations; the narrative/educational content moves to a knowledge route.

## Goals

1. **Yearly updates become a data-file edit** — publishing a new MARN annual report takes ≤ 30 minutes and touches only files in `src/lib/data/`.
2. **Zero regression for readers** — the rebuilt site scores ≥ the current page on Lighthouse (performance / accessibility / SEO) and behaves identically at both responsive breakpoints.
3. **The geography tells its own story** — a Taiwan map with glowing per-county dots makes the outlying-island hotspot pattern legible in one glance, without a map library.
4. **Skills and assets transfer** — components, design tokens, and the deployment pipeline built here are directly reusable when the report system starts (per ADR-001's training-ground rationale).
5. **Structurally ready for bilingual** — all copy and data live in data files, so an English version is a translation task, not a rewrite.

## Non-goals

- **The report/case-management system** — separate app, own spec and ADR-003. Nothing here may block on it.
- **Per-event GPS map (MapLibre/Leaflet)** — annual data is county-level; a tile map earns its weight only when the report system produces coordinates.
- **English version content** — we build the structure for it (goal 5), not the translation itself.
- **Sea turtle data** — roadmap item; adding it later must be a data + one-section change, but it is not in this rebuild.
- **CMS or admin UI** — the maintainer edits typed data files in the repo; a CMS is unjustified overhead for one editor.
- **Analytics/tracking** — not in v1; see open questions.
- **Dark mode** — decided against for v1 (2026-07-21): the page's identity is the fixed light/dark band rhythm (editorial print direction), and a user-facing dark mode would double the verified-contrast matrix and QA for an occasional-visit content page. The 10-step token ramps leave the door open (future dark mode = variable re-mapping, no refactor). Contrast note for ADR-003: the **report system is the opposite case** — night-time field use makes dark mode a day-one requirement there.
- **Direct charitable fundraising** — Khun-Sin never collects conservation donations itself: it is not a legal entity, and Taiwan's Charitable Solicitation Act (公益勸募條例) restricts public fundraising to qualified organizations. The donation model (decided 2026-07-21) is **referral-first**: link out to established orgs (Cetacean Society etc.), plus a low-key, honestly-framed "support this site's operations" link (e.g. GitHub Sponsors) — operations support only, never worded as conservation giving. See P2.

## Information architecture

```
/            Home — action + data
             Hero (editorial copy 「鯨豚救援是「向死而生」」, 118 entry + count-up stats in first viewport)
             How to respond: 118 callbar, four steps, do/don't
             Data dashboard: 7-year trend, seasonality, county, causes, species (five chart cards)
             Stranding map (#map): county bubble map — pulled forward from Sprint 4 (2026-07-22)
             Footer: brand footnote (鯤鯓 story), MARN + Natural Earth attribution

/learn       "故事分享" — the narrative arc (wonder → threat → hope)
             Species of Taiwan (cards → future /species/[slug] gallery)
             Human threats (threat cards, land-behavior surprise)
             Conservation stories (rescue story, no-perfect-solution, collective stranding)
             White-dolphin KPI band (dark stage, count-up numbers)

/en, /en/learn   Full English mirror (#23, shipped 2026-07-22) — faithful translation of
             both pages down to chart takeaways, axis labels, tooltips and map labels;
             the 中/EN switcher (nav + mobile bar) jumps to the same page in the other language

Band seams site-wide use the WaveDivider system (see visual-direction).
Removed during the fix/tweak_ui iteration: report-form teaser (P0-8 deferred
to ADR-003 — component kept), home CTA section, report-even-if-dead block,
MARN diagram placement (component built, placement TBD).
```

Charts follow **data** (all on the home dashboard); cards and stories follow **knowledge** (`/learn`). The original emotional arc is preserved intact on `/learn`; the homepage carries a utility narrative: *what to do → soon you can report here → why it matters, in data*.

## User stories

**Bystander (potential reporter) — the homepage's first-priority persona**
- As someone who just found a stranded dolphin, I want the 118 hotline and the do/don't list visible within seconds of landing so that I act correctly under stress.
- As a would-be reporter, I want to see that a proper reporting form is coming (and what to do meanwhile) so that I trust this site as the place to return to.

**Reader (general public, mobile-first)**
- As a curious reader, I want the stranding data presented as a visual story so that I understand the ocean's health without reading a report.
- As a reader, I want to see *where* strandings happen on a map of Taiwan so that I grasp the outlying-island pattern instantly.
- As a reader on a slow connection, I want the page to load fast and work without JavaScript so that nothing blocks the content.
- As a reader with motion sensitivity, I want animations disabled when my OS says so (`prefers-reduced-motion`) so that the page is comfortable.
- As a screen-reader user, I want every chart to have a meaningful text alternative so that the data is not image-only.

**Maintainer (Andrea)**
- As the maintainer, I want all statistics in typed data files so that the yearly update is small, safe, and compiler-checked.
- As the maintainer, I want every push to `education/**` to build and deploy automatically so that publishing is not a manual process.
- As the maintainer, I want the site built with the same stack planned for the report system so that time spent here compounds.

## Requirements

### P0 — must have (Phases 0–3, parity)

| # | Requirement | Acceptance criteria |
|---|-------------|---------------------|
| P0-1 | SvelteKit scaffold under `education/`, full prerender, deployed on Vercel | `npm run build` emits fully prerendered static pages; Vercel git integration (Root Directory `education/`) deploys main → production and every PR → preview URL |
| P0-2 | All legacy content migrated and regrouped into the two-route IA (`/` action+data, `/learn` knowledge) with header navigation | Every content block from `index.html` exists on one of the two routes per the IA section; per-section visual comparison shows only the intended deltas in [visual-direction.md](../design/visual-direction.md) — desktop and ≤ 860 px |
| P0-8 | Report-form placeholder slot on the homepage | **Deferred (2026-07-22)**: the teaser was removed in the fix/tweak_ui iteration; the component is kept and the requirement returns when ADR-003 ships |
| P0-3 | All statistics extracted to `src/lib/data/` as typed modules, keyed by period (annual **and** quarterly) | No numeric literal from the MARN reports appears in any component; derived stats (percentages, totals) are computed, not stored; schema accepts both annual reports and quarterly snapshots, so backfilling a new quarter is an additive data change |
| P0-4 | Five charts rewritten as declarative Svelte components | No `createElementNS` remains; tooltips, enter animations, and responsive re-layout match current behavior |
| P0-5 | Cross-cutting behaviors as idiomatic Svelte | Scroll-reveal and tooltip are actions; tooltip is a single instance in the layout |
| P0-6 | Accessibility baseline | Every chart has `role="img"` + descriptive label; `prefers-reduced-motion` disables reveal/pulse/bubble animations; Lighthouse a11y ≥ current page |
| P0-7 | No regression gate | Lighthouse performance/SEO/a11y ≥ current `index.html` scores, measured on the deployed site |

### P1 — should have (Phase 4, first net-new feature)

| # | Requirement | Acceptance criteria |
|---|-------------|---------------------|
| P1-1 | Taiwan stranding map in the homepage data dashboard | Real county boundaries (MOI open data, simplified); one dot per county, radius ∝ √count; extent includes Lienchiang, Kinmen, Penghu |
| P1-2 | Map visual quality | Dark-ocean stage; layered glow + breathing pulse; coral = outlying islands, aqua = main island; honors reduced-motion |
| P1-3 | Map is static-first | Land + dots prerender as SVG in built HTML; hover tooltip ("連江縣：26 隻") and pulse are progressive enhancement |
| P1-4 | Geometry pipeline | One-off `scripts/` generation (d3-geo + topojson-client at build time only); output committed as `taiwan-geo.ts`; zero runtime bytes added. Shipped with Natural Earth-derived geometry; MOI upgrade = source swap + re-run |
| P1-5 | **Full English mirror `/en` + `/en/learn`** — priority raised then widened 2026-07-22 (Andrea: faithfully present the same content as the Chinese site, translated); supersedes the standalone essentials-page plan | Every content block of both pages translated — sections, chart titles/takeaways/legends, axis labels, tooltips, map labels, aria descriptions; 中/EN switcher in nav + mobile bar targets the equivalent page; both locales prerender statically with zero i18n runtime |

### P2 — future considerations (design for, don't build)

- **Species gallery (`/species/[slug]`)**: a dedicated route per species (~30) with real photos, video, and eventually sound. Homepage species cards become entry points into it. The long-lead work is **media collection and licensing** (Cetacean Society, OCA, CC-licensed sources) — start that pipeline early; heavy media likely needs external hosting (e.g. video embeds), decided when the gallery is specced.
- **Donation entry** — referral half **shipped 2026-07-22** (#22), validated by a real visitor donating to the NCKU center after reading the site: SupportSection at the end of `/learn` + `/en/learn` links to 中華鯨豚協會 (donation page), NCKU MBCRC, and 黑潮海洋文教基金會 (野灣 considered, excluded as land-focused), with an explicit "this site never handles funds" disclosure. Still open in #22: the footer-level site-operations link (GitHub Sponsors), framed strictly as site upkeep.
- ~~Full bilingual (`/en`)~~ — **shipped** as P1-5 (2026-07-22) without an i18n library: a locale context picks between `site.ts` (zh) and `site-en.ts` (en). Standing maintenance rule: **every copy change in `site.ts` must be mirrored in `site-en.ts`** — the files are shape-identical, drift is silent.
- **Sea turtle section**: data model should not hard-code "cetacean" where "species group" is meant.
- **Multi-year dashboard**: keep chart components data-driven by year so a year-selector is an extension, not a rewrite.
- **Report-system reuse**: design tokens stay in one importable CSS file, promotable to `shared/` per ADR-002.

## Success metrics

**Leading (at each phase's deploy)**
- Lighthouse: performance ≥ 95, a11y ≥ 95, SEO ≥ 95 (and ≥ current page on all three) — measured on the deployed Vercel URL.
- Bundle: zero runtime dependencies in the shipped output (verify build report).
- Build-to-deploy: push on `education/**` → live in ≤ 5 minutes without manual steps.

**Lagging (first real usage)**
- 2026 annual report update (due ~Q1 2027) completed in ≤ 30 min, touching only `src/lib/data/` — this is the definitive test of goal 1.
- Report-system kickoff reuses tokens + ≥ 1 component/pattern without modification (test of goal 4).

## Open questions

| Question | Owner | Blocking? |
|----------|-------|-----------|
| Domain: brand name is decided (**Khun-Sin**, see [brand.md](../design/brand.md)) — check registration of `khunsin.tw` / `khun-sin.tw`; binds to the Vercel project and affects OG URLs | Andrea | No — deploy on `khun-sin.vercel.app` first |
| Analytics: none vs privacy-friendly (e.g. self-hostable counter)? Currently no way to measure readership | Andrea | No — can add post-launch |
| Social preview (OG image) — current page has none; add during rebuild? | Andrea | No |
| Species-gallery media: which sources (Cetacean Society / OCA / CC) and what licensing terms? Long-lead — start inquiries before the gallery is specced | Andrea | No (P2) |
| Where does the MOI boundary file's license/attribution note live (footer vs docs)? | Andrea | No — resolve before P1 ships |

## Timeline & phasing

No hard external deadline. Phasing follows the architecture doc's migration plan; each phase ends deployable:

| Phase | Scope | Requirements covered |
|-------|-------|---------------------|
| 0 | Scaffold + tokens + deploy pipeline | P0-1 |
| 1 | Sections migrated, data extracted, legacy charts mounted | P0-2, P0-3 |
| 2 | Svelte-native charts + actions | P0-4, P0-5 |
| 3 | A11y, reduced-motion, Lighthouse gate, retire root `index.html` | P0-6, P0-7 |
| 4 | Taiwan map | P1-1 … P1-4 |

Dependency note: the only external input for the build is the MOI county-boundary download (Phase 4). Historical quarterly MARN reports will be provided by Andrea for backfill; since quarterly data is additive under the P0-3 schema, this does not block any phase.
