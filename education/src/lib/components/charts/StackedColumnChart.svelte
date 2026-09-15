<script lang="ts">
	// The seven-year trend (#9): dead below, live above, total labelled on top.
	// The two segments animate as one column so the stack never appears to
	// separate mid-flight.
	import { stackedLayout } from '$lib/charts/layout';
	import { describeChart } from '$lib/charts/describe';
	import { tooltip } from '$lib/actions/tooltip';
	import { reveal } from '$lib/actions/reveal';

	export interface StackedItem {
		label: string;
		dead: number;
		live: number;
		deadTooltip: string;
		liveTooltip: string;
	}

	let { items, ariaLabel }: { items: StackedItem[]; ariaLabel: string } = $props();

	let containerWidth = $state(0);
	const width = $derived(containerWidth || 560);
	const layout = $derived(stackedLayout(items, { width }));
	const descriptionId = $props.id();
	const description = $derived(
		describeChart(items.flatMap((item) => [item.deadTooltip, item.liveTooltip]))
	);
</script>

<div class="chart" use:reveal bind:clientWidth={containerWidth}>
	<svg
		viewBox="0 0 {layout.width} {layout.height}"
		width="100%"
		height={layout.height}
		role="img"
		aria-label={ariaLabel}
		aria-describedby={descriptionId}
	>
		<desc id={descriptionId}>{description}</desc>
		{#each layout.ticks as tick (tick.value)}
			<line class="gridline" x1={layout.axisLeft} x2={layout.axisRight} y1={tick.y} y2={tick.y} />
			<text class="tick" x={layout.axisLeft - 6} y={tick.y + 3} text-anchor="end">{tick.value}</text
			>
		{/each}

		{#each items as item, index (item.label)}
			{@const column = layout.columns[index]}
			<g class="stack" style="animation-delay: {60 + index * 50}ms">
				<rect
					class="segment dead"
					x={column.x}
					y={column.deadY}
					width={column.width}
					height={column.deadHeight}
					use:tooltip={item.deadTooltip}
				/>
				<rect
					class="segment live"
					x={column.x}
					y={column.liveY}
					width={column.width}
					height={column.liveHeight}
					rx="4"
					use:tooltip={item.liveTooltip}
				/>
			</g>
			<text
				class="barvalue"
				x={column.centreX}
				y={column.totalY}
				text-anchor="middle"
				style="animation-delay: {460 + index * 50}ms">{item.dead + item.live}</text
			>
			<text class="tick" x={column.centreX} y={column.labelY} text-anchor="middle"
				>{item.label}</text
			>
		{/each}
	</svg>
</div>

<style>
	.chart {
		min-height: 240px;
	}
	svg {
		display: block;
	}
	.gridline {
		stroke: var(--border);
		stroke-width: 1;
	}
	.stack {
		transform-box: fill-box;
		transform-origin: bottom center;
	}
	.segment {
		cursor: pointer;
	}
	.segment.dead {
		fill: var(--chart-muted);
	}
	.segment.live {
		fill: var(--chart-emphasis);
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
	/* The entrance is opt-in, not opt-out: stated as no-preference so it can
	   never out-specify a reduce rule. Without motion — or without JS, since
	   `revealed` is set by an observer — the chart is simply already there. */
	@media (prefers-reduced-motion: no-preference) {
		.chart:global(.revealed) .stack {
			animation: rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) backwards;
		}
		.chart:global(.revealed) .barvalue {
			animation: fade 0.4s ease backwards;
		}
	}
</style>
