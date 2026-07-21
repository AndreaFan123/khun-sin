<script lang="ts">
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	import StepCard from '$lib/components/ui/StepCard.svelte';
	import DoDontList from '$lib/components/ui/DoDontList.svelte';
	import { hotline, reportSteps, doList, dontList, reportEvenIfDead } from '$lib/data/site';
</script>

<section id="report">
	<div class="wrap">
		<SectionHead
			eyebrow="如何通報與參與"
			title="「通報」是最關鍵的第一步"
			lead="絕大多數擱淺鯨豚在發現時已經死亡，幸運的話，可能還有一線生機！活體救援是分秒必爭的事。第一步，從一通電話開始。你不需要是專家——只需要知道該打給誰、以及有哪些該做與不該做的事。"
		/>

		<div class="callbar">
			<div class="big">
				{hotline.number}<small>{hotline.label}</small>
			</div>
			<p>{hotline.description}</p>
		</div>

		<div class="steps">
			{#each reportSteps as step, i (step.title)}
				<StepCard {step} index={i} />
			{/each}
		</div>

		<div class="dodont">
			<DoDontList kind="do" title="該做的事" items={doList} />
			<DoDontList kind="dont" title="絕對不要做的事" items={dontList} />
		</div>

		<div class="dead-note">
			<h3>{reportEvenIfDead.title}</h3>
			<p>{reportEvenIfDead.body}</p>
		</div>
	</div>
</section>

<style>
	section {
		padding: 92px 0;
	}
	.callbar {
		display: flex;
		flex-wrap: wrap;
		align-items: start;
		gap: 20px;
		justify-content: space-between;
		background: var(--bg-band-dark);
		color: var(--text-on-dark);
		border-radius: var(--radius);
		padding: 30px 34px;
	}
	.callbar .big {
		font-size: clamp(3rem, 7vw, 5rem);
		font-weight: 800;
		letter-spacing: 0.04em;
		line-height: 1;
		color: var(--accent);
		font-variant-numeric: tabular-nums;
	}
	.callbar .big small {
		display: block;
		font-size: 2rem;
		font-weight: 600;
		color: var(--text-on-dark-secondary);
		letter-spacing: 0.1em;
		margin-top: 6px;
	}
	.callbar p {
		max-width: 44ch;
		color: var(--text-on-dark-secondary);
		font-size: 0.98rem;
	}
	.steps {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 18px;
		margin-top: 50px;
	}
	.dodont {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
		margin-top: 50px;
	}
	.dead-note {
		margin-top: 30px;
		background: var(--bg-band-dark);
		color: var(--text-on-dark);
		border-radius: var(--radius);
		padding: 28px 32px;
	}
	.dead-note h3 {
		color: var(--text-on-dark);
		font-size: 1.18rem;
		margin-bottom: 10px;
	}
	.dead-note p {
		color: var(--text-on-dark-secondary);
	}
	@media (max-width: 860px) {
		section {
			padding: 64px 0;
		}
		.dodont {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 640px) {
		.steps {
			/* min(300px, 100%) so ultra-narrow screens (<324px content) never overflow */
			grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
		}
	}
</style>
