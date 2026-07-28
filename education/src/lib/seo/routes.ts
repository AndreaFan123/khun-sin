/**
 * The single source of truth for what routes exist, what language each one
 * speaks, and which page is its counterpart in the other language (#37).
 *
 * Everything that needs to reason about routes reads this: the head component
 * (canonical + hreflang), the server hook (html lang), the navigation's
 * language switcher, and — once it lands — the sitemap. Adding a route means
 * adding one entry here.
 */

import type { Locale } from '$lib/copy';

/** Production origin — required because social and canonical URLs must be absolute. */
export const SITE_ORIGIN = 'https://www.khun-sin.com';

export type RoutePath = '/' | '/learn' | '/en' | '/en/learn';

export interface RouteEntry {
	path: RoutePath;
	locale: Locale;
	/** The same page in the other language. */
	alternate: RoutePath;
}

export const routes: RouteEntry[] = [
	{ path: '/', locale: 'zh', alternate: '/en' },
	{ path: '/learn', locale: 'zh', alternate: '/en/learn' },
	{ path: '/en', locale: 'en', alternate: '/' },
	{ path: '/en/learn', locale: 'en', alternate: '/learn' }
];

/** BCP 47 tags for the `lang` attribute and hreflang annotations. */
const HTML_LANG: Record<Locale, string> = {
	zh: 'zh-Hant-TW',
	en: 'en'
};

export const entryFor = (path: RoutePath): RouteEntry =>
	routes.find((r) => r.path === path) ?? routes[0];

/** Locale of an arbitrary pathname (tolerates trailing slashes). */
export const localeForPathname = (pathname: string): Locale =>
	pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'zh';

export const htmlLangOf = (locale: Locale): string => HTML_LANG[locale];

export const absolute = (path: RoutePath): string =>
	path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;

export interface Alternate {
	hreflang: string;
	href: string;
}

/**
 * Both language versions of a page plus `x-default`. Every page in a pair
 * lists the same set, which is what makes the annotations reciprocal.
 * `x-default` points at the English page: it is the fallback for visitors
 * whose language matches neither, and English serves them better than
 * Traditional Chinese.
 */
export const alternatesFor = (path: RoutePath): Alternate[] => {
	const self = entryFor(path);
	const other = entryFor(self.alternate);
	const english = self.locale === 'en' ? self : other;
	return [
		{ hreflang: htmlLangOf(self.locale), href: absolute(self.path) },
		{ hreflang: htmlLangOf(other.locale), href: absolute(other.path) },
		{ hreflang: 'x-default', href: absolute(english.path) }
	];
};
