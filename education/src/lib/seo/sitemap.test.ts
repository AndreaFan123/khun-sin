import { describe, expect, it } from 'vitest';
import { alternatesFor, routes, SITE_ORIGIN } from './routes';
import { buildSitemap } from './sitemap';

describe('sitemap', () => {
	const xml = buildSitemap();

	it('is a well-formed urlset document', () => {
		expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
		expect(xml).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
		expect(xml).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
		expect(xml.trimEnd().endsWith('</urlset>')).toBe(true);
	});

	it('lists every route from the shared route table', () => {
		const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
		expect(locs).toHaveLength(routes.length);
		expect(locs.every((loc) => loc.startsWith(SITE_ORIGIN))).toBe(true);
	});

	it('annotates each entry with both languages and x-default', () => {
		const blocks = xml.split('<url>').slice(1);
		expect(blocks).toHaveLength(routes.length);
		for (const block of blocks) {
			const links = [...block.matchAll(/hreflang="([^"]+)"/g)].map((m) => m[1]);
			expect(links.sort()).toEqual(['en', 'x-default', 'zh-Hant-TW']);
		}
	});

	it('uses the same alternates the pages declare, so the two never disagree', () => {
		for (const route of routes) {
			for (const alternate of alternatesFor(route.path)) {
				expect(xml).toContain(`hreflang="${alternate.hreflang}" href="${alternate.href}"`);
			}
		}
	});

	it('escapes nothing it should not — no raw ampersands', () => {
		expect(xml).not.toMatch(/&(?!amp;|lt;|gt;|quot;|apos;)/);
	});
});
