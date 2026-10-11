<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import { useSite } from '$lib/copy';
	import CetaceanHero from '$lib/components/sections/learn/CetaceanHero.svelte';
	import SpeciesSection from '$lib/components/sections/learn/SpeciesSection.svelte';
	import ThreatsSection from '$lib/components/sections/learn/ThreatsSection.svelte';
	import ConservationSection from '$lib/components/sections/learn/ConservationSection.svelte';
	import WaveDivider from '$lib/components/ui/WaveDivider.svelte';

	const site = useSite();
	const meta = $derived(site().copy.meta.learn);
</script>

<Seo path="/cetaceans" title={meta.title} description={meta.description} />

<CetaceanHero />
<SpeciesSection />
<WaveDivider from="var(--paper-200)" to="var(--navy-800)" />
<ThreatsSection />
<WaveDivider from="var(--navy-800)" to="var(--paper-200)" flip />
<ConservationSection />
<WaveDivider from="var(--navy-800)" to="var(--navy-900)" height={56} />
