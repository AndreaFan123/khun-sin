from __future__ import annotations

import argparse
from pathlib import Path
from typing import Sequence

from .canonical import (
    build_canonical_dataset,
    read_source_observations,
    write_canonical_dataset,
)
from .extract import extract_observations, write_observation_dataset
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
        help="extract aggregate observations from supported report families",
    )
    extract.add_argument("--source-root", type=Path, required=True)
    extract.add_argument("--output", type=Path, required=True)
    extract.add_argument("--reviewed-input", type=Path)

    validate = subparsers.add_parser(
        "validate",
        help="validate an extracted observation dataset",
    )
    validate.add_argument("--input", type=Path, required=True)
    validate.add_argument("--output", type=Path, required=True)

    resolve = subparsers.add_parser(
        "resolve",
        help="select canonical values and preserve source conflicts",
    )
    resolve.add_argument("--input", type=Path, required=True)
    resolve.add_argument("--output", type=Path, required=True)

    args = parser.parse_args(argv)
    if args.command == "inventory":
        entries = scan_source_root(args.source_root)
        write_manifest(entries, args.output)
        warning_count = sum(len(entry.warnings) for entry in entries)
        print(f"Wrote {len(entries)} reports with {warning_count} warnings to {args.output}")
        return 0

    if args.command == "extract":
        result = extract_observations(
            args.source_root,
            reviewed_input=args.reviewed_input,
        )
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

    if args.command == "resolve":
        observations = read_source_observations(args.input)
        result = build_canonical_dataset(observations)
        write_canonical_dataset(result, args.output)
        print(
            f"Wrote {len(result.canonical_observations)} canonical observations, "
            f"{len(result.conflict_resolutions)} resolved conflicts, and "
            f"{len(result.review_queue)} review items to {args.output}"
        )
        return 1 if result.review_queue else 0

    parser.error(f"Unsupported command: {args.command}")
    return 2
