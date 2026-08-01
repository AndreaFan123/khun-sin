# SEO & AEO Audit

**Date:** 2026-07-28
**Audited build:** v0.3.0 live at https://www.khun-sin.com
**Method:** raw HTML inspection of all four routes (`/`, `/learn`, `/en`, `/en/learn`), robots/sitemap probes, heading-tree extraction, Lighthouse (desktop + mobile).

## Summary

The site is technically excellent and almost entirely undiscoverable. Lighthouse performance is 100 on both desktop and mobile at 88 KiB, every route is prerendered static HTML, and the copy is genuinely useful — but **not one page carries a canonical URL, an hreflang pair, an Open Graph tag, or a line of structured data**, and every page (including the Chinese ones) declares `lang="en"`.

The gap that matters most is not ranking, it is **answerability**. The single most valuable thing this site knows — *call 118, and never drag a live dolphin back into the sea* — is the exact kind of fact a person types into a search box while standing on a beach, and the exact kind of fact an answer engine wants to quote. Today that knowledge is buried in prose with no machine-readable form, and the number `118` appears just twice in the home page's HTML.

## Why AEO is the priority, not classic SEO

The site has two audiences whose discovery paths differ:

- **The bystander on a beach** searches something like 「海豚擱淺 怎麼辦」 or "stranded dolphin Taiwan" under stress, and increasingly gets an AI-generated answer rather than ten blue links. To be *in* that answer, the response steps must be extractable — `HowTo` and `FAQPage` structured data, not paragraphs.
- **The curious reader** arrives through a shared link, most often on LINE, Threads or Facebook. That path is currently broken in a different way: shares render as blank cards (no Open Graph tags), which measurably suppresses click-through.

Both paths are cheap to fix and neither requires new content — only exposing what the site already says in the formats machines read.

## Findings

### P0 — Actively harming indexing

| # | Finding | Evidence | Impact |
|---|---|---|---|
| 1 | Every route declares `<html lang="en">`, including the two Chinese pages | `app.html` hardcodes it; all four live routes serve it | Google may classify the Chinese content as English, weakening Chinese-language ranking; screen readers pronounce Chinese with English phonetics (also an a11y defect) |
| 2 | No `hreflang` annotations | 0 occurrences on all four routes | Search engines don't know `/en` is the English version of `/`; the two locales compete for the same queries instead of reinforcing each other |
| 3 | No `sitemap.xml` | `GET /sitemap.xml` → 404; `robots.txt` contains no `Sitemap:` directive | Discovery relies entirely on crawling; new routes (species gallery, report form) will be found slowly |
| 4 | No canonical URLs | 0 occurrences on all four routes | `www` / non-`www` and trailing-slash variants can be treated as duplicates, splitting authority |

### P1 — Distribution and answer-engine visibility

| # | Finding | Evidence | Impact |
|---|---|---|---|
| 5 | No Open Graph or Twitter Card tags | 0 `og:` occurrences on all four routes | Every share on LINE / Facebook / Threads / Slack renders a blank card. This is the site's primary distribution channel — a visitor donated to the NCKU center after being shown the site, and that path starts with a share |
| 6 | No structured data (JSON-LD) of any kind | 0 `application/ld+json` occurrences | The site is invisible to rich results and to answer engines that rely on structured extraction. See the schema plan below |
| 7 | `/learn` and `/en/learn` have no `<h1>` | Heading tree starts at `h2` (`SectionHead` always renders `h2`) | Weak topical signal; assistive tech loses the page-level landmark |
| 8 | No `llms.txt` | Not present | Emerging convention for declaring site purpose and canonical content to AI crawlers; one file, no downside |

### P2 — Content legibility for non-JS crawlers

| # | Finding | Evidence | Impact |
|---|---|---|---|
| 9 | Chart data never reaches the static HTML | The five `chart-host` divs are empty in the prerendered output; charts draw client-side on intersection | Googlebot renders JS and will see them, but **GPTBot, ClaudeBot and PerplexityBot generally do not**. The county/species/month numbers — the site's most citable material — are invisible to answer engines except where a takeaway paragraph happens to mention them |
| 10 | Titles lead with the brand | `Khun-Sin · 台灣鯨豚擱淺通報與數據` | Early words carry more weight; the query-matching phrase should come first, brand last |

Finding 9 resolves itself in Sprint 2: rewriting the charts as declarative Svelte components (#8–#10) puts the SVG — labels, values and all — into the prerendered HTML. It should not be patched separately.

## Structured data plan (the AEO core)

The site's existing content maps onto four schemas with no new writing required. All of it is already typed data in `lib/data/`, so the JSON-LD can be **generated from the same source as the visible copy** — no risk of the two drifting apart.

| Schema | Source data | What it unlocks |
|---|---|---|
| `HowTo` | `reportSteps` + `hotline` | Step-by-step rendering for 「鯨豚擱淺怎麼辦」 / "what to do stranded dolphin Taiwan"; the highest-value answer this site can give |
| `FAQPage` | `doList` / `dontList`, phrased as questions | The format answer engines quote most readily; carries the safety-critical "never push it back into the sea" warning |
| `Dataset` | `strandings.ts` totals and breakdowns, with MARN attribution and temporal coverage | Discoverability for researchers and data-oriented queries; establishes the site as a data source rather than a blog |
| `Organization` + `WebSite` | Brand identity, the 鯤鯓 story, MARN sourcing | Entity recognition — lets engines understand *who* Khun-Sin is and attribute claims to it |

Two authoring rules for this project:

1. **Never assert in JSON-LD what the page does not show.** Structured data that outruns visible content is a manual-action risk and, more importantly here, a credibility risk for safety information.
2. **Generate from `site.ts` / `site-en.ts`**, never hand-write parallel copy. The bilingual mirror rule applies equally to schema.

## Remediation plan

One PR covers P0 and P1; the mechanism is shared, so splitting them costs more than it saves.

1. **`<SEO>` component** taking `title`, `description`, `path`, `locale`, and optional `schema`. Emits title, description, canonical, both `hreflang` pairs plus `x-default`, the full Open Graph and Twitter Card set, and any JSON-LD. Each route passes props; nothing is hand-written per page.
2. **Per-locale `lang`** via a `handle` hook rewriting the `<html>` tag (`zh-Hant-TW` / `en`). This also closes the a11y gap recorded in the architecture doc.
3. **`sitemap.xml`** as a prerendered endpoint enumerating the four routes with their `hreflang` alternates; add the `Sitemap:` directive to `robots.txt`.
4. **`h1` on both learn routes** — give `SectionHead` an `as` prop so the first section head renders `h1`.
5. **Schema builders** in `lib/seo/` generating the four schemas from the copy modules.
6. **`llms.txt`** stating what the site is, the 118 fact, the data source and licence, and the canonical routes.
7. **Title reordering**: query phrase first, brand last (e.g. `台灣鯨豚擱淺通報與數據 · Khun-Sin`).

## Open Graph assets

Supplied by Andrea 2026-07-28 at `src/lib/assets/khun-Sin-OG-image/`: `og-image-zh.png` and `og-image-en.png`, both 1200×630 (correct specification), on-brand, and — correctly — leading with the action (「發現擱淺鯨豚，請立刻撥打 118」 / "Found a stranded whale or dolphin? Call 118") rather than the brand name.

**Two issues found; redesign in progress (Andrea, 2026-07-28):**

- **The wordmark is misspelled.** Both images render `Khun-Siın` — an extra dotless `ı`. The layered-glyph technique from [brand.md](../design/brand.md) (an amber `i` beneath an ink dotless `ı`) did not collapse during export, so both glyphs sit side by side and the amber tittle is lost to white. The share card is the most-viewed instance of the wordmark. **Export rule for the future: rasterize the wordmark from the outlined-SVG form specified in brand.md, never from the HTML layering technique.**
- **File size**: ~500 KB each. These are decorative crawler-facing assets; compressing to under 150 KB costs nothing visually and keeps crawl budget lean.

The redesign does not block the SEO work: the meta tags reference a fixed asset path, so corrected images are a file swap with no code change.

## Acceptance criteria

- [ ] All four routes serve the correct `lang` (`zh-Hant-TW` on `/` and `/learn`, `en` on the mirrors)
- [ ] Each route carries a self-referencing canonical plus `hreflang` alternates including `x-default`
- [ ] Share previews render correctly in the Facebook Sharing Debugger and LINE
- [ ] `HowTo` and `FAQPage` validate in Google's Rich Results Test with no warnings
- [ ] `sitemap.xml` returns 200, lists four URLs with alternates, and is referenced from `robots.txt`
- [ ] Both learn routes have exactly one `h1`
- [ ] Lighthouse SEO ≥ 95 on all four routes, performance unchanged at 100

## Out of scope, revisit later

- **Chart data in static HTML** — folded into Sprint 2's declarative chart rewrite (#8–#10), not patched separately.
- **Analytics** (#21) — still undecided; without it, none of the above can be measured beyond Search Console impressions. Worth reconsidering now that discoverability work is starting: a privacy-preserving counter would tell us whether the 118 content is actually being found.
- **Species gallery schema** — when `/species/[slug]` ships, each page is a natural `Article` with an image; design the schema then, not now.
