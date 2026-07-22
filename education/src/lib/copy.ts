/**
 * Locale plumbing for the /en mirror. The root layout derives the locale
 * from the URL (/en prefix) and provides a reactive accessor via context;
 * components read copy through useSite() instead of importing site.ts
 * directly. Both locales prerender — no runtime i18n library (spec P0-3
 * copy-as-data discipline doing its job).
 */

import { getContext, setContext } from 'svelte';
import * as zh from '$lib/data/site';

export type SiteCopy = typeof zh;
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

const fallback: Accessor = () => ({ copy: zh, locale: 'zh' });

export const useSite = (): Accessor => getContext<Accessor>(KEY) ?? fallback;
