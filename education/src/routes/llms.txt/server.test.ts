import { describe, expect, it } from 'vitest';
import { GET } from './+server';

describe('GET /llms.txt', () => {
	it('lets browsers and agents reuse the generated file without revalidation', async () => {
		const response = await GET();

		expect(response.headers.get('cache-control')).toBe(
			'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800'
		);
	});
});
