import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		paths: {
			base: '/aventura-interactiva'
		},
		adapter: adapter({
				// pages: 'build',
				// fallback: "index.html",
				precompress: false,
				strict: true,
				hydrate: true
		})
	}
};

export default config;
