<script lang="ts">
	import { resolve } from '$app/paths';
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
		<h2>{head.title || head.eyebrow}</h2>
		{#if head.title && head.eyebrow}<p>{head.eyebrow}</p>{/if}
		{#if head.lead}<p>{head.lead}</p>{/if}

		<div class="callbar">
			<div class="big">
				<strong>{hotline.number}</strong><small>{hotline.label}</small>
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
		<nav class="paths" aria-label={c.uiCopy.navLearn + ' / ' + c.uiCopy.navTurtles}>
			<a href={resolve(site().locale === 'en' ? '/en/cetaceans' : '/cetaceans')}
				>{c.uiCopy.navLearn}</a
			>
			<a href={resolve(site().locale === 'en' ? '/en/sea-turtles' : '/sea-turtles')}
				>{c.uiCopy.navTurtles}</a
			>
		</nav>
	</div>
</section>

<style>
	.paths {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
		margin-top: 56px;
	}
	.paths a {
		padding: 28px 30px;
		border: 1.5px solid var(--text-primary);
		border-radius: 8px;
		background: var(--bg-card);
		color: var(--heading);
		font-size: 28px;
		font-weight: 800;
		text-decoration: none;
		text-underline-offset: 8px;
	}
	.paths a:hover {
		background: var(--bg-soft);
		text-decoration: underline;
	}
	@media (max-width: 640px) {
		.paths {
			grid-template-columns: 1fr;
			gap: 14px;
			margin-top: 30px;
		}
		.paths a {
			font-size: 23px;
			padding: 25px;
		}
	}

	h2 {
		font-size: clamp(32px, 3.5vw, 44px);
		font-weight: 800;
		margin-bottom: 26px;
		line-height: 1.25;
	}
	section {
		padding: 72px 0 80px;
	}
	.callbar {
		display: grid;
		grid-template-columns: minmax(160px, 0.7fr) minmax(0, 2fr);
		align-items: center;
		gap: 32px;
		background: var(--bg-soft);
		border-radius: 8px;
		padding: 28px 32px;
	}
	.big {
		color: var(--text-primary);
		font-size: 17px;
		line-height: 1.5;
	}
	.big strong {
		display: block;
		font-size: 72px;
		font-weight: 800;
		font-variant-numeric: tabular-nums;
		line-height: 1;
	}
	.big small {
		display: block;
		margin-top: 8px;
		font-size: inherit;
		color: var(--text-secondary);
	}
	.info h3 {
		font-size: 26px;
		line-height: 1.55;
		margin-bottom: 14px;
	}
	.info p {
		color: var(--text-secondary);
		font-size: 19px;
		line-height: 1.9;
	}
	.steps,
	.dodont {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
		margin-top: 25px;
	}
	.dodont {
		gap: 24px;
		margin-top: 28px;
	}
	@media (max-width: 800px) {
		.steps {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 640px) {
		section {
			padding: 42px 0 48px;
		}
		.callbar {
			grid-template-columns: 1fr;
			gap: 24px;
			padding: 24px;
		}
		.big strong {
			font-size: 56px;
		}
		.info h3 {
			font-size: 23px;
		}
		.info p {
			font-size: 18px;
		}
		.steps,
		.dodont {
			grid-template-columns: 1fr;
			gap: 16px;
		}
	}
</style>
