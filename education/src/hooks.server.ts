import type { Handle } from '@sveltejs/kit';
import { htmlLangOf, localeForPathname } from '$lib/seo/routes';

/**
 * Stamp the page's own language onto <html lang> (#37). Runs during
 * prerendering, so the static output ships the correct tag: Chinese routes
 * are no longer served as English to search engines and screen readers.
 */
export const handle: Handle = async ({ event, resolve }) => {
	const lang = htmlLangOf(localeForPathname(event.url.pathname));
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};
