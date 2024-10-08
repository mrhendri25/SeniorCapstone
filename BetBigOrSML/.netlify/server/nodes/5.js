

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/news/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.CQCm-6I3.js","_app/immutable/chunks/scheduler.DWXonaIp.js","_app/immutable/chunks/index.LEhKhOah.js","_app/immutable/chunks/each.D6YF6ztN.js"];
export const stylesheets = ["_app/immutable/assets/5.DrusHS2C.css"];
export const fonts = [];
