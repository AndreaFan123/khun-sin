<script lang="ts">
	let { variant }: { variant: 'hero' | 'footer' } = $props();
</script>

<svg
	viewBox={variant === 'hero' ? '0 0 1600 900' : '0 0 1600 500'}
	preserveAspectRatio="xMaxYMax slice"
	aria-hidden="true"
	focusable="false"
>
	{#if variant === 'hero'}
		<path class="back" d="M650 900 C930 780 870 650 1130 600 S1440 470 1600 190 V900 Z" />
		<path class="middle" d="M780 900 C1040 800 1010 710 1250 680 S1480 600 1600 460 V900 Z" />
		<path class="front" d="M960 900 C1170 840 1190 800 1360 770 S1530 710 1600 650 V900 Z" />
	{:else}
		<path class="back" d="M350 500 C650 470 640 290 960 270 S1390 160 1600 -30 V500 Z" />
		<path class="middle" d="M650 500 C900 460 970 360 1160 330 S1450 250 1600 120 V500 Z" />
		<path class="front" d="M950 500 C1110 460 1190 410 1350 400 S1510 340 1600 290 V500 Z" />
	{/if}
</svg>

<style>
	svg {
		display: block;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
	.back {
		fill: var(--wave-back);
	}
	.middle {
		fill: var(--wave-middle);
	}
	.front {
		fill: var(--wave-front);
	}
</style>
