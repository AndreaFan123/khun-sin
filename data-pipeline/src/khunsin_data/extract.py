from __future__ import annotations

import json
from dataclasses import asdict, dataclass
from pathlib import Path

from .manifest import DocumentFamily, ManifestEntry, scan_source_root
from .observations import Observation
from .official_tables import (
    extract_official_totals_from_pdf,
    observations_from_official_totals,
)


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


def write_observation_dataset(result: ExtractionResult, destination: str | Path) -> None:
    output = Path(destination)
    output.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "schema_version": 1,
        "source_policy": "official_statistical_tables_for_aggregates",
        "observations": [item.to_dict() for item in result.observations],
        "failures": [asdict(item) for item in result.failures],
    }
    output.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
