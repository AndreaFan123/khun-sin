<script lang="ts">
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	import type { TurtlePageCopy } from '$lib/data/turtles';

	let {
		journeyHead,
		journey,
		threatsHead,
		threats
	}: {
		journeyHead: TurtlePageCopy['journeyHead'];
		journey: TurtlePageCopy['journey'];
		threatsHead: TurtlePageCopy['threatsHead'];
		threats: TurtlePageCopy['threats'];
	} = $props();
</script>

<section class="journey band-dark">
	<div class="wrap">
		<SectionHead
			onDark
			eyebrow={journeyHead.eyebrow}
			title={journeyHead.title}
			lead={journeyHead.lead}
		/>
		<ol>
			{#each journey as stage, index (stage.title)}
				<li>
					<span class="marker" aria-hidden="true">{index + 1}</span>
					<h2>{stage.title}</h2>
					<p>{stage.description}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<section class="threats">
	<div class="wrap threats-layout">
		<SectionHead eyebrow={threatsHead.eyebrow} title={threatsHead.title} lead={threatsHead.lead} />
		<div class="threat-list">
			{#each threats as threat (threat.title)}
				<article>
					<h2>{threat.title}</h2>
					<p>{threat.description}</p>
				</article>
			{/each}
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
	ol {
		position: relative;
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 20px;
		list-style: none;
	}
	ol::before {
		content: '';
		position: absolute;
		top: 19px;
		left: 5%;
		right: 5%;
		height: 1px;
		background: var(--slate-500);
	}
	li {
		position: relative;
	}
	.marker {
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		margin-bottom: 22px;
		border: 1px solid var(--slate-400);
		border-radius: 50%;
		background: var(--navy-800);
		color: var(--accent);
		font-weight: 700;
	}
	li h2 {
		margin-bottom: 10px;
		color: var(--text-on-dark);
		font-size: 1.15rem;
	}
	li p {
		color: var(--text-on-dark-secondary);
		font-size: 0.94rem;
	}
	.threats-layout {
		display: grid;
		grid-template-columns: minmax(0, 0.9fr) minmax(420px, 1.1fr);
		gap: 70px;
	}
	.threat-list {
		border-top: 1px solid var(--paper-400);
	}
	article {
		display: grid;
		grid-template-columns: minmax(150px, 0.45fr) 1fr;
		gap: 28px;
		padding: 24px 0;
		border-bottom: 1px solid var(--paper-400);
	}
	article h2 {
		font-size: 1.08rem;
	}
	article p {
		color: var(--text-secondary);
	}
	@media (max-width: 860px) {
		section {
			padding: 64px 0;
		}
		ol {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 34px 22px;
		}
		ol::before {
			display: none;
		}
		.threats-layout {
			grid-template-columns: 1fr;
			gap: 18px;
		}
	}
	@media (max-width: 560px) {
		ol {
			grid-template-columns: 1fr;
		}
		article {
			grid-template-columns: 1fr;
			gap: 8px;
		}
	}
</style>
