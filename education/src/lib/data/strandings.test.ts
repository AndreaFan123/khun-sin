import { describe, expect, it } from 'vitest';
import { lastUpdated, latestPeriod, totals } from './strandings';

/**
 * Data currency is the one fact here a human has to state, which makes it the
 * one that can silently go wrong: add next year's report, forget the date, and
 * the footer confidently cites a stale reconciliation. These guard that.
 */
describe('data currency', () => {
	it('is an ISO date', () => {
		expect(lastUpdated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
		expect(Number.isNaN(Date.parse(lastUpdated))).toBe(false);
	});

	it('is at least as recent as the newest report included', () => {
		// Adding a 2027 report without touching lastUpdated fails here.
		expect(Number(lastUpdated.slice(0, 4))).toBeGreaterThanOrEqual(latestPeriod().year);
	});

	it('is not in the future', () => {
		expect(Date.parse(lastUpdated)).toBeLessThanOrEqual(Date.now());
	});
});

describe('latestPeriod', () => {
	it('picks the newest period in the data, quarters included', () => {
		const latest = latestPeriod();
		for (const { period } of totals) {
			const isOlderYear = period.year < latest.year;
			const isSameYearEarlierQuarter =
				period.year === latest.year && (period.quarter ?? 0) <= (latest.quarter ?? 0);
			expect(isOlderYear || isSameYearEarlierQuarter).toBe(true);
		}
	});
});
