<script lang="ts">
	import CountUp from '$lib/components/ui/CountUp.svelte';

	let { value, unit, label }: { value: number; unit: string; label: string } = $props();
</script>

<div class="kpi">
	<div class="v"><CountUp {value} whenVisible duration={1300} /><span class="u">{unit}</span></div>
	<div class="l">{label}</div>
</div>

<style>
	.kpi {
		/* background: var(--bg-card); */
		/* border: 1px solid var(--border); */
		border-radius: var(--radius);
		padding: 22px;
	}
	.v {
		font-size: 5rem;
		font-weight: 800;
		color: var(--text-on-dark);
		font-variant-numeric: tabular-nums;
	}
	.u {
		font-size: 1rem;
		font-weight: 600;
		margin-left: 2px;
		color: var(--chart-emphasis);
	}
	.l {
		font-size: 1rem;
		color: var(--text-on-dark);
		margin-top: 4px;
	}
</style>
