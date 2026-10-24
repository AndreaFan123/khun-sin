<script lang="ts">
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import { useSite } from '$lib/copy';
	import { whiteDolphinMonitoring2025 } from '$lib/data/strandings';
	import { annualReport2025 } from '$lib/data/report-sources';
	import type {
		EvidenceStatus,
		TaiwaneseWhiteDolphinContent
	} from '$lib/data/taiwanese-white-dolphin';

	const site = useSite();
	const en = $derived(site().locale === 'en');
	let { content }: { content: TaiwaneseWhiteDolphinContent } = $props();

	const statusClass: Record<EvidenceStatus, string> = {
		confirmed: 'confirmed',
		disputed: 'disputed',
		unverified: 'unverified'
	};

	function sourceNumbers(sourceIds: string[]): string {
		return sourceIds
			.map((sourceId) => content.sources.findIndex((source) => source.id === sourceId) + 1)
			.filter((sourceNumber) => sourceNumber > 0)
			.map((sourceNumber) => `[${sourceNumber}]`)
			.join(' ');
	}
</script>

<section class="evidence" aria-labelledby="evidence-title">
	<div class="inner">
		<div class="metrics" aria-label={content.issueEyebrow}>
			{#each content.metrics as metric (metric.label)}
				<article class="metric-card">
					<p class="metric-value">{metric.value}</p>
					<h2>{metric.label}</h2>
					<p>{metric.note} <span class="references">{sourceNumbers(metric.sourceIds)}</span></p>
				</article>
			{/each}
		</div>

		<section id="monitoring" tabindex="-1" class="monitoring">
			<h2>{en ? 'Monitoring and research' : '監測與研究'}</h2>
			<div class="monitoring-grid">
				<article class="metric-card">
					<p class="metric-value">{whiteDolphinMonitoring2025.catalogued}</p>
					<h3>{en ? 'Individuals in the photo-ID catalogue' : '個體辨識名錄累計隻數'}</h3>
					<p>
						{en
							? 'Cumulative through the end of 2025. This catalogue is not a current population estimate.'
							: '累計至 2025 年底。名錄累計數不等於當年度野外族群估計。'}
					</p>
				</article>
				<article class="metric-card">
					<p class="metric-value">{whiteDolphinMonitoring2025.sightingGroups}</p>
					<h3>{en ? 'Cumulative at-sea sighting groups' : '海上調查累計目擊群次'}</h3>
					<p>
						{en
							? 'White dolphin programme records through 31 October 2025. The report does not specify the cumulative start date or that every group comprised white dolphins.'
							: '白海豚計畫海上調查紀錄，統計至 2025 年 10 月 31 日。報告未明示累計起點，也未明示每一群均為白海豚。'}
					</p>
				</article>
			</div>
			<p>
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- official annual report with PDF page fragment -->
				<a href={annualReport2025 + '#page=11'} target="_blank" rel="noopener"
					>{en ? 'Source: 2025 annual report, p.10' : '來源：2025 全年度擱淺報告，第 10 頁'}</a
				>
			</p>
		</section>
		<header class="section-head">
			<p class="eyebrow">{content.issueEyebrow}</p>
			<h2 id="evidence-title">{content.issueTitle}</h2>
			<p>{content.issueLead}</p>
		</header>

		<div class="claims">
			{#each content.claims as claim (claim.title)}
				<article class="claim-card">
					<p class="claim-status {statusClass[claim.status]}">{claim.label}</p>
					<h3>{claim.title}</h3>
					<p>{claim.body} <span class="references">{sourceNumbers(claim.sourceIds)}</span></p>
				</article>
			{/each}
		</div>

		<aside class="caution">
			<h2>{content.cautionTitle}</h2>
			<p>{content.caution}</p>
		</aside>

		<section class="sources" aria-labelledby="sources-title">
			<h2 id="sources-title">{content.sourcesTitle}</h2>
			<ol>
				{#each content.sources as source (source.id)}
					<li>
						<p><strong>{source.publisher}</strong> · {source.date}</p>
						<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- cited external source -->
						<a href={source.url} target="_blank" rel="noreferrer">
							{source.title}<span class="visually-hidden"> — {content.sourceLabel}</span>
							<ArrowUpRight
								size="1em"
								aria-hidden="true"
								style="display: inline-block; vertical-align: -0.125em; flex-shrink: 0"
							/>
						</a>
					</li>
				{/each}
			</ol>
			<p class="reviewed">{content.reviewedLabel}</p>
		</section>
	</div>
</section>

<style>
	.monitoring {
		scroll-margin-top: 8rem;
		margin-top: 4rem;
	}
	.monitoring-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
		gap: 1rem;
		margin: 1.5rem 0;
	}
	.monitoring a {
		color: var(--signal);
	}
	.evidence {
		padding: clamp(2rem, 4vw, 3rem) 1.5rem clamp(4rem, 9vw, 7.5rem);
		background: var(--bg);
		color: var(--text-primary);
	}

	.inner {
		width: min(100%, 68rem);
		margin: 0 auto;
	}

	.metrics {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
		margin-top: 0;
		position: relative;
	}

	.metric-card {
		padding: clamp(1.25rem, 3vw, 2rem);
		border: 1px solid var(--border);
		border-top: 4px solid var(--rust-600);
		background: var(--bg-card);
		border-radius: var(--radius);
	}

	.metric-card p,
	.claim-card p,
	.caution p,
	.section-head > p:last-child {
		color: var(--text-secondary);
		line-height: 1.75;
	}

	.metric-value {
		margin: 0 0 0.6rem;
		color: var(--accent-text) !important;
		font-size: clamp(1.8rem, 4vw, 2.8rem);
		font-weight: 850;
		line-height: 1.05 !important;
		letter-spacing: -0.04em;
	}

	.metric-card h2 {
		margin: 0;
		font-size: 1rem;
	}

	.metric-card p:last-child {
		margin: 0.8rem 0 0;
		font-size: 0.9rem;
	}

	.section-head {
		max-width: 64rem;
		margin: clamp(5rem, 10vw, 8rem) 0 2.5rem;
	}

	.eyebrow {
		margin: 0 0 0.75rem;
		color: var(--accent-text) !important;
		font-size: 0.78rem;
		font-weight: 800;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.section-head h2,
	.caution h2,
	.sources h2 {
		margin: 0;
		font-size: clamp(1.8rem, 4vw, 3rem);
		line-height: 1.15;
		letter-spacing: -0.025em;
	}

	.section-head > p:last-child {
		max-width: 64rem;
		margin: 1.25rem 0 0;
		font-size: 1.05rem;
		text-wrap: pretty;
	}

	.claims {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}

	.claim-card {
		border-radius: var(--radius);
		padding: clamp(1.4rem, 3vw, 2rem);
		border: 1px solid var(--border);
		background: var(--bg-card);
	}

	.claim-status {
		display: inline-block;
		margin: 0 0 1rem;
		padding: 0.35rem 0.65rem;
		border-radius: 999px;
		font-size: 0.75rem;
		font-weight: 800;
		line-height: 1;
	}

	.claim-status.confirmed {
		background: var(--navy-700);
		color: var(--paper-50);
	}

	.claim-status.disputed {
		background: var(--rust-700);
		color: var(--paper-50);
	}

	.claim-status.unverified {
		background: var(--slate-200);
		color: var(--navy-900);
	}

	.claim-card h3 {
		margin: 0;
		font-size: 1.2rem;
		line-height: 1.4;
	}

	.claim-card > p:last-child {
		margin: 0.8rem 0 0;
	}

	.references {
		color: var(--accent-text);
		font-size: 0.8em;
		font-weight: 800;
		white-space: nowrap;
	}

	.caution {
		margin-top: clamp(3rem, 7vw, 5rem);
		padding: clamp(1.5rem, 4vw, 2.5rem);
		border-left: 4px solid var(--rust-600);
		background: var(--bg-soft);
	}

	.caution h2 {
		font-size: clamp(1.4rem, 3vw, 2rem);
	}

	.caution p {
		margin: 0.8rem 0 0;
	}

	.sources {
		margin-top: clamp(4rem, 9vw, 7rem);
	}

	.sources h2 {
		margin-bottom: 2rem;
	}

	.sources ol {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0 2.5rem;
		margin: 0;
		padding-left: 1.5rem;
	}

	.sources li {
		padding: 1rem 0 1.2rem 0.25rem;
		border-top: 1px solid var(--border);
	}

	.sources li p {
		margin: 0 0 0.35rem;
		color: var(--text-secondary);
		font-size: 0.8rem;
	}

	.sources a {
		color: var(--signal);
		font-weight: 700;
		line-height: 1.5;
		text-underline-offset: 0.25em;
	}

	.sources a:hover {
		color: var(--accent-text);
	}

	.sources a:focus-visible {
		outline: 3px solid var(--accent);
		outline-offset: 4px;
	}

	.reviewed {
		margin: 1.5rem 0 0;
		color: var(--text-secondary);
		font-size: 0.85rem;
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	@media (max-width: 46rem) {
		.metrics,
		.claims,
		.sources ol {
			grid-template-columns: 1fr;
		}
	}
</style>
