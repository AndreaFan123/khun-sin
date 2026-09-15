import { describe, expect, it } from 'vitest';
import { columnLayout, hBarLayout, niceMax, stackedLayout } from './layout';

describe('hBarLayout', () => {
	const items = [
		{ value: 58, display: '58 隻（45.3%）' },
		{ value: 14, display: '14 隻' },
		{ value: 0, display: '0 隻' }
	];
	const layout = hBarLayout(items, { width: 560, padLeft: 96 });

	it('gives the largest value the full plot width and scales the rest against it', () => {
		const plotWidth = 560 - 96 - 44;
		expect(layout.rows[0].width).toBeCloseTo(plotWidth);
		expect(layout.rows[1].width).toBeCloseTo((plotWidth * 14) / 58);
	});

	it('keeps a zero-value bar visible rather than collapsing it', () => {
		expect(layout.rows[2].width).toBe(3);
	});

	it('grows in height with the number of rows', () => {
		expect(hBarLayout(items.slice(0, 1), { width: 560, padLeft: 96 }).height).toBeLessThan(
			layout.height
		);
	});

	it('places the value outside the bar when there is room', () => {
		expect(layout.rows[1].valueInside).toBe(false);
		expect(layout.rows[1].valueAnchor).toBe('start');
		expect(layout.rows[1].valueX).toBeGreaterThan(layout.rows[1].x + layout.rows[1].width);
	});

	/** The behaviour the imperative renderer had, and the reason bars stay readable. */
	it('flips the value inside the bar when it would overflow the chart', () => {
		expect(layout.rows[0].valueInside).toBe(true);
		expect(layout.rows[0].valueAnchor).toBe('end');
		expect(layout.rows[0].valueX).toBeLessThan(layout.rows[0].x + layout.rows[0].width);
	});

	it('reserves the caller-chosen label gutter', () => {
		const wide = hBarLayout(items, { width: 560, padLeft: 240 });
		expect(wide.rows[0].labelX).toBe(230);
		expect(wide.rows[0].width).toBeLessThan(layout.rows[0].width);
	});
});

describe('columnLayout', () => {
	const values = [14, 20, 15, 3];
	const layout = columnLayout(values, { width: 560 });

	it('draws five gridlines from zero to the maximum', () => {
		expect(layout.ticks).toHaveLength(5);
		expect(layout.ticks[0].value).toBe(0);
		expect(layout.ticks[4].value).toBe(20);
	});

	it('spaces gridlines evenly, with zero at the baseline', () => {
		const gaps = layout.ticks.slice(1).map((t, i) => layout.ticks[i].y - t.y);
		expect(new Set(gaps.map((g) => g.toFixed(4))).size).toBe(1);
		expect(layout.ticks[0].y).toBeGreaterThan(layout.ticks[4].y);
	});

	it('lets the tallest column reach the top of the plot', () => {
		const tallest = layout.columns[1];
		expect(tallest.y).toBeCloseTo(layout.ticks[4].y);
	});

	it('centres each column in its slot and keeps the value above it', () => {
		for (const column of layout.columns) {
			expect(column.x + column.width / 2).toBeCloseTo(column.centreX);
			expect(column.valueY).toBeLessThan(column.y);
		}
	});
});

describe('niceMax', () => {
	it('rounds up to a whole step so axis labels stay round', () => {
		expect(niceMax(150)).toBe(160);
		expect(niceMax(161)).toBe(200);
		expect(niceMax(160)).toBe(160);
	});
});

describe('stackedLayout', () => {
	const items = [
		{ dead: 132, live: 18 },
		{ dead: 121, live: 7 }
	];
	const layout = stackedLayout(items, { width: 560 });

	it('scales against the rounded-up axis, not the raw maximum', () => {
		expect(layout.ticks[4].value).toBe(niceMax(150));
	});

	it('stacks the live segment above the dead one, never overlapping', () => {
		for (const column of layout.columns) {
			expect(column.liveY + column.liveHeight).toBeLessThanOrEqual(column.deadY);
		}
	});

	it('sizes the two segments in proportion to their values', () => {
		const [first] = layout.columns;
		expect(first.deadHeight / first.liveHeight).toBeCloseTo(132 / 18);
	});

	it('puts the total above the whole stack', () => {
		for (const column of layout.columns) {
			expect(column.totalY).toBeLessThan(column.liveY);
		}
	});

	it('aligns both segments on the same centre', () => {
		for (const column of layout.columns) {
			expect(column.x + column.width / 2).toBeCloseTo(column.centreX);
		}
	});
});
