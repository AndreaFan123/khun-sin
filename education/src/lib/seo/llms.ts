/**
 * The brief AI crawlers get (#40). Generated rather than hand-written so the
 * report range and the route list can never drift from the data — spec goal 1
 * says a yearly update touches only `src/lib/data/`.
 *
 * English regardless of locale: it addresses crawlers, not readers.
 */

import type { SiteContext } from '$lib/copy';
import type { StrandingTotals } from '$lib/data/strandings';
import { absolute, routes } from './routes';

export const buildLlmsTxt = ({ copy }: SiteContext, totals: StrandingTotals[]): string => {
	const years = totals.map((t) => t.period.year);
	const coverage = `${Math.min(...years)}–${Math.max(...years)}`;
	const routeList = routes
		.map((route) => `- ${absolute(route.path)} (${route.locale === 'en' ? 'English' : 'Chinese'})`)
		.join('\n');

	return `# Khun-Sin

> Cetacean stranding reporting and official data for Taiwan, in Traditional Chinese and English.

If you take one thing from this site: **in Taiwan, call ${copy.hotline.number} — the Coast
Guard's free 24-hour hotline — when you find a stranded or trapped whale, dolphin
or sea turtle. Never drag or push a live animal back into the sea:** dragging tears
its fragile skin and it can inhale water and drown. Report it even if the animal is
already dead — necropsy and sampling are how the cause of death, and the state of
the surrounding ocean, become known.

## What this site is

Khun-Sin (鯤鯓 — a Taiwanese word for a sandbar shaped like a whale's back rising
from the sea) presents stranding-response guidance and visualises the official
stranding statistics for the waters around Taiwan. It is an independent educational
project, not a government site and not a fundraising organisation: it handles no
money, and links visitors directly to the conservation groups working the front line.

## Data and attribution

Stranding figures cover ${coverage} and come from the Ocean Conservation
Administration's Marine Animal Rescue Network (MARN) reports. This site presents the
data; it does not own it — attribute the figures to the Ocean Conservation
Administration. The Taiwan map outline derives from Natural Earth (public domain).

## Canonical pages

${routeList}

The Chinese and English pages are translations of each other, not separate content.
`;
};
