/**
 * Sea turtle stranding statistics used by the shared data and map pages.
 *
 * Annual totals: Ocean Conservation Administration official statistical
 * tables, 2019–2025. The 2025 county and species rows come from the same
 * official annual table; cause rows come from the 2025 MARN annual report.
 */

import type { CauseRow, CountyRow, SpeciesRow, TrendRow } from '$lib/data/strandings';

export interface TurtleAnnualTotal {
	year: number;
	dead: number;
	live: number;
}

export const turtleTotals: TurtleAnnualTotal[] = [
	{ year: 2019, dead: 207, live: 62 },
	{ year: 2020, dead: 276, live: 59 },
	{ year: 2021, dead: 289, live: 70 },
	{ year: 2022, dead: 240, live: 75 },
	{ year: 2023, dead: 248, live: 73 },
	{ year: 2024, dead: 237, live: 88 },
	{ year: 2025, dead: 197, live: 133 }
];

const counties2025: CountyRow[] = [
	{
		name: '宜蘭縣',
		nameEn: 'Yilan',
		count: 76,
		share: 76 / 330,
		offshoreIsland: false,
		emphasis: true
	},
	{
		name: '澎湖縣',
		nameEn: 'Penghu',
		count: 58,
		share: 58 / 330,
		offshoreIsland: true,
		emphasis: true
	},
	{
		name: '臺東縣',
		nameEn: 'Taitung',
		count: 57,
		share: 57 / 330,
		offshoreIsland: false,
		emphasis: true
	},
	{
		name: '新北市',
		nameEn: 'New Taipei',
		count: 39,
		share: 39 / 330,
		offshoreIsland: false,
		emphasis: false
	},
	{
		name: '屏東縣',
		nameEn: 'Pingtung',
		count: 39,
		share: 39 / 330,
		offshoreIsland: false,
		emphasis: false
	},
	{
		name: '苗栗縣',
		nameEn: 'Miaoli',
		count: 17,
		share: 17 / 330,
		offshoreIsland: false,
		emphasis: false
	},
	{
		name: '高雄市',
		nameEn: 'Kaohsiung',
		count: 11,
		share: 11 / 330,
		offshoreIsland: false,
		emphasis: false
	},
	{
		name: '基隆市',
		nameEn: 'Keelung',
		count: 10,
		share: 10 / 330,
		offshoreIsland: false,
		emphasis: false
	},
	{
		name: '花蓮縣',
		nameEn: 'Hualien',
		count: 7,
		share: 7 / 330,
		offshoreIsland: false,
		emphasis: false
	},
	{
		name: '桃園市',
		nameEn: 'Taoyuan',
		count: 5,
		share: 5 / 330,
		offshoreIsland: false,
		emphasis: false
	},
	{
		name: '臺南市',
		nameEn: 'Tainan',
		count: 5,
		share: 5 / 330,
		offshoreIsland: false,
		emphasis: false
	},
	{
		name: '新竹市',
		nameEn: 'Hsinchu City',
		count: 2,
		share: 2 / 330,
		offshoreIsland: false,
		emphasis: false
	},
	{
		name: '金門縣',
		nameEn: 'Kinmen',
		count: 2,
		share: 2 / 330,
		offshoreIsland: true,
		emphasis: false
	},
	{
		name: '臺中市',
		nameEn: 'Taichung',
		count: 1,
		share: 1 / 330,
		offshoreIsland: false,
		emphasis: false
	},
	{
		name: '彰化縣',
		nameEn: 'Changhua',
		count: 1,
		share: 1 / 330,
		offshoreIsland: false,
		emphasis: false
	}
];

const species2025: SpeciesRow[] = [
	{ name: '綠蠵龜', nameEn: 'Green sea turtle', count: 259, share: 259 / 330, emphasis: true },
	{ name: '欖蠵龜', nameEn: 'Olive ridley', count: 39, share: 39 / 330, emphasis: false },
	{ name: '玳瑁', nameEn: 'Hawksbill', count: 27, share: 27 / 330, emphasis: false },
	{ name: '赤蠵龜', nameEn: 'Loggerhead', count: 5, share: 5 / 330, emphasis: false }
];

const causes2025: CauseRow[] = [
	{ name: '岸際擱淺', nameEn: 'Shore stranding', count: 196, share: 196 / 330, emphasis: false },
	{ name: '混獲', nameEn: 'Fisheries bycatch', count: 90, share: 90 / 330, emphasis: true },
	{ name: '漂流', nameEn: 'Found drifting', count: 34, share: 34 / 330, emphasis: false },
	{ name: '其他', nameEn: 'Other', count: 8, share: 8 / 330, emphasis: false },
	{
		name: '廢棄魚網纏繞',
		nameEn: 'Derelict-net entanglement',
		count: 2,
		share: 2 / 330,
		emphasis: true
	}
];

export const turtleTrendRows = (): TrendRow[] => turtleTotals.map((row) => ({ ...row }));
export const turtleCountyRows = (): CountyRow[] => counties2025.map((row) => ({ ...row }));
export const turtleSpeciesRows = (): SpeciesRow[] => species2025.map((row) => ({ ...row }));
export const turtleCauseRows = (): CauseRow[] => causes2025.map((row) => ({ ...row }));
