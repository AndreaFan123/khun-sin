import unittest
import json
from pathlib import Path
from tempfile import TemporaryDirectory

from pypdf import PdfWriter

from khunsin_data.manifest import (
    DocumentFamily,
    ReportingPeriod,
    classify_document,
    parse_reporting_period,
    scan_source_root,
    write_manifest,
)


class ReportingPeriodTests(unittest.TestCase):
    def test_parses_quarterly_statistical_table_filename(self) -> None:
        self.assertEqual(
            parse_reporting_period("2019-第一季.pdf"),
            ReportingPeriod(year=2019, period_type="quarter", quarter=1),
        )

    def test_parses_annual_filename_expressed_as_four_quarters(self) -> None:
        self.assertEqual(
            parse_reporting_period("2025_第一季至第四季.pdf"),
            ReportingPeriod(year=2025, period_type="annual"),
        )

    def test_parses_annual_narrative_report_filename(self) -> None:
        self.assertEqual(
            parse_reporting_period("2019_全年度_擱淺報告.pdf"),
            ReportingPeriod(year=2019, period_type="annual"),
        )


class DocumentClassificationTests(unittest.TestCase):
    def test_identifies_official_turtle_statistical_table_from_content(self) -> None:
        result = classify_document(
            text="國內海龜擱淺事件統計 中華民國108年第1季",
            page_count=1,
        )

        self.assertEqual(result.family, DocumentFamily.OFFICIAL_STATISTICAL_TABLE)
        self.assertEqual(result.animal_groups, ("sea_turtle",))

    def test_identifies_combined_marn_report_from_all_document_text(self) -> None:
        result = classify_document(
            text="2019 第一季 鯨豚 擱淺報告 海龜擱淺地圖",
            page_count=13,
        )

        self.assertEqual(result.family, DocumentFamily.MARN_NARRATIVE_REPORT)
        self.assertEqual(result.animal_groups, ("cetacean", "sea_turtle"))

    def test_does_not_trust_the_folder_hint_over_document_content(self) -> None:
        result = classify_document(
            text="國內鯨豚擱淺事件統計",
            page_count=1,
            collection_hint="sea_turtle",
        )

        self.assertEqual(result.animal_groups, ("cetacean",))
        self.assertIn("collection_hint_mismatch", result.warnings)


class SourceInventoryTests(unittest.TestCase):
    def test_scans_pdf_metadata_using_paths_relative_to_the_source_root(self) -> None:
        with TemporaryDirectory() as directory:
            root = Path(directory)
            report_path = root / "海龜" / "2026" / "2026_第二季.pdf"
            report_path.parent.mkdir(parents=True)
            writer = PdfWriter()
            writer.add_blank_page(width=595, height=842)
            with report_path.open("wb") as output:
                writer.write(output)

            entries = scan_source_root(root)

        self.assertEqual(len(entries), 1)
        entry = entries[0]
        self.assertEqual(entry.source_relpath, "海龜/2026/2026_第二季.pdf")
        self.assertEqual(entry.collection_hint, "sea_turtle")
        self.assertEqual(entry.reporting_period, ReportingPeriod(2026, "quarter", 2))
        self.assertEqual(entry.page_count, 1)
        self.assertEqual(len(entry.sha256), 64)
        self.assertTrue(entry.source_id.startswith("oca-2026-q2-"))
        self.assertIn("animal_group_not_detected", entry.warnings)

    def test_writes_a_versioned_machine_readable_manifest(self) -> None:
        with TemporaryDirectory() as directory:
            root = Path(directory)
            report_path = root / "海龜" / "2026" / "2026_第二季.pdf"
            report_path.parent.mkdir(parents=True)
            writer = PdfWriter()
            writer.add_blank_page(width=595, height=842)
            with report_path.open("wb") as output:
                writer.write(output)
            destination = root / "reports.json"

            write_manifest(scan_source_root(root), destination)
            payload = json.loads(destination.read_text(encoding="utf-8"))

        self.assertEqual(payload["schema_version"], 1)
        self.assertEqual(len(payload["reports"]), 1)
        self.assertEqual(payload["reports"][0]["reporting_period"]["quarter"], 2)


if __name__ == "__main__":
    unittest.main()
