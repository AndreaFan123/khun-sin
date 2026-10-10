export interface TurtleSpecies {
	name: string;
	scientificName: string;
	label: string;
	description: string;
}

export interface TurtleFeature {
	title: string;
	description: string;
}

export interface TurtleSource {
	label: string;
	url: string;
}

export interface TurtlePageCopy {
	meta: { title: string; description: string };
	hero: {
		eyebrow: string;
		title: string;
		highlight: string;
		lead: string;
		facts: { value: string; label: string }[];
	};
	speciesHead: { eyebrow: string; title: string; lead: string };
	species: TurtleSpecies[];
	journeyHead: { eyebrow: string; title: string; lead: string };
	journey: TurtleFeature[];
	threatsHead: { eyebrow: string; title: string; lead: string };
	threats: TurtleFeature[];
	rescue: {
		eyebrow: string;
		title: string;
		lead: string;
		steps: TurtleFeature[];
		callLabel: string;
		callAriaLabel: string;
	};
	sources: { title: string; intro: string; links: TurtleSource[] };
}

export const turtlePage: TurtlePageCopy = {
	meta: {
		title: '認識台灣海龜：五種海上旅人、威脅與救援 · Khun-Sin',
		description:
			'認識台灣海域記錄到的五種海龜、牠們漫長的生命旅程與人為威脅。發現擱淺或受困海龜，請立即撥打海巡 118。'
	},
	hero: {
		eyebrow: '台灣海龜',
		title: '一座島，遇見五種',
		highlight: '海上旅人',
		lead: '牠們在洋流裡長大，跨越海域覓食，也回到沙灘延續下一代。台灣周邊記錄到全球七種海龜中的五種；每一次相遇，都提醒我們海洋與陸地從未分開。',
		facts: [
			{ value: '5 種', label: '台灣海域有紀錄的海龜' },
			{ value: '全數', label: '列為第 I 級瀕臨絕種保育類' }
		]
	},
	speciesHead: {
		eyebrow: '認識牠們',
		title: '同一片海，不同的生存方式',
		lead: '從常見的綠蠵龜到遠洋的革龜，外形、食性與活動海域各不相同。辨識只是開始，更重要的是讓牠們保有安全遷徙與覓食的空間。'
	},
	species: [
		{
			name: '綠蠵龜',
			scientificName: 'Chelonia mydas',
			label: '台灣最常見',
			description: '台灣海域最常被記錄的海龜。成龜主要取食海草與藻類，常在珊瑚礁與沿岸覓食區活動。'
		},
		{
			name: '玳瑁',
			scientificName: 'Eretmochelys imbricata',
			label: '珊瑚礁居民',
			description:
				'嘴喙狹長、背甲盾片呈覆瓦狀，善於在珊瑚礁縫隙覓食。美麗背甲也曾讓牠們長期遭到捕捉。'
		},
		{
			name: '赤蠵龜',
			scientificName: 'Caretta caretta',
			label: '強壯顎部',
			description:
				'頭部較大、顎力強，能取食甲殼類與貝類。牠們跨越廣大海域，在台灣多為海上目擊或擱淺紀錄。'
		},
		{
			name: '欖蠵龜',
			scientificName: 'Lepidochelys olivacea',
			label: '稀有訪客',
			description: '體型相對嬌小，橄欖色背甲近似心形。在台灣紀錄不多，仍會因混獲或受傷而需要救援。'
		},
		{
			name: '革龜',
			scientificName: 'Dermochelys coriacea',
			label: '遠洋巨人',
			description:
				'現存體型最大的海龜，背部不是硬質盾片，而是帶有縱脊的革質皮膚，能在深遠海域追尋水母。'
		}
	],
	journeyHead: {
		eyebrow: '生命旅程',
		title: '牠的一生，把海與岸連在一起',
		lead: '海龜大多數時間生活在海中，但繁殖必須回到陸地。沙灘、近岸覓食場與遷徙海域缺一不可。'
	},
	journey: [
		{
			title: '上岸產卵',
			description: '成熟母龜在夜間上岸，選擇高於潮線的沙地挖巢。光線、聲響與人群都可能讓牠放棄。'
		},
		{
			title: '奔向大海',
			description: '幼龜出巢後依循自然光與海面方向前進；沙灘照明會讓牠們迷失方向。'
		},
		{
			title: '隨洋流成長',
			description: '幼龜進入外海，在漂流與覓食中成長，沿途會跨越行政區與國界。'
		},
		{
			title: '回到熟悉海域',
			description: '長大後往返覓食地與繁殖地，一片安全的海岸，可能支撐跨越數十年的生命循環。'
		}
	],
	threatsHead: {
		eyebrow: '人為威脅',
		title: '真正危險的，不只在海裡',
		lead: '漁具、塑膠、船隻與海岸開發，會在海龜生命旅程的不同階段留下傷害。減少威脅，需要海上與陸上的行動一起發生。'
	},
	threats: [
		{
			title: '漁業混獲與纏繞',
			description: '誤入漁網、吞下魚鉤或被廢棄漁具纏繞，可能造成溺水、撕裂傷與長期失去覓食能力。'
		},
		{
			title: '誤食海洋廢棄物',
			description: '塑膠袋在水中像水母，碎片也可能堵塞或刺穿消化道；岸上的垃圾最後可能回到海中。'
		},
		{
			title: '海岸開發與光害',
			description: '沙灘硬化、遊憩干擾與夜間照明會壓縮產卵空間，也可能讓母龜與幼龜失去方向。'
		},
		{
			title: '船隻撞擊',
			description: '需要浮上海面換氣的海龜，可能被高速船隻撞傷；沿岸活動越密集，風險越難避開。'
		}
	],
	rescue: {
		eyebrow: '發現海龜',
		title: '先通報，再依專業指示行動',
		lead: '無論海龜是受困、受傷、擱淺或已無生命跡象，都不要自行搬動或推回海裡。正確資訊能讓專業團隊更快帶齊人力與裝備。',
		steps: [
			{ title: '撥打 118', description: '聯絡海巡署，啟動海保救援網。' },
			{
				title: '提供現場資訊',
				description: '回報位置、時間、大小、活動狀況與可見外傷；在安全距離拍照協助判斷。'
			},
			{
				title: '不要自行處置',
				description: '避免觸碰、餵食、拉扯漁具或把活體推回海中，以免造成二次傷害。'
			},
			{ title: '安全守候', description: '維持距離、減少圍觀與噪音，依救援人員指示協助。' }
		],
		callLabel: '撥打 118 救援專線',
		callAriaLabel: '撥打海巡署 118 海龜救援專線'
	},
	sources: {
		title: '資料來源',
		intro: '頁面內容依海洋委員會海洋保育署公開資料整理；本站未納入尚未完成校核的海龜年度統計。',
		links: [
			{
				label: '海龜保育計畫',
				url: 'https://www.oca.gov.tw/userfiles/A47020000A/files/1130524%E6%B5%B7%E9%BE%9C%E4%BF%9D%E8%82%B2%E8%A8%88%E7%95%AB%28%E6%A0%B8%E5%AE%9A%E7%89%88%29.pdf'
			},
			{
				label: '海保救援網',
				url: 'https://www.oca.gov.tw/ch/home.jsp?id=186&parentpath=0%2C6%2C185'
			},
			{
				label: '臺灣百種海洋動物圖鑑',
				url: 'https://www.oca.gov.tw/ch/home.jsp?dataserno=202101210001&id=229&mcustomize=publication_view.jsp&parentpath=0%2C7%2C225'
			}
		]
	}
};
