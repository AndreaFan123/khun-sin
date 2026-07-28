/**
 * JSON-LD builders (#41, #42).
 *
 * Two rules govern everything here:
 *
 * 1. Generate from the copy modules — never hand-write parallel text. The
 *    bilingual mirror discipline applies to structured data exactly as it
 *    applies to visible copy.
 * 2. Assert nothing the page does not show. For safety information that is a
 *    credibility question before it is a search-penalty question, so step and
 *    answer strings are passed through verbatim rather than rewritten.
 */

import type { Locale, SiteCopy } from '$lib/copy';
import { totals } from '$lib/data/strandings';
import { absolute, htmlLangOf, SITE_ORIGIN } from './routes';

export type JsonLd = Record<string, unknown>;

const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

const CONTEXT = 'https://schema.org';

/** The stranding data's origin. This site presents the figures; it does not own them. */
const SOURCE = {
	zh: '海洋委員會海洋保育署',
	en: 'Ocean Conservation Administration'
} as const;

const DATASET_COPY = {
	zh: {
		name: '台灣鯨豚擱淺統計（海保救援網 MARN）',
		description:
			'台灣周邊海域鯨豚擱淺的年度與季度統計：擱淺總數、死亡與活體、物種、縣市分布、月份與死因判定。資料來自海洋委員會海洋保育署「海保救援網（MARN）」歷年官方擱淺報告，由 Khun-Sin 整理呈現。'
	},
	en: {
		name: 'Taiwan cetacean stranding statistics (MARN)',
		description:
			'Annual and quarterly cetacean stranding statistics for the waters around Taiwan: totals, dead versus live, species, county distribution, month, and determined cause of death. Sourced from the Ocean Conservation Administration’s Marine Animal Rescue Network (MARN) reports and presented by Khun-Sin.'
	}
} as const;

/** Turn a guidance line into a question, since FAQPage entries must be questions. */
const asQuestion = (locale: Locale, kind: 'do' | 'dont', index: number): string =>
	locale === 'en'
		? kind === 'do'
			? `What should I do when I find a stranded whale or dolphin? (${index + 1})`
			: `What must I never do to a stranded whale or dolphin? (${index + 1})`
		: kind === 'do'
			? `發現擱淺鯨豚時，該做什麼？（${index + 1}）`
			: `發現擱淺鯨豚時，絕對不要做什麼？（${index + 1}）`;

export const buildOrganization = (copy: SiteCopy): JsonLd => ({
	'@context': CONTEXT,
	'@type': 'Organization',
	'@id': ORGANIZATION_ID,
	name: 'Khun-Sin',
	url: `${SITE_ORIGIN}/`,
	description: copy.meta.home.description
});

export const buildWebSite = (copy: SiteCopy, locale: Locale): JsonLd => ({
	'@context': CONTEXT,
	'@type': 'WebSite',
	'@id': WEBSITE_ID,
	name: 'Khun-Sin',
	url: `${SITE_ORIGIN}/`,
	description: copy.meta.home.description,
	inLanguage: htmlLangOf(locale),
	publisher: { '@id': ORGANIZATION_ID }
});

export const buildHowTo = (copy: SiteCopy, locale: Locale): JsonLd => ({
	'@context': CONTEXT,
	'@type': 'HowTo',
	name: copy.sectionHeads.report.title,
	description: copy.sectionHeads.report.lead,
	inLanguage: htmlLangOf(locale),
	totalTime: 'PT5M',
	tool: [
		{
			'@type': 'HowToTool',
			name: `${copy.hotline.label}（${copy.hotline.number}）`
		}
	],
	step: copy.reportSteps.map((step, index) => ({
		'@type': 'HowToStep',
		position: index + 1,
		name: step.title,
		text: step.description
	}))
});

export const buildFaqPage = (copy: SiteCopy, locale: Locale): JsonLd => ({
	'@context': CONTEXT,
	'@type': 'FAQPage',
	inLanguage: htmlLangOf(locale),
	mainEntity: [
		...copy.doList.map((item, index) => ({
			'@type': 'Question',
			name: asQuestion(locale, 'do', index),
			acceptedAnswer: { '@type': 'Answer', text: item }
		})),
		...copy.dontList.map((item, index) => ({
			'@type': 'Question',
			name: asQuestion(locale, 'dont', index),
			acceptedAnswer: { '@type': 'Answer', text: item }
		}))
	]
});

export const buildDataset = (copy: SiteCopy, locale: Locale): JsonLd => {
	const years = totals.map((t) => t.period.year);
	const dataset = DATASET_COPY[locale];
	return {
		'@context': CONTEXT,
		'@type': 'Dataset',
		name: dataset.name,
		description: dataset.description,
		inLanguage: htmlLangOf(locale),
		url: absolute(locale === 'en' ? '/en' : '/'),
		temporalCoverage: `${Math.min(...years)}/${Math.max(...years)}`,
		spatialCoverage: { '@type': 'Place', name: 'Taiwan' },
		creator: {
			'@type': 'GovernmentOrganization',
			name: SOURCE[locale],
			url: copy.dataSources.marnUrl
		},
		publisher: { '@id': ORGANIZATION_ID },
		isAccessibleForFree: true,
		keywords: ['cetacean stranding', 'Taiwan', 'marine conservation', '鯨豚擱淺', '海洋保育']
	};
};
