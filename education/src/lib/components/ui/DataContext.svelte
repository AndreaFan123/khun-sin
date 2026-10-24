<script lang="ts">
	import { useSite } from '$lib/copy';
	import {
		annualReport2025,
		turtleStatisticsSource,
		strandingReportsSource
	} from '$lib/data/report-sources';
	let { map = false, turtle = false }: { map?: boolean; turtle?: boolean } = $props();
	const site = useSite();
	const en = $derived(site().locale === 'en');
</script>

<p class="data-context">
	{en
		? map
			? '2025 full-year county records, individuals. Locations show recorded strandings, not population distribution.'
			: turtle
				? 'Annual trend: 2019–2025. Breakdowns: 2025 full year. Annual totals count individuals; event categories count reports.'
				: 'Annual trend: 2019–2025. Breakdowns: 2025 full year. Counts refer to individuals and do not estimate wild populations.'
		: map
			? '2025 全年度縣市紀錄，單位為隻。呈現通報擱淺的位置，不代表野外族群分布。'
			: turtle
				? '年度趨勢為 2019–2025 年，其餘為 2025 全年度。個體數使用隻，事件分類使用件。'
				: '年度趨勢為 2019–2025 年，其餘為 2025 全年度。單位為隻，擱淺通報量不等於野外族群數。'}
	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- official source -->
	<a href={turtle ? turtleStatisticsSource : annualReport2025} target="_blank" rel="noopener"
		>{en
			? turtle
				? 'Source: OCA sea turtle statistics'
				: 'Source: OCA 2025 annual report'
			: turtle
				? '來源：海保署國內海龜擱淺事件統計'
				: '來源：海保署 2025 全年度擱淺報告'}</a
	>
	{#if !map}
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- official report collection -->
		<a href={strandingReportsSource} target="_blank" rel="noopener"
			>{en ? 'Annual report archive' : '歷年擱淺報告'}</a
		>
		{#if turtle}
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- official PDF page -->
			<a href={annualReport2025 + '#page=14'} target="_blank" rel="noopener"
				>{en ? 'Event categories: 2025 report, p.13' : '事件分類：2025 年報第 13 頁'}</a
			>
		{/if}
	{/if}
</p>

<style>
	.data-context {
		font-size: 0.9rem;
		line-height: 1.8;
		margin: 1rem 0 1.5rem;
	}
	.data-context a {
		color: inherit;
		text-underline-offset: 0.2em;
		margin-left: 0.5rem;
	}
</style>
