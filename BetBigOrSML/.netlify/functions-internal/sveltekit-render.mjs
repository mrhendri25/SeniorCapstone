import { init } from '../serverless.js';

export const handler = init((() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["Decker_Sam25_2024.jpg","DiFilippo_Luka25_2024_1.jpg","Hendrick_Matthew25_2024.jpg","dark-background.png","favicon.png","tuff_aff_fball_flick.jpeg","wabashWlogo.png"]),
	mimeTypes: {".jpg":"image/jpeg",".png":"image/png",".jpeg":"image/jpeg"},
	_: {
		client: {"start":"_app/immutable/entry/start.Bc54zAyl.js","app":"_app/immutable/entry/app.CO-bxSy0.js","imports":["_app/immutable/entry/start.Bc54zAyl.js","_app/immutable/chunks/entry.BcwjQ3pl.js","_app/immutable/chunks/scheduler.DWXonaIp.js","_app/immutable/chunks/index.B83hKOeX.js","_app/immutable/chunks/environment.CZLhA_4V.js","_app/immutable/entry/app.CO-bxSy0.js","_app/immutable/chunks/scheduler.DWXonaIp.js","_app/immutable/chunks/index.LEhKhOah.js","_app/immutable/chunks/environment.CZLhA_4V.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/2.js')),
			__memo(() => import('../server/nodes/3.js')),
			__memo(() => import('../server/nodes/4.js')),
			__memo(() => import('../server/nodes/5.js')),
			__memo(() => import('../server/nodes/6.js')),
			__memo(() => import('../server/nodes/7.js')),
			__memo(() => import('../server/nodes/8.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/gamestats",
				pattern: /^\/gamestats\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/news",
				pattern: /^\/news\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/parlay",
				pattern: /^\/parlay\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/players",
				pattern: /^\/players\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/players/[id]",
				pattern: /^\/players\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})());
