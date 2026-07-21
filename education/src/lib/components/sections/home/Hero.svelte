<script lang="ts">
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

		<a class="emergency" href="#report">
			<span class="num">{hotline.number}</span>
			<span class="what">發現擱淺？{hotline.label}，處理步驟在這裡 ↓</span>
		</a>

		<div class="stats">
			<div class="stat">
				<div class="num">{total}<small>隻</small></div>
				<div class="lbl">{latest.period.year} {heroCopy.statTotalLabel}</div>
			</div>
			<div class="stat">
				<div class="num">{latest.speciesCount}<small>種</small></div>
				<div class="lbl">{heroCopy.statSpeciesLabel}</div>
			</div>
			<div class="stat">
				<div class="num">{deadPct}<small>%</small></div>
				<div class="lbl">{heroCopy.statDeadLabel}</div>
			</div>
		</div>
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
		border: 1px solid var(--border-on-dark);
		color: var(--slate-200);
		font-weight: 500;
		font-size: 0.85rem;
		letter-spacing: 0.08em;
	}
	h1 {
		font-size: clamp(2.3rem, 6vw, 4.4rem);
		color: var(--text-on-dark);
		letter-spacing: 0.02em;
	}
	.hl {
		color: var(--accent);
	}
	.sub {
		font-size: clamp(1.05rem, 2.2vw, 1.4rem);
		margin-top: 22px;
		max-width: 40ch;
		color: var(--text-on-dark-secondary);
	}
	.emergency {
		display: inline-flex;
		align-items: center;
		gap: 16px;
		margin-top: 34px;
		padding: 16px 22px;
		border-radius: var(--radius);
		border: 1px solid var(--accent);
		text-decoration: none;
		color: var(--text-on-dark);
	}
	.emergency .num {
		font-size: 2rem;
		font-weight: 800;
		color: var(--accent);
		font-variant-numeric: tabular-nums;
	}
	.emergency .what {
		font-size: 0.95rem;
		color: var(--text-on-dark-secondary);
		max-width: 30ch;
	}
	.stats {
		display: flex;
		flex-wrap: wrap;
		gap: 38px;
		margin-top: 48px;
	}
	.stat .num {
		font-size: clamp(2.1rem, 5vw, 3rem);
		font-weight: 800;
		color: var(--text-on-dark);
		line-height: 1;
		font-variant-numeric: tabular-nums;
	}
	.stat .num small {
		font-size: 1rem;
		font-weight: 600;
		color: var(--accent);
		margin-left: 4px;
	}
	.stat .lbl {
		font-size: 0.9rem;
		color: var(--text-on-dark-secondary);
		margin-top: 6px;
		max-width: 20ch;
	}
</style>
