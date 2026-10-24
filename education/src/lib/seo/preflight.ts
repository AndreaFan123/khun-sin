import { speciesToolFor } from '../navigation.ts';
import {
	absolute,
	alternatesFor,
	htmlLangOf,
	routes,
	SITE_ORIGIN,
	type RouteEntry
} from './routes.ts';

// These checks target our generated HTML/XML, not arbitrary user-authored markup.
export const attributes = (tag: string): Record<string, string> =>
	Object.fromEntries(
		[...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map((m) => [
			m[1].toLowerCase(),
			m[2] ?? m[3]
		])
	);

const tags = (html: string, name: string) =>
	[...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map((m) => attributes(m[0]));

export const pageLinks = (html: string): string[] =>
	tags(html, 'a')
		.map((a) => a.href)
		.filter(Boolean);

export function checkNavigation(pages: Map<string, string>): string[] {
	const reached = new Set<string>();
	const pending = ['/'];
	while (pending.length) {
		const path = pending.pop()!;
		if (reached.has(path)) continue;
		reached.add(path);
		for (const href of pageLinks(pages.get(path) ?? '')) {
			try {
				const url = new URL(href, `${SITE_ORIGIN}${path}`);
				const target = url.pathname.replace(/\/+$/, '') || '/';
				if (url.origin === SITE_ORIGIN && pages.has(target)) pending.push(target);
			} catch {
				// Invalid href cannot provide a crawlable route.
			}
		}
	}
	return routes
		.filter((r) => !r.legacy && !reached.has(r.path))
		.map((r) => `${r.path}: not reachable from home through internal links`);
}

export function checkPage(html: string, route: RouteEntry): string[] {
	const errors: string[] = [];
	const require = (ok: boolean, message: string) => {
		if (!ok) errors.push(message);
	};
	const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? '';
	const links = tags(head, 'link');
	const meta = tags(html, 'meta');
	const titles = [...head.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)];
	require(titles.length === 1 && Boolean(titles[0][1].trim()), 'one nonempty title required');
	require(meta.filter((m) => m.name === 'description' && m.content?.trim()).length ===
		1, 'description required');
	require(tags(html, 'html')[0]?.lang === htmlLangOf(route.locale), 'html lang mismatch');
	require([...html.matchAll(/<h1\b[^>]*>/gi)].length === 1, 'one h1 required');
	require(/<main\b[^>]*>[\s\S]*\S[\s\S]*<\/main>/i.test(html), 'prerendered main content required');
	require(!meta.some(
		(m) => /^(robots|googlebot)$/i.test(m.name ?? '') && /\b(noindex|none)\b/i.test(m.content ?? '')
	), 'unexpected noindex');
	const canonicals = links.filter((l) => l.rel === 'canonical');
	require(canonicals.length === 1 &&
		canonicals[0].href === absolute(route.path), 'canonical mismatch');
	const alternates = links.filter((l) => l.rel === 'alternate' && l.hreflang);
	require(alternates.length === 3 &&
		alternatesFor(route.path).every((expected) =>
			alternates.some((a) => a.hreflang === expected.hreflang && a.href === expected.href)
		), 'hreflang mismatch');

	const schemas: Record<string, unknown>[] = [];
	for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
		if (attributes(match[1]).type !== 'application/ld+json') continue;
		try {
			const parsed = JSON.parse(match[2]);
			const entries = Array.isArray(parsed) ? parsed : (parsed['@graph'] ?? [parsed]);
			schemas.push(...entries);
		} catch {
			errors.push('invalid JSON-LD');
		}
	}
	const datasets = schemas.filter((s) => s?.['@type'] === 'Dataset');
	const toolPage = speciesToolFor(route.path);
	const isData = toolPage?.tool === 'data';
	require(datasets.length === (isData ? 1 : 0), 'Dataset must appear only on data pages, once');
	if (isData && datasets.length === 1) {
		const dataset = datasets[0];
		require(dataset.url === absolute(route.path) &&
			dataset.inLanguage === htmlLangOf(route.locale) &&
			typeof dataset.name === 'string' &&
			Boolean(dataset.name.trim()) &&
			typeof dataset.description === 'string' &&
			Boolean(dataset.description.trim()), 'Dataset URL, language or metadata mismatch');
	}

	const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? '';
	const breadcrumbs = tags(main, 'nav').filter((nav) =>
		/^(?:Breadcrumb|麵包屑)$/.test(nav['aria-label'] ?? '')
	);
	require(breadcrumbs.length ===
		(route.path === '/' || route.path === '/en'
			? 0
			: 1), 'one breadcrumb navigation required on non-home pages, none on home pages');
	if (toolPage) {
		const opposite = toolPage.scope === 'cetaceans' ? 'sea-turtles' : 'cetaceans';
		require(tags(main, 'section').some(
			(section) => section['data-species'] === toolPage.scope
		), 'species-scoped content required');
		require(!new RegExp(`id=["']${opposite}["']`).test(
			main
		), 'opposite animal content on species page');
		const crumbs =
			main.match(
				/<nav\b[^>]*aria-label=["'](?:Breadcrumb|麵包屑)["'][^>]*>([\s\S]*?)<\/nav>/i
			)?.[1] ?? '';
		require(tags(crumbs, 'li').length === 3, 'species tool requires three breadcrumb levels');
		if (toolPage.tool === 'map')
			require(tags(main, 'svg').filter((svg) => svg.role === 'img').length ===
				1, 'species map must render exactly one map');
		else
			require(tags(main, 'div').filter((div) => div.class?.split(' ').includes('chart-card'))
				.length === (toolPage.scope === 'cetaceans' ? 5 : 4), 'species data chart count mismatch');
	}
	if (/^\/(?:en\/)?(?:data|map)$/.test(route.path)) {
		require(!tags(main, 'svg').some(
			(svg) => svg.role === 'img'
		), 'choice hub must not render maps or charts');
		require(!tags(main, 'div').some((div) =>
			div.class?.split(' ').includes('chart-card')
		), 'choice hub must not render charts');
	}
	return errors;
}

export function checkSitemap(xml: string): string[] {
	const errors: string[] = [];
	const blocks = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
	const urls = blocks.map((b) => b.match(/<loc>([^<]+)<\/loc>/)?.[1]);
	if (
		!xml.includes('<urlset ') ||
		JSON.stringify([...urls].sort()) !== JSON.stringify(routes.map((r) => absolute(r.path)).sort())
	) {
		errors.push('sitemap URLs must exactly match public routes');
	}
	for (const route of routes) {
		const block = blocks.find((b) => b.includes(`<loc>${absolute(route.path)}</loc>`));
		const links = block ? tags(block, 'xhtml:link') : [];
		if (
			links.length !== 3 ||
			!alternatesFor(route.path).every((a) =>
				links.some((l) => l.rel === 'alternate' && l.hreflang === a.hreflang && l.href === a.href)
			)
		) {
			errors.push(`sitemap hreflang mismatch: ${route.path}`);
		}
	}
	return errors;
}

export function checkRobots(text: string): string[] {
	const groups: { agents: string[]; rules: { allow: boolean; path: string }[] }[] = [];
	let current: (typeof groups)[number] | undefined;
	for (const raw of text.split('\n')) {
		const line = raw.split('#')[0].trim();
		const colon = line.indexOf(':');
		if (colon < 0) continue;
		const key = line.slice(0, colon).toLowerCase();
		const value = line.slice(colon + 1).trim();
		if (key === 'user-agent') {
			if (!current || current.rules.length) {
				current = { agents: [], rules: [] };
				groups.push(current);
			}
			current.agents.push(value.toLowerCase());
		} else if ((key === 'allow' || key === 'disallow') && current) {
			current.rules.push({ allow: key === 'allow', path: value });
		}
	}
	const specific = groups.filter((g) => g.agents.includes('googlebot'));
	const rules = (specific.length ? specific : groups.filter((g) => g.agents.includes('*'))).flatMap(
		(g) => g.rules
	);
	const errors: string[] = [];
	for (const path of [...routes.map((r) => r.path), '/sitemap.xml']) {
		const matches = rules.filter(
			(r) =>
				r.path &&
				new RegExp(
					'^' +
						r.path
							.split('*')
							.map((s) => s.replace(/[.+?^{}()|[\]\\]/g, '\\$&'))
							.join('.*')
				).test(path)
		);
		matches.sort(
			(a, b) =>
				b.path.replace(/[*$]/g, '').length - a.path.replace(/[*$]/g, '').length ||
				Number(b.allow) - Number(a.allow)
		);
		if (matches[0] && !matches[0].allow) errors.push(`robots blocked: ${path}`);
	}
	if (!text.split('\n').some((line) => line.trim() === `Sitemap: ${SITE_ORIGIN}/sitemap.xml`))
		errors.push('robots sitemap declaration missing');
	return errors;
}
