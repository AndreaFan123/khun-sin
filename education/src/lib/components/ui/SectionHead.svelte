<script lang="ts">
	// `as` sets the heading level only — styling is identical either way.
	// Routes without a hero (the stories pages) pass as="h1" on their first
	// section so the page has a top-level landmark (#38).
	let {
		eyebrow,
		title,
		lead = '',
		onDark = false,
		as = 'h2'
	}: {
		eyebrow: string;
		title: string;
		lead?: string;
		onDark?: boolean;
		as?: 'h1' | 'h2';
	} = $props();
</script>

<div class="sec-head" class:on-dark={onDark}>
	<span class="eyebrow">{eyebrow}</span>
	<svelte:element this={as} class="title">{title}</svelte:element>
	{#if lead}<p class="lead">{lead}</p>{/if}
</div>

<style>
	.sec-head {
		max-width: 1000px;
		margin-bottom: 52px;
	}
	.eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 0.9rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		color: var(--slate-600);
		margin-bottom: 14px;
	}
	.eyebrow::before {
		content: '';
		width: 26px;
		height: 2px;
		background: var(--accent);
		border-radius: 2px;
	}
	.title {
		font-size: clamp(1.8rem, 4vw, 4rem);
	}
	.lead {
		margin-top: 16px;
		font-size: 1.15rem;
		color: var(--text-secondary);
		max-width: 62ch;
	}
	.on-dark .eyebrow {
		color: var(--accent);
	}
	.on-dark .title {
		color: var(--text-on-dark);
	}
	.on-dark .lead {
		color: var(--text-on-dark-secondary);
	}
</style>
