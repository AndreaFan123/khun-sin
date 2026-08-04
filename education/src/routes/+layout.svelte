<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon-96x96.png';
	import { provideSite, type SiteCopy } from '$lib/copy';
	import { htmlLangOf } from '$lib/seo/routes';
	import Nav from '$lib/components/ui/Nav.svelte';
	import Footer from '$lib/components/ui/Footer.svelte';
	import Tooltip from '$lib/components/ui/Tooltip.svelte';

	let { children, data } = $props();

	const site = $derived({ copy: data.copy as SiteCopy, locale: data.locale });
	provideSite(() => site);

	// The server hook bakes <html lang> into each prerendered page; client-side
	// navigation between locales has to keep it in step (#37).
	$effect(() => {
		document.documentElement.lang = htmlLangOf(site.locale);
	});
</script>

<svelte:head>
	<link rel="icon" type="image/png" href={favicon} />
</svelte:head>

<Nav />

<main>
	{@render children()}
</main>

<Footer />

<Tooltip />
