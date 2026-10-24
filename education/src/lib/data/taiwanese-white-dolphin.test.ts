import { describe, expect, it } from 'vitest';
import {
	taiwaneseWhiteDolphinContentEn,
	taiwaneseWhiteDolphinContentZh
} from './taiwanese-white-dolphin';

describe('Taiwanese white dolphin evidence content', () => {
	it.each([
		['zh', taiwaneseWhiteDolphinContentZh],
		['en', taiwaneseWhiteDolphinContentEn]
	] as const)('keeps every %s claim connected to a published source', (_locale, content) => {
		const sourceIds = new Set(content.sources.map((source) => source.id));

		expect(sourceIds.size).toBe(content.sources.length);
		expect(content.claims.length).toBeGreaterThanOrEqual(4);
		for (const evidenceItem of [...content.metrics, ...content.claims]) {
			expect(evidenceItem.sourceIds.length).toBeGreaterThan(0);
			expect(evidenceItem.sourceIds.every((sourceId) => sourceIds.has(sourceId))).toBe(true);
		}
	});

	it.each([taiwaneseWhiteDolphinContentZh, taiwaneseWhiteDolphinContentEn])(
		'distinguishes confirmed, disputed, and unverified reporting',
		(content) => {
			expect(new Set(content.claims.map((claim) => claim.status))).toEqual(
				new Set(['confirmed', 'disputed', 'unverified'])
			);
		}
	);

	it('does not turn the historical 74 and current 48 estimates into a direct decline claim', () => {
		expect(taiwaneseWhiteDolphinContentZh.caution).toContain('不能直接相減');
		expect(taiwaneseWhiteDolphinContentEn.caution).toContain('not directly comparable');
	});

	it('presents the 2025 monitoring as identified individuals, not a new population estimate', () => {
		const zhMetric = taiwaneseWhiteDolphinContentZh.metrics[0];
		const enMetric = taiwaneseWhiteDolphinContentEn.metrics[0];

		expect(zhMetric.label).toContain('最新可查完整族群估算');
		expect(zhMetric.note).toContain('2025 年監測辨識出 30 隻個體');
		expect(zhMetric.note).toContain('新增 4 隻幼豚');
		expect(zhMetric.note).toContain('尚未公布新版族群總量估算');
		expect(enMetric.label).toContain('Latest available full population estimate');
		expect(enMetric.note).toContain('identified 30 individuals');
		expect(enMetric.note).toContain('four newly catalogued calves');
		expect(enMetric.note).toContain('no updated total population estimate');
		for (const metric of [zhMetric, enMetric]) {
			expect(metric.sourceIds).toContain('oca-monitoring-2025');
		}
	});

	it.each([taiwaneseWhiteDolphinContentZh, taiwaneseWhiteDolphinContentEn])(
		'keeps the hero image connected to its official source and reuse license',
		(content) => {
			expect(content.hero.image.src).toContain('taiwanese-white-dolphin-oca');
			expect(content.hero.image.sourceUrl).toContain('id=368');
			expect(content.hero.image.licenseUrl).toContain('id=60');
			expect(content.hero.image.credit).toBeTruthy();
			expect(content.hero.image.modificationNote).toBeTruthy();
		}
	);
});
