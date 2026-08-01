import { describe, expect, it } from 'vitest';
import * as zh from '$lib/data/site';
import * as en from '$lib/data/site-en';
import { fill, formatReportLabel } from './format';

describe('fill', () => {
	it('substitutes named placeholders', () => {
		expect(fill('updated {date}', { date: '2026-07-22' })).toBe('updated 2026-07-22');
	});

	it('substitutes the same placeholder everywhere it appears', () => {
		expect(fill('{a} and {a}', { a: 'x' })).toBe('x and x');
	});

	it('drops placeholders with no value rather than printing the braces', () => {
		expect(fill('a {missing} b', {})).toBe('a  b');
	});
});

describe('formatReportLabel', () => {
	it('names an annual report in Chinese', () => {
		expect(formatReportLabel({ year: 2025 }, zh)).toBe('2025 年度擱淺報告');
	});

	it('names a quarterly report in Chinese using ordinal numerals', () => {
		expect(formatReportLabel({ year: 2026, quarter: 1 }, zh)).toBe('2026 年第一季擱淺報告');
	});

	it('names reports in English', () => {
		expect(formatReportLabel({ year: 2025 }, en)).toBe('2025 annual stranding report');
		expect(formatReportLabel({ year: 2026, quarter: 1 }, en)).toBe('2026 Q1 stranding report');
	});
});
