export type ThemeMode = 'auto' | 'light' | 'dark';

export function parseTheme(value: unknown): ThemeMode {
	return value === 'light' || value === 'dark' ? value : 'auto';
}
