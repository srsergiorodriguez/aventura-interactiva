import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	base: '/aventura-interactiva',
	plugins: [sveltekit()]
};

export default config;
