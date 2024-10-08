import { c as create_ssr_component, e as escape, b as each } from "../../../chunks/ssr.js";
const css = {
  code: "section.svelte-1py1c5c{margin-bottom:2rem}h2.svelte-1py1c5c{margin-bottom:1rem}ul.svelte-1py1c5c{list-style-type:none;padding:0}li.svelte-1py1c5c{margin-bottom:1rem}a.svelte-1py1c5c{font-weight:bold;color:#2c3e50;text-decoration:none}a.svelte-1py1c5c:hover{text-decoration:underline}p.svelte-1py1c5c{margin:0.5rem 0}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n  let pageTitle = \\"News - BetBigOrSML\\";\\n\\n  // Placeholder variables for articles data\\n  let teamArticles = [];\\n  let playerArticles = [];\\n  let bettingArticles = [];\\n\\n  // Example placeholder data - replace this with your API response later\\n  teamArticles = [\\n    {\\n      title: \\"Team A vs Team B Preview\\",\\n      description: \\"An in-depth look at the upcoming matchup.\\",\\n    },\\n    {\\n      title: \\"Team C Injury Update\\",\\n      description: \\"Key players missing from Team C's lineup.\\",\\n    },\\n  ];\\n\\n  playerArticles = [\\n    {\\n      title: \\"Player X Breaks Record\\",\\n      description: \\"Player X sets a new record for most yards in a season.\\",\\n    },\\n    {\\n      title: \\"Player Y Trade Rumors\\",\\n      description: \\"Latest news on potential trades involving Player Y.\\",\\n    },\\n  ];\\n\\n  bettingArticles = [\\n    {\\n      title: \\"Best Bets for Week 1\\",\\n      description: \\"Here are the top picks for this week's NFL games.\\",\\n    },\\n    {\\n      title: \\"Parlay Strategies\\",\\n      description: \\"How to maximize your winnings with smart parlay bets.\\",\\n    },\\n  ];\\n<\/script>\\n\\n<svelte:head>\\n  <title>{pageTitle}</title>\\n</svelte:head>\\n\\n<main>\\n  <h1>NFL News</h1>\\n\\n  <!-- Section for Team Articles -->\\n  <section>\\n    <h2>Team Articles</h2>\\n    <ul>\\n      {#each teamArticles as article}\\n        <li>\\n          <a href=\\"#\\">{article.title}</a>\\n          <p>{article.description}</p>\\n        </li>\\n      {/each}\\n    </ul>\\n  </section>\\n\\n  <!-- Section for Player Articles -->\\n  <section>\\n    <h2>Player Articles</h2>\\n    <ul>\\n      {#each playerArticles as article}\\n        <li>\\n          <a href=\\"#\\">{article.title}</a>\\n          <p>{article.description}</p>\\n        </li>\\n      {/each}\\n    </ul>\\n  </section>\\n\\n  <!-- Section for Betting Articles -->\\n  <section>\\n    <h2>Betting Articles</h2>\\n    <ul>\\n      {#each bettingArticles as article}\\n        <li>\\n          <a href=\\"#\\">{article.title}</a>\\n          <p>{article.description}</p>\\n        </li>\\n      {/each}\\n    </ul>\\n  </section>\\n</main>\\n\\n<style>\\n  /* Basic styling */\\n  section {\\n    margin-bottom: 2rem;\\n  }\\n\\n  h2 {\\n    margin-bottom: 1rem;\\n  }\\n\\n  ul {\\n    list-style-type: none;\\n    padding: 0;\\n  }\\n\\n  li {\\n    margin-bottom: 1rem;\\n  }\\n\\n  a {\\n    font-weight: bold;\\n    color: #2c3e50;\\n    text-decoration: none;\\n  }\\n\\n  a:hover {\\n    text-decoration: underline;\\n  }\\n\\n  p {\\n    margin: 0.5rem 0;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA4FE,sBAAQ,CACN,aAAa,CAAE,IACjB,CAEA,iBAAG,CACD,aAAa,CAAE,IACjB,CAEA,iBAAG,CACD,eAAe,CAAE,IAAI,CACrB,OAAO,CAAE,CACX,CAEA,iBAAG,CACD,aAAa,CAAE,IACjB,CAEA,gBAAE,CACA,WAAW,CAAE,IAAI,CACjB,KAAK,CAAE,OAAO,CACd,eAAe,CAAE,IACnB,CAEA,gBAAC,MAAO,CACN,eAAe,CAAE,SACnB,CAEA,gBAAE,CACA,MAAM,CAAE,MAAM,CAAC,CACjB"}`
};
let pageTitle = "News - BetBigOrSML";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let teamArticles = [];
  let playerArticles = [];
  let bettingArticles = [];
  teamArticles = [
    {
      title: "Team A vs Team B Preview",
      description: "An in-depth look at the upcoming matchup."
    },
    {
      title: "Team C Injury Update",
      description: "Key players missing from Team C's lineup."
    }
  ];
  playerArticles = [
    {
      title: "Player X Breaks Record",
      description: "Player X sets a new record for most yards in a season."
    },
    {
      title: "Player Y Trade Rumors",
      description: "Latest news on potential trades involving Player Y."
    }
  ];
  bettingArticles = [
    {
      title: "Best Bets for Week 1",
      description: "Here are the top picks for this week's NFL games."
    },
    {
      title: "Parlay Strategies",
      description: "How to maximize your winnings with smart parlay bets."
    }
  ];
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-lm5hoi_START -->${$$result.title = `<title>${escape(pageTitle)}</title>`, ""}<!-- HEAD_svelte-lm5hoi_END -->`, ""} <main><h1 data-svelte-h="svelte-rfi5hj">NFL News</h1>  <section class="svelte-1py1c5c"><h2 class="svelte-1py1c5c" data-svelte-h="svelte-iotczq">Team Articles</h2> <ul class="svelte-1py1c5c">${each(teamArticles, (article) => {
    return `<li class="svelte-1py1c5c"><a href="#" class="svelte-1py1c5c">${escape(article.title)}</a> <p class="svelte-1py1c5c">${escape(article.description)}</p> </li>`;
  })}</ul></section>  <section class="svelte-1py1c5c"><h2 class="svelte-1py1c5c" data-svelte-h="svelte-sya79m">Player Articles</h2> <ul class="svelte-1py1c5c">${each(playerArticles, (article) => {
    return `<li class="svelte-1py1c5c"><a href="#" class="svelte-1py1c5c">${escape(article.title)}</a> <p class="svelte-1py1c5c">${escape(article.description)}</p> </li>`;
  })}</ul></section>  <section class="svelte-1py1c5c"><h2 class="svelte-1py1c5c" data-svelte-h="svelte-1jic414">Betting Articles</h2> <ul class="svelte-1py1c5c">${each(bettingArticles, (article) => {
    return `<li class="svelte-1py1c5c"><a href="#" class="svelte-1py1c5c">${escape(article.title)}</a> <p class="svelte-1py1c5c">${escape(article.description)}</p> </li>`;
  })}</ul></section> </main>`;
});
export {
  Page as default
};
