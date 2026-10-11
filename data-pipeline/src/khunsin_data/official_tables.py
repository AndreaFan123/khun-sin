from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path

from pypdf import PdfReader

from .manifest import DocumentFamily, ManifestEntry
from .observations import Observation, ObservationKey, SourceAuthority


@dataclass(frozen=True)
class OfficialTotals:
    stranding_count: int
    live_count: int
    dead_count: int
    report_count: int | None = None


def parse_official_totals(layout_text: str) -> OfficialTotals:
    lines = layout_text.splitlines()
    total_index, total_line = _find_total_line(lines)
    header = "".join(lines[:total_index]).replace(" ", "").replace("\u3000", "")
    values = [int(value) for value in re.findall(r"\d+", total_line)]

    has_report_count = "通報" in header and "件數" in header
    required_values = 4 if has_report_count else 3
    if len(values) < required_values:
        raise ValueError(f"Total row has {len(values)} values; expected at least {required_values}")

    if has_report_count:
        report_count, stranding_count, live_count, dead_count = values[:4]
    else:
        report_count = None
        stranding_count, live_count, dead_count = values[:3]

    if live_count + dead_count != stranding_count:
        raise ValueError(
            "Official total does not reconcile: live and dead counts "
            f"({live_count} + {dead_count}) do not equal stranding count ({stranding_count})"
        )

    return OfficialTotals(
        report_count=report_count,
        stranding_count=stranding_count,
        live_count=live_count,
        dead_count=dead_count,
    )


def extract_official_totals_from_pdf(path: str | Path) -> OfficialTotals:
    reader = PdfReader(Path(path))
    if len(reader.pages) != 1:
        raise ValueError(f"Official statistical table must have one page, found {len(reader.pages)}")
    text = reader.pages[0].extract_text(extraction_mode="layout") or ""
    return parse_official_totals(text)


def observations_from_official_totals(
    entry: ManifestEntry, totals: OfficialTotals
) -> list[Observation]:
    if entry.document_family is not DocumentFamily.OFFICIAL_STATISTICAL_TABLE:
        raise ValueError("Observations require an official statistical table manifest entry")
    if entry.reporting_period is None:
        raise ValueError("Observations require a reporting period")
    if len(entry.animal_groups) != 1:
        raise ValueError("Official statistical tables must identify exactly one animal group")

    metric_values = {
        "stranding_count": totals.stranding_count,
        "live_count": totals.live_count,
        "dead_count": totals.dead_count,
    }
    if totals.report_count is not None:
        metric_values = {"report_count": totals.report_count, **metric_values}

    period = entry.reporting_period
    return [
        Observation(
            key=ObservationKey(
                year=period.year,
                quarter=period.quarter,
                animal_group=entry.animal_groups[0],
                metric=metric,
                dimension_type="total",
                dimension_key="all",
            ),
            source_id=entry.source_id,
            source_page=1,
            value=value,
            authority=SourceAuthority.OFFICIAL_STATISTICAL_TABLE,
        )
        for metric, value in metric_values.items()
    ]


def _find_total_line(lines: list[str]) -> tuple[int, str]:
    for index, line in enumerate(lines):
        if re.search(r"總[\s\u3000]*計", line) and re.search(r"\d", line):
            return index, line
    raise ValueError("Could not find a numeric total row")
