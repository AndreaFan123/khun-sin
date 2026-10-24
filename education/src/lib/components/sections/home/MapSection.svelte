<script lang="ts">
	import Breadcrumbs from '$lib/components/ui/Breadcrumbs.svelte';
	import type { SpeciesScope } from '$lib/navigation';
	import { speciesToolCopy } from '$lib/navigation';
	let { scope }: { scope: SpeciesScope } = $props();
	import DataContext from '$lib/components/ui/DataContext.svelte';
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	import CountyTable from '$lib/components/ui/CountyTable.svelte';
	import TaiwanMap from '$lib/components/charts/TaiwanMap.svelte';
	import { useSite } from '$lib/copy';
	import { countyRows } from '$lib/data/strandings';
	import { turtleCountyRows } from '$lib/data/turtle-strandings';

	const site = useSite();
	const head = $derived({
		...site().copy.sectionHeads.map,
		...speciesToolCopy(site().locale, scope, 'map'),
		lead: speciesToolCopy(site().locale, scope, 'map').description
	});
	const ui = $derived(site().copy.uiCopy);
	const animals = $derived(site().copy.mapAnimalCopy);
</script>

<section id="map" data-species={scope}>
	<div class="wrap">
		<Breadcrumbs />
		<SectionHead as="h1" eyebrow={head.eyebrow} title={head.title} lead={head.lead} />

		<div class="maps">
			{#if scope === 'cetaceans'}<article id="cetaceans" tabindex="-1" class="map-card">
					<div class="map-copy">
						<h2>{animals.cetacean.title}</h2>
						<p>{animals.cetacean.lead}</p>
						<DataContext map />
					</div>
					<TaiwanMap
						rows={countyRows()}
						ariaLabel={animals.cetacean.ariaLabel}
						labelledNames={animals.cetacean.labelledNames}
						filterId="cetacean-dot-glow"
					/>
					<CountyTable rows={countyRows()} />
				</article>
			{:else}<article id="sea-turtles" tabindex="-1" class="map-card">
					<div class="map-copy">
						<h2>{animals.seaTurtle.title}</h2>
						<p>{animals.seaTurtle.lead}</p>
						<!-- <DataContext map turtle /> -->
					</div>
					<TaiwanMap
						rows={turtleCountyRows()}
						ariaLabel={animals.seaTurtle.ariaLabel}
						labelledNames={animals.seaTurtle.labelledNames}
						filterId="turtle-dot-glow"
					/>
					<CountyTable rows={turtleCountyRows()} />
				</article>
			{/if}
		</div>

		<div class="legend">
			<span class="li"><span class="sw offshore"></span>{ui.mapLegendOffshore}</span>
			<span class="li"><span class="sw main"></span>{ui.mapLegendMain}</span>
			<span class="note">{ui.mapLegendNote}</span>
		</div>
	</div>
</section>

<style>
	.map-copy {
		color: var(--text-secondary);
	}
	section {
		padding: 92px 0;
		background: var(--bg);
	}
	.maps {
		display: grid;
		grid-template-columns: minmax(0, 1220px);
		justify-content: center;
		gap: 26px;
	}
	.map-card {
		background: var(--bg-card);
		padding: 28px 24px 18px;
		border: 1px solid var(--border);
		border-radius: var(--radius);
	}
	.map-copy h2 {
		color: var(--text-primary);
		font-size: 1.6rem;
	}
	.map-copy p {
		margin-top: 8px;
		color: var(--text-secondary);
	}
	.legend {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 20px;
		margin-top: 28px;
		font-size: 0.9rem;
		color: var(--text-secondary);
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
		background: var(--map-emphasis);
	}
	.sw.main {
		background: var(--map-marker);
	}
	.note {
		color: var(--text-muted);
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
