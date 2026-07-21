# Development

Architecture decision records (ADRs), technical specs, development and deployment notes.

**Branching & releases**: feature branches → `develop` (PR, mergeable by the agent); `develop` → `main` only with Andrea's approval — that merge is the production deploy and gets a semver tag + GitHub Release. `0.x` during the rebuild, minor bump per release, `v1.0.0` at the Sprint 3 acceptance gate. Current: [v0.1.0](https://github.com/AndreaFan123/khun-sin/releases/tag/v0.1.0).

- [ADR-001: Education Site Framework Choice](ADR-001-education-site-framework.md) — Accepted: SvelteKit (adapter-static)
- [ADR-002: Repository Structure](ADR-002-repository-structure.md) — Accepted: one repo, two independent apps (`education/`, `report/`)
- ADR-003 (reserved): report-system backend and deployment choices
- [Education Site Frontend Architecture](education-site-frontend-architecture.md) — component/data/styling plan for the SvelteKit migration
