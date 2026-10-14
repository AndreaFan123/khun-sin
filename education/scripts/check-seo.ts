import { readFile, readdir } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkPage, checkRobots, checkSitemap, checkNavigation } from '../src/lib/seo/preflight.ts';
import { routes, SITE_ORIGIN } from '../src/lib/seo/routes.ts';

const root = fileURLToPath(new URL('..', import.meta.url));
const output = resolve(root, '.svelte-kit/output/prerendered/pages');
const live = process.argv.includes('--live');
if (process.argv.slice(2).some((arg) => arg !== '--live'))
	throw new Error('Usage: node scripts/check-seo.ts [--live]');
const failures: string[] = [];
const pages = new Map<string, string>();
const titles = new Set<string>();

async function load(path: string): Promise<string> {
	if (!live) {
		const file =
			path === '/robots.txt'
				? resolve(root, 'static/robots.txt')
				: resolve(
						output,
						path === '/' ? 'index.html' : path.slice(1) + (path.includes('.') ? '' : '.html')
					);
		return readFile(file, 'utf8');
	}
	const response = await fetch(`${SITE_ORIGIN}${path}`, {
		redirect: 'manual',
		signal: AbortSignal.timeout(20000)
	});
	if (response.status !== 200) throw new Error(`HTTP ${response.status}`);
	if (/\b(noindex|none)\b/i.test(response.headers.get('x-robots-tag') ?? ''))
		throw new Error('X-Robots-Tag prevents indexing');
	const type = response.headers.get('content-type') ?? '';
	if (
		path === '/sitemap.xml'
			? !/\bxml\b/i.test(type)
			: path === '/robots.txt'
				? !type.includes('text/plain')
				: !type.includes('text/html')
	)
		throw new Error(`Unexpected Content-Type: ${type}`);
	return response.text();
}

for (const route of routes) {
	try {
		const html = await load(route.path);
		pages.set(route.path, html);
		const errors = checkPage(html, route);
		const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1];
		if (title && titles.has(title)) errors.push('duplicate page title');
		if (title) titles.add(title);
		failures.push(...errors.map((e) => `${route.path}: ${e}`));
		console.log(`${errors.length ? 'FAIL' : 'PASS'} ${route.path}`);
	} catch (error) {
		failures.push(`${route.path}: ${String(error)}`);
	}
}
failures.push(...checkNavigation(pages));
for (const [path, check] of [
	['/sitemap.xml', checkSitemap],
	['/robots.txt', checkRobots]
] as const) {
	try {
		failures.push(...check(await load(path)).map((e) => `${path}: ${e}`));
	} catch (error) {
		failures.push(`${path}: ${String(error)}`);
	}
}

// Catch a new indexable page omitted from the shared route table/sitemap.
if (!live) {
	for (const file of await readdir(output, { recursive: true })) {
		if (!file.endsWith('.html')) continue;
		const html = await readFile(resolve(output, file), 'utf8');
		if (/<meta\b[^>]*http-equiv=["']refresh["']/i.test(html)) continue;
		const path =
			'/' +
			relative(output, resolve(output, file))
				.replaceAll('\\', '/')
				.replace(/(?:^|\/)index\.html$/, '')
				.replace(/\.html$/, '');
		if (!routes.some((r) => r.path === path))
			failures.push(`${path}: generated page missing from public route table`);
	}
}
if (failures.length) {
	console.error(failures.join('\n'));
	process.exitCode = 1;
} else
	console.log(
		`SEO preflight passed (${routes.length} routes, ${live ? 'production HTTP' : 'build output'}). This does not confirm Google indexing.`
	);
