REPORTS_DIR ?=
DATA_DIR ?= data
REVIEWED_INPUT ?= config/reviewed-observations.json

.PHONY: sync test inventory extract validate resolve pipeline require-reports-dir

sync:
	uv sync

test:
	uv run python -m unittest discover -s tests -v

require-reports-dir:
	@test -n "$(REPORTS_DIR)" || (echo 'REPORTS_DIR is required' >&2; exit 1)
	@test -d "$(REPORTS_DIR)" || (echo 'REPORTS_DIR does not exist: $(REPORTS_DIR)' >&2; exit 1)

inventory: require-reports-dir
	uv run khunsin-data inventory --source-root "$(REPORTS_DIR)" --output "$(DATA_DIR)/reports-manifest.json"

extract: require-reports-dir
	uv run khunsin-data extract --source-root "$(REPORTS_DIR)" --reviewed-input "$(REVIEWED_INPUT)" --output "$(DATA_DIR)/source-observations.json"

validate:
	uv run khunsin-data validate --input "$(DATA_DIR)/source-observations.json" --output "$(DATA_DIR)/validation-report.json"

resolve:
	uv run khunsin-data resolve --input "$(DATA_DIR)/source-observations.json" --output "$(DATA_DIR)/canonical-observations.json"

pipeline: inventory extract validate resolve
