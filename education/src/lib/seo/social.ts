import type { Locale } from '$lib/copy';
import { SITE_ORIGIN } from './routes';

const SOCIAL_IMAGE_PATHS: Record<Locale, string> = {
	zh: '/og/og-image-zh.jpg',
	en: '/og/og-image-en.jpg'
};

/** Stable public URL so cached social previews survive application redeploys. */
export const socialImage = (locale: Locale): string =>
	`${SITE_ORIGIN}${SOCIAL_IMAGE_PATHS[locale]}`;
