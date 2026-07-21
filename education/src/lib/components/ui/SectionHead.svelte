<script lang="ts">
	let {
		eyebrow,
		title,
		lead = '',
		onDark = false
	}: { eyebrow: string; title: string; lead?: string; onDark?: boolean } = $props();
</script>

<div class="sec-head" class:on-dark={onDark}>
	<span class="eyebrow">{eyebrow}</span>
	<h2>{title}</h2>
	{#if lead}<p class="lead">{lead}</p>{/if}
</div>

<style>
	.sec-head {
		max-width: 760px;
		margin-bottom: 52px;
	}
	.eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 0.82rem;
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
	h2 {
		font-size: clamp(1.8rem, 4vw, 2.7rem);
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
	.on-dark h2 {
		color: var(--text-on-dark);
	}
	.on-dark .lead {
		color: var(--text-on-dark-secondary);
	}
</style>
