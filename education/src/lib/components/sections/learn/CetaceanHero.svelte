<script lang="ts">
	import Breadcrumbs from '$lib/components/ui/Breadcrumbs.svelte';
	import heroImage from '$lib/assets/dolphins_hero_bg.jpg';
	import { useSite } from '$lib/copy';

	const site = useSite();
	const copy = $derived(site().copy.sectionHeads.know);
</script>

<section id="know" class="hero">
	<img class="hero-bg" src={heroImage} alt="" />
	<div class="wrap hero-content">
		<Breadcrumbs tone="media" />
		<div class="copy">
			<span class="eyebrow">{copy.eyebrow}</span>
			<h1>{copy.title}</h1>
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
		<p class="image-credit">
			{copy.imageSourceLabel}
			<a href="https://unsplash.com/@taliacohen" target="_blank" rel="noreferrer"
				>Talia Cohen / Unsplash</a
			>
		</p>
	</div>
</section>

<style>
	a:focus-visible {
		outline-color: var(--accent-on-dark);
	}
	.hero {
		position: relative;
		overflow: hidden;
		padding: 96px 0 88px;
	}
	.hero::after {
		content: '';
		position: absolute;
		inset: 0;
		background: rgba(16, 31, 61, 0.82);
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
		margin-bottom: 18px;
		color: var(--accent-on-dark);
		font-size: 0.9rem;
		font-weight: 700;
		letter-spacing: 0.14em;
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
	.image-credit {
		margin: 28px 0 0;
		color: var(--slate-300);
		font-size: 0.72rem;
		text-align: right;
	}
	.image-credit a {
		color: inherit;
		text-underline-offset: 0.18em;
	}
	.image-credit a:hover {
		color: var(--text-on-dark);
	}
	.image-credit a:focus-visible {
		outline: 2px solid var(--text-on-dark);
		outline-offset: 3px;
		border-radius: 2px;
	}
	@media (max-width: 860px) {
		.hero {
			padding: 72px 0 76px;
		}
		.hero-bg {
			object-position: 58% center;
		}
	}
	@media (max-width: 540px) {
		.hero {
			padding-bottom: 96px;
		}
		.facts {
			flex-direction: column;
			gap: 18px;
		}
		.image-credit {
			margin-top: 24px;
		}
		h1 {
			font-size: clamp(2.4rem, 13vw, 4rem);
		}
	}
</style>
