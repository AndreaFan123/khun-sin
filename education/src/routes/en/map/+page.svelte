<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import { useSite } from '$lib/copy';
	import MapSection from '$lib/components/sections/home/MapSection.svelte';

	const site = useSite();
	const meta = $derived(site().copy.meta.map);
</script>

<Seo path="/en/map" title={meta.title} description={meta.description} />
<MapSection />
