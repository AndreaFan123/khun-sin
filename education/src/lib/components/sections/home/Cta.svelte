<script lang="ts">
	import { resolve } from '$app/paths';
	import { ctaCopy } from '$lib/data/site';
</script>

<section class="cta">
	<div class="wrap">
		<h2>{ctaCopy.title}</h2>
		<p>{ctaCopy.body}</p>
		<div class="btnrow">
			<a class="btn primary" href="#report">{ctaCopy.primaryLabel}</a>
			<a class="btn ghost" href={resolve('/learn')}>{ctaCopy.secondaryLabel}</a>
		</div>
	</div>
</section>

<style>
	.cta {
		background: var(--bg-band-darker);
		color: var(--text-on-dark);
		text-align: center;
		padding: 96px 0;
	}
	h2 {
		font-size: clamp(1.9rem, 5vw, 3rem);
		color: var(--text-on-dark);
		max-width: 22ch;
		margin: 0 auto;
	}
	p {
		margin: 20px auto 0;
		max-width: 52ch;
		color: var(--text-on-dark-secondary);
	}
	.btnrow {
		margin-top: 34px;
		display: flex;
		gap: 16px;
		justify-content: center;
		flex-wrap: wrap;
	}
	.btn {
		display: inline-block;
		padding: 15px 30px;
		border-radius: 999px;
		font-weight: 700;
		text-decoration: none;
	}
	.btn.primary {
		background: var(--accent);
		color: var(--navy-900);
	}
	.btn.ghost {
		border: 1.5px solid var(--border-on-dark);
		color: var(--text-on-dark);
	}
	@media (max-width: 860px) {
		.cta {
			padding: 64px 0;
		}
	}
</style>
