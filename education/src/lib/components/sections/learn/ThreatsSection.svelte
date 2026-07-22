<script lang="ts">
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	import { useSite } from '$lib/copy';

	const site = useSite();
	const c = $derived(site().copy);
	const head = $derived(c.sectionHeads.threats);
	const landSurprise = $derived(c.landSurprise);
</script>

<section class="band-dark">
	<div class="wrap">
		<SectionHead onDark eyebrow={head.eyebrow} title={head.title} lead={head.lead} />
		<div class="threats">
			{#each c.threats as threat (threat.title)}
				<div class="threat">
					<h3>{threat.title}</h3>
					<p>{threat.description}</p>
				</div>
			{/each}
		</div>

		<div class="surprise">
			<h3>{landSurprise.title}</h3>
			<p>{landSurprise.body}</p>
		</div>
	</div>
</section>

<style>
	section {
		padding: 92px 0;
	}
	.band-dark {
		background: var(--bg-band-dark);
	}
	.threats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
		gap: 18px;
	}
	.threat {
		background: var(--navy-700);
		border-radius: var(--radius);
		padding: 22px;
	}
	.threat h3 {
		color: var(--text-on-dark);
		font-size: 1.2rem;
		margin-bottom: 8px;
	}
	.threat p {
		font-size: 1rem;
		color: var(--text-on-dark-secondary);
	}
	.surprise {
		margin-top: 30px;
		background: var(--navy-700);
		/* border: 1px solid var(--border-on-dark); */
		border-left: 5px solid var(--accent);
		/* border-radius: 0 var(--radius) var(--radius) 0; */
		padding: 26px 28px;
	}
	.surprise h3 {
		color: var(--text-on-dark);
		font-size: 1.15rem;
		margin-bottom: 8px;
	}
	.surprise p {
		color: var(--text-on-dark-secondary);
	}
	@media (max-width: 860px) {
		section {
			padding: 64px 0;
		}
	}
</style>
