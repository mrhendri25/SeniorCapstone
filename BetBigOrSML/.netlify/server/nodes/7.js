

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/players/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.CLW3nllY.js","_app/immutable/chunks/scheduler.DWXonaIp.js","_app/immutable/chunks/index.LEhKhOah.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/index.B83hKOeX.js"];
export const stylesheets = ["_app/immutable/assets/7.wptxLINr.css"];
export const fonts = [];
