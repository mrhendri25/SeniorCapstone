import { c as create_ssr_component, d as each, e as escape } from "../../../chunks/ssr.js";
const css = {
  code: ".matchup-container.svelte-1223i9x{position:fixed;bottom:0;left:0;right:0;background-color:#2b2b2b;color:white;padding:10px;display:flex;justify-content:space-around;flex-wrap:wrap;box-shadow:0 -2px 10px rgba(0, 0, 0, 0.5);z-index:1000}.matchup-box.svelte-1223i9x{background-color:#3b3b3b;border-radius:5px;padding:5px 10px;margin:5px;min-width:100px;text-align:center;box-shadow:0 1px 5px rgba(0, 0, 0, 0.3)}.week.svelte-1223i9x{font-weight:bold}.game.svelte-1223i9x{font-size:12px}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n    // Example of made-up upcoming matchups data\\n    let matchups = [\\n        { week: 1, games: ['Team A vs Team B', 'Team C vs Team D'] },\\n        { week: 2, games: ['Team E vs Team F', 'Team G vs Team H'] },\\n        { week: 3, games: ['Team I vs Team J', 'Team K vs Team L'] },\\n        // Add more weeks as needed\\n    ];\\n<\/script>\\n\\n<style>\\n    .matchup-container {\\n        position: fixed;\\n        bottom: 0;\\n        left: 0;\\n        right: 0;\\n        background-color: #2b2b2b;\\n        color: white;\\n        padding: 10px;\\n        display: flex;\\n        justify-content: space-around;\\n        flex-wrap: wrap;\\n        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.5);\\n        z-index: 1000;\\n    }\\n\\n    .matchup-box {\\n        background-color: #3b3b3b;\\n        border-radius: 5px;\\n        padding: 5px 10px;\\n        margin: 5px;\\n        min-width: 100px; /* Minimum width for the boxes */\\n        text-align: center;\\n        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);\\n    }\\n\\n    .week {\\n        font-weight: bold;\\n    }\\n\\n    .game {\\n        font-size: 12px; /* Smaller font size for games */\\n    }\\n</style>\\n\\n<div class=\\"matchup-container\\">\\n    {#each matchups as { week, games }}\\n        <div class=\\"matchup-box\\">\\n            <div class=\\"week\\">Week {week}</div>\\n            {#each games as game}\\n                <div class=\\"game\\">{game}</div>\\n            {/each}\\n        </div>\\n    {/each}\\n</div>\\n"],"names":[],"mappings":"AAWI,iCAAmB,CACf,QAAQ,CAAE,KAAK,CACf,MAAM,CAAE,CAAC,CACT,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,CAAC,CACR,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,KAAK,CACZ,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,YAAY,CAC7B,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,CAAC,CAAC,IAAI,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAC1C,OAAO,CAAE,IACb,CAEA,2BAAa,CACT,gBAAgB,CAAE,OAAO,CACzB,aAAa,CAAE,GAAG,CAClB,OAAO,CAAE,GAAG,CAAC,IAAI,CACjB,MAAM,CAAE,GAAG,CACX,SAAS,CAAE,KAAK,CAChB,UAAU,CAAE,MAAM,CAClB,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAC3C,CAEA,oBAAM,CACF,WAAW,CAAE,IACjB,CAEA,oBAAM,CACF,SAAS,CAAE,IACf"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let matchups = [
    {
      week: 1,
      games: ["Team A vs Team B", "Team C vs Team D"]
    },
    {
      week: 2,
      games: ["Team E vs Team F", "Team G vs Team H"]
    },
    {
      week: 3,
      games: ["Team I vs Team J", "Team K vs Team L"]
    }
  ];
  $$result.css.add(css);
  return `<div class="matchup-container svelte-1223i9x">${each(matchups, ({ week, games }) => {
    return `<div class="matchup-box svelte-1223i9x"><div class="week svelte-1223i9x">Week ${escape(week)}</div> ${each(games, (game) => {
      return `<div class="game svelte-1223i9x">${escape(game)}</div>`;
    })} </div>`;
  })}</div>`;
});
export {
  Page as default
};
