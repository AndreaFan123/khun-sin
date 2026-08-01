# Khun-Sin

Cetacean stranding reporting and official data for Taiwan. The project presents
figures published by the Ocean Conservation Administration; it does not collect
or own them. Two apps share this vocabulary: the public `education/` site, and
the `report/` system planned in ADR-003.

## Language

**Stranding**:
A whale, dolphin or porpoise coming ashore — alive or dead — through injury,
illness, disorientation or a vessel strike.
_Avoid_: beaching, washup

**Period**:
The span one published report covers, either a full year or a single quarter.
Every figure in the data layer is keyed by one; annual periods simply omit the
quarter.
_Avoid_: year, timeframe, range

**Temporal coverage**:
Which periods the figures describe — 2019 through 2026 today. Always derived
from the data, never stated separately.
_Avoid_: date range, data span

**Data currency**:
How up to date the figures are: when they were last reconciled against the
published reports, and which report is the most recent one included. Distinct
from temporal coverage — a dataset can cover 2019–2026 and still be a year
stale. Currency is the part a reader needs in order to trust the numbers.
_Avoid_: freshness, last updated, changelog

**MARN**:
The Ocean Conservation Administration's Marine Animal Rescue Network — the
source of every stranding figure on the site, and the network a 118 call
activates.
_Avoid_: the rescue network, OCA data

**Locale mirror**:
The rule that `site-en.ts` carries an English counterpart for every export in
`site.ts`, so the two pages say the same thing. Copy that lives anywhere else
drifts silently.
_Avoid_: translation file, i18n bundle
