import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// Deployed on Vercel (ADR-001 deployment update, 2026-07-21). Every route
			// is prerendered (src/routes/+layout.ts), so the output is still pure
			// static HTML served from the CDN — no server-rendered code paths.
			adapter: adapter(),

			// Inline all our (small) stylesheets into the prerendered HTML —
			// removes render-blocking CSS round trips (Lighthouse finding).
			inlineStyleThreshold: 16384
		})
	]
});
