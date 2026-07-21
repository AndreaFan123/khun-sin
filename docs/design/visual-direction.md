# Visual Direction — Education Site

**Status:** Accepted (palette & direction decided 2026-07-21 with Andrea)
**Applies to:** the SvelteKit rebuild (`education/`); tokens are designed to be promoted to `shared/` for the report system later (ADR-002).

## Direction: quiet editorial

The subject — strandings, death, rescue — is heavy. The visual language stays restrained and lets typography, a disciplined palette, and the data itself carry the page:

- **No pictograms.** All emoji removed (species cards, threat cards, network nodes, do/don't lists). No icon set replaces them for now; cards are carried by type hierarchy and semantic color (left-border bands, tags).
- **One typeface, everywhere.** The whole site — headings, body, wordmark — uses the Noto Sans TC stack (`"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", system-ui, sans-serif`). No webfont is downloaded at all: zero font bytes, zero external requests. Accepted trade-off: minor glyph differences across platforms when Noto Sans TC isn't installed (Windows falls back to Microsoft JhengHei). Serif headings were considered and dropped. Brand wordmark rules live in [brand.md](brand.md).
- **Flat, minimal surfaces — no shadows anywhere.** Cards are distinguished purely by a half-step lighter surface (`paper-100` on `paper-200`) and a hairline border (`paper-300`); on dark bands, by a slightly lighter navy or a hairline of translucent white. `box-shadow` does not appear in the rebuilt CSS. Depth comes from the light/dark band rhythm, not from simulated elevation.
- **The species gallery** (future route, see spec P2) is where photographic/media richness will live; the main page stays editorial.

## Palette

Brand seed (chosen from Andrea's options — "option 1"): `#1A3263` / `#547792` / `#FAB95B` / `#E8E2DB`. The old mint-green + coral scheme is retired entirely.

### Semantic rules (more important than any hex)

1. **Amber is the single attention channel — "look here".** Outlying-island hotspots, live-stranding counts, hero numbers, map dots. One emphasis color, used sparingly, replaces the old two-channel orange/green system.
2. **Baseline and mortality data wear slate.** No warm color for death counts — the weight is carried by copy, not colorized.
3. **High saturation only at small area.** Large fills are always low-saturation (navy bands, paper surfaces); saturated amber appears only in small elements. (This is also a primary "de-AI-look" lever.)
4. **Amber-400 is never text on light surfaces** (1.4:1). Text that needs an amber feel on light uses `amber-800`.

### Ramps

**Navy** — structure: dark bands, headings, depth

| Token | Hex | | Token | Hex |
|---|---|---|---|---|
| navy-50 | `#E9EDF5` | | navy-500 | `#3A548A` |
| navy-100 | `#CBD5E8` | | navy-600 | `#274073` |
| navy-200 | `#A3B4D4` | | **navy-700** | **`#1A3263`** (seed) |
| navy-300 | `#7B93BF` | | navy-800 | `#142850` |
| navy-400 | `#5372A5` | | navy-900 | `#101F3D` |

**Slate** — data: chart series, borders, secondary text

| Token | Hex | | Token | Hex |
|---|---|---|---|---|
| slate-50 | `#EEF2F5` | | slate-500 | **`#547792`** (seed) |
| slate-100 | `#D8E1E8` | | slate-600 | `#476885` |
| slate-200 | `#C9D6E0` | | slate-700 | `#3D5A75` |
| slate-300 | `#A7BCCB` | | slate-800 | `#2F4760` |
| slate-400 | `#8FA9BD` | | slate-900 | `#27415C` |

**Amber** — emphasis: the only warm family

| Token | Hex | | Token | Hex |
|---|---|---|---|---|
| amber-50 | `#FEF4E4` | | amber-500 | `#E89E36` |
| amber-100 | `#FDE6C2` | | amber-600 | `#C87F1F` |
| amber-200 | `#FCD79E` | | amber-700 | `#A66618` |
| amber-300 | `#FBC87C` | | amber-800 | `#8A5A13` |
| **amber-400** | **`#FAB95B`** (seed) | | amber-900 | `#6B4109` |

**Paper** — warm neutrals: surfaces and ink

| Token | Hex | | Token | Hex |
|---|---|---|---|---|
| paper-50 | `#FBF9F6` | | paper-500 | `#948A7C` |
| paper-100 | `#F6F2EC` (card) | | paper-600 | `#6F675C` |
| **paper-200** | **`#E8E2DB`** (seed, page bg) | | paper-700 | `#4F4A42` |
| paper-300 | `#D6CEC3` | | paper-800 | `#35322C` |
| paper-400 | `#B8AEA1` | | paper-900 | `#211F1B` (body ink) |

**Status** — functional, small-area only, never brand

| Token | Hex | Use |
|---|---|---|
| green-100 | `#DFEAE3` | "do" list tint |
| green-600 | `#3E6B54` | "do" accents, success text (4.7:1 on paper-200 ✓) |
| green-800 | `#274437` | dark-surface success text |
| rust-100 | `#F6E3D3` | "don't" list tint |
| rust-600 | `#B25E1F` | "don't" accents, large text only (3.6:1) |
| rust-700 | `#8F4A15` | "don't" body text (5.2:1 on paper-200 ✓) |
| rust-800 | `#7A3F13` | dark accents |

No red family: "don't/danger" derives from the amber family (burnt rust) to keep the page's temperature coherent.

### Usage mapping (CSS custom properties in `app.css`)

| Variable | Token | Notes |
|---|---|---|
| `--bg` | paper-200 | page background |
| `--bg-card` | paper-100 | cards; separation via surface step + border, never shadow |
| `--border` | paper-300 | hairline card/divider border on light (1px) |
| `--border-on-dark` | `rgba(251,249,246,.16)` | hairline on navy bands (paper-50 at 16%) |
| `--bg-band-dark` | navy-800 → navy-900 | dark sections; hero uses navy-900 |
| `--text-primary` | paper-900 | body ink on light |
| `--text-secondary` | slate-700 | 5.5:1 on paper-200 ✓ |
| `--text-muted` | paper-600 | captions, ticks (large/graphic use) |
| `--text-on-dark` | paper-50 | body on navy bands |
| `--text-on-dark-secondary` | slate-200 | secondary on navy bands |
| `--heading` | navy-700 | serif headings on light |
| `--accent` | amber-400 | emphasis on dark; fills on light |
| `--accent-text` | amber-800 | amber-feel text on light (4.6:1 ✓) |
| `--chart-baseline` | slate-500 | default series |
| `--chart-emphasis` | amber-400 | hotspot/highlight series |
| `--chart-sequence` | slate-200 → 400 → 500 → 700 → 900 | single-hue magnitude ramp |
| `--chart-muted` | slate-300 | de-emphasized series (deceased) |

## Accessibility — hard rules

Verified pairs (WCAG 2.1, computed):

| Pair | Ratio | Verdict |
|---|---|---|
| paper-900 on paper-200 | ~12:1 | AAA body |
| navy-700 on paper-200 | 9.6:1 | AAA headings |
| slate-700 on paper-200 | 5.5:1 | AA body ✓ |
| amber-400 on navy-800/900 | ≥7.2:1 | AA ✓ |
| amber-800 on paper-200 | 4.6:1 | AA body ✓ |
| slate-500 on paper-100 | 4.1:1 | graphics ≥3:1 ✓ (not for body text) |
| amber-400 on paper-* | ~1.4:1 | **forbidden as text** |
| rust-600 on paper-200 | 3.6:1 | large text only; body uses rust-700 |

Rules:

1. Every text pair ≥ 4.5:1 (AA); large text (≥24px / ≥19px bold) and meaningful graphics ≥ 3:1. Any new pair gets computed before use.
2. Base font size 16px. Minimums raised from the current page: footer 13px → 14px, chart ticks 11px → 12px. Line-height ≥ 1.6 body.
3. Information never encoded by color alone — charts keep text value labels; map dots get text/tooltip equivalents.
4. `prefers-reduced-motion` disables reveal, pulse, and canvas animations (per architecture doc).
5. Visible `:focus-visible` styles on all interactive elements, styled with `--accent` on dark and `navy-700` on light.

## Typography

One family for everything — the Noto Sans TC stack; hierarchy comes from size, weight, and color, not from mixing faces:

| Role | Face | Size | Notes |
|---|---|---|---|
| H1 (hero) | Noto Sans TC stack, 700 | clamp(2.3rem–4.4rem) | |
| H2/H3 | Noto Sans TC stack, 600–700 | existing clamp scale | |
| Body | Noto Sans TC stack, 400 | 16–17px | line-height ≥ 1.6 |
| Data numbers | 700–800, tabular-nums | — | hero stats, KPI, chart values |
| Captions/ticks | 400–500 | ≥12px | raised minimums |
| Brand wordmark | 500 | see [brand.md](brand.md) | amber tittle at native glyph position |

Font loading: **none** — the stack resolves to installed system fonts (`"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", system-ui, sans-serif`). Zero font bytes shipped.

## Intended differences from the current page

The rebuild is *not* pixel-parity; these deltas are deliberate (spec P0-2):

1. Emoji/pictograms removed everywhere.
2. Unified sans typography (Noto Sans TC stack, no webfont); Khun-Sin wordmark with amber tittle in the masthead/footer (see [brand.md](brand.md)).
3. New palette (this document) replacing mint/coral/tropical-teal.
4. Contrast bug fixed: white cards inside dark bands (MARN nodes, steps) get explicit dark text.
5. Shadows removed entirely — flat surfaces with hairline borders (minimalist direction).
6. Minimum font sizes raised (footer, ticks).
