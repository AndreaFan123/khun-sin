import { describe, expect, it } from 'vitest';
import { socialImage } from './social';

describe('socialImage', () => {
	it('uses versioned public URLs to refresh cached social previews', () => {
		expect(socialImage('zh')).toBe('https://www.khun-sin.com/og/og-report-zh-v2.webp');
		expect(socialImage('en')).toBe('https://www.khun-sin.com/og/og-report-en-v2.webp');
	});
});
