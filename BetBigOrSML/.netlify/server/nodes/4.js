

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/gamestats/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.B_JDJqv_.js","_app/immutable/chunks/scheduler.DWXonaIp.js","_app/immutable/chunks/index.LEhKhOah.js","_app/immutable/chunks/each.D6YF6ztN.js"];
export const stylesheets = ["_app/immutable/assets/4.Csg5HO1X.css"];
export const fonts = [];
