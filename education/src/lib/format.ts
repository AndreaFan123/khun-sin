/**
 * Copy interpolation. Sentences live whole in the copy modules with named
 * placeholders — fragments concatenated in components break the moment a
 * language wants a different word order.
 */

import type { SiteCopy } from '$lib/copy';
import type { Period } from '$lib/data/strandings';
import { isAnnual } from '$lib/data/strandings';

export const fill = (template: string, values: Record<string, string | number>): string =>
	template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''));

/** Names the published report a period refers to, in the reader's language. */
export const formatReportLabel = (period: Period, copy: SiteCopy): string =>
	isAnnual(period)
		? fill(copy.dataCurrency.annualReport, { year: period.year })
		: fill(copy.dataCurrency.quarterlyReport, {
				year: period.year,
				quarter: copy.dataCurrency.quarterNumerals[(period.quarter ?? 1) - 1]
			});
