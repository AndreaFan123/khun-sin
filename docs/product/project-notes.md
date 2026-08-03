# Khun-Sin (鯤鯓) — project notes: digitizing cetacean conservation in Taiwan

_Notes last updated: 2026-07-21 · English counterpart of [專案筆記.md](專案筆記.md)_

> **Read the status note at the end before acting on anything here.** These are
> dated working notes, not a current-state document — several items described as
> pending have since shipped.

## Vision

Promote cetacean conservation, and digitize the rescue and care data behind it.
The pain today: care is recorded mostly **on paper** and rescue coordination
happens in **Line group chats**, so information is hard to aggregate, easily lost
at handoff, and impossible to see whole.

The core strategy is deliberately **not "build a promotional website"** but
**"build one data pipeline that grows three faces"** — structured field forms →
a central database → automatically generated public visualization. Taiwan's data
is currently locked in paper and Line, which starves both downstream analysis
and the public-facing story.

## Two workstreams

1. **Education site** (✅ done, see `index.html`)
2. **Reporting / case-management prototype** (to build)

---

## 1. Education site (index.html)

A single file, Traditional Chinese, aimed at a general audience, with interactive
visualization, light/dark modes and responsive layout. Four sections:

- **Meet Taiwan's cetaceans** — the roughly 30 species recorded here, flagship
  species cards (Taiwanese white dolphin, finless porpoise and others), and the
  2025 species distribution.
- **Strandings and threats** — the seven-year trend, seasonality, distribution by
  county (with the offshore-island hotspot), causes of death, human-made threats,
  and how behaviour on land reaches the sea.
- **How to report and take part** — the 118 hotline, the four reporting steps,
  do and don't, on-site safety assessment, and "report it even if it has died".
- **Conservation in action** — the five-party MARN network, the pygmy killer
  whale mass-rescue story, why mass strandings happen, white dolphin conservation
  figures, and the professional trade-off behind "there is no perfect answer in
  rescue".

Source: the Ocean Conservation Administration's Marine Animal Rescue Network
(MARN) stranding reports — **all annual reports 2019–2025** plus **2026 Q1**,
extracted from the PDFs supplied.

### Key figures extracted (for reuse)

**Strandings over seven years (dead / live / total / live rate)**

| Year | Dead | Live | Total | Live rate |
|---|---|---|---|---|
| 2019 | 132 | 18 | 150 | 12.0% |
| 2020 | 143 | 18 | 161 | 11.2% |
| 2021 | 133 | 11 | 144 | 7.6% |
| 2022 | 119 | 25 | 144 | 17.4% |
| 2023 | 141 | 17 | 158 | 10.8% |
| 2024 | 135 | 24 | 159 | 15.1% |
| 2025 | 121 | 7 | 128 | 5.5% (lowest of the seven) |

(The 2019 live count includes three animals that had strayed and swam off on
their own. The 2021 report was an image-only PDF with no extractable text; its
total was cross-checked against the five-year chart in the 2025 report.)

**Trends across years**

- The finless porpoise — the coastal species — takes a rising share each year:
  roughly 29% in 2020 → roughly 39% in 2022 → 45.3% in 2025.
- The share of deaths that cannot be determined because the body was too
  decomposed also rises each year: roughly 56% in 2020 → 62% in 2022 → 64.7% in
  2023 → 70% in 2025. This is what makes prompt reporting matter.

**2025 in detail**

- 21 species. Top five: finless porpoise 58 (45.3%), Indo-Pacific bottlenose 14
  (10.9%), then pantropical spotted dolphin, Fraser's dolphin and common
  bottlenose at 8 each (6.3%). Chinese white dolphin: 3.
- By county (animals): Lienchiang 26, Kinmen 24, Penghu 15 — **the three
  offshore-island counties total 65, which is 51% of Taiwan** — then Yilan 14,
  New Taipei 9, Taoyuan 7, Miaoli 7, Kaohsiung 6, Hualien 4, Taitung 3,
  Changhua 3, Tainan 3, Pingtung 3, Hsinchu 2, Keelung 2.
- By month (animals): Jan 14, Feb 20, Mar 15, Apr 18, May 9, Jun 3, Jul 6,
  Aug 9, Sep 4, Oct 6, Nov 5, Dec 19 — concentrated in winter.
- Causes: too decomposed to determine 89 (70%), suspected human activity such as
  bycatch or vessel strike 19 (15%), disease or death at birth 12 (9%),
  separation from the mother 4 (3%), other 4.
- White dolphin conservation: 74 individuals in the photo-ID catalogue, 119
  at-sea sighting groups; 62 animals scientifically sampled, 21 pathology
  analyses.

**2026 Q1**: 65 animals — the highest first quarter in five years — of which 7
live and 58 dead, across 13 species. Pingtung had the most cases (12); finless
porpoises numbered 21.

- Notable: **11 pygmy killer whales stranded together at Checheng, Pingtung, and
  7 were successfully released** by a response of more than 60 people; a 15.4 m
  fin whale in Hualien; a Chinese white dolphin at Kinmen; a minke whale in
  Yilan.

**Conservation messages that matter**

- Call **118** (Coast Guard, 24 hours) when you find a stranding.
- **Never drag or push a live dolphin back into the sea yourself.** Dragging
  abrades their fragile skin, and the animal can inhale water — four died this
  way in 2024. On-scene mortality for cetaceans runs around 85%.
- Assess the scene first: oil on the water, sharp smells, unidentified organisms
  on the animal's skin.
- **Report dead animals too** — a body carries a great deal of scientific
  information through necropsy, sampling and pathology.
- One cause of mass strandings: dolphins are social animals, and when one
  strands, its companions follow the sound toward it.
- The Taiwanese white dolphin is critically endangered — fewer than 50 are
  estimated to remain, and the population declines about 3–4% a year.

---

## 2. Proposed architecture for the reporting system (to build)

### Three pillars plus a connecting layer

- **Standard form (the backbone)** — mobile-first, fillable offline, controlled
  vocabulary, photos carrying GPS automatically, one case number running through
  the whole event. Four progressive stages: ① public report (30 seconds: time,
  GPS, photo, category, alive or dead, whether the scene is safe) → ② quick
  triage by a local volunteer (size, substrate, vehicle access, tide) →
  ③ professional Level A field response → ④ care log and case closure. It must
  align with the Ocean Conservation Administration's MARN rescue record: this is
  **a digital front-end for MARN, not a rival system**.
- **Central database (the heart)** — a single "stranding event" at the core with
  many child records; aligned standards (species codes, coordinates), layered
  permissions (public / volunteer / coordinator / researcher / open data, after
  the UK's CSIP), automatic merging of duplicate reports, and an audit trail on
  every entry.
- **Public reporting entry (the face)** — login-free and single-page. The
  **feedback loop** — giving reporters a case number they can follow — is the
  piece Taiwan most lacks and that comparable systems abroad do best. The public
  map and dashboard are generated from the same database.
- **Dispatch and coordination layer (what Line is standing in for)** — a report
  automatically notifies the nearest team in that area, can be assigned, and
  moves through states. This is what stitches the three pillars together.

### Taiwan's rescue chain today

118 (Coast Guard, 24 hours) → notification by Line to academic and association
teams (the NCKU cetacean center, the Taiwan Cetacean Society and others) → the
scene must first report the animal's **condition** (size, alive or dead,
substrate) before anyone can decide on vehicles, people, or whether to dig a
drainage channel. Worth building: **a network of local civilian units in coastal
counties** — tiered volunteers, dispatch to whoever is nearest, equipment boxes,
and cooperation with Coast Guard sub-stations. The five parties in this
public-private effort: the Coast Guard, the Ocean Conservation Administration,
academic cetacean centers, local civilian groups, and veterinarians.

### Benchmarks abroad

- **NOAA** — a standardized Level A form (published as a fillable PDF), a closed
  national electronic database, Health MAP for analysis, and the Dolphin & Whale
  911 app for public reports. Level A is **filled in by trained responders, not
  by the public**.
- **UK CSIP** — a single programme running 30+ years, with a public database
  (data.ukstrandings.org) and open data.

---

## Next steps (as of the note date)

- [ ] Reporting prototype: initial public form → submission reaching the rescue
      side → continuous records on one case, including nearest-team dispatch and
      the feedback loop. Could be built as a clickable demo.
- [ ] Multi-year analysis dashboard: extract the per-year species, county and
      seasonal breakdowns for 2019–2024 (mostly inside map-style graphics, so
      each page has to be read visually).
- [ ] Domain and brand: candidates podline / cetamap / seasignal / strandwatch,
      registration to be checked.
- [ ] Education site follow-ups: sea turtle data, an interactive map, a bilingual
      version.

---

## Status note: what has changed since these notes

Kept separate so the notes above stay a record of what was known on 2026-07-21.

- **The education site was rebuilt.** `index.html` is retired; the site is now a
  SvelteKit app under `education/`, live at
  [www.khun-sin.com](https://www.khun-sin.com). See
  [education-site-rebuild-spec.md](education-site-rebuild-spec.md).
- **Shipped from the follow-up list**: the interactive stranding map, and a full
  bilingual mirror at `/en`. Sea turtle data has not been added.
- **Domain resolved**: khun-sin.com, none of the candidate names.
- **Dark mode was dropped** — the site's identity is its fixed light/dark band
  rhythm; see the reasoning in the rebuild spec's non-goals.
- **Still to build**: the reporting system itself. Its design belongs to ADR-003,
  which has not been written, and the three pillars above remain an untested
  sketch — no volunteer, coordinator or vet has reviewed them.
