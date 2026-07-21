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
			title="發現擱淺，你就是關鍵的第一棒"
			lead="絕大多數擱淺鯨豚在發現時已經死亡，活體救援是分秒必爭的事。而救援的第一步，往往就從一位路過民眾的一通電話開始。你不需要是專家——你只需要知道該打給誰、以及該做與不該做的事。"
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
		align-items: center;
		gap: 20px;
		justify-content: space-between;
		background: var(--bg-band-dark);
		color: var(--text-on-dark);
		border-radius: var(--radius);
		padding: 30px 34px;
	}
	.callbar .big {
		font-size: clamp(2.4rem, 7vw, 3.4rem);
		font-weight: 800;
		letter-spacing: 0.04em;
		line-height: 1;
		color: var(--accent);
		font-variant-numeric: tabular-nums;
	}
	.callbar .big small {
		display: block;
		font-size: 0.95rem;
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
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 18px;
		margin-top: 34px;
	}
	.dodont {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
		margin-top: 34px;
	}
	.dead-note {
		margin-top: 26px;
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
</style>
