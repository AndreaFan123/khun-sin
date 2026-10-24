import { describe, expect, it } from 'vitest';
import { parseTheme } from './theme';

describe('theme preference', () => {
	it('retains explicit choices and the system default', () => {
		for (const choice of ['auto', 'light', 'dark']) expect(parseTheme(choice)).toBe(choice);
	});
	it('falls back to the device for missing or invalid stored values', () => {
		for (const value of [null, undefined, '', 'sepia', {}, 1])
			expect(parseTheme(value)).toBe('auto');
	});
});
