<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import { useSite } from '$lib/copy';
	import SpeciesSection from '$lib/components/sections/learn/SpeciesSection.svelte';
	import ThreatsSection from '$lib/components/sections/learn/ThreatsSection.svelte';
	import ConservationSection from '$lib/components/sections/learn/ConservationSection.svelte';
	import SupportSection from '$lib/components/sections/learn/SupportSection.svelte';
	import WaveDivider from '$lib/components/ui/WaveDivider.svelte';

	const site = useSite();
	const meta = $derived(site().copy.meta.learn);
</script>

<Seo path="/learn" title={meta.title} description={meta.description} />

<SpeciesSection />
<WaveDivider from="var(--paper-200)" to="var(--navy-800)" />
<ThreatsSection />
<WaveDivider from="var(--navy-800)" to="var(--paper-200)" flip />
<ConservationSection />
<WaveDivider from="var(--navy-800)" to="var(--paper-200)" flip />
<SupportSection />
<WaveDivider from="var(--paper-200)" to="var(--navy-900)" height={56} />
