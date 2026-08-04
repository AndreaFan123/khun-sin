<script lang="ts">
	// Species, counties and causes all render through this (#8). Geometry comes
	// from a pure function; the component only maps it to elements.
	//
	// The bars carry their true width in the markup and grow via a CSS
	// animation, so the prerendered HTML already contains every label and value
	// — which is what makes the figures readable to crawlers that do not run
	// JavaScript.
	import { hBarLayout } from '$lib/charts/layout';
	import { tooltip } from '$lib/actions/tooltip';

	export interface BarItem {
		label: string;
		value: number;
		/** Formatted value drawn at the bar's end. */
		display: string;
		tooltip: string;
		emphasis?: boolean;
	}

	let {
		items,
		padLeft = 96,
		ariaLabel
	}: { items: BarItem[]; padLeft?: number; ariaLabel: string } = $props();

	let containerWidth = $state(0);
	/** Sensible width for prerendering, replaced the moment the container is measured. */
	const width = $derived(containerWidth || 560);
	const layout = $derived(hBarLayout(items, { width, padLeft }));
</script>

<div class="chart" bind:clientWidth={containerWidth}>
	<svg
		viewBox="0 0 {layout.width} {layout.height}"
		width="100%"
		height={layout.height}
		role="img"
		aria-label={ariaLabel}
	>
		{#each items as item, index (item.label)}
			{@const row = layout.rows[index]}
			<text
				class="barlabel"
				class:emphasis={item.emphasis}
				x={row.labelX}
				y={row.labelY}
				text-anchor="end"
				dominant-baseline="middle">{item.label}</text
			>
			<rect
				class="bar"
				class:emphasis={item.emphasis}
				x={row.x}
				y={row.y}
				width={row.width}
				height={row.height}
				rx="5"
				style="animation-delay: {60 + index * 45}ms"
				use:tooltip={item.tooltip}
			/>
			<text
				class="barvalue"
				class:inside={row.valueInside}
				class:emphasis={item.emphasis}
				x={row.valueX}
				y={row.labelY}
				text-anchor={row.valueAnchor}
				dominant-baseline="middle"
				style="animation-delay: {380 + index * 45}ms">{item.display}</text
			>
		{/each}
	</svg>
</div>

<style>
	.chart {
		min-height: 120px;
	}
	svg {
		display: block;
	}
	.bar {
		fill: var(--chart-baseline);
		cursor: pointer;
		transform-box: fill-box;
		transform-origin: left center;
		animation: grow 0.9s cubic-bezier(0.22, 1, 0.36, 1) backwards;
	}
	.bar.emphasis {
		fill: var(--chart-emphasis);
	}
	.barlabel.emphasis {
		fill: var(--text-primary);
		font-weight: 700;
	}
	.barvalue {
		animation: fade 0.4s ease backwards;
	}
	/* Inside the bar the label sits on the fill, so it takes the contrasting ink. */
	.barvalue.inside {
		fill: var(--paper-50);
	}
	.barvalue.inside.emphasis {
		fill: var(--navy-900);
	}
	@keyframes grow {
		from {
			transform: scaleX(0);
		}
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.bar,
		.barvalue {
			animation: none;
		}
	}
</style>
