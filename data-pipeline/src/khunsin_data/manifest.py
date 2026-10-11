from __future__ import annotations

import json
import re
from dataclasses import asdict
from dataclasses import dataclass
from enum import Enum
from hashlib import sha256
from pathlib import Path
from typing import Literal

from pypdf import PdfReader


PeriodType = Literal["quarter", "annual"]


class DocumentFamily(str, Enum):
    OFFICIAL_STATISTICAL_TABLE = "official_statistical_table"
    MARN_NARRATIVE_REPORT = "marn_narrative_report"
    UNKNOWN = "unknown"


@dataclass(frozen=True)
class ReportingPeriod:
    year: int
    period_type: PeriodType
    quarter: int | None = None

    def __post_init__(self) -> None:
        if self.period_type == "quarter" and self.quarter not in {1, 2, 3, 4}:
            raise ValueError("Quarterly periods require quarter 1-4")
        if self.period_type == "annual" and self.quarter is not None:
            raise ValueError("Annual periods cannot have a quarter")


@dataclass(frozen=True)
class DocumentClassification:
    family: DocumentFamily
    animal_groups: tuple[str, ...]
    warnings: tuple[str, ...] = ()


@dataclass(frozen=True)
class ManifestEntry:
    source_id: str
    source_relpath: str
    sha256: str
    file_size: int
    page_count: int
    reporting_period: ReportingPeriod | None
    collection_hint: str | None
    document_family: DocumentFamily
    animal_groups: tuple[str, ...]
    pdf_creator: str | None
    pdf_creation_date: str | None
    warnings: tuple[str, ...] = ()

    def to_dict(self) -> dict[str, object]:
        value = asdict(self)
        value["document_family"] = self.document_family.value
        return value


_QUARTERS = {"一": 1, "二": 2, "三": 3, "四": 4, "1": 1, "2": 2, "3": 3, "4": 4}


def parse_reporting_period(filename: str | Path) -> ReportingPeriod:
    name = Path(filename).name.strip()
    year_match = re.search(r"(20\d{2})", name)
    if not year_match:
        raise ValueError(f"Cannot determine report year from {name!r}")

    year = int(year_match.group(1))
    compact = re.sub(r"\s+", "", name)
    if "全年度" in compact or re.search(r"第一季至第四季", compact):
        return ReportingPeriod(year=year, period_type="annual")

    quarter_match = re.search(r"第([一二三四1-4])季", compact)
    if not quarter_match:
        raise ValueError(f"Cannot determine report period from {name!r}")
    return ReportingPeriod(
        year=year,
        period_type="quarter",
        quarter=_QUARTERS[quarter_match.group(1)],
    )


def classify_document(
    *, text: str, page_count: int, collection_hint: str | None = None
) -> DocumentClassification:
    compact = re.sub(r"\s+", "", text.replace("\x00", ""))

    groups: list[str] = []
    if "鯨豚" in compact:
        groups.append("cetacean")
    if "海龜" in compact:
        groups.append("sea_turtle")

    if "國內海龜擱淺事件統計" in compact or "國內鯨豚擱淺事件統計" in compact:
        family = DocumentFamily.OFFICIAL_STATISTICAL_TABLE
    elif "擱淺報告" in compact or "STRANDINGREPORT" in compact.upper() or page_count > 1:
        family = DocumentFamily.MARN_NARRATIVE_REPORT
    else:
        family = DocumentFamily.UNKNOWN

    warnings: list[str] = []
    if collection_hint and groups and collection_hint not in groups:
        warnings.append("collection_hint_mismatch")
    if not groups:
        warnings.append("animal_group_not_detected")
    if family is DocumentFamily.UNKNOWN:
        warnings.append("document_family_not_detected")

    return DocumentClassification(
        family=family,
        animal_groups=tuple(groups),
        warnings=tuple(warnings),
    )


def scan_source_root(source_root: str | Path) -> list[ManifestEntry]:
    root = Path(source_root).expanduser().resolve()
    if not root.is_dir():
        raise ValueError(f"Source root is not a directory: {root}")

    return [_scan_pdf(path, root) for path in sorted(root.rglob("*.pdf"))]


def write_manifest(entries: list[ManifestEntry], destination: str | Path) -> None:
    output = Path(destination)
    output.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "schema_version": 1,
        "reports": [entry.to_dict() for entry in entries],
    }
    output.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def _scan_pdf(path: Path, source_root: Path) -> ManifestEntry:
    relative_path = path.relative_to(source_root)
    collection_hint = _collection_hint(relative_path)
    digest = _sha256(path)
    reader = PdfReader(path)

    extracted_text = "\n".join(page.extract_text() or "" for page in reader.pages)
    classification = classify_document(
        text=extracted_text,
        page_count=len(reader.pages),
        collection_hint=collection_hint,
    )

    warnings = list(classification.warnings)
    try:
        period = parse_reporting_period(path.name)
    except ValueError:
        period = None
        warnings.append("reporting_period_not_detected")

    period_slug = "unknown"
    if period:
        period_slug = "annual" if period.period_type == "annual" else f"q{period.quarter}"
    year_slug = str(period.year) if period else "unknown"

    metadata = reader.metadata
    creator = str(metadata.creator) if metadata and metadata.creator else None
    creation_date = None
    if metadata:
        try:
            parsed_date = metadata.creation_date
            creation_date = parsed_date.isoformat() if parsed_date else None
        except (AttributeError, ValueError):
            warnings.append("pdf_creation_date_invalid")

    return ManifestEntry(
        source_id=f"oca-{year_slug}-{period_slug}-{digest[:12]}",
        source_relpath=relative_path.as_posix(),
        sha256=digest,
        file_size=path.stat().st_size,
        page_count=len(reader.pages),
        reporting_period=period,
        collection_hint=collection_hint,
        document_family=classification.family,
        animal_groups=classification.animal_groups,
        pdf_creator=creator,
        pdf_creation_date=creation_date,
        warnings=tuple(warnings),
    )


def _collection_hint(relative_path: Path) -> str | None:
    if not relative_path.parts:
        return None
    return {"海龜": "sea_turtle", "鯨豚": "cetacean"}.get(relative_path.parts[0])


def _sha256(path: Path) -> str:
    checksum = sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            checksum.update(chunk)
    return checksum.hexdigest()
