

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.CtnQFzzW.js","_app/immutable/chunks/scheduler.CgemthBB.js","_app/immutable/chunks/index.wvoJiAGR.js"];
export const stylesheets = ["_app/immutable/assets/4.C-Uq9_cK.css"];
export const fonts = [];
