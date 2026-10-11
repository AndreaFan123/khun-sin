from __future__ import annotations

import json
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Sequence

from .observations import (
    Observation,
    ObservationKey,
    resolve_observations,
)


@dataclass(frozen=True)
class ResolutionRecord:
    key: ObservationKey
    status: str
    canonical_source_id: str | None
    conflicting_observations: tuple[Observation, ...]

    def to_dict(self) -> dict[str, object]:
        return {
            "key": asdict(self.key),
            "status": self.status,
            "canonical_source_id": self.canonical_source_id,
            "conflicting_observations": [
                item.to_dict() for item in self.conflicting_observations
            ],
        }


@dataclass(frozen=True)
class CanonicalDataset:
    canonical_observations: tuple[Observation, ...]
    conflict_resolutions: tuple[ResolutionRecord, ...]
    review_queue: tuple[ResolutionRecord, ...]


def build_canonical_dataset(observations: Sequence[Observation]) -> CanonicalDataset:
    grouped: dict[ObservationKey, list[Observation]] = {}
    for observation in observations:
        grouped.setdefault(observation.key, []).append(observation)

    canonical: list[Observation] = []
    conflicts: list[ResolutionRecord] = []
    review_queue: list[ResolutionRecord] = []
    for key in sorted(grouped, key=_key_sort_value):
        resolution = resolve_observations(grouped[key])
        if resolution.canonical is not None:
            canonical.append(resolution.canonical)
        if resolution.status == "selected_with_conflict":
            conflicts.append(
                ResolutionRecord(
                    key=key,
                    status=resolution.status,
                    canonical_source_id=resolution.canonical.source_id,
                    conflicting_observations=resolution.conflicting_observations,
                )
            )
        elif resolution.status == "needs_review":
            review_queue.append(
                ResolutionRecord(
                    key=key,
                    status=resolution.status,
                    canonical_source_id=None,
                    conflicting_observations=resolution.conflicting_observations,
                )
            )

    return CanonicalDataset(
        canonical_observations=tuple(canonical),
        conflict_resolutions=tuple(conflicts),
        review_queue=tuple(review_queue),
    )


def read_source_observations(source: str | Path) -> list[Observation]:
    payload = json.loads(Path(source).read_text(encoding="utf-8"))
    if payload.get("schema_version") != 1:
        raise ValueError("Source observations require schema version 1")
    if payload.get("failures"):
        raise ValueError("Cannot resolve a dataset with extraction failures")
    return [Observation.from_dict(item) for item in payload.get("observations", [])]


def write_canonical_dataset(result: CanonicalDataset, destination: str | Path) -> None:
    output = Path(destination)
    output.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "schema_version": 1,
        "source_policy": "official_tables_preferred_marn_supplemental",
        "canonical_observations": [
            item.to_dict() for item in result.canonical_observations
        ],
        "conflict_resolutions": [
            item.to_dict() for item in result.conflict_resolutions
        ],
        "review_queue": [item.to_dict() for item in result.review_queue],
    }
    output.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def _key_sort_value(key: ObservationKey) -> tuple[object, ...]:
    quarter = key.quarter if key.quarter is not None else 5
    return (
        key.animal_group,
        key.year,
        quarter,
        key.dimension_type,
        key.dimension_key,
        key.metric,
    )
