<script lang="ts">
	import heroImage from '$lib/assets/sea_turtle_hero.jpg';
	import type { TurtlePageCopy } from '$lib/data/turtles';

	let { copy }: { copy: TurtlePageCopy['hero'] } = $props();
</script>

<section class="hero">
	<img class="hero-bg" src={heroImage} alt="" />
	<div class="wrap hero-content">
		<div class="copy">
			<span class="eyebrow">{copy.eyebrow}</span>
			<h1>{copy.title} <em>{copy.highlight}</em></h1>
			<p class="lead">{copy.lead}</p>
			<div class="facts">
				{#each copy.facts as fact (fact.label)}
					<div class="fact">
						<strong>{fact.value}</strong>
						<span>{fact.label}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		overflow: hidden;
		background: var(--bg-band-darker);
		padding: 96px 0 88px;
	}
	.hero::after {
		content: '';
		position: absolute;
		inset: 0;
		background: rgba(16, 31, 61, 0.66);
	}
	.hero-bg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 42%;
	}
	.hero-content {
		position: relative;
		z-index: 1;
	}
	.copy {
		max-width: 700px;
	}
	.eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		color: var(--accent);
		font-size: 0.9rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		margin-bottom: 18px;
	}
	.eyebrow::before {
		content: '';
		width: 28px;
		height: 2px;
		background: currentColor;
	}
	h1 {
		max-width: 12ch;
		color: var(--text-on-dark);
		font-size: clamp(2.8rem, 6vw, 5.8rem);
		letter-spacing: -0.035em;
		text-wrap: balance;
	}
	h1 em {
		color: var(--accent);
		font-style: normal;
	}
	.lead {
		max-width: 58ch;
		margin-top: 24px;
		color: var(--text-on-dark-secondary);
		font-size: 1.1rem;
	}
	.facts {
		display: flex;
		gap: 32px;
		margin-top: 34px;
		padding-top: 26px;
		border-top: 1px solid var(--border-on-dark);
	}
	.fact {
		display: grid;
		gap: 3px;
		max-width: 18ch;
	}
	.fact strong {
		color: var(--text-on-dark);
		font-size: 1.45rem;
	}
	.fact span {
		color: var(--slate-300);
		font-size: 0.86rem;
	}
	@media (max-width: 860px) {
		.hero {
			padding: 72px 0 60px;
		}
		.hero-bg {
			object-position: 58% center;
		}
	}
	@media (max-width: 540px) {
		.facts {
			flex-direction: column;
			gap: 18px;
		}
		h1 {
			font-size: clamp(2.4rem, 13vw, 4rem);
		}
	}
</style>
