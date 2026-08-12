import { describe, expect, it } from 'vitest';
import { describeChart } from './describe';

describe('describeChart', () => {
	it('joins tooltips into one sentence', () => {
		expect(describeChart(['連江縣: 26 隻', '金門縣: 24 隻'])).toBe('連江縣: 26 隻; 金門縣: 24 隻');
	});

	it('turns a tooltip newline into a colon so label and value stay related', () => {
		expect(describeChart(['連江縣\n26 隻'])).toBe('連江縣: 26 隻');
	});

	it('leaves no newline behind for a screen reader to swallow', () => {
		const description = describeChart(['2019年\n死亡 132 隻', '2019年\n存活 18 隻']);
		expect(description).not.toContain('\n');
	});

	it('is empty for an empty chart', () => {
		expect(describeChart([])).toBe('');
	});
});
