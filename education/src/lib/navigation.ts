import type { Locale } from '$lib/copy';
import { entryFor, type RoutePath } from './seo/routes.ts';

export type SpeciesScope = 'cetaceans' | 'sea-turtles';
export const speciesScopes: SpeciesScope[] = ['cetaceans', 'sea-turtles'];
export type SpeciesTool = 'data' | 'map';
const paths = {
	zh: {
		cetaceans: {
			overview: '/cetaceans',
			data: '/cetaceans/stranding-data',
			map: '/cetaceans/stranding-map'
		},
		'sea-turtles': {
			overview: '/sea-turtles',
			data: '/sea-turtles/stranding-data',
			map: '/sea-turtles/stranding-map'
		}
	},
	en: {
		cetaceans: {
			overview: '/en/cetaceans',
			data: '/en/cetaceans/stranding-data',
			map: '/en/cetaceans/stranding-map'
		},
		'sea-turtles': {
			overview: '/en/sea-turtles',
			data: '/en/sea-turtles/stranding-data',
			map: '/en/sea-turtles/stranding-map'
		}
	}
} satisfies Record<Locale, Record<SpeciesScope, Record<'overview' | SpeciesTool, RoutePath>>>;
export const speciesLinks = (locale: Locale, scope: SpeciesScope) => ({
	overview: paths[locale][scope].overview,
	data: { path: paths[locale][scope].data, hash: '' },
	map: { path: paths[locale][scope].map, hash: '' }
});
export function speciesToolFor(path: RoutePath) {
	const locale = entryFor(path).locale;
	for (const scope of speciesScopes) {
		const links = speciesLinks(locale, scope);
		for (const tool of ['data', 'map'] satisfies SpeciesTool[]) {
			if (links[tool].path === path) return { scope, tool };
		}
	}
	return undefined;
}
export function speciesToolCopy(locale: Locale, scope: SpeciesScope, tool: SpeciesTool) {
	const en = locale === 'en';
	const animal = scope === 'cetaceans' ? (en ? 'Cetacean' : '鯨豚') : en ? 'Sea turtle' : '海龜';
	return {
		title: en
			? `${animal} stranding ${tool}`
			: `${animal}擱淺${tool === 'data' ? '統計' : '分布地圖'}`,
		description:
			tool === 'map'
				? en
					? `Explore 2025 county-level ${animal.toLowerCase()} stranding records in Taiwan. Recorded locations do not represent wild population distribution.`
					: `查看台灣 2025 年各縣市${animal}擱淺通報分布。紀錄位置不代表野外族群分布。`
				: en
					? `Read Taiwan’s ${animal.toLowerCase()} stranding trends for 2019–2025, 2025 breakdowns and official data sources.`
					: `查看台灣${animal} 2019–2025 年擱淺趨勢、2025 年分類統計與官方資料來源。`
	};
}
export function alternateHash(path: RoutePath, hash: string): string {
	if (/\/(data|map)$/.test(path) && speciesScopes.some((scope) => hash === `#${scope}`))
		return hash;
	if (
		path.endsWith('/sousa-chinensis-taiwanensis') &&
		['#monitoring', '#sources-title'].includes(hash)
	)
		return hash;
	return '';
}
export const alternateLink = (path: RoutePath, hash: string) => ({
	path: entryFor(path).alternate,
	hash: alternateHash(path, hash)
});
