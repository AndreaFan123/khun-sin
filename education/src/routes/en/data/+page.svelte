<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import { useSite } from '$lib/copy';
	import DataDashboard from '$lib/components/sections/home/DataDashboard.svelte';

	const site = useSite();
	const meta = $derived(site().copy.meta.data);
</script>

<Seo path="/en/data" title={meta.title} description={meta.description} />
<DataDashboard />
