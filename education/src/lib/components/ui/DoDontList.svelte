<script lang="ts">
	let { kind, title, items }: { kind: 'do' | 'dont'; title: string; items: string[] } = $props();
</script>

<div class="dd {kind}">
	<h4>{title}</h4>
	<ul>
		{#each items as item (item)}
			<li>{item}</li>
		{/each}
	</ul>
</div>

<style>
	.dd {
		border-radius: var(--radius);
		padding: 24px 26px;
		border: 1px solid var(--border);
		border-left-width: 3px;
		border-radius: 0 var(--radius) var(--radius) 0;
	}
	.dd.do {
		background: var(--green-100);
		border-left-color: var(--green-600);
	}
	.dd.dont {
		background: var(--rust-100);
		border-left-color: var(--rust-600);
	}
	h4 {
		font-size: 1.1rem;
		margin-bottom: 14px;
	}
	.do h4 {
		color: var(--green-800);
	}
	.dont h4 {
		color: var(--rust-700);
	}
	ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 11px;
	}
	li {
		font-size: 0.95rem;
		padding-left: 16px;
		position: relative;
		color: var(--text-secondary);
	}
	li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.65em;
		width: 6px;
		height: 6px;
		border-radius: 50%;
	}
	.do li::before {
		background: var(--green-600);
	}
	.dont li::before {
		background: var(--rust-600);
	}
</style>
