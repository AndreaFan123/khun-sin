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
		name: '臺灣白海豚',
		scientificName: 'Sousa chinensis taiwanensis',
		description:
			'只生活在臺灣西部沿海的特有亞種，粉白身影被稱為「媽祖魚」。學者估計現存不到 50 隻，且族群每年約下滑 3–4%，是臺灣最急迫的海洋保育對象。'
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
			'最為人熟悉的海豚之一，聰明、群居、好奇心強。臺灣海域有瓶鼻海豚與印太瓶鼻海豚兩種，是賞鯨常見的明星。'
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
	{ title: '撥打 118', description: '向海巡署通報，這是啟動整個救援網絡的開關。' },
	{
		title: '說清楚「狀態」',
		description:
			'提供地點、時間，並描述動物大小、是活體還是死亡、有無外傷——這決定要派多少人、開什麼車、帶什麼裝備。'
	},
	{
		title: '保持距離守候',
		description: '在專業人員抵達前，遠距離觀察、記錄與拍照，把最新狀況回報給救援團隊。'
	},
	{
		title: '交給專業團隊',
		description: 'MARN 行動小組到場後接手評估、處置或後送，你已完成最重要的一棒。'
	}
];

export const hotline = {
	number: '118',
	label: '海巡署 24 小時救援專線',
	description:
		'發現擱淺或受困的鯨豚、海龜，立即撥打 118。海巡署全年無休，會第一時間聯繫海保署與成大鯨豚中心、中華鯨豚協會等專業團隊。'
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
		label: '臺灣白海豚個體辨識名錄累計數，為每隻粉紅精靈建檔追蹤'
	},
	{ metric: 'sampled', unit: '隻', label: '2025 年完成科學採樣的個體數，用於病理與死因分析' },
	{ metric: 'sightingGroups', unit: '群次', label: '白海豚海上調查累計目擊紀錄，支撐族群監測' },
	{ metric: 'pathologyCases', unit: '件', label: '2025 年病理解剖分析，把每次死亡轉化為保育知識' }
];

export const brandFootnote = {
	body: '鯤鯓（Khun-Sin），台語裡指浮出海面、狀似鯨背的沙洲——這座島本身，就是一隻鯨。'
};

export const dataSources = {
	intro:
		'資料來源：海洋委員會海洋保育署「海保救援網（MARN）」2019–2025 歷年全年度擱淺報告及 2026 年第一季擱淺報告',
	marnUrl: 'https://www.oca.gov.tw/ch/home.jsp?id=379&parentpath=0,296,375',
	reminder: '提醒：發現擱淺鯨豚或海龜，請撥打海巡署專線 118，切勿自行將動物推回海中。'
};
