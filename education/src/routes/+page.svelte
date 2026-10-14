<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import { useSite } from '$lib/copy';
	import { buildHomeSchema } from '$lib/seo/schema';
	import Hero from '$lib/components/sections/home/Hero.svelte';
	import HowToReport from '$lib/components/sections/home/HowToReport.svelte';
	import WaveDivider from '$lib/components/ui/WaveDivider.svelte';

	const site = useSite();
	const meta = $derived(site().copy.meta.home);

	// Reporting guidance belongs here; Dataset markup lives on the data pages.
	const schema = $derived(buildHomeSchema(site()));
</script>

<Seo path="/" title={meta.title} description={meta.description} {schema} />

<Hero />
<WaveDivider
	from="var(--navy-900)"
	to="var(--paper-200)"
	height={110}
	overlayPrevious
	layers={['var(--navy-700)', 'var(--navy-500)', 'var(--slate-400)', 'var(--slate-200)']}
/>
<HowToReport />
