import * as en from '$lib/data/site-en';
import { totals } from '$lib/data/strandings';
import { buildLlmsTxt } from '$lib/seo/llms';

export const prerender = true;

export const GET = async () =>
	new Response(buildLlmsTxt({ copy: en, locale: 'en' }, totals), {
		headers: { 'content-type': 'text/plain; charset=utf-8' }
	});
