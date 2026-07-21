# Lighthouse Baseline — Sprint 3 Gate Reference

**Date:** 2026-07-21 · Lighthouse via `npx lighthouse`, Chrome headless, default (mobile) config.

## Legacy single-file page (the P0-7 baseline)

Measured on `http://localhost:8137/index.html` (served locally — no network latency in the score):

| Category | Score |
|---|---|
| Performance | 100 |
| Accessibility | 97 |
| Best practices | 96 |
| SEO | 90 |

## Rebuilt site at Sprint 0 (reference point, not a gate)

Measured on `https://khun-sin.vercel.app` (placeholder pages only):

| Category | Score |
|---|---|
| Performance | 93 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |

## Methodology note for the Sprint 3 gate

The two rows above are **not** apples-to-apples: legacy was measured on localhost, the rebuild over the network. For the P0-7 acceptance run, measure **both** the same way — serve the legacy page and compare against the deployed URL in the same session, or use PageSpeed Insights for both. Gate: rebuilt site ≥ 95 on performance/a11y/SEO **and** ≥ legacy on all categories.

Reproduce:

```bash
python3 -m http.server 8137   # repo root, serves legacy index.html
npx lighthouse http://localhost:8137/index.html --chrome-flags="--headless=new" \
  --only-categories=performance,accessibility,seo,best-practices --output=json
npx lighthouse https://khun-sin.vercel.app --chrome-flags="--headless=new" \
  --only-categories=performance,accessibility,seo,best-practices --output=json
```
