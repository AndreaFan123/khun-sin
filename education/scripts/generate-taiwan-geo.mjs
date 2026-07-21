/**
 * One-off generator for src/lib/data/taiwan-geo.ts (frontend architecture,
 * "Interactive map"). Build-time only — output is committed; the site ships
 * zero geo tooling at runtime.
 *
 * Geometry source: datamaps' Taiwan TopoJSON (MIT), derived from Natural
 * Earth (public domain), fetched from jsDelivr. Upgrading to MOI county
 * boundaries (issue #14) means swapping the source URL + re-running.
 *
 * Run from education/:  node scripts/generate-taiwan-geo.mjs
 */

import { writeFileSync } from 'node:fs';
import { geoMercator, geoPath } from 'd3-geo';
import * as topojson from 'topojson-client';

const SOURCE = 'https://cdn.jsdelivr.net/npm/datamaps@0.5.10/src/js/data/twn.topo.json';

// Representative points per county (editorial, coastal-weighted for the
// offshore story). Names must match strandings.ts county names.
const centroids = [
	{ name: '連江縣', lon: 119.95, lat: 26.16 },
	{ name: '金門縣', lon: 118.32, lat: 24.44 },
	{ name: '澎湖縣', lon: 119.58, lat: 23.57 },
	{ name: '宜蘭縣', lon: 121.75, lat: 24.7 },
	{ name: '新北市', lon: 121.62, lat: 25.05 },
	{ name: '桃園市', lon: 121.1, lat: 25.0 },
	{ name: '苗栗縣', lon: 120.72, lat: 24.56 },
	{ name: '高雄市', lon: 120.28, lat: 22.62 },
	{ name: '花蓮縣', lon: 121.55, lat: 23.9 },
	{ name: '台東縣', lon: 121.1, lat: 22.75 },
	{ name: '彰化縣', lon: 120.42, lat: 24.05 },
	{ name: '台南市', lon: 120.12, lat: 23.0 },
	{ name: '屏東縣', lon: 120.55, lat: 22.35 },
	{ name: '新竹市', lon: 120.92, lat: 24.83 },
	{ name: '基隆市', lon: 121.74, lat: 25.15 }
];

const W = 520;
const H = 600;
const PAD = 30;

const topo = await (await fetch(SOURCE)).json();
const key = Object.keys(topo.objects)[0];
const land = topojson.merge(topo, topo.objects[key].geometries);

// Fit the projection over land + every county point, so the offshore
// islands (51% of the story) are always inside the frame.
const fitTarget = {
	type: 'FeatureCollection',
	features: [
		{ type: 'Feature', geometry: land, properties: {} },
		...centroids.map((c) => ({
			type: 'Feature',
			geometry: { type: 'Point', coordinates: [c.lon, c.lat] },
			properties: {}
		}))
	]
};

const proj = geoMercator().fitExtent(
	[
		[PAD, PAD],
		[W - PAD, H - PAD]
	],
	fitTarget
);
const landPath = geoPath(proj)(land);

const countyPoints = centroids.map((c) => {
	const [x, y] = proj([c.lon, c.lat]);
	return { name: c.name, x: +x.toFixed(1), y: +y.toFixed(1) };
});

const out = `/**
 * GENERATED FILE — do not edit by hand.
 * Regenerate with: node scripts/generate-taiwan-geo.mjs
 *
 * Geometry: datamaps TopoJSON (MIT) derived from Natural Earth (public
 * domain). County points are editorial representative coordinates,
 * Mercator-projected at generation time. Zero runtime dependencies.
 */

export const mapWidth = ${W};
export const mapHeight = ${H};

export interface CountyPoint {
	name: string;
	x: number;
	y: number;
}

export const countyPoints: CountyPoint[] = ${JSON.stringify(countyPoints, null, '\t')};

export const landPath = ${JSON.stringify(landPath)};
`;

writeFileSync(new URL('../src/lib/data/taiwan-geo.ts', import.meta.url), out);
console.log(
	`taiwan-geo.ts written: ${countyPoints.length} county points, land path ${landPath.length} chars`
);
