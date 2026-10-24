<script lang="ts">
	import journeyImage from '$lib/assets/sea_turtles_kid.jpg';
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	import type { TurtlePageCopy } from '$lib/data/turtles';
	import { revealOnce } from '$lib/motion/reveal-once';

	let {
		journeyHead,
		journey,
		threatsHead,
		threats
	}: {
		journeyHead: TurtlePageCopy['journeyHead'];
		journey: TurtlePageCopy['journey'];
		threatsHead: TurtlePageCopy['threatsHead'];
		threats: TurtlePageCopy['threats'];
	} = $props();
</script>

<section class="journey band-dark" use:revealOnce={{ threshold: 0.18 }}>
	<img class="journey-bg" src={journeyImage} alt="" />
	<div class="wrap">
		<SectionHead
			onDark
			eyebrow={journeyHead.eyebrow}
			title={journeyHead.title}
			lead={journeyHead.lead}
		/>
		<ol>
			{#each journey as stage, index (stage.title)}
				<li>
					<span class="marker" aria-hidden="true">{index + 1}</span>
					<h2>{stage.title}</h2>
					<p>{stage.description}</p>
				</li>
			{/each}
		</ol>
		<p class="image-credit">
			{journeyHead.imageSourceLabel}
			<a href="https://unsplash.com/@traveleroohlala" target="_blank" rel="noreferrer"
				>Traveler Ooh La La / Unsplash</a
			>
		</p>
	</div>
</section>

<section class="threats">
	<div class="wrap threats-layout">
		<SectionHead eyebrow={threatsHead.eyebrow} title={threatsHead.title} lead={threatsHead.lead} />
		<div class="threat-list">
			{#each threats as threat (threat.title)}
				<article>
					<h2>{threat.title}</h2>
					<p>{threat.description}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	section {
		padding: 92px 0;
	}
	.band-dark {
		background: var(--bg-band-dark);
	}
	.journey {
		position: relative;
		overflow: hidden;
		padding-top: 172px;
	}
	.journey::before {
		content: '';
		position: absolute;
		z-index: 1;
		inset: 0;
		background: linear-gradient(180deg, rgba(16, 31, 61, 0.82), rgba(16, 31, 61, 0.82));
	}
	.journey-bg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 68%;
	}
	.journey > .wrap {
		position: relative;
		z-index: 2;
	}
	.image-credit {
		margin: 32px 0 0;
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
	ol {
		position: relative;
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 20px;
		list-style: none;
	}
	ol::before {
		content: '';
		position: absolute;
		top: 19px;
		left: 20px;
		right: 5%;
		height: 1px;
		background: var(--slate-500);
		transform-origin: left center;
		transition: transform 850ms cubic-bezier(0.22, 1, 0.36, 1);
	}
	li {
		position: relative;
		transition:
			opacity 520ms ease,
			transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
	}
	.marker {
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		margin-bottom: 22px;
		border: 1px solid var(--slate-400);
		border-radius: 50%;
		background: var(--navy-800);
		color: var(--accent-on-dark);
		font-weight: 700;
		transition: transform 420ms cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	.journey:global([data-reveal-ready='true']:not([data-revealed='true'])) ol::before {
		transform: scaleX(0);
	}
	.journey:global([data-reveal-ready='true']:not([data-revealed='true'])) li {
		opacity: 0;
		transform: translateY(12px);
	}
	.journey:global([data-reveal-ready='true']:not([data-revealed='true'])) .marker {
		transform: scale(0.78);
	}
	.journey:global([data-revealed='true']) li:nth-child(1) {
		transition-delay: 140ms;
	}
	.journey:global([data-revealed='true']) li:nth-child(2) {
		transition-delay: 280ms;
	}
	.journey:global([data-revealed='true']) li:nth-child(3) {
		transition-delay: 420ms;
	}
	.journey:global([data-revealed='true']) li:nth-child(4) {
		transition-delay: 560ms;
	}
	li h2 {
		margin-bottom: 10px;
		color: var(--text-on-dark);
		font-size: 1.15rem;
	}
	li p {
		color: var(--text-on-dark-secondary);
		font-size: 0.94rem;
	}
	.threats-layout {
		display: grid;
		grid-template-columns: minmax(0, 0.9fr) minmax(420px, 1.1fr);
		gap: 70px;
	}
	.threat-list {
		border-top: 1px solid var(--paper-400);
	}
	article {
		display: grid;
		grid-template-columns: minmax(150px, 0.45fr) 1fr;
		gap: 28px;
		padding: 24px 0;
		border-bottom: 1px solid var(--paper-400);
	}
	article h2 {
		font-size: 1.08rem;
	}
	article p {
		color: var(--text-secondary);
	}
	@media (max-width: 860px) {
		section {
			padding: 64px 0;
		}
		.journey {
			padding-top: 144px;
		}
		ol {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 34px 22px;
		}
		ol::before {
			display: none;
		}
		.threats-layout {
			grid-template-columns: 1fr;
			gap: 18px;
		}
	}
	@media (max-width: 560px) {
		ol {
			grid-template-columns: 1fr;
			gap: 30px;
		}
		ol::before {
			display: block;
			top: 20px;
			bottom: 20px;
			left: 19px;
			right: auto;
			width: 1px;
			height: auto;
			transform: scaleY(1);
			transform-origin: center top;
		}
		li {
			display: grid;
			grid-template-columns: 40px minmax(0, 1fr);
			column-gap: 18px;
		}
		.marker {
			z-index: 1;
			grid-column: 1;
			grid-row: 1 / span 2;
			margin-bottom: 0;
		}
		li h2,
		li p {
			grid-column: 2;
		}
		.journey:global([data-reveal-ready='true']:not([data-revealed='true'])) ol::before {
			transform: scaleY(0);
		}
		article {
			grid-template-columns: 1fr;
			gap: 8px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		ol::before,
		li,
		.marker {
			transition: none;
		}
		.journey:global([data-reveal-ready='true']) ol::before,
		.journey:global([data-reveal-ready='true']) li,
		.journey:global([data-reveal-ready='true']) .marker {
			opacity: 1;
			transform: none;
		}
	}
</style>
