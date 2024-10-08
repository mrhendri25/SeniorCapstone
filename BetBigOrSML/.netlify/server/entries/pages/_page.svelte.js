import { c as create_ssr_component, e as escape } from "../../chunks/ssr.js";
const css = {
  code: ".index.svelte-11sibr5.svelte-11sibr5{text-align:center;display:block;font-size:larger}.football.svelte-11sibr5.svelte-11sibr5{display:flex;margin:20px auto}.football.svelte-11sibr5 img.svelte-11sibr5{border-radius:15px;object-fit:cover}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n  let pageTitle = \\"Home - BetBigOrSML\\";\\n<\/script>\\n\\n<svelte:head>\\n  <title>{pageTitle}</title>\\n</svelte:head>\\n\\n<div class=\\"index\\">\\n  <h1>Welcome</h1>\\n  <p>\\n    Hello everyone! Welcome to our website. Here you can look at many different\\n    NFL parlays, and use our software to check and see if any arbitrary bet has\\n    a good or bad chance of hitting. Happy betting!\\n  </p>\\n</div>\\n\\n<div class=\\"football\\">\\n  <img\\n    src=\\"tuff_aff_fball_flick.jpeg\\"\\n    width=\\"1080px\\"\\n    height=\\"540px\\"\\n    alt=\\"tuff ahh flick\\"\\n  />\\n</div>\\n\\n<style>\\n  .index {\\n    text-align: center;\\n    display: block;\\n    font-size: larger;\\n  }\\n\\n  .football {\\n    display: flex;\\n    margin: 20px auto;\\n  }\\n\\n  .football img {\\n    border-radius: 15px;\\n    object-fit: cover;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA2BE,oCAAO,CACL,UAAU,CAAE,MAAM,CAClB,OAAO,CAAE,KAAK,CACd,SAAS,CAAE,MACb,CAEA,uCAAU,CACR,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,IAAI,CAAC,IACf,CAEA,wBAAS,CAAC,kBAAI,CACZ,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,KACd"}'
};
let pageTitle = "Home - BetBigOrSML";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-lm5hoi_START -->${$$result.title = `<title>${escape(pageTitle)}</title>`, ""}<!-- HEAD_svelte-lm5hoi_END -->`, ""} <div class="index svelte-11sibr5" data-svelte-h="svelte-1qeg0ia"><h1>Welcome</h1> <p>Hello everyone! Welcome to our website. Here you can look at many different
    NFL parlays, and use our software to check and see if any arbitrary bet has
    a good or bad chance of hitting. Happy betting!</p></div> <div class="football svelte-11sibr5" data-svelte-h="svelte-v4ti5g"><img src="tuff_aff_fball_flick.jpeg" width="1080px" height="540px" alt="tuff ahh flick" class="svelte-11sibr5"> </div>`;
});
export {
  Page as default
};
