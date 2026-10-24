<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import { useSite } from '$lib/copy';
	import SupportSection from '$lib/components/sections/learn/SupportSection.svelte';

	const site = useSite();
	const meta = $derived(site().copy.meta.support);
</script>

<Seo path="/en/support" title={meta.title} description={meta.description} />

<SupportSection />
