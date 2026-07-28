import { describe, expect, it } from 'vitest';
import * as zh from '$lib/data/site';
import * as en from '$lib/data/site-en';
import { totals } from '$lib/data/strandings';
import { SITE_ORIGIN } from './routes';
import { buildDataset, buildFaqPage, buildHowTo, buildOrganization, buildWebSite } from './schema';

const locales = [
	['zh', zh],
	['en', en]
] as const;

describe.each(locales)('HowTo (%s)', (locale, copy) => {
	const howTo = buildHowTo(copy, locale);

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

	it('carries the hotline number as the tool the reader needs', () => {
		expect(JSON.stringify(howTo)).toContain(copy.hotline.number);
	});

	it('states its language', () => {
		expect(howTo.inLanguage).toBe(locale === 'en' ? 'en' : 'zh-Hant-TW');
	});
});

describe.each(locales)('FAQPage (%s)', (locale, copy) => {
	const faq = buildFaqPage(copy, locale);
	const entries = faq.mainEntity as {
		'@type': string;
		name: string;
		acceptedAnswer: { '@type': string; text: string };
	}[];

	it('is a schema.org FAQPage in the page language', () => {
		expect(faq['@context']).toBe('https://schema.org');
		expect(faq['@type']).toBe('FAQPage');
		expect(faq.inLanguage).toBe(locale === 'en' ? 'en' : 'zh-Hant-TW');
	});

	it('covers every do and never item', () => {
		expect(entries).toHaveLength(copy.doList.length + copy.dontList.length);
	});

	it('answers verbatim from the page copy — nothing asserted that is not shown', () => {
		const shown = [...copy.doList, ...copy.dontList];
		expect(entries.map((e) => e.acceptedAnswer.text)).toEqual(shown);
	});

	it('shapes every entry as a Question with an Answer', () => {
		expect(entries.every((e) => e['@type'] === 'Question')).toBe(true);
		expect(entries.every((e) => e.acceptedAnswer['@type'] === 'Answer')).toBe(true);
		expect(entries.every((e) => e.name.length > 0)).toBe(true);
	});
});

describe.each(locales)('Dataset (%s)', (locale, copy) => {
	const dataset = buildDataset(copy, locale);

	it('is a schema.org Dataset', () => {
		expect(dataset['@context']).toBe('https://schema.org');
		expect(dataset['@type']).toBe('Dataset');
		expect(dataset.name).toBeTruthy();
		expect(dataset.description).toBeTruthy();
		expect(dataset.inLanguage).toBe(locale === 'en' ? 'en' : 'zh-Hant-TW');
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

	it('links back to the page that presents it', () => {
		expect(String(dataset.url)).toContain(SITE_ORIGIN);
	});
});

describe.each(locales)('Organization and WebSite (%s)', (locale, copy) => {
	const org = buildOrganization(copy);
	const site = buildWebSite(copy, locale);

	it('identifies the site at a stable id', () => {
		expect(org['@type']).toBe('Organization');
		expect(org['@id']).toBe(`${SITE_ORIGIN}/#organization`);
		expect(org.name).toBe('Khun-Sin');
		expect(org.url).toBe(`${SITE_ORIGIN}/`);
	});

	it('publishes the WebSite through that same organization', () => {
		expect(site['@type']).toBe('WebSite');
		expect(site.publisher).toEqual({ '@id': `${SITE_ORIGIN}/#organization` });
		expect(site.inLanguage).toBe(locale === 'en' ? 'en' : 'zh-Hant-TW');
	});
});
