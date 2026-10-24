<script lang="ts">
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { useSite } from '$lib/copy';
	import { fill } from '$lib/format';
	import { lastUpdated } from '$lib/data/strandings';
	import { speciesScopes, speciesLinks } from '$lib/navigation';
	import Wordmark from '$lib/components/ui/Wordmark.svelte';
	import OceanWaves from '$lib/components/ui/OceanWaves.svelte';

	const site = useSite();
	const c = $derived(site().copy);
	const dataSources = $derived(c.dataSources);
	const isTurtlePage = $derived(page.url.pathname.includes('/sea-turtles'));
	// How current the figures are — a different fact from what they cover, and
	// the one a reader needs to judge whether the numbers are still good.
	const currencyNote = $derived(fill(c.dataCurrency.note, { date: lastUpdated }));
	const supportHref = $derived(
		site().locale === 'en' ? resolve('/en/support') : resolve('/support')
	);
</script>

<footer>
	<div class="footer-waves"><OceanWaves variant="footer" /></div>
	<div class="footer-top">
		<div class="brand">
			<Wordmark />
			<p class="brand-description">{c.uiCopy.footerBrandLine}</p>
			{#if c.brandFootnote.body}
				<p class="footnote">{c.brandFootnote.body}</p>
			{/if}
		</div>
		<nav class="footer-nav" aria-label={site().locale === 'en' ? 'Footer navigation' : '頁尾導覽'}>
			{#each speciesScopes as scope (scope)}
				{@const links = speciesLinks(site().locale, scope)}
				<a href={resolve(links.overview)}>
					{scope === 'cetaceans' ? c.uiCopy.navLearn : c.uiCopy.navTurtles}
				</a>
			{/each}
			<a class="support-link" href={supportHref}>{c.uiCopy.navSupport}</a>
		</nav>
	</div>
	<div class="footer-details">
		<div class="sources">
			<p class="source-description">{dataSources.intro}</p>
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- official external source -->
			<a class="source-link" href={dataSources.marnUrl} target="_blank" rel="noopener">
				{dataSources.marnLinkText}
				<ArrowUpRight size="1em" aria-hidden="true" />
			</a>
			{#if isTurtlePage}
				<div class="turtle-sources">
					<p>{dataSources.turtleSourcesLabel}</p>
					<ul>
						{#each dataSources.turtleSources as source (source.url)}
							<li>
								<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- official external source -->
								<a href={source.url} target="_blank" rel="noopener">{source.label}</a>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		</div>
		<div class="data-notes">
			<p>{currencyNote}</p>
			<p>{dataSources.mapAttribution}</p>
			{#if dataSources.reminder}
				<p>{dataSources.reminder}</p>
			{/if}
		</div>
	</div>
</footer>

<style>
	.footer-waves {
		position: absolute;
		right: 0;
		bottom: 0;
		width: min(80%, 1100px);
		height: 100%;
		max-height: 360px;
		z-index: -1;
		pointer-events: none;
		--wave-back: color-mix(in srgb, var(--text-primary) 4%, var(--bg-soft));
		--wave-middle: color-mix(in srgb, var(--text-primary) 7%, var(--bg-soft));
		--wave-front: color-mix(in srgb, var(--text-primary) 10%, var(--bg-soft));
	}
	footer {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		background: var(--bg-soft);
		color: var(--text-secondary);
		font-size: 0.875rem;
		line-height: 1.75;
		padding: 48px;
	}

	.footer-top {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		align-items: start;
		gap: 32px 48px;
	}
	.brand {
		color: var(--text-primary);
		min-width: 0;
	}
	.brand-description,
	.footnote {
		margin: 10px 0 0;
		color: var(--text-secondary);
		max-width: 48ch;
	}
	.footer-nav {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: flex-end;
		gap: 8px 24px;
	}
	.footer-nav a {
		min-height: 44px;
		display: inline-flex;
		align-items: center;
	}
	.footer-nav .support-link {
		background: var(--accent);
		color: var(--on-accent);
		border-radius: var(--radius-action);
		padding: 10px 18px;
		font-weight: 700;
		line-height: 1.4;
		text-decoration: none;
	}
	.support-link:hover {
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.footer-details {
		display: grid;
		grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr);
		gap: 32px 48px;
		margin-top: 32px;
		padding-top: 28px;
		border-top: 1px solid var(--border);
	}
	.footer-details p {
		margin: 0;
	}
	.source-description {
		max-width: 72ch;
	}
	.source-link {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		margin-top: 12px;
	}
	.turtle-sources {
		margin-top: 20px;
	}
	.turtle-sources ul {
		display: flex;
		flex-wrap: wrap;
		gap: 6px 20px;
		list-style: none;
		margin: 6px 0 0;
		padding: 0;
	}
	.data-notes {
		display: grid;
		align-content: start;
		gap: 16px;
	}
	a {
		color: var(--text-secondary);
		text-underline-offset: 3px;
	}
	@media (max-width: 760px) {
		.footer-waves {
			width: 100%;
			height: 220px;
		}
		footer {
			padding: 20px;
		}
		.footer-top,
		.footer-details {
			grid-template-columns: minmax(0, 1fr);
		}
		.footer-top {
			gap: 20px;
		}
		.footer-nav {
			justify-content: flex-start;
		}
	}
</style>
