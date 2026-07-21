<script lang="ts">
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	import { threats, landSurprise } from '$lib/data/site';
</script>

<section class="band-dark">
	<div class="wrap">
		<SectionHead
			onDark
			eyebrow="人為威脅"
			title="鯨豚面臨的人為威脅"
			lead="混獲、撞擊、噪音、廢棄物——多數威脅來自人類活動。認識它們，是減少傷害的第一步。"
		/>
		<div class="threats">
			{#each threats as threat (threat.title)}
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
