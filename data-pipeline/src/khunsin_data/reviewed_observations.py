from __future__ import annotations

import json
from pathlib import Path
from typing import Sequence

from .manifest import DocumentFamily, ManifestEntry
from .observations import Observation, ObservationKey, SourceAuthority


def load_reviewed_observations(
    source: str | Path, entries: Sequence[ManifestEntry]
) -> list[Observation]:
    payload = json.loads(Path(source).read_text(encoding="utf-8"))
    if payload.get("schema_version") != 1:
        raise ValueError("Reviewed observations require schema version 1")

    entries_by_checksum = {entry.sha256: entry for entry in entries}
    observations: list[Observation] = []
    for review in payload.get("reviews", []):
        checksum = str(review["source_sha256"])
        entry = entries_by_checksum.get(checksum)
        if entry is None:
            raise ValueError(
                f"Reviewed source checksum {checksum} does not match any manifest source"
            )
        if review.get("source_relpath") != entry.source_relpath:
            raise ValueError(f"Reviewed source path does not match checksum {checksum}")
        if entry.document_family is not DocumentFamily.MARN_NARRATIVE_REPORT:
            raise ValueError(f"Reviewed source {entry.source_id} is not a MARN report")
        if entry.reporting_period is None:
            raise ValueError(f"Reviewed source {entry.source_id} has no reporting period")

        source_page = int(review["source_page"])
        if not 1 <= source_page <= entry.page_count:
            raise ValueError(f"Reviewed source page is outside {entry.source_id}")
        metrics = review.get("metrics")
        if not isinstance(metrics, dict) or not metrics:
            raise ValueError(f"Reviewed source {entry.source_id} has no metrics")

        period = entry.reporting_period
        for metric, value in metrics.items():
            observations.append(
                Observation(
                    key=ObservationKey(
                        year=period.year,
                        quarter=period.quarter,
                        animal_group=str(review["animal_group"]),
                        metric=str(metric),
                        dimension_type="total",
                        dimension_key="all",
                    ),
                    source_id=entry.source_id,
                    source_page=source_page,
                    value=int(value),
                    authority=SourceAuthority.MARN_NARRATIVE_REPORT,
                    extraction_method="manual_transcription",
                    review_status="reviewed",
                )
            )

    return observations
