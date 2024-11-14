

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/gamestats/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.C8p4q-w9.js","_app/immutable/chunks/scheduler.CgemthBB.js","_app/immutable/chunks/index.wvoJiAGR.js","_app/immutable/chunks/each.D6YF6ztN.js"];
export const stylesheets = ["_app/immutable/assets/5.Csg5HO1X.css"];
export const fonts = [];
