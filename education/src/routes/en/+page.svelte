<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import { useSite } from '$lib/copy';
	import Hero from '$lib/components/sections/home/Hero.svelte';
	import HowToReport from '$lib/components/sections/home/HowToReport.svelte';
	import DataDashboard from '$lib/components/sections/home/DataDashboard.svelte';
	import MapSection from '$lib/components/sections/home/MapSection.svelte';
	import WaveDivider from '$lib/components/ui/WaveDivider.svelte';

	const site = useSite();
	const meta = $derived(site().copy.meta.home);
</script>

<Seo path="/en" title={meta.title} description={meta.description} />

<Hero />
<WaveDivider
	from="var(--navy-900)"
	to="var(--paper-200)"
	height={110}
	layers={['var(--navy-700)', 'var(--navy-500)', 'var(--slate-400)', 'var(--slate-200)']}
/>
<HowToReport />
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
