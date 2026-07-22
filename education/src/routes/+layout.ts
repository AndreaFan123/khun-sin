import type { LayoutLoad } from './$types';

// Prerender the entire site — the deployed output is pure static HTML (ADR-001).
export const prerender = true;

// Locale-split copy loading (perf): each page's JS pulls only its own
// language's copy chunk; the other locale loads lazily on switch.
export const load: LayoutLoad = async ({ url }) => {
	const isEn = url.pathname === '/en' || url.pathname.startsWith('/en/');
	const copy = isEn ? await import('$lib/data/site-en') : await import('$lib/data/site');
	return { copy, locale: (isEn ? 'en' : 'zh') as 'en' | 'zh' };
};
