import { describe, expect, it } from 'vitest';
import type { SiteContext } from '$lib/copy';
import * as zh from '$lib/data/site';
import * as en from '$lib/data/site-en';
import { totals } from '$lib/data/strandings';
import { SITE_ORIGIN } from './routes';
import {
	buildDataset,
	buildFaqPage,
	buildHomeSchema,
	buildHowTo,
	buildOrganization,
	buildWebSite,
	serializeJsonLd
} from './schema';

const contexts = [
	['zh', { copy: zh, locale: 'zh' } satisfies SiteContext],
	['en', { copy: en, locale: 'en' } satisfies SiteContext]
] as const;

const expectedLang = (locale: string) => (locale === 'en' ? 'en' : 'zh-Hant-TW');

describe.each(contexts)('HowTo (%s)', (locale, context) => {
	const howTo = buildHowTo(context);
	const { copy } = context;

	it('is a schema.org HowTo', () => {
		expect(howTo['@context']).toBe('https://schema.org');
		expect(howTo['@type']).toBe('HowTo');
		expect(howTo.name).toBeTruthy();
	});

	it('has one step per reporting step, in order, worded exactly as the page', () => {
		const steps = howTo.step as { '@type': string; name: string; text: string }[];
		expect(steps.map((s) => s.name)).toEqual(copy.reportSteps.map((s) => s.title));
		expect(steps.map((s) => s.text)).toEqual(copy.reportSteps.map((s) => s.description));
		expect(steps.every((s) => s['@type'] === 'HowToStep')).toBe(true);
	});

	it('carries the hotline number the reader needs', () => {
		expect(JSON.stringify(howTo)).toContain(copy.hotline.number);
	});

	it('asserts nothing beyond what the page shows', () => {
		// No duration claim — the page never says how long reporting takes.
		expect(howTo.totalTime).toBeUndefined();
		const tool = howTo.tool as { name: string }[];
		expect(tool[0].name).toBe(copy.hotline.label);
	});

	it('states its language', () => {
		expect(howTo.inLanguage).toBe(expectedLang(locale));
	});
});

describe.each(contexts)('FAQPage (%s)', (locale, context) => {
	const faq = buildFaqPage(context);
	const { copy } = context;
	const entries = faq.mainEntity as {
		'@type': string;
		name: string;
		acceptedAnswer: { '@type': string; text: string };
	}[];

	it('is a schema.org FAQPage in the page language', () => {
		expect(faq['@context']).toBe('https://schema.org');
		expect(faq['@type']).toBe('FAQPage');
		expect(faq.inLanguage).toBe(expectedLang(locale));
	});

	it('mirrors the page: one do question and one never question', () => {
		expect(entries).toHaveLength(2);
		expect(entries.map((e) => e.name)).toEqual([
			copy.schemaCopy.doQuestion,
			copy.schemaCopy.dontQuestion
		]);
	});

	it('answers verbatim from the page copy — nothing asserted that is not shown', () => {
		for (const item of copy.doList) expect(entries[0].acceptedAnswer.text).toContain(item);
		for (const item of copy.dontList) expect(entries[1].acceptedAnswer.text).toContain(item);
	});

	it('shapes every entry as a Question with an Answer', () => {
		expect(entries.every((e) => e['@type'] === 'Question')).toBe(true);
		expect(entries.every((e) => e.acceptedAnswer['@type'] === 'Answer')).toBe(true);
		expect(entries.every((e) => e.name.length > 0)).toBe(true);
	});
});

describe.each(contexts)('Dataset (%s)', (locale, context) => {
	const dataset = buildDataset(context);

	it('is a schema.org Dataset', () => {
		expect(dataset['@context']).toBe('https://schema.org');
		expect(dataset['@type']).toBe('Dataset');
		expect(dataset.name).toBeTruthy();
		expect(dataset.description).toBeTruthy();
		expect(dataset.inLanguage).toBe(expectedLang(locale));
	});

	it('credits the Ocean Conservation Administration as the source, not this site', () => {
		const creator = dataset.creator as { '@type': string; name: string };
		expect(creator['@type']).toBe('GovernmentOrganization');
		expect(creator.name).toMatch(/Ocean Conservation Administration|海洋保育署/);
	});

	it('derives temporal coverage from the data, so a new report updates it', () => {
		const years = totals.map((t) => t.period.year);
		expect(dataset.temporalCoverage).toBe(`${Math.min(...years)}/${Math.max(...years)}`);
	});

	it('points at the page in its own language', () => {
		expect(dataset.url).toBe(locale === 'en' ? `${SITE_ORIGIN}/en` : `${SITE_ORIGIN}/`);
	});
});

describe.each(contexts)('Organization and WebSite (%s)', (locale, context) => {
	const org = buildOrganization(context);
	const website = buildWebSite(context);

	it('identifies the site at a stable id', () => {
		expect(org['@type']).toBe('Organization');
		expect(org['@id']).toBe(`${SITE_ORIGIN}/#organization`);
		expect(org.name).toBe('Khun-Sin');
		expect(org.url).toBe(`${SITE_ORIGIN}/`);
	});

	it('publishes the WebSite through that same organization', () => {
		expect(website['@type']).toBe('WebSite');
		expect(website.publisher).toEqual({ '@id': `${SITE_ORIGIN}/#organization` });
		expect(website.inLanguage).toBe(expectedLang(locale));
	});
});

describe('buildHomeSchema', () => {
	it('bundles what the home page adds to the site-wide identity', () => {
		const types = buildHomeSchema(contexts[0][1]).map((s) => s['@type']);
		expect(types).toEqual(['HowTo', 'FAQPage', 'Dataset']);
	});
});

describe('serializeJsonLd', () => {
	const zhContext = contexts[0][1];

	it('emits one script tag per schema', () => {
		const html = serializeJsonLd([buildOrganization(zhContext), buildWebSite(zhContext)]);
		expect(html.match(/<script type="application\/ld\+json">/g)).toHaveLength(2);
	});

	it('escapes markup so page content can never break out of the script tag', () => {
		const html = serializeJsonLd([{ '@type': 'Thing', name: 'a </script><img> b' }]);
		expect(html).not.toContain('</script><img>');
		expect(html).toContain('\\u003c/script');
	});

	it('produces parseable JSON', () => {
		const html = serializeJsonLd([buildHowTo(zhContext)]);
		const body = html.replace(/<\/?script[^>]*>/g, '').replace(/\\u003c/g, '<');
		expect(() => JSON.parse(body)).not.toThrow();
	});
});
