from __future__ import annotations

import json
from dataclasses import asdict, dataclass
from pathlib import Path

from .manifest import DocumentFamily, ManifestEntry, scan_source_root
from .marn_reports import (
    extract_marn_cetacean_annual_from_pdf,
    observations_from_marn_cetacean_totals,
)
from .observations import Observation
from .official_tables import (
    extract_official_totals_from_pdf,
    observations_from_official_totals,
)
from .reviewed_observations import load_reviewed_observations


@dataclass(frozen=True)
class ExtractionFailure:
    source_id: str
    source_relpath: str
    error: str


@dataclass(frozen=True)
class ExtractionResult:
    observations: tuple[Observation, ...]
    failures: tuple[ExtractionFailure, ...]


def extract_official_observations(
    source_root: str | Path,
    entries: list[ManifestEntry] | None = None,
) -> ExtractionResult:
    root = Path(source_root).expanduser().resolve()
    manifest_entries = entries if entries is not None else scan_source_root(root)
    official_entries = [
        entry
        for entry in manifest_entries
        if entry.document_family is DocumentFamily.OFFICIAL_STATISTICAL_TABLE
    ]

    observations: list[Observation] = []
    failures: list[ExtractionFailure] = []
    for entry in official_entries:
        try:
            totals = extract_official_totals_from_pdf(root / entry.source_relpath)
            observations.extend(observations_from_official_totals(entry, totals))
        except (OSError, ValueError) as error:
            failures.append(
                ExtractionFailure(
                    source_id=entry.source_id,
                    source_relpath=entry.source_relpath,
                    error=str(error),
                )
            )

    return ExtractionResult(tuple(observations), tuple(failures))


def extract_observations(
    source_root: str | Path,
    entries: list[ManifestEntry] | None = None,
    reviewed_input: str | Path | None = None,
) -> ExtractionResult:
    root = Path(source_root).expanduser().resolve()
    manifest_entries = entries if entries is not None else scan_source_root(root)
    official_result = extract_official_observations(root, manifest_entries)
    observations = list(official_result.observations)
    failures = list(official_result.failures)

    reviewed: list[Observation] = []
    if reviewed_input is not None:
        reviewed = load_reviewed_observations(reviewed_input, manifest_entries)
    reviewed_source_ids = {item.source_id for item in reviewed}

    narrative_entries = [
        entry
        for entry in manifest_entries
        if entry.document_family is DocumentFamily.MARN_NARRATIVE_REPORT
        and entry.reporting_period is not None
        and entry.reporting_period.period_type == "annual"
        and (
            "cetacean" in entry.animal_groups
            or entry.collection_hint == "cetacean"
        )
        and entry.source_id not in reviewed_source_ids
    ]
    for entry in narrative_entries:
        try:
            period = entry.reporting_period
            if period is None:  # narrowed by the selection above
                raise ValueError("MARN report has no reporting period")
            totals = extract_marn_cetacean_annual_from_pdf(
                root / entry.source_relpath,
                year=period.year,
            )
            observations.extend(observations_from_marn_cetacean_totals(entry, totals))
        except (OSError, ValueError) as error:
            failures.append(
                ExtractionFailure(
                    source_id=entry.source_id,
                    source_relpath=entry.source_relpath,
                    error=str(error),
                )
            )

    observations.extend(reviewed)
    metric_order = {
        "report_count": 0,
        "stranding_count": 1,
        "dead_count": 2,
        "live_count": 3,
        "live_stranding_count": 4,
        "navigation_count": 5,
    }
    official_count = len(official_result.observations)
    observations[official_count:] = sorted(
        observations[official_count:],
        key=lambda item: (
            item.key.year,
            item.source_id,
            metric_order.get(item.key.metric, 99),
            item.key.metric,
        ),
    )

    return ExtractionResult(tuple(observations), tuple(failures))


def write_observation_dataset(result: ExtractionResult, destination: str | Path) -> None:
    output = Path(destination)
    output.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "schema_version": 1,
        "source_policy": "official_tables_preferred_marn_supplemental",
        "observations": [item.to_dict() for item in result.observations],
        "failures": [asdict(item) for item in result.failures],
    }
    output.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
