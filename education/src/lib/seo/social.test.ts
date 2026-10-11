import { describe, expect, it } from 'vitest';
import { socialImage } from './social';

describe('socialImage', () => {
	it('uses stable public URLs that survive application redeploys', () => {
		expect(socialImage('zh')).toBe('https://www.khun-sin.com/og/og-image-zh.jpg');
		expect(socialImage('en')).toBe('https://www.khun-sin.com/og/og-image-en.jpg');
	});
});
