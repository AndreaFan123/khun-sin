import { describe, expect, it } from 'vitest';
import { countyRows } from './strandings';
import { countyPointFor } from './taiwan-geo';
import { turtleCountyRows } from './turtle-strandings';

describe('county map coordinates', () => {
	it.each([
		['cetacean', countyRows()],
		['sea turtle', turtleCountyRows()]
	])('covers every %s county row', (_group, rows) => {
		for (const row of rows) expect(countyPointFor(row.name), row.name).toBeDefined();
	});
});
