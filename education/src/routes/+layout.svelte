<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon-96x96.png';
	import { provideSite, type SiteCopy } from '$lib/copy';
	import Nav from '$lib/components/ui/Nav.svelte';
	import Footer from '$lib/components/ui/Footer.svelte';

	let { children, data } = $props();

	const site = $derived({ copy: data.copy as SiteCopy, locale: data.locale });
	provideSite(() => site);
</script>

<svelte:head>
	<link rel="icon" type="image/png" href={favicon} />
</svelte:head>

<Nav />

{@render children()}

<Footer />
