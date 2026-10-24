#!/usr/bin/env node

import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const pipelineRoot = path.dirname(fileURLToPath(import.meta.url));
const rightsStates = new Set(["allowed", "prohibited", "permission_required", "unknown"]);
const connectionStates = new Set(["direct", "comparable", "context_only", "none"]);
const lifecycleStates = new Set(["selected", "rejected"]);
const publicationGates = new Set(["blocked", "review_ready", "approved"]);
const packageHeadings = [
  "## Fact card",
  "## 繁體中文草稿",
  "## English adaptation",
  "## Sources",
  "## Rights and publication decision",
  "## Review checklist"
];
const packageFields = [
  "id",
  "candidate_id",
  "slot",
  "lifecycle_status",
  "publication_gate",
  "primary_source_id",
  "text_reuse_status",
  "media_reuse_status",
  "source_media_used",
  "taiwan_connection_strength",
  "evidence_type"
];

function parseFrontmatter(markdown, file) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return { data: {}, errors: [`${file}: missing frontmatter`] };

  const data = {};
  const errors = [];
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) {
      errors.push(`${file}: invalid frontmatter line: ${line}`);
      continue;
    }
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    data[key] = value;
  }
  return { data, errors };
}

function validateSourceRegistry(registry) {
  const errors = [];
  const ids = new Set();
  for (const source of registry.sources ?? []) {
    const label = `source ${source.id ?? "<missing>"}`;
    if (!source.id) errors.push(`${label}: missing id`);
    if (ids.has(source.id)) errors.push(`${label}: duplicate id`);
    ids.add(source.id);

    for (const field of ["text_reuse_status", "media_reuse_status", "commercial_use_status", "automated_access_status"]) {
      if (!rightsStates.has(source[field])) errors.push(`${label}: invalid ${field}`);
    }

    if (source.active) {
      if (!source.last_terms_review) errors.push(`${label}: active source lacks last_terms_review`);
      if (!source.rights_url) errors.push(`${label}: active source lacks rights_url`);
      if (source.text_reuse_status === "unknown") errors.push(`${label}: active source has unknown text rights`);
    }
  }
  return { errors, ids };
}

function validateCandidates(inbox, sourceIds) {
  const errors = [];
  const ids = new Set();
  const selected = new Map();
  for (const candidate of inbox.candidates ?? []) {
    const label = `candidate ${candidate.id ?? "<missing>"}`;
    if (!candidate.id) errors.push(`${label}: missing id`);
    if (ids.has(candidate.id)) errors.push(`${label}: duplicate id`);
    ids.add(candidate.id);

    if (!lifecycleStates.has(candidate.lifecycle_status)) errors.push(`${label}: invalid lifecycle_status`);
    if (!rightsStates.has(candidate.rights_status)) errors.push(`${label}: invalid rights_status`);
    if (!connectionStates.has(candidate.taiwan_connection_strength)) errors.push(`${label}: invalid taiwan_connection_strength`);
    for (const sourceId of candidate.source_ids ?? []) {
      if (!sourceIds.has(sourceId)) errors.push(`${label}: unknown source ${sourceId}`);
    }

    const scoreValues = inbox.score_fields?.map((field) => candidate.scores?.[field]) ?? [];
    if (scoreValues.some((score) => !Number.isInteger(score) || score < 0 || score > 5)) {
      errors.push(`${label}: each score must be an integer from 0 to 5`);
    }
    const calculatedTotal = scoreValues.reduce((sum, score) => sum + score, 0);
    if (candidate.score_total !== calculatedTotal) errors.push(`${label}: score_total must equal ${calculatedTotal}`);

    if (candidate.lifecycle_status === "selected") {
      if (!candidate.package_id) errors.push(`${label}: selected candidate lacks package_id`);
      if (candidate.package_id) selected.set(candidate.id, candidate.package_id);
    }
    if (candidate.lifecycle_status === "rejected" && !candidate.rejection_reason) {
      errors.push(`${label}: rejected candidate lacks rejection_reason`);
    }
  }
  return { errors, selected };
}

function validatePackage(markdown, file, sourceIds, selectedCandidates) {
  const { data, errors } = parseFrontmatter(markdown, file);
  for (const field of packageFields) {
    if (!data[field]) errors.push(`${file}: missing ${field}`);
  }
  for (const heading of packageHeadings) {
    if (!markdown.includes(heading)) errors.push(`${file}: missing heading ${heading}`);
  }

  if (data.primary_source_id && !sourceIds.has(data.primary_source_id)) errors.push(`${file}: unknown primary_source_id`);
  if (data.text_reuse_status && !rightsStates.has(data.text_reuse_status)) errors.push(`${file}: invalid text_reuse_status`);
  if (data.media_reuse_status && !rightsStates.has(data.media_reuse_status)) errors.push(`${file}: invalid media_reuse_status`);
  if (data.taiwan_connection_strength && !connectionStates.has(data.taiwan_connection_strength)) {
    errors.push(`${file}: invalid taiwan_connection_strength`);
  }
  if (data.publication_gate && !publicationGates.has(data.publication_gate)) errors.push(`${file}: invalid publication_gate`);

  if (["unknown", "permission_required", "prohibited"].includes(data.text_reuse_status) && data.publication_gate !== "blocked") {
    errors.push(`${file}: unsafe text rights require publication_gate blocked`);
  }
  if (data.source_media_used !== "none" && data.media_reuse_status !== "allowed") {
    errors.push(`${file}: source media requires allowed media rights`);
  }

  const expectedPackage = selectedCandidates.get(data.candidate_id);
  if (!expectedPackage) errors.push(`${file}: candidate_id is not selected`);
  if (expectedPackage && expectedPackage !== data.id) errors.push(`${file}: package id does not match candidate inbox`);

  return { errors, data };
}

function validatePerformance(records, packageIds) {
  const errors = [];
  const seen = new Set();
  for (const record of records.records ?? []) {
    const label = `performance ${record.package_id ?? "<missing>"}`;
    if (!packageIds.has(record.package_id)) errors.push(`${label}: unknown package_id`);
    if (seen.has(record.package_id)) errors.push(`${label}: duplicate record`);
    seen.add(record.package_id);

    if (record.publication_status === "not_published") {
      if (record.publication_url !== null || record.publish_date !== null) {
        errors.push(`${label}: unpublished record must not contain publication details`);
      }
      const measured = Object.values(record.metrics ?? {}).some((value) => value !== null);
      if (measured) errors.push(`${label}: unpublished record must not contain audience metrics`);
    }
  }
  for (const packageId of packageIds) {
    if (!seen.has(packageId)) errors.push(`performance: missing record for ${packageId}`);
  }
  return errors;
}

async function loadJson(relativePath) {
  const value = await readFile(path.join(pipelineRoot, relativePath), "utf8");
  return JSON.parse(value);
}

async function loadPackages() {
  const weekRoot = path.join(pipelineRoot, "weeks");
  const weeks = await readdir(weekRoot, { withFileTypes: true });
  const packages = [];
  for (const week of weeks.filter((entry) => entry.isDirectory())) {
    const weekPath = path.join(weekRoot, week.name);
    const files = await readdir(weekPath, { withFileTypes: true });
    for (const file of files.filter((entry) => entry.isFile() && entry.name.endsWith(".md"))) {
      const absolutePath = path.join(weekPath, file.name);
      packages.push({
        file: path.relative(pipelineRoot, absolutePath),
        markdown: await readFile(absolutePath, "utf8")
      });
    }
  }
  return packages;
}

async function validateActual() {
  const registry = await loadJson("data/source-registry.json");
  const inbox = await loadJson("data/candidate-inbox.json");
  const performance = await loadJson("data/performance-records.json");
  const packages = await loadPackages();

  const sourceResult = validateSourceRegistry(registry);
  const candidateResult = validateCandidates(inbox, sourceResult.ids);
  const errors = [...sourceResult.errors, ...candidateResult.errors];
  const packageIds = new Set();

  for (const item of packages) {
    const result = validatePackage(item.markdown, item.file, sourceResult.ids, candidateResult.selected);
    errors.push(...result.errors);
    if (result.data.id) packageIds.add(result.data.id);
  }
  errors.push(...validatePerformance(performance, packageIds));

  for (const packageId of candidateResult.selected.values()) {
    if (!packageIds.has(packageId)) errors.push(`packages: missing selected package ${packageId}`);
  }

  return {
    errors,
    counts: {
      sources: registry.sources.length,
      active_sources: registry.sources.filter((source) => source.active).length,
      candidates: inbox.candidates.length,
      selected_candidates: candidateResult.selected.size,
      packages: packages.length,
      performance_records: performance.records.length
    }
  };
}

function runSelfTest() {
  const errors = [];
  const selected = new Map([["candidate-safe", "package-safe"]]);
  const unsafePackage = `---
id: package-safe
candidate_id: candidate-safe
slot: cetacean
lifecycle_status: rights_review
publication_gate: review_ready
primary_source_id: iwc
text_reuse_status: permission_required
media_reuse_status: unknown
source_media_used: none
taiwan_connection_strength: context_only
evidence_type: official_summary
---

## Fact card
## 繁體中文草稿
## English adaptation
## Sources
## Rights and publication decision
`;
  const result = validatePackage(unsafePackage, "self-test.md", new Set(["iwc"]), selected);
  errors.push(...result.errors);

  const expected = [
    "self-test.md: missing heading ## Review checklist",
    "self-test.md: unsafe text rights require publication_gate blocked"
  ];
  const missing = expected.filter((message) => !errors.includes(message));
  if (missing.length) {
    console.error("Self-test failed. Validator did not report:");
    for (const message of missing) console.error(`- ${message}`);
    process.exitCode = 1;
    return;
  }
  console.log(`Self-test passed. Validator reported ${errors.length} expected errors.`);
}

if (process.argv.includes("--self-test")) {
  runSelfTest();
} else {
  const result = await validateActual();
  if (result.errors.length) {
    console.error(`Content pipeline validation failed with ${result.errors.length} error(s):`);
    for (const error of result.errors) console.error(`- ${error}`);
    process.exitCode = 1;
  } else {
    console.log("Content pipeline validation passed.");
    for (const [label, count] of Object.entries(result.counts)) console.log(`${label}: ${count}`);
  }
}
