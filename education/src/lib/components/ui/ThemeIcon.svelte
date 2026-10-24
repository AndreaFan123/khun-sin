<script lang="ts">
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	import Monitor from '@lucide/svelte/icons/monitor';
	import type { ThemeMode } from '$lib/theme';
	let { mode }: { mode: ThemeMode } = $props();
</script>

{#if mode === 'light'}
	<Sun size={22} strokeWidth={1.8} aria-hidden="true" style="flex-shrink: 0" />
{:else if mode === 'dark'}
	<Moon size={22} strokeWidth={1.8} aria-hidden="true" style="flex-shrink: 0" />
{:else}
	<Monitor size={22} strokeWidth={1.8} aria-hidden="true" style="flex-shrink: 0" />
{/if}
