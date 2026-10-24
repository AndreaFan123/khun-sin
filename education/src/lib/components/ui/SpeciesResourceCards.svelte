<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve -- Registry paths pass through resolve before fragments are appended. */
	import { resolve } from '$app/paths';
	import { useSite } from '$lib/copy';
	import { speciesLinks, type SpeciesScope } from '$lib/navigation';

	let { scope }: { scope: SpeciesScope } = $props();
	const site = useSite();
	const links = $derived(speciesLinks(site().locale, scope));
	const en = $derived(site().locale === 'en');
	const species = $derived(
		scope === 'cetaceans' ? (en ? 'cetacean' : '鯨豚') : en ? 'sea turtle' : '海龜'
	);
</script>

<section class="resources" aria-labelledby={'resources-' + scope}>
	<div class="wrap">
		<h2 id={'resources-' + scope}>{en ? 'Explore the stranding records' : '從擱淺紀錄繼續認識'}</h2>
		<p class="intro">
			{en
				? `Explore Taiwan’s ${species} stranding data and where reports have been recorded.`
				: `透過台灣${species}的擱淺統計與通報分布，進一步了解紀錄。`}
		</p>
		<div class="cards">
			<a class="resource-card" href={resolve(links.data.path) + links.data.hash}>
				<h3>{en ? 'Stranding data' : '擱淺統計'}</h3>
				<p>
					{en
						? `Read the ${species} stranding counts, trends and data sources.`
						: `查看${species}擱淺的數量、趨勢與資料來源。`}
				</p>
			</a>
			<a class="resource-card" href={resolve(links.map.path) + links.map.hash}>
				<h3>{en ? 'Stranding map' : '擱淺分布地圖'}</h3>
				<p>
					{en
						? `Explore the county-level distribution of ${species} stranding reports in Taiwan.`
						: `了解台灣各縣市${species}擱淺通報的分布。`}
				</p>
			</a>
		</div>
	</div>
</section>

<style>
	.resources {
		padding: 4rem 0;
		background: var(--bg-soft);
	}
	h2 {
		font-size: clamp(1.5rem, 3vw, 2rem);
	}
	.intro {
		margin-top: 0.75rem;
		color: var(--text-secondary);
	}
	.cards {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.25rem;
		margin-top: 1.5rem;
	}
	.resource-card {
		display: block;
		min-height: 44px;
		padding: 1.5rem;
		border: 1.5px solid var(--text-primary);
		border-radius: 8px;
		background: var(--bg-card);
		color: var(--text-primary);
		text-decoration: none;
	}
	.resource-card:hover {
		background: var(--bg-soft);
	}
	.resource-card:hover h3 {
		text-decoration: underline;
		text-underline-offset: 0.25em;
	}
	h3 {
		font-size: clamp(1.625rem, 2.2vw, 1.75rem);
		font-weight: 800;
		margin-bottom: 0.75rem;
	}
	.resource-card p {
		color: var(--text-secondary);
	}
	@media (max-width: 640px) {
		.cards {
			grid-template-columns: 1fr;
		}
	}
</style>
