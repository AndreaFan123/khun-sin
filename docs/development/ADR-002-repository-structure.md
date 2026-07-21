# ADR-002: Repository Structure

**Status:** Accepted
**Date:** 2026-07-21
**Deciders:** Andrea

## Context

ADR-001 established that the education site and the stranding-report system are **separate applications** (independent codebases, independent deployments), both built on SvelteKit. That left open whether they live in one repository or two.

Relevant forces: single maintainer; both apps share a tech stack, design tokens, and — critically — data definitions (species codes, county lists, stranding datasets) that the "one data pipeline, three faces" vision requires to stay consistent; project-wide documentation (`docs/`) already covers both apps in this repo.

## Decision

**One repository (`khun-sin`), two independent apps** — a "monorepo-lite" without workspace tooling:

```
khun-sin/
├── docs/            # project-wide docs (covers both apps)
├── education/       # SvelteKit app #1 — own package.json, own build
├── report/          # SvelteKit app #2 (future) — own package.json, own build
└── shared/          # grown later, only when real: design tokens, data JSON, schemas
```

Each app is self-contained (`npm install` / `npm run build` inside its own folder). No pnpm workspaces / turborepo until sharing pressure makes them worth it. Shared assets are reached by relative path or copied deliberately.

## Options Considered

### Option A: Two repositories

**Pros:** Simplest separation; independent git history, issues, deploy settings; easy permission split if the report system is later opened to collaborators or handed to an organization.
**Cons:** Shared design tokens, chart components, and stranding data drift apart via copy-paste; project-wide docs (product notes, ADRs spanning both apps) have no natural home.

### Option B: One repository, two apps ✅

**Pros:** One place to search, develop, and document for a single maintainer; `docs/` already spans both apps; shared data definitions stay consistent by construction; GitHub Pages and Vercel both support building from a subdirectory.
**Cons:** Mixed git history; CI needs path filters (an education commit must not trigger a report deploy); if the products' lifecycles diverge (e.g. the report system is open-sourced separately), the repo must be split.

## Trade-off Analysis

Option B's drawbacks are near-zero at the current single-maintainer stage (no permission-split need; path filters are a ten-minute setup), while Option A's drift cost is paid continuously. Reversibility also favors B: splitting a repo later (`git filter-repo` preserves history) is easy; merging two repos later is messy. B keeps the most options open while the report system's final shape is unknown.

## Consequences

- Easier: sharing data/tokens, unified docs, one clone for all work.
- Harder: CI path filtering must be configured; deploy workflows must scope to subdirectories.
- To revisit: split the report app into its own repo if it gains external collaborators or a separate governance/lifecycle; introduce workspace tooling only if cross-app imports become frequent.

## Action Items

1. [ ] Scaffold the education app under `education/` (amends ADR-001 action item 1)
2. [ ] Vercel git integration with Root Directory = `education/` (only education changes trigger its deploys)
3. [ ] When the report app starts: scaffold under `report/`, add its own deploy workflow with path filter
