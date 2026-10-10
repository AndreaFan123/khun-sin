<script lang="ts">
	import TurtlePage from '$lib/components/sections/turtles/TurtlePage.svelte';
	import { turtlePage } from '$lib/data/turtles-en';
</script>

<TurtlePage copy={turtlePage} path="/en/turtles" />
