/**
 * Chart geometry (#8–#10). Pure functions: values in, coordinates out.
 *
 * Splitting the maths out of the components is what makes it testable without
 * a browser, and it is the part that carried the subtle behaviour of the old
 * imperative renderers — the minimum bar width, the value label that flips
 * inside the bar when it would overflow, the axis rounding.
 *
 * Every function takes an explicit width so the components can render a
 * sensible chart during prerendering and refine it once the real container
 * width is known.
 */

export interface Tick {
	value: number;
	y: number;
}

/* ---------------- horizontal bars ---------------- */

export interface HBarRow {
	/** Bar rectangle. */
	x: number;
	y: number;
	width: number;
	height: number;
	/** Right-aligned category label, vertically centred on the bar. */
	labelX: number;
	labelY: number;
	/** Value label: outside the bar end, or flipped inside when it would overflow. */
	valueX: number;
	valueAnchor: 'start' | 'end';
	valueInside: boolean;
}

export interface HBarLayout {
	width: number;
	height: number;
	rows: HBarRow[];
}

const ROW_HEIGHT = 34;
const BAR_INSET = 4;
const BAR_HEIGHT = ROW_HEIGHT - 12;
const MIN_BAR = 3;
/** Rough advance width per character at the value label's size. */
const CHAR_WIDTH = 8.8;

export const hBarLayout = (
	items: { value: number; display: string }[],
	{
		width,
		padLeft,
		padRight = 44,
		padTop = 6
	}: { width: number; padLeft: number; padRight?: number; padTop?: number }
): HBarLayout => {
	const max = Math.max(...items.map((i) => i.value), 0);
	const plotWidth = Math.max(0, width - padLeft - padRight);

	return {
		width,
		height: padTop + items.length * ROW_HEIGHT + 6,
		rows: items.map((item, index) => {
			const y = padTop + index * ROW_HEIGHT;
			const barWidth = max > 0 ? Math.max(MIN_BAR, (plotWidth * item.value) / max) : MIN_BAR;
			const labelWidth = item.display.length * CHAR_WIDTH;
			const fitsOutside = padLeft + barWidth + 10 + labelWidth <= width - 2;

			return {
				x: padLeft,
				y: y + BAR_INSET,
				width: barWidth,
				height: BAR_HEIGHT,
				labelX: padLeft - 10,
				labelY: y + ROW_HEIGHT / 2 + 1,
				valueX: fitsOutside ? padLeft + barWidth + 10 : padLeft + barWidth - 10,
				valueAnchor: fitsOutside ? 'start' : 'end',
				valueInside: !fitsOutside
			};
		})
	};
};

/* ---------------- vertical columns ---------------- */

export interface Column {
	x: number;
	y: number;
	width: number;
	height: number;
	/** Centre line — category label below, value label above. */
	centreX: number;
	valueY: number;
	labelY: number;
}

export interface ColumnLayout {
	width: number;
	height: number;
	ticks: Tick[];
	columns: Column[];
	axisRight: number;
	axisLeft: number;
}

const TICK_COUNT = 4;

/** Shared plumbing for both column charts: gridlines and the plot box. */
const columnFrame = (
	max: number,
	{
		width,
		height,
		padTop,
		padBottom,
		padLeft,
		padRight
	}: {
		width: number;
		height: number;
		padTop: number;
		padBottom: number;
		padLeft: number;
		padRight: number;
	}
) => {
	const plotHeight = height - padTop - padBottom;
	const plotWidth = width - padLeft - padRight;
	const ticks: Tick[] = Array.from({ length: TICK_COUNT + 1 }, (_, step) => ({
		value: Math.round((max * step) / TICK_COUNT),
		y: padTop + plotHeight - (plotHeight * step) / TICK_COUNT
	}));
	return { plotHeight, plotWidth, ticks, baseline: padTop + plotHeight };
};

export const columnLayout = (
	values: number[],
	{
		width,
		height = 260,
		padTop = 20,
		padBottom = 34,
		padLeft = 30,
		padRight = 6
	}: {
		width: number;
		height?: number;
		padTop?: number;
		padBottom?: number;
		padLeft?: number;
		padRight?: number;
	}
): ColumnLayout => {
	const max = Math.max(...values, 0);
	const { plotHeight, plotWidth, ticks, baseline } = columnFrame(max, {
		width,
		height,
		padTop,
		padBottom,
		padLeft,
		padRight
	});
	const slot = values.length ? plotWidth / values.length : plotWidth;
	const barWidth = Math.min(34, slot * 0.6);

	return {
		width,
		height,
		ticks,
		axisLeft: padLeft,
		axisRight: width - padRight,
		columns: values.map((value, index) => {
			const barHeight = max > 0 ? (plotHeight * value) / max : 0;
			const centreX = padLeft + slot * index + slot / 2;
			return {
				x: centreX - barWidth / 2,
				y: baseline - barHeight,
				width: barWidth,
				height: barHeight,
				centreX,
				valueY: baseline - barHeight - 6,
				labelY: height - padBottom + 18
			};
		})
	};
};

/* ---------------- stacked columns ---------------- */

export interface StackedColumn {
	x: number;
	width: number;
	/** Lower segment. */
	deadY: number;
	deadHeight: number;
	/** Upper segment, sitting a hairline above the lower one. */
	liveY: number;
	liveHeight: number;
	centreX: number;
	totalY: number;
	labelY: number;
}

export interface StackedLayout {
	width: number;
	height: number;
	ticks: Tick[];
	columns: StackedColumn[];
	axisLeft: number;
	axisRight: number;
}

/** Round the axis up to a whole multiple so the gridline labels stay tidy. */
export const niceMax = (max: number, step = 40): number => Math.ceil(max / step) * step;

const SEGMENT_GAP = 2;

export const stackedLayout = (
	items: { dead: number; live: number }[],
	{
		width,
		height = 280,
		padTop = 22,
		padBottom = 34,
		padLeft = 34,
		padRight = 6
	}: {
		width: number;
		height?: number;
		padTop?: number;
		padBottom?: number;
		padLeft?: number;
		padRight?: number;
	}
): StackedLayout => {
	const top = niceMax(Math.max(...items.map((i) => i.dead + i.live), 0));
	const { plotHeight, plotWidth, ticks, baseline } = columnFrame(top, {
		width,
		height,
		padTop,
		padBottom,
		padLeft,
		padRight
	});
	const slot = items.length ? plotWidth / items.length : plotWidth;
	const barWidth = Math.min(46, slot * 0.5);

	return {
		width,
		height,
		ticks,
		axisLeft: padLeft,
		axisRight: width - padRight,
		columns: items.map((item, index) => {
			const deadHeight = top > 0 ? (plotHeight * item.dead) / top : 0;
			const liveHeight = top > 0 ? (plotHeight * item.live) / top : 0;
			const centreX = padLeft + slot * index + slot / 2;
			return {
				x: centreX - barWidth / 2,
				width: barWidth,
				deadY: baseline - deadHeight,
				deadHeight,
				liveY: baseline - deadHeight - liveHeight - SEGMENT_GAP,
				liveHeight,
				centreX,
				totalY: baseline - deadHeight - liveHeight - 10,
				labelY: height - padBottom + 18
			};
		})
	};
};
