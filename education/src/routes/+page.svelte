<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import { useSite } from '$lib/copy';
	import { buildDataset, buildFaqPage, buildHowTo } from '$lib/seo/schema';
	import Hero from '$lib/components/sections/home/Hero.svelte';
	import HowToReport from '$lib/components/sections/home/HowToReport.svelte';
	// import ReportFormTeaser from '$lib/components/sections/home/ReportFormTeaser.svelte';
	import DataDashboard from '$lib/components/sections/home/DataDashboard.svelte';
	import MapSection from '$lib/components/sections/home/MapSection.svelte';
	// import Cta from '$lib/components/sections/home/Cta.svelte';
	import WaveDivider from '$lib/components/ui/WaveDivider.svelte';

	const site = useSite();
	const meta = $derived(site().copy.meta.home);

	// The response guidance and the statistics are what answer engines
	// should be able to quote from this page (#41, #42).
	const schema = $derived([
		buildHowTo(site().copy, site().locale),
		buildFaqPage(site().copy, site().locale),
		buildDataset(site().copy, site().locale)
	]);
</script>

<Seo path="/" title={meta.title} description={meta.description} {schema} />

<Hero />
<WaveDivider
	from="var(--navy-900)"
	to="var(--paper-200)"
	height={110}
	layers={['var(--navy-700)', 'var(--navy-500)', 'var(--slate-400)', 'var(--slate-200)']}
/>
<HowToReport />
<!-- <ReportFormTeaser /> -->
<WaveDivider from="var(--paper-200)" to="var(--navy-800)" flip />
<DataDashboard />
<WaveDivider
	from="var(--navy-800)"
	to="var(--navy-900)"
	stroke="var(--slate-500)"
	height={70}
	flip
/>
<MapSection />
<WaveDivider from="var(--navy-900)" to="var(--navy-900)" stroke="var(--slate-500)" height={56} />
<!-- <Cta /> -->
