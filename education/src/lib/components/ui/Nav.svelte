<script lang="ts">
	import { resolve } from '$app/paths';
	import Wordmark from '$lib/components/ui/Wordmark.svelte';
</script>

<header>
	<div class="wrap bar">
		<a class="brand" href={resolve('/')}><Wordmark onDark /></a>
		<nav aria-label="主導覽">
			<a href="{resolve('/')}#report">通報</a>
			<a href="{resolve('/')}#data">數據</a>
			<a href={resolve('/learn')}>知識分享</a>
		</nav>
	</div>
</header>

<style>
	header {
		position: sticky;
		top: 0;
		z-index: 10;
		background: var(--bg-band-darker);
		border-bottom: 1px solid var(--border-on-dark);
	}
	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 14px;
		padding-bottom: 14px;
	}
	.brand {
		color: var(--text-on-dark);
		font-weight: 500;
		font-size: 1.1rem;
		text-decoration: none;
		letter-spacing: 0.005em;
	}
	nav {
		display: flex;
		gap: 22px;
	}
	nav a {
		color: var(--text-on-dark-secondary);
		text-decoration: none;
		font-size: 0.95rem;
	}
	nav a:hover {
		color: var(--text-on-dark);
	}
</style>
