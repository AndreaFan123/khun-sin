<script lang="ts">
	// Band-boundary divider (fix/tweak_ui): the next section's color rises like
	// a sea surface — the topographic/wave motif from the brand exploration.
	// Two modes, both flat (no gradients, no shadows):
	// - default: one filled wave + two fading contour-line echoes above the crest
	// - layered: `layers` stacks intermediate filled waves between `from` and
	//   `to`, light-to-deep — a stepped sea cross-section (deepest = `from`)
	let {
		from,
		to,
		height = 80,
		flip = false,
		layers = [],
		stroke
	}: {
		from: string;
		to: string;
		height?: number;
		flip?: boolean;
		layers?: string[];
		/** Contour-echo color override — needed when from/to are close in value
		 *  (e.g. two dark bands) and the default `to`-colored echoes vanish. */
		stroke?: string;
	} = $props();

	// Multi-crest path with sloped tangents at both ends — a single-period
	// wave goes near-horizontal at the edges, and preserveAspectRatio="none"
	// flattens it further on wide screens.
	const crest =
		'M0,52 C120,20 260,96 420,64 C580,32 700,100 860,72 C1020,44 1160,104 1300,60 C1370,38 1410,42 1440,56';
	const filled = `${crest} L1440,120 L0,120 Z`;
	const step = $derived(layers.length ? Math.round(60 / (layers.length + 1)) : 0);
</script>

<div class="divider" style="background:{from}" aria-hidden="true">
	<svg
		viewBox="0 0 1440 120"
		preserveAspectRatio="none"
		style="height:{height}px"
		class:flip
		role="presentation"
	>
		{#if layers.length}
			{#each layers as color, i (color)}
				<path d={filled} transform="translate(0,{i * step})" fill={color} />
			{/each}
			<path d={filled} transform="translate(0,{layers.length * step})" fill={to} />
		{:else}
			<path
				d={crest}
				transform="translate(0,-24)"
				fill="none"
				stroke={stroke ?? to}
				stroke-width="1.5"
				opacity="0.16"
				vector-effect="non-scaling-stroke"
			/>
			<path
				d={crest}
				transform="translate(0,-12)"
				fill="none"
				stroke={stroke ?? to}
				stroke-width="1.5"
				opacity="0.36"
				vector-effect="non-scaling-stroke"
			/>
			{#if stroke}
				<path
					d={crest}
					fill="none"
					{stroke}
					stroke-width="1.5"
					opacity="0.6"
					vector-effect="non-scaling-stroke"
				/>
			{/if}
			<path d={filled} fill={to} />
		{/if}
	</svg>
</div>

<style>
	.divider {
		line-height: 0;
	}
	svg {
		display: block;
		width: 100%;
	}
	svg.flip {
		transform: scaleX(-1);
	}
</style>
