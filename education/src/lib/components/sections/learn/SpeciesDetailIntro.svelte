<script lang="ts">
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import Breadcrumbs from '$lib/components/ui/Breadcrumbs.svelte';
	import { resolve } from '$app/paths';
	import type { SpeciesHeroImage } from '$lib/data/taiwanese-white-dolphin';
	import Seo from '$lib/seo/Seo.svelte';
	import type { RoutePath } from '$lib/seo/routes';

	let {
		path,
		title,
		description,
		eyebrow,
		scientificName,
		statusTitle,
		statusBody,
		backPath,
		backLabel,
		image
	}: {
		path: RoutePath;
		title: string;
		description: string;
		eyebrow: string;
		scientificName: string;
		statusTitle: string;
		statusBody: string;
		backPath: '/cetaceans' | '/en/cetaceans';
		backLabel: string;
		image: SpeciesHeroImage;
	} = $props();
</script>

<Seo {path} {title} {description} />

<section class="species-detail">
	<img class="hero-bg" src={image.src} alt="" />
	<div class="inner">
		<Breadcrumbs tone="media" />
		<a class="back-link" href={resolve(backPath)}
			><ArrowLeft
				size="1em"
				aria-hidden="true"
				style="display: inline-block; vertical-align: -0.125em; flex-shrink: 0"
			/>{backLabel}</a
		>
		<p class="eyebrow">{eyebrow}</p>
		<h1>{title}</h1>
		<p class="scientific-name">{scientificName}</p>

		<article class="status-card">
			<h2>{statusTitle}</h2>
			<p>{statusBody}</p>
		</article>

		<p class="image-credit">
			{image.sourceLabel}
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- official external source -->
			<a href={image.sourceUrl} target="_blank" rel="noreferrer">{image.credit}</a>
			<span aria-hidden="true"> · </span>
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- official external license -->
			<a href={image.licenseUrl} target="_blank" rel="noreferrer">{image.licenseLabel}</a>
			<span aria-hidden="true"> · </span>{image.modificationNote}
		</p>
	</div>
</section>

<style>
	.species-detail {
		position: relative;
		overflow: hidden;
		min-height: 68vh;
		padding: clamp(5rem, 10vw, 8rem) 1.5rem;
		background: var(--navy-900);
		color: var(--paper-50);
	}

	.species-detail::after {
		content: '';
		position: absolute;
		inset: 0;
		background:
			linear-gradient(
				90deg,
				rgba(16, 31, 61, 0.9) 0%,
				rgba(16, 31, 61, 0.86) 56%,
				rgba(16, 31, 61, 0.82) 100%
			),
			linear-gradient(180deg, rgba(16, 31, 61, 0.18) 25%, rgba(16, 31, 61, 0.72) 100%);
	}

	.hero-bg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 48%;
		transform: scale(1.01);
	}

	.inner {
		position: relative;
		z-index: 1;
		width: min(100%, 52rem);
		margin: 0 auto;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 3.5rem;
		color: var(--paper-50);
		font-weight: 700;
		text-decoration-thickness: 1px;
		text-underline-offset: 0.3em;
	}

	.back-link:hover {
		color: var(--accent-on-dark);
	}

	.back-link:focus-visible {
		outline: 3px solid var(--accent-on-dark);
		outline-offset: 5px;
		border-radius: 2px;
	}

	.eyebrow {
		margin: 0 0 1rem;
		color: var(--accent-on-dark);
		font-size: 0.78rem;
		font-weight: 800;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	.species-detail h1 {
		max-width: 13ch;
		margin: 0;
		color: var(--paper-50);
		font-size: clamp(2.8rem, 8vw, 5.5rem);
		line-height: 0.98;
		letter-spacing: -0.045em;
	}

	.scientific-name {
		margin: 1.25rem 0 0;
		color: var(--slate-200);
		font-family: Georgia, serif;
		font-size: clamp(1.05rem, 2vw, 1.3rem);
		font-style: italic;
	}

	.status-card {
		max-width: 46rem;
		margin-top: clamp(3rem, 7vw, 5rem);
		padding: 0 0 0 clamp(1rem, 2vw, 1.5rem);
		border-left: 4px solid var(--accent-on-dark);
		color: var(--paper-50);
	}

	.status-card h2 {
		margin: 0 0 0.75rem;
		color: inherit;
		font-size: clamp(1.55rem, 3.2vw, 2.2rem);
	}

	.status-card p {
		max-width: 42rem;
		margin: 0;
		color: var(--slate-200);
		font-size: clamp(1.08rem, 1.6vw, 1.2rem);
		line-height: 1.8;
	}

	.image-credit {
		margin: 1rem 0 0;
		color: var(--slate-200);
		font-size: 0.72rem;
		line-height: 1.6;
		text-align: right;
	}

	.image-credit a {
		color: inherit;
		text-underline-offset: 0.18em;
	}

	.image-credit a:hover {
		color: var(--paper-50);
	}

	.image-credit a:focus-visible {
		outline: 2px solid var(--paper-50);
		outline-offset: 3px;
		border-radius: 2px;
	}

	@media (max-width: 46rem) {
		.species-detail::after {
			background: rgba(16, 31, 61, 0.82);
		}

		.hero-bg {
			object-position: 58% center;
		}
	}
</style>
