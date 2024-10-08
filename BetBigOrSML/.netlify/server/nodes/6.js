

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/parlay/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.D-DW0UdQ.js","_app/immutable/chunks/scheduler.DWXonaIp.js","_app/immutable/chunks/index.LEhKhOah.js","_app/immutable/chunks/each.D6YF6ztN.js"];
export const stylesheets = ["_app/immutable/assets/6.6LHgNV9E.css"];
export const fonts = [];
