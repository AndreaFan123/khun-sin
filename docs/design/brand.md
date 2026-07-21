# Brand — Khun-Sin

**Status:** Accepted (decided 2026-07-21 with Andrea)
**Scope:** name, wordmark, and brand rules for the education site and the wider khun-sin project.

## Name

**Khun-Sin** (this spelling is final: capital K, capital S, hyphenated) — Taiwanese romanization of **鯤鯓**.

Why it works:

- **鯤** is the giant mythical fish of Zhuangzi's opening chapter; **鯤鯓** in Taiwanese place names (南鯤鯓, 青鯤鯓, the historical 一鯤鯓–七鯤鯓 sandbars of the Taijiang lagoon) means *a sandbar that looks like a whale's back rising from the sea* — literally "the whale's body as land."
- The name therefore already contains the project's central image: **Taiwan is a whale surfacing from the ocean**, and sandbars/shorelines are exactly where strandings happen — land meeting sea is both the brand name and the mission's site.
- It is unmistakably local (Taiwanese romanization) and cannot be confused with generic English SaaS naming. Former candidates (podline, cetamap, seasignal, strandwatch) are retired.
- Chinese characters (鯤鯓) are **not** part of the visual identity; the wordmark is Latin-only "Khun-Sin". The characters may appear in body copy when telling the name's story.

## Identity principle: wordmark only

There is **no graphic logo**. The identity is typographic. Explorations of a pictorial mark (Taiwan-as-whale, contour-line island, breaching whale containing the island) were run and deliberately set aside — a pure wordmark best matches the project's minimal, quiet-editorial design language.

The brand's **single color gesture**: the tittle (the dot of the "i" in "Sin") is amber. Nothing else in the identity carries accent color. This extends the design system's rule that amber is the one attention channel.

## Wordmark specification

| Property | Value |
|---|---|
| Text | `Khun-Sin` |
| Typeface | Noto Sans TC (same stack as the site: `"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", system-ui, sans-serif`) |
| Weight | 900 (Black) — updated 2026-07-22 from 500; nav size 1.3rem |
| Case | As written — no all-caps, no all-lowercase variants |
| Letter spacing | ~0.005em (near-default) |
| Tittle color | **Native glyph position, color swapped only.** Light surfaces: `amber-600 #C87F1F` (4.5:1 on paper-200 ✓). Dark surfaces: `amber-400 #FAB95B` (7.2:1 on navy-800/900 ✓) |
| Ink color | `navy-700 #1A3263` on light; `paper-50 #FBF9F6` on dark |

**Tittle implementation:** the dot must sit exactly where the typeface puts it — never manually offset.

- HTML/CSS: layered-glyph technique — an amber full `i` underneath, an ink dotless `ı` (U+0131) absolutely positioned on top at the same origin; the visible tittle is the font's own.
- SVG asset (final): convert the wordmark to outlines and fill the tittle path separately. Zero positional drift by construction.

**Small sizes:** below ~14px the amber tittle approaches invisibility; at those sizes use the plain single-color wordmark (no amber). The gesture is for masthead/hero/footer scale, not UI chrome.

## Favicon

Supplied by Andrea (out of design-doc scope). Format needs: 16×16, 32×32, and 180×180 (apple-touch-icon), placed in `education/static/`.

## Usage rules

- Do not add taglines, characters, or graphic devices to the wordmark lockup.
- Do not recolor the tittle with any color other than the specified amber steps; do not add a second accent anywhere in the identity.
- Do not set the wordmark in serif, condensed, or display faces. Weight is fixed at 900 (do not vary it per context).
- Clear space: minimum half the cap-height of "K" on all sides.
- The wordmark inherits the site's flat rule: no shadows, gradients, or outlines.

## Domain

Brand name decided → domain candidates to check: `khunsin.tw`, `khun-sin.tw` (see spec open questions). Repo name `khun-sin` already matches.
