<script lang="ts">
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	import SpeciesCard from '$lib/components/ui/SpeciesCard.svelte';
	import { useSite } from '$lib/copy';

	const site = useSite();
	const c = $derived(site().copy);
	const head = $derived(c.sectionHeads.know);
</script>

<section id="know">
	<div class="wrap">
		<SectionHead eyebrow={head.eyebrow} title={head.title} lead={head.lead} />
		<div class="cards">
			{#each c.speciesCards as card (card.name)}
				<SpeciesCard {card} />
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
		grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
		gap: 20px;
	}
	@media (max-width: 860px) {
		section {
			padding: 64px 0;
		}
	}
</style>
