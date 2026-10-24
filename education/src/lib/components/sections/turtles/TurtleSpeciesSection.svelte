<script lang="ts">
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	import greenTurtle from '$lib/assets/sea-turtles/Green_Sea_Turtle.png';
	import hawksbillTurtle from '$lib/assets/sea-turtles/Hawksbill_Sea_Turtle.png';
	import leatherbackTurtle from '$lib/assets/sea-turtles/Leatherback_Sea_Turtle.png';
	import loggerheadTurtle from '$lib/assets/sea-turtles/Loggerhead_Sea_Turtle.png';
	import oliveRidleyTurtle from '$lib/assets/sea-turtles/Olive_Ridley_Sea_Turtle.png';
	import type { TurtlePageCopy } from '$lib/data/turtles';

	const images = {
		green: greenTurtle,
		hawksbill: hawksbillTurtle,
		loggerhead: loggerheadTurtle,
		oliveRidley: oliveRidleyTurtle,
		leatherback: leatherbackTurtle
	};

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
					<figure>
						<img
							src={images[turtle.imageKey]}
							alt={turtle.imageAlt}
							loading="lazy"
							decoding="async"
						/>
						<figcaption>
							{head.imageSourceLabel}
							<a href="https://www.inaturalist.org/" target="_blank" rel="noreferrer">iNaturalist</a
							>
						</figcaption>
					</figure>
					<div class="card-copy">
						<div class="number" aria-hidden="true">0{index + 1}</div>
						<div>
							<div class="tags">
								<span class="label">{turtle.label}</span>
								<span class="red-list-tag {turtle.redList.level}"
									>{head.redListLabel} · {turtle.redList.label}</span
								>
							</div>
							<h2>{turtle.name}</h2>
							<p class="scientific">{turtle.scientificName}</p>
							<p class="description">{turtle.description}</p>
						</div>
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
		border: 1px solid var(--border);
		overflow: hidden;
		background: var(--bg-card);
		border-top: 3px solid var(--slate-400);
		border-radius: var(--radius);
	}
	article.wide {
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
		border-top-color: var(--accent);
	}
	figure {
		margin: 0;
		background: var(--bg-soft);
	}
	img {
		display: block;
		width: 100%;
		aspect-ratio: 16 / 9;
		object-fit: cover;
	}
	figcaption {
		padding: 7px 12px 8px;
		color: var(--text-secondary);
		font-size: 0.72rem;
		line-height: 1.4;
	}
	figcaption a {
		color: inherit;
		text-underline-offset: 0.18em;
	}
	figcaption a:hover {
		color: var(--text-primary);
	}
	figcaption a:focus-visible {
		outline: 2px solid var(--signal);
		outline-offset: 3px;
		border-radius: 2px;
	}
	.card-copy {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 22px;
		padding: 26px;
	}
	.wide .card-copy {
		align-content: center;
	}
	.number {
		color: var(--paper-400);
		font-size: 2rem;
		font-weight: 700;
		line-height: 1;
		font-variant-numeric: tabular-nums;
	}
	.tags {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 8px;
		margin-bottom: 8px;
	}
	.label {
		color: var(--accent-text);
		font-size: 0.76rem;
		font-weight: 700;
		letter-spacing: 0.08em;
	}
	.red-list-tag {
		display: inline-flex;
		align-items: center;
		min-height: 24px;
		padding: 3px 8px;
		border-radius: 999px;
		font-size: 0.75rem;
		font-weight: 800;
		letter-spacing: 0.025em;
		line-height: 1.35;
	}
	.red-list-tag.critically-endangered {
		background: var(--iucn-critically-endangered);
		color: var(--paper-50);
	}
	.red-list-tag.vulnerable {
		background: var(--iucn-vulnerable);
		color: var(--paper-900);
	}
	.red-list-tag.threatened {
		background: var(--green-100);
		color: var(--green-800);
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
			display: block;
		}
	}
	@media (max-width: 420px) {
		.card-copy {
			grid-template-columns: 1fr;
			gap: 12px;
		}
	}
</style>
