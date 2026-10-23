# Content pipeline prototype

**Status:** Throwaway operational prototype  
**Decision under test:** Can the source mix sustain three differentiated, rights-aware bilingual packages per week, and what blocks publication before a custom backend is justified?  
**Prototype window:** 2026-W43 to 2026-W45  

This folder turns the [international cetacean and sea turtle content MVP](../docs/ideas/international-cetacean-sea-turtle-content-mvp.md) into three testable weekly cycles. It is not a publishing system. The sample packages stay unpublished until an editor completes the factual, rights, language, and safety reviews. See the [three-week experiment review](experiment-review.md) for the result and remaining evidence gaps.

## What the prototype contains

| MVP collection | Prototype record |
|---|---|
| Source Registry | [`data/source-registry.json`](data/source-registry.json) |
| Candidate Inbox | [`data/candidate-inbox.json`](data/candidate-inbox.json) |
| Fact Card | `Fact card` section in each weekly package |
| Bilingual Post | Traditional Chinese and English sections in each weekly package |
| Performance Record | [`data/performance-records.json`](data/performance-records.json) |

The source registry starts with the 12 international sources proposed in the MVP and adds Taiwan's Ocean Conservation Administration for local context. Seven sources have completed a source-level rights review. Completion does not mean that reuse is allowed: permission-required sources stay active for research and candidate discovery, while their packages fail closed.

## Run one weekly cycle

1. Review the source registry and update any terms that changed.
2. Add metadata-only candidates to the inbox. Do not store full source articles or download source media by default.
3. Score each candidate from 0 to 5 on the eight fields in the MVP.
4. Select one cetacean item, one sea turtle item, and one shared or Taiwan-connection item.
5. Copy [`templates/content-package.md`](templates/content-package.md) for each selected item.
6. Write the fact card before either language draft.
7. Stop publication when a rights state is `unknown` or `permission_required`.
8. Run the validator.
9. After publication, replace the empty performance record with observed values.

Run the quality gate from the repository root:

```sh
node content-pipeline/validate.mjs
node content-pipeline/validate.mjs --self-test
```

The first command checks the actual prototype. The second command proves that the validator rejects a missing section and an unsafe rights decision.

## Week 43 sample set

| Slot | Package | Gate |
|---|---|---|
| Cetacean | [Vessel-strike mitigation](weeks/2026-W43/01-cetacean-vessel-strikes.md) | Blocked pending an IWC reuse decision |
| Sea turtle | [Turtle excluder device compliance](weeks/2026-W43/02-sea-turtle-ted-compliance.md) | Ready for editorial and Taiwan subject review |
| Taiwan connection | [Why reporting comes before handling](weeks/2026-W43/03-report-first-rescue-networks.md) | Ready for editorial and safety review |

## Week 44 sample set

| Slot | Package | Gate |
|---|---|---|
| Cetacean | [An IMMA is not a protected area](weeks/2026-W44/01-imma-is-not-a-protected-area.md) | Blocked pending IMMA reuse permission |
| Sea turtle | [Turtle priorities need regional units](weeks/2026-W44/02-turtle-priorities-need-regional-units.md) | Blocked pending MTSG terms clarification |
| Taiwan connection | [From priority map to management](weeks/2026-W44/03-map-to-management.md) | Blocked by the more restrictive international sources |

## Week 45 sample set

| Slot | Package | Gate |
|---|---|---|
| Cetacean | [No sighting can still be data](weeks/2026-W45/01-no-sighting-is-still-data.md) | Blocked pending WDC reuse permission |
| Sea turtle | [A nest dig is monitoring](weeks/2026-W45/02-nest-dig-is-monitoring.md) | Blocked pending STC reuse permission |
| Taiwan connection | [What makes a wildlife report usable](weeks/2026-W45/03-what-makes-a-report-usable.md) | Blocked by the more restrictive international sources |

## Decision after the prototype

The three-cycle prototype shows adequate short-term source yield and a repeatable document structure. It also shows that rights review is the dominant publication bottleneck: seven of nine packages are blocked, and the other two still need human approval.

Do not build a custom backend yet. First run a 6–10-person reader review and time one complete human-edited week. Build software only for repeated clerical bottlenecks that those tests expose. Topic judgment, Taiwan context, rights approval, subject review, and safety review remain human decisions.

