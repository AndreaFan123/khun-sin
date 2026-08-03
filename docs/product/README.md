# Product

Vision, requirements, roadmap, user research.

- [專案筆記.md](專案筆記.md) — overall project context (personal notes, Chinese), with an English counterpart at [project-notes.md](project-notes.md). Both are dated working notes; the English version carries a status note listing what has shipped since.

## Which pairs of files must stay in step

Two pairs of files in this project exist in both languages, and they are governed
by opposite rules. Confusing them costs either correctness or time.

**Product copy — `education/src/lib/data/site.ts` and `site-en.ts` — must mirror
exactly.** They are what the two versions of the site say to readers, so a change
to one is incomplete until it is made in the other. Only object exports are
structurally type-checked; a bare `const someString = '…'` will not be caught, so
annotate scalars as `: string`.

**Project notes — `專案筆記.md` and `project-notes.md` — deliberately need not.**
The Chinese file is Andrea's own thinking as it happened; the English one makes
that legible to others. Update the English version when the direction genuinely
changes, not for every edit — and let them diverge in the small stuff rather than
paying a translation tax on a scratchpad. When they drift far enough to mislead,
add to the English file's status note rather than rewriting history.
- [Education Site Rebuild Spec](education-site-rebuild-spec.md) — PRD for the SvelteKit rebuild: goals, P0/P1/P2 requirements, acceptance criteria, phasing. Grounded in ADR-001/002 and the frontend architecture.
