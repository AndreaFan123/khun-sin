import unittest

from khunsin_data.observations import (
    Observation,
    ObservationKey,
    SourceAuthority,
    resolve_observations,
)


def observation(source_id: str, value: int, authority: SourceAuthority) -> Observation:
    return Observation(
        key=ObservationKey(
            year=2019,
            quarter=1,
            animal_group="sea_turtle",
            metric="stranding_count",
            dimension_type="total",
            dimension_key="all",
        ),
        source_id=source_id,
        source_page=1,
        value=value,
        authority=authority,
    )


class ObservationResolutionTests(unittest.TestCase):
    def test_official_table_wins_but_conflicting_narrative_value_is_preserved(self) -> None:
        official = observation("official-table", 102, SourceAuthority.OFFICIAL_STATISTICAL_TABLE)
        narrative = observation("marn-slides", 103, SourceAuthority.MARN_NARRATIVE_REPORT)

        result = resolve_observations([narrative, official])

        self.assertEqual(result.canonical, official)
        self.assertEqual(result.status, "selected_with_conflict")
        self.assertEqual(result.conflicting_observations, (narrative,))

    def test_equal_values_are_not_reported_as_a_conflict(self) -> None:
        official = observation("official-table", 82, SourceAuthority.OFFICIAL_STATISTICAL_TABLE)
        narrative = observation("marn-slides", 82, SourceAuthority.MARN_NARRATIVE_REPORT)

        result = resolve_observations([official, narrative])

        self.assertEqual(result.canonical, official)
        self.assertEqual(result.status, "selected")
        self.assertEqual(result.conflicting_observations, ())

    def test_tied_top_authorities_with_different_values_require_review(self) -> None:
        first = observation("official-a", 102, SourceAuthority.OFFICIAL_STATISTICAL_TABLE)
        second = observation("official-b", 103, SourceAuthority.OFFICIAL_STATISTICAL_TABLE)

        result = resolve_observations([first, second])

        self.assertIsNone(result.canonical)
        self.assertEqual(result.status, "needs_review")
        self.assertEqual(result.conflicting_observations, (first, second))


if __name__ == "__main__":
    unittest.main()
