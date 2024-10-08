

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/players/_id_/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/8.DZNVE13i.js","_app/immutable/chunks/scheduler.DWXonaIp.js","_app/immutable/chunks/index.LEhKhOah.js"];
export const stylesheets = [];
export const fonts = [];
