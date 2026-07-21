<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ChartCardCopy } from '$lib/data/site';

	let { copy, children }: { copy: ChartCardCopy; children?: Snippet } = $props();
</script>

<div class="chart-card">
	<h3>{copy.title}</h3>
	<div class="chart-sub">{copy.subtitle}</div>
	{#if children}
		{@render children()}
	{:else}
		<!-- Chart mounts here in #6 (legacy transitional) and #8-#10 (Svelte-native). -->
		<div class="chart-slot" data-chart={copy.key} aria-hidden="true"></div>
	{/if}
	<div class="legend">
		{#each copy.legend as item (item.label)}
			<span class="li"
				><span class="sw" style="background:var({item.colorVar})"></span>{item.label}</span
			>
		{/each}
	</div>
	<div class="takeaway"><b>看見了什麼：</b>{copy.takeaway}</div>
</div>

<style>
	.chart-card {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 28px 26px 22px;
		color: var(--text-primary);
	}
	h3 {
		font-size: 1.15rem;
		margin-bottom: 4px;
	}
	.chart-sub {
		font-size: 0.9rem;
		color: var(--text-secondary);
		margin-bottom: 20px;
	}
	.chart-slot {
		min-height: 220px;
		border: 1px dashed var(--border);
		border-radius: 8px;
	}
	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		margin-top: 16px;
		font-size: 0.85rem;
		color: var(--text-secondary);
	}
	.li {
		display: inline-flex;
		align-items: center;
		gap: 7px;
	}
	.sw {
		width: 13px;
		height: 13px;
		border-radius: 4px;
		display: inline-block;
	}
	.takeaway {
		margin-top: 18px;
		padding: 14px 16px;
		border-left: 3px solid var(--accent);
		background: var(--amber-50);
		border-radius: 0 10px 10px 0;
		font-size: 0.92rem;
		color: var(--text-secondary);
	}
	.takeaway b {
		color: var(--text-primary);
	}
</style>
