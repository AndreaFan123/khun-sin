<script lang="ts">
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	import SpeciesCard from '$lib/components/ui/SpeciesCard.svelte';
	import { speciesCards } from '$lib/data/site';
</script>

<section id="know">
	<div class="wrap">
		<SectionHead
			eyebrow="認識台灣的鯨豚"
			title="一座被鯨豚環繞的島嶼"
			lead="台灣位在黑潮與大陸棚交會處，海域生產力豐沛。長期調查已在台灣周邊記錄到約 30 種鯨豚，接近全球種類的三分之一——從沿岸的白海豚到深海的抹香鯨，這裡是名副其實的鯨豚多樣性熱點。光是 2025 一年，就有 21 種鯨豚被記錄到擱淺。"
		/>
		<div class="cards">
			{#each speciesCards as card (card.name)}
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
