# Stranding data availability across countries — what is actually obtainable

Compiled 2026-09-10. This is a feasibility scan, not a data layer: nothing here is
wired into the site. The purpose is to answer one gating question before any
multi-country work is scoped — is the underlying record-level data obtainable, and
under what terms?

Throughout, the distinction that matters is **"the report is public"** vs. **"the
records are public"**. Most national programmes are the former.

## Verdict

A multi-country harmonization project is **feasible but narrow**. It is not a
matter of collecting national databases — almost none of them are open. What is
open is a scatter of institution-level datasets published through biodiversity
aggregators, plus two or three genuine national open-data releases.

The realistic starting set, in descending order of confidence:

1. **Taiwan — OCA MARN cetacean strandings.** Record-level, WGS84 coordinates,
   Government Open Data Licence v1, CSV + JSON, 2020–present. This is the single
   best-documented open national stranding feed found, and it is the project's
   home dataset.
2. **UK — NHM historical dataset 1913–1989.** 4,311 records, CC-BY, direct CSV,
   with a `Condition` field ("alive") and a `By Catch` flag.
3. **Canada — DFO Newfoundland & Labrador sea turtle sightings/strandings/
   entrapments.** 959 records, 1946–2023, Open Government Licence — Canada, direct
   CSV, exact coordinates, `Animal Condition` and `Type of Sighting`.
4. **GBIF-published stranding datasets** (France/Pelagis 38,262 records; UK
   national 13,437; Vietnam 228; Oceania 76; several US aquaria). Bulk-downloadable,
   but see the field-loss finding below — these are occurrence records, not
   stranding records.

Everything else — NOAA, CSIP 1990-present, ACCOBAMS/MEDACES, Australia's national
database, New Zealand — is **request-only, member-only, or aggregate-only**. Any
project spanning those countries is a project of writing emails, not of writing
ETL. Budget for that, or scope the project to the four sources above.

The second structural problem: even where records are open, the fields that make a
stranding a stranding — condition code, dead/live, necropsy findings, cause of
death — are usually the first things dropped. See "The specific claim" below.

## Per-source findings

### NOAA — National Marine Mammal Stranding Database (MMHSRP)

- **Level:** Record-level exists (Level A reports), but is not public.
- **Access:** Database access is limited to active National Stranding Network
  members. The public route is a written data request; NOAA runs the query and
  returns an Excel file. Requests go to a regional coordinator, or
  `MMHSRP.NationalDB@noaa.gov` for multi-region queries. NOAA states custom queries
  "can take weeks to months to fill, especially for queries requiring the removal of
  personally identifiable information (PII) or business identifiable information
  (BII)".
- **Publicly downloadable:** Only three example Excel extracts — West Coast
  California sea lions (2017–2018), East Coast bottlenose dolphins (2017–2019),
  large whales (2005–2015).
- **Licence:** Unstated as a formal licence. The condition given is acknowledgement:
  publications must "recognize and acknowledge the contributions of the National
  Marine Mammal Stranding Network." No co-authorship condition is stated on the page.
- **Fields:** The Level A form carries species, approximate age, sex, date,
  location, condition/determination, disposition. Coordinate precision in a
  released extract is not stated — assume it is negotiated per request.
- **Coverage:** National, decades; record count not published.
- **Confidence:** High on the access model, low on what a fulfilled request actually
  contains. Regional InPort records exist (e.g. Southeast Region Level A, item 26502)
  but their access-constraint fields were truncated in what I could read.

### NOAA — STSSN (sea turtles)

- **Level:** Aggregate only, publicly. Summarized data from the last 10 years,
  verified, via an interactive R/Shiny-style application on `connect.fisheries.noaa.gov`.
  Recent unverified strandings are excluded.
- **Access:** Record-level requires going through state coordinators. The page is
  explicit that users must "consult and work directly with contributing state
  coordinators before sharing findings" — this is close to a de facto
  prior-review/co-authorship condition, though the word co-authorship is not used.
- **Licence:** Unstated. The only stated term is "Any publication or use of this
  data must credit the Sea Turtle Stranding and Salvage Network."
- **Caveat NOAA itself gives:** preliminary data posted online may change and is
  "unsuitable for formal publications."
- **Confidence:** High. This is aggregate-only in practice.

### UK — CSIP (1990–present)

- **Level:** Record-level exists, including post-mortem data — CSIP is unusual in
  that necropsy findings are systematically held.
- **Access:** **On request**, by contacting CSIP directly. The dataset is listed on
  data.gov.uk, MEDIN and marine.gov.scot, but the marine.gov.scot entry is a *web
  link* record only — it carries no licence, no record count, no access conditions,
  and points back at `ukstrandings.org`. The data.gov.uk landing page returned 404
  when I tried to fetch it and is not in the `ckan.publishing.service.gov.uk` API,
  so I could not read the stated licence.
- **Licence:** **Unstated** on every page I could reach. This is itself the finding.
- **Confidence:** Medium. I am confident it is request-based; I could not establish
  the licence or whether coordinates are released at full precision.

### UK — NHM historical dataset (1913–1989)

The one unambiguously open UK source.

- **Level:** Record-level, 4,311 rows.
- **Access:** Direct CSV from the NHM data portal, plus a CKAN datastore API. Note:
  the CSV download is behind a Cloudflare challenge and cannot be fetched by plain
  `curl` — it needs a browser or a session. The datastore API works unauthenticated.
- **Licence:** **CC-BY** (`license_id: cc-by`), stated in the CKAN metadata.
- **Fields (45 columns), including the ones that matter:** `Date`, `Scientific Name`,
  `Common Name`, `Latitude`, `Longitude` (full decimal precision), `Grid ref`,
  `County`, `Mass_Single` (mass vs. single stranding), `Sex`, `Length et`,
  **`Condition`** (e.g. "alive"), **`By Catch`**, `age`, `in Collections`, and a free-text
  `Comment` that carries narrative cause information — e.g. one 1989 record reads
  "Stranded live on the 25 Dec ... condition good implies it died".
- **Effort metadata:** None. Opportunistic reporting.
- **Confidence:** High — I read the fields and a sample record directly from the API.

### IWC Strandings Initiative — claim checked

**The claim that the IWC runs a global stranding database is wrong as stated.**

The Strandings Initiative, running since 2016, is a **coordination and
capacity-building programme**: an expert Strandings Coordinator, an Expert Advisory
Panel, real-time response support, and published best-practice guidelines for
stranding response and post-mortem examination. It is a *standard*, and a helpdesk.

A global database is an **aspiration in active development, not an existing
resource**. It is a joint effort with ASCOBANS, ICES and ACCOBAMS to build a
*regional European* database first, expandable later. As of the 2025–2028 workplan,
the tasks still open are identifying data providers, implementing quality control,
guiding the schema, and "providing input on data access" — i.e. the access model is
not even decided. It is to start with "high-level data as proof of concept". Where
it will be housed (IWC or ICES) was still under discussion.

Practical consequence: there is nothing to consume from the IWC today, and when
there is, the first release will be aggregate.

Note: the IWC's own site returned HTTP 403 to my fetch, so this rests on the ASCOBANS
documents and the search-result text from `iwc.int` rather than a direct read of the
IWC page. Confidence: high on substance, medium on the precise current wording.

### ACCOBAMS / MEDACES

- MEDACES (Mediterranean Database of Cetacean Strandings) is real, established in
  Valencia in 2001 under the Barcelona Convention and extended to the ACCOBAMS area,
  managed by the University of Valencia's Cavanilles Biodiversity Institute.
- ACCOBAMS's own strandings page **states no data policy at all** — it says it funds
  MEDACES and encourages scientists to upload and use it, and nothing about
  accessibility, download, or restriction. Licence: **unstated**.
- **I could not reach `medaces.uv.es`.** It is HTTP-only (HTTPS connection refused at
  147.156.5.144:443) and plain HTTP returned nothing from this network. So I cannot
  confirm record counts, fields, or whether public download exists. Treat MEDACES as
  unverified.
- ACCOBAMS also uses a GIS module on the NETCCOBAMS platform for its Emergency Task
  Force to share unusual stranding events — that is an internal operational tool, not
  a public dataset.

### ASCOBANS

Not a data holder. ASCOBANS Parties have a shared commitment to contribute to an
international database, and ASCOBANS is a partner in the IWC/ICES effort described
above. It has run scoping workshops ("Development of a European Marine Strandings
Database"). There is no ASCOBANS dataset to obtain.

### Australia

- The **National Whale and Dolphin Sightings and Strandings Database** is real and is
  registered on the Atlas of Living Australia (`dr93`), licensed **CC-BY 4.0**, with
  the rights note: "Data are freely available through GBIF, OBIS, SCAR-MarBIN and
  through the AADC web site."
- **But the ALA record explicitly says: "This resource currently only show the
  sighting records."** The stranding half of the database is not in the published
  resource. `dataGeneralizations` and `informationWithheld` are both "None", so the
  sightings that are there are un-redacted — but strandings are simply absent.
- DCCEEW's role is coordination; states and territories hold the response data out to
  3 nm and each would have to be approached separately.
- **Confidence:** High that the national database is not delivering strandings via
  ALA/GBIF today. What the AADC IPT resource (`data.aad.gov.au/ipt/resource?r=nssd`)
  contains was not separately verified.

### New Zealand

- The New Zealand Whale Stranding Database (est. 1988) is administered by Te Papa for
  DOC, and holds species, number of individuals, location, sex, size, injury causes,
  and rescue outcome — a rich field set.
- **No public access route found.** DOC's strandings page publishes a headline figure
  ("more than 5,000 strandings ... since 1840") and links Massey University pathology
  reports for significant incidents, but no dataset, no download, no documented
  request process.
- A GBIF dataset search for New Zealand strandings and for "Te Papa stranding"
  returned **zero** stranding datasets.
- **Licence:** Unstated. **Access:** Requires a direct approach to Te Papa or DOC.

### Canada

- No national marine mammal stranding open dataset. A CKAN search of
  `open.canada.ca` for "stranding" returns 14 datasets, of which exactly one is a
  stranding dataset; DFO's published marine mammal datasets are **sightings**
  databases (Maritimes Cetacean Sightings, At-Sea Observer records), not strandings.
- The one real hit: **"Sightings, Strandings, and Entrapment Data For Sea Turtles in
  Newfoundland and Labrador, Canada"**, DFO.
  - **Licence:** Open Government Licence — Canada (`ca-ogl-lgo`). Fully open.
  - **Access:** Direct CSV, plus FGDB and an ArcGIS REST MapServer. No request needed.
  - **Records:** 959 rows. **Coverage:** 1946–2023.
  - **Fields:** species, exact decimal lat/long, day/month/year, local time, location
    name, **`Loc Reliability`** and **`ID Reliability`** (1 = reputable source,
    2 = less reliable), min/max animal count, **`Animal Condition`** (alive/dead/
    unknown), platform, **`Type of Sighting`** (entrapment / free swimming /
    stranding / killed intentionally / unknown), **`Type of Gear`**, target species,
    **`Strand or Entrapment Outcome`**, depth, distance from observer, discard weight.
  - **Effort metadata:** DFO states directly that most records are opportunistic and
    "there are rarely data for a report that includes measures of the observer effort
    expended", except during DFO aerial surveys.
- This is a model of what a good open stranding release looks like — including the
  honesty about effort. Worth copying structurally.

### GBIF and OBIS as aggregators

**Do stranding datasets appear?** Yes, in GBIF — substantially. A dataset search for
"stranding" returns 221 datasets. Real ones include:

| Dataset | Records | Licence |
|---|---|---|
| Observatoire Pelagis — Réseau National Échouage (France), 1934–2020 | 38,262 | CC-BY-NC 4.0 |
| United Kingdom National Whale Stranding Database 1913–2008 | 13,437 | CC-BY-NC 4.0 |
| Cetacean Stranding Data in Hokkaido | — | CC-BY 4.0 |
| CBES Marine mammal stranding data in Vietnam, 2004–now | 228 | CC0 |
| Strandings of Oceania Database | 76 | CC0 |
| Mystic Aquarium marine mammal and sea turtle strandings 1976–2011 | — | CC-BY-NC 4.0 |
| Virginia Aquarium Marine Mammal Strandings 1988–2008 | — | CC-BY-NC 4.0 |
| National Museums Scotland marine strandings | — | CC0 |
| Historical strandings of cetaceans on the Portuguese coast | — | CC-BY-NC 4.0 |
| Bahamas Marine Mammal Research Organisation Strandings | — | CC-BY-NC 4.0 |

Note the licence spread: CC-BY-NC dominates, which **blocks commercial reuse** and is
a real constraint if the site ever carries advertising or is bundled into anything
commercial. CC0 and CC-BY appear but are the minority.

**OBIS is much worse.** A dataset search on the OBIS v3 API for "stranding" returns
**2 results**, and both are spatially destroyed: "Virginia Aquarium Stranding
Response Program **(aggregated per 1-degree cell)**" (215 records) and "Oceanic
Loggerhead Project (aggregated per 1-degree cell)" (219). A 1-degree cell is roughly
110 km. That is unusable for any coastal or county-level analysis. The same
"aggregated per 1-degree cell" pattern shows up in several GBIF sea-turtle datasets
too (Ghana Olive Ridley, Dubai Turtle Rehabilitation, Cape Cod Sea Turtle Release) —
so check for it before trusting any coordinate from these aggregators.

### SWOT (State of the World's Sea Turtles)

- **Confirmed nesting-focused, not stranding.** The database holds >6,000 nesting
  data records from >3,000 monitored sites, plus satellite telemetry. There is no
  stranding component.
- Hosted on OBIS-SEAMAP by Duke's Marine Geospatial Ecology Lab.
- **Access:** Two-layer terms — users must accept both the SWOT Terms of Use and the
  OBIS-SEAMAP Terms of Use before any download. After accepting, you can download
  nesting **beach locations** and map layers. **Nesting counts and some telemetry are
  not downloadable** without contacting the providers; any use of SWOT nesting numbers
  requires attempting to obtain permission.
- So: bespoke terms, gated, provider-permission required for the actual numbers.
- Irrelevant to a stranding project except as a cautionary example of terms design.

### Taiwan — OCA / iOcean / data.gov.tw

This is the most useful finding for the project, and it splits sharply by taxon.

**Cetaceans — record-level and open.** `MARN鯨豚擱淺資料` on the OCA 海洋保育資料倉儲系統
(iOcean data hub):
- 開放類型: **完全開放** (fully open). 更新頻率: 不定期 (irregular).
- **Licence: 政府資料開放授權條款－第1版** (Government Open Data Licence v1) — royalty-free,
  non-exclusive, sublicensable, irrevocable, worldwide, no written permission needed,
  **attribution required**, and no malicious alteration of the data. Functionally
  CC-BY-like.
- **Coverage:** 民國109年 (2020) onward.
- **Formats:** CSV and JSON. Latest resource timestamp 115/09/10 (2026-09-10).
- **Fields:** `Event_Date` (擱淺通報日期), `County_Co` (縣市), `WGS84X`, `WGS84Y`
  (decimal coordinates), `Name_Code` (物種名稱), `status` (狀態), `isGroup` (是否為群體),
  `Body_Length` (體長, m), `Handle` (處理), `appName` (通報單位).
- **What is absent:** no necropsy findings, no cause of death, no condition code
  beyond `status`, no effort metadata.
- **Friction:** the CSV download is gated behind a short 資料使用用途調查 usage survey
  (organisation type, purpose, optional email) before the file is released. The REST
  service (`.../WebService/GetData.ashx?id=[SourceID]`) requires a personal API key
  passed as an `API-KEY` HTTP header. Neither is a licence restriction — the licence
  is open — but both mean automated ingestion needs an account.
- The dataset is also mirrored to **TBN (台灣生物多樣性網絡)** as an occurrence dataset,
  same licence, **536 records** as of the 2024-03-18 import. The TBN page notes that
  敏感資料 (sensitive data) has been obscured — so the TBN mirror is *less* precise
  than the OCA original. Use the OCA hub, not TBN.

**Sea turtles — aggregate only.** `國內海龜擱淺件數統計` on the same hub is 完全開放, same
licence, updated 每季 (quarterly), but it is a **county × quarter statistical table**,
not records:
- Fields: 縣市別, 通報件數(件), 擱淺數(隻)_合計, 發現狀態(隻)_活體, 發現狀態(隻)_死亡, and
  per-species counts for 綠蠵龜 / 玳瑁 / 赤蠵龜 / 欖蠵龜 / 革龜 / 無法辨識.
- Resources go back at least to 114年第2季 (2025 Q2) and forward to 115年第1季 (2026 Q1).
- **This is a better source than the PDFs** used in `sea-turtle-strandings-2019-2026.md`
  — it is the same numbers in machine-readable CSV/JSON, and it fills the county
  breakdown and live/dead split directly. It does not go back to 2019 in the resource
  list I could see, so the PDFs remain necessary for the early years.

**data.gov.tw:** a search for 鯨豚 on the national open data portal returned **no
datasets** in the page I fetched (無資料 throughout), and the v2 REST API requires an
Authorization key. The OCA hub — not data.gov.tw — is the route.

**中華鯨豚協會 (Taiwan Cetacean Society):** not established. I found no open dataset,
no API, and no data-access page for TCS in this pass. They are a MARN response
partner, so their records plausibly flow into the OCA MARN dataset rather than being
published separately, but I did not confirm that. Treat as unknown.

## The specific claim

> "There is no single unified global stranding database; global aggregators like
> GBIF/OBIS carry occurrence records but not stranding-specific fields such as cause
> of death."

**Confirmed, with one qualification on each half.**

**First half — confirmed and strengthened.** There is no unified global stranding
database, and there is not even a regional European one. The IWC/ASCOBANS/ICES/
ACCOBAMS effort is at the stage of "identifying data providers" and "providing input
on data access" in a 2025–2028 workplan, and is scoped to start with high-level
(aggregate) data. MEDACES is the closest thing to a functioning regional database,
and it is Mediterranean-only, unlicensed as far as its sponsor's own pages state, and
I could not reach it.

**Second half — confirmed, and the mechanism is worth stating precisely.** I checked
this by querying the GBIF occurrence API directly rather than reading a description.

Take the **UK National Whale Stranding Database 1913–2008** in GBIF (13,437 records).
Its ~90 interpreted fields include full taxonomy, `decimalLatitude`,
`coordinateUncertaintyInMeters`, `eventDate`, `individualCount`, `occurrenceStatus`,
`iucnRedListCategory` — and **no condition, no vitality, no cause of death, no
necropsy, no bycatch flag**. `basisOfRecord` is `HUMAN_OBSERVATION`; the only remark
is `occurrenceRemarks = "Visual; shore"`.

Now compare the NHM's own CSV of the 1913–1989 portion of substantially the same
records: it has `Condition = "alive"`, a `By Catch` column, and a narrative `Comment`.
**The stranding-specific fields exist upstream and are lost in the Darwin Core
mapping.** That is the finding — not that the data was never collected, but that the
aggregator route silently drops it.

The same pattern holds elsewhere:
- **Pelagis (France, 38,262 records):** no condition field; `occurrenceRemarks =
  "Visual; shore"`.
- **CBES Vietnam (228 records):** dead/live survives *only as free text* —
  `occurrenceRemarks = "Dead"`. Not a structured, queryable field.
- **Strandings of Oceania (76 records):** has `lifeStage` and `sex`, but
  `occurrenceRemarks` is a Facebook URL and a news link. No cause of death.

I also tested whether GBIF supports the ratified Darwin Core `vitality` term as a
search parameter: `?vitality=ALIVE` returns HTTP 200 with a count of **3,949,710,445**
— the entire index. The parameter is silently ignored. You cannot filter GBIF by
alive/dead at all.

**Qualification:** "occurrence records but not stranding fields" understates a second
loss — *spatial* precision. OBIS's only two stranding datasets are both explicitly
"aggregated per 1-degree cell", and several GBIF sea-turtle stranding datasets carry
the same label. So for the aggregator route you can lose both the condition and the
location.

**Net:** GBIF is usable as a *discovery* layer — it is how you find that Hokkaido,
Portugal, Vietnam and the Bahamas have stranding datasets at all. It is not usable as
the *data* layer for anything that needs condition or cause. For those, you go back to
each publisher's own release, one at a time.

## Gaps

Things I could not establish, and what it would take.

1. **CSIP licence and access terms (1990–present).** Every page I could reach either
   404'd (data.gov.uk), was a bare web-link record (marine.gov.scot), or was blocked.
   CSIP holds the richest necropsy data in this survey. **Needs a direct email to CSIP
   / ZSL.** Ask specifically: licence, coordinate precision on release, and whether
   post-mortem findings are included or held back.
2. **MEDACES.** Site unreachable from here — HTTPS refused, HTTP empty. Record count,
   coverage, fields, and whether any public download exists are all unverified. The
   ACCOBAMS page states no data policy. **Needs a browser visit, and probably an email
   to the Cavanilles Institute at the University of Valencia.**
3. **What a fulfilled NOAA request actually contains.** The access model is clear; the
   product is not. Are coordinates released at full precision, or generalized? Is
   Level B/C (necropsy) data ever released? **Needs a test request to
   `MMHSRP.NationalDB@noaa.gov`.**
4. **Australia's stranding half.** ALA `dr93` says it currently shows sightings only.
   Whether the AADC IPT resource (`data.aad.gov.au/ipt/resource?r=nssd`) carries the
   stranding records, and whether any state agency publishes theirs, is unresolved.
   **Needs a check of the AADC IPT and then per-state enquiries.**
5. **New Zealand.** No access route found at all. **Needs an email to Te Papa** (who
   administer the database) rather than DOC.
6. **中華鯨豚協會.** No dataset, API, or data page found. Unclear whether their records
   are separately held or fold into OCA MARN. **Needs a direct enquiry.**
7. **IWC page text.** `iwc.int` returned 403 to my fetch; the IWC characterization here
   rests on ASCOBANS documents and search-result summaries of the IWC page. The
   substance is well corroborated but I did not read the IWC page myself.
8. **OBIS-SEAMAP dataset pages.** `seamap.env.duke.edu/dataset/1406` returned 404 on
   the URL form I tried, so the Pelagis dataset's own terms of use and full attribute
   list were read only through its GBIF mirror.
9. **Record counts for several GBIF datasets** (Hokkaido, Mystic, Virginia, Portugal,
   Scotland, Bahamas) — not pulled in this pass. Cheap to fill: one API call each.
10. **Whether Taiwan's MARN cetacean dataset covers 2020 to present continuously**, and
    its actual row count. The OCA hub page states 109年後 and the TBN mirror shows 536
    records at a 2024 import, but I did not download the current CSV (it is behind the
    usage-survey gate). **Needs a manual download.**
11. **Effort/survey-effort metadata generally.** Only DFO Canada states its effort
    situation explicitly (and states there mostly isn't any). No other source in this
    survey documents effort. This is a real modelling problem — reporting-rate change
    is indistinguishable from stranding-rate change without it, and the existing
    turtle note already shows exactly this confound in Taiwan's pound-net reporting
    jump from 2024.

## Sources

NOAA:
- <https://www.fisheries.noaa.gov/national/marine-life-distress/national-stranding-database-public-access>
- <https://www.fisheries.noaa.gov/national/marine-life-distress/marine-mammal-health-and-stranding-response-program>
- <https://www.fisheries.noaa.gov/national/marine-life-distress/sea-turtle-stranding-and-salvage-network>
- <https://connect.fisheries.noaa.gov/content/cb3f4647-9e4f-4f3d-9edf-e7a87a1feef6/> (STSSN summary app)
- <https://media.fisheries.noaa.gov/dam-migration/level_a_form_2023_opr2pdf.pdf> (Level A form)
- <https://www.fisheries.noaa.gov/inport/item/26502> (Southeast Region Level A, InPort)

UK:
- <https://ukstrandings.org/>
- <https://www.zsl.org/what-we-do/projects/cetacean-strandings-investigation-programme-csip>
- <https://marine.gov.scot/data/uk-cetacean-strandings-investigation-programme-csip>
- <https://data.nhm.ac.uk/dataset/historical-uk-cetacean-strandings-dataset>
- <https://data.nhm.ac.uk/api/3/action/datastore_search?resource_id=9a306dcd-1667-48b5-b682-ce6f071d85ce>

IWC / ASCOBANS / ACCOBAMS:
- <https://iwc.int/management-and-conservation/strandings/strandings-initiative> (403 on fetch)
- <https://www.ascobans.org/en/document/iwc-strandings-initiative-strandings-database-update>
- <https://www.ascobans.org/en/news/workshop-scoping-development-european-marine-strandings-database>
- <https://www.ascobans.org/sites/default/files/document/ecs-ascobans-strandings-database-ws2_report.pdf>
- <https://accobams.org/conservations-action/strandings/>
- <http://medaces.uv.es/> (unreachable)

Australia / New Zealand:
- <https://collections.ala.org.au/public/show/dr93>
- <https://data.aad.gov.au/ipt/resource?r=nssd>
- <https://www.dcceew.gov.au/environment/marine/marine-species/cetaceans/whale-dolphin-rescue>
- <https://www.doc.govt.nz/nature/native-animals/marine-mammals/marine-mammal-strandings/>

Canada:
- <https://open.canada.ca/data/en/api/3/action/package_search?q=stranding>
- Sea turtle sightings/strandings/entrapments NL: data CSV at
  <https://api-proxy.edh-cde.dfo-mpo.gc.ca/catalogue/records/7d187ff6-19f9-4f57-9de3-bd38ab760643/attachments/Data_EN.csv>,
  dictionary at `.../Data_Dictionary_EN.csv`
- <https://open.canada.ca/en/open-government-licence-canada>

Aggregators:
- <https://api.gbif.org/v1/dataset/search?q=stranding>
- <https://api.gbif.org/v1/occurrence/search?datasetKey=7ba44a6f-e031-4c43-9c7c-d8de11263558> (UK national)
- <https://api.gbif.org/v1/occurrence/search?datasetKey=f6baa711-9c3f-4820-97ce-83fe50744678> (Pelagis)
- <https://api.gbif.org/v1/occurrence/search?datasetKey=5b8b3849-659d-4a08-b268-1a8edaff7e9b> (Vietnam)
- <https://api.gbif.org/v1/occurrence/search?datasetKey=02d18c51-b04a-422d-aa2f-7ab81b7033b7> (Oceania)
- <https://api.obis.org/v3/dataset?q=stranding>

SWOT:
- <https://www.seaturtlestatus.org/data-terms>
- <https://www.seaturtlestatus.org/online-map-data>
- <https://seamap.env.duke.edu/help/swot/swot_seamap_termsofuse>

Taiwan:
- <https://iocean.oca.gov.tw/OCA_datahub/DataSetView.aspx?k=ceeb80a4-88ca-47cb-a9b3-0373546d97c9> (MARN鯨豚擱淺資料)
- <https://iocean.oca.gov.tw/oca_datahub/DataSetView.aspx?k=42e5d50c-de79-45ea-88ac-0f0a32460e68> (國內海龜擱淺件數統計)
- <https://iocean.oca.gov.tw/OCA_DataHub/DataSetList.aspx>
- <https://www.tbn.org.tw/dataset/56ef0026-f233-461d-b096-f26eec52e9d9> (TBN mirror)
- <https://www.oca.gov.tw/ch/home.jsp?id=185&parentpath=0,6> (海保救援網 MARN)
- <https://data.gov.tw/datasets/search?qs=%E9%AF%A8%E8%B1%9A> (no results)
