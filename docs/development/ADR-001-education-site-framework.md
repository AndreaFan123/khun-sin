# ADR-001: Education Site Framework Choice

**Status:** Accepted
**Date:** 2026-07-21
**Deciders:** Andrea

## Context

The education site (`index.html`) is currently a single 701-line HTML file: five hand-rolled SVG charts, IntersectionObserver scroll animations, a canvas bubble background, zero dependencies. We have decided that **the education site and the stranding-report / case-management system will live in separate projects**, so this ADR covers the education site only; the report system's framework and backend will get their own ADR.

Actual requirements for the education site:

- Content-first (long-form Traditional Chinese copy + data visualization); interactivity is limited to chart tooltips and animations
- SEO and shareability matter (it's for public education and should be discoverable)
- Roadmap: add sea turtle data, an interactive map, a bilingual version, and yearly data updates
- Single maintainer, so maintenance cost must stay low

Pain points the framework migration should solve: content, styles, data, and chart logic are all crammed into one file; yearly data updates mean hand-editing numbers scattered across the page; a bilingual version is practically impossible in the single-file setup.

**Key decision driver (settled 2026-07-21):** the choice must **build skills that carry over to the report system**. The education site is positioned as a training ground — practice componentization, data separation, routing, build, and deployment on low-risk existing content, so the foundation is already in place when the report prototype kicks off.

## Decision

Rebuild the education site with **SvelteKit**, fully prerendered via `adapter-static` so the output stays purely static. Charts become Svelte components; the existing vanilla drawing logic can be mounted as-is via `onMount` / `use:` actions first, then progressively rewritten in Svelte.

The report system will later use the same stack (SvelteKit + a backend service — leaning toward Supabase for the prototype phase, to be decided in its own ADR), so the components, design tokens, and skills built here transfer directly.

## Options Considered

### Option A: Astro

| Dimension | Assessment |
|-----------|------------|
| Complexity | Low-medium: `.astro` files are close to plain HTML, gentle migration curve |
| Output | Static HTML with zero JS by default |
| SEO | Good (SSG) |
| Chart compatibility | Existing vanilla charts could be kept as-is |
| Skill transfer | Weak — Astro is a content framework, not an app framework; little carries over to the report system |

**Pros:** The best-fit tool for content sites; lowest migration cost; elegant islands architecture.
**Cons:** Misaligned with the "skills must carry over to the report system" goal — the report system (forms, auth, status workflows, offline) needs a full app framework, and Astro-specific knowledge transfers poorly. **Rejected for this reason.**

### Option B: SvelteKit (SSG mode) ✅

| Dimension | Assessment |
|-----------|------------|
| Complexity | Medium: requires learning Svelte syntax plus Kit's routing/load concepts |
| Output | Fully prerendered via `adapter-static`; performance and SEO match a purely static site |
| Chart compatibility | Mount the vanilla logic via `onMount` as a transition, then rewrite as Svelte components |
| Skill transfer | **Strong — the report system reuses the same stack**: form actions, routing, SSR, auth integration |
| Syntax affinity | Svelte is the closest to vanilla HTML/CSS/JS; gentlest curve for someone with a hand-rolled background |

**Pros:**
- One skill set feeds both projects: the education site trains componentization and deployment; the report system starts straight at business logic
- A Svelte component = HTML + scoped `<style>` + `<script>` — nearly the same mental model as the current single file
- SvelteKit + Supabase is a mature, well-documented combination for prototyping
- Yearly data updates: extract data into `src/lib/data/*.json` and only touch data files
- Bilingual version: route segments (`/en/...`) + an i18n library (e.g. paraglide)

**Cons:**
- Slightly heavier than Astro for a pure content site; charts eventually need componentizing (but that's the point of the training ground)
- i18n is not as built-in as Astro's; a library must be chosen

### Option C: Next.js (App Router)

**Pros:** Largest ecosystem, React skills have the highest market value, smoothest Vercel deployment.
**Cons:** The React mental model (JSX, hooks, re-renders) is the furthest from hand-rolled vanilla, so the learning curve is steepest; boilerplate cost is high for a solo project. Revisit if React career considerations arise; otherwise Svelte's gradual curve fits better.

### Option D: Eleventy / Vite SPA / Status quo

- **Eleventy**: pure templating engine — low ceiling, no skill accumulation.
- **Vite SPA**: wrong shape for a content site — SEO regresses. Not recommended.
- **Status quo + light modularization**: near-zero cost but zero accumulation; doesn't serve the purpose of this migration.

## Trade-off Analysis

The core trade-off is "**best fit for this site (Astro)** vs **skills that carry over to the report system (SvelteKit)**". The latter has been confirmed as the deciding criterion:

- Accepted cost: migration is somewhat more expensive than Astro (charts must be componentized, i18n needs a library), and the tool is slightly heavy for a pure content site.
- Value gained: when the report system starts, routing, forms, components, and the deployment pipeline are already familiar; both projects share a component language and design tokens, giving the "one data pipeline, three faces" vision a consistent front-end foundation.
- Risk mitigation: full prerendering via `adapter-static` guarantees the education site sacrifices no performance or SEO; a Lighthouse comparison is part of acceptance.

## Deployment

**Decision (updated 2026-07-21): Vercel** (Hobby tier; Andrea has an account). Originally leaning GitHub Pages for "fewest new accounts", re-evaluated and switched before the first deploy. Deciding factors:

1. **PR preview deployments** — Sprints 1–3 acceptance is visual-parity comparison; a preview URL per PR is directly part of that workflow. GitHub Pages has no equivalent.
2. Clean root URL (`khun-sin.vercel.app`) — no subpath/`paths.base` handling.
3. Same platform can later host the report system (which needs a backend), per the skills-accumulation principle.

Implementation: `@sveltejs/adapter-vercel` with full prerender — output remains pure static HTML served from the CDN; no server-rendered code paths. Portability holds: switching back to Pages/Cloudflare is an adapter swap. The report system's deployment (database, auth, photo upload — leaning Supabase free tier for the prototype) is deferred to ADR-003.

## Consequences

- Easier: yearly data updates (data files only), the bilingual version, adding sections/charts, and a faster start for the future report system.
- Harder: "double-click to open" becomes an `npm run dev` / build workflow; requires a Node environment; Svelte/Kit concepts must be learned.
- To revisit: backend and deployment choices when the report system starts (ADR-003); i18n library selection (when the bilingual version is built).

## Action Items

1. [ ] Scaffold a SvelteKit project with `npx sv create` under `education/` (per ADR-002), configure `adapter-static` with full prerendering (keep the current `index.html` in the repo for reference)
2. [ ] Extract data: the `D` object → `src/lib/data/strandings.json` (include a year dimension to prepare for yearly updates)
3. [ ] Componentize sections: one `.svelte` component each for Hero / Know / Threats / Report / Action / CTA
4. [ ] Migrate charts: mount hBar / colChart / stackChart via `onMount` first, then rewrite one by one as Svelte components (the core training exercise)
5. [ ] Deployment: Vercel git integration (Root Directory `education/`)
6. [ ] Acceptance: Lighthouse comparison against the current page (no performance regression), identical RWD and tooltip behavior
