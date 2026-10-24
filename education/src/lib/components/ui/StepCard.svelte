<script lang="ts">
	import type { ReportStep } from '$lib/data/site';

	let { step, index }: { step: ReportStep; index: number } = $props();
</script>

<article class="step">
	<h3><span class="n">{String(index + 1).padStart(2, '0')}</span>{step.title}</h3>
	<p>{step.description}</p>
</article>

<style>
	.step {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: 8px;
		padding: 28px 30px 32px;
	}
	h3 {
		display: grid;
		grid-template-columns: 64px minmax(0, 1fr);
		align-items: start;
		gap: 16px;
		font-size: 25px;
		margin-bottom: 15px;
	}
	.n {
		display: block;
		white-space: nowrap;
		overflow-wrap: normal;
		color: var(--signal);
		font-size: 44px;
		font-weight: 800;
		font-variant-numeric: tabular-nums;
		line-height: 1;
	}
	p {
		font-size: 19px;
		color: var(--text-secondary);
		line-height: 1.9;
	}
	@media (max-width: 640px) {
		.step {
			padding: 24px;
		}
		h3 {
			font-size: 23px;
		}
		p {
			font-size: 18px;
		}
	}
	@media (max-width: 380px) {
		h3 {
			display: block;
		}
		.n {
			margin-bottom: 12px;
		}
	}
</style>
