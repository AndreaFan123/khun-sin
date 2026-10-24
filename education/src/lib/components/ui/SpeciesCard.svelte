<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import { resolve } from '$app/paths';
	import commonBottlenose from '$lib/assets/dolphins/Common_Bottlenose_Dolphin.png';
	import indoPacificBottlenose from '$lib/assets/dolphins/Indo-Pacific_Bottlenose_Dolphin.png';
	import indoPacificFinless from '$lib/assets/dolphins/Indo-Pacific_finless_porpoise.png';
	import rissos from '$lib/assets/dolphins/Rissos_Dolphin.png';
	import taiwaneseHumpback from '$lib/assets/dolphins/Taiwanese_Humpback_Dolphin.png';
	import yangtzeFinless from '$lib/assets/dolphins/Yangtze_Finless_Porpoise.png';
	import cuviersBeakedWhale from '$lib/assets/whales/Cuvier_Beaked_Whale.png';
	import pygmySpermWhale from '$lib/assets/whales/Pygmy_Sperm_Whale.png';
	import type { SpeciesCard } from '$lib/data/site';

	const images = {
		taiwaneseHumpback,
		indoPacificFinless,
		yangtzeFinless,
		commonBottlenose,
		indoPacificBottlenose,
		rissos,
		pygmySpermWhale,
		cuviersBeakedWhale
	};

	// The stories page gives its first section head the h1, so these cards sit a
	// level below it; sections headed by an h2 pass 'h3' instead.
	let {
		card,
		as = 'h3',
		imageSourceLabel,
		redListLabel,
		detailLinkLabel
	}: {
		card: SpeciesCard;
		as?: 'h2' | 'h3';
		imageSourceLabel: string;
		redListLabel: string;
		detailLinkLabel: string;
	} = $props();
</script>

<article class="card">
	<figure>
		<img src={images[card.imageKey]} alt={card.imageAlt} loading="lazy" decoding="async" />
		<figcaption>
			{imageSourceLabel}
			<a href="https://www.inaturalist.org/" target="_blank" rel="noreferrer">iNaturalist</a>
		</figcaption>
	</figure>
	<div class="content">
		<div class="tags">
			<span class="tag {card.tagKind}">{card.tag}</span>
			{#if card.redList}
				<span class="red-list-tag {card.redList.level}">{redListLabel} · {card.redList.label}</span>
			{/if}
		</div>
		<svelte:element this={as} class="name">{card.name}</svelte:element>
		<div class="sci">{card.scientificName}</div>
		<p>{card.description}</p>
		{#if card.detailPath}
			<a class="detail-link" href={resolve(card.detailPath)}>
				{detailLinkLabel}<ArrowRight
					size="1em"
					aria-hidden="true"
					style="display: inline-block; vertical-align: -0.125em; flex-shrink: 0"
				/>
			</a>
		{/if}
	</div>
</article>

<style>
	.card {
		border: 1px solid var(--border);
		overflow: hidden;
		background: var(--bg-card);
		border-radius: var(--radius);
		border-top: 3px solid var(--slate-400);
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
	.content {
		padding: 26px;
	}
	.tags {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 8px;
		margin-bottom: 14px;
	}
	.tag {
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		padding: 4px 10px;
		border-radius: 999px;
		display: inline-flex;
		align-items: center;
		min-height: 24px;
	}
	.tag.critical {
		background: var(--rust-100);
		color: var(--rust-700);
	}
	.tag.common {
		background: var(--green-100);
		color: var(--green-600);
	}
	.tag.info {
		background: var(--slate-100);
		color: var(--slate-700);
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
	.red-list-tag.near-threatened {
		background: var(--iucn-near-threatened);
		color: var(--paper-50);
	}
	.name {
		font-size: 1.25rem;
	}
	.sci {
		font-style: italic;
		color: var(--text-muted);
		font-size: 0.85rem;
		margin: 2px 0 12px;
	}
	p {
		font-size: 0.94rem;
		color: var(--text-secondary);
	}
	.detail-link {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		margin-top: 18px;
		color: var(--signal);
		font-size: 0.9rem;
		font-weight: 700;
		text-decoration-color: var(--amber-600);
		text-underline-offset: 0.24em;
	}
	.detail-link:hover {
		color: var(--accent-text);
	}
	.detail-link:focus-visible {
		outline: 2px solid var(--signal);
		outline-offset: 4px;
		border-radius: 2px;
	}
</style>
