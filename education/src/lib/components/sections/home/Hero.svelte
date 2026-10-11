<script lang="ts">
	import heroVideo from '$lib/assets/landing-hero-video.mp4';
	import { useSite } from '$lib/copy';

	const site = useSite();
	const heroCopy = $derived(site().copy.heroCopy);
	const hotline = $derived(site().copy.hotline);
</script>

<section class="hero">
	<video
		class="hero-video"
		src={heroVideo}
		autoplay
		muted
		loop
		playsinline
		preload="metadata"
		aria-hidden="true"
		tabindex="-1"
	></video>
	<div class="wrap hero-content">
		<span class="kbadge">{heroCopy.badge}</span>
		<h1>
			{heroCopy.titleLead}<span class="hl">{heroCopy.titleHighlight}</span><br
			/>{heroCopy.titleTail}
		</h1>
		<p class="sub">{heroCopy.sub}</p>

		<div class="hotline">
			<strong>{hotline.number}</strong>
			<div>
				<span>{hotline.label}</span>
				<small>{heroCopy.hotlineScope}</small>
			</div>
		</div>

		<a class="emergency" href="#report">
			<span class="what">{heroCopy.stepsLabel} <span class="arrow" aria-hidden="true">↓</span></span
			>
		</a>
	</div>
</section>

<style>
	.hero {
		position: relative;
		overflow: hidden;
		background: var(--bg-band-darker);
		color: var(--text-on-dark);
		padding: 88px 0 182px;
	}
	.hero::before {
		content: '';
		position: absolute;
		z-index: 1;
		inset: 0;
		background: rgba(16, 31, 61, 0.72);
	}
	.hero-video {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}
	.hero-content {
		position: relative;
		z-index: 2;
	}
	.kbadge {
		display: inline-block;
		margin-bottom: 22px;
		padding: 7px 15px;
		border-radius: 999px;
		border: 2px solid var(--border-on-dark);
		color: var(--slate-200);
		font-weight: 500;
		font-size: 0.9rem;
		letter-spacing: 0.08em;
	}
	h1 {
		font-size: clamp(4rem, 6vw, 7rem);
		color: var(--text-on-dark);
		letter-spacing: 0.02em;
		width: 100%;
	}
	.hl {
		color: var(--accent);
	}
	.sub {
		font-size: clamp(1.3rem, 2.2vw, 1.4rem);
		margin-top: 22px;
		max-width: 100%;
		color: var(--text-on-dark-secondary);
		width: 100%;
	}

	.hotline {
		display: flex;
		flex-wrap: wrap;
		align-items: end;
		gap: 24px 40px;
		margin-top: 96px;
		padding: 36px 40px;
		border: 1px solid var(--border-on-dark);
		border-radius: var(--radius);
		background: var(--navy-800);
	}
	.hotline strong {
		font-size: clamp(6rem, 16vw, 10rem);
		font-weight: 800;
		color: var(--accent);
		line-height: 0.8;
		font-variant-numeric: tabular-nums;
	}
	.hotline div {
		display: grid;
		gap: 4px;
		padding-bottom: 4px;
	}
	.hotline span {
		font-size: clamp(1.25rem, 2vw, 1.75rem);
		font-weight: 600;
		color: var(--text-on-dark);
	}
	.hotline small {
		font-size: 1rem;
		color: var(--text-on-dark-secondary);
	}
	.emergency {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		gap: 16px;
		margin-top: 34px;
		padding: 16px 22px;
		border-radius: var(--radius);
		/* border: 1px solid var(--accent); */
		text-decoration: none;
		color: var(--text-on-dark);
	}
	/* .emergency .num {
		font-size: 5rem;
		font-weight: 800;
		color: var(--accent);
		font-variant-numeric: tabular-nums;
	} */
	.emergency .what {
		font-size: 1.2rem;
		color: var(--text-on-dark-secondary);
		max-width: 100ch;
	}
	.arrow {
		display: inline-block;
		animation: bob 1.8s ease-in-out infinite;
	}
	@keyframes bob {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(6px);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.hero-video {
			display: none;
		}
		.arrow {
			animation: none;
		}
	}
	@media (max-width: 640px) {
		.hero {
			padding-top: 64px;
		}
		h1 {
			font-size: clamp(3rem, 14vw, 4.5rem);
		}
		.hotline {
			margin-top: 64px;
			padding: 28px 24px;
		}
	}
</style>
