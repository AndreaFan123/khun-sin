/**
 * Locale plumbing for the /en mirror. The root layout's load() dynamically
 * imports the right copy module for the URL (so each page ships only its own
 * language) and the layout provides a reactive accessor via context;
 * components read copy through useSite() instead of importing site.ts
 * directly. Both locales prerender — no runtime i18n library.
 */

import { getContext, setContext } from 'svelte';

// Type-only query — no runtime import, so zh copy isn't pulled into every chunk.
export type SiteCopy = typeof import('$lib/data/site');
export type Locale = 'zh' | 'en';

export interface SiteContext {
	copy: SiteCopy;
	locale: Locale;
}

const KEY = 'khun-sin:site';

type Accessor = () => SiteContext;

export const provideSite = (accessor: Accessor): void => {
	setContext(KEY, accessor);
};

export const useSite = (): Accessor => {
	const accessor = getContext<Accessor>(KEY);
	if (!accessor) throw new Error('useSite() called outside the root layout context');
	return accessor;
};
