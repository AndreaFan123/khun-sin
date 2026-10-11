<script lang="ts">
	import { onMount } from 'svelte';
	import { hBar, colChart, stackChart } from '$lib/charts-legacy';
	import { useSite } from '$lib/copy';
	import {
		speciesRows as cetaceanSpeciesRows,
		countyRows as cetaceanCountyRows,
		causeRows as cetaceanCauseRows,
		monthRows,
		trendRows as cetaceanTrendRows
	} from '$lib/data/strandings';
	import {
		turtleSpeciesRows,
		turtleCountyRows,
		turtleCauseRows,
		turtleTrendRows
	} from '$lib/data/turtle-strandings';

	let {
		key,
		animalGroup = 'cetacean'
	}: {
		key: 'trend' | 'months' | 'counties' | 'causes' | 'species';
		animalGroup?: 'cetacean' | 'seaTurtle';
	} = $props();

	const site = useSite();

	let host: HTMLDivElement;

	function render(): void {
		const { copy, locale } = site();
		const ui = copy.uiCopy;
		const en = locale === 'en';
		const unit = en ? '' : ' 隻';
		const species = animalGroup === 'seaTurtle' ? turtleSpeciesRows() : cetaceanSpeciesRows();
		const counties = animalGroup === 'seaTurtle' ? turtleCountyRows() : cetaceanCountyRows();
		const causes = animalGroup === 'seaTurtle' ? turtleCauseRows() : cetaceanCauseRows();
		const trends = animalGroup === 'seaTurtle' ? turtleTrendRows() : cetaceanTrendRows();
		if (key === 'species')
			hBar(
				host,
				species.map((s) => ({
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
				counties.map((c) => ({
					label: en ? c.nameEn : c.name,
					value: c.count,
					emphasis: c.emphasis,
					display: `${c.count}${unit}`
				})),
				{ padL: en ? 110 : 96 }
			);
		if (key === 'causes')
			hBar(
				host,
				causes.map((c) => ({
					label: en ? c.nameEn : c.name,
					value: c.count,
					emphasis: c.emphasis,
					display: en
						? `${c.count} (${Math.round(c.share * 100)}%)`
						: `${c.count} 隻（${Math.round(c.share * 100)}%）`
				})),
				{ padL: en ? 240 : 150 }
			);
		if (key === 'months' && animalGroup === 'cetacean')
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
				trends.map((t) => ({ label: String(t.year), dead: t.dead, live: t.live })),
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
