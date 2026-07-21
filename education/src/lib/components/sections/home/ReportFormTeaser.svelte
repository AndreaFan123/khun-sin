<script lang="ts">
	import { formTeaser } from '$lib/data/site';
</script>

<section>
	<div class="wrap">
		<div class="teaser">
			<span class="badge">{formTeaser.badge}</span>
			<h3>{formTeaser.title}</h3>
			<p>{formTeaser.body}</p>
		</div>
	</div>
</section>

<style>
	section {
		padding: 0 0 92px;
	}
	.teaser {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 30px 34px;
	}
	.badge {
		display: inline-block;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		padding: 4px 12px;
		border-radius: 999px;
		background: var(--amber-100);
		color: var(--amber-800);
		margin-bottom: 12px;
	}
	h3 {
		font-size: 1.2rem;
		margin-bottom: 8px;
	}
	p {
		color: var(--text-secondary);
		max-width: 62ch;
	}
	@media (max-width: 860px) {
		section {
			padding: 0 0 64px;
		}
	}
</style>
