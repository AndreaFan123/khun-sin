<script lang="ts">
	// Where stranding data meets the chart components. The three chart
	// components below know nothing about cetaceans; this is the only place
	// that picks locale labels and formats numbers — the division the selector
	// layer in strandings.ts was written for.
	import BarChartHorizontal from './BarChartHorizontal.svelte';
	import ColumnChart from './ColumnChart.svelte';
	import StackedColumnChart from './StackedColumnChart.svelte';
	import { useSite } from '$lib/copy';
	import { causeRows, countyRows, monthRows, speciesRows, trendRows } from '$lib/data/strandings';

	let { chart }: { chart: 'trend' | 'months' | 'counties' | 'causes' | 'species' } = $props();

	const site = useSite();
	const isEn = $derived(site().locale === 'en');
	const ui = $derived(site().copy.uiCopy);
	const cards = $derived(site().copy.chartCards);

	/** The card's own title is the honest description of what the chart shows. */
	const ariaLabel = $derived(cards.find((c) => c.key === chart)?.title ?? '');

	const unit = $derived(isEn ? '' : ' 隻');
	const count = (n: number) => `${n}${unit}`;
	const withShare = (n: number, share: number, decimals: number) =>
		isEn
			? `${n} (${(share * 100).toFixed(decimals)}%)`
			: `${n} 隻（${(share * 100).toFixed(decimals)}%）`;

	// English names are longer, so they need a wider label gutter.
	const gutter = $derived({
		species: isEn ? 190 : 96,
		counties: isEn ? 110 : 96,
		causes: isEn ? 240 : 150
	});
</script>

{#if chart === 'species'}
	<BarChartHorizontal
		{ariaLabel}
		padLeft={gutter.species}
		items={speciesRows().map((row) => ({
			label: isEn ? row.nameEn : row.name,
			value: row.count,
			display: withShare(row.count, row.share, 1),
			tooltip: `${isEn ? row.nameEn : row.name}\n${withShare(row.count, row.share, 1)}`,
			emphasis: row.emphasis
		}))}
	/>
{:else if chart === 'counties'}
	<BarChartHorizontal
		{ariaLabel}
		padLeft={gutter.counties}
		items={countyRows().map((row) => ({
			label: isEn ? row.nameEn : row.name,
			value: row.count,
			display: count(row.count),
			tooltip: `${isEn ? row.nameEn : row.name}\n${count(row.count)}`,
			emphasis: row.offshoreIsland
		}))}
	/>
{:else if chart === 'causes'}
	<BarChartHorizontal
		{ariaLabel}
		padLeft={gutter.causes}
		items={causeRows().map((row) => ({
			label: isEn ? row.nameEn : row.name,
			value: row.count,
			display: withShare(row.count, row.share, 0),
			tooltip: `${isEn ? row.nameEn : row.name}\n${withShare(row.count, row.share, 0)}`,
			emphasis: row.emphasis
		}))}
	/>
{:else if chart === 'months'}
	<ColumnChart
		{ariaLabel}
		items={monthRows().map((row) => ({
			label: ui.monthLabels[row.month - 1],
			value: row.count,
			tooltip: `${ui.monthLabels[row.month - 1]}\n${count(row.count)}`,
			emphasis: row.emphasis
		}))}
	/>
{:else if chart === 'trend'}
	<StackedColumnChart
		{ariaLabel}
		items={trendRows().map((row) => ({
			label: String(row.year),
			dead: row.dead,
			live: row.live,
			deadTooltip: `${row.year}${ui.chartYearSuffix}\n${ui.chartDeadLabel} ${count(row.dead)}`,
			liveTooltip: `${row.year}${ui.chartYearSuffix}\n${ui.chartLiveLabel} ${count(row.live)}`
		}))}
	/>
{/if}
