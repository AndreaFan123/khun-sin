import heroImage from '$lib/assets/taiwanese-white-dolphin-oca.jpg';

export type EvidenceStatus = 'confirmed' | 'disputed' | 'unverified';

export interface SpeciesHeroImage {
	src: string;
	sourceLabel: string;
	credit: string;
	sourceUrl: string;
	licenseLabel: string;
	licenseUrl: string;
	modificationNote: string;
}

export interface EvidenceSource {
	id: string;
	title: string;
	publisher: string;
	date: string;
	url: string;
}

export interface EvidenceClaim {
	status: EvidenceStatus;
	label: string;
	title: string;
	body: string;
	sourceIds: string[];
}

export interface TaiwaneseWhiteDolphinContent {
	hero: {
		title: string;
		description: string;
		eyebrow: string;
		scientificName: string;
		statusTitle: string;
		statusBody: string;
		backLabel: string;
		image: SpeciesHeroImage;
	};
	metrics: Array<{
		value: string;
		label: string;
		note: string;
		sourceIds: string[];
	}>;
	issueEyebrow: string;
	issueTitle: string;
	issueLead: string;
	claims: EvidenceClaim[];
	cautionTitle: string;
	caution: string;
	sourcesTitle: string;
	sourceLabel: string;
	reviewedLabel: string;
	sources: EvidenceSource[];
}

const sourceUrls = {
	ocaMonitoring:
		'https://www.oca.gov.tw/ch/home.jsp?dataserno=202501080002&id=654&mcustomize=research_view.jsp&parentpath=0%2C299%2C652',
	ocaMonitoring2025:
		'https://www.oca.gov.tw/ch/home.jsp?dataserno=202603100002&id=14&mcustomize=news_view.jsp&parentpath=0%2C2',
	ocaPortal: 'https://www.oca.gov.tw/ch/home.jsp?id=368&parentpath=0%2C296%2C360',
	ocaResponse:
		'https://www.oca.gov.tw/ch/home.jsp?dataserno=202606160003&id=441&mcustomize=news_view.jsp&parentpath=0%2C300%2C432',
	motcResponse:
		'https://www.motc.gov.tw/ch/app/news_list/view?id=14&module=news&serno=87bd7df3-6217-496a-a1cd-6f5c20f2f20d',
	moiSoil: 'https://www.moi.gov.tw/News_Content.aspx?n=4&s=339949&sms=9009',
	moenvRules: 'https://enews.moenv.gov.tw/moenv-news/zh-tw/News/1856',
	noaaReview:
		'https://www.fisheries.noaa.gov/resource/document/taiwanese-humpback-dolphin-5-year-review',
	eInfo: 'https://www.e-info.org.tw/node/243808'
} as const;

export const taiwaneseWhiteDolphinContentZh: TaiwaneseWhiteDolphinContent = {
	hero: {
		title: '台灣白海豚',
		description: '台灣白海豚的族群現況、台中港填海爭議與可核對的保育證據。',
		eyebrow: '台灣特有亞種｜極度瀕危',
		scientificName: 'Sousa chinensis taiwanensis',
		statusTitle: '不到 50 隻的族群，正面對棲地工程爭議',
		statusBody:
			'官方 2023–2024 年調查以標放重捕法估算約 48 隻。台中港南填方區已開始收受營建剩餘土石方，但工程是否能以「既有港區防波堤內」免辦環評，以及是否充分檢視重要棲息環境影響，目前仍有爭議。',
		backLabel: '返回認識鯨豚',
		image: {
			src: heroImage,
			sourceLabel: '圖片來源：',
			credit: '海洋委員會海洋保育署',
			sourceUrl: sourceUrls.ocaPortal,
			licenseLabel: '政府資料開放授權條款第 1 版',
			licenseUrl: 'https://www.oca.gov.tw/ch/home.jsp?id=60&parentpath=0%2C9',
			modificationNote: '圖片經裁切及明暗調整'
		}
	},
	metrics: [
		{
			value: '約 48 隻',
			label: '最新可查完整族群估算',
			note: '2025 年監測辨識出 30 隻個體，並新增 4 隻幼豚至個體名錄；官方尚未公布新版族群總量估算。',
			sourceIds: ['oca-monitoring', 'oca-monitoring-2025']
		},
		{
			value: '763 km²',
			label: '重要棲息環境面積',
			note: '範圍跨苗栗、台中、彰化與雲林沿海。',
			sourceIds: ['oca-portal']
		},
		{
			value: '極度瀕危',
			label: 'IUCN 評估等級',
			note: '美國 NOAA 2024 年五年檢視亦維持瀕危物種法的 Endangered 分類。',
			sourceIds: ['noaa-review']
		}
	],
	issueEyebrow: '證據核對｜2026 年 10 月更新',
	issueTitle: '台中港填海爭議，現在可以確定什麼？',
	issueLead:
		'環境資訊中心報導揭露的核心疑問值得關注，但新聞中的每一項主張並非都已由獨立或官方資料證實。以下把現階段證據分開呈現。',
	claims: [
		{
			status: 'confirmed',
			label: '已確認',
			title: '南填方區工程存在，並已開始收受土方',
			body: '內政部表示台中港自 2026 年 7 月 25 日開始收受營建剩餘土石方，規劃容量約 1,400 萬立方公尺。交通部也確認南填方區（三）與（四）工程持續推進。',
			sourceIds: ['moi-soil', 'motc-response']
		},
		{
			status: 'confirmed',
			label: '已確認',
			title: '政府做的是環評適用性認定，不是完成實質環評',
			body: '交通部稱工程位於既有港區防波堤與防護設施內，已完成「應否實施環評」認定。環境部規則則顯示，一般填海造地原則上應環評，但既有港區防波堤內有例外。',
			sourceIds: ['motc-response', 'moenv-rules']
		},
		{
			status: 'disputed',
			label: '仍有爭議',
			title: '「既有防波堤內」是否足以免除環評與棲地審查',
			body: '港務公司主張工程符合例外；環保團體則質疑填築範圍與白海豚利用水域重疊，且既有開發的認定不應取代重要棲息環境影響檢視。目前找到的官方資料呈現政府立場，尚未看到獨立裁判或完整公開資料終結這項爭議。',
			sourceIds: ['motc-response', 'oca-response', 'e-info']
		},
		{
			status: 'unverified',
			label: '證據不足',
			title: '「60 公頃實際利用水域」與焚化底渣是否納入本案',
			body: '報導引述團體提出約 60 公頃水域及底渣使用的說法，但目前查到的本案官方回應未提供足以獨立核對的空間分析，也未明確確認本工程已使用焚化底渣。這兩項不宜寫成已證實事實。',
			sourceIds: ['e-info', 'motc-response']
		}
	],
	cautionTitle: '數字怎麼讀',
	caution:
		'2010 年的 74 隻與 2023–2024 年的約 48 隻來自不同期間與估算條件，不能直接相減後宣稱族群減少 26 隻。可以確定的是族群非常小，且官方與國際評估都認為需要立即、持續的保育行動。',
	sourcesTitle: '核對來源',
	sourceLabel: '開啟原始資料',
	reviewedLabel: '資料檢視日期：2026 年 10 月 23 日',
	sources: [
		{
			id: 'oca-monitoring',
			title: '112–113 年臺灣白海豚族群生態監測結果',
			publisher: '海洋保育署',
			date: '2025-01-08',
			url: sourceUrls.ocaMonitoring
		},
		{
			id: 'oca-monitoring-2025',
			title: '白海豚 114 年度監測成果：新增 4 隻幼豚納入個體名錄',
			publisher: '海洋保育署',
			date: '2026-03-10',
			url: sourceUrls.ocaMonitoring2025
		},
		{
			id: 'oca-portal',
			title: '臺灣白海豚保育專區',
			publisher: '海洋保育署',
			date: '持續更新',
			url: sourceUrls.ocaPortal
		},
		{
			id: 'oca-response',
			title: '海保署回應臺灣白海豚保育訴求',
			publisher: '海洋保育署',
			date: '2026-06-16',
			url: sourceUrls.ocaResponse
		},
		{
			id: 'motc-response',
			title: '臺中港南填方區工程說明',
			publisher: '交通部／臺灣港務公司',
			date: '2026-08-27',
			url: sourceUrls.motcResponse
		},
		{
			id: 'moi-soil',
			title: '臺中港收受營建剩餘土石方說明',
			publisher: '內政部國土管理署',
			date: '2026-08-03',
			url: sourceUrls.moiSoil
		},
		{
			id: 'moenv-rules',
			title: '港區填海造地與再生粒料環評規範說明',
			publisher: '環境部',
			date: '2026-03-19',
			url: sourceUrls.moenvRules
		},
		{
			id: 'noaa-review',
			title: 'Taiwanese Humpback Dolphin 5-Year Review',
			publisher: 'NOAA Fisheries',
			date: '2024',
			url: sourceUrls.noaaReview
		},
		{
			id: 'e-info',
			title: '台中港填海工程與白海豚棲地爭議報導',
			publisher: '環境資訊中心',
			date: '2026-08-26',
			url: sourceUrls.eInfo
		}
	]
};

export const taiwaneseWhiteDolphinContentEn: TaiwaneseWhiteDolphinContent = {
	hero: {
		title: 'Taiwanese white dolphin',
		description:
			'Evidence on the Taiwanese white dolphin population, the Taichung Port reclamation dispute, and conservation priorities.',
		eyebrow: 'Endemic subspecies of Taiwan | Critically Endangered',
		scientificName: 'Sousa chinensis taiwanensis',
		statusTitle: 'A population of about 48 faces a new habitat dispute',
		statusBody:
			'Taiwan’s 2023–2024 monitoring estimated about 48 dolphins using mark-recapture methods. Taichung Port has begun accepting construction surplus soil, while the project’s exemption from environmental impact assessment and its treatment of important habitat remain disputed.',
		backLabel: 'Back to cetaceans',
		image: {
			src: heroImage,
			sourceLabel: 'Image:',
			credit: 'Ocean Conservation Administration, Taiwan',
			sourceUrl: sourceUrls.ocaPortal,
			licenseLabel: 'Open Government Data License, version 1.0',
			licenseUrl: 'https://www.oca.gov.tw/ch/home.jsp?id=60&parentpath=0%2C9',
			modificationNote: 'Cropped and tonal values adjusted'
		}
	},
	metrics: [
		{
			value: 'About 48',
			label: 'Latest available full population estimate',
			note: '2025 monitoring identified 30 individuals and added four newly catalogued calves. OCA published no updated total population estimate.',
			sourceIds: ['oca-monitoring', 'oca-monitoring-2025']
		},
		{
			value: '763 km²',
			label: 'Designated important habitat',
			note: 'The area spans the coastal waters of Miaoli, Taichung, Changhua, and Yunlin.',
			sourceIds: ['oca-portal']
		},
		{
			value: 'Critically Endangered',
			label: 'IUCN assessment',
			note: 'NOAA’s 2024 five-year review also retained its Endangered status under the U.S. ESA.',
			sourceIds: ['noaa-review']
		}
	],
	issueEyebrow: 'Evidence check | Updated October 2026',
	issueTitle: 'What is established about the Taichung Port dispute?',
	issueLead:
		'The concerns reported by the Environmental Information Center warrant attention, but not every claim has independent or official confirmation. The evidence currently supports the following distinctions.',
	claims: [
		{
			status: 'confirmed',
			label: 'Confirmed',
			title: 'The reclamation project is active and has begun receiving soil',
			body: 'Taiwan’s Ministry of the Interior says Taichung Port began accepting construction surplus soil on 25 July 2026, with planned capacity of about 14 million cubic metres. The transport authorities also confirm continued work on South Reclamation Areas III and IV.',
			sourceIds: ['moi-soil', 'motc-response']
		},
		{
			status: 'confirmed',
			label: 'Confirmed',
			title: 'Authorities determined EIA applicability; they did not complete a substantive EIA',
			body: 'Transport authorities say the project is inside existing port protective structures and completed an EIA applicability determination. Environment Ministry rules generally require an EIA for marine reclamation, with an exception inside an existing port breakwater.',
			sourceIds: ['motc-response', 'moenv-rules']
		},
		{
			status: 'disputed',
			label: 'Disputed',
			title: 'Whether the existing-breakwater exception settles the habitat question',
			body: 'The port authority relies on the exception. Conservation groups argue that the footprint overlaps waters used by the dolphins and that treating it as existing development should not replace an important-habitat review. The official records found state government positions but do not independently resolve this dispute.',
			sourceIds: ['motc-response', 'oca-response', 'e-info']
		},
		{
			status: 'unverified',
			label: 'Not yet verified',
			title: 'The reported 60 hectares of used waters and project-specific bottom ash use',
			body: 'The article attributes these claims to conservation groups. The project-specific official responses found do not provide enough spatial analysis to verify the 60-hectare figure or clearly confirm that incinerator bottom ash has been used in this project.',
			sourceIds: ['e-info', 'motc-response']
		}
	],
	cautionTitle: 'How to read the population figures',
	caution:
		'The 2010 estimate of 74 and the 2023–2024 estimate of about 48 come from different periods and estimation conditions. They are not directly comparable evidence of a loss of 26 animals. What is clear is that the population is extremely small and both domestic and international assessments call for urgent, sustained conservation.',
	sourcesTitle: 'Sources checked',
	sourceLabel: 'Open original source',
	reviewedLabel: 'Sources reviewed: 23 October 2026',
	sources: [
		{
			id: 'oca-monitoring',
			title: '2023–2024 Taiwanese white dolphin population monitoring',
			publisher: 'Ocean Conservation Administration, Taiwan',
			date: '2025-01-08',
			url: sourceUrls.ocaMonitoring
		},
		{
			id: 'oca-monitoring-2025',
			title: '2025 monitoring results: four calves added to the individual catalogue',
			publisher: 'Ocean Conservation Administration, Taiwan',
			date: '2026-03-10',
			url: sourceUrls.ocaMonitoring2025
		},
		{
			id: 'oca-portal',
			title: 'Taiwanese white dolphin conservation portal',
			publisher: 'Ocean Conservation Administration, Taiwan',
			date: 'Ongoing',
			url: sourceUrls.ocaPortal
		},
		{
			id: 'oca-response',
			title: 'OCA response to Taiwanese white dolphin conservation concerns',
			publisher: 'Ocean Conservation Administration, Taiwan',
			date: '2026-06-16',
			url: sourceUrls.ocaResponse
		},
		{
			id: 'motc-response',
			title: 'Statement on Taichung Port south reclamation works',
			publisher: 'Ministry of Transportation / Taiwan International Ports Corporation',
			date: '2026-08-27',
			url: sourceUrls.motcResponse
		},
		{
			id: 'moi-soil',
			title: 'Statement on construction surplus soil received at Taichung Port',
			publisher: 'National Land Management Agency, Taiwan',
			date: '2026-08-03',
			url: sourceUrls.moiSoil
		},
		{
			id: 'moenv-rules',
			title: 'EIA rules for port reclamation and recycled aggregate',
			publisher: 'Ministry of Environment, Taiwan',
			date: '2026-03-19',
			url: sourceUrls.moenvRules
		},
		{
			id: 'noaa-review',
			title: 'Taiwanese Humpback Dolphin 5-Year Review',
			publisher: 'NOAA Fisheries',
			date: '2024',
			url: sourceUrls.noaaReview
		},
		{
			id: 'e-info',
			title: 'Report on the Taichung Port reclamation and dolphin habitat dispute',
			publisher: 'Environmental Information Center',
			date: '2026-08-26',
			url: sourceUrls.eInfo
		}
	]
};
