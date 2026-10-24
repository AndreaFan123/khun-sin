<script lang="ts">
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import { useSite } from '$lib/copy';
	import type { CountyCount } from '$lib/data/strandings';
	let { rows }: { rows: CountyCount[] } = $props();
	const site = useSite();
	const en = $derived(site().locale === 'en');
</script>

<details>
	<summary
		><ChevronRight class="summary-chevron" size="1em" aria-hidden="true" />{en
			? 'Read all county counts'
			: '閱讀所有縣市數量'}</summary
	>
	<table>
		<caption
			>{en
				? '2025 recorded strandings by county (individuals)'
				: '2025 年各縣市擱淺紀錄（隻）'}</caption
		><thead
			><tr
				><th scope="col">{en ? 'County' : '縣市'}</th><th scope="col"
					>{en ? 'Individuals' : '數量（隻）'}</th
				></tr
			></thead
		><tbody
			>{#each rows as row (row.name)}<tr
					><th scope="row">{en ? row.nameEn : row.name}</th><td>{row.count}</td></tr
				>{/each}</tbody
		>
	</table>
</details>

<style>
	details {
		color: var(--text-primary);
		margin: 1.5rem 0;
	}
	summary {
		display: flex;
		align-items: center;
		gap: 0.35em;
		list-style: none;
		cursor: pointer;
		min-height: 44px;
		padding: 0.5rem 0;
	}
	summary::-webkit-details-marker {
		display: none;
	}
	summary::marker {
		content: '';
	}
	summary :global(.summary-chevron) {
		flex-shrink: 0;
	}
	details[open] > summary :global(.summary-chevron) {
		transform: rotate(90deg);
	}
	table {
		width: 100%;
		border-collapse: collapse;
	}
	caption {
		text-align: left;
		padding: 0.75rem 0;
	}
	th,
	td {
		text-align: left;
		padding: 0.5rem;
		border-bottom: 1px solid var(--border);
	}
	td {
		text-align: right;
		font-variant-numeric: tabular-nums;
	}
</style>
