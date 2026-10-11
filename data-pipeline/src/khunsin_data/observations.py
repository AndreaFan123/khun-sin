from __future__ import annotations

from dataclasses import asdict, dataclass
from enum import IntEnum
from typing import Literal, Sequence


class SourceAuthority(IntEnum):
    MARN_NARRATIVE_REPORT = 50
    OFFICIAL_STATISTICAL_TABLE = 100


@dataclass(frozen=True)
class ObservationKey:
    year: int
    quarter: int | None
    animal_group: str
    metric: str
    dimension_type: str
    dimension_key: str


@dataclass(frozen=True)
class Observation:
    key: ObservationKey
    source_id: str
    source_page: int
    value: int
    authority: SourceAuthority
    extraction_method: str = "layout_text"
    review_status: str = "unreviewed"

    def to_dict(self) -> dict[str, object]:
        return {
            "key": asdict(self.key),
            "source_id": self.source_id,
            "source_page": self.source_page,
            "value": self.value,
            "authority": self.authority.name.lower(),
            "extraction_method": self.extraction_method,
            "review_status": self.review_status,
        }

    @classmethod
    def from_dict(cls, value: dict[str, object]) -> "Observation":
        key_value = value["key"]
        if not isinstance(key_value, dict):
            raise ValueError("Observation key must be an object")
        authority_name = str(value["authority"]).upper()
        return cls(
            key=ObservationKey(
                year=int(key_value["year"]),
                quarter=int(key_value["quarter"]) if key_value.get("quarter") is not None else None,
                animal_group=str(key_value["animal_group"]),
                metric=str(key_value["metric"]),
                dimension_type=str(key_value["dimension_type"]),
                dimension_key=str(key_value["dimension_key"]),
            ),
            source_id=str(value["source_id"]),
            source_page=int(value["source_page"]),
            value=int(value["value"]),
            authority=SourceAuthority[authority_name],
            extraction_method=str(value.get("extraction_method", "unknown")),
            review_status=str(value.get("review_status", "unreviewed")),
        )


ResolutionStatus = Literal["selected", "selected_with_conflict", "needs_review"]


@dataclass(frozen=True)
class ResolutionResult:
    canonical: Observation | None
    status: ResolutionStatus
    conflicting_observations: tuple[Observation, ...]


def resolve_observations(observations: Sequence[Observation]) -> ResolutionResult:
    if not observations:
        raise ValueError("At least one observation is required")

    key = observations[0].key
    if any(item.key != key for item in observations[1:]):
        raise ValueError("All observations must describe the same metric and dimensions")

    highest_authority = max(item.authority for item in observations)
    top = tuple(item for item in observations if item.authority == highest_authority)
    top_values = {item.value for item in top}
    if len(top_values) > 1:
        return ResolutionResult(
            canonical=None,
            status="needs_review",
            conflicting_observations=top,
        )

    canonical = min(top, key=lambda item: item.source_id)
    conflicts = tuple(item for item in observations if item.value != canonical.value)
    return ResolutionResult(
        canonical=canonical,
        status="selected_with_conflict" if conflicts else "selected",
        conflicting_observations=conflicts,
    )
