from __future__ import annotations

import argparse
from pathlib import Path
from typing import Sequence

from .extract import extract_official_observations, write_observation_dataset
from .manifest import scan_source_root, write_manifest
from .validate import validate_observation_dataset, write_validation_report


def main(argv: Sequence[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Khun-Sin report data pipeline")
    subparsers = parser.add_subparsers(dest="command", required=True)

    inventory = subparsers.add_parser(
        "inventory",
        help="inspect source PDFs and write a traceable report manifest",
    )
    inventory.add_argument("--source-root", type=Path, required=True)
    inventory.add_argument("--output", type=Path, required=True)

    extract = subparsers.add_parser(
        "extract",
        help="extract aggregate observations from official statistical tables",
    )
    extract.add_argument("--source-root", type=Path, required=True)
    extract.add_argument("--output", type=Path, required=True)

    validate = subparsers.add_parser(
        "validate",
        help="validate an extracted observation dataset",
    )
    validate.add_argument("--input", type=Path, required=True)
    validate.add_argument("--output", type=Path, required=True)

    args = parser.parse_args(argv)
    if args.command == "inventory":
        entries = scan_source_root(args.source_root)
        write_manifest(entries, args.output)
        warning_count = sum(len(entry.warnings) for entry in entries)
        print(f"Wrote {len(entries)} reports with {warning_count} warnings to {args.output}")
        return 0

    if args.command == "extract":
        result = extract_official_observations(args.source_root)
        write_observation_dataset(result, args.output)
        print(
            f"Wrote {len(result.observations)} observations with "
            f"{len(result.failures)} failures to {args.output}"
        )
        return 1 if result.failures else 0

    if args.command == "validate":
        result = validate_observation_dataset(args.input)
        write_validation_report(result, args.output)
        print(f"Validation {'passed' if result.valid else 'failed'} with {len(result.issues)} issues")
        return 0 if result.valid else 1

    parser.error(f"Unsupported command: {args.command}")
    return 2
