<script lang="ts">
	// The one place head metadata is emitted (#37, #39, #41, #42). Routes pass
	// their path, copy and any page-specific structured data; everything else —
	// canonical, language alternates, share card, site identity — derives from
	// the route table and the locale context, so no page hand-writes meta markup.
	import { useSite } from '$lib/copy';
	import { absolute, alternatesFor, SITE_ORIGIN, type RoutePath } from '$lib/seo/routes';
	import { buildOrganization, buildWebSite, serializeJsonLd, type JsonLd } from '$lib/seo/schema';
	import ogImageZh from '$lib/assets/khun-Sin-OG-image/og-image-zh.jpg';
	import ogImageEn from '$lib/assets/khun-Sin-OG-image/og-image-en.jpg';

	let {
		path,
		title,
		description,
		schema = []
	}: { path: RoutePath; title: string; description: string; schema?: JsonLd[] } = $props();

	const site = useSite();
	const locale = $derived(site().locale);
	const copy = $derived(site().copy);

	const canonical = $derived(absolute(path));
	const alternates = $derived(alternatesFor(path));

	// Social platforms require absolute image URLs.
	const ogImage = $derived(`${SITE_ORIGIN}${locale === 'en' ? ogImageEn : ogImageZh}`);
	const ogLocale = $derived(locale === 'en' ? 'en_US' : 'zh_TW');
	const ogLocaleAlternate = $derived(locale === 'en' ? 'zh_TW' : 'en_US');

	// Site identity rides along on every page; pages add their own on top.
	const jsonLd = $derived(
		serializeJsonLd([buildOrganization(copy), buildWebSite(copy, locale), ...schema])
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	{#each alternates as alternate (alternate.hreflang)}
		<link rel="alternate" hreflang={alternate.hreflang} href={alternate.href} />
	{/each}

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Khun-Sin" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:locale" content={ogLocale} />
	<meta property="og:locale:alternate" content={ogLocaleAlternate} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={copy.ogImageAlt} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />
	<meta name="twitter:image:alt" content={copy.ogImageAlt} />

	<!-- Safe: serializeJsonLd escapes every `<`, so copy can never close the script
	     tag early; the escaping contract is covered by its unit test. -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html jsonLd}
</svelte:head>
