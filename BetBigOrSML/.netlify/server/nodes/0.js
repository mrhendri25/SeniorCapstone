

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.DdHvCc3L.js","_app/immutable/chunks/scheduler.DWXonaIp.js","_app/immutable/chunks/index.LEhKhOah.js"];
export const stylesheets = ["_app/immutable/assets/0.B2pYWWYa.css"];
export const fonts = [];
