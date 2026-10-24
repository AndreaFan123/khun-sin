<script lang="ts">
	import OceanWaves from '$lib/components/ui/OceanWaves.svelte';
	import { useSite } from '$lib/copy';
	const site = useSite();
	const heroCopy = $derived(site().copy.heroCopy);
	const hotline = $derived(site().copy.hotline);
</script>

<section class="hero" aria-labelledby="hero-title">
	<div class="hero-waves"><OceanWaves variant="hero" /></div>
	<div class="hero-content">
		<p class="eyebrow">{heroCopy.badge}</p>
		<h1 id="hero-title">
			{heroCopy.titleLead}<br /><span>{heroCopy.titleHighlight}</span>{heroCopy.titleTail}
		</h1>
		<p class="lead">{heroCopy.sub}</p>
		<a class="hotline" href="tel:118" aria-label={site().copy.uiCopy.dialAriaLabel}
			><strong>{hotline.number}</strong>{hotline.label}</a
		>
		<p class="scope">{heroCopy.hotlineScope}</p>
	</div>
	<a class="more" href="#report">{heroCopy.stepsLabel}</a>
</section>

<style>
	.hero {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		min-height: calc(100svh - 96px);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		background: var(--bg);
		padding: 48px 24px 28px;
	}
	.hero-waves {
		position: absolute;
		inset: 0;
		z-index: -1;
		pointer-events: none;
		--wave-back: color-mix(in srgb, var(--text-primary) 10%, var(--bg));
		--wave-middle: color-mix(in srgb, var(--text-primary) 20%, var(--bg));
		--wave-front: color-mix(in srgb, var(--text-primary) 28%, var(--bg));
	}
	.hero-content {
		width: 100%;
		max-width: 1040px;
		margin: auto 0;
	}
	.eyebrow {
		color: var(--text-primary);
		margin-bottom: 18px;
		font-size: 1rem;
		letter-spacing: 0.1em;
	}
	h1 {
		font-size: clamp(64px, 7.2vw, 96px);
		font-weight: 800;
		line-height: 1.12;
		letter-spacing: -0.045em;
	}
	h1 span {
		color: var(--accent);
		font-variant-numeric: tabular-nums;
	}
	.lead {
		max-width: 730px;
		margin: 25px auto 24px;
		font-size: 20px;
		line-height: 1.85;
	}
	.hotline {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 16px;
		border-radius: 6px;
		min-height: 60px;
		padding: 13px 26px;
		background: var(--accent);
		color: var(--on-accent);
		font-size: 18px;
		font-weight: 700;
		text-decoration: none;
	}
	.hotline strong {
		font-size: 34px;
		line-height: 1;
	}
	.scope {
		font-size: 17px;
		margin-top: 15px;
	}
	.more {
		color: var(--text-primary);
		font-size: 16px;
		min-height: 44px;
		display: inline-flex;
		align-items: center;
		margin-top: 36px;
		text-underline-offset: 7px;
	}
	@media (max-width: 640px) {
		.hero {
			min-height: calc(100svh - 80px);
			padding-top: 28px;
		}
		.hero-waves {
			inset: auto 0 0;
			height: 28%;
			max-height: 220px;
		}
		h1 {
			font-size: clamp(47px, 12vw, 68px);
			line-height: 1.35;
		}
		.lead {
			font-size: 18px;
			margin: 23px auto;
		}
		.eyebrow,
		.scope {
			font-size: 16px;
		}
		.hotline {
			gap: 12px;
			padding: 12px 19px;
			font-size: 16px;
		}
		.more {
			margin-top: 30px;
		}
	}
</style>
