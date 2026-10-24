<script lang="ts">
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	// import MarnNetwork from '$lib/components/ui/MarnNetwork.svelte';
	import { annualReport2025 } from '$lib/data/report-sources';
	import { useSite } from '$lib/copy';
	import { cetaceanResearch2025 } from '$lib/data/strandings';

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

<section class="kpi-band">
	<div class="wrap">
		<div class="research-panel">
			<div class="research-intro">
				<p class="research-eyebrow">{site().locale === 'en' ? 'Stranding research' : '擱淺研究'}</p>
				<h2>
					{site().locale === 'en' ? '2025 cetacean research records' : '2025 年鯨豚研究工作紀錄'}
				</h2>
				<p class="research-lead">
					{site().locale === 'en'
						? 'Sampling and pathology support research across stranded cetaceans.'
						: '科學採樣與病理解剖，記錄擱淺鯨豚的健康與死因線索。'}
				</p>
			</div>
			<dl class="research-metrics">
				{#each c.conservationKpis as kpi (kpi.metric)}
					<div class="research-metric">
						<dt>{kpi.label}</dt>
						<dd>
							<span class="research-value">{cetaceanResearch2025[kpi.metric]}</span><span
								class="research-unit">{kpi.unit}</span
							>
						</dd>
					</div>
				{/each}
			</dl>
			<p class="research-source">
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- official annual report with PDF page fragment -->
				<a href={annualReport2025 + '#page=7'} target="_blank" rel="noopener"
					>{site().locale === 'en'
						? 'Source: 2025 annual report, p.06'
						: '來源：2025 全年度擱淺報告，第 06 頁'}</a
				>
			</p>
		</div>
	</div>
</section>

<style>
	.research-source {
		grid-column: 1 / -1;
		margin: 0;
		font-size: 0.85rem;
		color: var(--text-secondary);
	}
	.research-source a {
		color: inherit;
		text-underline-offset: 3px;
	}
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
		padding: 64px 0;
		background: var(--bg-soft);
	}
	.research-panel {
		display: grid;
		grid-template-columns: 1.05fr 1.3fr;
		gap: 28px 40px;
		align-items: center;
		padding: clamp(24px, 4vw, 44px);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--bg-card);
		color: var(--text-primary);
	}
	.research-eyebrow {
		margin: 0 0 12px;
		font-size: 0.85rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		color: var(--text-secondary);
	}
	.research-intro h2 {
		margin: 0;
		font-size: clamp(1.6rem, 2.8vw, 2.35rem);
		line-height: 1.3;
		text-wrap: balance;
	}
	.research-lead {
		margin: 16px 0 0;
		font-size: 1rem;
		color: var(--text-secondary);
	}
	.research-metrics {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 16px;
		margin: 0;
	}
	.research-metric {
		display: flex;
		flex-direction: column;
		gap: 24px;
		padding: 24px;
		border-radius: var(--radius);
		background: var(--bg-soft);
	}
	.research-metric dt {
		font-size: 0.95rem;
		font-weight: 600;
		line-height: 1.5;
	}
	.research-metric dd {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 8px;
		margin: auto 0 0;
	}
	.research-value {
		font-size: clamp(2.8rem, 5vw, 4rem);
		font-weight: 800;
		font-variant-numeric: tabular-nums;
		line-height: 1;
	}
	.research-unit {
		font-size: 0.95rem;
		color: var(--text-secondary);
	}
	@media (max-width: 1000px) {
		.research-panel {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 560px) {
		.kpi-band {
			padding: 40px 0;
		}
		.research-metrics {
			grid-template-columns: 1fr;
		}
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
