/**
 * Transitional chart renderers carried over from the legacy single-file page
 * (#6). Imperative by design — they will be deleted in Sprint 2 when each
 * chart becomes a declarative Svelte component (#8–#10). Colors are resolved
 * from the design-token custom properties so the new palette applies.
 */

const SVGNS = 'http://www.w3.org/2000/svg';

const css = (v: string): string =>
	getComputedStyle(document.documentElement).getPropertyValue(v).trim();

/* ---------- tooltip (module-managed; becomes a layout singleton in #10) ---------- */

let tt: HTMLDivElement | null = null;

function ensureTT(): HTMLDivElement {
	if (!tt) {
		tt = document.createElement('div');
		tt.className = 'chart-tt';
		document.body.appendChild(tt);
	}
	return tt;
}

function showTT(html: string, e: MouseEvent): void {
	const t = ensureTT();
	t.innerHTML = html;
	t.style.opacity = '1';
	moveTT(e);
}

function moveTT(e: MouseEvent): void {
	const t = ensureTT();
	let x = e.clientX + 14;
	if (x + t.offsetWidth > innerWidth - 8) x = e.clientX - t.offsetWidth - 14;
	t.style.left = `${x}px`;
	t.style.top = `${e.clientY - 10}px`;
}

function hideTT(): void {
	if (tt) tt.style.opacity = '0';
}

function el(tag: string, attrs: Record<string, string | number>): SVGElement {
	const n = document.createElementNS(SVGNS, tag) as SVGElement;
	for (const k in attrs) n.setAttribute(k, String(attrs[k]));
	return n;
}

/* ---------- horizontal bar chart ---------- */

export interface HBarDatum {
	label: string;
	value: number;
	emphasis?: boolean;
	display?: string;
}

export function hBar(cont: HTMLElement, data: HBarDatum[], opts: { padL?: number } = {}): void {
	const W = cont.clientWidth || 560;
	const rowH = 34;
	const padL = opts.padL ?? 96;
	const padR = 44;
	const padT = 6;
	const max = Math.max(...data.map((d) => d.value));
	const H = padT + data.length * rowH + 6;
	const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, width: '100%', height: H, role: 'img' });
	const plotW = W - padL - padR;
	const emphasisColor = css('--chart-emphasis');
	const baseColor = css('--chart-baseline');

	data.forEach((d, i) => {
		const y = padT + i * rowH;
		const bw = Math.max(3, (plotW * d.value) / max);
		const color = d.emphasis ? emphasisColor : baseColor;
		const disp = d.display ?? String(d.value);

		const lbl = el('text', {
			x: padL - 10,
			y: y + rowH / 2 + 1,
			'text-anchor': 'end',
			'dominant-baseline': 'middle',
			class: 'barlabel'
		});
		lbl.textContent = d.label;
		if (d.emphasis) {
			lbl.setAttribute('font-weight', '700');
			lbl.setAttribute('fill', css('--text-primary'));
		}
		svg.appendChild(lbl);

		const r = el('rect', {
			x: padL,
			y: y + 4,
			height: rowH - 12,
			rx: 5,
			fill: color,
			width: 0,
			class: 'bar-rect'
		});
		(r as SVGElement & { style: CSSStyleDeclaration }).style.cursor = 'pointer';
		r.addEventListener('mousemove', (e) => showTT(`<b>${d.label}</b><br>${disp}`, e as MouseEvent));
		r.addEventListener('mouseleave', hideTT);
		svg.appendChild(r);
		requestAnimationFrame(() => setTimeout(() => r.setAttribute('width', String(bw)), 60 + i * 45));

		const approx = String(disp).length * 8.8;
		const outside = padL + bw + 10 + approx <= W - 2;
		const vt = el('text', {
			y: y + rowH / 2 + 1,
			'dominant-baseline': 'middle',
			class: 'barvalue',
			opacity: 0
		});
		vt.textContent = disp;
		if (outside) {
			vt.setAttribute('x', String(padL + bw + 10));
			vt.setAttribute('text-anchor', 'start');
		} else {
			vt.setAttribute('x', String(padL + bw - 10));
			vt.setAttribute('text-anchor', 'end');
			// Inside-bar label: dark ink on amber, paper ink on slate (contrast-safe).
			vt.setAttribute('fill', d.emphasis ? css('--navy-900') : css('--paper-50'));
		}
		svg.appendChild(vt);
		setTimeout(() => vt.setAttribute('opacity', '1'), 380 + i * 45);
	});

	cont.innerHTML = '';
	cont.appendChild(svg);
}

/* ---------- vertical column chart ---------- */

export interface ColDatum {
	label: string;
	value: number;
	emphasis?: boolean;
}

export function colChart(cont: HTMLElement, data: ColDatum[], opts: { h?: number } = {}): void {
	const W = cont.clientWidth || 560;
	const H = opts.h ?? 260;
	const padB = 34;
	const padT = 20;
	const padL = 30;
	const padR = 6;
	const max = Math.max(...data.map((d) => d.value));
	const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, width: '100%', height: H, role: 'img' });
	const plotH = H - padB - padT;
	const plotW = W - padL - padR;
	const ticks = 4;

	for (let t = 0; t <= ticks; t++) {
		const gy = padT + plotH - (plotH * t) / ticks;
		svg.appendChild(
			el('line', {
				x1: padL,
				x2: W - padR,
				y1: gy,
				y2: gy,
				stroke: css('--border'),
				'stroke-width': 1
			})
		);
		const gl = el('text', { x: padL - 6, y: gy + 3, 'text-anchor': 'end', class: 'tick' });
		gl.textContent = String(Math.round((max * t) / ticks));
		svg.appendChild(gl);
	}

	const n = data.length;
	const slot = plotW / n;
	const bw = Math.min(34, slot * 0.6);
	const emphasisColor = css('--chart-emphasis');
	const baseColor = css('--chart-baseline');

	data.forEach((d, i) => {
		const x = padL + slot * i + slot / 2 - bw / 2;
		const bh = (plotH * d.value) / max;
		const r = el('rect', {
			x,
			y: padT + plotH,
			width: bw,
			height: 0,
			rx: 5,
			fill: d.emphasis ? emphasisColor : baseColor,
			class: 'bar-rect'
		});
		(r as SVGElement & { style: CSSStyleDeclaration }).style.cursor = 'pointer';
		r.addEventListener('mousemove', (e) =>
			showTT(`<b>${d.label}</b><br>${d.value} 隻`, e as MouseEvent)
		);
		r.addEventListener('mouseleave', hideTT);
		svg.appendChild(r);
		requestAnimationFrame(() =>
			setTimeout(
				() => {
					r.setAttribute('y', String(padT + plotH - bh));
					r.setAttribute('height', String(bh));
				},
				60 + i * 35
			)
		);
		const xl = el('text', {
			x: padL + slot * i + slot / 2,
			y: H - padB + 18,
			'text-anchor': 'middle',
			class: 'tick'
		});
		xl.textContent = d.label;
		svg.appendChild(xl);
		const vl = el('text', {
			x: padL + slot * i + slot / 2,
			y: padT + plotH - bh - 6,
			'text-anchor': 'middle',
			class: 'barvalue',
			opacity: 0
		});
		vl.textContent = String(d.value);
		svg.appendChild(vl);
		setTimeout(() => vl.setAttribute('opacity', '1'), 420 + i * 35);
	});

	cont.innerHTML = '';
	cont.appendChild(svg);
}

/* ---------- stacked column chart (trend) ---------- */

export interface StackDatum {
	label: string;
	dead: number;
	live: number;
}

export function stackChart(cont: HTMLElement, data: StackDatum[], opts: { h?: number } = {}): void {
	const W = cont.clientWidth || 560;
	const H = opts.h ?? 280;
	const padB = 34;
	const padT = 22;
	const padL = 34;
	const padR = 6;
	const max = Math.max(...data.map((d) => d.dead + d.live));
	const niceMax = Math.ceil(max / 40) * 40;
	const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, width: '100%', height: H, role: 'img' });
	const plotH = H - padB - padT;
	const plotW = W - padL - padR;
	const ticks = 4;

	for (let t = 0; t <= ticks; t++) {
		const gy = padT + plotH - (plotH * t) / ticks;
		svg.appendChild(
			el('line', {
				x1: padL,
				x2: W - padR,
				y1: gy,
				y2: gy,
				stroke: css('--border'),
				'stroke-width': 1
			})
		);
		const gl = el('text', { x: padL - 6, y: gy + 3, 'text-anchor': 'end', class: 'tick' });
		gl.textContent = String(Math.round((niceMax * t) / ticks));
		svg.appendChild(gl);
	}

	const n = data.length;
	const slot = plotW / n;
	const bw = Math.min(46, slot * 0.5);
	const deadColor = css('--chart-muted');
	const liveColor = css('--chart-emphasis');

	data.forEach((d, i) => {
		const cx = padL + slot * i + slot / 2;
		const x = cx - bw / 2;
		const deadH = (plotH * d.dead) / niceMax;
		const liveH = (plotH * d.live) / niceMax;

		const rd = el('rect', {
			x,
			y: padT + plotH,
			width: bw,
			height: 0,
			fill: deadColor,
			class: 'bar-rect'
		});
		(rd as SVGElement & { style: CSSStyleDeclaration }).style.cursor = 'pointer';
		rd.addEventListener('mousemove', (e) =>
			showTT(`<b>${d.label} 年</b><br>死亡 ${d.dead} 隻`, e as MouseEvent)
		);
		rd.addEventListener('mouseleave', hideTT);
		svg.appendChild(rd);

		const rl = el('rect', {
			x,
			y: padT + plotH,
			width: bw,
			height: 0,
			rx: 4,
			fill: liveColor,
			class: 'bar-rect'
		});
		(rl as SVGElement & { style: CSSStyleDeclaration }).style.cursor = 'pointer';
		rl.addEventListener('mousemove', (e) =>
			showTT(`<b>${d.label} 年</b><br>活體 ${d.live} 隻`, e as MouseEvent)
		);
		rl.addEventListener('mouseleave', hideTT);
		svg.appendChild(rl);

		requestAnimationFrame(() =>
			setTimeout(
				() => {
					rd.setAttribute('y', String(padT + plotH - deadH));
					rd.setAttribute('height', String(deadH));
					rl.setAttribute('y', String(padT + plotH - deadH - liveH - 2));
					rl.setAttribute('height', String(liveH));
				},
				60 + i * 50
			)
		);

		const tl = el('text', {
			x: cx,
			y: padT + plotH - deadH - liveH - 10,
			'text-anchor': 'middle',
			class: 'barvalue',
			opacity: 0
		});
		tl.textContent = String(d.dead + d.live);
		svg.appendChild(tl);
		setTimeout(() => tl.setAttribute('opacity', '1'), 460 + i * 50);

		const xl = el('text', { x: cx, y: H - padB + 18, 'text-anchor': 'middle', class: 'tick' });
		xl.textContent = d.label;
		svg.appendChild(xl);
	});

	cont.innerHTML = '';
	cont.appendChild(svg);
}
