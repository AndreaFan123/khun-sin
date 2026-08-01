import { buildSitemap } from '$lib/seo/sitemap';

export const prerender = true;

export const GET = async () =>
	new Response(buildSitemap(), {
		headers: { 'content-type': 'application/xml' }
	});
