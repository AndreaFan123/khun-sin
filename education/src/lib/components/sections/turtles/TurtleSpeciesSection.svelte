<script lang="ts">
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	import type { TurtlePageCopy } from '$lib/data/turtles';

	let {
		head,
		species
	}: {
		head: TurtlePageCopy['speciesHead'];
		species: TurtlePageCopy['species'];
	} = $props();
</script>

<section>
	<div class="wrap">
		<SectionHead eyebrow={head.eyebrow} title={head.title} lead={head.lead} />
		<div class="species-grid">
			{#each species as turtle, index (turtle.scientificName)}
				<article class:wide={index === 0}>
					<div class="number" aria-hidden="true">0{index + 1}</div>
					<div>
						<span class="label">{turtle.label}</span>
						<h2>{turtle.name}</h2>
						<p class="scientific">{turtle.scientificName}</p>
						<p class="description">{turtle.description}</p>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	section {
		padding: 52px 0 92px;
	}
	.species-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 18px;
	}
	article {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 22px;
		background: var(--bg-card);
		border-top: 3px solid var(--slate-400);
		border-radius: var(--radius);
		padding: 26px;
	}
	article.wide {
		grid-column: 1 / -1;
		grid-template-columns: 84px minmax(0, 620px);
		border-top-color: var(--accent);
	}
	.number {
		color: var(--paper-400);
		font-size: 2rem;
		font-weight: 700;
		line-height: 1;
		font-variant-numeric: tabular-nums;
	}
	.label {
		display: inline-block;
		margin-bottom: 8px;
		color: var(--accent-text);
		font-size: 0.76rem;
		font-weight: 700;
		letter-spacing: 0.08em;
	}
	h2 {
		font-size: 1.4rem;
	}
	.scientific {
		margin: 2px 0 12px;
		color: var(--text-muted);
		font-size: 0.86rem;
		font-style: italic;
	}
	.description {
		color: var(--text-secondary);
	}
	@media (max-width: 720px) {
		section {
			padding: 44px 0 64px;
		}
		.species-grid {
			grid-template-columns: 1fr;
		}
		article.wide {
			grid-column: auto;
			grid-template-columns: auto 1fr;
		}
	}
	@media (max-width: 420px) {
		article,
		article.wide {
			grid-template-columns: 1fr;
			gap: 12px;
		}
	}
</style>
