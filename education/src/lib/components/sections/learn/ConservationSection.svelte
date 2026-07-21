<script lang="ts">
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	import KpiCard from '$lib/components/ui/KpiCard.svelte';
	import {
		marnNodes,
		rescueStory,
		collectiveStranding,
		noPerfectSolution,
		conservationKpis
	} from '$lib/data/site';
	import { whiteDolphinProgram2025 } from '$lib/data/strandings';
</script>

<section>
	<div class="wrap">
		<SectionHead
			eyebrow="保育行動與成果"
			title="一隻鯨豚的獲救，是一整個網絡的合作"
			lead="救援不是單一單位能完成的事。海洋委員會海保署扮演整合核心，串聯海巡署、地方政府、學術鯨豚中心、獸醫與民間團體，組成「海保救援網（MARN）」。當通報進來，這些角色會接力到同一個現場。"
		/>

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

		<div class="network">
			{#each marnNodes as node (node.name)}
				<div class="node">
					<h4>{node.name}</h4>
					<p>{node.role}</p>
				</div>
			{/each}
		</div>

		<div class="kpis">
			{#each conservationKpis as kpi (kpi.metric)}
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
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 36px;
	}
	.story-eyebrow {
		display: block;
		font-size: 0.82rem;
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
		font-size: clamp(3rem, 9vw, 5rem);
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
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 26px 30px;
	}
	.note h3 {
		font-size: 1.25rem;
		margin-bottom: 10px;
	}
	.note p {
		color: var(--text-secondary);
	}
	.network {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 14px;
		margin-top: 34px;
	}
	.node {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 18px;
		text-align: center;
	}
	.node h4 {
		font-size: 0.98rem;
		margin: 0 0 4px;
	}
	.node p {
		font-size: 0.8rem;
		color: var(--text-muted);
	}
	.kpis {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
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
