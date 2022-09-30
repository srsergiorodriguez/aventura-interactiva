import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    paths: {
			base: '/aventura-interactiva'
		},
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null,
      precompress: false
    }),

    prerender: {
      // This can be false if you're using a fallback (i.e. SPA mode)
      default: true
    }
  }
};