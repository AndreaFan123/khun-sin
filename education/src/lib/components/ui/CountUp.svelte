<script lang="ts">
	// Count-up number for stat displays. SSR renders the final value (SEO /
	// no-JS safe); on mount it restarts from 0 and tweens up, unless the user
	// prefers reduced motion.
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	let { value, duration = 1400 }: { value: number; duration?: number } = $props();

	// Deliberately captures the initial prop values — each instance animates a
	// fixed stat; the tween is driven manually in onMount.
	// svelte-ignore state_referenced_locally
	const tween = new Tween(value, { duration, easing: cubicOut });

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		tween.set(0, { duration: 0 });
		void tween.set(value);
	});
</script>

{Math.round(tween.current)}
