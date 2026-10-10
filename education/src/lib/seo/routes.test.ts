import { describe, expect, it } from 'vitest';
import { alternatesFor, entryFor, routePathFor, routes } from './routes';

describe('localized turtle routes', () => {
	it('registers the Traditional Chinese and English turtle pages as counterparts', () => {
		expect(routes).toContainEqual({ path: '/turtles', locale: 'zh', alternate: '/en/turtles' });
		expect(routes).toContainEqual({ path: '/en/turtles', locale: 'en', alternate: '/turtles' });
		expect(entryFor('/turtles').alternate).toBe('/en/turtles');
		expect(entryFor('/en/turtles').alternate).toBe('/turtles');
	});

	it('publishes reciprocal hreflang annotations for the turtle pages', () => {
		expect(alternatesFor('/turtles')).toEqual([
			{ hreflang: 'zh-Hant-TW', href: 'https://www.khun-sin.com/turtles' },
			{ hreflang: 'en', href: 'https://www.khun-sin.com/en/turtles' },
			{ hreflang: 'x-default', href: 'https://www.khun-sin.com/en/turtles' }
		]);
	});

	it('resolves the current turtle route for navigation, including trailing slashes', () => {
		expect(routePathFor('/turtles')).toBe('/turtles');
		expect(routePathFor('/en/turtles/')).toBe('/en/turtles');
	});
});
