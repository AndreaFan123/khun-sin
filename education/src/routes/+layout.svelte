<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import * as zh from '$lib/data/site';
	import * as en from '$lib/data/site-en';
	import { provideSite } from '$lib/copy';
	import Nav from '$lib/components/ui/Nav.svelte';
	import Footer from '$lib/components/ui/Footer.svelte';

	let { children } = $props();

	const isEn = $derived(page.url.pathname === '/en' || page.url.pathname.startsWith('/en/'));
	const site = $derived(
		isEn ? { copy: en as typeof zh, locale: 'en' as const } : { copy: zh, locale: 'zh' as const }
	);
	provideSite(() => site);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Nav />

{@render children()}

<Footer />
