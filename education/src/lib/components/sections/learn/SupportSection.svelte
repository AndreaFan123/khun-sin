<script lang="ts">
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import Breadcrumbs from '$lib/components/ui/Breadcrumbs.svelte';
	// Referral-first support page (issue #22). External links only — this site
	// never touches money.
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	import { useSite } from '$lib/copy';

	const site = useSite();
	const c = $derived(site().copy.supportCopy);
</script>

<section id="support">
	<div class="wrap">
		<Breadcrumbs />
		<SectionHead as="h1" eyebrow={c.head.eyebrow} title={c.head.title} lead={c.head.lead} />

		<div class="cards">
			{#each c.links as org (org.name)}
				<article class="card">
					<h3>{org.name}</h3>
					<p>{org.description}</p>
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external URL -->
					<a href={org.url} target="_blank" rel="noopener"
						>{org.linkLabel}
						<ArrowUpRight
							size="1em"
							aria-hidden="true"
							style="display: inline-block; vertical-align: -0.125em; flex-shrink: 0"
						/></a
					>
				</article>
			{/each}
		</div>

		<p class="disclosure">{c.disclosure}</p>
	</div>
</section>

<style>
	section {
		flex: 1 0 auto;
		padding: 92px 0;
	}
	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr));
		gap: 20px;
	}
	.card {
		border: 1px solid var(--border);
		background: var(--bg-card);
		border-radius: var(--radius);
		padding: 26px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	h3 {
		font-size: 1.2rem;
	}
	p {
		font-size: 0.95rem;
		color: var(--text-secondary);
		flex: 1;
	}
	a {
		display: inline-flex;
		align-items: center;
		align-self: flex-start;
		gap: 8px;
		min-height: 44px;
		padding: 10px 16px;
		border-radius: var(--radius-action);
		background: var(--accent);
		color: var(--on-accent);
		font-weight: 700;
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
	}
	.disclosure {
		margin-top: 24px;
		font-size: 0.85rem;
		/* --text-muted only clears AA on --bg-card; this sits on the page background. */
		color: var(--text-secondary);
	}
	@media (max-width: 860px) {
		section {
			padding: 64px 0;
		}
	}
</style>
