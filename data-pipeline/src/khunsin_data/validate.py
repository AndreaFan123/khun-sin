from __future__ import annotations

import json
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Sequence

from .observations import Observation


@dataclass(frozen=True)
class ValidationIssue:
    code: str
    source_id: str
    message: str


@dataclass(frozen=True)
class ValidationResult:
    valid: bool
    issues: tuple[ValidationIssue, ...]


def validate_observations(observations: Sequence[Observation]) -> ValidationResult:
    issues: list[ValidationIssue] = []
    seen: set[tuple[str, object]] = set()

    for observation in observations:
        identity = (observation.source_id, observation.key)
        if identity in seen:
            issues.append(
                ValidationIssue(
                    code="duplicate_observation",
                    source_id=observation.source_id,
                    message=f"Duplicate metric {observation.key.metric}",
                )
            )
        seen.add(identity)
        if observation.value < 0:
            issues.append(
                ValidationIssue(
                    code="negative_count",
                    source_id=observation.source_id,
                    message=f"Metric {observation.key.metric} has a negative count",
                )
            )

    groups: dict[tuple[object, ...], dict[str, int]] = {}
    for observation in observations:
        key = observation.key
        group_key = (
            observation.source_id,
            key.year,
            key.quarter,
            key.animal_group,
            key.dimension_type,
            key.dimension_key,
        )
        groups.setdefault(group_key, {})[key.metric] = observation.value

    required = {"stranding_count", "live_count", "dead_count"}
    for group_key, metrics in groups.items():
        source_id = str(group_key[0])
        missing = required - metrics.keys()
        if missing:
            issues.append(
                ValidationIssue(
                    code="missing_total_metric",
                    source_id=source_id,
                    message=f"Missing total metrics: {', '.join(sorted(missing))}",
                )
            )
            continue
        if metrics["live_count"] + metrics["dead_count"] != metrics["stranding_count"]:
            issues.append(
                ValidationIssue(
                    code="totals_do_not_reconcile",
                    source_id=source_id,
                    message=(
                        f"{metrics['live_count']} live + {metrics['dead_count']} dead "
                        f"!= {metrics['stranding_count']} stranded"
                    ),
                )
            )

    return ValidationResult(valid=not issues, issues=tuple(issues))


def validate_observation_dataset(source: str | Path) -> ValidationResult:
    payload = json.loads(Path(source).read_text(encoding="utf-8"))
    if payload.get("schema_version") != 1:
        return ValidationResult(
            valid=False,
            issues=(ValidationIssue("unsupported_schema", "dataset", "Expected schema version 1"),),
        )
    if payload.get("failures"):
        return ValidationResult(
            valid=False,
            issues=(ValidationIssue("extraction_failures", "dataset", "Extraction failures remain"),),
        )
    observations = [Observation.from_dict(item) for item in payload.get("observations", [])]
    return validate_observations(observations)


def write_validation_report(result: ValidationResult, destination: str | Path) -> None:
    output = Path(destination)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(
        json.dumps(
            {
                "schema_version": 1,
                "valid": result.valid,
                "issues": [asdict(issue) for issue in result.issues],
            },
            ensure_ascii=False,
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )
