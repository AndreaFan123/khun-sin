<script lang="ts">
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	import KpiCard from '$lib/components/ui/KpiCard.svelte';
	import WaveDivider from '$lib/components/ui/WaveDivider.svelte';
	// import MarnNetwork from '$lib/components/ui/MarnNetwork.svelte';
	import { useSite } from '$lib/copy';
	import { whiteDolphinProgram2025 } from '$lib/data/strandings';

	const site = useSite();
	const c = $derived(site().copy);
	const rescueStory = $derived(c.rescueStory);
	const collectiveStranding = $derived(c.collectiveStranding);
	const noPerfectSolution = $derived(c.noPerfectSolution);
</script>

<section>
	<div class="wrap">
		<SectionHead
			eyebrow={c.sectionHeads.conservation.eyebrow}
			title={c.sectionHeads.conservation.title}
			lead={c.sectionHeads.conservation.lead}
		/>

		<!-- <MarnNetwork /> -->

		<div class="story">
			<div>
				<span class="story-eyebrow">{rescueStory.eyebrow}</span>
				<h3>{rescueStory.title}</h3>
				<p>{rescueStory.body}</p>
			</div>
			<div class="story-stat">
				<div class="big">
					{rescueStory.releasedCount}<small>{rescueStory.statLabel}</small>
				</div>
			</div>
		</div>

		<div class="note">
			<h3>{noPerfectSolution.title}</h3>
			<p>{noPerfectSolution.body}</p>
		</div>

		<div class="note">
			<h3>{collectiveStranding.title}</h3>
			<p>{collectiveStranding.body}</p>
		</div>
	</div>
</section>

<WaveDivider from="var(--paper-200)" to="var(--navy-800)" flip />

<section class="kpi-band">
	<div class="wrap">
		<SectionHead
			onDark
			eyebrow={c.sectionHeads.kpi.eyebrow}
			title={c.sectionHeads.kpi.title}
			lead={c.sectionHeads.kpi.lead}
		/>

		<div class="kpis">
			{#each c.conservationKpis as kpi (kpi.metric)}
				<KpiCard value={whiteDolphinProgram2025[kpi.metric]} unit={kpi.unit} label={kpi.label} />
			{/each}
		</div>
	</div>
</section>

<style>
	section {
		padding: 92px 0;
	}
	.story {
		display: grid;
		grid-template-columns: 1.1fr 0.9fr;
		gap: 34px;
		align-items: center;
		/* background: var(--bg-card); */
		/* border: 1px solid var(--border); */
		/* border-radius: var(--radius); */
		/* padding: 36px; */
		margin-top: 100px;
	}
	.story-eyebrow {
		display: block;
		font-size: 0.9rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		color: var(--accent-text);
		margin-bottom: 10px;
	}
	.story h3 {
		font-size: 1.5rem;
		margin-bottom: 12px;
	}
	.story p {
		color: var(--text-secondary);
	}
	.story-stat {
		text-align: center;
	}
	.big {
		font-size: clamp(5rem, 9vw, 8rem);
		font-weight: 800;
		color: var(--accent-text);
		line-height: 0.95;
		font-variant-numeric: tabular-nums;
	}
	.big small {
		display: block;
		font-size: 1rem;
		color: var(--text-secondary);
		font-weight: 600;
		margin-top: 8px;
	}
	.note {
		margin-top: 20px;
		/* background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius); */
		padding: 20px 0 26px 0;
	}
	.note h3 {
		font-size: 1.25rem;
		margin-bottom: 10px;
	}
	.note p {
		color: var(--text-secondary);
	}
	.kpi-band {
		background: var(--bg-band-dark);
	}
	.kpis {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 16px;
		margin-top: 26px;
	}
	@media (max-width: 860px) {
		section {
			padding: 64px 0;
		}
		.story {
			grid-template-columns: 1fr;
		}
	}
</style>
