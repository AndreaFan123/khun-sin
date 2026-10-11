import unittest

from khunsin_data.observations import (
    Observation,
    ObservationKey,
    SourceAuthority,
)
from khunsin_data.validate import validate_observations


def totals(*, stranding: int, live: int, dead: int) -> list[Observation]:
    return [
        Observation(
            key=ObservationKey(
                year=2025,
                quarter=None,
                animal_group="sea_turtle",
                metric=metric,
                dimension_type="total",
                dimension_key="all",
            ),
            source_id="oca-2025-annual-example",
            source_page=1,
            value=value,
            authority=SourceAuthority.OFFICIAL_STATISTICAL_TABLE,
        )
        for metric, value in {
            "stranding_count": stranding,
            "live_count": live,
            "dead_count": dead,
        }.items()
    ]


class ObservationValidationTests(unittest.TestCase):
    def test_accepts_reconciled_official_totals(self) -> None:
        result = validate_observations(totals(stranding=330, live=133, dead=197))

        self.assertTrue(result.valid)
        self.assertEqual(result.issues, ())

    def test_rejects_totals_when_live_and_dead_do_not_reconcile(self) -> None:
        result = validate_observations(totals(stranding=330, live=133, dead=196))

        self.assertFalse(result.valid)
        self.assertEqual(result.issues[0].code, "totals_do_not_reconcile")

    def test_rejects_duplicate_metrics_from_the_same_source(self) -> None:
        observations = totals(stranding=330, live=133, dead=197)
        observations.append(observations[0])

        result = validate_observations(observations)

        self.assertFalse(result.valid)
        self.assertEqual(result.issues[0].code, "duplicate_observation")


if __name__ == "__main__":
    unittest.main()
