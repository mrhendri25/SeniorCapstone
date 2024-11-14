import { c as create_ssr_component, o as onDestroy, e as escape, b as add_attribute } from "../../chunks/ssr.js";
const css = {
  code: ".index.svelte-1u097ee{text-align:center;display:block;font-size:larger}img.svelte-1u097ee{max-width:100%;max-height:100%;height:100%;width:80%;object-fit:cover;border-radius:15px}.carousel.svelte-1u097ee{display:flex;justify-content:center;align-items:center;height:500px;overflow:hidden}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n  let pageTitle = \\"Home - BetBigOrSML\\";\\n\\n  import { onMount, onDestroy } from \\"svelte\\";\\n\\n  let images = [\\n    \\"https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1000w,f_auto,q_auto:best/rockcms/2024-01/240129-brock-purdy-al-0810-c942e4.jpg\\",\\n    \\"https://media-cldnry.s-nbcnews.com/image/upload/t_fit-560w,f_avif,q_auto:eco,dpr_2/rockcms/2024-04/patrick-mahomes-zz-240416-c0b6da.jpg\\",\\n    \\"https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-1968034361.jpg?c=16x9&q=h_833,w_1480,c_fill\\",\\n    \\"https://www.news10.com/wp-content/uploads/sites/64/2024/09/AP24268023437936.jpg?w=1280\\",\\n    \\"https://statico.profootballnetwork.com/wp-content/uploads/2024/10/16140254/anthony-richardson-injury-update-week-7-2024-1920x1280.jpg\\",\\n  ];\\n  let currentIndex = 0;\\n  let interval;\\n\\n  function nextImage() {\\n    currentIndex = (currentIndex + 1) % images.length;\\n  }\\n\\n  onMount(() => {\\n    interval = setInterval(nextImage, 3000);\\n  });\\n\\n  onDestroy(() => {\\n    clearInterval(interval);\\n  });\\n<\/script>\\n\\n<svelte:head>\\n  <title>{pageTitle}</title>\\n</svelte:head>\\n\\n<div class=\\"index\\">\\n  <h1>Welcome</h1>\\n  <p>\\n    Hello everyone! Welcome to our website. Here you can look at many different\\n    NFL parlays, and use our software to check and see if any arbitrary bet has\\n    a good or bad chance of hitting. Reminder, our algorithm is never 100%\\n    correct, but it does get pretty close! Happy betting!\\n  </p>\\n</div>\\n\\n<div class=\\"carousel\\">\\n  <!-- svelte-ignore a11y-img-redundant-alt -->\\n  <img src={images[currentIndex]} alt=\\"Carousel image\\" />\\n</div>\\n\\n<style>\\n  .index {\\n    text-align: center;\\n    display: block;\\n    font-size: larger;\\n  }\\n\\n  img {\\n    max-width: 100%;\\n    max-height: 100%;\\n    height: 100%;\\n    width: 80%;\\n    object-fit: cover;\\n    border-radius: 15px;\\n  }\\n\\n  .carousel {\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    height: 500px;\\n    overflow: hidden;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAgDE,qBAAO,CACL,UAAU,CAAE,MAAM,CAClB,OAAO,CAAE,KAAK,CACd,SAAS,CAAE,MACb,CAEA,kBAAI,CACF,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,GAAG,CACV,UAAU,CAAE,KAAK,CACjB,aAAa,CAAE,IACjB,CAEA,wBAAU,CACR,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,MAAM,CAAE,KAAK,CACb,QAAQ,CAAE,MACZ"}'
};
let pageTitle = "Home - BetBigOrSML";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let images = [
    "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1000w,f_auto,q_auto:best/rockcms/2024-01/240129-brock-purdy-al-0810-c942e4.jpg",
    "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-560w,f_avif,q_auto:eco,dpr_2/rockcms/2024-04/patrick-mahomes-zz-240416-c0b6da.jpg",
    "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-1968034361.jpg?c=16x9&q=h_833,w_1480,c_fill",
    "https://www.news10.com/wp-content/uploads/sites/64/2024/09/AP24268023437936.jpg?w=1280",
    "https://statico.profootballnetwork.com/wp-content/uploads/2024/10/16140254/anthony-richardson-injury-update-week-7-2024-1920x1280.jpg"
  ];
  let currentIndex = 0;
  let interval;
  onDestroy(() => {
    clearInterval(interval);
  });
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-lm5hoi_START -->${$$result.title = `<title>${escape(pageTitle)}</title>`, ""}<!-- HEAD_svelte-lm5hoi_END -->`, ""} <div class="index svelte-1u097ee" data-svelte-h="svelte-c79bhn"><h1>Welcome</h1> <p>Hello everyone! Welcome to our website. Here you can look at many different
    NFL parlays, and use our software to check and see if any arbitrary bet has
    a good or bad chance of hitting. Reminder, our algorithm is never 100%
    correct, but it does get pretty close! Happy betting!</p></div> <div class="carousel svelte-1u097ee"> <img${add_attribute("src", images[currentIndex], 0)} alt="Carousel image" class="svelte-1u097ee"> </div>`;
});
export {
  Page as default
};
