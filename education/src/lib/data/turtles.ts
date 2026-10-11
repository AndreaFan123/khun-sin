export interface TurtleSpecies {
	name: string;
	scientificName: string;
	label: string;
	description: string;
	imageKey: 'green' | 'hawksbill' | 'loggerhead' | 'oliveRidley' | 'leatherback';
	imageAlt: string;
	redList: {
		label: string;
		level: 'critically-endangered' | 'vulnerable' | 'threatened';
	};
}

export interface TurtleFeature {
	title: string;
	description: string;
}

export interface TurtlePageCopy {
	meta: { title: string; description: string };
	hero: {
		eyebrow: string;
		title: string;
		highlight: string;
		lead: string;
		facts: { value: string; label: string }[];
		imageSourceLabel: string;
	};
	speciesHead: {
		eyebrow: string;
		title: string;
		lead: string;
		imageSourceLabel: string;
		redListLabel: string;
	};
	species: TurtleSpecies[];
	journeyHead: { eyebrow: string; title: string; lead: string; imageSourceLabel: string };
	journey: TurtleFeature[];
	threatsHead: { eyebrow: string; title: string; lead: string };
	threats: TurtleFeature[];
	rescue: {
		eyebrow: string;
		title: string;
		lead: string;
		steps: TurtleFeature[];
		callLabel: string;
	};
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
		],
		imageSourceLabel: '圖片來源：'
	},
	speciesHead: {
		eyebrow: '認識牠們',
		title: '同一片海，不同的生存方式',
		lead: '從常見的綠蠵龜到遠洋的革龜，外形、食性與活動海域各不相同。辨識只是開始，更重要的是讓牠們保有安全遷徙與覓食的空間。',
		imageSourceLabel: '圖片來源：',
		redListLabel: 'IUCN 紅色名錄'
	},
	species: [
		{
			name: '綠蠵龜',
			scientificName: 'Chelonia mydas (Green Sea Turtle)',
			label: '台灣最常見',
			description: '台灣海域最常被記錄的海龜。成龜主要取食海草與藻類，常在珊瑚礁與沿岸覓食區活動。',
			imageKey: 'green',
			imageAlt: '綠蠵龜停留在珊瑚礁上',
			redList: { label: '受威脅', level: 'threatened' }
		},
		{
			name: '玳瑁',
			scientificName: 'Eretmochelys imbricata (Hawksbill Sea Turtle)',
			label: '珊瑚礁居民',
			description:
				'嘴喙狹長、背甲盾片呈覆瓦狀，善於在珊瑚礁縫隙覓食。美麗背甲也曾讓牠們長期遭到捕捉。',
			imageKey: 'hawksbill',
			imageAlt: '玳瑁在藍色海水中游動',
			redList: { label: '極危', level: 'critically-endangered' }
		},
		{
			name: '赤蠵龜',
			scientificName: 'Caretta caretta (Loggerhead Sea Turtle)',
			label: '強壯顎部',
			description:
				'頭部較大、顎力強，能取食甲殼類與貝類。牠們跨越廣大海域，在台灣多為海上目擊或擱淺紀錄。',
			imageKey: 'loggerhead',
			imageAlt: '赤蠵龜在海中游動',
			redList: { label: '易危', level: 'vulnerable' }
		},
		{
			name: '欖蠵龜',
			scientificName: 'Lepidochelys olivacea (Olive Ridley Sea Turtle)',
			label: '稀有訪客',
			description: '體型相對嬌小，橄欖色背甲近似心形。在台灣紀錄不多，仍會因混獲或受傷而需要救援。',
			imageKey: 'oliveRidley',
			imageAlt: '欖蠵龜游在接近水面的海中',
			redList: { label: '易危', level: 'vulnerable' }
		},
		{
			name: '革龜',
			scientificName: 'Dermochelys coriacea (Leatherback Sea Turtle)',
			label: '遠洋巨人',
			description:
				'現存體型最大的海龜，背部不是硬質盾片，而是帶有縱脊的革質皮膚，能在深遠海域追尋水母。',
			imageKey: 'leatherback',
			imageAlt: '革龜在深藍色海水中游動',
			redList: { label: '易危', level: 'vulnerable' }
		}
	],
	journeyHead: {
		eyebrow: '生命旅程',
		title: '牠的一生，把海與岸連在一起',
		lead: '海龜大多數時間生活在海中，但繁殖必須回到陸地。沙灘、近岸覓食場與遷徙海域缺一不可。',
		imageSourceLabel: '圖片來源：'
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
		callLabel: '海巡署 24 小時救援專線'
	}
};
