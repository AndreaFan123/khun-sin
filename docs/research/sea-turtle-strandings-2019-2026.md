# Sea turtle strandings 2019–2026 — source compilation

Compiled 2026-09-10 from the Ocean Conservation Administration (MARN) stranding
reports. This is a research note, not a data layer: nothing here is wired into
the site yet. Figures are transcribed from the published reports — annual report
text and, where a figure exists only as a chart image, read off that chart.

Scope note: the site's `Stranding` term currently covers cetaceans only. Adding
turtles widens the domain and needs an ADR before any code lands.

## Annual totals

| Year | Total | Dead | Live | Source |
|---|---|---|---|---|
| 2019 | 269 | 207 | 62 | 2019 annual, p.12 |
| 2020 | 335 | 276 | 59 | 2020 annual, p.9 |
| 2021 | 359 | 289 | 70 | 2021 annual, p.8 |
| 2022 | 315 | 240 | 75 | 2022 annual, p.8 |
| 2023 | 321 | 248 | 73 | 2023 annual, p.8 |
| 2024 | 325 | 237 | 88 | 2024 annual, p.11 |
| 2025 | 330 | 197 | 133 | 2025 annual, p.11 |

The 2023 and 2024 annual reports both carry a five-year bar chart that agrees
with this series exactly, so the totals are cross-confirmed by two independent
publications.

The live share is the story: flat at 18–24% from 2019 to 2023, then 27% in 2024
and 40% in 2025. The 2025 report attributes the jump to pound-net (定置網)
bycatch reporting — 76 individuals reported that way in 2025.

## Quarterly totals (2026)

| Period | Total | Dead | Live | Species | Source |
|---|---|---|---|---|---|
| 2026 Q1 | 132 | 81 | 51 | — | 2026 Q1, p.8 |
| 2026 Q2 | 140 | 71 | 69 | 5 | 2026 Q2, p.9 |

2026 Q2 is the highest Q2 of the last five years; the report again names pound-net
live reporting as the driver.

Earlier quarterly turtle figures found so far: 2022 Q2 = 74 (61 dead / 13 live,
4 species), 2022 Q3 = 63 (42 / 21, 3 species), 2025 Q2 = 82 (3 species),
2025 Q3 = 37 (27 / 10). The remaining quarters are listed under Gaps.

## Species split

| Year | Green | Hawksbill | Olive ridley | Loggerhead | Leatherback | Unidentified |
|---|---|---|---|---|---|---|
| 2019 | 240 | 13 | 8 | 8 | 0 | — |
| 2021 | ~292 | ~34 | ~24 | ~1 | — | ~1 |
| 2023 | 257 | 27 | 22 | 11 | 3 | 1 |
| 2024 | 252 | 34 | 30 | 8 | — | 1 |
| 2025 | 259 | 27 | 39 | 5 | — | — |
| 2026 Q2 | 113 | — | — | — | — | — |

Green turtle is 78–95% of every year on record. 2021 values are read off a bar
chart and are approximate; 2024's split is dead/live stacked (green 189/63,
hawksbill 25/9, olive ridley 14/16, loggerhead 8/0). 2025 splits: green 158/101,
olive ridley 19/20, hawksbill 18/9, loggerhead 2/3.

## County distribution (top counties)

- **2019**: New Taipei 55, Taitung 45, Penghu 39, Pingtung 38
- **2020**: New Taipei 84, Pingtung 75, Taitung 50, Penghu 50, Yilan 22
- **2021**: Penghu 89, New Taipei 85, Taitung 48, Yilan 37, Pingtung 30
- **2022**: Penghu 78, Taitung 63, New Taipei 46
- **2023**: Penghu 72, New Taipei 51, Yilan 51, Taitung 49, Pingtung 40
- **2024**: Yilan 66, Taitung 58, Penghu 55, New Taipei 51, Pingtung 36
- **2025**: Yilan 76, Penghu 58, Taitung 57
- **2026 Q2**: Yilan 45, Taitung 24, Pingtung 20 (63.6% of the quarter)

Note the shift: New Taipei and Penghu led 2019–2023; Yilan takes the top spot
from 2024 onward, tracking the rise in pound-net reporting.

## Stranding cause / source

Taxonomy is stable from 2024 onward and comparable across those years.

| Cause | 2024 | 2025 |
|---|---|---|
| Coastal stranding 岸際擱淺 | 211 (65%) | 196 (59.4%) |
| Bycatch 混獲 | 54 (17%) | 90 (27.3%) |
| Adrift 漂流 | 44 (13%) | 34 (10.3%) |
| Derelict net entanglement | 12 (4%) | 2 (0.6%) |
| Other | 4 (1%) | 8 (2.4%) |

Earlier years use a live-only taxonomy that is **not** comparable: 2019 live
reports were bycatch 47%, stranding 21%, derelict net 11%, adrift 10%, other 8%,
hook 3%. 2022 live: bycatch 34%, stranding 28%, adrift 17%, derelict net 12%.
2023 live: bycatch 48%, coastal 18%, derelict net 15%, adrift 14%, artificial
structure 5%.

## Necropsy and cause of death

- **2019**: 31 of 213 dead examined — parasitic infection 25.8%, propeller trauma 22.6%, suspected strike 12.9%, suspected bycatch 6.5%, drowning 6.5%
- **2022**: 41 necropsied — spirorchiid blood fluke 56%, digestive system 34.1%, malnutrition 24.3%
- **2023**: 25 necropsied — infection 40%, carapace fracture + foreign body 28%, non-infectious 16%, unknown 16%; 17 of 25 (68%) had ingested artificial material
- **2024**: 17 necropsied — infection 10 (58.8%), carapace fracture + foreign body 4 (23.5%), unknown 3 (17.6%)
- **2025**: 19 necropsied — systemic/parasitic infection 37%, physiological 26%, internal trauma 16%, unknown 21%
- **2026 Q2**: 7 necropsied by the National Museum of Marine Biology & Aquarium

Spirorchiid blood fluke infection is the single most consistent finding across
every year with necropsy data.

## Marine debris ingestion

- **2020**: 75 individuals sampled, artificial material in 70 (94.5%); plastic line 26%, soft/hard plastic 21% each, styrofoam 16%
- **2023**: 47 sampled, 32 positive; cord/line 48%, plastic film 26%, plastic fragments 12%
- **2024**: 8 in faeces, 9 in full-gut sampling
- **2025**: artificial material found in necropsy digestive tracts (8) and in the faeces of turtles in care (13)

## Release and care

- **2020**: 37 released on site, 22 into care, 7 released after care
- **2021**: 16 released on site or relocated, 38 into care, 14 released after care
- **2022**: 19 released on site, 48 released after care (includes prior years)
- **2024**: 49 released on site or relocated, of which 45 were pound-net bycatch
- **2025**: 80 released on site or relocated, 36 released after care; 116 released in total; 22 still in care at year end
- **2026 Q2**: 22 newly into care, 15 released after care, 8 died in care; pound-net reports 45, of which 44 were assessed, tagged and released

Care facilities named across reports: National Museum of Marine Biology &
Aquarium (aquaculture research centre), Penghu Sea Turtle Rescue & Conservation
Centre, Marine Conservation Species Conservation & Education Centre, Taoyuan Sea
Turtle Conservation & Rescue Centre, Farglory Ocean Park, Xpark.

## Gaps

1. **2020 and 2022 species splits** are not in the extracted text; they exist as chart images and still need reading off.
2. **Quarterly turtle figures before 2022** and several quarters in 2023–2024 are missing. Some of those PDFs (2020 Q3, 2021 Q2, 2021 Q3, 2022 Q1) have no extractable text at all — they are image-only and need page-by-page reading.
3. **No Q4 reports exist** in any year; the annual report covers the year.
4. **Month distributions** are recorded for 2021, 2023, 2024 and 2025 but not consistently elsewhere.
5. **Cause taxonomy changes in 2024**, so a cause chart cannot span the full range without either restricting to 2024+ or collapsing categories.
6. **2019 predates the modern report format** and reports both 213 dead individuals and 207 dead strandings — the difference is 4 live strandings that died immediately plus 2 that died in care. Pick one definition before charting.

## Sources

All PDFs published by the Ocean Conservation Administration, Ocean Affairs
Council, under 海保救援網 (MARN):
<https://www.oca.gov.tw/ch/home.jsp?id=379&parentpath=0,296,375>
