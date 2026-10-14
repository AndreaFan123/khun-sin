# Testing

Test strategy and acceptance checklists.

- Education-site migration acceptance (see ADR-001 action items): Lighthouse comparison against the single-file version (no performance regression), RWD breakpoint behavior, identical chart tooltips and animations.

## Education release checks

Run from `education/` with Node.js 24 (Node.js 22.18+ also supports the TypeScript checker):

```sh
npm run check:release
```

This runs formatting/lint, Svelte type checks, unit tests and a production build.
`npm run build` also runs `check:seo` against the generated HTML: unique titles,
descriptions, H1 and main content, canonical URLs, reciprocal language alternates,
JSON-LD, Dataset placement on `/data` and `/en/data` only, sitemap completeness,
robots rules and crawlable internal links. A new rendered page omitted from the
public route table also fails the check. No dependency or Google credential is needed.

The `Education release checks` GitHub Actions workflow runs on education PRs,
pushes to `develop`/`main`, and manual dispatch. Required status checks and Vercel
deployment settings remain separate repository/platform settings; the workflow
file alone does not configure branch protection or prevent every custom deployment path.

After deployment, run the read-only production check:

```sh
npm run check:seo:live
```

It checks the production origin configured in `src/lib/seo/routes.ts`, including
HTTP status, content types and `X-Robots-Tag`. It uses ordinary HTTP requests,
not Googlebot; it cannot confirm Google indexing, DNS ownership or Search Console
sitemap processing. Use Search Console for those checks. Keep the local
`local-playbooks/google-indexing-and-dns.md` for the operational procedure when available.
