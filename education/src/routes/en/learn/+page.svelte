<script lang="ts">
	import SpeciesSection from '$lib/components/sections/learn/SpeciesSection.svelte';
	import ThreatsSection from '$lib/components/sections/learn/ThreatsSection.svelte';
	import ConservationSection from '$lib/components/sections/learn/ConservationSection.svelte';
	import SupportSection from '$lib/components/sections/learn/SupportSection.svelte';
	import WaveDivider from '$lib/components/ui/WaveDivider.svelte';
</script>

<svelte:head>
	<title>Stories · Khun-Sin</title>
	<meta
		name="description"
		content="Meet Taiwan’s cetaceans, the human-made threats they face, and the rescue network working for them."
	/>
</svelte:head>

<SpeciesSection />
<WaveDivider from="var(--paper-200)" to="var(--navy-800)" />
<ThreatsSection />
<WaveDivider from="var(--navy-800)" to="var(--paper-200)" flip />
<ConservationSection />
<WaveDivider from="var(--navy-800)" to="var(--paper-200)" flip />
<SupportSection />
<WaveDivider from="var(--paper-200)" to="var(--navy-900)" height={56} />
