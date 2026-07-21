<script lang="ts">
	import SectionHead from '$lib/components/ui/SectionHead.svelte';
	import TaiwanMap from '$lib/components/charts/TaiwanMap.svelte';
</script>

<section id="map">
	<div class="wrap">
		<SectionHead
			onDark
			eyebrow="擱淺地圖"
			title="擱淺發生在哪裡"
			lead="每個亮點是一個縣市，大小代表 2025 年的擱淺數量。連江、金門、澎湖三個離島縣市合計 65 隻——佔了全台的 51%，離島近岸的江豚族群是熱點中的熱點。"
		/>

		<TaiwanMap />

		<div class="legend">
			<span class="li"><span class="sw offshore"></span>離島縣市（熱點）</span>
			<span class="li"><span class="sw main"></span>本島縣市</span>
			<span class="note">亮點大小 ∝ 擱淺數量（隻）</span>
		</div>
	</div>
</section>

<style>
	section {
		padding: 92px 0;
		background: var(--bg-band-darker);
	}
	.legend {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 20px;
		margin-top: 28px;
		font-size: 0.9rem;
		color: var(--text-on-dark-secondary);
	}
	.li {
		display: inline-flex;
		align-items: center;
		gap: 7px;
	}
	.sw {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		display: inline-block;
	}
	.sw.offshore {
		background: var(--accent);
	}
	.sw.main {
		background: var(--slate-300);
	}
	.note {
		color: var(--text-muted);
	}
	@media (max-width: 860px) {
		section {
			padding: 64px 0;
		}
	}
</style>
