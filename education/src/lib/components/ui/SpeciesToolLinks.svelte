<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve -- Registry paths pass through resolve before fragments are appended. */
	import { resolve } from '$app/paths';
	import { useSite } from '$lib/copy';
	import { speciesLinks, type SpeciesScope } from '$lib/navigation';
	let { scope, current }: { scope: SpeciesScope; current?: 'data' | 'map' } = $props();
	const site = useSite();
	const links = $derived(speciesLinks(site().locale, scope));
	const en = $derived(site().locale === 'en');
</script>

<nav class="tool-links" aria-label={en ? 'Related resources' : '相關內容'}>
	{#if current}<a href={resolve(links.overview)}>{en ? 'Species overview' : '回到物種總覽'}</a>{/if}
	{#if current !== 'data'}<a href={resolve(links.data.path) + links.data.hash}
			>{en ? 'Stranding data' : '擱淺統計'}</a
		>{/if}
	{#if current !== 'map'}<a href={resolve(links.map.path) + links.map.hash}
			>{en ? 'Stranding map' : '擱淺分布地圖'}</a
		>{/if}
</nav>

<style>
	.tool-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem 1.25rem;
		margin: 1.25rem 0;
	}
	.tool-links a {
		color: inherit;
		text-underline-offset: 0.25em;
		min-height: 44px;
		display: inline-flex;
		align-items: center;
	}
</style>
