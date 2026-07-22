<script lang="ts">
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	import TaiwanMap from '$lib/components/charts/TaiwanMap.svelte';
	import { useSite } from '$lib/copy';

	const site = useSite();
	const head = $derived(site().copy.sectionHeads.map);
	const ui = $derived(site().copy.uiCopy);
</script>

<section id="map">
	<div class="wrap">
		<SectionHead onDark eyebrow={head.eyebrow} title={head.title} lead={head.lead} />

		<TaiwanMap />

		<div class="legend">
			<span class="li"><span class="sw offshore"></span>{ui.mapLegendOffshore}</span>
			<span class="li"><span class="sw main"></span>{ui.mapLegendMain}</span>
			<span class="note">{ui.mapLegendNote}</span>
		</div>
	</div>
</section>

<style>
	section {
		padding: 92px 0;
		background: var(--bg-band-darker);
	}
	.legend {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 20px;
		margin-top: 28px;
		font-size: 0.9rem;
		color: var(--text-on-dark-secondary);
	}
	.li {
		display: inline-flex;
		align-items: center;
		gap: 7px;
	}
	.sw {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		display: inline-block;
	}
	.sw.offshore {
		background: var(--accent);
	}
	.sw.main {
		background: var(--slate-300);
	}
	.note {
		color: var(--text-muted);
	}
	@media (max-width: 860px) {
		section {
			padding: 64px 0;
		}
	}
</style>
