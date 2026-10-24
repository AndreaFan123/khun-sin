<script lang="ts">
	import SpeciesDetailIntro from '$lib/components/sections/learn/SpeciesDetailIntro.svelte';
	import TaiwaneseWhiteDolphinEvidence from '$lib/components/sections/learn/TaiwaneseWhiteDolphinEvidence.svelte';
	import { taiwaneseWhiteDolphinContentEn as content } from '$lib/data/taiwanese-white-dolphin';
</script>

<SpeciesDetailIntro
	path="/en/cetaceans/sousa-chinensis-taiwanensis"
	title={content.hero.title}
	description={content.hero.description}
	eyebrow={content.hero.eyebrow}
	scientificName={content.hero.scientificName}
	statusTitle={content.hero.statusTitle}
	statusBody={content.hero.statusBody}
	backPath="/en/cetaceans"
	backLabel={content.hero.backLabel}
	image={content.hero.image}
/>

<TaiwaneseWhiteDolphinEvidence {content} />
