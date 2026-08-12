/**
 * The chart's long description for assistive technology.
 *
 * `aria-label` names a chart ("Strandings by county"); it cannot carry the
 * figures, so a screen reader user hears the title and nothing else. The
 * numbers are already written for humans in the tooltips, in the right
 * locale — this flattens those into one readable sentence rather than
 * inventing a second, drift-prone set of strings.
 *
 * Tooltips are two lines (label above, value below). A newline reads as a
 * pause with no relationship, so it becomes a colon.
 */
export const describeChart = (tooltips: string[]): string =>
	tooltips.map((t) => t.replace(/\n/g, ': ')).join('; ');
