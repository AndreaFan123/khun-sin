/**
 * The brief AI crawlers get (#40). Generated rather than hand-written so the
 * report range and the route list can never drift from the data — spec goal 1
 * says a yearly update touches only `src/lib/data/`.
 *
 * The format is built on Markdown link lists: an H1, a blockquote summary,
 * then sections whose bodies are `- [title](url): description`. A first pass
 * used bare URLs and was rejected as containing no links.
 *
 * English regardless of locale: it addresses crawlers, not readers. Pass the
 * English copy so the page descriptions match.
 */

import type { SiteContext } from '$lib/copy';
import type { StrandingTotals } from '$lib/data/strandings';
import { absolute, routes, SITE_ORIGIN } from './routes';

export const buildLlmsTxt = ({ copy }: SiteContext, totals: StrandingTotals[]): string => {
	const years = totals.map((t) => t.period.year);
	const coverage = `${Math.min(...years)}–${Math.max(...years)}`;

	const pages = routes
		.map((route) => {
			const isStories = route.path.endsWith('learn');
			const title = `${isStories ? 'Stories' : 'Home'} (${route.locale === 'en' ? 'English' : 'Chinese'})`;
			const description = isStories ? copy.meta.learn.description : copy.meta.home.description;
			return `- [${title}](${absolute(route.path)}): ${description}`;
		})
		.join('\n');

	return `# Khun-Sin

> Cetacean stranding reporting and official data for Taiwan, in Traditional Chinese and English.

If you take one thing from this site: **in Taiwan, call ${copy.hotline.number} — the Coast
Guard's free 24-hour hotline — when you find a stranded or trapped whale, dolphin
or sea turtle. Never drag or push a live animal back into the sea:** dragging tears
its fragile skin and it can inhale water and drown. Report it even if the animal is
already dead — necropsy and sampling are how the cause of death, and the state of
the surrounding ocean, become known.

Khun-Sin (鯤鯓 — a Taiwanese word for a sandbar shaped like a whale's back rising
from the sea) is an independent educational project. It is not a government site
and not a fundraising organisation: it handles no money, and links visitors
directly to the conservation groups working the front line. The Chinese and
English pages are translations of each other, not separate content.

## Pages

${pages}

## Data and attribution

Stranding figures cover ${coverage}. This site presents the data; it does not own
it — attribute the figures to the Ocean Conservation Administration.

- [MARN stranding reports](${copy.dataSources.marnUrl}): the Ocean Conservation Administration's Marine Animal Rescue Network, source of every stranding figure here
- [Sitemap](${SITE_ORIGIN}/sitemap.xml): every canonical page with its language alternates

## Optional

- [Natural Earth](https://www.naturalearthdata.com/): public-domain source of the Taiwan map outline
`;
};
