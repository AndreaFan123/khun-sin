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

export type RoutePath =
	| '/'
	| '/data'
	| '/map'
	| '/cetaceans'
	| '/cetaceans/sousa-chinensis-taiwanensis'
	| '/sea-turtles'
	| '/support'
	| '/en'
	| '/en/data'
	| '/en/map'
	| '/en/cetaceans'
	| '/en/cetaceans/sousa-chinensis-taiwanensis'
	| '/en/sea-turtles'
	| '/en/support'
	| '/cetaceans/stranding-data'
	| '/cetaceans/stranding-map'
	| '/sea-turtles/stranding-data'
	| '/sea-turtles/stranding-map'
	| '/en/cetaceans/stranding-data'
	| '/en/cetaceans/stranding-map'
	| '/en/sea-turtles/stranding-data'
	| '/en/sea-turtles/stranding-map';

export interface RouteEntry {
	path: RoutePath;
	locale: Locale;
	/** The same page in the other language. */
	alternate: RoutePath;
	/** Compatibility entry retained for existing URLs, outside the primary navigation. */
	legacy?: true;
}

export const routes: RouteEntry[] = [
	{ path: '/', locale: 'zh', alternate: '/en' },
	{ path: '/data', locale: 'zh', alternate: '/en/data', legacy: true },
	{ path: '/map', locale: 'zh', alternate: '/en/map', legacy: true },
	{ path: '/cetaceans', locale: 'zh', alternate: '/en/cetaceans' },
	{
		path: '/cetaceans/sousa-chinensis-taiwanensis',
		locale: 'zh',
		alternate: '/en/cetaceans/sousa-chinensis-taiwanensis'
	},
	{ path: '/sea-turtles', locale: 'zh', alternate: '/en/sea-turtles' },
	{ path: '/support', locale: 'zh', alternate: '/en/support' },
	{ path: '/en', locale: 'en', alternate: '/' },
	{ path: '/en/data', locale: 'en', alternate: '/data', legacy: true },
	{ path: '/en/map', locale: 'en', alternate: '/map', legacy: true },
	{ path: '/en/cetaceans', locale: 'en', alternate: '/cetaceans' },
	{
		path: '/en/cetaceans/sousa-chinensis-taiwanensis',
		locale: 'en',
		alternate: '/cetaceans/sousa-chinensis-taiwanensis'
	},
	{ path: '/en/sea-turtles', locale: 'en', alternate: '/sea-turtles' },
	{ path: '/en/support', locale: 'en', alternate: '/support' },
	{ path: '/cetaceans/stranding-data', locale: 'zh', alternate: '/en/cetaceans/stranding-data' },
	{ path: '/cetaceans/stranding-map', locale: 'zh', alternate: '/en/cetaceans/stranding-map' },
	{
		path: '/sea-turtles/stranding-data',
		locale: 'zh',
		alternate: '/en/sea-turtles/stranding-data'
	},
	{ path: '/sea-turtles/stranding-map', locale: 'zh', alternate: '/en/sea-turtles/stranding-map' },
	{ path: '/en/cetaceans/stranding-data', locale: 'en', alternate: '/cetaceans/stranding-data' },
	{ path: '/en/cetaceans/stranding-map', locale: 'en', alternate: '/cetaceans/stranding-map' },
	{
		path: '/en/sea-turtles/stranding-data',
		locale: 'en',
		alternate: '/sea-turtles/stranding-data'
	},
	{ path: '/en/sea-turtles/stranding-map', locale: 'en', alternate: '/sea-turtles/stranding-map' }
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

/** The home route for a locale — routing knowledge stays in the route table. */
export const homePathFor = (locale: Locale): RoutePath => (locale === 'en' ? '/en' : '/');

/** Known route for navigation and locale switching; unknown paths fall back home. */
export const routePathFor = (pathname: string): RoutePath => {
	const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/';
	return (
		routes.find((route) => route.path === normalized)?.path ??
		homePathFor(localeForPathname(pathname))
	);
};

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
