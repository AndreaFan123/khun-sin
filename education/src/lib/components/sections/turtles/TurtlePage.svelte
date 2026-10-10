<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import WaveDivider from '$lib/components/ui/WaveDivider.svelte';
	import TurtleHero from './TurtleHero.svelte';
	import TurtleSpeciesSection from './TurtleSpeciesSection.svelte';
	import TurtleJourneySection from './TurtleJourneySection.svelte';
	import TurtleRescueSection from './TurtleRescueSection.svelte';
	import type { RoutePath } from '$lib/seo/routes';
	import type { TurtlePageCopy } from '$lib/data/turtles';

	let { copy, path }: { copy: TurtlePageCopy; path: RoutePath } = $props();
</script>

<Seo {path} title={copy.meta.title} description={copy.meta.description} />

<TurtleHero copy={copy.hero} />
<WaveDivider
	from="var(--navy-900)"
	to="var(--paper-200)"
	height={110}
	layers={['var(--navy-700)', 'var(--navy-500)', 'var(--slate-400)', 'var(--slate-200)']}
/>
<TurtleSpeciesSection head={copy.speciesHead} species={copy.species} />
<WaveDivider from="var(--paper-200)" to="var(--navy-800)" flip />
<TurtleJourneySection
	journeyHead={copy.journeyHead}
	journey={copy.journey}
	threatsHead={copy.threatsHead}
	threats={copy.threats}
/>
<WaveDivider from="var(--paper-200)" to="var(--navy-900)" />
<TurtleRescueSection rescue={copy.rescue} sources={copy.sources} />
<WaveDivider from="var(--paper-200)" to="var(--navy-900)" height={56} />
