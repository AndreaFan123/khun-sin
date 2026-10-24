<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import { useSite } from '$lib/copy';
	import { buildHomeSchema } from '$lib/seo/schema';
	import Hero from '$lib/components/sections/home/Hero.svelte';
	import HowToReport from '$lib/components/sections/home/HowToReport.svelte';

	const site = useSite();
	const meta = $derived(site().copy.meta.home);

	// Reporting guidance belongs here; Dataset markup lives on the data pages.
	const schema = $derived(buildHomeSchema(site()));
</script>

<Seo path="/" title={meta.title} description={meta.description} {schema} />

<Hero />

<HowToReport />
