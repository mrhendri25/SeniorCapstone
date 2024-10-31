

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.CGHxPWSe.js","_app/immutable/chunks/scheduler.CgemthBB.js","_app/immutable/chunks/index.wvoJiAGR.js"];
export const stylesheets = ["_app/immutable/assets/2.WfGw22qX.css"];
export const fonts = [];
