import { describe, expect, it } from 'vitest';
import { checkNavigation, checkPage, checkRobots, checkSitemap } from './preflight';
import { absolute, alternatesFor, routes } from './routes';
import { buildSitemap } from './sitemap';

const route = routes.find((r) => r.path === '/data')!;
const html = `<html lang="zh-Hant-TW"><head><title>台灣擱淺數據</title>
<meta name="description" content="台灣鯨豚與海龜統計">
<link rel="canonical" href="${absolute(route.path)}">
${alternatesFor(route.path)
	.map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}">`)
	.join('')}
<script type="application/ld+json">${JSON.stringify({ '@type': 'Dataset', url: absolute(route.path), inLanguage: 'zh-Hant-TW', name: '擱淺統計', description: '官方資料整理' })}</script>
</head><body><main><h1>台灣擱淺統計</h1><p>鯨豚與海龜年度數據。</p></main></body></html>`;

describe('release SEO checks', () => {
	it('rejects a page with only a self-link and no path from home', () => {
		const pages = new Map(routes.map((r) => [r.path as string, `<a href="${r.path}">Self</a>`]));
		pages.set(
			'/',
			routes
				.filter((r) => r.path !== '/en/support')
				.map((r) => `<a href="${r.path}">Page</a>`)
				.join('')
		);
		expect(checkNavigation(pages)).toEqual([
			'/en/support: not reachable from home through internal links'
		]);
		pages.set('/en', '<a href="/en/support">Support</a>');
		expect(checkNavigation(pages)).toEqual([]);
	});
	it('accepts a prerendered data page with matching metadata and Dataset', () => {
		expect(checkPage(html, route)).toEqual([]);
	});
	it('does not confuse accessible SVG titles with the document title', () => {
		expect(
			checkPage(html.replace('</main>', '<svg><title>地圖說明</title></svg></main>'), route)
		).toEqual([]);
	});
	it('rejects an unintended noindex and a preview canonical', () => {
		const broken = html
			.replace('</head>', '<meta name="robots" content="noindex"></head>')
			.replace(
				`rel="canonical" href="${absolute(route.path)}"`,
				'rel="canonical" href="https://preview.vercel.app/data"'
			);
		expect(checkPage(broken, route).join(' ')).toMatch(/noindex/);
		expect(checkPage(broken, route).join(' ')).toMatch(/canonical/);
	});
	it('rejects missing Dataset, wrong Dataset URL and broken language alternates', () => {
		expect(checkPage(html.replace(/<script[\s\S]*?<\/script>/, ''), route).join(' ')).toMatch(
			/Dataset/
		);
		expect(
			checkPage(
				html.replace('"url":"https://www.khun-sin.com/data"', '"url":"https://www.khun-sin.com/"'),
				route
			).join(' ')
		).toMatch(/Dataset/);
		expect(checkPage(html.replace('hreflang="en"', 'hreflang="fr"'), route).join(' ')).toMatch(
			/hreflang/
		);
	});
	it('rejects invalid JSON-LD instead of silently ignoring it', () => {
		expect(checkPage(html.replace('"@type":"Dataset"', 'invalid JSON'), route).join(' ')).toMatch(
			/JSON-LD/
		);
	});
	it('rejects Dataset on a home page and missing prerendered content', () => {
		expect(checkPage(html, routes[0]).join(' ')).toMatch(/Dataset/);
		expect(checkPage(html.replace(/<main[\s\S]*?<\/main>/, ''), route).join(' ')).toMatch(/main/);
	});
	it('checks the complete sitemap inventory and per-page alternates', () => {
		expect(checkSitemap(buildSitemap())).toEqual([]);
		expect(
			checkSitemap(
				buildSitemap().replace(
					'<loc>https://www.khun-sin.com/data</loc>',
					'<loc>https://www.khun-sin.com/missing</loc>'
				)
			).join(' ')
		).toMatch(/URLs/);
		expect(
			checkSitemap(buildSitemap().replace('hreflang="en"', 'hreflang="fr"')).join(' ')
		).toMatch(/hreflang/);
	});
	it('rejects robots rules blocking public routes, including Googlebot-specific rules', () => {
		const sitemap = 'Sitemap: https://www.khun-sin.com/sitemap.xml';
		expect(checkRobots(`User-agent: *\nDisallow:\n${sitemap}`)).toEqual([]);
		expect(checkRobots(`User-agent: *\nDisallow: /\n${sitemap}`).join(' ')).toMatch(/blocked/);
		expect(
			checkRobots(
				`User-agent: *\nDisallow:\n\nUser-agent: Googlebot\nDisallow: /data\n${sitemap}`
			).join(' ')
		).toMatch(/blocked/);
		expect(checkRobots(`User-agent: *\nDisallow: /data*\nAllow: /data$\n${sitemap}`)).toEqual([]);
	});
});
