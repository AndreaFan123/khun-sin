<script lang="ts">
	// County bubble map (frontend architecture, "Interactive map"): real land
	// outline + one glowing dot per county, radius ∝ √count. Fully prerendered
	// static SVG; the pulse is progressive enhancement and honors
	// prefers-reduced-motion.
	import { landPath, mapWidth, mapHeight, countyPoints } from '$lib/data/taiwan-geo';
	import { findBreakdown } from '$lib/data/strandings';
	import { useSite } from '$lib/copy';

	const site = useSite();
	const en = $derived(site().locale === 'en');
	const ui = $derived(site().copy.uiCopy);

	const counties = findBreakdown(2025)!.counties!;

	const dots = counties.map((c) => {
		const p = countyPoints.find((pt) => pt.name === c.name)!;
		return { ...c, x: p.x, y: p.y, r: 2.6 * Math.sqrt(c.count) };
	});

	const labelled = new Set(['連江縣', '金門縣', '澎湖縣', '宜蘭縣']);
</script>

<svg viewBox="0 0 {mapWidth} {mapHeight}" role="img" aria-label={ui.mapAriaLabel}>
	<defs>
		<filter id="dot-glow" x="-80%" y="-80%" width="260%" height="260%">
			<feGaussianBlur stdDeviation="5" />
		</filter>
	</defs>

	<path class="land" d={landPath} />

	{#each dots as d (d.name)}
		<g class="dot" class:offshore={d.offshoreIsland}>
			<circle class="halo" cx={d.x} cy={d.y} r={d.r * 1.9} filter="url(#dot-glow)" />
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
		max-width: 560px;
		margin: 0 auto;
		height: auto;
	}
	.land {
		fill: var(--navy-700);
		stroke: var(--border-on-dark);
		stroke-width: 0.8;
	}
	.core {
		fill: var(--slate-300);
	}
	.halo {
		fill: var(--slate-300);
		opacity: 0.4;
		transform-box: fill-box;
		transform-origin: center;
		animation: breathe 2.6s ease-in-out infinite;
	}
	.offshore .core {
		fill: var(--accent);
	}
	.offshore .halo {
		fill: var(--accent);
		opacity: 0.5;
	}
	.lbl {
		fill: var(--text-on-dark);
		font-size: 14px;
	}
	@keyframes breathe {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.45;
		}
		50% {
			transform: scale(1.25);
			opacity: 0.2;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.halo {
			animation: none;
		}
	}
</style>
