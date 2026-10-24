<script lang="ts">
	import { useSite } from '$lib/copy';
	import {
		speciesLinks,
		speciesToolCopy,
		type SpeciesScope,
		type SpeciesTool
	} from '$lib/navigation';
	import Seo from '$lib/seo/Seo.svelte';
	import { buildDataset } from '$lib/seo/schema';
	import MapSection from '$lib/components/sections/home/MapSection.svelte';
	import DataDashboard from '$lib/components/sections/home/DataDashboard.svelte';
	let { scope, tool }: { scope: SpeciesScope; tool: SpeciesTool } = $props();
	const site = useSite();
	const meta = $derived(speciesToolCopy(site().locale, scope, tool));
	const path = $derived(speciesLinks(site().locale, scope)[tool].path);
</script>

<Seo
	{path}
	title={meta.title + ' | Khun-Sin'}
	description={meta.description}
	schema={tool === 'data' ? [buildDataset(site(), scope)] : []}
/>
{#if tool === 'map'}<MapSection {scope} />{:else}<DataDashboard {scope} />{/if}
