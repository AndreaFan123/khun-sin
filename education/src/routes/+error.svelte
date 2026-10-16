<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { useSite } from '$lib/copy';
	import { homePathFor } from '$lib/seo/routes';

	const site = useSite();
	const copy = $derived(site().copy.errorPage);
	const title = $derived(page.status === 404 ? copy.notFoundTitle : copy.errorTitle);
	const description = $derived(
		page.status === 404 ? copy.notFoundDescription : copy.errorDescription
	);
	const home = $derived(resolve(homePathFor(site().locale)));
	const data = $derived(resolve(site().locale === 'en' ? '/en/data' : '/data'));
</script>

<svelte:head>
	<title>{title} · Khun-Sin</title>
	<meta name="description" content={description} />
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<section class="error-page wrap" aria-labelledby="error-title">
	<div class="status" aria-hidden="true">{page.status}</div>
	<div class="message">
		<p class="eyebrow">KHUN-SIN · {page.status}</p>
		<h1 id="error-title">{title}</h1>
		<p class="description">{description}</p>
		<nav class="actions" aria-label={copy.linksLabel}>
			<a class="primary" href={home}>{copy.home}<span aria-hidden="true">→</span></a>
			<a class="secondary" href={data}>{copy.data}<span aria-hidden="true">→</span></a>
		</nav>
	</div>
</section>

<style>
	.error-page {
		width: 100%;
		flex: 1;
		display: grid;
		grid-template-columns: 0.8fr 1.2fr;
		align-content: center;
		align-items: center;
		gap: clamp(32px, 5vw, 80px);
		padding-block: clamp(72px, 10vw, 144px);
	}
	.status {
		color: var(--navy-700);
		font-size: clamp(7rem, 16vw, 13rem);
		font-weight: 800;
		letter-spacing: -0.07em;
		line-height: 1;
		border-bottom: 4px solid var(--accent);
		padding-bottom: 24px;
		font-variant-numeric: tabular-nums;
	}
	.eyebrow {
		color: var(--text-secondary);
		font-size: 0.85rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		margin-bottom: 18px;
	}
	h1 {
		font-size: clamp(2rem, 3.6vw, 3rem);
	}
	.description {
		color: var(--text-secondary);
		margin-top: 24px;
		max-width: 48ch;
		font-size: 1.05rem;
		text-wrap: pretty;
	}
	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 32px;
	}
	.actions a {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 16px;
		padding: 13px 20px;
		min-height: 48px;
		border: 1px solid transparent;
		border-radius: var(--radius);
		font-weight: 700;
		text-decoration: none;
	}
	.primary {
		background: var(--accent);
		color: var(--navy-900);
	}
	.primary:hover {
		background: var(--amber-300);
	}
	.actions .secondary {
		border-color: var(--slate-500);
		color: var(--heading);
	}
	.secondary:hover {
		background: var(--bg-card);
	}
	@media (max-width: 700px) {
		.error-page {
			grid-template-columns: 1fr;
			gap: 32px;
			padding-block: 56px 72px;
		}
		.status {
			width: fit-content;
			font-size: 7rem;
			padding-right: 24px;
		}
		.actions {
			flex-direction: column;
			align-items: stretch;
		}
	}
</style>
