import json
import unittest
from pathlib import Path
from tempfile import TemporaryDirectory

from khunsin_data.canonical import (
    build_canonical_dataset,
    write_canonical_dataset,
)
from khunsin_data.observations import Observation, ObservationKey, SourceAuthority


def make_observation(
    *, source_id: str, value: int, authority: SourceAuthority
) -> Observation:
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


class CanonicalDatasetTests(unittest.TestCase):
    def test_selects_higher_authority_and_preserves_lower_conflict(self) -> None:
        official = make_observation(
            source_id="official", value=102, authority=SourceAuthority.OFFICIAL_STATISTICAL_TABLE
        )
        narrative = make_observation(
            source_id="narrative", value=103, authority=SourceAuthority.MARN_NARRATIVE_REPORT
        )

        result = build_canonical_dataset([narrative, official])

        self.assertEqual(result.canonical_observations, (official,))
        self.assertEqual(len(result.conflict_resolutions), 1)
        self.assertEqual(result.conflict_resolutions[0].canonical_source_id, "official")
        self.assertEqual(
            result.conflict_resolutions[0].conflicting_observations,
            (narrative,),
        )
        self.assertEqual(result.review_queue, ())

    def test_excludes_equal_authority_conflict_from_canonical_output(self) -> None:
        first = make_observation(
            source_id="official-a", value=102, authority=SourceAuthority.OFFICIAL_STATISTICAL_TABLE
        )
        second = make_observation(
            source_id="official-b", value=104, authority=SourceAuthority.OFFICIAL_STATISTICAL_TABLE
        )

        result = build_canonical_dataset([first, second])

        self.assertEqual(result.canonical_observations, ())
        self.assertEqual(result.conflict_resolutions, ())
        self.assertEqual(len(result.review_queue), 1)
        self.assertEqual(
            {item.source_id for item in result.review_queue[0].conflicting_observations},
            {"official-a", "official-b"},
        )

    def test_writes_versioned_canonical_dataset(self) -> None:
        observation = make_observation(
            source_id="official", value=102, authority=SourceAuthority.OFFICIAL_STATISTICAL_TABLE
        )
        result = build_canonical_dataset([observation])

        with TemporaryDirectory() as directory:
            destination = Path(directory) / "canonical-observations.json"
            write_canonical_dataset(result, destination)
            payload = json.loads(destination.read_text(encoding="utf-8"))

        self.assertEqual(payload["schema_version"], 1)
        self.assertEqual(payload["canonical_observations"][0]["value"], 102)
        self.assertEqual(payload["conflict_resolutions"], [])
        self.assertEqual(payload["review_queue"], [])


if __name__ == "__main__":
    unittest.main()
