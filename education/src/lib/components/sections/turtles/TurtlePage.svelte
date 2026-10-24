<script lang="ts">
	import SpeciesResourceCards from '$lib/components/ui/SpeciesResourceCards.svelte';
	import Seo from '$lib/seo/Seo.svelte';
	import TurtleHero from './TurtleHero.svelte';
	import TurtleSpeciesSection from './TurtleSpeciesSection.svelte';
	import TurtleJourneySection from './TurtleJourneySection.svelte';
	import type { RoutePath } from '$lib/seo/routes';
	import type { TurtlePageCopy } from '$lib/data/turtles';

	let { copy, path }: { copy: TurtlePageCopy; path: RoutePath } = $props();
</script>

<Seo {path} title={copy.meta.title} description={copy.meta.description} />

<TurtleHero copy={copy.hero} />
<TurtleSpeciesSection head={copy.speciesHead} species={copy.species} />

<TurtleJourneySection
	journeyHead={copy.journeyHead}
	journey={copy.journey}
	threatsHead={copy.threatsHead}
	threats={copy.threats}
/>

<SpeciesResourceCards scope="sea-turtles" />
