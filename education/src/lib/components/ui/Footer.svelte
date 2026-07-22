<script lang="ts">
	import { useSite } from '$lib/copy';
	import Wordmark from '$lib/components/ui/Wordmark.svelte';

	const site = useSite();
	const c = $derived(site().copy);
	const dataSources = $derived(c.dataSources);
</script>

<footer>
	<div class="wrap">
		<div class="brand"><Wordmark onDark /> · {c.uiCopy.footerBrandLine}</div>
		<p class="footnote">{c.brandFootnote.body}</p>
		<p class="src">
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external URL -->
			{dataSources.intro}（<a href={dataSources.marnUrl} target="_blank" rel="noopener"
				>{dataSources.marnLinkText}</a
			>）。
		</p>
		<p>
			{dataSources.mapAttribution}。<br />
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
