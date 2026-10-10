import type { TurtlePageCopy } from './turtles';

export const turtlePage: TurtlePageCopy = {
	meta: {
		title: 'Sea turtles of Taiwan: five ocean travellers, threats and rescue · Khun-Sin',
		description:
			'Meet the five sea-turtle species recorded around Taiwan, follow their life journey and learn what to do if you find a stranded or trapped turtle.'
	},
	hero: {
		eyebrow: 'Sea turtles of Taiwan',
		title: 'One island, five kinds of',
		highlight: 'ocean traveller',
		lead: 'They grow with the currents, cross seas to feed and return to shore to begin the next generation. Five of the world’s seven sea-turtle species have been recorded around Taiwan; every encounter reminds us that ocean and land are one connected habitat.',
		facts: [
			{ value: '5 species', label: 'recorded in the waters around Taiwan' },
			{ value: 'All', label: 'protected as Category I endangered wildlife' }
		]
	},
	speciesHead: {
		eyebrow: 'Meet the travellers',
		title: 'One sea, five ways of life',
		lead: 'From the frequently seen green turtle to the ocean-roaming leatherback, each has a different shape, diet and range. Identification is only the beginning; they also need safe room to feed and migrate.'
	},
	species: [
		{
			name: 'Green turtle',
			scientificName: 'Chelonia mydas',
			label: 'Most often recorded',
			description:
				'The sea turtle most often recorded around Taiwan. Adults mainly eat seagrass and algae and forage around reefs and coastal feeding grounds.'
		},
		{
			name: 'Hawksbill turtle',
			scientificName: 'Eretmochelys imbricata',
			label: 'Reef resident',
			description:
				'Its narrow beak reaches into reef crevices, while overlapping shell plates form a distinctive pattern that once made it a target of the shell trade.'
		},
		{
			name: 'Loggerhead turtle',
			scientificName: 'Caretta caretta',
			label: 'Powerful jaws',
			description:
				'A large head and strong jaws help it eat crustaceans and shellfish. Around Taiwan it is more often known from offshore sightings or strandings.'
		},
		{
			name: 'Olive ridley turtle',
			scientificName: 'Lepidochelys olivacea',
			label: 'Rare visitor',
			description:
				'A relatively small turtle with an olive, heart-shaped shell. Records in Taiwan are uncommon, but bycatch and injury can still bring individuals into rescue.'
		},
		{
			name: 'Leatherback turtle',
			scientificName: 'Dermochelys coriacea',
			label: 'Ocean giant',
			description:
				'The largest living sea turtle. Instead of hard shell plates, its back has ridged, leathery skin, suited to roaming deep offshore waters in search of jellyfish.'
		}
	],
	journeyHead: {
		eyebrow: 'Life journey',
		title: 'A lifetime that connects sea and shore',
		lead: 'Sea turtles spend most of their lives in the ocean, but reproduction brings them back to land. Nesting beaches, coastal feeding grounds and migration routes all matter.'
	},
	journey: [
		{
			title: 'Nesting ashore',
			description:
				'At night, a mature female chooses sand above the tide line and digs a nest. Light, noise and crowds may cause her to abandon the attempt.'
		},
		{
			title: 'A race to the sea',
			description:
				'Hatchlings follow natural light and the open horizon toward the water. Artificial beach lighting can draw them the wrong way.'
		},
		{
			title: 'Growing with currents',
			description:
				'Young turtles enter the open ocean, drifting and feeding as they grow across administrative borders and national waters.'
		},
		{
			title: 'Returning to familiar waters',
			description:
				'Adults move between feeding and breeding grounds. One safe coastline can support a life cycle lasting many decades.'
		}
	],
	threatsHead: {
		eyebrow: 'Human-made threats',
		title: 'The danger is not only at sea',
		lead: 'Fishing gear, plastic, vessels and coastal development harm turtles at different stages of life. Reducing those risks takes action both offshore and on land.'
	},
	threats: [
		{
			title: 'Bycatch and entanglement',
			description:
				'Nets, swallowed hooks and derelict gear can cause drowning, deep wounds and lasting loss of feeding ability.'
		},
		{
			title: 'Marine debris',
			description:
				'A plastic bag can resemble a jellyfish in the water, while fragments may block or pierce the digestive tract. Rubbish on land can end up at sea.'
		},
		{
			title: 'Coastal development and light',
			description:
				'Hardened shores, recreation pressure and artificial lighting reduce nesting space and can disorient females and hatchlings.'
		},
		{
			title: 'Vessel strikes',
			description:
				'Sea turtles must surface to breathe and may be hit by fast-moving boats. The risk grows where coastal activity is dense.'
		}
	],
	rescue: {
		eyebrow: 'When you find a turtle',
		title: 'Report first, then follow professional guidance',
		lead: 'Whether a turtle is trapped, injured, stranded or appears dead, do not move it or push it back into the sea yourself. Accurate information helps responders bring the right people and equipment.',
		steps: [
			{
				title: 'Call 118',
				description: 'Contact the Coast Guard to activate the Marine Animal Rescue Network.'
			},
			{
				title: 'Share field details',
				description:
					'Report the location, time, size, movement and visible injuries; photos from a safe distance can help assessment.'
			},
			{
				title: 'Do not intervene',
				description:
					'Do not touch, feed, pull fishing gear from or return a live turtle to the water; handling may cause further harm.'
			},
			{
				title: 'Wait safely',
				description:
					'Keep your distance, reduce crowds and noise, and follow the rescue team’s instructions.'
			}
		],
		callLabel: 'Call the 118 rescue line',
		callAriaLabel: 'Call the Coast Guard 118 sea turtle rescue line'
	},
	sources: {
		title: 'Sources',
		intro:
			'Content is based on public information from Taiwan’s Ocean Conservation Administration. Unverified annual sea-turtle statistics are intentionally not included.',
		links: [
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
		]
	}
};
