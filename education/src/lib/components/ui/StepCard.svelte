<script lang="ts">
	import type { ReportStep } from '$lib/data/site';

	let { step, index }: { step: ReportStep; index: number } = $props();
</script>

<article class="step">
	<div class="n">{index + 1}</div>
	<h4>{step.title}</h4>
	<p>{step.description}</p>
</article>

<style>
	.step {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 24px;
	}
	.n {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: var(--navy-700);
		color: var(--text-on-dark);
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		margin-bottom: 14px;
	}
	h4 {
		font-size: 1.05rem;
		margin-bottom: 6px;
	}
	p {
		font-size: 0.9rem;
		color: var(--text-secondary);
	}
</style>
