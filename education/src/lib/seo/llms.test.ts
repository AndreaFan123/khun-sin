import { describe, expect, it } from 'vitest';
import * as en from '$lib/data/site-en';
import { totals } from '$lib/data/strandings';
import { absolute, routes } from './routes';
import { buildLlmsTxt } from './llms';

const text = buildLlmsTxt({ copy: en, locale: 'en' }, totals);

describe('llms.txt', () => {
	it('opens with an H1 naming the project', () => {
		expect(text.split('\n')[0]).toBe('# Khun-Sin');
	});

	it('summarises the site in a blockquote, as the format expects', () => {
		expect(text).toMatch(/\n> .+/);
	});

	/**
	 * The format is built on Markdown link lists — a version of this file using
	 * bare URLs was rejected by Lighthouse with "does not appear to contain any
	 * links", which is what this pins.
	 */
	it('lists every route as a Markdown link with a description', () => {
		for (const route of routes) {
			expect(text).toMatch(
				new RegExp(`- \\[[^\\]]+\\]\\(${absolute(route.path).replace(/[/.]/g, '\\$&')}\\):`)
			);
		}
	});

	it('links the data source rather than only naming it', () => {
		expect(text).toContain(`](${en.dataSources.marnUrl})`);
	});

	it('states the coverage derived from the data', () => {
		const years = totals.map((t) => t.period.year);
		expect(text).toContain(`${Math.min(...years)}–${Math.max(...years)}`);
	});
});
