<script lang="ts">
	import SpeciesResourceCards from '$lib/components/ui/SpeciesResourceCards.svelte';
	import Seo from '$lib/seo/Seo.svelte';
	import { useSite } from '$lib/copy';
	import CetaceanHero from '$lib/components/sections/learn/CetaceanHero.svelte';
	import SpeciesSection from '$lib/components/sections/learn/SpeciesSection.svelte';
	import ThreatsSection from '$lib/components/sections/learn/ThreatsSection.svelte';
	import ConservationSection from '$lib/components/sections/learn/ConservationSection.svelte';

	const site = useSite();
	const meta = $derived(site().copy.meta.learn);
</script>

<Seo path="/cetaceans" title={meta.title} description={meta.description} />

<CetaceanHero />
<SpeciesSection />

<ThreatsSection />

<ConservationSection />

<SpeciesResourceCards scope="cetaceans" />
