export interface RevealOnceOptions {
	threshold?: number;
}

export function revealOnce(node: HTMLElement, options: RevealOnceOptions = {}) {
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	node.dataset.revealReady = 'true';

	if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
		node.dataset.revealed = 'true';
		return {};
	}

	const observer = new IntersectionObserver(
		([entry]) => {
			if (!entry?.isIntersecting) return;

			node.dataset.revealed = 'true';
			observer.disconnect();
		},
		{ threshold: options.threshold ?? 0.2 }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
