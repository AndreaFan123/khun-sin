import json
import unittest
from pathlib import Path
from tempfile import TemporaryDirectory

from khunsin_data.extract import ExtractionResult, write_observation_dataset
from khunsin_data.observations import (
    Observation,
    ObservationKey,
    SourceAuthority,
)


class ObservationDatasetTests(unittest.TestCase):
    def test_writes_versioned_observations_and_failures(self) -> None:
        observation = Observation(
            key=ObservationKey(
                year=2019,
                quarter=1,
                animal_group="sea_turtle",
                metric="stranding_count",
                dimension_type="total",
                dimension_key="all",
            ),
            source_id="oca-2019-q1-example",
            source_page=1,
            value=102,
            authority=SourceAuthority.OFFICIAL_STATISTICAL_TABLE,
        )
        result = ExtractionResult(observations=(observation,), failures=())

        with TemporaryDirectory() as directory:
            destination = Path(directory) / "source-observations.json"
            write_observation_dataset(result, destination)
            payload = json.loads(destination.read_text(encoding="utf-8"))

        self.assertEqual(payload["schema_version"], 1)
        self.assertEqual(payload["source_policy"], "official_statistical_tables_for_aggregates")
        self.assertEqual(payload["observations"][0]["value"], 102)
        self.assertEqual(payload["observations"][0]["authority"], "official_statistical_table")
        self.assertEqual(payload["failures"], [])


if __name__ == "__main__":
    unittest.main()
