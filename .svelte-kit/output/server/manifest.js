export const manifest = {
	appDir: "_app",
	appPath: "aventura-interactiva/_app",
	assets: new Set([".DS_Store",".nojekyll","blueprint.png","favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.c2d9554f.js","app":"_app/immutable/entry/app.9e994824.js","imports":["_app/immutable/entry/start.c2d9554f.js","_app/immutable/chunks/index.4d86df2e.js","_app/immutable/chunks/singletons.66cd0ae0.js","_app/immutable/chunks/index.9d73ec15.js","_app/immutable/entry/app.9e994824.js","_app/immutable/chunks/index.4d86df2e.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js')
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
