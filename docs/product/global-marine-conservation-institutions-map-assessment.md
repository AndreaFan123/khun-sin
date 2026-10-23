# Global marine conservation institutions map assessment

**Status:** Proposed MVP  
**Branch:** `feat/global-marine-conservation-map`  
**Base:** `develop` at `133cd8e`  
**Reviewed:** 23 October 2026

## Recommendation

Add a new bilingual route at `/institutions` and `/en/institutions`. Keep the existing `/map` route for Taiwan cetacean and sea-turtle stranding data.

The new page should use a static world map as navigation. A visitor selects a country, then reads a short panel that explains which public institutions handle marine policy, protected areas, protected species, fisheries, pollution, or enforcement.

Do not label one organisation as the sole marine conservation agency for a country. Official sources show that responsibilities are commonly divided across several institutions or levels of government. The jurisdiction is the primary record. Each record contains one or more institutions with defined roles and scope notes.

## User goal

A reader should be able to answer two questions in less than one minute:

1. Which public institutions handle marine conservation in this jurisdiction?
2. What does each institution actually do?

The first release is an introduction. It is not a legal directory, an emergency reporting service, or a complete list of every national and subnational authority.

## First-release scope

Start with seven countries. Add the European Union as a separate regional profile because it creates shared policy while member states retain implementation duties.

| Jurisdiction | Institutions to introduce | Scope note | Official evidence |
|---|---|---|---|
| Taiwan | Ocean Conservation Administration | Marine ecology, biodiversity, protected areas, non-fishery resources, pollution prevention, education, and coordination | [OCA responsibilities](https://www.oca.gov.tw/ch/home.jsp?id=438&parentpath=0%2C300%2C431%2C437) |
| United States | NOAA Fisheries, with links to other federal roles where relevant | NOAA Fisheries covers fisheries, protected marine species, habitat, and science. It is not the only federal body with ocean duties | [NOAA Fisheries mission](https://www.fisheries.noaa.gov/about-us) |
| United Kingdom | Marine Management Organisation and Joint Nature Conservation Committee | The initial profile must state that MMO powers cited here concern English waters and that devolved administrations have separate arrangements | [MMO marine conservation](https://www.gov.uk/government/collections/marine-conservation), [JNCC marine conservation zones](https://www.jncc.defra.gov.uk/our-work/marine-conservation-zones/) |
| Japan | Ministry of the Environment | Introduce marine biodiversity, ecologically or biologically significant areas, and marine environmental policy. Fisheries and maritime enforcement belong to other bodies | [Japan marine biodiversity](https://www.env.go.jp/en/nature/index.html), [Japan significant marine areas](https://www.env.go.jp/en/nature/biodic/kaiyo-hozen/kaiiki/index.html) |
| Australia | Parks Australia and the Director of National Parks | The profile covers Commonwealth marine parks. Other marine parks and the Great Barrier Reef have different authorities | [Parks Australia](https://www.dcceew.gov.au/parks-heritage/national-parks/parks-australia), [Australian Marine Parks](https://parksaustralia.gov.au/marine-parks/) |
| New Zealand | Department of Conservation | DOC establishes, manages, and monitors marine reserves. Fisheries measures involve fisheries authorities | [New Zealand marine protection](https://www.doc.govt.nz/nature/habitats/marine/type-1-marine-protected-areas-marine-reserves/) |
| Canada | Fisheries and Oceans Canada, with Parks Canada and Environment and Climate Change Canada noted | Federal marine conservation uses several legal tools and agencies. DFO establishes Oceans Act protected areas | [Canada marine conservation tools](https://www.dfo-mpo.gc.ca/oceans/conservation/areas-zones/index-eng.html) |
| European Union | European Commission environment and fisheries policy functions | Treat the EU as a regional profile, not a country. Member states implement key duties under EU and national law | [EU marine environment](https://environment.ec.europa.eu/topics/marine-environment_en), [Common fisheries policy](https://oceans-and-fisheries.ec.europa.eu/common-fisheries-policy-cfp/common-fisheries-policy-overview_en) |

The MVP can launch with Taiwan, the United States, the United Kingdom, Japan, Australia, New Zealand, and Canada. Add the EU profile in the same data model if the page can explain its regional status without crowding the first screen.

## Information model

Use one source-linked registry. Store the bilingual labels in the same record so the Chinese and English versions cannot drift silently.

```ts
type InstitutionRole =
	| 'policy'
	| 'protected_areas'
	| 'protected_species'
	| 'fisheries'
	| 'pollution'
	| 'enforcement'
	| 'research'
	| 'public_reporting';

interface JurisdictionProfile {
	id: string;
	kind: 'country' | 'regional';
	name: { zh: string; en: string };
	mapPoint: { longitude: number; latitude: number };
	scopeNote: { zh: string; en: string };
	institutions: Array<{
		name: { zh: string; en: string };
		roles: InstitutionRole[];
		description: { zh: string; en: string };
		officialUrl: string;
	}>;
	sources: Array<{
		url: string;
		publisher: string;
		verifiedAt: string;
	}>;
}
```

The role list prevents the page from implying that all organisations perform the same work. `scopeNote` records federal, devolved, regional, or subject limits. `verifiedAt` makes stale profiles visible during review.

## Page structure

Use one short page with four parts:

1. A title and a two-sentence explanation of why responsibilities are divided.
2. A minimal static world map with one marker per jurisdiction.
3. A keyboard-accessible country list that mirrors the map markers.
4. A selected-jurisdiction panel with institutions, role labels, scope notes, official links, and the last verification date.

On mobile, place the country list before the map or allow horizontal country buttons above it. The page must remain useful if a reader cannot see or operate the SVG.

## Map approach

| Approach | Benefits | Costs | Verdict |
|---|---|---|---|
| Static SVG world outline with markers | Fits the current prerendered architecture, supports the existing visual tokens, works without JavaScript for the base content, and adds no runtime dependency | Requires committed simplified geometry and careful keyboard support | Recommended |
| Static image with HTML cards | Fastest to draw | The image and cards can drift, selection is harder to express, and accessibility is weaker | Reject |
| Leaflet or MapLibre | Supports pan, zoom, layers, and future geographic datasets | Adds runtime code and interaction that the introductory MVP does not need | Defer until the project has real spatial layers |

Generate a simplified Natural Earth world outline with the existing `d3-geo` build dependency. Commit the resulting SVG path data, as the Taiwan map already does. Do not ship `d3-geo`, map tiles, Leaflet, or MapLibre to the browser.

Use the existing quiet editorial design. The land can use a paper or slate fill on a navy background. Use amber only for the active marker. Do not add glow or pulse. The current design rules reserve the map glow for the Taiwan stranding visualisation.

## Proposed file ownership

| File | Responsibility |
|---|---|
| `education/src/lib/data/conservation-institutions.ts` | Typed bilingual jurisdiction and institution registry |
| `education/src/lib/data/world-geo.ts` | Generated world SVG path and dimensions |
| `education/scripts/generate-world-geo.mjs` | Reproducible Natural Earth conversion |
| `education/src/lib/components/maps/InstitutionWorldMap.svelte` | Static SVG, marker selection, and accessible labels |
| `education/src/lib/components/sections/institutions/InstitutionsPage.svelte` | Page composition and selected profile |
| `education/src/routes/institutions/+page.svelte` | Traditional Chinese route and SEO metadata |
| `education/src/routes/en/institutions/+page.svelte` | English route and SEO metadata |
| `education/src/lib/seo/routes.ts` | Canonical and language-alternate registration |

The navigation, sitemap, and route tests must include both routes. The institution registry should not live in `site.ts` and `site-en.ts`; source-linked profiles need one bilingual record and one verification date.

## Accessibility and interaction rules

- A reader can select every jurisdiction with a keyboard.
- The country list exposes the same selection as the map.
- The selected state uses text and an outline, not colour alone.
- Each official link names the institution and opens as a normal link.
- The page does not depend on hover.
- The map has a short accessible summary. The institution list contains the complete information.
- Small island countries remain discoverable through the list even when their land area is not visible at the chosen map scale.

## Content and governance risks

**Responsibilities change.** Store `verifiedAt` for every source and schedule a manual review every six months.

**Country-level labels can mislead.** Add scope notes for federal, state, devolved, overseas territory, and regional responsibilities.

**Political boundaries are sensitive.** Use a neutral Natural Earth outline. Do not use coloured territorial fills or make sovereignty claims. Markers identify profiles, not borders or legal jurisdiction.

**Emergency reporting differs from institutional education.** Do not place hotline or rescue instructions on this page unless an official profile has a clearly labelled reporting role. The existing Taiwan reporting content remains separate.

**Official pages do not grant media reuse automatically.** Use original copy and the project's own map. Do not copy agency logos, photographs, maps, or illustrations.

## Definition of done for the first implementation

- Seven country profiles use current official sources and include a verification date.
- Every country has at least one institution, one role, one scope note, and one official link.
- Traditional Chinese and English routes contain equivalent facts.
- The world map ships as static SVG with no new runtime dependency.
- The page works from the country list without map interaction.
- Keyboard focus, selected state, and reduced-motion behavior meet the existing site rules.
- Canonical links, language alternates, sitemap entries, and route tests pass.
- `npm run check:release` passes from `education/` under the project's supported Node version.

## Implementation order

1. Confirm the seven jurisdiction profiles and write the source-linked registry.
2. Generate and commit the world outline.
3. Build the non-interactive page with the complete country list and profile cards.
4. Add map selection as progressive enhancement.
5. Add navigation, SEO records, tests, and final bilingual review.

The first engineering slice should stop after the complete list and one selected profile render correctly. The map can then enhance an already usable page rather than owning access to the content.
