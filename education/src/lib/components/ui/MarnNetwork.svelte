<script lang="ts">
	// MARN network as a hub-and-spoke circuit diagram (Andrea's reference):
	// 海保署 is the integration core at the center, four partners at the
	// corners, orthogonal traces connecting them. Our flat language: navy
	// stage, hairline node cards, amber only on the hub. ≤700px falls back
	// to a vertical list — the radial layout doesn't survive small screens.
	import { marnNodes } from '$lib/data/site';

	const hub = marnNodes.find((n) => n.name === '海保署')!;
	const satellites = marnNodes.filter((n) => n.name !== '海保署');

	// Corner positions for the four satellites (SVG viewBox coordinates).
	const slots = [
		{ x: 40, y: 36, entry: 'tl' },
		{ x: 650, y: 36, entry: 'tr' },
		{ x: 40, y: 334, entry: 'bl' },
		{ x: 650, y: 334, entry: 'br' }
	];
	const nodes = satellites.map((n, i) => ({ ...n, ...slots[i] }));

	const SW = 210; // satellite width
	const SH = 90;
</script>

<div class="stage">
	<svg
		viewBox="0 0 900 460"
		role="img"
		aria-label="海保救援網（MARN）架構：海保署為整合核心，串聯海巡署、學術鯨豚中心、在地民間團體與獸醫團隊"
	>
		<!-- traces: satellite edge → bend → hub edge -->
		<path class="trace" d="M250,81 H390 V180" />
		<path class="trace" d="M650,81 H510 V180" />
		<path class="trace" d="M250,379 H390 V290" />
		<path class="trace" d="M650,379 H510 V290" />
		{#each [[390, 81], [510, 81], [390, 379], [510, 379]] as [bx, by] (`${bx}-${by}`)}
			<circle class="bend" cx={bx} cy={by} r="2.5" />
		{/each}
		{#each [[390, 180], [510, 180], [390, 290], [510, 290]] as [ex, ey] (`${ex}-${ey}`)}
			<circle class="entry" cx={ex} cy={ey} r="3" />
		{/each}

		<!-- hub -->
		<rect class="hub" x="330" y="180" width="240" height="110" rx="14" />
		<text class="name hub-name" x="450" y="228" text-anchor="middle">{hub.name}</text>
		<text class="role" x="450" y="256" text-anchor="middle">{hub.role}</text>

		<!-- satellites -->
		{#each nodes as n (n.name)}
			<rect class="sat" x={n.x} y={n.y} width={SW} height={SH} rx="12" />
			<text class="name" x={n.x + SW / 2} y={n.y + 38} text-anchor="middle">{n.name}</text>
			<text class="role" x={n.x + SW / 2} y={n.y + 64} text-anchor="middle">{n.role}</text>
		{/each}
	</svg>

	<!-- mobile fallback: vertical spine -->
	<div class="m-list">
		<div class="m-node m-hub">
			<h4>{hub.name}</h4>
			<p>{hub.role}</p>
		</div>
		{#each satellites as n (n.name)}
			<div class="m-node">
				<h4>{n.name}</h4>
				<p>{n.role}</p>
			</div>
		{/each}
	</div>
</div>

<style>
	.stage {
		background: var(--navy-900);
		border: 1px solid var(--border-on-dark);
		border-radius: var(--radius);
		padding: 26px;
		margin-top: 34px;
	}
	svg {
		display: block;
		width: 100%;
		height: auto;
	}
	.trace {
		fill: none;
		stroke: var(--slate-600);
		stroke-width: 1.2;
	}
	.bend {
		fill: var(--slate-500);
	}
	.entry {
		fill: var(--accent);
	}
	.hub {
		fill: var(--navy-800);
		stroke: var(--accent);
		stroke-width: 1.4;
	}
	.sat {
		fill: var(--navy-800);
		stroke: var(--border-on-dark);
		stroke-width: 1;
	}
	.name {
		fill: var(--text-on-dark);
		font-size: 19px;
		font-weight: 700;
	}
	.hub-name {
		font-size: 22px;
	}
	.role {
		fill: var(--slate-300);
		font-size: 13.5px;
	}

	.m-list {
		display: none;
	}
	@media (max-width: 700px) {
		svg {
			display: none;
		}
		.m-list {
			display: flex;
			flex-direction: column;
			gap: 0;
		}
		.m-node {
			background: var(--navy-800);
			border: 1px solid var(--border-on-dark);
			border-radius: 12px;
			padding: 16px 20px;
			text-align: center;
		}
		.m-node + .m-node {
			margin-top: 26px;
			position: relative;
		}
		/* connector segment between stacked nodes */
		.m-node + .m-node::before {
			content: '';
			position: absolute;
			top: -27px;
			left: 50%;
			width: 1.2px;
			height: 26px;
			background: var(--slate-600);
		}
		.m-hub {
			border-color: var(--accent);
		}
		.m-node h4 {
			color: var(--text-on-dark);
			font-size: 1.05rem;
			margin-bottom: 2px;
		}
		.m-node p {
			color: var(--slate-300);
			font-size: 0.85rem;
		}
	}
</style>
