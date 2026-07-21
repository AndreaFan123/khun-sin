<script lang="ts">
	import type { SpeciesCard } from '$lib/data/site';

	let { card }: { card: SpeciesCard } = $props();
</script>

<article class="card">
	<span class="tag {card.tagKind}">{card.tag}</span>
	<h3>{card.name}</h3>
	<div class="sci">{card.scientificName}</div>
	<p>{card.description}</p>
</article>

<style>
	.card {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 26px;
	}
	.tag {
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		padding: 4px 10px;
		border-radius: 999px;
		display: inline-block;
		margin-bottom: 14px;
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
	h3 {
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
</style>
