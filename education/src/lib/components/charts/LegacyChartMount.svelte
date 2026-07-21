<script lang="ts">
	import { onMount } from 'svelte';
	import { hBar, colChart, stackChart } from '$lib/charts-legacy';
	import {
		annualTotals,
		findBreakdown,
		findTotals,
		totalOf,
		shareOf,
		isWinterMonth
	} from '$lib/data/strandings';

	let { key }: { key: 'trend' | 'months' | 'counties' | 'causes' | 'species' } = $props();

	let host: HTMLDivElement;

	function render(): void {
		const b = findBreakdown(2025)!;
		const grand = totalOf(findTotals(2025)!);
		if (key === 'species')
			hBar(
				host,
				b.species!.map((s) => ({
					label: s.name,
					value: s.count,
					emphasis: s.emphasis,
					display: `${s.count} 隻（${(shareOf(s.count, grand) * 100).toFixed(1)}%）`
				}))
			);
		if (key === 'counties')
			hBar(
				host,
				b.counties!.map((c) => ({
					label: c.name,
					value: c.count,
					emphasis: c.offshoreIsland,
					display: `${c.count} 隻`
				}))
			);
		if (key === 'causes')
			hBar(
				host,
				b.causes!.map((c) => ({
					label: c.name,
					value: c.count,
					emphasis: c.emphasis,
					display: `${c.count} 隻（${Math.round(shareOf(c.count, grand) * 100)}%）`
				})),
				{ padL: 150 }
			);
		if (key === 'months')
			colChart(
				host,
				b.months!.map((m) => ({
					label: `${m.month}月`,
					value: m.count,
					emphasis: isWinterMonth(m.month)
				}))
			);
		if (key === 'trend')
			stackChart(
				host,
				annualTotals().map((t) => ({ label: String(t.period.year), dead: t.dead, live: t.live }))
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
