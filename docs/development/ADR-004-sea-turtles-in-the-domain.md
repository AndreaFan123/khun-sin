# ADR-004: Sea Turtles in the Domain

**Status:** Proposed
**Date:** 2026-09-16
**Deciders:** Andrea

## Context

The site presents cetacean strandings only. The Ocean Conservation Administration publishes sea turtle figures in the same MARN reports, and the turtle numbers are larger: 269–359 individuals a year since 2019, consistently more than double the cetacean count. A reader who comes to Khun-Sin for Taiwan's stranding picture currently gets half of it.

Two pieces of groundwork are already merged and this ADR rests on them:

- `docs/research/sea-turtle-strandings-2019-2026.md` — the turtle figures compiled from every MARN report 2019 through 2026 Q2.
- `docs/research/stranding-data-availability.md` — what the OCA actually publishes, in what form, under what licence.

The second one produced the fact that forces this decision. **The two taxa are not published at the same level of granularity:**

| | Level | Coverage | Shape |
|---|---|---|---|
| `MARN鯨豚擱淺資料` | **record-level** | 2020– | one row per stranding, with WGS84 coordinates, species, status, body length, handling unit |
| `國內海龜擱淺件數統計` | **aggregate** | 2025 Q2– | county × quarter × species × live/dead statistical table |

Both are 完全開放 under the Government Open Data Licence v1 on the same iOcean hub. But cetaceans could support a point map, a body-length distribution, and case-level detail; turtles cannot, and never will unless the OCA changes what it publishes.

Three further asymmetries, from the compilation note:

- **Cause taxonomies do not align.** Turtles are classified by how the animal was encountered — 岸際擱淺 / 混獲 / 漂流 / 廢棄漁網纏繞 — and the taxonomy only stabilises from 2024. Cetaceans are classified by determined cause of death, and the quarterly reports use a different taxonomy again from the annual ones.
- **The counts differ by an order of magnitude.** 330 turtles against 128 cetaceans in 2025. Any shared axis is dominated by turtles.
- **The stories are different.** The cetacean story is that most animals are found dead and救援 is 向死而生. The turtle story is the opposite and genuinely hopeful: the live share climbs from ~20% to 40% as pound-net (定置網) bycatch reporting improves, and in 2026 Q2, 44 of 45 pound-net reports were assessed, tagged and released.

`CONTEXT.md` currently defines **Stranding** as "a whale, dolphin or porpoise coming ashore". That definition has to change, and how it changes determines the shape of the data layer and the routes.

## Decision

**Sea turtles enter the domain as a parallel subject, not as a value on an axis of the existing one.**

Concretely:

1. **`CONTEXT.md` widens `Stranding` to cover both taxa and adds one new term, `Subject`,** naming the axis that separates them. Proposed wording:

   > **Stranding**:
   > A marine animal coming ashore — alive or dead — through injury, illness, disorientation, entanglement or a vessel strike. Covers both subjects the site presents.
   > _Avoid_: beaching, washup
   >
   > **Subject**:
   > Which animals a figure describes: `cetacean` or `turtle`. The two are reported by MARN at different granularity and classified by incompatible taxonomies, so no figure mixes them. Every dataset, route and chart belongs to exactly one.
   > _Avoid_: taxon, species group, animal type

2. **A separate data module, `turtles.ts`,** alongside `strandings.ts`. It imports `Period` and the period helpers from `strandings.ts` — that vocabulary is genuinely shared — and nothing else. It defines its own breakdown shape, including the release-and-care outcomes and the encounter-source taxonomy that have no cetacean equivalent.

3. **A separate route, `/turtles` and `/en/turtles`.** Chart components are reused where the geometry fits; no chart renders both subjects.

4. **No merged "all strandings" total anywhere on the site.** Adding 330 turtles to 128 cetaceans produces a number that means nothing, because the two are counted under different definitions and different reporting regimes.

## Options Considered

### Option A: One dataset with a `subject` field

Widen `StrandingTotals` with `subject: 'cetacean' | 'turtle'` and let every selector filter on it.

**Pros:** One module, one set of helpers, one mental model. A future third subject costs nothing. Cross-subject comparison becomes trivial if it is ever wanted.
**Cons:** The shapes do not fit. Turtles have no per-individual records to key by, so `Period` carries a county × species table for one subject and a flat total for the other. The breakdown interfaces diverge almost completely — turtle causes are encounter sources, not causes of death; turtles need release and care outcomes; cetaceans need a mass-stranding flag. Every selector grows a subject parameter it must not forget, and the type system stops helping: nothing prevents `causeRows({subject: 'turtle'})` from being rendered by a chart that labels it "cause of death". The union type would be honest only if it were a discriminated union, at which point the modules are separate in everything but filename.

### Option B: Two modules, shared `Period` ✅

**Pros:** Each module's types describe what its source actually publishes, so the compiler enforces the asymmetry instead of the author remembering it. `Period` and `latestPeriod()` stay shared, which is what data currency needs. A turtle chart cannot accidentally receive cetacean rows. The modules can move at different speeds — turtles will gain quarterly CSV ingestion long before cetaceans need it.
**Cons:** Some duplication: `shareOf`, `grandTotal` and the row-mapping pattern appear twice. Two files to touch when a report covering both taxa is published. If a third subject ever arrives, the duplication triples.

### Option C: Turtles as a section of the existing page

No new route; a turtle block appended to the homepage dashboard.

**Pros:** No routing, SEO, or nav work. One page to maintain.
**Cons:** The homepage already carries the full cetacean story and a 118 call to action; appending a second subject of greater volume buries both. The two subjects have different narratives that want different framing. And it forecloses the thing most likely to be wanted next — a turtle page that goes deeper than a section ever could.

## Trade-off Analysis

The duplication in Option B is real but bounded and shallow: four or five small pure functions, each a few lines, each independently testable. The coupling in Option A is unbounded and deep — it lives in the type system, where every future change to either subject has to be reconciled against the other.

The decisive argument is that **the asymmetry is not incidental, it is what the source is.** The OCA publishes cetaceans as records and turtles as a statistical table. A model that flattens that difference is lying about the data, and the site's whole premise is presenting official figures faithfully. `CONTEXT.md` already insists that data currency is "the part a reader needs in order to trust the numbers"; the same logic applies to granularity.

Reversibility favours B as well. Merging two modules later is mechanical. Splitting a discriminated union that has grown selectors, components and tests around it is not.

The one force pulling toward A — a future third subject — is speculative. No third subject appears in any MARN report.

## Consequences

- **Easier:** each subject's types match its source; the compiler catches subject mix-ups; the turtle page can ingest the quarterly CSV without touching cetacean code; the two narratives get the framing each deserves.
- **Harder:** a handful of pure helpers exist twice; a report covering both taxa means editing two files; nav, footer, SEO routes, sitemap, `llms.txt` and an OG image all need a second entry, in both locales.
- **Accepted limitation:** the turtle page is a page of aggregates. No point map, no body-length distribution, no case detail — because the source has none. This is stated plainly on the page rather than worked around.
- **To revisit:** if the OCA begins publishing record-level turtle data, revisit item 4 (no merged totals) and whether the modules should converge. If a third subject ever appears, reconsider Option A with a discriminated union.

## Action Items

1. [ ] Amend `CONTEXT.md`: widen `Stranding`, add `Subject`
2. [ ] `education/src/lib/data/turtles.ts` — types, data, and pure selectors; unit tests alongside, matching `strandings.test.ts`
3. [ ] Backfill 2019 – 2025 Q1 from `docs/research/sea-turtle-strandings-2019-2026.md`; take 2025 Q2 onward from the iOcean CSV
4. [ ] Routes `/turtles` and `/en/turtles`, with the locale mirror rule applied to all new copy
5. [ ] Nav and Footer entries, both locales
6. [ ] SEO: `routes.ts`, sitemap, `llms.txt`, OG image
7. [ ] State the aggregate-only limitation on the page itself

## References

- Issue [#52](https://github.com/AndreaFan123/khun-sin/issues/52) — the turtle page PRD, and the comment recording the CSV/aggregate finding
- `docs/research/sea-turtle-strandings-2019-2026.md`
- `docs/research/stranding-data-availability.md`
- ADR-002 — repository structure; `shared/` is not introduced by this decision
