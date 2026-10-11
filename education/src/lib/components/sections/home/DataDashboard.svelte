<script lang="ts">
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	import ChartCard from '$lib/components/charts/ChartCard.svelte';
	import StrandingChart from '$lib/components/sections/home/StrandingChart.svelte';
	import { useSite } from '$lib/copy';

	const site = useSite();
	const head = $derived(site().copy.sectionHeads.data);
	const byKey = (key: string) => site().copy.chartCards.find((c) => c.key === key)!;
	const turtleByKey = (key: string) => site().copy.turtleChartCards.find((c) => c.key === key)!;
	const animals = $derived(site().copy.dataAnimalCopy);
</script>

<section id="data" class="band-dark">
	<div class="wrap">
		<SectionHead onDark as="h1" eyebrow={head.eyebrow} title={head.title} lead={head.lead} />
		<div class="animal-head">
			<span>{animals.cetacean.eyebrow}</span>
			<h2>{animals.cetacean.title}</h2>
			<p>{animals.cetacean.lead}</p>
		</div>
		<div class="grid two first-grid">
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

		<div class="animal-head turtle-head">
			<span>{animals.seaTurtle.eyebrow}</span>
			<h2>{animals.seaTurtle.title}</h2>
			<p>{animals.seaTurtle.lead}</p>
		</div>
		<div class="grid two first-grid">
			<ChartCard copy={turtleByKey('trend')}>
				<StrandingChart chart="trend" animalGroup="seaTurtle" />
			</ChartCard>
			<ChartCard copy={turtleByKey('counties')}>
				<StrandingChart chart="counties" animalGroup="seaTurtle" />
			</ChartCard>
		</div>
		<div class="grid two">
			<ChartCard copy={turtleByKey('causes')}>
				<StrandingChart chart="causes" animalGroup="seaTurtle" />
			</ChartCard>
			<ChartCard copy={turtleByKey('species')}>
				<StrandingChart chart="species" animalGroup="seaTurtle" />
			</ChartCard>
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
	.first-grid {
		margin-top: 0;
	}
	.grid.two {
		grid-template-columns: 1fr 1fr;
	}
	.animal-head {
		max-width: 780px;
		margin: 0 0 26px;
		padding-top: 6px;
	}
	.animal-head span {
		display: block;
		margin-bottom: 8px;
		color: var(--accent);
		font-size: 0.86rem;
		font-weight: 700;
		letter-spacing: 0.14em;
	}
	.animal-head h2 {
		color: var(--text-on-dark);
		font-size: clamp(1.6rem, 3vw, 2.5rem);
	}
	.animal-head p {
		margin-top: 10px;
		color: var(--text-on-dark-secondary);
	}
	.turtle-head {
		margin-top: 88px;
		padding-top: 64px;
		border-top: 1px solid var(--border-on-dark);
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
