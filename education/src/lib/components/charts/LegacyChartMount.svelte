<script lang="ts">
	import { onMount } from 'svelte';
	import { hBar, colChart, stackChart } from '$lib/charts-legacy';
	import { useSite } from '$lib/copy';
	import { speciesRows, countyRows, causeRows, monthRows, trendRows } from '$lib/data/strandings';

	let { key }: { key: 'trend' | 'months' | 'counties' | 'causes' | 'species' } = $props();

	const site = useSite();

	let host: HTMLDivElement;

	function render(): void {
		const { copy, locale } = site();
		const ui = copy.uiCopy;
		const en = locale === 'en';
		const unit = en ? '' : ' 隻';
		if (key === 'species')
			hBar(
				host,
				speciesRows().map((s) => ({
					label: en ? s.nameEn : s.name,
					value: s.count,
					emphasis: s.emphasis,
					display: en
						? `${s.count} (${(s.share * 100).toFixed(1)}%)`
						: `${s.count} 隻（${(s.share * 100).toFixed(1)}%）`
				})),
				{ padL: en ? 190 : 96 }
			);
		if (key === 'counties')
			hBar(
				host,
				countyRows().map((c) => ({
					label: en ? c.nameEn : c.name,
					value: c.count,
					emphasis: c.offshoreIsland,
					display: `${c.count}${unit}`
				})),
				{ padL: en ? 110 : 96 }
			);
		if (key === 'causes')
			hBar(
				host,
				causeRows().map((c) => ({
					label: en ? c.nameEn : c.name,
					value: c.count,
					emphasis: c.emphasis,
					display: en
						? `${c.count} (${Math.round(c.share * 100)}%)`
						: `${c.count} 隻（${Math.round(c.share * 100)}%）`
				})),
				{ padL: en ? 240 : 150 }
			);
		if (key === 'months')
			colChart(
				host,
				monthRows().map((m) => ({
					label: ui.monthLabels[m.month - 1],
					value: m.count,
					emphasis: m.emphasis
				})),
				{ unit }
			);
		if (key === 'trend')
			stackChart(
				host,
				trendRows().map((t) => ({ label: String(t.year), dead: t.dead, live: t.live })),
				{
					unit,
					yearSuffix: ui.chartYearSuffix,
					deadLabel: ui.chartDeadLabel,
					liveLabel: ui.chartLiveLabel
				}
			);
	}

	onMount(() => {
		// Render on first visibility so the enter animation happens in view.
		const io = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						render();
						io.unobserve(entry.target);
					}
				}
			},
			{ threshold: 0.25 }
		);
		io.observe(host);

		let rt: ReturnType<typeof setTimeout>;
		const onResize = (): void => {
			clearTimeout(rt);
			rt = setTimeout(render, 250);
		};
		window.addEventListener('resize', onResize);

		return () => {
			io.disconnect();
			window.removeEventListener('resize', onResize);
			clearTimeout(rt);
		};
	});
</script>

<div bind:this={host} class="chart-host" data-chart={key}></div>

<style>
	.chart-host {
		min-height: 220px;
	}
</style>
