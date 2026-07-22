<script lang="ts">
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	import StepCard from '$lib/components/ui/StepCard.svelte';
	import DoDontList from '$lib/components/ui/DoDontList.svelte';
	import { useSite } from '$lib/copy';

	const site = useSite();
	const c = $derived(site().copy);
	const hotline = $derived(c.hotline);
	const head = $derived(c.sectionHeads.report);
</script>

<section id="report">
	<div class="wrap">
		<SectionHead eyebrow={head.eyebrow} title={head.title} lead={head.lead} />

		<div class="callbar">
			<div class="big">
				{hotline.number}<small>{hotline.label}</small>
			</div>
			<div class="info">
				<h3>{hotline.infoTitle}</h3>
				<p>{hotline.infoDescription}</p>
			</div>
		</div>

		<div class="steps">
			{#each c.reportSteps as step, i (step.title)}
				<StepCard {step} index={i} />
			{/each}
		</div>

		<div class="dodont">
			<DoDontList kind="do" title={c.uiCopy.doTitle} items={c.doList} />
			<DoDontList kind="dont" title={c.uiCopy.dontTitle} items={c.dontList} />
		</div>
	</div>
</section>

<style>
	section {
		padding: 92px 0;
	}
	.callbar {
		display: flex;
		flex-wrap: wrap;
		align-items: start;
		gap: 20px;
		justify-content: space-between;
		background: var(--bg-band-dark);
		color: var(--text-on-dark);
		border-radius: var(--radius);
		padding: 30px 34px;
	}
	.callbar .big {
		font-size: clamp(3rem, 7vw, 5rem);
		font-weight: 800;
		letter-spacing: 0.04em;
		line-height: 1;
		color: var(--accent);
		font-variant-numeric: tabular-nums;
	}
	.callbar .big small {
		display: block;
		font-size: 2rem;
		font-weight: 600;
		color: var(--text-on-dark-secondary);
		letter-spacing: 0.1em;
		margin-top: 6px;
	}
	.callbar p {
		max-width: 44ch;
		color: var(--text-on-dark-secondary);
		font-size: 0.98rem;
	}

	.callbar h3 {
		color: var(--text-on-dark);
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.steps {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 18px;
		margin-top: 50px;
	}
	.dodont {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
		margin-top: 50px;
	}
	@media (max-width: 860px) {
		section {
			padding: 64px 0;
		}
		.dodont {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 640px) {
		.steps {
			/* min(300px, 100%) so ultra-narrow screens (<324px content) never overflow */
			grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
		}
	}
</style>
