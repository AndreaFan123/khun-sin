import { describe, expect, it } from 'vitest';
import {
	turtleCauseRows,
	turtleCountyRows,
	turtleSpeciesRows,
	turtleTotals,
	turtleTrendRows
} from './turtle-strandings';

describe('sea turtle stranding data', () => {
	it('keeps the 2019–2025 annual series in year order', () => {
		expect(turtleTrendRows().map((row) => row.year)).toEqual([
			2019, 2020, 2021, 2022, 2023, 2024, 2025
		]);
		expect(turtleTotals.at(-1)).toEqual({ year: 2025, dead: 197, live: 133 });
	});

	it.each([
		['county', turtleCountyRows()],
		['species', turtleSpeciesRows()],
		['cause', turtleCauseRows()]
	])('reconciles the 2025 %s breakdown to 330 animals', (_name, rows) => {
		expect(rows.reduce((sum, row) => sum + row.count, 0)).toBe(330);
	});

	it('marks Yilan, Penghu and Taitung as the turtle hotspots', () => {
		expect(
			turtleCountyRows()
				.filter((row) => row.emphasis)
				.map((row) => row.name)
		).toEqual(['宜蘭縣', '澎湖縣', '臺東縣']);
	});
});
