<script lang="ts">
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	import TaiwanMap from '$lib/components/charts/TaiwanMap.svelte';
	import { useSite } from '$lib/copy';
	import { countyRows } from '$lib/data/strandings';
	import { turtleCountyRows } from '$lib/data/turtle-strandings';

	const site = useSite();
	const head = $derived(site().copy.sectionHeads.map);
	const ui = $derived(site().copy.uiCopy);
	const animals = $derived(site().copy.mapAnimalCopy);
</script>

<section id="map">
	<div class="wrap">
		<SectionHead onDark as="h1" eyebrow={head.eyebrow} title={head.title} lead={head.lead} />

		<div class="maps">
			<article class="map-card">
				<div class="map-copy">
					<h2>{animals.cetacean.title}</h2>
					<p>{animals.cetacean.lead}</p>
				</div>
				<TaiwanMap
					rows={countyRows()}
					ariaLabel={animals.cetacean.ariaLabel}
					labelledNames={animals.cetacean.labelledNames}
					filterId="cetacean-dot-glow"
				/>
			</article>
			<article class="map-card">
				<div class="map-copy">
					<h2>{animals.seaTurtle.title}</h2>
					<p>{animals.seaTurtle.lead}</p>
				</div>
				<TaiwanMap
					rows={turtleCountyRows()}
					ariaLabel={animals.seaTurtle.ariaLabel}
					labelledNames={animals.seaTurtle.labelledNames}
					filterId="turtle-dot-glow"
				/>
			</article>
		</div>

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
	.maps {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 26px;
	}
	.map-card {
		padding: 28px 24px 18px;
		border: 1px solid var(--border-on-dark);
		border-radius: var(--radius);
		background: var(--navy-800);
	}
	.map-copy {
		min-height: 142px;
	}
	.map-copy h2 {
		color: var(--text-on-dark);
		font-size: 1.6rem;
	}
	.map-copy p {
		margin-top: 8px;
		color: var(--text-on-dark-secondary);
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
		/* Dimmest on-dark step that still clears 4.5:1 (6.7:1 on navy-900).
		   --text-muted is a light-surface token and fails here at 2.9:1. */
		color: var(--slate-400);
	}
	@media (max-width: 860px) {
		section {
			padding: 64px 0;
		}
		.maps {
			grid-template-columns: 1fr;
		}
		.map-copy {
			min-height: 0;
		}
	}
</style>
