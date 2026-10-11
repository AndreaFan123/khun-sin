<script lang="ts">
	import SpeciesCard from '$lib/components/ui/SpeciesCard.svelte';
	import { useSite } from '$lib/copy';

	const site = useSite();
	const c = $derived(site().copy);
	const imageSourceLabel = $derived(site().locale === 'en' ? 'Image source:' : '圖片來源：');
	const redListLabel = $derived(site().locale === 'en' ? 'IUCN Red List' : 'IUCN 紅色名錄');
	const speciesLabel = $derived(site().locale === 'en' ? 'Cetacean species' : '鯨豚物種');
</script>

<section aria-label={speciesLabel}>
	<div class="wrap">
		<div class="cards">
			{#each c.speciesCards as card (card.name)}
				<SpeciesCard {card} as="h2" {imageSourceLabel} {redListLabel} />
			{/each}
		</div>
	</div>
</section>

<style>
	section {
		padding: 92px 0;
	}
	.cards {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 20px;
	}
	@media (max-width: 720px) {
		.cards {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 860px) {
		section {
			padding: 64px 0;
		}
	}
</style>
