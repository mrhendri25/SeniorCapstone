import { c as create_ssr_component, e as escape, b as each } from "../../../chunks/ssr.js";
const css = {
  code: "section.svelte-su4cro{margin-bottom:2em}table.svelte-su4cro{width:100%;border-collapse:collapse}th.svelte-su4cro,td.svelte-su4cro{border:1px solid #ddd;padding:8px}th.svelte-su4cro{background-color:#f2f2f2}.chart-placeholder.svelte-su4cro{margin-top:1em}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">\\n  let pageTitle = \\"Statistics - BetBigOrSML\\";\\n\\n  let upcomingGames = [];\\n\\n  async function fetchUpcomingGames() {\\n    try {\\n      const res = await fetch(\\"http://localhost:3000/api/nfl-schedule\\");\\n      if (!res.ok) {\\n        throw new Error(\\"Failed to fetch data\\");\\n      }\\n      upcomingGames = await res.json();\\n      console.log(\\"Fetched games:\\", upcomingGames);\\n    } catch (error) {\\n      console.error(\\"Error fetching upcoming games:\\", error);\\n    }\\n  }\\n\\n  fetchUpcomingGames();\\n\\n  let comparisonTeams = [\\n    { team: \\"Team A\\", offenseRank: 5, defenseRank: 3 },\\n    { team: \\"Team B\\", offenseRank: 8, defenseRank: 6 },\\n  ];\\n\\n  let dummyDataForVisualizations = [\\n    /* empty for now, to be used for future charts */\\n  ];\\n<\/script>\\n\\n<svelte:head>\\n  <title>{pageTitle}</title>\\n</svelte:head>\\n\\n<h1>NFL Betting Platform</h1>\\n\\n<!-- Section: Upcoming NFL Matchups -->\\n<section>\\n  <h2>Upcoming NFL Matchups</h2>\\n  <ul>\\n    {#each upcomingGames as game}\\n      <li>\\n        <strong>{game.HomeTeam} vs {game.AwayTeam}</strong>\\n        - {new Date(game.Date).toLocaleDateString()}\\n        @ {game.Stadium}\\n      </li>\\n    {/each}\\n  </ul>\\n</section>\\n\\n<!-- Section: Comparison Feature -->\\n<section>\\n  <h2>Team Comparison</h2>\\n  <table>\\n    <thead>\\n      <tr>\\n        <th>Team</th>\\n        <th>Offense Rank</th>\\n        <th>Defense Rank</th>\\n      </tr>\\n    </thead>\\n    <tbody>\\n      {#each comparisonTeams as team}\\n        <tr>\\n          <td>{team.team}</td>\\n          <td>{team.offenseRank}</td>\\n          <td>{team.defenseRank}</td>\\n        </tr>\\n      {/each}\\n    </tbody>\\n  </table>\\n</section>\\n\\n<!-- Section: Data Visualizations -->\\n<section>\\n  <h2>Data Visualization</h2>\\n  <p>\\n    This section will feature charts and graphs showing team performance,\\n    trends, and more.\\n  </p>\\n  <!-- Placeholder for future chart/graph components -->\\n  <div\\n    class=\\"chart-placeholder\\"\\n    style=\\"width:100%; height:300px; background-color:#eaeaea; display:flex; align-items:center; justify-content:center;\\"\\n  >\\n    <strong>Charts/Graphs will go here</strong>\\n  </div>\\n</section>\\n\\n<style>\\n  section {\\n    margin-bottom: 2em;\\n  }\\n\\n  table {\\n    width: 100%;\\n    border-collapse: collapse;\\n  }\\n\\n  th,\\n  td {\\n    border: 1px solid #ddd;\\n    padding: 8px;\\n  }\\n\\n  th {\\n    background-color: #f2f2f2;\\n  }\\n\\n  .chart-placeholder {\\n    margin-top: 1em;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA0FE,qBAAQ,CACN,aAAa,CAAE,GACjB,CAEA,mBAAM,CACJ,KAAK,CAAE,IAAI,CACX,eAAe,CAAE,QACnB,CAEA,gBAAE,CACF,gBAAG,CACD,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CACtB,OAAO,CAAE,GACX,CAEA,gBAAG,CACD,gBAAgB,CAAE,OACpB,CAEA,gCAAmB,CACjB,UAAU,CAAE,GACd"}'
};
let pageTitle = "Statistics - BetBigOrSML";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let upcomingGames = [];
  async function fetchUpcomingGames() {
    try {
      const res = await fetch("http://localhost:3000/api/nfl-schedule");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      upcomingGames = await res.json();
      console.log("Fetched games:", upcomingGames);
    } catch (error) {
      console.error("Error fetching upcoming games:", error);
    }
  }
  fetchUpcomingGames();
  let comparisonTeams = [
    {
      team: "Team A",
      offenseRank: 5,
      defenseRank: 3
    },
    {
      team: "Team B",
      offenseRank: 8,
      defenseRank: 6
    }
  ];
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-lm5hoi_START -->${$$result.title = `<title>${escape(pageTitle)}</title>`, ""}<!-- HEAD_svelte-lm5hoi_END -->`, ""} <h1 data-svelte-h="svelte-5pf52y">NFL Betting Platform</h1>  <section class="svelte-su4cro"><h2 data-svelte-h="svelte-190mxfj">Upcoming NFL Matchups</h2> <ul>${each(upcomingGames, (game) => {
    return `<li><strong>${escape(game.HomeTeam)} vs ${escape(game.AwayTeam)}</strong>
        - ${escape(new Date(game.Date).toLocaleDateString())}
        @ ${escape(game.Stadium)} </li>`;
  })}</ul></section>  <section class="svelte-su4cro"><h2 data-svelte-h="svelte-qxr17o">Team Comparison</h2> <table class="svelte-su4cro"><thead data-svelte-h="svelte-1ll38xt"><tr><th class="svelte-su4cro">Team</th> <th class="svelte-su4cro">Offense Rank</th> <th class="svelte-su4cro">Defense Rank</th></tr></thead> <tbody>${each(comparisonTeams, (team) => {
    return `<tr><td class="svelte-su4cro">${escape(team.team)}</td> <td class="svelte-su4cro">${escape(team.offenseRank)}</td> <td class="svelte-su4cro">${escape(team.defenseRank)}</td> </tr>`;
  })}</tbody></table></section>  <section class="svelte-su4cro" data-svelte-h="svelte-89w3c1"><h2>Data Visualization</h2> <p>This section will feature charts and graphs showing team performance,
    trends, and more.</p>  <div class="chart-placeholder svelte-su4cro" style="width:100%; height:300px; background-color:#eaeaea; display:flex; align-items:center; justify-content:center;"><strong>Charts/Graphs will go here</strong></div> </section>`;
});
export {
  Page as default
};
