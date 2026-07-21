<script lang="ts">
	import SpeciesSection from '$lib/components/sections/learn/SpeciesSection.svelte';
	import ThreatsSection from '$lib/components/sections/learn/ThreatsSection.svelte';
	import ConservationSection from '$lib/components/sections/learn/ConservationSection.svelte';
	import WaveDivider from '$lib/components/ui/WaveDivider.svelte';
</script>

<svelte:head>
	<title>知識分享 · Khun-Sin</title>
	<meta name="description" content="認識臺灣的鯨豚、人為威脅與保育行動的成果。" />
</svelte:head>

<SpeciesSection />
<WaveDivider from="var(--paper-200)" to="var(--navy-800)" />
<ThreatsSection />
<WaveDivider from="var(--navy-800)" to="var(--paper-200)" flip />
<ConservationSection />
<WaveDivider from="var(--paper-200)" to="var(--navy-900)" height={60} />
