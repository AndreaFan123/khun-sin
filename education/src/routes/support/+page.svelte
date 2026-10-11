<script lang="ts">
	import Seo from '$lib/seo/Seo.svelte';
	import { useSite } from '$lib/copy';
	import SupportSection from '$lib/components/sections/learn/SupportSection.svelte';
	import WaveDivider from '$lib/components/ui/WaveDivider.svelte';

	const site = useSite();
	const meta = $derived(site().copy.meta.support);
</script>

<Seo path="/support" title={meta.title} description={meta.description} />

<SupportSection />
<WaveDivider from="var(--paper-200)" to="var(--navy-900)" height={56} />
