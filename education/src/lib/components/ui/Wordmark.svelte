<script lang="ts">
	// Brand wordmark (docs/design/brand.md): the tittle of the "i" is the
	// identity's single color gesture. Layered-glyph technique — a full amber
	// "i" underneath, an ink dotless "ı" on top — so the dot sits exactly at
	// the typeface's native position.
	let { onDark = false }: { onDark?: boolean } = $props();
</script>

<span class="wordmark" class:on-dark={onDark}
	>Khun-S<span class="i"><span class="amber">i</span><span class="ink">ı</span></span>n</span
>

<style>
	.wordmark {
		font-weight: 500;
		letter-spacing: 0.005em;
	}
	.i {
		position: relative;
		display: inline-block;
	}
	.amber {
		color: var(--amber-600);
	}
	.on-dark .amber {
		color: var(--amber-400);
	}
	.ink {
		position: absolute;
		left: 0;
		top: 0;
		color: inherit;
	}
</style>
