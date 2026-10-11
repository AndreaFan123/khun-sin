<script lang="ts">
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	import type { TurtlePageCopy } from '$lib/data/turtles';

	let { rescue }: { rescue: TurtlePageCopy['rescue'] } = $props();
</script>

<section class="rescue band-dark">
	<div class="wrap rescue-layout">
		<div>
			<SectionHead onDark eyebrow={rescue.eyebrow} title={rescue.title} lead={rescue.lead} />
			<div class="hotline">
				<strong>118</strong>
				<span>{rescue.callLabel}</span>
			</div>
		</div>
		<ol>
			{#each rescue.steps as step, index (step.title)}
				<li>
					<span aria-hidden="true">0{index + 1}</span>
					<div>
						<h2>{step.title}</h2>
						<p>{step.description}</p>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>

<style>
	.band-dark {
		background: var(--bg-band-darker);
	}
	.rescue {
		padding: 92px 0;
	}
	.rescue-layout {
		display: grid;
		grid-template-columns: minmax(0, 0.9fr) minmax(420px, 1.1fr);
		gap: 72px;
	}
	.hotline {
		display: grid;
		gap: 8px;
		background: var(--navy-700);
		border-radius: var(--radius);
		padding: 30px 34px;
	}
	.hotline strong {
		color: var(--accent);
		font-size: clamp(4rem, 8vw, 6.5rem);
		font-weight: 800;
		letter-spacing: 0.04em;
		line-height: 0.9;
		font-variant-numeric: tabular-nums;
	}
	.hotline span {
		color: var(--text-on-dark-secondary);
		font-size: clamp(1.15rem, 2vw, 1.5rem);
		font-weight: 600;
		letter-spacing: 0.08em;
	}
	ol {
		list-style: none;
		border-top: 1px solid var(--border-on-dark);
	}
	li {
		display: grid;
		grid-template-columns: 48px 1fr;
		gap: 18px;
		padding: 22px 0;
		border-bottom: 1px solid var(--border-on-dark);
	}
	li > span {
		color: var(--accent);
		font-weight: 700;
		font-variant-numeric: tabular-nums;
	}
	li h2 {
		margin-bottom: 5px;
		color: var(--text-on-dark);
		font-size: 1.12rem;
	}
	li p {
		color: var(--text-on-dark-secondary);
	}
	@media (max-width: 800px) {
		.rescue {
			padding: 64px 0;
		}
		.rescue-layout {
			grid-template-columns: 1fr;
			gap: 34px;
		}
	}
</style>
