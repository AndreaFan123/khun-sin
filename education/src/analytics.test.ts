import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { describe, expect, it } from 'vitest';

const html = readFileSync(new URL('./app.html', import.meta.url), 'utf8');

function loadPage(origin: string) {
	const scripts: { src?: string; async?: boolean }[] = [];
	const window: {
		location: { origin: string };
		dataLayer?: IArguments[];
		gtag?: (...args: unknown[]) => void;
	} = { location: { origin } };
	const document = {
		createElement: () => ({}),
		head: { appendChild: (script: (typeof scripts)[number]) => scripts.push(script) }
	};
	// Execute the actual template bootstrap; record resource loads without contacting Google.
	for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
		const src = match[1].match(/src="([^"]+)"/);
		if (src) scripts.push({ src: src[1], async: /\basync\b/.test(match[1]) });
		else runInNewContext(match[2], Object.assign(window, { window, document }));
	}
	return { window, scripts };
}

describe('GA4 production origin isolation', () => {
	it.each([
		'http://localhost:5173',
		'http://localhost:4173',
		'http://127.0.0.1:5173',
		'http://[::1]:5173',
		'https://khun-preview-abc.vercel.app',
		'https://khun-sin-git-develop-example.vercel.app',
		'https://preview.khun-sin.com',
		'https://www.khun-sin.com.example.org',
		'http://www.khun-sin.com',
		'https://www.khun-sin.com:8443'
	])('does not load or initialize GA4 on %s', (origin) => {
		const { window, scripts } = loadPage(origin);
		expect(scripts).toEqual([]);
		expect(window.dataLayer).toBeUndefined();
		expect(window.gtag).toBeUndefined();
	});

	it('loads the async Google tag and queues initialization on the production origin', () => {
		const { window, scripts } = loadPage('https://www.khun-sin.com');
		expect(scripts).toEqual([
			{ src: 'https://www.googletagmanager.com/gtag/js?id=G-VPBKZMECHQ', async: true }
		]);
		expect(window.dataLayer?.map((args) => Array.from(args))).toEqual([
			['js', expect.anything()],
			['config', 'G-VPBKZMECHQ']
		]);
		expect(typeof window.gtag).toBe('function');
	});
});
