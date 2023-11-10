export const manifest = {
	appDir: "_app",
	appPath: "aventura-interactiva/_app",
	assets: new Set([".DS_Store",".nojekyll","blueprint.png","favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.608d7f08.js","app":"_app/immutable/entry/app.ad7af29f.js","imports":["_app/immutable/entry/start.608d7f08.js","_app/immutable/chunks/index.4d86df2e.js","_app/immutable/chunks/singletons.c6b1548d.js","_app/immutable/chunks/index.9d73ec15.js","_app/immutable/entry/app.ad7af29f.js","_app/immutable/chunks/index.4d86df2e.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
