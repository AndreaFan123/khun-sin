<script lang="ts">
	// Monthly seasonality (#9). Same contract as the horizontal bars: pure
	// geometry, real values in the markup, CSS for the entrance.
	import { columnLayout } from '$lib/charts/layout';
	import { tooltip } from '$lib/actions/tooltip';

	export interface ColumnItem {
		label: string;
		value: number;
		tooltip: string;
		emphasis?: boolean;
	}

	let { items, ariaLabel }: { items: ColumnItem[]; ariaLabel: string } = $props();

	let containerWidth = $state(0);
	const width = $derived(containerWidth || 560);
	const layout = $derived(
		columnLayout(
			items.map((i) => i.value),
			{ width }
		)
	);
</script>

<div class="chart" bind:clientWidth={containerWidth}>
	<svg
		viewBox="0 0 {layout.width} {layout.height}"
		width="100%"
		height={layout.height}
		role="img"
		aria-label={ariaLabel}
	>
		{#each layout.ticks as tick (tick.value)}
			<line class="gridline" x1={layout.axisLeft} x2={layout.axisRight} y1={tick.y} y2={tick.y} />
			<text class="tick" x={layout.axisLeft - 6} y={tick.y + 3} text-anchor="end">{tick.value}</text
			>
		{/each}

		{#each items as item, index (item.label)}
			{@const column = layout.columns[index]}
			<rect
				class="bar"
				class:emphasis={item.emphasis}
				x={column.x}
				y={column.y}
				width={column.width}
				height={column.height}
				rx="5"
				style="animation-delay: {60 + index * 35}ms"
				use:tooltip={item.tooltip}
			/>
			<text class="tick" x={column.centreX} y={column.labelY} text-anchor="middle"
				>{item.label}</text
			>
			<text
				class="barvalue"
				x={column.centreX}
				y={column.valueY}
				text-anchor="middle"
				style="animation-delay: {420 + index * 35}ms">{item.value}</text
			>
		{/each}
	</svg>
</div>

<style>
	.chart {
		min-height: 220px;
	}
	svg {
		display: block;
	}
	.gridline {
		stroke: var(--border);
		stroke-width: 1;
	}
	.bar {
		fill: var(--chart-baseline);
		cursor: pointer;
		transform-box: fill-box;
		transform-origin: bottom center;
		animation: rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) backwards;
	}
	.bar.emphasis {
		fill: var(--chart-emphasis);
	}
	.barvalue {
		animation: fade 0.4s ease backwards;
	}
	@keyframes rise {
		from {
			transform: scaleY(0);
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
