import { c as create_ssr_component, e as escape, v as validate_component } from "../../chunks/ssr.js";
const css$1 = {
  code: ".title.svelte-iwuaw8.svelte-iwuaw8{display:flex}.title.svelte-iwuaw8 h1.svelte-iwuaw8{margin-left:10px}.page_bar.svelte-iwuaw8.svelte-iwuaw8{position:fixed;top:0;right:0;padding:20px}",
  map: '{"version":3,"file":"title.svelte","sources":["title.svelte"],"sourcesContent":["<script>\\n  let title = \\"BetBigOrSML\\";\\n<\/script>\\n\\n<div class=\\"title\\">\\n  <img src=\\"wabashWlogo.png\\" alt=\\"site logo\\" />\\n  <h1>{title}</h1>\\n</div>\\n\\n<div class=\\"page_bar\\">\\n  <a href=\\"/\\">Home</a>___\\n  <a href=\\"/about\\">About Us</a>___\\n  <a href=\\"/gamestats\\">Statistics</a>___\\n  <a href=\\"/news\\">News</a>___\\n  <a href=\\"/parlay\\">Parlays</a>___\\n  <a href=\\"/players\\">Players</a>___\\n</div>\\n\\n<style>\\n  .title {\\n    display: flex;\\n  }\\n\\n  .title h1 {\\n    margin-left: 10px;\\n  }\\n\\n  .page_bar {\\n    position: fixed;\\n    top: 0;\\n    right: 0;\\n    padding: 20px;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAmBE,kCAAO,CACL,OAAO,CAAE,IACX,CAEA,oBAAM,CAAC,gBAAG,CACR,WAAW,CAAE,IACf,CAEA,qCAAU,CACR,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,CAAC,CACN,KAAK,CAAE,CAAC,CACR,OAAO,CAAE,IACX"}'
};
let title = "BetBigOrSML";
const Title = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<div class="title svelte-iwuaw8"><img src="wabashWlogo.png" alt="site logo"> <h1 class="svelte-iwuaw8">${escape(title)}</h1></div> <div class="page_bar svelte-iwuaw8" data-svelte-h="svelte-3hxybe"><a href="/">Home</a>___
  <a href="/about">About Us</a>___
  <a href="/gamestats">Statistics</a>___
  <a href="/news">News</a>___
  <a href="/parlay">Parlays</a>___
  <a href="/players">Players</a>___
</div>`;
});
const css = {
  code: "header.svelte-1bez8gb{display:flex;justify-content:left}main.svelte-1bez8gb{max-width:960px;margin:20px auto}footer.svelte-1bez8gb{text-align:center;font-size:small}",
  map: '{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script>\\n  import Title from \\"$lib/title.svelte\\";\\n  import \\"../styles/global.css\\";\\n  export const prerender = true;\\n<\/script>\\n\\n<header>\\n  <Title title=\\"BetBigOrSML\\" />\\n</header>\\n\\n<main>\\n  <!--main content-->\\n  <slot></slot>\\n</main>\\n\\n<footer>\\n  <p>Copyright of BetBigOrSML 2024</p>\\n</footer>\\n\\n<style>\\n  header {\\n    display: flex;\\n    justify-content: left;\\n  }\\n  main {\\n    max-width: 960px;\\n    margin: 20px auto;\\n  }\\n  footer {\\n    text-align: center;\\n    font-size: small;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAoBE,qBAAO,CACL,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,IACnB,CACA,mBAAK,CACH,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,IAAI,CAAC,IACf,CACA,qBAAO,CACL,UAAU,CAAE,MAAM,CAClB,SAAS,CAAE,KACb"}'
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const prerender = true;
  if ($$props.prerender === void 0 && $$bindings.prerender && prerender !== void 0) $$bindings.prerender(prerender);
  $$result.css.add(css);
  return `<header class="svelte-1bez8gb">${validate_component(Title, "Title").$$render($$result, { title: "BetBigOrSML" }, {}, {})}</header> <main class="svelte-1bez8gb"> ${slots.default ? slots.default({}) : ``}</main> <footer class="svelte-1bez8gb" data-svelte-h="svelte-tzy7on"><p>Copyright of BetBigOrSML 2024</p> </footer>`;
});
export {
  Layout as default
};