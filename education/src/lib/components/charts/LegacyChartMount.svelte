<script lang="ts">
	import { onMount } from 'svelte';
	import { hBar, colChart, stackChart } from '$lib/charts-legacy';
	import { useSite } from '$lib/copy';
	import {
		annualTotals,
		findBreakdown,
		findTotals,
		totalOf,
		shareOf,
		isWinterMonth
	} from '$lib/data/strandings';

	let { key }: { key: 'trend' | 'months' | 'counties' | 'causes' | 'species' } = $props();

	const site = useSite();

	let host: HTMLDivElement;

	function render(): void {
		const { copy, locale } = site();
		const ui = copy.uiCopy;
		const en = locale === 'en';
		const unit = en ? '' : ' 隻';
		const b = findBreakdown(2025)!;
		const grand = totalOf(findTotals(2025)!);
		if (key === 'species')
			hBar(
				host,
				b.species!.map((s) => ({
					label: en ? s.nameEn : s.name,
					value: s.count,
					emphasis: s.emphasis,
					display: en
						? `${s.count} (${(shareOf(s.count, grand) * 100).toFixed(1)}%)`
						: `${s.count} 隻（${(shareOf(s.count, grand) * 100).toFixed(1)}%）`
				})),
				{ padL: en ? 190 : 96 }
			);
		if (key === 'counties')
			hBar(
				host,
				b.counties!.map((c) => ({
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
				b.causes!.map((c) => ({
					label: en ? c.nameEn : c.name,
					value: c.count,
					emphasis: c.emphasis,
					display: en
						? `${c.count} (${Math.round(shareOf(c.count, grand) * 100)}%)`
						: `${c.count} 隻（${Math.round(shareOf(c.count, grand) * 100)}%）`
				})),
				{ padL: en ? 240 : 150 }
			);
		if (key === 'months')
			colChart(
				host,
				b.months!.map((m) => ({
					label: ui.monthLabels[m.month - 1],
					value: m.count,
					emphasis: isWinterMonth(m.month)
				})),
				{ unit }
			);
		if (key === 'trend')
			stackChart(
				host,
				annualTotals().map((t) => ({ label: String(t.period.year), dead: t.dead, live: t.live })),
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
