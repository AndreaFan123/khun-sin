<script lang="ts">
	import CountUp from '$lib/components/ui/CountUp.svelte';
	import { heroCopy, hotline } from '$lib/data/site';
	import { findTotals, totalOf } from '$lib/data/strandings';

	const latest = findTotals(2025)!;
	const total = totalOf(latest);
	const deadPct = Math.round((latest.dead / total) * 100);
</script>

<section class="hero">
	<div class="wrap">
		<span class="kbadge">{heroCopy.badge}</span>
		<h1>
			{heroCopy.titleLead}<span class="hl">{heroCopy.titleHighlight}</span><br
			/>{heroCopy.titleTail}
		</h1>
		<p class="sub">{heroCopy.sub}</p>

		<div class="stats">
			<div class="stat">
				<div class="num"><CountUp value={total} /><small>隻</small></div>
				<div class="lbl">{latest.period.year} {heroCopy.statTotalLabel}</div>
			</div>
			<div class="stat">
				<div class="num">
					<CountUp value={latest.speciesCount!} duration={1100} /><small>種</small>
				</div>
				<div class="lbl">{heroCopy.statSpeciesLabel}</div>
			</div>
			<div class="stat">
				<div class="num"><CountUp value={deadPct} duration={1700} /><small>%</small></div>
				<div class="lbl">{heroCopy.statDeadLabel}</div>
			</div>
		</div>

		<a class="emergency" href="#report">
			<span class="what"
				>發現擱淺？{hotline.label}，處理步驟往下看
				<span class="arrow" aria-hidden="true">↓</span></span
			>
		</a>
	</div>
</section>

<style>
	.hero {
		background: var(--bg-band-darker);
		color: var(--text-on-dark);
		padding: 88px 0 72px;
	}
	.kbadge {
		display: inline-block;
		margin-bottom: 22px;
		padding: 7px 15px;
		border-radius: 999px;
		border: 2px solid var(--border-on-dark);
		color: var(--slate-200);
		font-weight: 500;
		font-size: 0.9rem;
		letter-spacing: 0.08em;
	}
	h1 {
		font-size: clamp(4rem, 6vw, 7rem);
		color: var(--text-on-dark);
		letter-spacing: 0.02em;
		width: 100%;
	}
	.hl {
		color: var(--accent);
	}
	.sub {
		font-size: clamp(1.3rem, 2.2vw, 1.4rem);
		margin-top: 22px;
		max-width: 100%;
		color: var(--text-on-dark-secondary);
		width: 100%;
	}

	.stats {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 38px;
		margin-top: 150px;
		margin-bottom: 100px;
	}
	.stat .num {
		font-size: clamp(6rem, 9vw, 6rem);
		font-weight: 800;
		color: var(--text-on-dark);
		line-height: 1;
		font-variant-numeric: tabular-nums;
	}
	.stat .num small {
		font-size: 1.3rem;
		font-weight: 600;
		color: var(--accent);
		margin-left: 4px;
	}
	.stat .lbl {
		font-size: 1rem;
		color: var(--text-on-dark-secondary);
		margin-top: 6px;
		max-width: 20ch;
	}
	.emergency {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		gap: 16px;
		margin-top: 34px;
		padding: 16px 22px;
		border-radius: var(--radius);
		/* border: 1px solid var(--accent); */
		text-decoration: none;
		color: var(--text-on-dark);
	}
	/* .emergency .num {
		font-size: 5rem;
		font-weight: 800;
		color: var(--accent);
		font-variant-numeric: tabular-nums;
	} */
	.emergency .what {
		font-size: 1.2rem;
		color: var(--text-on-dark-secondary);
		max-width: 100ch;
	}
	.arrow {
		display: inline-block;
		animation: bob 1.8s ease-in-out infinite;
	}
	@keyframes bob {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(6px);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.arrow {
			animation: none;
		}
	}
</style>
