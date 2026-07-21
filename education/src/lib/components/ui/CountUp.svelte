<script lang="ts">
	// Count-up number for stat displays. SSR renders the final value (SEO /
	// no-JS safe); on mount it restarts from 0 and tweens up, unless the user
	// prefers reduced motion. With `whenVisible`, the tween waits until the
	// number scrolls into view (for stats below the fold).
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	let {
		value,
		duration = 1400,
		whenVisible = false
	}: { value: number; duration?: number; whenVisible?: boolean } = $props();

	let el: HTMLSpanElement;

	// Deliberately captures the initial prop values — each instance animates a
	// fixed stat; the tween is driven manually in onMount.
	// svelte-ignore state_referenced_locally
	const tween = new Tween(value, { duration, easing: cubicOut });

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		tween.set(0, { duration: 0 });
		if (!whenVisible) {
			void tween.set(value);
			return;
		}
		const io = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						void tween.set(value);
						io.disconnect();
					}
				}
			},
			{ threshold: 0.4 }
		);
		io.observe(el);
		return () => io.disconnect();
	});
</script>

<span bind:this={el}>{Math.round(tween.current)}</span>
