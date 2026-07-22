/**
 * Cetacean stranding statistics — the single source of truth for every number
 * rendered on the site (spec P0-3: no numeric literal from the MARN reports
 * may appear in a component; derived stats are computed, never stored).
 *
 * Source: Ocean Conservation Administration "海保救援網 (MARN)" annual
 * stranding reports 2019–2025 and the 2026 Q1 report.
 *
 * Period-keyed schema: annual entries omit `quarter`; quarterly snapshots set
 * it. Backfilling a new report (annual or quarterly) is purely additive.
 */

export interface Period {
	year: number;
	/** Absent = full-year report. */
	quarter?: 1 | 2 | 3 | 4;
}

export interface StrandingTotals {
	period: Period;
	dead: number;
	live: number;
	/** Number of species recorded in the period, when the report states it. */
	speciesCount?: number;
}

export const totals: StrandingTotals[] = [
	{ period: { year: 2019 }, dead: 132, live: 18 },
	{ period: { year: 2020 }, dead: 143, live: 18 },
	{ period: { year: 2021 }, dead: 133, live: 11 },
	{ period: { year: 2022 }, dead: 119, live: 25 },
	{ period: { year: 2023 }, dead: 141, live: 17 },
	{ period: { year: 2024 }, dead: 135, live: 24 },
	{ period: { year: 2025 }, dead: 121, live: 7, speciesCount: 21 },
	{ period: { year: 2026, quarter: 1 }, dead: 58, live: 7, speciesCount: 13 }
];

export interface SpeciesCount {
	name: string;
	/** English label for the /en mirror. */
	nameEn: string;
	count: number;
	/** Story emphasis (amber channel): e.g. 露脊鼠海豚 share trend, 中華白海豚. */
	emphasis?: boolean;
}

export interface CountyCount {
	name: string;
	/** English label for the /en mirror. */
	nameEn: string;
	count: number;
	/** Lienchiang / Kinmen / Penghu — the hotspot story. */
	offshoreIsland: boolean;
}

export interface MonthCount {
	/** 1–12 */
	month: number;
	count: number;
}

export interface CauseCount {
	name: string;
	/** English label for the /en mirror. */
	nameEn: string;
	count: number;
	emphasis?: boolean;
}

export interface PeriodBreakdown {
	period: Period;
	species?: SpeciesCount[];
	counties?: CountyCount[];
	months?: MonthCount[];
	causes?: CauseCount[];
}

export const breakdowns: PeriodBreakdown[] = [
	{
		period: { year: 2025 },
		species: [
			{ name: '露脊鼠海豚', nameEn: 'Finless porpoise', count: 58, emphasis: true },
			{ name: '印太瓶鼻海豚', nameEn: 'Indo-Pacific bottlenose', count: 14 },
			{ name: '熱帶斑海豚', nameEn: 'Pantropical spotted dolphin', count: 8 },
			{ name: '弗氏海豚', nameEn: 'Fraser’s dolphin', count: 8 },
			{ name: '瓶鼻海豚', nameEn: 'Common bottlenose', count: 8 },
			{ name: '小抹香鯨', nameEn: 'Pygmy sperm whale', count: 4 },
			{ name: '中華白海豚', nameEn: 'Chinese white dolphin', count: 3, emphasis: true },
			{ name: '飛旋海豚', nameEn: 'Spinner dolphin', count: 3 },
			{ name: '柯氏喙鯨', nameEn: 'Cuvier’s beaked whale', count: 3 },
			{ name: '其他 12 種', nameEn: '12 other species', count: 19 }
		],
		counties: [
			{ name: '連江縣', nameEn: 'Lienchiang', count: 26, offshoreIsland: true },
			{ name: '金門縣', nameEn: 'Kinmen', count: 24, offshoreIsland: true },
			{ name: '澎湖縣', nameEn: 'Penghu', count: 15, offshoreIsland: true },
			{ name: '宜蘭縣', nameEn: 'Yilan', count: 14, offshoreIsland: false },
			{ name: '新北市', nameEn: 'New Taipei', count: 9, offshoreIsland: false },
			{ name: '桃園市', nameEn: 'Taoyuan', count: 7, offshoreIsland: false },
			{ name: '苗栗縣', nameEn: 'Miaoli', count: 7, offshoreIsland: false },
			{ name: '高雄市', nameEn: 'Kaohsiung', count: 6, offshoreIsland: false },
			{ name: '花蓮縣', nameEn: 'Hualien', count: 4, offshoreIsland: false },
			{ name: '台東縣', nameEn: 'Taitung', count: 3, offshoreIsland: false },
			{ name: '彰化縣', nameEn: 'Changhua', count: 3, offshoreIsland: false },
			{ name: '台南市', nameEn: 'Tainan', count: 3, offshoreIsland: false },
			{ name: '屏東縣', nameEn: 'Pingtung', count: 3, offshoreIsland: false },
			{ name: '新竹市', nameEn: 'Hsinchu', count: 2, offshoreIsland: false },
			{ name: '基隆市', nameEn: 'Keelung', count: 2, offshoreIsland: false }
		],
		months: [
			{ month: 1, count: 14 },
			{ month: 2, count: 20 },
			{ month: 3, count: 15 },
			{ month: 4, count: 18 },
			{ month: 5, count: 9 },
			{ month: 6, count: 3 },
			{ month: 7, count: 6 },
			{ month: 8, count: 9 },
			{ month: 9, count: 4 },
			{ month: 10, count: 6 },
			{ month: 11, count: 5 },
			{ month: 12, count: 19 }
		],
		causes: [
			{ name: '大體腐敗，無法判定', nameEn: 'Too decomposed to determine', count: 89 },
			{
				name: '疑似人類活動（混獲、撞擊）',
				nameEn: 'Suspected human activity (bycatch, strikes)',
				count: 19,
				emphasis: true
			},
			{ name: '疾病或出生後即死亡', nameEn: 'Disease or neonatal death', count: 12 },
			{ name: '與母體分離', nameEn: 'Separated from mother', count: 4 },
			{ name: '其他', nameEn: 'Other', count: 4 }
		]
	}
];

/** 2025 white dolphin conservation program figures (MARN annual report). */
export const whiteDolphinProgram2025 = {
	catalogued: 74, // individuals in the photo-ID catalogue (cumulative)
	sampled: 62, // individuals scientifically sampled in 2025
	sightingGroups: 119, // cumulative at-sea sighting groups
	pathologyCases: 21 // necropsy/pathology analyses in 2025
};

/* ---------- Derived helpers (pure — unit-test targets for #11) ---------- */

export const totalOf = (t: StrandingTotals): number => t.dead + t.live;

export const liveRate = (t: StrandingTotals): number => t.live / totalOf(t);

export const isAnnual = (p: Period): boolean => p.quarter === undefined;

/** Annual series in year order — the 7-year trend chart input. */
export const annualTotals = (): StrandingTotals[] =>
	totals.filter((t) => isAnnual(t.period)).sort((a, b) => a.period.year - b.period.year);

export const findTotals = (year: number, quarter?: 1 | 2 | 3 | 4): StrandingTotals | undefined =>
	totals.find((t) => t.period.year === year && t.period.quarter === quarter);

export const findBreakdown = (year: number, quarter?: 1 | 2 | 3 | 4): PeriodBreakdown | undefined =>
	breakdowns.find((b) => b.period.year === year && b.period.quarter === quarter);

/** Share of a species/cause within its period's grand total. */
export const shareOf = (count: number, grandTotal: number): number => count / grandTotal;

/** Combined count share of offshore-island counties (the 51% story). */
export const offshoreShare = (counties: CountyCount[]): number => {
	const all = counties.reduce((s, c) => s + c.count, 0);
	const offshore = counties.filter((c) => c.offshoreIsland).reduce((s, c) => s + c.count, 0);
	return offshore / all;
};

/** Winter months (Dec–Feb) — derived, not stored. */
export const isWinterMonth = (month: number): boolean => month === 12 || month <= 2;
