import { describe, it, expect } from 'vitest';
import {
	alternateHash,
	alternateLink,
	speciesLinks,
	speciesScopes,
	speciesToolFor
} from './navigation';
import {
	annualTotals,
	cetaceanResearch2025,
	whiteDolphinMonitoring2025,
	totals
} from './data/strandings';
import { buildDataset } from './seo/schema';
import { routes, routePathFor } from './seo/routes';
import { turtleStatisticsSource } from './data/report-sources';
import * as copy from './data/site';
describe('species navigation', () => {
	it('links directly to the selected animal tool in both locales', () => {
		expect(speciesLinks('zh', 'sea-turtles').data).toEqual({
			path: '/sea-turtles/stranding-data',
			hash: ''
		});
		expect(speciesLinks('en', 'cetaceans').map).toEqual({
			path: '/en/cetaceans/stranding-map',
			hash: ''
		});
	});
	it('preserves animal and tool when switching languages on every child route', () => {
		for (const locale of ['zh', 'en'] satisfies ('zh' | 'en')[]) {
			for (const scope of speciesScopes) {
				for (const tool of ['data', 'map'] satisfies ('data' | 'map')[]) {
					const path = speciesLinks(locale, scope)[tool].path;
					const opposite = locale === 'zh' ? 'en' : 'zh';
					expect(routePathFor(path)).toBe(path);
					expect(alternateLink(path, '')).toEqual({
						path: speciesLinks(opposite, scope)[tool].path,
						hash: ''
					});
					expect(speciesToolFor(path)).toEqual({ scope, tool });
					expect(routes.find((route) => route.path === path)?.locale).toBe(locale);
				}
			}
		}
	});

	it('retains only fragments available on the translated page', () => {
		expect(alternateLink('/data', '#sea-turtles')).toEqual({
			path: '/en/data',
			hash: '#sea-turtles'
		});
		expect(alternateHash('/map', '#unknown')).toBe('');
		expect(alternateHash('/cetaceans', '#sea-turtles')).toBe('');
		expect(alternateHash('/cetaceans/sousa-chinensis-taiwanensis', '#monitoring')).toBe(
			'#monitoring'
		);
	});
});
describe('published data scope', () => {
	it('keeps white dolphin monitoring separate from general cetacean research', () => {
		expect(Object.keys(whiteDolphinMonitoring2025).sort()).toEqual([
			'catalogued',
			'sightingGroups'
		]);
		expect(Object.keys(cetaceanResearch2025).sort()).toEqual(['pathologyCases', 'sampled']);
		expect(copy.conservationKpis.map((k) => k.metric).sort()).toEqual([
			'pathologyCases',
			'sampled'
		]);
	});
	it('describes only the sea turtle dataset and its official source', () => {
		const dataset = buildDataset({ copy, locale: 'zh' }, 'sea-turtles');
		expect(dataset.url).toBe('https://www.khun-sin.com/sea-turtles/stranding-data');
		expect(dataset.name).toContain('海龜');
		expect(dataset.description).not.toContain('鯨豚');
		expect(dataset.temporalCoverage).toBe('2019/2025');
		expect(dataset.creator).toMatchObject({ url: turtleStatisticsSource });
		expect(dataset.keywords).not.toContain('cetacean stranding');
	});

	it('describes only the visible annual series while retaining quarterly source records', () => {
		const years = annualTotals().map((t) => t.period.year);
		expect(buildDataset({ copy, locale: 'zh' }, 'cetaceans').temporalCoverage).toBe(
			`${Math.min(...years)}/${Math.max(...years)}`
		);
		expect(totals.some((t) => t.period.year === 2026 && t.period.quarter === 2)).toBe(true);
	});
});
