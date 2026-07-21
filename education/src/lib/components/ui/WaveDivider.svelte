<script lang="ts">
	// Band-boundary divider (fix/tweak_ui): the next section's color rises like
	// a sea surface, with contour-line echoes above the crest — the
	// topographic/wave motif from the brand exploration. Pure strokes + one
	// flat fill; no gradients, no shadows.
	let {
		from,
		to,
		height = 80,
		flip = false
	}: { from: string; to: string; height?: number; flip?: boolean } = $props();

	const crest = 'M0,64 C240,108 480,12 720,40 C960,68 1200,116 1440,72';
</script>

<div class="divider" style="background:{from}" aria-hidden="true">
	<svg
		viewBox="0 0 1440 120"
		preserveAspectRatio="none"
		style="height:{height}px"
		class:flip
		role="presentation"
	>
		<path
			d={crest}
			transform="translate(0,-24)"
			fill="none"
			stroke={to}
			stroke-width="1.5"
			opacity="0.16"
			vector-effect="non-scaling-stroke"
		/>
		<path
			d={crest}
			transform="translate(0,-12)"
			fill="none"
			stroke={to}
			stroke-width="1.5"
			opacity="0.36"
			vector-effect="non-scaling-stroke"
		/>
		<path d="{crest} L1440,120 L0,120 Z" fill={to} />
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
