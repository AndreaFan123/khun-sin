<script lang="ts">
	import type { TurtlePageCopy } from '$lib/data/turtles';

	let { copy }: { copy: TurtlePageCopy['hero'] } = $props();
</script>

<section class="hero">
	<div class="wrap hero-grid">
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

		<div class="turtle-mark" aria-hidden="true">
			<svg viewBox="0 0 520 420" role="presentation">
				<path class="current current-a" d="M18 114c91-67 199-72 302-10 64 39 124 42 182 9" />
				<path class="current current-b" d="M4 310c111 49 222 35 309-39 65-55 130-64 195-27" />
				<g class="turtle" transform="translate(260 214) rotate(-8)">
					<path
						class="shell"
						d="M-126 7c0-79 57-133 128-133S130-73 130 7 76 137 2 137-126 86-126 7Z"
					/>
					<path
						class="shell-line"
						d="M-91-58c53 28 128 29 185 1M-110 24c66 31 155 29 222-4M-75 91c42-22 112-22 153-1M1-124V136M-68-108c24 68 24 168-2 220M70-107C45-36 46 58 72 111"
					/>
					<path class="flipper" d="M-106-73c-58-45-112-52-134-33-15 14 22 63 111 85Z" />
					<path class="flipper" d="M106-67c61-43 115-48 135-27 13 15-27 61-115 79Z" />
					<path class="flipper rear" d="M-90 94c-45 36-69 68-56 83 13 14 55-6 84-61Z" />
					<path class="flipper rear" d="M92 92c47 33 72 64 60 79-12 15-55-3-87-57Z" />
					<path class="head" d="M-30-125c1-44 15-73 34-73 20 0 35 30 34 74Z" />
					<circle class="eye" cx="-10" cy="-169" r="3" />
					<circle class="eye" cx="19" cy="-168" r="3" />
				</g>
			</svg>
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
	.hero-grid {
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
		align-items: center;
		gap: 52px;
	}
	.copy {
		position: relative;
		z-index: 1;
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
	.turtle-mark {
		position: relative;
		min-width: 0;
	}
	.turtle-mark::before,
	.turtle-mark::after {
		content: '';
		position: absolute;
		border: 1px solid var(--border-on-dark);
		border-radius: 50%;
	}
	.turtle-mark::before {
		inset: 11% 4% 7% 11%;
	}
	.turtle-mark::after {
		inset: 3% 13% 15% 1%;
	}
	svg {
		position: relative;
		z-index: 1;
		display: block;
		width: 100%;
	}
	.current {
		fill: none;
		stroke: var(--slate-500);
		stroke-width: 1.5;
		opacity: 0.5;
	}
	.current-b {
		opacity: 0.28;
	}
	.shell,
	.flipper,
	.head {
		fill: var(--navy-700);
		stroke: var(--slate-200);
		stroke-width: 2;
	}
	.flipper,
	.head {
		fill: var(--navy-800);
	}
	.shell-line {
		fill: none;
		stroke: var(--slate-400);
		stroke-width: 1.5;
		opacity: 0.7;
	}
	.eye {
		fill: var(--accent);
	}
	@media (max-width: 860px) {
		.hero {
			padding: 72px 0 60px;
		}
		.hero-grid {
			grid-template-columns: 1fr;
			gap: 28px;
		}
		.turtle-mark {
			max-width: 520px;
			margin: -20px auto -30px;
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
