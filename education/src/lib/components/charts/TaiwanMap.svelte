<script lang="ts">
	// County bubble map (frontend architecture, "Interactive map"): real land
	// outline + one glowing dot per county, radius ∝ √count. Fully prerendered
	// static SVG; the pulse is progressive enhancement and honors
	// prefers-reduced-motion.
	import { landPath, mapWidth, mapHeight, countyPointFor } from '$lib/data/taiwan-geo';
	import { useSite } from '$lib/copy';
	import type { CountyRow } from '$lib/data/strandings';

	let {
		rows,
		ariaLabel,
		labelledNames,
		filterId
	}: {
		rows: CountyRow[];
		ariaLabel: string;
		labelledNames: string[];
		filterId: string;
	} = $props();

	const site = useSite();
	const en = $derived(site().locale === 'en');

	const dots = $derived(
		rows.map((c) => {
			const p = countyPointFor(c.name);
			if (!p) throw new Error(`No map coordinate for ${c.name}`);
			return { ...c, x: p.x, y: p.y, r: 2.6 * Math.sqrt(c.count) };
		})
	);

	const labelled = $derived(new Set(labelledNames));
</script>

<svg viewBox="0 0 {mapWidth} {mapHeight}" role="img" aria-label={ariaLabel}>
	<defs>
		<filter id={filterId} x="-80%" y="-80%" width="260%" height="260%">
			<feGaussianBlur stdDeviation="5" />
		</filter>
	</defs>

	<path class="land" d={landPath} />

	{#each dots as d (d.name)}
		<g class="dot" class:emphasis={d.emphasis}>
			<circle class="halo" cx={d.x} cy={d.y} r={d.r * 1.45} filter={'url(#' + filterId + ')'} />
			<circle class="core" cx={d.x} cy={d.y} r={d.r}>
				<title>{en ? `${d.nameEn}: ${d.count}` : `${d.name}：${d.count} 隻`}</title>
			</circle>
			{#if labelled.has(d.name)}
				<text class="lbl" x={d.x + d.r + 8} y={d.y + 5}
					>{en ? d.nameEn : d.name.replace('縣', '').replace('市', '')} {d.count}</text
				>
			{/if}
		</g>
	{/each}
</svg>

<style>
	svg {
		display: block;
		width: 100%;
		max-width: 700px;
		margin: 0 auto;
		height: auto;
	}
	.land {
		fill: var(--map-land);
		stroke: var(--map-outline);
		stroke-width: 2;
	}
	.core {
		fill: var(--map-marker);
	}
	.halo {
		fill: var(--map-marker);
		opacity: 0.18;
		transform-box: fill-box;
		transform-origin: center;
		animation: breathe 2.6s ease-in-out infinite;
	}
	.emphasis .core {
		fill: var(--map-emphasis);
	}
	.emphasis .halo {
		fill: var(--map-emphasis);
		opacity: 0.22;
	}
	.lbl {
		fill: var(--map-label);
		font-size: 14px;
	}
	@keyframes breathe {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.22;
		}
		50% {
			transform: scale(1.12);
			opacity: 0.2;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.halo {
			animation: none;
		}
	}
</style>
