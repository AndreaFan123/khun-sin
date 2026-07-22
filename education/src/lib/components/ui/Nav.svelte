<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { useSite } from '$lib/copy';
	import Wordmark from '$lib/components/ui/Wordmark.svelte';

	let y = $state(0);
	const scrolled = $derived(y > 48);

	let menuOpen = $state(false);
	const closeMenu = () => (menuOpen = false);

	const site = useSite();
	const isEn = $derived(site().locale === 'en');
	const ui = $derived(site().copy.uiCopy);

	// Localized route targets: the switcher jumps to the same page in the
	// other language; section anchors stay on the current locale's home.
	const home = $derived(isEn ? resolve('/en') : resolve('/'));
	const learn = $derived(isEn ? resolve('/en/learn') : resolve('/learn'));
	const onLearn = $derived(page.url.pathname.endsWith('/learn'));
	const otherLocale = $derived(
		isEn
			? onLearn
				? resolve('/learn')
				: resolve('/')
			: onLearn
				? resolve('/en/learn')
				: resolve('/en')
	);
</script>

<svelte:window bind:scrollY={y} />

<header class:scrolled>
	<div class="bar">
		<a class="brand" href={home}><Wordmark onDark /></a>
		<div class="right">
			<nav aria-label="主導覽">
				<a href="{home}#report">{ui.navReport}</a>
				<a href="{home}#data">{ui.navData}</a>
				<a href="{home}#map">{ui.navMap}</a>
				<a href={learn}>{ui.navLearn}</a>
			</nav>
			<div class="lang" role="group" aria-label="語言 / Language">
				<a
					href={isEn ? otherLocale : home}
					class:active={!isEn}
					aria-current={!isEn ? 'true' : undefined}>中</a
				>
				<span class="sep" aria-hidden="true">/</span>
				<a
					href={isEn ? home : otherLocale}
					class:active={isEn}
					aria-current={isEn ? 'true' : undefined}>EN</a
				>
			</div>
		</div>
	</div>
</header>

{#if menuOpen}
	<button class="backdrop" aria-label={ui.menuCloseLabel} onclick={closeMenu}></button>
	<nav id="mobile-menu" class="sheet" aria-label="行動版選單">
		<a href="{home}#report" onclick={closeMenu}>{ui.navReport}</a>
		<a href="{home}#data" onclick={closeMenu}>{ui.navData}</a>
		<a href="{home}#map" onclick={closeMenu}>{ui.navMap}</a>
		<a href={learn} onclick={closeMenu}>{ui.navLearn}</a>
		<a href="{learn}#support" onclick={closeMenu}>{ui.navSupport}</a>
	</nav>
{/if}

<div class="bottom-bar">
	<button
		class="menu-btn"
		aria-expanded={menuOpen}
		aria-controls="mobile-menu"
		aria-label={menuOpen ? ui.menuCloseLabel : ui.menuOpenLabel}
		onclick={() => (menuOpen = !menuOpen)}
	>
		<!-- Lucide icons (ISC license, lucide.dev), inlined to keep zero runtime deps -->
		{#if menuOpen}
			<svg viewBox="0 0 24 24" aria-hidden="true"
				><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
			>
		{:else}
			<svg viewBox="0 0 24 24" aria-hidden="true"
				><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="12" y2="12" /><line
					x1="4"
					x2="20"
					y1="18"
					y2="18"
				/></svg
			>
		{/if}
	</button>

	<a class="lang-m" href={otherLocale}>
		{isEn ? '中文' : 'EN'}
	</a>

	<a class="call" href="tel:118" aria-label={ui.dialAriaLabel}>
		<svg viewBox="0 0 24 24" aria-hidden="true"
			><path
				d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
			/></svg
		>
		<span>118</span>
	</a>
</div>

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
	.right {
		display: flex;
		align-items: center;
		gap: 22px;
	}
	nav {
		display: flex;
		gap: 22px;
	}
	.lang {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 0.9rem;
	}
	.lang a {
		color: var(--text-on-dark-secondary);
		text-decoration: none;
	}
	.lang a.active {
		color: var(--accent);
		font-weight: 700;
	}
	.sep {
		color: var(--slate-600);
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

	/* Scrolled: the full-width bar becomes a floating pill — hero navy with a
	   slight backdrop blur (Andrea's call; the one sanctioned blur). */
	header.scrolled {
		background: transparent;
		border-bottom-color: transparent;
		padding: 10px 16px 0;
	}
	header.scrolled .bar {
		background: rgba(16, 31, 61, 0.72);
		-webkit-backdrop-filter: blur(8px);
		backdrop-filter: blur(8px);
		border-color: var(--border-on-dark);
		border-radius: 999px;
		padding: 10px 26px;
	}

	/* Mobile: two-button bottom bar — menu (left) opens the sheet with the
	   desktop links; direct-dial 118 (right) with the Lucide phone icon. */
	.bottom-bar,
	.sheet,
	.backdrop {
		display: none;
	}
	@media (max-width: 640px) {
		header nav,
		header .lang {
			display: none;
		}
		.lang-m {
			color: var(--text-on-dark);
			text-decoration: none;
			font-size: 1rem;
			border: 1px solid var(--border-on-dark);
			border-radius: 999px;
			padding: 8px 16px;
		}
		.bottom-bar {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 12;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: var(--bg-band-darker);
			border-top: 1px solid var(--border-on-dark);
			padding: 10px 18px calc(10px + env(safe-area-inset-bottom));
		}
		.bottom-bar svg {
			width: 22px;
			height: 22px;
			fill: none;
			stroke: currentColor;
			stroke-width: 2;
			stroke-linecap: round;
			stroke-linejoin: round;
		}
		.menu-btn {
			display: inline-flex;
			align-items: center;
			gap: 8px;
			background: none;
			border: none;
			color: var(--text-on-dark);
			font-size: 1rem;
			font-family: inherit;
			padding: 8px 10px;
		}
		.call {
			display: inline-flex;
			align-items: center;
			gap: 8px;
			background: var(--accent);
			color: var(--navy-900);
			font-weight: 700;
			border-radius: 999px;
			padding: 10px 20px;
			text-decoration: none;
			font-variant-numeric: tabular-nums;
			font-size: 1.05rem;
		}
		.backdrop {
			display: block;
			position: fixed;
			inset: 0;
			z-index: 11;
			background: rgba(16, 31, 61, 0.45);
			border: none;
			padding: 0;
		}
		.sheet {
			position: fixed;
			left: 14px;
			right: 14px;
			bottom: calc(74px + env(safe-area-inset-bottom));
			z-index: 12;
			display: flex;
			flex-direction: column;
			background: rgba(16, 31, 61, 0.9);
			-webkit-backdrop-filter: blur(8px);
			backdrop-filter: blur(8px);
			border: 1px solid var(--border-on-dark);
			border-radius: 16px;
			padding: 8px;
			animation: sheet-up 0.22s ease-out;
		}
		.sheet a {
			color: var(--text-on-dark);
			text-decoration: none;
			font-size: 1.05rem;
			padding: 14px 16px;
			border-radius: 10px;
		}
		.sheet a:active {
			background: var(--navy-700);
		}
		.sheet a + a {
			border-top: 1px solid var(--border-on-dark);
		}
		:global(body) {
			padding-bottom: calc(64px + env(safe-area-inset-bottom));
		}
	}
	@keyframes sheet-up {
		from {
			transform: translateY(10px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		header,
		.bar,
		.brand,
		nav a {
			transition: none;
		}
		.sheet {
			animation: none;
		}
	}
</style>
