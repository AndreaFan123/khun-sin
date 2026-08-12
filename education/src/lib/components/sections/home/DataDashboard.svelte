<script lang="ts">
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	import ChartCard from '$lib/components/charts/ChartCard.svelte';
	import StrandingChart from '$lib/components/sections/home/StrandingChart.svelte';
	import { useSite } from '$lib/copy';

	const site = useSite();
	const head = $derived(site().copy.sectionHeads.data);
	const byKey = (key: string) => site().copy.chartCards.find((c) => c.key === key)!;
</script>

<section id="data" class="band-dark">
	<div class="wrap">
		<SectionHead onDark eyebrow={head.eyebrow} title={head.title} lead={head.lead} />

		<div class="grid two">
			<ChartCard copy={byKey('trend')}><StrandingChart chart="trend" /></ChartCard>
			<ChartCard copy={byKey('months')}><StrandingChart chart="months" /></ChartCard>
		</div>
		<div class="grid">
			<ChartCard copy={byKey('counties')}><StrandingChart chart="counties" /></ChartCard>
			<ChartCard copy={byKey('causes')}><StrandingChart chart="causes" /></ChartCard>
		</div>
		<div class="grid">
			<ChartCard copy={byKey('species')}><StrandingChart chart="species" /></ChartCard>
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
