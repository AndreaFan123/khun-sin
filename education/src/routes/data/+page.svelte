<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import { useSite } from '$lib/copy';
	import { buildDataset } from '$lib/seo/schema';
	import DataDashboard from '$lib/components/sections/home/DataDashboard.svelte';

	const site = useSite();
	const meta = $derived(site().copy.meta.data);
</script>

<Seo
	path="/data"
	title={meta.title}
	description={meta.description}
	schema={[buildDataset(site())]}
/>
<DataDashboard />
