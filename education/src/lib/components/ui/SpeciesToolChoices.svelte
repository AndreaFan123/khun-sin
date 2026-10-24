<script lang="ts">
	import Breadcrumbs from '$lib/components/ui/Breadcrumbs.svelte';
	import { resolve } from '$app/paths';
	import { useSite } from '$lib/copy';
	import { speciesScopes, speciesLinks, type SpeciesTool } from '$lib/navigation';
	import Seo from '$lib/seo/Seo.svelte';
	let { tool }: { tool: SpeciesTool } = $props();
	const site = useSite();
	const en = $derived(site().locale === 'en');
	const title = $derived(
		tool === 'data' ? (en ? 'Stranding data' : '擱淺統計') : en ? 'Stranding map' : '擱淺分布地圖'
	);
	const description = $derived(
		en
			? 'Choose cetaceans or sea turtles to explore their stranding records in Taiwan.'
			: '選擇鯨豚或海龜，查看各自的台灣擱淺紀錄。'
	);
	const path = $derived(
		en ? (tool === 'data' ? '/en/data' : '/en/map') : tool === 'data' ? '/data' : '/map'
	);
</script>

<Seo {path} title={title + ' | Khun-Sin'} {description} />
<section class="wrap choices">
	<Breadcrumbs />
	<h1>{title}</h1>
	<p>{description}</p>
	<div class="cards">
		{#each speciesScopes as scope (scope)}
			<article id={scope} tabindex="-1">
				<a href={resolve(speciesLinks(site().locale, scope)[tool].path)}>
					<h2>
						{scope === 'cetaceans' ? (en ? 'Cetaceans' : '鯨豚') : en ? 'Sea turtles' : '海龜'}
					</h2>
					<p>
						{en
							? `View ${scope === 'cetaceans' ? 'cetacean' : 'sea turtle'} stranding ${tool}.`
							: `查看${scope === 'cetaceans' ? '鯨豚' : '海龜'}${title}。`}
					</p>
				</a>
			</article>
		{/each}
	</div>
</section>

<style>
	.choices {
		padding-top: 3rem;
		padding-bottom: 5rem;
	}
	h1 {
		font-size: clamp(2rem, 4vw, 3rem);
	}
	.choices > p {
		margin-top: 1rem;
		color: var(--text-secondary);
	}
	.cards {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.5rem;
		margin-top: 2rem;
	}
	article {
		scroll-margin-top: 8rem;
	}
	a {
		display: block;
		padding: 2rem;
		border: 1.5px solid var(--text-primary);
		border-radius: var(--radius);
		background: var(--bg-card);
		color: var(--text-primary);
		text-decoration: none;
	}
	a:hover {
		background: var(--bg-soft);
	}
	a:hover h2 {
		text-decoration: underline;
		text-underline-offset: 0.25em;
	}
	a p {
		margin-top: 1rem;
		color: var(--text-secondary);
	}
	@media (max-width: 640px) {
		.cards {
			grid-template-columns: 1fr;
		}
	}
</style>
