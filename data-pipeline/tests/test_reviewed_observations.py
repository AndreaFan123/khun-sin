import json
import unittest
from pathlib import Path
from tempfile import TemporaryDirectory

from khunsin_data.manifest import DocumentFamily, ManifestEntry, ReportingPeriod
from khunsin_data.reviewed_observations import load_reviewed_observations


class ReviewedObservationTests(unittest.TestCase):
    def test_loads_reviewed_metrics_only_for_exact_source_checksum(self) -> None:
        entry = ManifestEntry(
            source_id="oca-2021-annual-example",
            source_relpath="鯨豚/2021/2021_全年度_擱淺報告.pdf",
            sha256="a" * 64,
            file_size=100,
            page_count=17,
            reporting_period=ReportingPeriod(2021, "annual"),
            collection_hint="cetacean",
            document_family=DocumentFamily.MARN_NARRATIVE_REPORT,
            animal_groups=(),
            pdf_creator="ImageToPDF",
            pdf_creation_date=None,
        )
        payload = {
            "schema_version": 1,
            "reviews": [
                {
                    "source_sha256": "a" * 64,
                    "source_relpath": entry.source_relpath,
                    "source_page": 2,
                    "animal_group": "cetacean",
                    "metrics": {
                        "stranding_count": 144,
                        "dead_count": 133,
                        "live_count": 11,
                    },
                    "review_note": "Scanned page transcribed from the visible summary.",
                }
            ],
        }

        with TemporaryDirectory() as directory:
            path = Path(directory) / "reviews.json"
            path.write_text(json.dumps(payload), encoding="utf-8")
            observations = load_reviewed_observations(path, [entry])

        by_metric = {item.key.metric: item for item in observations}
        self.assertEqual(
            {metric: item.value for metric, item in by_metric.items()},
            {"stranding_count": 144, "dead_count": 133, "live_count": 11},
        )
        self.assertTrue(all(item.source_page == 2 for item in observations))
        self.assertTrue(all(item.extraction_method == "manual_transcription" for item in observations))
        self.assertTrue(all(item.review_status == "reviewed" for item in observations))

    def test_rejects_review_when_checksum_does_not_match_manifest(self) -> None:
        payload = {
            "schema_version": 1,
            "reviews": [
                {
                    "source_sha256": "b" * 64,
                    "source_relpath": "鯨豚/2021/report.pdf",
                    "source_page": 2,
                    "animal_group": "cetacean",
                    "metrics": {"stranding_count": 144},
                    "review_note": "example",
                }
            ],
        }

        with TemporaryDirectory() as directory:
            path = Path(directory) / "reviews.json"
            path.write_text(json.dumps(payload), encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "does not match any manifest source"):
                load_reviewed_observations(path, [])


if __name__ == "__main__":
    unittest.main()
