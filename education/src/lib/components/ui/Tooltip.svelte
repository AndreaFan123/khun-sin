<script lang="ts">
	// The single tooltip instance (#10), rendered once in the layout and driven
	// by whatever chart mark the pointer is over.
	import { tooltip } from '$lib/state/tooltip.svelte';

	let width = $state(0);

	// Follow the pointer, but flip to its left rather than overflow the viewport.
	const left = $derived(
		typeof window === 'undefined'
			? tooltip.x + 14
			: Math.min(tooltip.x + 14, window.innerWidth - width - 8)
	);
</script>

<div
	class="tooltip"
	class:visible={tooltip.visible}
	style="left: {left}px; top: {tooltip.y - 10}px"
	bind:clientWidth={width}
	aria-hidden="true"
>
	{tooltip.content}
</div>

<style>
	.tooltip {
		position: fixed;
		z-index: 99;
		pointer-events: none;
		background: var(--navy-900);
		color: var(--paper-50);
		padding: 8px 11px;
		border-radius: 9px;
		font-size: 0.82rem;
		line-height: 1.5;
		white-space: pre-line;
		max-width: 240px;
		opacity: 0;
		transition: opacity 0.12s;
	}
	.tooltip.visible {
		opacity: 1;
	}
	@media (prefers-reduced-motion: reduce) {
		.tooltip {
			transition: none;
		}
	}
</style>
