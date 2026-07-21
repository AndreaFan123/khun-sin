<script lang="ts">
	import { brandFootnote, dataSources } from '$lib/data/site';
	import Wordmark from '$lib/components/ui/Wordmark.svelte';
</script>

<footer>
	<div class="wrap">
		<div class="brand"><Wordmark onDark /> · 台灣鯨豚擱淺通報與數據</div>
		<p class="footnote">{brandFootnote.body}</p>
		<p class="src">
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external URL -->
			{dataSources.intro}（<a href={dataSources.marnUrl} target="_blank" rel="noopener"
				>海保署官網</a
			>）。{dataSources.mapAttribution}。<br />
			{dataSources.reminder}
		</p>
	</div>
</footer>

<style>
	footer {
		background: var(--bg-band-darker);
		color: var(--text-on-dark-secondary);
		font-size: 0.875rem;
		padding: 40px 0;
		border-top: 1px solid var(--border-on-dark);
	}
	.brand {
		color: var(--text-on-dark);
		font-weight: 500;
		font-size: 1rem;
	}
	.footnote {
		margin-top: 10px;
		color: var(--slate-300);
	}
	.src {
		margin-top: 14px;
		line-height: 1.9;
	}
	a {
		color: var(--slate-200);
	}
</style>
