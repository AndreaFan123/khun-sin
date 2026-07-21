<script lang="ts">
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	import ChartCard from '$lib/components/charts/ChartCard.svelte';
	import LegacyChartMount from '$lib/components/charts/LegacyChartMount.svelte';
	import { chartCards } from '$lib/data/site';

	const byKey = (key: string) => chartCards.find((c) => c.key === key)!;
</script>

<section id="data" class="band-dark">
	<div class="wrap">
		<SectionHead
			onDark
			eyebrow="數據"
			title="數字背後，是一片承壓的海"
			lead="「擱淺」是鯨豚因傷病、迷航或死亡而被沖上岸的現象。它像海洋的體檢報告：擱淺的種類、地點、季節與死因，透露著整個海域的健康狀態。以下數據來自海保署「海保救援網（MARN）」的官方擱淺報告。"
		/>

		<div class="grid two">
			<ChartCard copy={byKey('trend')}><LegacyChartMount key="trend" /></ChartCard>
			<ChartCard copy={byKey('months')}><LegacyChartMount key="months" /></ChartCard>
		</div>
		<div class="grid two">
			<ChartCard copy={byKey('counties')}><LegacyChartMount key="counties" /></ChartCard>
			<ChartCard copy={byKey('causes')}><LegacyChartMount key="causes" /></ChartCard>
		</div>
		<div class="grid">
			<ChartCard copy={byKey('species')}><LegacyChartMount key="species" /></ChartCard>
		</div>
	</div>
</section>

<style>
	section {
		padding: 92px 0;
	}
	.band-dark {
		background: var(--bg-band-dark);
	}
	.grid {
		display: grid;
		gap: 26px;
		margin-top: 26px;
	}
	.grid:first-of-type {
		margin-top: 0;
	}
	.grid.two {
		grid-template-columns: 1fr 1fr;
	}
	@media (max-width: 860px) {
		section {
			padding: 64px 0;
		}
		.grid.two {
			grid-template-columns: 1fr;
		}
	}
</style>
