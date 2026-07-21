<script lang="ts">
	import Hero from '$lib/components/sections/home/Hero.svelte';
	import HowToReport from '$lib/components/sections/home/HowToReport.svelte';
	// import ReportFormTeaser from '$lib/components/sections/home/ReportFormTeaser.svelte';
	import DataDashboard from '$lib/components/sections/home/DataDashboard.svelte';
	import MapSection from '$lib/components/sections/home/MapSection.svelte';
	// import Cta from '$lib/components/sections/home/Cta.svelte';
	import WaveDivider from '$lib/components/ui/WaveDivider.svelte';
</script>

<svelte:head>
	<title>Khun-Sin · 台灣鯨豚擱淺通報與數據</title>
	<meta name="description" content="發現鯨豚擱淺請撥 118。台灣鯨豚擱淺通報資訊與官方數據視覺化。" />
</svelte:head>

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
