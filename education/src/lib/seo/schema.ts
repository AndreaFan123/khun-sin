/**
 * JSON-LD builders (#41, #42).
 *
 * Two rules govern everything here:
 *
 * 1. Generate from the copy modules — never hand-write parallel text. The
 *    bilingual mirror discipline applies to structured data exactly as it
 *    applies to visible copy, so every string below comes from site.ts /
 *    site-en.ts rather than living in this file.
 * 2. Assert nothing the page does not show. For safety information that is a
 *    credibility question before it is a search-penalty question, so step and
 *    answer strings are passed through verbatim rather than rewritten.
 *
 * Builders take the whole locale context rather than a (copy, locale) pair —
 * the two always travel together, and splitting them invites the mismatch of
 * English copy tagged as Chinese.
 */

import type { SiteContext } from '$lib/copy';
import { lastUpdated, totals } from '$lib/data/strandings';
import { absolute, homePathFor, htmlLangOf, SITE_ORIGIN } from './routes';

export type JsonLd = Record<string, unknown>;

const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

const CONTEXT = 'https://schema.org';

export const buildOrganization = ({ copy }: SiteContext): JsonLd => ({
	'@context': CONTEXT,
	'@type': 'Organization',
	'@id': ORGANIZATION_ID,
	name: 'Khun-Sin',
	url: `${SITE_ORIGIN}/`,
	description: copy.meta.home.description
});

export const buildWebSite = ({ copy, locale }: SiteContext): JsonLd => ({
	'@context': CONTEXT,
	'@type': 'WebSite',
	'@id': WEBSITE_ID,
	name: 'Khun-Sin',
	url: `${SITE_ORIGIN}/`,
	description: copy.meta.home.description,
	inLanguage: htmlLangOf(locale),
	publisher: { '@id': ORGANIZATION_ID }
});

export const buildHowTo = ({ copy, locale }: SiteContext): JsonLd => ({
	'@context': CONTEXT,
	'@type': 'HowTo',
	name: copy.sectionHeads.report.title,
	description: copy.sectionHeads.report.lead,
	inLanguage: htmlLangOf(locale),
	tool: [{ '@type': 'HowToTool', name: copy.hotline.label }],
	step: copy.reportSteps.map((step, index) => ({
		'@type': 'HowToStep',
		position: index + 1,
		name: step.title,
		text: step.description
	}))
});

/**
 * Two entries, mirroring how the page actually presents this: one do list and
 * one never list, each under its own heading. Answers join the visible items
 * rather than paraphrasing them.
 */
export const buildFaqPage = ({ copy, locale }: SiteContext): JsonLd => {
	const answer = (items: string[]) => ({ '@type': 'Answer', text: items.join('\n') });
	return {
		'@context': CONTEXT,
		'@type': 'FAQPage',
		inLanguage: htmlLangOf(locale),
		mainEntity: [
			{
				'@type': 'Question',
				name: copy.schemaCopy.doQuestion,
				acceptedAnswer: answer(copy.doList)
			},
			{
				'@type': 'Question',
				name: copy.schemaCopy.dontQuestion,
				acceptedAnswer: answer(copy.dontList)
			}
		]
	};
};

export const buildDataset = ({ copy, locale }: SiteContext): JsonLd => {
	const years = totals.map((t) => t.period.year);
	return {
		'@context': CONTEXT,
		'@type': 'Dataset',
		name: copy.schemaCopy.dataset.name,
		description: copy.schemaCopy.dataset.description,
		inLanguage: htmlLangOf(locale),
		url: absolute(homePathFor(locale)),
		temporalCoverage: `${Math.min(...years)}/${Math.max(...years)}`,
		dateModified: lastUpdated,
		spatialCoverage: { '@type': 'Place', name: 'Taiwan' },
		creator: {
			'@type': 'GovernmentOrganization',
			name: copy.schemaCopy.sourceName,
			url: copy.dataSources.marnUrl
		},
		publisher: { '@id': ORGANIZATION_ID },
		isAccessibleForFree: true,
		keywords: ['cetacean stranding', 'Taiwan', 'marine conservation', '鯨豚擱淺', '海洋保育']
	};
};

/** What the home routes add on top of the site-wide identity schemas. */
export const buildHomeSchema = (context: SiteContext): JsonLd[] => [
	buildHowTo(context),
	buildFaqPage(context),
	buildDataset(context)
];

/**
 * Render schemas as script tags. `<` is escaped so a stray `</script>` in page
 * copy can never terminate the tag early and inject markup — the copy modules
 * are trusted today, but this is the kind of thing that stops being true
 * quietly.
 */
export const serializeJsonLd = (schemas: JsonLd[]): string =>
	schemas
		.map(
			(schema) =>
				`<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`
		)
		.join('\n');
