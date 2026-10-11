import unittest

from khunsin_data.manifest import (
    DocumentFamily,
    ManifestEntry,
    ReportingPeriod,
)
from khunsin_data.official_tables import (
    OfficialTotals,
    observations_from_official_totals,
    parse_official_totals,
)


class OfficialTableTotalsTests(unittest.TestCase):
    def test_parses_quarterly_table_with_report_count(self) -> None:
        text = """
        國內海龜擱淺事件統計
        通報                 發現狀態(隻) 種類(隻)
        件數 擱淺數(隻)      活體 死亡
        (件)
        總 計 102 102 20 82 94 2 4 1 0 1
        """

        totals = parse_official_totals(text)

        self.assertEqual(totals.report_count, 102)
        self.assertEqual(totals.stranding_count, 102)
        self.assertEqual(totals.live_count, 20)
        self.assertEqual(totals.dead_count, 82)

    def test_parses_annual_table_without_report_count(self) -> None:
        text = """
        國內海龜擱淺事件統計
        擱淺數(隻) 種類(隻)
        合計 活體 死亡 合計 綠蠵龜 玳瑁 赤蠵龜 欖蠵龜 革龜 其他
        總 計 335 59 276 335 295 19 9 10 2 0
        """

        totals = parse_official_totals(text)

        self.assertIsNone(totals.report_count)
        self.assertEqual(totals.stranding_count, 335)
        self.assertEqual(totals.live_count, 59)
        self.assertEqual(totals.dead_count, 276)

    def test_rejects_totals_that_do_not_reconcile(self) -> None:
        text = """
        國內海龜擱淺事件統計
        通報 件數 擱淺數(隻) 活體 死亡
        總 計 10 10 3 8
        """

        with self.assertRaisesRegex(ValueError, "live and dead counts"):
            parse_official_totals(text)

    def test_builds_provenanced_observations_for_each_available_total(self) -> None:
        entry = ManifestEntry(
            source_id="oca-2019-q1-example",
            source_relpath="海龜/2019/2019-第一季.pdf",
            sha256="0" * 64,
            file_size=100,
            page_count=1,
            reporting_period=ReportingPeriod(2019, "quarter", 1),
            collection_hint="sea_turtle",
            document_family=DocumentFamily.OFFICIAL_STATISTICAL_TABLE,
            animal_groups=("sea_turtle",),
            pdf_creator="Microsoft Excel",
            pdf_creation_date=None,
        )

        observations = observations_from_official_totals(
            entry,
            OfficialTotals(
                report_count=102,
                stranding_count=102,
                live_count=20,
                dead_count=82,
            ),
        )

        by_metric = {item.key.metric: item for item in observations}
        self.assertEqual(
            {metric: item.value for metric, item in by_metric.items()},
            {"report_count": 102, "stranding_count": 102, "live_count": 20, "dead_count": 82},
        )
        self.assertEqual(by_metric["stranding_count"].source_id, entry.source_id)
        self.assertEqual(by_metric["stranding_count"].source_page, 1)
        self.assertEqual(by_metric["stranding_count"].key.animal_group, "sea_turtle")


if __name__ == "__main__":
    unittest.main()
