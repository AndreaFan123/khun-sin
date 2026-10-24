<script lang="ts">
	let { kind, title, items }: { kind: 'do' | 'dont'; title: string; items: string[] } = $props();
</script>

<div class="dd {kind}">
	<h3>{title}</h3>
	<ul>
		{#each items as item (item)}
			<li>{item}</li>
		{/each}
	</ul>
</div>

<style>
	.dd {
		border-radius: var(--radius);
		padding: 30px;
		background: var(--bg-card);
	}
	.dd.dont {
		background: var(--bg-soft);
	}
	h3 {
		font-size: 26px;
		margin-bottom: 20px;
	}
	.dont h3 {
		color: var(--accent-text);
	}
	ul {
		padding-left: 1.2em;
		display: grid;
		gap: 18px;
	}
	li {
		font-size: 19px;
		padding-left: 4px;
		color: var(--text-secondary);
		line-height: 1.9;
	}
	@media (max-width: 640px) {
		.dd {
			padding: 25px;
		}
		h3 {
			font-size: 24px;
		}
		li {
			font-size: 18px;
		}
	}
</style>
