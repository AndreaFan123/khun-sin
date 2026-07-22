<script lang="ts">
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	import ChartCard from '$lib/components/charts/ChartCard.svelte';
	import LegacyChartMount from '$lib/components/charts/LegacyChartMount.svelte';
	import { useSite } from '$lib/copy';

	const site = useSite();
	const head = $derived(site().copy.sectionHeads.data);
	const byKey = (key: string) => site().copy.chartCards.find((c) => c.key === key)!;
</script>

<section id="data" class="band-dark">
	<div class="wrap">
		<SectionHead onDark eyebrow={head.eyebrow} title={head.title} lead={head.lead} />

		<div class="grid two">
			<ChartCard copy={byKey('trend')}><LegacyChartMount key="trend" /></ChartCard>
			<ChartCard copy={byKey('months')}><LegacyChartMount key="months" /></ChartCard>
		</div>
		<div class="grid">
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
