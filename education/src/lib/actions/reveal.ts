import type { Action } from 'svelte/action';

/**
 * Marks content as revealed when it first enters the viewport, then stops
 * observing it. The initial SSR state stays readable; consumers opt into
 * motion by styling the `.revealed` state.
 */
export const reveal: Action<HTMLElement> = (node) => {
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('revealed');
					observer.unobserve(node);
				}
			}
		},
		{ threshold: 0.25 }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
