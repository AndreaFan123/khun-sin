import { describe, expect, it } from 'vitest';
import { speciesCards as englishSpeciesCards } from './site-en';
import { speciesCards as chineseSpeciesCards } from './site';

describe('finless porpoise species cards', () => {
	it('lists broad-ridged and narrow-ridged finless porpoises separately in Chinese', () => {
		expect(chineseSpeciesCards).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					name: '寬脊露脊鼠海豚',
					scientificName: 'Neophocaena phocaenoides'
				}),
				expect.objectContaining({
					name: '窄脊露脊鼠海豚',
					scientificName: 'Neophocaena asiaeorientalis'
				})
			])
		);
		expect(chineseSpeciesCards[1].description).toContain('印太江豚');
		expect(chineseSpeciesCards[1].description).toContain('印太洋露脊鼠海豚');
		expect(chineseSpeciesCards[2].description).toContain('東亞江豚');
		expect(chineseSpeciesCards[2].description).toContain('窄脊江豚');
		expect(chineseSpeciesCards.some((card) => card.scientificName.includes('spp.'))).toBe(false);
	});

	it('keeps the English mirror split into the same two species', () => {
		expect(englishSpeciesCards).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ scientificName: 'Neophocaena phocaenoides' }),
				expect.objectContaining({ scientificName: 'Neophocaena asiaeorientalis' })
			])
		);
		expect(englishSpeciesCards.some((card) => card.scientificName.includes('spp.'))).toBe(false);
	});
});

describe('bottlenose dolphin species cards', () => {
	it('lists common and Indo-Pacific bottlenose dolphins separately in Chinese', () => {
		expect(chineseSpeciesCards).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					name: '真瓶鼻海豚',
					scientificName: 'Tursiops truncatus'
				}),
				expect.objectContaining({
					name: '印太瓶鼻海豚',
					scientificName: 'Tursiops aduncus'
				})
			])
		);
		expect(chineseSpeciesCards.some((card) => card.name === '瓶鼻海豚')).toBe(false);
	});

	it('keeps the English mirror split into the same two species', () => {
		expect(englishSpeciesCards).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					name: 'Common bottlenose dolphin',
					scientificName: 'Tursiops truncatus'
				}),
				expect.objectContaining({
					name: 'Indo-Pacific bottlenose dolphin',
					scientificName: 'Tursiops aduncus'
				})
			])
		);
	});
});

describe('Risso’s dolphin species card', () => {
	it('uses the formal Chinese name and preserves names used by whale watching and fishers', () => {
		const card = chineseSpeciesCards.find(
			(species) => species.scientificName === 'Grampus griseus'
		);

		expect(card).toMatchObject({ name: '瑞氏海豚', scientificName: 'Grampus griseus' });
		expect(card?.description).toContain('花紋海豚');
		expect(card?.description).toContain('里氏海豚');
		expect(card?.description).toContain('大頭仔（tuā-thâu-á）');
		expect(card?.description).toContain('和尚鯃（huê-ê-siūnn-thâu）');
	});

	it('keeps the English mirror aligned to the same species', () => {
		expect(englishSpeciesCards).toContainEqual(
			expect.objectContaining({ name: 'Risso’s dolphin', scientificName: 'Grampus griseus' })
		);
	});
});

describe('whale species cards', () => {
	it('lists the two whale species recorded in the 2025 stranding summary in Chinese', () => {
		expect(chineseSpeciesCards).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					name: '小抹香鯨',
					scientificName: 'Kogia breviceps',
					imageKey: 'pygmySpermWhale'
				}),
				expect.objectContaining({
					name: '柯氏喙鯨',
					scientificName: 'Ziphius cavirostris',
					imageKey: 'cuviersBeakedWhale'
				})
			])
		);
	});

	it('keeps the English mirror aligned to the same whale species', () => {
		expect(englishSpeciesCards).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					name: 'Pygmy sperm whale',
					scientificName: 'Kogia breviceps',
					imageKey: 'pygmySpermWhale'
				}),
				expect.objectContaining({
					name: 'Cuvier’s beaked whale',
					scientificName: 'Ziphius cavirostris',
					imageKey: 'cuviersBeakedWhale'
				})
			])
		);
	});
});

describe('cetacean card images and Red List tags', () => {
	it('links only the Taiwanese white dolphin cards to their localized detail routes', () => {
		expect(chineseSpeciesCards).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					scientificName: 'Sousa chinensis taiwanensis',
					detailPath: '/cetaceans/sousa-chinensis-taiwanensis'
				})
			])
		);
		expect(englishSpeciesCards).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					scientificName: 'Sousa chinensis taiwanensis',
					detailPath: '/en/cetaceans/sousa-chinensis-taiwanensis'
				})
			])
		);
		expect(chineseSpeciesCards.filter((card) => card.detailPath)).toHaveLength(1);
		expect(englishSpeciesCards.filter((card) => card.detailPath)).toHaveLength(1);
	});

	it('assigns an image and accessible alternative text to every species', () => {
		for (const card of chineseSpeciesCards) {
			expect(card.imageKey).toBeTruthy();
			expect(card.imageAlt).toBeTruthy();
		}
	});

	it('uses the three supplied IUCN Red List levels in Chinese', () => {
		expect(chineseSpeciesCards).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					scientificName: 'Sousa chinensis taiwanensis',
					redList: { label: '極危', level: 'critically-endangered' }
				}),
				expect.objectContaining({
					scientificName: 'Neophocaena phocaenoides',
					redList: { label: '易危', level: 'vulnerable' }
				}),
				expect.objectContaining({
					scientificName: 'Tursiops aduncus',
					redList: { label: '近危', level: 'near-threatened' }
				})
			])
		);
	});

	it('mirrors the three supplied IUCN Red List levels in English', () => {
		expect(englishSpeciesCards).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					scientificName: 'Sousa chinensis taiwanensis',
					redList: { label: 'Critically Endangered', level: 'critically-endangered' }
				}),
				expect.objectContaining({
					scientificName: 'Neophocaena phocaenoides',
					redList: { label: 'Vulnerable', level: 'vulnerable' }
				}),
				expect.objectContaining({
					scientificName: 'Tursiops aduncus',
					redList: { label: 'Near Threatened', level: 'near-threatened' }
				})
			])
		);
	});
});
