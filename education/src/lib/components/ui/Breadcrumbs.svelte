<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { useSite } from '$lib/copy';
	import { routePathFor, homePathFor } from '$lib/seo/routes';
	import { speciesLinks, speciesToolFor } from '$lib/navigation';
	let { tone = 'surface' }: { tone?: 'surface' | 'media' } = $props();
	const site = useSite();
	const en = $derived(site().locale === 'en');
	const path = $derived(routePathFor(page.url.pathname));
	const home = $derived(homePathFor(site().locale));
	const toolPage = $derived(speciesToolFor(path));
	const parentScope = $derived(
		toolPage?.scope ?? (path.endsWith('/sousa-chinensis-taiwanensis') ? 'cetaceans' : undefined)
	);
	const detail = $derived(path.endsWith('/sousa-chinensis-taiwanensis'));
	const label = $derived(
		detail
			? en
				? 'Taiwanese white dolphin'
				: '台灣白海豚'
			: toolPage?.tool === 'data' || path.endsWith('/data')
				? en
					? 'Stranding data'
					: '擱淺統計'
				: toolPage?.tool === 'map' || path.endsWith('/map')
					? en
						? 'Stranding map'
						: '擱淺分布地圖'
					: path.endsWith('/sea-turtles')
						? site().copy.uiCopy.navTurtles
						: path.endsWith('/cetaceans')
							? site().copy.uiCopy.navLearn
							: site().copy.uiCopy.navSupport
	);
</script>

{#if path !== home}<nav
		class="breadcrumbs"
		class:media={tone === 'media'}
		aria-label={en ? 'Breadcrumb' : '麵包屑'}
	>
		<ol>
			<li><a href={resolve(home)}>{en ? 'Home' : '首頁'}</a></li>
			{#if parentScope}<li>
					<a href={resolve(speciesLinks(site().locale, parentScope).overview)}
						>{parentScope === 'cetaceans'
							? site().copy.uiCopy.navLearn
							: site().copy.uiCopy.navTurtles}</a
					>
				</li>{/if}
			<li aria-current="page">{label}</li>
		</ol>
	</nav>{/if}

<style>
	.breadcrumbs {
		margin-bottom: 1.25rem;
		color: var(--text-secondary);
		font-size: 0.85rem;
		line-height: 1.6;
	}
	.breadcrumbs ol {
		display: flex;
		flex-wrap: wrap;
		list-style: none;
		gap: 0.25rem 0.5rem;
		margin: 0;
		padding: 0;
	}
	.breadcrumbs li {
		min-width: 0;
		overflow-wrap: anywhere;
	}
	.breadcrumbs li + li::before {
		content: '/';
		margin-right: 0.5rem;
		color: inherit;
	}
	a {
		display: inline-block;
		min-height: 24px;
		color: var(--signal);
		text-underline-offset: 0.2em;
	}
	a:focus-visible {
		outline: 2px solid currentColor;
		outline-offset: 3px;
		border-radius: 2px;
	}
	.media,
	.media a {
		color: var(--text-on-dark);
	}
</style>
