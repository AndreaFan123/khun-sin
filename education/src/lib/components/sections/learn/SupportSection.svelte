<script lang="ts">
	// Referral-first support block (issue #22): the narrative exit at the end
	// of the stories page. External links only — this site never touches money.
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	import { useSite } from '$lib/copy';

	const site = useSite();
	const c = $derived(site().copy.supportCopy);
</script>

<section id="support">
	<div class="wrap">
		<SectionHead eyebrow={c.head.eyebrow} title={c.head.title} lead={c.head.lead} />

		<div class="cards">
			{#each c.links as org (org.name)}
				<article class="card">
					<h3>{org.name}</h3>
					<p>{org.description}</p>
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external URL -->
					<a href={org.url} target="_blank" rel="noopener">{org.linkLabel} ↗</a>
				</article>
			{/each}
		</div>

		<p class="disclosure">{c.disclosure}</p>
	</div>
</section>

<style>
	section {
		padding: 92px 0;
	}
	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr));
		gap: 20px;
	}
	.card {
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
		color: var(--accent-text);
		font-weight: 700;
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
	}
	.disclosure {
		margin-top: 24px;
		font-size: 0.85rem;
		color: var(--text-muted);
	}
	@media (max-width: 860px) {
		section {
			padding: 64px 0;
		}
	}
</style>
