/**
 * Structured site copy (spec P0-3): every repeated-structure block lives here
 * as data so sections just {#each} over it — and the future bilingual version
 * translates data files, not markup. Statistics stay in strandings.ts; prose
 * below may mention figures only as part of sourced narrative copy.
 */

export interface SpeciesCard {
	tag: string;
	tagKind: 'critical' | 'common' | 'info';
	name: string;
	scientificName: string;
	description: string;
}

export const speciesCards: SpeciesCard[] = [
	{
		tag: '極度瀕危 CR',
		tagKind: 'critical',
		name: '台灣白海豚',
		scientificName: 'Sousa chinensis taiwanensis',
		description:
			'只生活在台灣西部沿海的特有亞種，粉白身影被稱為「媽祖魚」。學者估計現存不到 50 隻，且族群每年約下滑 3–4%，是台灣最急迫的海洋保育對象。'
	},
	{
		tag: '離島常見',
		tagKind: 'common',
		name: '露脊鼠海豚',
		scientificName: 'Neophocaena spp.（江豚）',
		description:
			'沒有背鰭、體型嬌小的近岸鼠海豚，是金門、馬祖、澎湖海域的住民。牠也是 2025 年擱淺數量最多的物種，佔全年的 45%。'
	},
	{
		tag: '近海常見',
		tagKind: 'info',
		name: '瓶鼻海豚',
		scientificName: 'Tursiops truncatus',
		description:
			'最為人熟悉的海豚之一，聰明、群居、好奇心強。台灣海域有瓶鼻海豚與印太瓶鼻海豚兩種，是賞鯨常見的明星。'
	},
	{
		tag: '遠洋物種',
		tagKind: 'info',
		name: '花紋海豚',
		scientificName: 'Grampus griseus',
		description:
			'成體身上佈滿打鬥與社交留下的白色刮痕，像一幅海洋的地圖。花蓮外海是牠們常出沒的舞台，也是賞鯨的常客。'
	}
];

export interface Threat {
	title: string;
	description: string;
}

export const threats: Threat[] = [
	{
		title: '漁業混獲',
		description: '誤入漁網、定置網或被漁具纏繞，是近岸海豚最直接的威脅，往往導致溺斃或嚴重外傷。'
	},
	{
		title: '船隻撞擊',
		description: '繁忙的航道與高速船隻造成撞擊傷，傷口反覆感染，也干擾牠們的正常活動與繁殖。'
	},
	{
		title: '水下噪音',
		description:
			'打樁、聲納與船舶噪音會干擾仰賴聲音導航與溝通的鯨豚。研究顯示白海豚對噪音的反應範圍可達 60–70 公里。'
	},
	{
		title: '海洋廢棄物',
		description:
			'誤食塑膠與廢棄漁具造成消化道阻塞或穿孔。同一套救援網下的海龜，體內就常發現魚鉤與人造物。'
	},
	{
		title: '棲地破壞',
		description: '填海、開發與離岸工程壓縮近岸鯨豚的生存空間，白海豚的關鍵棲地尤其脆弱。'
	},
	{
		title: '陸源污染',
		description: '陸地的污水、化學物質順流入海，削弱鯨豚免疫力，讓牠們更容易生病。'
	}
];

export const landSurprise = {
	title: '你在陸地上的行為，也會影響海裡的鯨豚',
	body: '海洋與陸地從來不是兩個世界。研究發現，擱淺鯨豚體內有高比例的細菌與陸地下水道污水相符；甚至貓砂中的弓形蟲，都可能隨雨水入海、感染鯨豚。減少污染、妥善處理廢棄物，就是在守護遠方的海洋生命。'
};

export interface ReportStep {
	title: string;
	description: string;
}

export const reportSteps: ReportStep[] = [
	{
		title: '撥打 118',
		description: '向海巡署通報，啟動整個救援。請務必等後單位確認沒有問題後掛電話再掛'
	},
	{
		title: '說清楚「狀態」',
		description:
			'提供地點、時間、你的聯繫方式，並描述動物大小(可以展開雙臂，或者用腳掌大小評估)、是活體還是死亡(觀察呼吸孔有無收縮)、有無外傷——這決定要派多少人、開什麼車、帶什麼裝備。'
	},
	{
		title: '保持距離守候',
		description: '在專業人員抵達前，遠距離觀察、記錄與拍照，把最新狀況回報給救援團隊。'
	},
	{
		title: '交給專業團隊',
		description: 'MARN 行動小組到場後接手評估、處置或後送。辛苦了！你已完成最重要的第一步。'
	}
];

export const hotline = {
	number: '118',
	label: '海巡署 24 小時救援專線',
	description:
		'發現擱淺或受困的鯨豚、海龜，立即撥打 118。海巡署全年無休，會第一時間聯繫海保署、中華鯨豚協會以及合作的學術研究等專業團隊。',
	infoTitle: '就算無生命跡象，也請務必通報',
	infoDescription:
		'絕大多數擱淺鯨豚被發現時已經死亡——但這絕不代表牠們不重要。每一具遺體都承載著大量資訊：透過解剖、採樣與病理分析，研究人員能解讀死因、健康狀況，以及整片海洋環境的變化。光是 2025 年，就有 62 隻個體完成科學採樣、21 件病理分析。你的一通通報，可能就是解開一個科學謎題的鑰匙。'
};

export const doList: string[] = [
	'立即撥打 118 通報',
	'先評估現場安全：留意海水是否有油污、環境有無刺鼻氣味、動物體表是否佈滿不明生物，確保自身安全再靠近',
	'記錄並回報地點、時間、動物大小與狀態',
	'與動物保持安全距離，避免圍觀與喧嘩',
	'依專業人員的指導協助（如遮陽、保持皮膚濕潤）'
];

export const dontList: string[] = [
	'不要自行把活體海豚拖回或推回海裡——拖行會嚴重擦傷海豚脆弱的皮膚，也可能造成二次嗆水（2024 年就有 4 隻因此死亡）',
	'不要在未經指導下搬移、觸碰或拉扯動物',
	'不要餵食或往呼吸孔澆水',
	'不要因好奇而過度靠近，以免驚擾動物、也危及自身安全'
];

export const reportEvenIfDead = {
	title: '就算已經死亡，也請務必通報',
	body: '絕大多數擱淺鯨豚被發現時已經死亡——但這絕不代表牠們不重要。每一具遺體都承載著大量資訊：透過解剖、採樣與病理分析，研究人員能解讀死因、健康狀況，以及整片海洋環境的變化。光是 2025 年，就有 62 隻個體完成科學採樣、21 件病理分析。你的一通通報，可能就是解開一個科學謎題的鑰匙——請別因為「已經死了」而略過牠。'
};

export interface MarnNode {
	name: string;
	role: string;
}

export const marnNodes: MarnNode[] = [
	{ name: '海巡署', role: '118 通報入口 · 現場人力' },
	{ name: '海保署', role: '整合核心 · 全國資料' },
	{ name: '學術鯨豚中心', role: '專業處置 · 解剖研究' },
	{ name: '在地民間團體', role: '速度與現場支援' },
	{ name: '獸醫團隊', role: '醫療照護與評估' }
];

export const rescueStory = {
	eyebrow: '2026 年第一季 · 希望的故事',
	title: '屏東車城，11 隻小虎鯨的集體擱淺',
	body: '2026 年 2 月，11 隻小虎鯨在屏東車城海口漁港集體擱淺。當地救難協會、野放漁船與救援團隊集結超過 60 人力，以吊車與怪手逐一將牠們安全搬上漁船。醫療團隊現場抽血評估、確認狀態穩定後出海——最終成功野放 7 隻，是近年集體擱淺救援中野放數量最高的一次。',
	releasedCount: 7,
	statLabel: '隻小虎鯨成功重返大海'
};

export const collectiveStranding = {
	title: '為什麼會發生「集體」擱淺？',
	body: '許多海豚是高度群聚的社會性動物，夥伴之間的連結非常緊密。當一隻個體因傷病擱淺，其他同伴往往會循聲前來尋找、不願離去，結果整群一起受困——這正是集體擱淺的重要成因之一。也因此，救援時常需要同時穩定整群、評估後一起野放，就像這次 11 隻小虎鯨的行動一樣。'
};

export const noPerfectSolution = {
	title: '救援，沒有完美的解方',
	body: '現場往往沒有「最完美」的策略，只能依憑專業人員的即時評估，做出當下相對最好的選擇。有時，這意味著艱難的取捨——為了讓有限的救援量能發揮最大效益，團隊可能必須放下狀況已難以挽回的個體，把最多的資源與時間，投注在真正還有機會存活的生命上。這不是冷酷，而是在有限資源下對生命最負責任的判斷。理解並信任第一線人員的專業，也是我們守護鯨豚的一部分。'
};

export interface ConservationKpi {
	/** Key into strandings.whiteDolphinProgram2025 — the number stays in the data layer. */
	metric: 'catalogued' | 'sampled' | 'sightingGroups' | 'pathologyCases';
	unit: string;
	label: string;
}

export const conservationKpis: ConservationKpi[] = [
	{
		metric: 'catalogued',
		unit: '隻',
		label: '台灣白海豚個體辨識名錄累計數，為每隻粉紅精靈建檔追蹤'
	},
	{ metric: 'sampled', unit: '隻', label: '2025 年完成科學採樣的個體數，用於病理與死因分析' },
	{ metric: 'sightingGroups', unit: '群次', label: '白海豚海上調查累計目擊紀錄，支撐族群監測' },
	{ metric: 'pathologyCases', unit: '件', label: '2025 年病理解剖分析，把每次死亡轉化為保育知識' }
];

export interface ChartCardCopy {
	key: 'trend' | 'months' | 'counties' | 'causes' | 'species';
	title: string;
	subtitle: string;
	takeaway: string;
	legend: { label: string; colorVar: string }[];
}

export const chartCards: ChartCardCopy[] = [
	{
		key: 'trend',
		title: '近七年擱淺數量趨勢',
		subtitle: '2019–2025，依死亡與活體區分（單位：隻）',
		takeaway:
			'七年來擱淺數大致落在每年 128–161 隻之間，2025 年是相對低點；但更值得注意的是活體比例降到七年最低（僅 7 隻、5.5%）。總數起伏不必然反映族群變化，也可能來自通報涵蓋與環境因素，需長期追蹤才能解讀。',
		legend: [
			{ label: '死亡個體', colorVar: '--chart-muted' },
			{ label: '活體個體', colorVar: '--chart-emphasis' }
		]
	},
	{
		key: 'months',
		title: '擱淺的季節性',
		subtitle: '2025 年各月擱淺數量（單位：隻）',
		takeaway:
			'擱淺明顯集中在冬季與初春。東北季風強浪、水溫變化與洄游季節，都可能讓虛弱的個體更容易被沖上岸。',
		legend: [
			{ label: '冬季（12–2 月）', colorVar: '--chart-emphasis' },
			{ label: '其他月份', colorVar: '--chart-baseline' }
		]
	},
	{
		key: 'counties',
		title: '擱淺的縣市分布',
		subtitle: '2025 年各縣市擱淺數量（單位：隻）',
		takeaway:
			'連江、金門、澎湖三個離島縣市合計 65 隻，佔了全臺的 51%。離島近岸的江豚族群，是擱淺熱點中的熱點。',
		legend: [
			{ label: '離島縣市', colorVar: '--chart-emphasis' },
			{ label: '本島縣市', colorVar: '--chart-baseline' }
		]
	},
	{
		key: 'causes',
		title: '擱淺原因分析',
		subtitle: '2025 年 128 隻經檢查或解剖後的判定',
		takeaway:
			'高達 70% 因大體過度腐敗而無法判定死因，而且這個「無法判定」的比例逐年升高（2020 年約 56% → 2025 年 70%）——越晚被發現，越難查明真相，這正是及時通報與數位化的迫切之處。已確認與人類活動（混獲、撞擊）有關的有 15%，只是能被證實的冰山一角。',
		legend: [
			{ label: '疑似人類活動', colorVar: '--chart-emphasis' },
			{ label: '其他判定', colorVar: '--chart-baseline' }
		]
	},
	{
		key: 'species',
		title: '2025 年擱淺鯨豚物種分布',
		subtitle: '全年 21 種、共 128 隻。露脊鼠海豚一種就佔了近一半，反映離島近岸族群承受的壓力。',
		takeaway:
			'擱淺物種高度集中——前五種就佔了四分之三。而露脊鼠海豚的佔比更是逐年攀升：2020 年約 29%、2022 年 39%、2025 年已達 45%，這種近岸江豚的生活範圍與人類活動高度重疊，壓力值得警惕。',
		legend: [
			{ label: '重點物種', colorVar: '--chart-emphasis' },
			{ label: '其他物種', colorVar: '--chart-baseline' }
		]
	}
];

export const formTeaser = {
	title: '線上通報系統，開發中',
	body: '我們正在打造手機優先的擱淺通報表單——30 秒完成通報、案件編號可追蹤後續。上線前，發現擱淺請直接撥打 118。',
	badge: '即將推出'
};

export const heroCopy = {
	badge: '台灣鯨豚擱淺數據 · 2019–2025 全年度 & 2026 第一季',
	titleLead: '鯨豚救援是',
	titleHighlight: '「向死而生」',
	titleTail: '',
	sub: '每一隻擱淺的鯨豚，都代表著牠的生命可能來到盡頭。救援未必能翻轉生死，但每一次的盡力，都能讓生命化為科學的養分，指引台灣鯨豚救援繼續前行。',
	statDeadLabel: '發現時已死亡，救援與時間賽跑',
	statTotalLabel: '年全台鯨豚擱淺通報',
	statSpeciesLabel: '一年內擱淺的鯨豚物種數'
};

export const ctaCopy = {
	title: '每一次擱淺，都是海洋交給我們的一封信',
	body: '你不需要成為科學家，也能成為守護的一環：記住 118、認識這些鄰居、減少對海洋的傷害，並把正確的知識分享出去。當更多人願意在第一時間做對的事，就有更多鯨豚能重新游向大海。',
	primaryLabel: '記住 118 通報步驟',
	secondaryLabel: '認識台灣的鯨豚'
};

export const brandFootnote = {
	body: ''
};

export const dataSources = {
	intro:
		'資料來源：海洋委員會海洋保育署「海保救援網（MARN）」2019–2025 歷年全年度擱淺報告及 2026 年第一季擱淺報告',
	marnUrl: 'https://www.oca.gov.tw/ch/home.jsp?id=379&parentpath=0,296,375',
	marnLinkText: '海保署官網',
	reminder: '',
	mapAttribution: '地圖輪廓：Natural Earth（公有領域）'
};

export interface NgoLink {
	name: string;
	description: string;
	url: string;
	linkLabel: string;
}

/** Referral-first support model (issue #22): links go straight to the
 *  organizations — this site never handles money. URLs verified against
 *  official domains 2026-07-22. */
export const supportCopy = {
	head: {
		eyebrow: '支持第一線',
		title: '想為牠們做更多？',
		lead: '捐款與志工報名都不經過本站——以下連結直接通往長年守在第一線的組織。每一分支持，都會變成救援池、醫療物資與海上調查的一部分。'
	},
	links: [
		{
			name: '中華鯨豚協會',
			description:
				'1998 年成立，推動鯨豚與海龜的救援、研究與教育，並營運北台灣的鯨豚與海龜救傷中心。',
			url: 'https://www.whale.org.tw/portal_c1_cnt.php?owner_num=c1_561041&button_num=c1&folder_id=',
			linkLabel: '前往捐款'
		},
		{
			name: '成大海洋生物及鯨豚研究中心',
			description: '全台唯一專職鯨豚搶救站，負責活體救援、醫療復健，以及死亡個體的解剖與研究。',
			url: 'https://mbcrc.web2.ncku.edu.tw/',
			linkLabel: '官方網站與志工資訊'
		},
		{
			name: '黑潮海洋文教基金會',
			description: '以花蓮為基地的海洋教育與鯨豚海上調查組織，用長年累積的觀察守護東海岸的海。',
			url: 'https://www.kuroshio.org.tw/',
			linkLabel: '官方網站'
		}
	] as NgoLink[],
	disclosure: '以上皆為外部連結，捐款與支持直接進入各組織，本站不經手任何款項。'
};

/* ---------- UI copy previously inlined in components (extracted for the /en mirror) ---------- */

export const sectionHeads = {
	report: {
		eyebrow: '如何通報與參與',
		title: '「通報」是最關鍵的第一步',
		lead: '絕大多數擱淺鯨豚在發現時已經死亡，幸運的話，可能還有一線生機！活體救援是分秒必爭的事。第一步，從一通電話開始。你不需要是專家——只需要知道該打給誰、以及有哪些該做與不該做的事。'
	},
	data: {
		eyebrow: '數據',
		title: '數字代表著無數生命',
		lead: '「擱淺」是鯨豚因傷病、迷航、遭到船隻撞擊等種種因素而被沖上岸的現象。每一隻鯨豚的犧牲都讓我們更了解海洋：擱淺的種類、地點、季節與死因，透露著整個海域的資訊。以下數據來自海保署「海保救援網（MARN）」的官方擱淺報告。'
	},
	map: {
		eyebrow: '擱淺地圖',
		title: '擱淺發生在哪裡',
		lead: '每個亮點是一個縣市，大小代表 2025 年的擱淺數量。連江、金門、澎湖三個離島縣市合計 65 隻——佔了全台的 51%，離島近岸的江豚族群是熱點中的熱點。'
	},
	know: {
		eyebrow: '認識台灣的鯨豚',
		title: '一座被鯨豚環繞的島嶼',
		lead: '台灣位在黑潮與大陸棚交會處，海域生產力豐沛。長期調查已在台灣周邊記錄到約 30 種鯨豚，接近全球種類的三分之一——從沿岸的白海豚到深海的抹香鯨，這裡是名副其實的鯨豚多樣性熱點。光是 2025 一年，就有 21 種鯨豚被記錄到擱淺。'
	},
	threats: {
		eyebrow: '人為威脅',
		title: '鯨豚面臨的人為威脅',
		lead: '混獲、撞擊、噪音、廢棄物——多數威脅來自人類活動。認識它們，是減少傷害的第一步。'
	},
	conservation: {
		eyebrow: '保育行動與成果',
		title: '一隻鯨豚的獲救，是一整個網絡的合作',
		lead: '救援不是單一單位能完成的事。海洋委員會海保署扮演整合核心，串聯海巡署、地方政府、學術鯨豚中心、獸醫與民間團體，組成「海保救援網（MARN）」。當通報進來，這些角色會接力到同一個現場。'
	},
	kpi: {
		eyebrow: '白海豚保育數據',
		title: '用微光，照亮未來救援的路',
		lead: '個體辨識名錄、海上調查、科學採樣與病理分析——這些數字是第一線團隊日復一日的累積，也是保育決策的基礎。'
	}
};

export const uiCopy = {
	navReport: '通報',
	navData: '數據',
	navMap: '擱淺地圖',
	navLearn: '故事分享',
	navSupport: '支持第一線',
	heroEmergencyPrefix: '發現擱淺？',
	heroEmergencySuffix: '，處理步驟往下看',
	doTitle: '該做的事',
	dontTitle: '絕對不要做的事',
	takeawayLabel: '可能的資訊：',
	mapLegendOffshore: '離島縣市（熱點）',
	mapLegendMain: '本島縣市',
	mapLegendNote: '亮點大小 ∝ 擱淺數量（隻）',
	mapAriaLabel:
		'2025 年台灣各縣市鯨豚擱淺分布地圖：連江 26、金門 24、澎湖 15 為熱點，離島三縣合計佔全台 51%',
	marnAriaLabel:
		'海保救援網（MARN）架構：海保署為整合核心，串聯海巡署、學術鯨豚中心、在地民間團體與獸醫團隊',
	footerBrandLine: '台灣鯨豚擱淺通報與數據',
	dialAriaLabel: '撥打 118 海巡署救援專線',
	menuOpenLabel: '開啟選單',
	menuCloseLabel: '關閉選單',
	unitAnimals: '隻',
	unitSpecies: '種',
	chartDeadLabel: '死亡',
	chartLiveLabel: '活體',
	chartYearSuffix: ' 年',
	monthLabels: [
		'1月',
		'2月',
		'3月',
		'4月',
		'5月',
		'6月',
		'7月',
		'8月',
		'9月',
		'10月',
		'11月',
		'12月'
	]
};
