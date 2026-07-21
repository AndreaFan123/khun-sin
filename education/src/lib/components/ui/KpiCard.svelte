<script lang="ts">
	let { value, unit, label }: { value: number; unit: string; label: string } = $props();
</script>

<div class="kpi">
	<div class="v">{value}<span class="u">{unit}</span></div>
	<div class="l">{label}</div>
</div>

<style>
	.kpi {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 22px;
	}
	.v {
		font-size: 2rem;
		font-weight: 800;
		color: var(--heading);
		font-variant-numeric: tabular-nums;
	}
	.u {
		font-size: 1rem;
		font-weight: 600;
		margin-left: 2px;
	}
	.l {
		font-size: 0.85rem;
		color: var(--text-secondary);
		margin-top: 4px;
	}
</style>
