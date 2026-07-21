<script lang="ts">
	import Hero from '$lib/components/sections/home/Hero.svelte';
	import HowToReport from '$lib/components/sections/home/HowToReport.svelte';
	import ReportFormTeaser from '$lib/components/sections/home/ReportFormTeaser.svelte';
	import DataDashboard from '$lib/components/sections/home/DataDashboard.svelte';
	import Cta from '$lib/components/sections/home/Cta.svelte';
</script>

<svelte:head>
	<title>Khun-Sin · 臺灣鯨豚擱淺通報與數據</title>
	<meta name="description" content="發現鯨豚擱淺請撥 118。臺灣鯨豚擱淺通報資訊與官方數據視覺化。" />
</svelte:head>

<Hero />
<HowToReport />
<ReportFormTeaser />
<DataDashboard />
<Cta />
