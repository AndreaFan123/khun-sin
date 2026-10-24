<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve -- Registry paths pass through resolve before fragments are appended. */
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import Menu from '@lucide/svelte/icons/menu';
	import X from '@lucide/svelte/icons/x';
	import { onMount, tick } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { useSite } from '$lib/copy';
	import { routePathFor } from '$lib/seo/routes';
	import { speciesScopes, speciesLinks, alternateLink, type SpeciesScope } from '$lib/navigation';
	import { parseTheme, type ThemeMode } from '$lib/theme';
	import Wordmark from './Wordmark.svelte';
	import ThemeIcon from './ThemeIcon.svelte';
	let y = $state(0);
	const scrolled = $derived(y > 48);
	let disclosure = $state<SpeciesScope | 'theme' | null>(null);
	let menuOpen = $state(false);
	let closeTarget: 'menu' | 'main' | 'theme' = 'menu';
	let dialog: HTMLDialogElement;
	let menuButton: HTMLButtonElement;
	let themeButton: HTMLButtonElement;
	let themePanel = $state<HTMLFieldSetElement>();
	let theme = $state<ThemeMode>('auto');
	const modes: ThemeMode[] = ['auto', 'light', 'dark'];
	const site = useSite();
	const isEn = $derived(site().locale === 'en');
	const ui = $derived(site().copy.uiCopy);
	const current = $derived(routePathFor(page.url.pathname));
	const home = $derived(resolve(isEn ? '/en' : '/'));
	const support = $derived(resolve(isEn ? '/en/support' : '/support'));
	const alternate = $derived(alternateLink(current, page.url.hash));
	const otherLocale = $derived(resolve(alternate.path) + alternate.hash);
	const themeLabels = $derived(
		isEn
			? { auto: 'Follow device', light: 'Light mode', dark: 'Dark mode' }
			: { auto: '跟隨裝置', light: '淺色模式', dark: '深色模式' }
	);
	const label = (scope: SpeciesScope) => (scope === 'cetaceans' ? ui.navLearn : ui.navTurtles);
	function closeMenu(target: 'menu' | 'main' | 'theme' = 'menu') {
		if (!dialog?.open) return;
		closeTarget = target;
		dialog.close();
		menuOpen = false;
	}
	async function toggleMenu() {
		disclosure = null;
		closeTarget = 'menu';
		dialog.showModal();
		menuOpen = true;
		await tick();
		dialog.querySelector<HTMLButtonElement>('button')?.focus();
	}
	async function toggleDisclosure(value: SpeciesScope | 'theme') {
		disclosure = disclosure === value ? null : value;
		if (disclosure === 'theme') {
			await tick();
			themePanel?.querySelector<HTMLInputElement>('input:checked')?.focus();
		}
	}
	function changeTheme(mode: ThemeMode) {
		theme = mode;
		document.documentElement.dataset.theme = mode;
		try {
			localStorage.setItem('khun-sin-theme', mode);
		} catch {
			return;
		}
	}
	function selectTheme() {
		disclosure = null;
		themeButton.focus();
	}
	function closeOnEscape(event: KeyboardEvent) {
		if (event.key === 'Escape' && disclosure) {
			const opener = document.querySelector<HTMLButtonElement>(`[data-disclosure="${disclosure}"]`);
			disclosure = null;
			opener?.focus();
		}
	}
	function clickOutside(event: PointerEvent) {
		if (event.target instanceof Element && !event.target.closest('.disclosure')) disclosure = null;
	}
	onMount(() => {
		theme = parseTheme(document.documentElement.dataset.theme);
		const desktop = matchMedia('(min-width: 1280px)');
		const resize = () => {
			closeMenu('theme');
			disclosure = null;
		};
		desktop.addEventListener('change', resize);
		return () => desktop.removeEventListener('change', resize);
	});
	afterNavigate(() => {
		closeMenu('main');
		disclosure = null;
	});
</script>

<svelte:window bind:scrollY={y} onkeydown={closeOnEscape} onpointerdown={clickOutside} />
<header class:scrolled>
	<div class="bar">
		<div class="brand-group">
			<a class="brand" href={home} aria-label={isEn ? 'Khun-Sin home' : 'Khun-Sin 首頁'}
				><Wordmark /></a
			><a class="support-link" href={support}>{ui.navSupport}</a>
		</div>
		<div class="right">
			<nav aria-label={isEn ? 'Main navigation' : '主導覽'}>
				<a href={home} aria-current={current === (isEn ? '/en' : '/') ? 'page' : undefined}
					>{ui.navReport}</a
				>
				{#each speciesScopes as scope (scope)}
					{@const links = speciesLinks(site().locale, scope)}
					<div class="disclosure species-group">
						<button
							class="species-trigger"
							type="button"
							data-disclosure={scope}
							aria-label={(isEn ? 'Expand ' : '展開') + label(scope)}
							aria-expanded={disclosure === scope}
							aria-controls={'nav-' + scope}
							onclick={() => toggleDisclosure(scope)}
							><span>{label(scope)}</span><ChevronDown
								class={disclosure === scope ? 'species-chevron expanded' : 'species-chevron'}
								size={18}
								strokeWidth={2}
								aria-hidden="true"
							/></button
						>
						{#if disclosure === scope}<div class="popover" id={'nav-' + scope}>
								<a href={resolve(links.overview)}>{isEn ? 'Overview' : '物種總覽'}</a>
								<a
									href={resolve(links.data.path) + links.data.hash}
									aria-current={current === links.data.path ? 'page' : undefined}
									>{isEn ? 'Stranding data' : '擱淺統計'}</a
								>
								<a
									href={resolve(links.map.path) + links.map.hash}
									aria-current={current === links.map.path ? 'page' : undefined}
									>{isEn ? 'Stranding map' : '擱淺分布地圖'}</a
								>
							</div>{/if}
					</div>
				{/each}
			</nav>
			<div class="lang" role="group" aria-label="語言 / Language">
				<a
					href={isEn ? otherLocale : resolve(current)}
					class:active={!isEn}
					aria-current={!isEn ? 'true' : undefined}>中</a
				><span class="sep" aria-hidden="true">/</span>
				<a
					href={isEn ? resolve(current) : otherLocale}
					class:active={isEn}
					aria-current={isEn ? 'true' : undefined}>EN</a
				>
			</div>
			<div class="disclosure">
				<button
					class="theme-button"
					bind:this={themeButton}
					type="button"
					data-disclosure="theme"
					aria-label={(isEn ? 'Display mode: ' : '顯示模式：') + themeLabels[theme]}
					aria-expanded={disclosure === 'theme'}
					aria-controls="theme-choices"
					onclick={() => toggleDisclosure('theme')}><ThemeIcon mode={theme} /></button
				>
				{#if disclosure === 'theme'}<fieldset
						class="popover theme-choices"
						id="theme-choices"
						bind:this={themePanel}
					>
						<legend>{isEn ? 'Display mode' : '顯示模式'}</legend>
						{#each modes as mode (mode)}<label
								><input
									type="radio"
									name="theme"
									value={mode}
									checked={theme === mode}
									onchange={() => changeTheme(mode)}
									onclick={(event) => {
										if (event.detail > 0) {
											changeTheme(mode);
											selectTheme();
										}
									}}
									onkeydown={(event) => {
										if (event.key === 'Enter' || event.key === ' ') {
											event.preventDefault();
											changeTheme(mode);
											selectTheme();
										}
									}}
								/><ThemeIcon {mode} /><span>{themeLabels[mode]}</span></label
							>{/each}
					</fieldset>{/if}
			</div>
		</div>
	</div>
</header>
<dialog
	bind:this={dialog}
	id="mobile-menu"
	aria-label={isEn ? 'Mobile navigation' : '行動版選單'}
	class="mobile-dialog"
	onclose={() => {
		menuOpen = false;
		if (closeTarget === 'main')
			document.getElementById('main-content')?.focus({ preventScroll: true });
		else if (closeTarget === 'theme' || matchMedia('(min-width: 1280px)').matches)
			themeButton?.focus();
		else menuButton?.focus();
	}}
	onclick={(event) => {
		if (event.target === dialog) closeMenu();
	}}
>
	<div class="dialog-content">
		<div class="dialog-actions">
			<button type="button" onclick={() => closeMenu()}
				>{ui.menuCloseLabel}
				<X
					size="1em"
					aria-hidden="true"
					style="display: inline-block; vertical-align: -0.125em; flex-shrink: 0"
				/></button
			><a href={otherLocale} onclick={() => closeMenu('main')}>{isEn ? '中文' : 'EN'}</a><a
				class="call"
				href="tel:118">118</a
			>
		</div>
		<nav aria-label={isEn ? 'Mobile navigation' : '行動版選單'}>
			<a href={home} onclick={() => closeMenu('main')}>{ui.navReport}</a>
			{#each speciesScopes as scope (scope)}{@const links = speciesLinks(site().locale, scope)}
				<section>
					<h2>{label(scope)}</h2>
					<a href={resolve(links.overview)} onclick={() => closeMenu('main')}
						>{isEn ? 'Overview' : '物種總覽'}</a
					><a
						href={resolve(links.data.path) + links.data.hash}
						aria-current={current === links.data.path ? 'page' : undefined}
						onclick={() => closeMenu('main')}>{isEn ? 'Stranding data' : '擱淺統計'}</a
					><a
						href={resolve(links.map.path) + links.map.hash}
						aria-current={current === links.map.path ? 'page' : undefined}
						onclick={() => closeMenu('main')}>{isEn ? 'Stranding map' : '擱淺分布地圖'}</a
					>
				</section>
			{/each}
			<a href={support} onclick={() => closeMenu('main')}>{ui.navSupport}</a>
		</nav>
	</div>
</dialog>
<div class="bottom-bar">
	<button
		class="menu-btn"
		bind:this={menuButton}
		type="button"
		aria-expanded={menuOpen}
		aria-controls="mobile-menu"
		aria-label={ui.menuOpenLabel}
		onclick={toggleMenu}
		><Menu size="1em" aria-hidden="true" style="flex-shrink: 0" />
		<span>{isEn ? 'Menu' : '選單'}</span></button
	><a class="lang-m" href={otherLocale}>{isEn ? '中文' : 'EN'}</a><a
		class="call"
		href="tel:118"
		aria-label={ui.dialAriaLabel}>118</a
	>
</div>

<style>
	header {
		position: sticky;
		top: 0;
		z-index: 10;
		background: var(--bg);
		border-bottom: 1px solid var(--border);
		transition:
			background 0.25s ease,
			border-color 0.25s ease,
			padding 0.25s ease;
	}
	.bar {
		max-width: 1440px;
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
		color: var(--text-primary);
		font-weight: 500;
		font-size: 1.1rem;
		text-decoration: none;
		letter-spacing: 0.005em;
	}
	.brand-group {
		display: flex;
		align-items: center;
		gap: 14px;
	}
	.support-link {
		display: inline-flex;
		align-items: center;
		background: var(--accent);
		color: var(--on-accent);
		border-radius: var(--radius-action);
		padding: 7px 13px;
		font-size: 0.84rem;
		font-weight: 700;
		line-height: 1;
		text-decoration: none;
		white-space: nowrap;
	}
	.right {
		display: flex;
		align-items: center;
		gap: 14px;
	}
	nav {
		display: flex;
		gap: 14px;
	}
	.lang {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 0.9rem;
	}
	.lang a {
		color: var(--text-secondary);
		text-decoration: none;
	}
	.lang a.active {
		color: var(--accent);
		font-weight: 700;
	}
	.sep {
		color: var(--text-secondary);
	}
	nav a {
		color: var(--text-secondary);
		text-decoration: none;
		font-size: 0.9rem;
	}
	nav a:hover {
		color: var(--text-primary);
	}
	nav a[aria-current] {
		color: var(--text-primary);
		font-weight: 700;
		text-decoration: underline;
		text-underline-offset: 0.25em;
	}

	header.scrolled {
		background: transparent;
		border-bottom-color: transparent;
		padding: 10px 16px 0;
	}
	header.scrolled .bar {
		background: var(--bg);
		-webkit-backdrop-filter: blur(8px);
		backdrop-filter: blur(8px);
		border-color: var(--border);
		border-radius: 999px;
		padding: 10px 26px;
	}

	.bottom-bar {
		display: none;
	}
	@media (max-width: 1279px) {
		.support-link {
			display: none;
		}
		header nav,
		header .lang {
			display: none;
		}
		.lang-m {
			color: var(--text-primary);
			text-decoration: none;
			font-size: 1rem;
			border: 1px solid var(--border);
			border-radius: var(--radius-action);
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
			background: var(--bg);
			border-top: 1px solid var(--border);
			padding: 10px 18px calc(10px + env(safe-area-inset-bottom));
		}

		.menu-btn {
			display: inline-flex;
			align-items: center;
			gap: 8px;
			background: none;
			border: none;
			color: var(--text-primary);
			font-size: 1rem;
			font-family: inherit;
			padding: 8px 10px;
		}
		.call {
			display: inline-flex;
			align-items: center;
			gap: 8px;
			background: var(--accent);
			color: var(--on-accent);
			font-weight: 700;
			border-radius: var(--radius-action);
			padding: 10px 20px;
			text-decoration: none;
			font-variant-numeric: tabular-nums;
			font-size: 1.05rem;
		}

		:global(body) {
			padding-bottom: calc(84px + env(safe-area-inset-bottom));
		}
	}

	@media (prefers-reduced-motion: reduce) {
		header,
		.bar,
		.brand,
		.support-link,
		nav a {
			transition: none;
		}
	}

	.bar {
		gap: 16px;
	}
	.brand-group,
	.right {
		flex-shrink: 0;
	}
	nav,
	.lang {
		white-space: nowrap;
	}

	.theme-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		padding: 10px;
		background: transparent;
		border: 1px solid transparent;
		border-radius: 50%;
		color: var(--text-secondary);
		cursor: pointer;
	}
	.theme-button:hover {
		color: var(--signal);
		background: var(--bg-soft);
	}

	@media (max-width: 1279px) {
		.bar {
			padding: 14px 18px;
			gap: 8px;
		}
		.right {
			margin-left: auto;
			gap: 0;
		}
		header.scrolled {
			padding: 10px 12px 0;
		}
		header.scrolled .bar {
			padding: 10px 16px;
		}
		.brand :global(.wordmark) {
			font-size: 1.15rem;
		}
	}

	.species-group {
		display: flex;
		align-items: center;
		gap: 0;
	}
	.disclosure {
		position: relative;
	}
	header nav {
		align-items: center;
	}
	header nav > a,
	.species-trigger {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		font-family: inherit;
		font-size: 0.9rem;
		line-height: 1.5;
	}
	.species-trigger {
		gap: 0.5rem;
		padding: 0;
		border: 0;
		background: transparent;
		color: var(--text-secondary);
		cursor: pointer;
	}
	.species-trigger:hover,
	.species-trigger[aria-expanded='true'] {
		color: var(--text-primary);
	}
	.species-trigger :global(.species-chevron) {
		flex-shrink: 0;
		transition: transform 0.2s ease;
	}
	.species-trigger :global(.species-chevron.expanded) {
		transform: rotate(180deg);
	}
	@media (prefers-reduced-motion: reduce) {
		.species-trigger :global(.species-chevron) {
			transition: none;
		}
	}
	.popover {
		position: absolute;
		top: calc(100% + 0.5rem);
		right: 0;
		min-width: 14rem;
		padding: 0.5rem;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--bg-card);
		box-shadow: 0 8px 24px #0002;
	}
	.popover a {
		display: flex;
		align-items: center;
		min-height: 44px;
		padding: 0.5rem 0.75rem;
	}
	.popover a:hover {
		background: var(--bg-soft);
	}
	.theme-choices {
		margin: 0;
	}
	.theme-choices legend {
		font-size: 0.8rem;
		padding: 0 0.5rem;
		color: var(--text-secondary);
	}
	.theme-choices label {
		display: flex;
		gap: 0.6rem;
		align-items: center;
		min-height: 48px;
		padding: 0.4rem;
		cursor: pointer;
	}
	.theme-choices input {
		accent-color: var(--signal);
	}
	.mobile-dialog {
		padding: 0;
		border: 1px solid var(--border);
		border-radius: var(--radius);
		background: var(--bg-card);
		color: var(--text-primary);
		width: min(36rem, calc(100% - 1.5rem));
		max-height: calc(100svh - 2rem);
		margin: auto;
		overflow: auto;
	}
	.mobile-dialog::backdrop {
		background: #071f36aa;
	}
	.dialog-content {
		padding: 1rem;
	}
	.dialog-actions {
		display: flex;
		gap: 1rem;
		align-items: center;
		justify-content: space-between;
	}
	.dialog-actions button {
		min-height: 44px;
		background: var(--bg-soft);
		border: 1px solid var(--border);
		padding: 0.5rem;
		color: inherit;
		border-radius: var(--radius-action);
	}
	.mobile-dialog nav {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: 1rem;
	}
	.mobile-dialog nav a {
		display: flex;
		min-height: 44px;
		align-items: center;
		font-size: 1rem;
	}
	.mobile-dialog nav section {
		background: var(--bg-soft);
		padding: 0.75rem 1rem;
		border-radius: var(--radius);
	}
	.mobile-dialog h2 {
		font-size: 1rem;
		margin-bottom: 0.5rem;
	}
	.mobile-dialog .call {
		color: var(--on-accent);
		background: var(--accent);
		padding: 0.5rem 1rem;
		border-radius: var(--radius-action);
	}
	nav > [aria-current='page'] {
		color: var(--text-primary);
		font-weight: 700;
	}
</style>
