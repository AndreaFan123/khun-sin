import { describe, expect, it } from 'vitest';
import config from '../../../vercel.json';

describe('Vercel SEO asset delivery', () => {
	it('caches llms.txt at the edge instead of revalidating on every agent request', () => {
		const llms = config.headers?.find((rule) => rule.source === '/llms.txt');
		expect(llms?.headers).toContainEqual({
			key: 'Cache-Control',
			value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800'
		});
	});
});
