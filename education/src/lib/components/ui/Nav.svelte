<script lang="ts">
	import { resolve } from '$app/paths';
	import Wordmark from '$lib/components/ui/Wordmark.svelte';

	let y = $state(0);
	const scrolled = $derived(y > 48);
</script>

<svelte:window bind:scrollY={y} />

<header class:scrolled>
	<div class="bar">
		<a class="brand" href={resolve('/')}><Wordmark onDark={!scrolled} /></a>
		<nav aria-label="主導覽">
			<a href="{resolve('/')}#report">通報</a>
			<a href="{resolve('/')}#data">數據</a>
			<!-- <a href={resolve('/learn')}>知識分享</a> -->
		</nav>
	</div>
</header>

<nav class="bottom-bar" aria-label="行動版導覽">
	<a href="{resolve('/')}#report">通報</a>
	<a href="{resolve('/')}#data">數據</a>
	<a class="call" href="tel:118" aria-label="撥打 118 海巡署救援專線">撥打 118</a>
</nav>

<style>
	header {
		position: sticky;
		top: 0;
		z-index: 10;
		background: var(--bg-band-darker);
		border-bottom: 1px solid var(--border-on-dark);
		transition:
			background 0.25s ease,
			border-color 0.25s ease,
			padding 0.25s ease;
	}
	.bar {
		max-width: var(--maxw);
		margin: 0 auto;
		padding: 14px 24px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border: 1px solid transparent;
		transition:
			background 0.25s ease,
			border-color 0.25s ease,
			border-radius 0.25s ease,
			padding 0.25s ease;
	}
	.brand {
		color: var(--text-on-dark);
		font-weight: 500;
		font-size: 1.1rem;
		text-decoration: none;
		letter-spacing: 0.005em;
		transition: color 0.25s ease;
	}
	nav {
		display: flex;
		gap: 22px;
	}
	nav a {
		color: var(--text-on-dark-secondary);
		text-decoration: none;
		font-size: 0.95rem;
		transition: color 0.25s ease;
	}
	nav a:hover {
		color: var(--text-on-dark);
	}

	/* Scrolled: the full-width bar becomes a floating pill (flat — border, no shadow). */
	header.scrolled {
		background: transparent;
		border-bottom-color: transparent;
		padding: 10px 16px 0;
	}
	header.scrolled .bar {
		background: var(--paper-50);
		border-color: var(--border);
		border-radius: 999px;
		padding: 10px 26px;
	}
	header.scrolled .brand {
		color: var(--navy-700);
	}
	header.scrolled nav a {
		color: var(--slate-700);
	}
	header.scrolled nav a:hover {
		color: var(--navy-700);
	}

	/* Mobile: brand-only top bar + fixed bottom navbar with a direct-dial 118 button. */
	.bottom-bar {
		display: none;
	}
	@media (max-width: 640px) {
		header nav {
			display: none;
		}
		.bottom-bar {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 10;
			display: flex;
			align-items: center;
			justify-content: space-around;
			gap: 8px;
			background: var(--bg-band-darker);
			border-top: 1px solid var(--border-on-dark);
			padding: 10px 12px calc(10px + env(safe-area-inset-bottom));
		}
		.bottom-bar a {
			color: var(--text-on-dark-secondary);
			text-decoration: none;
			font-size: 0.95rem;
		}
		.bottom-bar .call {
			background: var(--accent);
			color: var(--navy-900);
			font-weight: 700;
			border-radius: 999px;
			padding: 9px 18px;
			font-variant-numeric: tabular-nums;
		}
		:global(body) {
			padding-bottom: calc(58px + env(safe-area-inset-bottom));
		}
	}

	@media (prefers-reduced-motion: reduce) {
		header,
		.bar,
		.brand,
		nav a {
			transition: none;
		}
	}
</style>
