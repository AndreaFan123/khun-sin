/**
 * English mirror of site.ts (spec: full bilingual, pulled forward 2026-07-22).
 * Faithful translation of the Chinese content — same shape, same exports;
 * the locale context (lib/copy.ts) picks between the two. When site.ts
 * changes, mirror the change here.
 */

import type {
	ChartCardCopy,
	ConservationKpi,
	MarnNode,
	ReportStep,
	SpeciesCard,
	Threat
} from '$lib/data/site';

export const speciesCards: SpeciesCard[] = [
	{
		tag: 'Critically endangered',
		tagKind: 'critical',
		name: 'Taiwanese white dolphin',
		scientificName: 'Sousa chinensis taiwanensis',
		description:
			'A subspecies found only along Taiwan’s west coast, its pink-white figure is known locally as the “Matsu fish”. Scholars estimate fewer than 50 remain, declining about 3–4% a year — Taiwan’s most urgent marine conservation case.'
	},
	{
		tag: 'Common offshore',
		tagKind: 'common',
		name: 'Finless porpoise',
		scientificName: 'Neophocaena spp.',
		description:
			'A small, dorsal-fin-less coastal porpoise living around Kinmen, Matsu and Penghu. It was also the most frequently stranded species of 2025, at 45% of the year’s cases.'
	},
	{
		tag: 'Common nearshore',
		tagKind: 'info',
		name: 'Bottlenose dolphin',
		scientificName: 'Tursiops truncatus',
		description:
			'One of the most familiar dolphins — intelligent, social and curious. Taiwan’s waters host both the common and the Indo-Pacific bottlenose, stars of whale-watching trips.'
	},
	{
		tag: 'Open-ocean species',
		tagKind: 'info',
		name: 'Risso’s dolphin',
		scientificName: 'Grampus griseus',
		description:
			'Adults are covered in white scratches from sparring and socializing, like a map of the ocean. The waters off Hualien are their frequent stage — and a whale-watching favorite.'
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
			'Give the location, time and your contact, and describe the animal’s size (compare with your arm span or foot), whether it is alive (watch the blowhole for movement) and any injuries — this decides the team, vehicles and equipment dispatched.'
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
		'Most stranded cetaceans are already dead when found — but that never means they don’t matter. Every body carries information: through necropsy, sampling and pathology, researchers read the cause of death, the animal’s health, and changes across the whole marine environment. In 2025 alone, 62 individuals were scientifically sampled and 21 pathology analyses completed. Your one call may be the key to a scientific answer.'
};

export const doList: string[] = [
	'Call 118 immediately',
	'Check the scene is safe first: look for oil on the water, sharp smells, or unknown organisms covering the animal before approaching',
	'Record and report the location, time, and the animal’s size and condition',
	'Keep a safe distance; avoid crowding and noise',
	'Help only under professional guidance (e.g. shading the animal, keeping its skin moist)'
];

export const dontList: string[] = [
	'Never drag or push a live dolphin back into the sea — dragging tears its fragile skin, and it can inhale water and drown (four animals died this way in 2024)',
	'Don’t move, touch or pull the animal without instructions',
	'Don’t feed it or pour water into the blowhole',
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

export const formTeaser = {
	title: 'Online reporting system, in development',
	body: 'We are building a mobile-first stranding report form — 30 seconds to file, with a case number to follow up. Until it ships, please call 118 directly.',
	badge: 'Coming soon'
};

export const heroCopy = {
	badge: 'Taiwan cetacean stranding data · 2019–2025 annual & 2026 Q1',
	titleLead: 'Cetacean rescue is ',
	titleHighlight: '“Being-towards-death”',
	titleTail: '',
	sub: 'Every stranded whale or dolphin may be a life reaching its end. Rescue cannot always turn death around — but every effort turns a life into scientific knowledge that guides Taiwan’s cetacean rescue forward.',
	statDeadLabel: 'already dead when found — rescue races the clock',
	statTotalLabel: 'strandings reported across Taiwan',
	statSpeciesLabel: 'cetacean species stranded within the year'
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
		'Data: Ocean Conservation Administration “Marine Animal Rescue Network (MARN)” annual stranding reports 2019–2025 and the 2026 Q1 report',
	marnUrl: 'https://www.oca.gov.tw/ch/home.jsp?id=379&parentpath=0,296,375',
	marnLinkText: 'OCA website',
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
		eyebrow: 'How to report',
		title: 'Reporting is the critical first step',
		lead: 'Most stranded cetaceans are already dead when found — but with luck, there may still be a chance! Live rescue is a race against time, and it starts with one phone call. You don’t need to be an expert — just know who to call, and what to do and not do.'
	},
	data: {
		eyebrow: 'Data',
		title: 'Every number is a life',
		lead: 'A “stranding” is a cetacean washing ashore through injury, illness, disorientation, vessel strikes and other causes. Each loss teaches us more about the ocean: the species, places, seasons and causes of death reveal what is happening across the whole sea. The data below comes from the official MARN stranding reports.'
	},
	map: {
		eyebrow: 'Stranding map',
		title: 'Where strandings happen',
		lead: 'Each glowing dot is a county, sized by its 2025 stranding count. Lienchiang, Kinmen and Penghu — three offshore-island counties — total 65 animals, 51% of Taiwan: the islands’ coastal porpoise populations are the hotspot within the hotspot.'
	},
	know: {
		eyebrow: 'Meet Taiwan’s cetaceans',
		title: 'An island surrounded by whales and dolphins',
		lead: 'Taiwan sits where the Kuroshio Current meets the continental shelf, and its waters are richly productive. Long-term surveys have recorded about 30 cetacean species around the island — nearly a third of the world’s kinds, from coastal white dolphins to deep-sea sperm whales. In 2025 alone, 21 species were recorded stranding.'
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
	navReport: 'Report',
	navData: 'Data',
	navMap: 'Map',
	navLearn: 'Stories',
	heroEmergencyPrefix: 'Found a stranding? ',
	heroEmergencySuffix: ' — steps below',
	doTitle: 'Do',
	dontTitle: 'Never',
	takeawayLabel: 'What this may tell us: ',
	mapLegendOffshore: 'Offshore islands (hotspots)',
	mapLegendMain: 'Main island',
	mapLegendNote: 'Dot size ∝ stranding count (animals)',
	mapAriaLabel:
		'Map of 2025 cetacean strandings by county in Taiwan: Lienchiang 26, Kinmen 24 and Penghu 15 are the hotspots; the three offshore counties total 51% of Taiwan',
	marnAriaLabel:
		'Marine Animal Rescue Network (MARN) structure: the Ocean Conservation Administration at the core, linking the Coast Guard, academic cetacean centers, local volunteer groups and veterinary teams',
	footerBrandLine: 'Taiwan cetacean stranding reporting & data',
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
