# International Cetacean and Sea Turtle Content MVP

**Status:** Proposed MVP experiment  
**Date:** 2026-10-16  
**Primary audience:** General readers in Taiwan who are interested in marine animals but are not necessarily conservation professionals  
**Source scope:** International cetacean and sea turtle conservation sources  
**Publishing languages:** Traditional Chinese first, with an adapted English version  

## Problem Statement

How might we help readers in Taiwan consistently understand important international cetacean and sea turtle conservation developments without merely translating or republishing foreign NGO content?

International organisations regularly publish rescue stories, scientific findings, policy updates, educational material, and calls to action. These sources are fragmented across websites, newsletters, reports, and social platforms. A Taiwanese reader must discover the sources, judge their credibility, understand unfamiliar international context, and work out whether the story has any relevance to Taiwan.

The product opportunity is therefore not another ocean-news aggregator. It is a bilingual editorial service that monitors trusted international sources, verifies the underlying facts, and explains why each selected development matters to a Taiwan-based reader.

## Recommended Direction

Build an internal, human-reviewed content workbench for international cetacean and sea turtle conservation. The workbench should collect source metadata, maintain a candidate-topic inbox, record rights and provenance, support fact cards and bilingual drafts, and track publication and performance.

Traditional Chinese is the canonical editorial version. English is a second-language adaptation that shares the same facts and sources; it is not a separate international-market content strategy. Each published item should answer three questions:

1. What happened or what did the source establish?
2. Why does it matter for conservation?
3. How should a reader in Taiwan understand or act on it?

The first release should remain a semi-automated editorial workflow. Machines can discover, classify, deduplicate, summarise, and draft. A person must select topics, verify claims, approve rights, set the Taiwan context, and publish.

## Target User and Job to Be Done

### Primary reader

A Taiwan-based reader who is curious about whales, dolphins, and sea turtles but does not routinely read international conservation organisations or scientific publications in English.

### Reader job

> When an important international marine-conservation story appears, I want a trustworthy and understandable explanation in Traditional Chinese, so I can learn what it means and decide whether there is a relevant action I can take.

### Internal editor

The initial operator is a small editorial team or a single editor who needs to produce three source-grounded bilingual posts each week without losing track of provenance, translation consistency, or image rights.

## Editorial Positioning

The service is:

- international in its source coverage;
- Taiwanese in its editorial context;
- focused on cetaceans and sea turtles;
- educational and source-transparent;
- bilingual, with Traditional Chinese as the primary language;
- human-reviewed before publication.

The service is not:

- a verbatim translation service;
- a real-time breaking-news feed;
- a mirror of NGO websites;
- an official rescue or emergency-reporting channel;
- a substitute for scientific, veterinary, legal, or government guidance.

## Eight-Week MVP Experiment

Run the workflow for eight consecutive weeks and publish up to 24 bilingual content packages.

### Weekly content mix

| Slot | Core subject | Purpose |
|---|---|---|
| Post A | Cetacean | Build consistent coverage of whales, dolphins, and porpoises |
| Post B | Sea turtle | Give sea turtles equal, predictable editorial attention |
| Post C | Shared threat, science, or solution | Connect both groups to wider conservation systems |

Suitable themes include rescue and rehabilitation, bycatch, vessel strikes, fishing-gear entanglement, marine debris, underwater noise, climate and ocean heat, habitat protection, research methods, conservation policy, and community-led solutions.

### Deliverable for each post

Every content package must contain:

- a source-grounded fact card;
- a Traditional Chinese primary draft;
- an adapted English draft;
- the canonical source URL and publication date;
- any corroborating or verification sources;
- a recorded text and media rights decision;
- a Taiwan-context paragraph or an explicit note that no meaningful Taiwan connection was found;
- publication status and publication URL;
- basic performance data after publication.

## Initial Source Strategy

Begin with approximately 10–12 active sources. More sources are not automatically better: the MVP should first learn which sources repeatedly produce material that is credible, usable, relevant, and legally publishable.

### Cetacean starting set

- Whale and Dolphin Conservation — <https://whales.org/>
- Ocean Alliance — <https://whale.org/news/>
- The Marine Mammal Center — <https://www.marinemammalcenter.org/featured-news>
- International Whaling Commission — <https://iwc.int/>
- Important Marine Mammal Areas — <https://www.marinemammalhabitat.org/>

### Sea turtle starting set

- Sea Turtle Conservancy — <https://conserveturtles.org/>
- SEE Turtles — <https://www.seeturtles.org/turtle-blog>
- IUCN SSC Marine Turtle Specialist Group — <https://www.iucn-mtsg.org/>
- State of the World's Sea Turtles — <https://www.seaturtlestatus.org/>
- NOAA Fisheries sea turtle resources — <https://www.fisheries.noaa.gov/sea-turtles>

### Cross-cutting sources

Broad ocean organisations such as Ocean Conservancy, Oceana, and WWF Oceans may enter the source registry, but their items should reach the editorial queue only when they directly concern cetaceans, sea turtles, or a clearly relevant shared threat or solution.

Inclusion in this list is not permission to scrape, translate, reproduce, or commercially redistribute any source material. Each source requires an individual terms and rights review before automated collection or publication use.

## Minimum Workbench Scope

The MVP workbench needs five logical collections. These can initially be implemented in an existing database, spreadsheet, or low-code tool; a custom application is not required before the workflow is validated.

### 1. Source Registry

Minimum fields:

- organisation name;
- country or region;
- source type: NGO, research group, government, or intergovernmental body;
- subject coverage: whale, dolphin, porpoise, sea turtle, or cross-cutting;
- topic tags;
- official site, feed, newsletter, or API location;
- collection method;
- source trust tier;
- text reuse status;
- media reuse status;
- commercial-use status;
- automated-access status;
- contact or permission route;
- last terms review date;
- active or inactive status.

Rights-related fields should use controlled states such as `allowed`, `prohibited`, `permission_required`, and `unknown`. An `unknown` or conflicting state must fail closed: the material must not be reproduced or distributed until reviewed.

### 2. Candidate Inbox

Store only what is needed for discovery and editorial triage by default:

- source;
- original title;
- author, if provided;
- publication date;
- canonical URL;
- short internal summary;
- species and topic tags;
- geography;
- possible Taiwan relevance;
- duplicate-cluster identifier;
- rights status;
- editorial score;
- lifecycle status.

The default collection process should not archive full articles or download source images. RSS, APIs, newsletters, and permitted metadata access should be preferred over unrestricted crawling.

### 3. Fact Card

The fact card is the shared foundation for both language versions:

- proposed angle;
- central claim;
- confirmed facts, dates, quantities, and locations;
- common name, English name, and scientific name where relevant;
- primary source;
- independent or authoritative verification source;
- uncertainty and disputed points;
- Taiwan connection;
- safety or sensitivity concerns;
- approved media and licence evidence;
- claims that must not be published.

### 4. Bilingual Post

Minimum workflow states:

`candidate` → `selected` → `researching` → `zh-TW draft` → `English adaptation` → `rights review` → `editorial review` → `scheduled` → `published` → `measured`

The English version should be adapted from the fact card rather than mechanically back-translated from Chinese. Both versions must preserve the same facts, uncertainty, attribution, and publication context.

### 5. Performance Record

Record at minimum:

- publication platform and URL;
- publish date;
- impressions or reach, where available;
- saves;
- shares;
- meaningful comments;
- source-link clicks;
- newsletter or community conversions, if available;
- corrections or complaints;
- production time.

## Collection and Editorial Pipeline

1. Monitor approved feeds, newsletters, APIs, and official pages.
2. Add new metadata to the candidate inbox.
3. Deduplicate items that describe the same event or study.
4. Classify by species, topic, geography, source type, and rights status.
5. Score candidates for relevance, credibility, freshness, visual feasibility, actionability, Taiwan context, and portfolio balance.
6. Select one cetacean, one sea turtle, and one shared-theme item for the week.
7. Build a fact card and verify material claims against authoritative or independent sources.
8. Write the Traditional Chinese primary version.
9. Adapt the English version from the same fact card.
10. Complete factual, language, welfare, sensitivity, and rights review.
11. Schedule and publish.
12. Record performance and feed the learning into the next selection cycle.

## Editorial and Rights Rules

- Attribution does not replace permission.
- Do not translate or reproduce a complete article unless the licence or written permission explicitly permits it.
- Do not reuse photographs, illustrations, maps, audio, or video merely because they appear on an NGO website or social account.
- Prefer original media, commissioned media, explicitly licensed Creative Commons material, public-domain material, or written permission.
- Keep evidence of permission and the exact applicable licence with the post record.
- Separate the source's statements from the project's analysis or opinion.
- Do not present an advocacy organisation's claim as settled scientific consensus without verification.
- Use short quotations only when necessary and legally appropriate; original explanation is the default.
- Do not imply endorsement, partnership, or affiliation with a source organisation.
- Do not expose sensitive nest, breeding, resting, rehabilitation, or endangered-animal locations when disclosure could increase disturbance or harm.
- Rescue posts must not encourage untrained readers to touch, move, feed, return, or otherwise handle wildlife.
- Corrections must be visible, dated, and connected to the affected language versions.

## Candidate Scoring

Use a small, explainable editorial score rather than engagement prediction alone. Each candidate can receive 0–5 points for:

- relevance to cetaceans or sea turtles;
- source authority;
- freshness;
- educational value;
- Taiwan relevance;
- actionability;
- visual feasibility with cleared rights;
- contribution to the current month's topic balance.

High emotional impact must not override weak evidence, unclear rights, excessive animal distress, or sensitive-location risk.

## Key Assumptions to Validate

- [ ] Taiwan readers repeatedly engage with international cetacean and sea turtle stories when the Taiwan context is made explicit. Test through saves, shares, meaningful comments, return visits, and source-link clicks.
- [ ] The selected source set produces enough high-quality material for three original posts per week. Track usable candidates per source and rejection reasons.
- [ ] A single editor or small team can sustain the fact-checking, bilingual adaptation, rights review, and publication workload. Track production time by workflow stage.
- [ ] English adaptations create measurable value rather than only doubling production work. Compare English-page use, sharing, search discovery, and downstream reuse.
- [ ] A reliable visual strategy can be maintained without routinely using rights-unclear NGO imagery. Track how often a topic is blocked or delayed by media rights.
- [ ] The Taiwan-context layer is genuinely useful and does not become a forced paragraph attached to unrelated international stories. Review reader feedback and editorial rejection notes.

## Success Criteria

At the end of eight weeks, continue or expand the MVP only if the evidence supports both editorial sustainability and reader value.

### Operational

- The team can produce the planned three bilingual content packages per week with an acceptable and recorded time cost.
- Every published claim is traceable to a fact card and source.
- Every published media asset has a recorded rights basis.
- Corrections, if any, are logged and reflected in both languages.
- The source registry identifies which sources consistently produce usable items and which should be paused.

### Audience

- At least one repeatable content format shows meaningful saves, shares, source clicks, comments, return visits, or community sign-ups.
- Weeks five through eight show an identifiable improvement over the first four-week baseline in at least one selected audience-value metric.
- Readers demonstrate interest in the explanation and Taiwan context, not only in dramatic or cute animal imagery.

### Decision outcomes

- **Continue:** the workflow is sustainable and at least one content format demonstrates repeatable reader value.
- **Adjust:** audience interest exists, but language scope, frequency, source mix, or format is too expensive or inconsistent.
- **Stop:** the workflow cannot legally and sustainably produce three differentiated posts per week, or the content generates no meaningful reader behaviour beyond passive impressions.

## Not Doing in the MVP

- Covering all marine species — focus is required to build editorial identity and learn efficiently.
- Serving a general international audience — the primary user is in Taiwan; English is a second-language version.
- Real-time breaking-news publication — speed must not displace verification and rights review.
- Full-text article warehousing — it adds rights and operational risk without proving reader value.
- Automatic translation and publication — human context and review are core product value.
- Automatic reuse of source media — media rights must be established separately.
- A large custom backend — validate the editorial workflow before replacing low-code or existing tools.
- Membership, paid subscriptions, or a public content API — these depend on evidence of recurring reader demand and clear redistribution rights.
- Emergency rescue intake or case dispatch — that is a separate, authority-dependent product stream.

## Risks and Mitigations

| Risk | Impact | MVP response |
|---|---|---|
| Copyright or terms violation | High | Source-level rights registry, fail-closed publishing, retained permission evidence |
| Misinformation or translation drift | High | Shared fact card, authoritative verification, bilingual human review |
| Disturbance caused by sensitive locations | High | Suppress precise locations and apply a wildlife-sensitivity review |
| Content becomes rescue tragedy or cute-animal feed | Medium | Fixed weekly mix and monthly topic-balance review |
| English doubles work without value | Medium | Measure English use separately and reduce its channel footprint if unsupported |
| Too many low-value sources | Medium | Track source yield and pause sources with repeated rejection |
| Publishing cadence becomes unsustainable | High | Track production time and reduce frequency before lowering review quality |
| Taiwan context feels artificial | Medium | Permit explicit "no direct Taiwan connection" and reject forced localisation |

## Open Questions Before Implementation

- Which channels are in the first eight-week test: the project website, Instagram, Facebook, Threads, a newsletter, or a smaller subset?
- What is the maximum sustainable editorial time per post and per week?
- Will the website or a social platform be the canonical location for each bilingual item?
- What original, licensed, or public-domain visual library is available at launch?
- Which audience metric will be the primary signal: saves, shares, source clicks, return visits, or community sign-ups?
- Who is the final factual and rights approver before publication?

## Immediate Next Step

Before building a custom backend, configure the five logical collections in the simplest available tool and run one complete weekly cycle with three unpublished sample packages. Review the actual time, source quality, rights friction, bilingual consistency, and editorial usefulness. Only then choose which parts should be automated or implemented inside the Khun-Sin project.
