# Development

Architecture decision records (ADRs), technical specs, development and deployment notes.

**Branching & releases**: feature branches → `develop` (PR, mergeable by the agent); `develop` → `main` only with Andrea's approval — that merge is the production deploy and gets a semver tag + GitHub Release. `0.x` during the rebuild, minor bump per release, `v1.0.0` at the Sprint 3 acceptance gate. See the [releases](https://github.com/AndreaFan123/khun-sin/releases) for what shipped when — that list is the changelog; there is no hand-maintained CHANGELOG.md to drift out of step with it.

- [ADR-001: Education Site Framework Choice](ADR-001-education-site-framework.md) — Accepted: SvelteKit (adapter-static)
- [ADR-002: Repository Structure](ADR-002-repository-structure.md) — Accepted: one repo, two independent apps (`education/`, `report/`)
- ADR-003 (reserved): report-system backend and deployment choices
- [ADR-004: Sea Turtles in the Domain](ADR-004-sea-turtles-in-the-domain.md) — Proposed: turtles as a parallel subject (own data module, own route), not a value on an axis
- [Education Site Frontend Architecture](education-site-frontend-architecture.md) — component/data/styling plan for the SvelteKit migration
- [SEO & AEO Audit](seo-aeo-audit.md) — 2026-07-28 findings against the live site: missing lang/hreflang/canonical/OG/structured data, plus the structured-data plan for answer-engine visibility
