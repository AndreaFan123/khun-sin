import unittest

from khunsin_data.manifest import DocumentFamily, ManifestEntry, ReportingPeriod
from khunsin_data.marn_reports import (
    observations_from_marn_cetacean_totals,
    parse_marn_cetacean_annual_pages,
)


class MarnCetaceanAnnualTests(unittest.TestCase):
    def test_preserves_2019_live_stranding_and_navigation_categories(self) -> None:
        pages = [
            "cover",
            """
            2019年共發生140起(150隻)鯨豚通報
            132隻死亡擱淺(88%)
            15隻活體擱淺(10%)
            3隻迷航，自行游離(2%)
            """,
        ]

        totals = parse_marn_cetacean_annual_pages(pages, year=2019)

        self.assertEqual(totals.source_page, 2)
        self.assertEqual(totals.report_count, 140)
        self.assertEqual(totals.stranding_count, 150)
        self.assertEqual(totals.dead_count, 132)
        self.assertEqual(totals.live_count, 18)
        self.assertEqual(totals.live_stranding_count, 15)
        self.assertEqual(totals.navigation_count, 3)

    def test_parses_standard_annual_summary_patterns(self) -> None:
        cases = [
            (
                2020,
                "2020年台灣通報鯨豚擱淺數量161隻，死亡143隻(89%)，活體18隻(11%)",
                (161, 143, 18),
            ),
            (
                2022,
                "MARN團隊2022年在全臺各鄰海19個縣市，共處理144隻鯨豚擱淺通報"
                "(119隻死亡擱淺，25隻活體擱淺)。",
                (144, 119, 25),
            ),
            (
                2023,
                "2023年擱淺的158隻鯨豚(141隻死亡擱淺，17隻活體擱淺)",
                (158, 141, 17),
            ),
            (
                2024,
                "2024年擱淺159隻鯨豚(135隻死亡，24隻活體)",
                (159, 135, 24),
            ),
            (
                2025,
                "2025年在全臺共處理128隻鯨豚擱淺通報"
                "(121隻死亡擱淺，7隻活體擱淺)",
                (128, 121, 7),
            ),
        ]

        for year, text, expected in cases:
            with self.subTest(year=year):
                totals = parse_marn_cetacean_annual_pages(["cover", text], year=year)
                self.assertEqual(
                    (totals.stranding_count, totals.dead_count, totals.live_count),
                    expected,
                )
                self.assertEqual(totals.source_page, 2)

    def test_rejects_summary_that_does_not_reconcile(self) -> None:
        text = "2024年擱淺159隻鯨豚(135隻死亡，25隻活體)"

        with self.assertRaisesRegex(ValueError, "do not reconcile"):
            parse_marn_cetacean_annual_pages([text], year=2024)

    def test_builds_narrative_observations_with_detailed_2019_statuses(self) -> None:
        entry = ManifestEntry(
            source_id="oca-2019-annual-example",
            source_relpath="鯨豚/2019/2019_全年度_擱淺報告.pdf",
            sha256="0" * 64,
            file_size=100,
            page_count=27,
            reporting_period=ReportingPeriod(2019, "annual"),
            collection_hint="cetacean",
            document_family=DocumentFamily.MARN_NARRATIVE_REPORT,
            animal_groups=("cetacean", "sea_turtle"),
            pdf_creator="Microsoft PowerPoint",
            pdf_creation_date=None,
        )
        totals = parse_marn_cetacean_annual_pages(
            [
                "2019年共發生140起(150隻)鯨豚通報；132隻死亡擱淺；"
                "15隻活體擱淺；3隻迷航"
            ],
            year=2019,
        )

        observations = observations_from_marn_cetacean_totals(entry, totals)
        by_metric = {item.key.metric: item for item in observations}

        self.assertEqual(
            {metric: item.value for metric, item in by_metric.items()},
            {
                "report_count": 140,
                "stranding_count": 150,
                "dead_count": 132,
                "live_count": 18,
                "live_stranding_count": 15,
                "navigation_count": 3,
            },
        )
        self.assertEqual(by_metric["stranding_count"].source_page, 1)
        self.assertEqual(by_metric["live_count"].extraction_method, "derived_from_reported_statuses")
        self.assertEqual(by_metric["navigation_count"].extraction_method, "layout_text")


if __name__ == "__main__":
    unittest.main()
