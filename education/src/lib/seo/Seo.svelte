<script lang="ts">
	// The one place head metadata is emitted (#37). Routes pass their path and
	// copy; canonical and language alternates derive from the route table, so
	// no page hand-writes meta markup. Social tags (#39) and structured data
	// (#41, #42) extend this component rather than the routes.
	import { absolute, alternatesFor, type RoutePath } from '$lib/seo/routes';

	let { path, title, description }: { path: RoutePath; title: string; description: string } =
		$props();

	const canonical = $derived(absolute(path));
	const alternates = $derived(alternatesFor(path));
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	{#each alternates as alternate (alternate.hreflang)}
		<link rel="alternate" hreflang={alternate.hreflang} href={alternate.href} />
	{/each}
</svelte:head>
