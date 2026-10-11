# Khun-Sin data pipeline

This pipeline turns Ocean Conservation Administration PDF reports into
traceable datasets without discarding conflicting source values.

## Source policy

- Official statistical tables are authoritative for aggregate counts.
- MARN narrative reports supplement causes, interpretation and featured cases.
- Every extracted value retains its source document and page.
- A lower-authority conflicting value is preserved and reported.
- Conflicting values from sources with equal authority require human review.

The source PDFs remain immutable and outside this directory. The generated
manifest stores paths relative to a caller-supplied source root plus a SHA-256
checksum, so the inventory does not depend on one workstation's absolute path.

## Setup

```bash
cd data-pipeline
uv sync
```

Run the complete local pipeline after adding or replacing source PDFs:

```bash
make pipeline REPORTS_DIR="/path/to/台灣鯨豚擱淺報告"
```

This performs the three currently supported stages in order:

```text
inventory -> extract source observations -> validate
```

Each stage can also run independently:

```bash
make inventory REPORTS_DIR="/path/to/台灣鯨豚擱淺報告"
make extract REPORTS_DIR="/path/to/台灣鯨豚擱淺報告"
make validate
```

Run the test suite with:

```bash
make test
```

## Pipeline layers

1. `manifest`: hashes and classifies every PDF by content, not folder name.
2. `source observations`: stores every extracted number with provenance.
3. `resolution`: applies the approved source-authority policy without deleting
   disagreements.
4. `canonical data`: will contain only reviewed values approved for publication.
5. `publish`: will generate the JSON consumed by the education site.

The current extraction coverage is:

- aggregate totals from every detected official statistical table;
- annual cetacean totals from MARN narrative reports for 2019-2025;
- separate 2019 `live_stranding_count` and `navigation_count` metrics, while
  retaining the derived non-dead `live_count` used for cross-source comparison;
- checksum-pinned manual transcription for the image-only 2021 annual report.

Reviewed values live in `config/reviewed-observations.json`. A review is only
accepted when its source path and SHA-256 checksum match the current manifest,
so replacing a PDF cannot silently reuse an old transcription. Quarterly MARN
narrative extraction and publication remain future slices.

GitHub Actions runs the tests and validates the committed observation dataset.
It intentionally does not re-extract PDFs because the raw files are external to
the repository.
