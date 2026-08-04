import type { Action } from 'svelte/action';
import { hideTooltip, showTooltip } from '$lib/state/tooltip.svelte';

/**
 * `use:tooltip={text}` on any chart mark (#10). Pointer only — the values are
 * already rendered as text beside every bar, so nothing here is the sole route
 * to information.
 */
export const tooltip: Action<Element, string> = (node, content) => {
	let text = content;

	const move = (event: Event) => showTooltip(text, event as MouseEvent);

	node.addEventListener('mousemove', move);
	node.addEventListener('mouseleave', hideTooltip);

	return {
		update(next: string) {
			text = next;
		},
		destroy() {
			node.removeEventListener('mousemove', move);
			node.removeEventListener('mouseleave', hideTooltip);
			hideTooltip();
		}
	};
};
