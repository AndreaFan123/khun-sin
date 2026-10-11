import { describe, expect, it } from 'vitest';
import { alternatesFor, entryFor, routePathFor, routes } from './routes';

describe('localized reporting, data, and map routes', () => {
	it.each([
		['/', '/en'],
		['/data', '/en/data'],
		['/map', '/en/map']
	] as const)('pairs %s with %s', (zh, en) => {
		expect(entryFor(zh).alternate).toBe(en);
		expect(entryFor(en).alternate).toBe(zh);
	});

	it('keeps data and map as separate routable pages', () => {
		expect(routePathFor('/data/')).toBe('/data');
		expect(routePathFor('/en/map/')).toBe('/en/map');
	});
});

describe('localized turtle routes', () => {
	it('registers the Traditional Chinese and English turtle pages as counterparts', () => {
		expect(routes).toContainEqual({
			path: '/sea-turtles',
			locale: 'zh',
			alternate: '/en/sea-turtles'
		});
		expect(routes).toContainEqual({
			path: '/en/sea-turtles',
			locale: 'en',
			alternate: '/sea-turtles'
		});
		expect(entryFor('/sea-turtles').alternate).toBe('/en/sea-turtles');
		expect(entryFor('/en/sea-turtles').alternate).toBe('/sea-turtles');
	});

	it('publishes reciprocal hreflang annotations for the turtle pages', () => {
		expect(alternatesFor('/sea-turtles')).toEqual([
			{ hreflang: 'zh-Hant-TW', href: 'https://www.khun-sin.com/sea-turtles' },
			{ hreflang: 'en', href: 'https://www.khun-sin.com/en/sea-turtles' },
			{ hreflang: 'x-default', href: 'https://www.khun-sin.com/en/sea-turtles' }
		]);
	});

	it('resolves the current turtle route for navigation, including trailing slashes', () => {
		expect(routePathFor('/sea-turtles')).toBe('/sea-turtles');
		expect(routePathFor('/en/sea-turtles/')).toBe('/en/sea-turtles');
	});
});

describe('localized cetacean routes', () => {
	it('registers the descriptive cetacean URLs as counterparts', () => {
		expect(routes).toContainEqual({
			path: '/cetaceans',
			locale: 'zh',
			alternate: '/en/cetaceans'
		});
		expect(routes).toContainEqual({
			path: '/en/cetaceans',
			locale: 'en',
			alternate: '/cetaceans'
		});
		expect(entryFor('/cetaceans').alternate).toBe('/en/cetaceans');
		expect(entryFor('/en/cetaceans').alternate).toBe('/cetaceans');
	});

	it('does not publish the former learn URLs as canonical routes', () => {
		expect(routes.map((route) => route.path)).not.toContain('/learn');
		expect(routes.map((route) => route.path)).not.toContain('/en/learn');
	});

	it('resolves the current cetacean route for locale switching, including trailing slashes', () => {
		expect(routePathFor('/cetaceans')).toBe('/cetaceans');
		expect(routePathFor('/en/cetaceans/')).toBe('/en/cetaceans');
	});
});

describe('localized support routes', () => {
	it('registers the Traditional Chinese and English support pages as counterparts', () => {
		expect(routes).toContainEqual({
			path: '/support',
			locale: 'zh',
			alternate: '/en/support'
		});
		expect(routes).toContainEqual({
			path: '/en/support',
			locale: 'en',
			alternate: '/support'
		});
		expect(entryFor('/support').alternate).toBe('/en/support');
		expect(entryFor('/en/support').alternate).toBe('/support');
	});

	it('resolves the current support route for locale switching, including trailing slashes', () => {
		expect(routePathFor('/support')).toBe('/support');
		expect(routePathFor('/en/support/')).toBe('/en/support');
	});
});
