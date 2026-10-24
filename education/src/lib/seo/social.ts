import type { Locale } from '$lib/copy';
import { SITE_ORIGIN } from './routes';

const SOCIAL_IMAGE_PATHS: Record<Locale, string> = {
	zh: '/og/og-report-zh-v2.webp',
	en: '/og/og-report-en-v2.webp'
};

export const SOCIAL_IMAGE_DIMENSIONS = { width: 1600, height: 900 };

/** Versioned public URLs let refreshed artwork replace cached social previews. */
export const socialImage = (locale: Locale): string =>
	`${SITE_ORIGIN}${SOCIAL_IMAGE_PATHS[locale]}`;
