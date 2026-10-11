import { afterEach, describe, expect, it, vi } from 'vitest';
import { revealOnce } from './reveal-once';

afterEach(() => {
	vi.unstubAllGlobals();
});

describe('revealOnce', () => {
	it('reveals immediately when reduced motion is preferred', () => {
		const node = { dataset: {} } as unknown as HTMLElement;
		const observer = vi.fn();

		vi.stubGlobal('window', {
			matchMedia: () => ({ matches: true })
		});
		vi.stubGlobal('IntersectionObserver', observer);

		revealOnce(node);

		expect(node.dataset.revealReady).toBe('true');
		expect(node.dataset.revealed).toBe('true');
		expect(observer).not.toHaveBeenCalled();
	});

	it('reveals on first intersection and then stops observing', () => {
		const node = { dataset: {} } as unknown as HTMLElement;
		const observe = vi.fn();
		const disconnect = vi.fn();
		let handleIntersection: IntersectionObserverCallback | undefined;

		vi.stubGlobal('window', {
			matchMedia: () => ({ matches: false })
		});
		class MockIntersectionObserver {
			constructor(callback: IntersectionObserverCallback) {
				handleIntersection = callback;
			}

			observe = observe;
			disconnect = disconnect;
		}
		vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

		const action = revealOnce(node, { threshold: 0.25 });

		expect(node.dataset.revealReady).toBe('true');
		expect(node.dataset.revealed).toBeUndefined();
		expect(observe).toHaveBeenCalledWith(node);

		handleIntersection?.([{ isIntersecting: true } as IntersectionObserverEntry], {} as never);

		expect(node.dataset.revealed).toBe('true');
		expect(disconnect).toHaveBeenCalledTimes(1);

		action.destroy?.();
		expect(disconnect).toHaveBeenCalledTimes(2);
	});
});
