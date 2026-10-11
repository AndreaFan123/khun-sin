from __future__ import annotations

import re
import unicodedata
from dataclasses import dataclass
from pathlib import Path
from typing import Sequence

from pypdf import PdfReader

from .manifest import DocumentFamily, ManifestEntry
from .observations import Observation, ObservationKey, SourceAuthority


@dataclass(frozen=True)
class MarnCetaceanTotals:
    source_page: int
    stranding_count: int
    dead_count: int
    live_count: int
    report_count: int | None = None
    live_stranding_count: int | None = None
    navigation_count: int | None = None


_DETAILED_2019 = re.compile(
    r"2019年共發生(?P<reports>\d+)起\((?P<total>\d+)隻\)鯨豚通報"
    r".*?(?P<dead>\d+)隻死亡擱淺"
    r".*?(?P<live_stranding>\d+)隻活體擱淺"
    r".*?(?P<navigation>\d+)隻迷航"
)

_STANDARD_PATTERNS = (
    re.compile(
        r"(?P<year>20\d{2})年(?:台灣|臺灣)通報鯨豚擱淺數量(?:總計)?"
        r"(?P<total>\d+)隻.*?死亡(?P<dead>\d+)隻.*?活體(?P<live>\d+)隻"
    ),
    re.compile(
        r"(?P<year>20\d{2})年.*?共處理(?P<total>\d+)隻鯨豚擱淺通報"
        r"\((?P<dead>\d+)隻死亡擱淺,(?P<live>\d+)隻活體擱淺\)"
    ),
    re.compile(
        r"(?P<year>20\d{2})年擱淺的?(?P<total>\d+)隻鯨豚"
        r"\((?P<dead>\d+)隻死亡(?:擱淺)?,(?P<live>\d+)隻活體(?:擱淺)?\)"
    ),
)


def parse_marn_cetacean_annual_pages(
    page_texts: Sequence[str], *, year: int
) -> MarnCetaceanTotals:
    for page_number, page_text in enumerate(page_texts, start=1):
        compact = _normalize(page_text)

        detailed = _DETAILED_2019.search(compact)
        if detailed and year == 2019:
            total = int(detailed.group("total"))
            dead = int(detailed.group("dead"))
            live_stranding = int(detailed.group("live_stranding"))
            navigation = int(detailed.group("navigation"))
            live = live_stranding + navigation
            _require_reconciled(total, dead, live)
            return MarnCetaceanTotals(
                source_page=page_number,
                report_count=int(detailed.group("reports")),
                stranding_count=total,
                dead_count=dead,
                live_count=live,
                live_stranding_count=live_stranding,
                navigation_count=navigation,
            )

        for pattern in _STANDARD_PATTERNS:
            match = pattern.search(compact)
            if not match or int(match.group("year")) != year:
                continue
            total = int(match.group("total"))
            dead = int(match.group("dead"))
            live = int(match.group("live"))
            _require_reconciled(total, dead, live)
            return MarnCetaceanTotals(
                source_page=page_number,
                stranding_count=total,
                dead_count=dead,
                live_count=live,
            )

    raise ValueError(f"Could not find a supported {year} cetacean annual summary")


def extract_marn_cetacean_annual_from_pdf(
    path: str | Path, *, year: int
) -> MarnCetaceanTotals:
    reader = PdfReader(Path(path))
    page_texts = [page.extract_text() or "" for page in reader.pages]
    return parse_marn_cetacean_annual_pages(page_texts, year=year)


def observations_from_marn_cetacean_totals(
    entry: ManifestEntry, totals: MarnCetaceanTotals
) -> list[Observation]:
    if entry.document_family is not DocumentFamily.MARN_NARRATIVE_REPORT:
        raise ValueError("Observations require a MARN narrative report manifest entry")
    if entry.reporting_period is None or entry.reporting_period.period_type != "annual":
        raise ValueError("MARN annual observations require an annual reporting period")

    metric_values = {
        "stranding_count": totals.stranding_count,
        "dead_count": totals.dead_count,
        "live_count": totals.live_count,
    }
    if totals.report_count is not None:
        metric_values["report_count"] = totals.report_count
    if totals.live_stranding_count is not None:
        metric_values["live_stranding_count"] = totals.live_stranding_count
    if totals.navigation_count is not None:
        metric_values["navigation_count"] = totals.navigation_count

    period = entry.reporting_period
    observations: list[Observation] = []
    for metric, value in metric_values.items():
        method = "layout_text"
        if metric == "live_count" and totals.navigation_count is not None:
            method = "derived_from_reported_statuses"
        observations.append(
            Observation(
                key=ObservationKey(
                    year=period.year,
                    quarter=None,
                    animal_group="cetacean",
                    metric=metric,
                    dimension_type="total",
                    dimension_key="all",
                ),
                source_id=entry.source_id,
                source_page=totals.source_page,
                value=value,
                authority=SourceAuthority.MARN_NARRATIVE_REPORT,
                extraction_method=method,
                review_status="auto_extracted",
            )
        )
    return observations


def _normalize(text: str) -> str:
    normalized = unicodedata.normalize("NFKC", text.replace("\x00", ""))
    return re.sub(r"\s+", "", normalized).replace("，", ",").replace("；", ";")


def _require_reconciled(total: int, dead: int, live: int) -> None:
    if dead + live != total:
        raise ValueError(
            "MARN cetacean totals do not reconcile: "
            f"{dead} dead + {live} non-dead != {total} stranded"
        )
