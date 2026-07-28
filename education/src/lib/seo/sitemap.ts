/**
 * Sitemap generation (#40). Built from the shared route table, so adding a
 * route never means remembering to edit the sitemap — and the alternates it
 * declares are the same ones the pages themselves carry.
 */

import { absolute, alternatesFor, routes } from './routes';

export const buildSitemap = (): string => {
	const entries = routes
		.map((route) => {
			const alternates = alternatesFor(route.path)
				.map(
					(alternate) =>
						`\t\t<xhtml:link rel="alternate" hreflang="${alternate.hreflang}" href="${alternate.href}" />`
				)
				.join('\n');
			return `\t<url>\n\t\t<loc>${absolute(route.path)}</loc>\n${alternates}\n\t</url>`;
		})
		.join('\n');

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries}
</urlset>
`;
};
