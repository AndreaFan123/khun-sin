/**
 * English mirror of site.ts (spec: full bilingual, pulled forward 2026-07-22).
 * Faithful translation of the Chinese content — same shape, same exports;
 * the locale context (lib/copy.ts) picks between the two. When site.ts
 * changes, mirror the change here.
 */

import type {
	AnimalSectionCopy,
	ChartCardCopy,
	ConservationKpi,
	MapAnimalCopy,
	MarnNode,
	ReportStep,
	SpeciesCard,
	Threat
} from '$lib/data/site';

export const speciesCards: SpeciesCard[] = [
	{
		tag: 'Taiwan endemic subspecies',
		tagKind: 'critical',
		name: 'Taiwanese white dolphin',
		scientificName: 'Sousa chinensis taiwanensis',
		description:
			'A subspecies found only along Taiwan’s west coast, its pink-white figure is known locally as the “Matsu fish”. Scholars estimate fewer than 50 remain, declining about 3–4% a year — Taiwan’s most urgent marine conservation case.',
		imageKey: 'taiwaneseHumpback',
		imageAlt: 'A Taiwanese white dolphin swimming near the coast',
		redList: { label: 'Critically Endangered', level: 'critically-endangered' }
	},
	{
		tag: 'Coastal porpoise',
		tagKind: 'common',
		name: 'Indo-Pacific finless porpoise (broad-ridged finless porpoise)',
		scientificName: 'Neophocaena phocaenoides',
		description:
			'A small, dorsal-fin-less porpoise of shallow coastal waters. Records once grouped broadly as “finless porpoise” are separated by species here.',
		imageKey: 'indoPacificFinless',
		imageAlt: 'An Indo-Pacific finless porpoise surfacing',
		redList: { label: 'Vulnerable', level: 'vulnerable' }
	},
	{
		tag: 'Coastal porpoise',
		tagKind: 'common',
		name: 'Narrow-ridged finless porpoise (East Asian finless porpoise)',
		scientificName: 'Neophocaena asiaeorientalis',
		description:
			'Also dorsal-fin-less, but a separate species from the Indo-Pacific finless porpoise. Similar common names make the scientific name important when reading sighting or stranding records.',
		imageKey: 'yangtzeFinless',
		imageAlt: 'A narrow-ridged finless porpoise swimming underwater'
	},
	{
		tag: 'Bottlenose dolphin',
		tagKind: 'info',
		name: 'Common bottlenose dolphin',
		scientificName: 'Tursiops truncatus',
		description:
			'One of the most familiar dolphins. It resembles the Indo-Pacific bottlenose dolphin but is a separate species, so records should retain the scientific name.',
		imageKey: 'commonBottlenose',
		imageAlt: 'A common bottlenose dolphin swimming in the sea'
	},
	{
		tag: 'Bottlenose dolphin',
		tagKind: 'info',
		name: 'Indo-Pacific bottlenose dolphin',
		scientificName: 'Tursiops aduncus',
		description:
			'Similar in appearance to the common bottlenose dolphin, but a separate species. Sighting and stranding records should retain the scientific name.',
		imageKey: 'indoPacificBottlenose',
		imageAlt: 'An Indo-Pacific bottlenose dolphin swimming in the sea',
		redList: { label: 'Near Threatened', level: 'near-threatened' }
	},
	{
		tag: 'Open-ocean species',
		tagKind: 'info',
		name: 'Risso’s dolphin',
		scientificName: 'Grampus griseus',
		description:
			'Taiwan’s whale-watching community often calls it the “patterned dolphin” or “Li’s dolphin”. Fishers call it tuā-thâu-á for its blunt, rounded head; older animals turn grey-white as scars accumulate and are also known as huê-ê-siūnn-thâu, evoking a bright bald monk at the surface.',
		imageKey: 'rissos',
		imageAlt: 'A Risso’s dolphin swimming in the sea'
	},
	{
		tag: '2025 stranding record',
		tagKind: 'info',
		name: 'Pygmy sperm whale',
		scientificName: 'Kogia breviceps',
		description:
			'A member of the dwarf sperm whale family and a separate species from the similarly named dwarf sperm whale. Taiwan’s 2025 cetacean stranding summary recorded four individuals, making the scientific name important for identification.',
		imageKey: 'pygmySpermWhale',
		imageAlt: 'A pygmy sperm whale swimming in the sea'
	},
	{
		tag: '2025 stranding record',
		tagKind: 'info',
		name: 'Cuvier’s beaked whale',
		scientificName: 'Ziphius cavirostris',
		description:
			'A beaked whale adapted to deep diving and generally found in deeper waters. Taiwan’s 2025 cetacean stranding summary recorded three individuals; professional confirmation is important because visual identification can be difficult.',
		imageKey: 'cuviersBeakedWhale',
		imageAlt: 'A Cuvier’s beaked whale swimming in the sea'
	}
];

export const threats: Threat[] = [
	{
		title: 'Fisheries bycatch',
		description:
			'Entanglement in nets, set nets and fishing gear is the most direct threat to coastal dolphins, often causing drowning or severe injuries.'
	},
	{
		title: 'Vessel strikes',
		description:
			'Busy shipping lanes and high-speed vessels cause strike injuries that repeatedly become infected, and disturb normal activity and breeding.'
	},
	{
		title: 'Underwater noise',
		description:
			'Piling, sonar and ship noise interfere with animals that navigate and communicate by sound. Studies show white dolphins react to noise from as far as 60–70 km away.'
	},
	{
		title: 'Marine debris',
		description:
			'Swallowed plastic and derelict fishing gear block or pierce the digestive tract. Sea turtles under the same rescue network are routinely found with hooks and man-made objects inside.'
	},
	{
		title: 'Habitat loss',
		description:
			'Land reclamation, development and offshore construction squeeze the coastal habitat; the white dolphin’s core habitat is especially fragile.'
	},
	{
		title: 'Land-based pollution',
		description:
			'Sewage and chemicals flow from land into the sea, weakening cetacean immune systems and making them more vulnerable to disease.'
	}
];

export const landSurprise = {
	title: 'What you do on land affects the whales at sea',
	body: 'The ocean and the land were never two separate worlds. Research finds bacteria in stranded cetaceans matching land sewage; even Toxoplasma from cat litter can wash into the sea and infect them. Reducing pollution and handling waste properly is protecting marine life far away.'
};

export const reportSteps: ReportStep[] = [
	{
		title: 'Call 118',
		description:
			'Report to the Coast Guard and start the rescue. Please stay on the line until the operator confirms everything before hanging up.'
	},
	{
		title: 'Describe the condition',
		description:
			'Share the location, time and your contact details. Say whether it is a cetacean or sea turtle, estimate its size, note any breathing or movement, and describe injuries or fishing-gear entanglement. This determines the people and equipment dispatched.'
	},
	{
		title: 'Keep your distance and stand by',
		description:
			'Until professionals arrive, observe from afar, record and photograph, and report the latest condition to the rescue team.'
	},
	{
		title: 'Hand over to the professionals',
		description:
			'The MARN response team takes over assessment, care or transport. Well done — you have completed the most important first step.'
	}
];

export const hotline = {
	number: '118',
	label: 'Coast Guard 24-hour rescue hotline',
	description:
		'If you find a stranded or trapped whale, dolphin or sea turtle, call 118 immediately. The Coast Guard operates year-round and will alert the Ocean Conservation Administration, the Taiwan Cetacean Society and partner research teams at once.',
	infoTitle: 'Even with no signs of life, please still report it',
	infoDescription:
		'Deceased cetaceans and sea turtles still provide important evidence about causes of death, health and the marine environment. Report the location and condition even when there are no signs of life.'
};

export const doList: string[] = [
	'Call 118 immediately',
	'Check the scene is safe first: look for oil on the water, sharp smells, or unknown organisms covering the animal before approaching',
	'Record and report the location, time, and the animal’s size and condition',
	'Keep a safe distance; avoid crowding and noise',
	'Help only under professional guidance (e.g. shading the animal, keeping its skin moist)'
];

export const dontList: string[] = [
	'Never drag or push a cetacean or sea turtle back into the sea; it may need medical assessment, and improper handling can cause further injury',
	'Don’t move, touch or pull the animal without instructions',
	'Don’t feed it or pour water into a blowhole, mouth, nose or wound',
	'Don’t get close out of curiosity — it stresses the animal and endangers you too'
];

export const reportEvenIfDead = {
	title: 'Even if it has died, please still report it',
	body: 'Most stranded cetaceans are already dead when found — but that never means they don’t matter. Every body carries information: through necropsy, sampling and pathology, researchers read the cause of death, health condition, and changes across the marine environment. In 2025 alone, 62 individuals were scientifically sampled and 21 pathology analyses completed. Your call may be the key to a scientific puzzle — please don’t skip it because “it’s already dead”.'
};

export const marnNodes: MarnNode[] = [
	{ name: 'Coast Guard', role: '118 intake · on-site personnel' },
	{ name: 'Ocean Conservation Administration', role: 'Integration core · national data' },
	{ name: 'Academic cetacean centers', role: 'Professional care · necropsy research' },
	{ name: 'Local volunteer groups', role: 'Speed and on-site support' },
	{ name: 'Veterinary teams', role: 'Medical care and assessment' }
];

export const rescueStory = {
	eyebrow: '2026 Q1 · A story of hope',
	title: 'Checheng, Pingtung: a mass stranding of 11 pygmy killer whales',
	body: 'In February 2026, eleven pygmy killer whales stranded together at Haikou fishing port in Checheng, Pingtung. Local rescue associations, release boats and response teams — over 60 people — lifted them one by one safely onto fishing boats with cranes and excavators. Medical teams drew blood on site, confirmed the animals were stable, and headed out to sea: seven were successfully released, the highest release count of any recent mass-stranding rescue.',
	releasedCount: 7,
	statLabel: 'pygmy killer whales returned to the sea'
};

export const collectiveStranding = {
	title: 'Why do “mass” strandings happen?',
	body: 'Many dolphins are intensely social animals with tight bonds between companions. When one individual strands through injury or illness, the others often follow its calls and refuse to leave — and the whole group ends up trapped together. That is a major cause of mass strandings, and why rescues often need to stabilize the entire group and release them together, as with these eleven pygmy killer whales.'
};

export const noPerfectSolution = {
	title: 'In rescue, there is no perfect answer',
	body: 'On site there is rarely a “perfect” strategy — only the best available choice, made on professional judgment in the moment. Sometimes that means hard trade-offs: to make limited rescue capacity count, teams may have to let go of individuals beyond saving and pour the most resources and time into the lives that still have a chance. That is not coldness; it is the most responsible judgment life can be given under limited resources. Understanding and trusting the professionals on the front line is part of protecting these animals too.'
};

export const conservationKpis: ConservationKpi[] = [
	{
		metric: 'catalogued',
		unit: '',
		label:
			'Individuals in the Taiwanese white dolphin photo-ID catalogue, tracking every one of the “pink spirits”'
	},
	{
		metric: 'sampled',
		unit: '',
		label: 'Individuals scientifically sampled in 2025, for pathology and cause-of-death analysis'
	},
	{
		metric: 'sightingGroups',
		unit: ' groups',
		label: 'Cumulative at-sea white dolphin sighting records, underpinning population monitoring'
	},
	{
		metric: 'pathologyCases',
		unit: ' cases',
		label: 'Pathology analyses in 2025, turning each death into conservation knowledge'
	}
];

export const chartCards: ChartCardCopy[] = [
	{
		key: 'trend',
		title: 'Strandings over the last seven years',
		subtitle: '2019–2025, dead vs live individuals (animals)',
		takeaway:
			'Across seven years, annual strandings ranged roughly 128–161, with 2025 a relative low. More notable: the live share fell to a seven-year low (just 7 animals, 5.5%). Total ups and downs don’t necessarily reflect population change — reporting coverage and environment play in — so long-term tracking is what makes the numbers readable.',
		legend: [
			{ label: 'Dead', colorVar: '--chart-muted' },
			{ label: 'Alive', colorVar: '--chart-emphasis' }
		]
	},
	{
		key: 'months',
		title: 'Seasonality of strandings',
		subtitle: 'Monthly strandings in 2025 (animals)',
		takeaway:
			'Strandings cluster clearly in winter and early spring. Strong northeast-monsoon waves, water-temperature swings and migration seasons can all make weakened animals more likely to wash ashore.',
		legend: [
			{ label: 'Winter (Dec–Feb)', colorVar: '--chart-emphasis' },
			{ label: 'Other months', colorVar: '--chart-baseline' }
		]
	},
	{
		key: 'counties',
		title: 'Strandings by county',
		subtitle: 'Strandings per county in 2025 (animals)',
		takeaway:
			'Lienchiang, Kinmen and Penghu — three offshore-island counties — total 65 animals, 51% of all of Taiwan. The coastal finless porpoise populations around the islands are the hotspot within the hotspot.',
		legend: [
			{ label: 'Offshore islands', colorVar: '--chart-emphasis' },
			{ label: 'Main island', colorVar: '--chart-baseline' }
		]
	},
	{
		key: 'causes',
		title: 'Causes of stranding',
		subtitle: 'Determinations for the 128 animals examined in 2025',
		takeaway:
			'A full 70% were too decomposed to determine a cause of death — and that share keeps rising (about 56% in 2020 → 70% in 2025). The later an animal is found, the harder the truth is to reach; that is exactly why timely reporting and digitization matter. Confirmed human-activity causes (bycatch, strikes) account for 15% — only the provable tip of the iceberg.',
		legend: [
			{ label: 'Suspected human activity', colorVar: '--chart-emphasis' },
			{ label: 'Other determinations', colorVar: '--chart-baseline' }
		]
	},
	{
		key: 'species',
		title: 'Stranded species in 2025',
		subtitle:
			'21 species, 128 animals over the year. The finless porpoise alone accounts for nearly half, reflecting the pressure on offshore coastal populations.',
		takeaway:
			'Strandings concentrate heavily — the top five species make up three quarters. And the finless porpoise share keeps climbing: about 29% in 2020, 39% in 2022, 45% by 2025. This coastal porpoise’s range overlaps intensely with human activity; the pressure deserves vigilance.',
		legend: [
			{ label: 'Key species', colorVar: '--chart-emphasis' },
			{ label: 'Other species', colorVar: '--chart-baseline' }
		]
	}
];

export const dataAnimalCopy: Record<'cetacean' | 'seaTurtle', AnimalSectionCopy> = {
	cetacean: {
		eyebrow: 'Cetaceans',
		title: 'Signals from coastal waters and offshore islands',
		lead: 'Taiwan recorded 128 stranded cetaceans in 2025: 121 dead and 7 alive. The views below retain the annual trend, month, county, cause and species detail.'
	},
	seaTurtle: {
		eyebrow: 'Sea turtles',
		title: 'More reports, with a different spatial pattern',
		lead: 'Taiwan recorded 330 stranded sea turtles in 2025: 197 dead and 133 alive. Yilan, Penghu and Taitung had the three highest county totals.'
	}
};

export const turtleChartCards: ChartCardCopy[] = [
	{
		key: 'trend',
		title: 'Seven-year sea turtle stranding trend',
		subtitle: '2019–2025, dead and alive (animals)',
		takeaway:
			'After reaching 359 in 2021, annual totals stayed around 315–330 for three years. The 133 live animals in 2025 were the highest in this series. Reporting coverage, set-net reports and discovery opportunity also affect totals, so they are not direct population estimates.',
		legend: [
			{ label: 'Dead', colorVar: '--chart-muted' },
			{ label: 'Alive', colorVar: '--chart-emphasis' }
		]
	},
	{
		key: 'counties',
		title: 'Sea turtle strandings by county',
		subtitle: '2025 county totals (animals)',
		takeaway:
			'Yilan (76), Penghu (58) and Taitung (57) together made up 58% of the year. This differs markedly from the cetacean concentration in Lienchiang, Kinmen and Penghu.',
		legend: [
			{ label: 'Top three counties', colorVar: '--chart-emphasis' },
			{ label: 'Other counties', colorVar: '--chart-baseline' }
		]
	},
	{
		key: 'causes',
		title: 'Sea turtle incident types',
		subtitle: 'Classification of 330 reports in 2025',
		takeaway:
			'Shore strandings were 59% and fisheries bycatch 27%, followed by drifting animals, derelict-net entanglement and other events. These categories describe how cases were found, not a complete cause-of-death diagnosis.',
		legend: [
			{ label: 'Fisheries-related', colorVar: '--chart-emphasis' },
			{ label: 'Other types', colorVar: '--chart-baseline' }
		]
	},
	{
		key: 'species',
		title: 'Sea turtle species stranded in 2025',
		subtitle: '330 animals, mostly green sea turtles',
		takeaway:
			'Green sea turtles numbered 259 (78%), followed by 39 olive ridleys and 27 hawksbills. Habitat use and human pressures differ among species.',
		legend: [
			{ label: 'Green sea turtle', colorVar: '--chart-emphasis' },
			{ label: 'Other species', colorVar: '--chart-baseline' }
		]
	}
];

export const mapAnimalCopy: Record<'cetacean' | 'seaTurtle', MapAnimalCopy> = {
	cetacean: {
		title: 'Cetaceans',
		lead: 'In 2025, strandings concentrated in the offshore counties of Lienchiang, Kinmen and Penghu: 65 animals, or 51% of the year.',
		ariaLabel:
			'Taiwan county map of 2025 cetacean strandings: Lienchiang 26, Kinmen 24 and Penghu 15 were the three hotspots',
		labelledNames: ['連江縣', '金門縣', '澎湖縣', '宜蘭縣']
	},
	seaTurtle: {
		title: 'Sea turtles',
		lead: 'Yilan led 2025 with 76 animals, followed by Penghu at 58 and Taitung at 57 — hotspots spanning the northeast, an offshore island and the east coast.',
		ariaLabel:
			'Taiwan county map of 2025 sea turtle strandings: Yilan 76, Penghu 58 and Taitung 57 were the three hotspots',
		labelledNames: ['宜蘭縣', '澎湖縣', '臺東縣']
	}
};

export const formTeaser = {
	title: 'Online reporting system, in development',
	body: 'We are building a mobile-first stranding report form — 30 seconds to file, with a case number to follow up. Until it ships, please call 118 directly.',
	badge: 'Coming soon'
};

export const heroCopy = {
	badge: 'Cetacean & sea turtle stranding reports',
	titleLead: 'Found a stranding? ',
	titleHighlight: 'Call 118',
	titleTail: '',
	sub: 'Whether you find a cetacean or sea turtle, alive or deceased, report it to the Coast Guard first. Do not push it back into the sea; follow the rescue team’s instructions for the situation.',
	hotlineScope: 'One rescue hotline for both cetaceans and sea turtles',
	stepsLabel: 'See reporting steps and safety guidance'
};

export const ctaCopy = {
	title: 'Every stranding is a letter the ocean hands to us',
	body: 'You don’t need to be a scientist to be part of the watch: remember 118, get to know these neighbors, reduce harm to the ocean, and pass the right knowledge on. The more people do the right thing first, the more animals swim back to the sea.',
	primaryLabel: 'Remember the 118 steps',
	secondaryLabel: 'Meet Taiwan’s cetaceans'
};

export const brandFootnote = {
	body: ''
};

export const dataSources = {
	intro:
		'Data: Ocean Conservation Administration Marine Animal Rescue Network (MARN) cetacean reports and sea-turtle statistical tables; annual comparisons use complete 2019–2025 data',
	marnUrl: 'https://www.oca.gov.tw/ch/home.jsp?id=379&parentpath=0,296,375',
	marnLinkText: 'OCA website',
	turtleSourcesLabel: 'Sea turtle page sources:',
	turtleSources: [
		{
			label: 'Sea Turtle Conservation Plan',
			url: 'https://www.oca.gov.tw/userfiles/A47020000A/files/1130524%E6%B5%B7%E9%BE%9C%E4%BF%9D%E8%82%B2%E8%A8%88%E7%95%AB%28%E6%A0%B8%E5%AE%9A%E7%89%88%29.pdf'
		},
		{
			label: 'Marine Animal Rescue Network',
			url: 'https://www.oca.gov.tw/ch/home.jsp?id=186&parentpath=0%2C6%2C185'
		},
		{
			label: '100 Marine Animals of Taiwan',
			url: 'https://www.oca.gov.tw/ch/home.jsp?dataserno=202101210001&id=229&mcustomize=publication_view.jsp&parentpath=0%2C7%2C225'
		}
	],
	reminder: '',
	mapAttribution: 'Map outline: Natural Earth (public domain)'
};

export const supportCopy = {
	head: {
		eyebrow: 'Support the front line',
		title: 'Want to do more for them?',
		lead: 'Donations and volunteering never pass through this site — the links below go straight to the organizations that hold the front line year after year. Every bit of support becomes rescue pools, medical supplies and at-sea surveys.'
	},
	links: [
		{
			name: 'Taiwan Cetacean Society',
			description:
				'Founded in 1998, advancing cetacean and sea-turtle rescue, research and education, and running northern Taiwan’s rescue and rehabilitation center.',
			url: 'https://www.whale.org.tw/portal_c1_cnt.php?owner_num=c1_561041&button_num=c1&folder_id=',
			linkLabel: 'Donate'
		},
		{
			name: 'NCKU Marine Biology & Cetacean Research Center',
			description:
				'Taiwan’s only dedicated cetacean rescue station — live rescue, medical rehabilitation, and necropsy research on deceased individuals.',
			url: 'https://mbcrc.web2.ncku.edu.tw/',
			linkLabel: 'Official site & volunteering'
		},
		{
			name: 'Kuroshio Ocean Education Foundation',
			description:
				'A Hualien-based ocean education and at-sea cetacean survey organization, guarding the east coast with decades of accumulated observation.',
			url: 'https://www.kuroshio.org.tw/',
			linkLabel: 'Official site'
		}
	],
	disclosure:
		'All links are external; donations and support go directly to each organization — this site never handles any funds.'
};

export const sectionHeads = {
	report: {
		eyebrow: 'Cetacean and sea turtle reporting',
		title: 'One 118 call starts the same rescue network',
		lead: 'You do not need to identify the species, assess the injury or decide whether rescue is possible. Share an accurate location and the animal’s condition, then follow professional instructions.'
	},
	data: {
		eyebrow: 'Stranding data',
		title: 'One rescue network, two different ocean signals',
		lead: 'Both cetaceans and sea turtles enter the Marine Animal Rescue Network through 118, but their totals, seasons and locations differ. These official OCA tables and MARN reports place both groups in one view.'
	},
	map: {
		eyebrow: 'Stranding map',
		title: 'One year, two different hotspot maps',
		lead: 'Each glowing dot is a county, sized by its 2025 stranding count. Comparing cetaceans with sea turtles reveals different rescue pressure across offshore islands, the northeast and the east coast.'
	},
	know: {
		eyebrow: 'Meet Taiwan’s cetaceans',
		title: 'An island surrounded by whales and dolphins',
		lead: 'Taiwan sits where the Kuroshio Current meets the continental shelf, and its waters are richly productive. Long-term surveys have recorded about 30 cetacean species around the island — nearly a third of the world’s kinds, from coastal white dolphins to deep-sea sperm whales. In 2025 alone, 21 species were recorded stranding.',
		facts: [
			{ value: 'About 30', label: 'cetacean species recorded around Taiwan' },
			{ value: '21 species', label: 'recorded stranding in 2025' }
		],
		imageSourceLabel: 'Image source:'
	},
	threats: {
		eyebrow: 'Human threats',
		title: 'The human-made threats cetaceans face',
		lead: 'Bycatch, strikes, noise, debris — most threats trace back to human activity. Knowing them is the first step to reducing the harm.'
	},
	conservation: {
		eyebrow: 'Conservation in action',
		title: 'One rescued animal is a whole network’s work',
		lead: 'Rescue is not something one agency can do. The Ocean Conservation Administration acts as the integration core, linking the Coast Guard, local governments, academic cetacean centers, veterinarians and volunteer groups into the Marine Animal Rescue Network (MARN). When a report comes in, these roles relay to the same shoreline.'
	},
	kpi: {
		eyebrow: 'White dolphin conservation data',
		title: 'Small lights, guiding the rescues to come',
		lead: 'Photo-ID catalogues, at-sea surveys, scientific sampling and pathology — these numbers are the front line’s day-after-day accumulation, and the foundation of conservation decisions.'
	}
};

export const uiCopy = {
	navReport: 'Report a stranding',
	navData: 'Stranding data',
	navMap: 'Stranding map',
	navLearn: 'Meet cetaceans',
	navTurtles: 'Sea turtles',
	navSupport: 'Support the front line',
	heroEmergencyPrefix: 'Found a stranding? ',
	heroEmergencySuffix: ' — steps below',
	doTitle: 'Do',
	dontTitle: 'Never',
	takeawayLabel: 'What this may tell us: ',
	mapLegendOffshore: 'Highlighted counties for this animal',
	mapLegendMain: 'Other counties',
	mapLegendNote: 'Dot size ∝ stranding count (animals)',
	mapAriaLabel:
		'Map of 2025 cetacean strandings by county in Taiwan: Lienchiang 26, Kinmen 24 and Penghu 15 are the hotspots; the three offshore counties total 51% of Taiwan',
	marnAriaLabel:
		'Marine Animal Rescue Network (MARN) structure: the Ocean Conservation Administration at the core, linking the Coast Guard, academic cetacean centers, local volunteer groups and veterinary teams',
	footerBrandLine: 'Taiwan cetacean and sea turtle stranding reporting & data',
	dialAriaLabel: 'Call 118, the Coast Guard rescue hotline',
	menuOpenLabel: 'Open menu',
	menuCloseLabel: 'Close menu',
	unitAnimals: '',
	unitSpecies: '',
	chartDeadLabel: 'Dead',
	chartLiveLabel: 'Alive',
	chartYearSuffix: '',
	monthLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
};

/** Page-level metadata (#37): titles lead with the query phrase, brand last. */
export const meta = {
	home: {
		title: 'Report cetacean and sea turtle strandings in Taiwan: 118 · Khun-Sin',
		description:
			'Found a stranded or trapped cetacean or sea turtle in Taiwan? Call 118 and follow these reporting steps and on-site safety instructions.'
	},
	data: {
		title: 'Taiwan cetacean and sea turtle stranding data · Khun-Sin',
		description:
			'Official annual stranding totals, condition, species and causes for cetaceans and sea turtles in Taiwan.'
	},
	map: {
		title: 'Taiwan cetacean and sea turtle stranding map · Khun-Sin',
		description:
			'Compare the 2025 county distribution of cetacean and sea turtle strandings across Taiwan.'
	},
	learn: {
		title: 'Taiwan’s whales and dolphins: species, threats and rescue · Khun-Sin',
		description:
			'Around 30 cetacean species are recorded in Taiwan’s waters. Meet them, understand the human-made threats they face, and see how the rescue network turns each stranding into knowledge.'
	},
	support: {
		title: 'Support frontline marine conservation in Taiwan · Khun-Sin',
		description:
			'Go directly to Taiwan Cetacean Society, NCKU Marine Biology & Cetacean Research Center, and Kuroshio Ocean Education Foundation to support rescue, research and ocean education.'
	}
};

/** Alt text for the share card image (#39). */
export const ogImageAlt: string =
	'Khun-Sin share card: Found a stranded cetacean or sea turtle? Call 118';

/**
 * Copy used only by structured data (#41, #42) — mirror of the zh block.
 */
export const schemaCopy = {
	/** FAQPage entries must be questions; the page shows these as two lists. */
	doQuestion: 'What should I do when I find a stranded cetacean or sea turtle?',
	dontQuestion: 'What must I never do to a stranded cetacean or sea turtle?',
	sourceName: 'Ocean Conservation Administration',
	dataset: {
		name: 'Taiwan cetacean and sea turtle stranding statistics (MARN)',
		description:
			'Cetacean and sea turtle stranding statistics for the waters around Taiwan: totals, dead versus live, species, county distribution, month, and event type. Sourced from the Ocean Conservation Administration’s Marine Animal Rescue Network (MARN) reports and statistical tables, and presented by Khun-Sin.'
	}
};

/**
 * Data currency — mirror of the zh block.
 */
export const dataCurrency = {
	note: 'Data updated {date}; annual charts compare complete years from 2019 through 2025.',
	annualReport: '{year} annual stranding report',
	quarterlyReport: '{year} Q{quarter} stranding report',
	quarterNumerals: ['1', '2', '3', '4']
};
