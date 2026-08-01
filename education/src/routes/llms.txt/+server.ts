import * as zh from '$lib/data/site';
import { totals } from '$lib/data/strandings';
import { buildLlmsTxt } from '$lib/seo/llms';

export const prerender = true;

export const GET = async () =>
	new Response(buildLlmsTxt({ copy: zh, locale: 'zh' }, totals), {
		headers: { 'content-type': 'text/plain; charset=utf-8' }
	});
