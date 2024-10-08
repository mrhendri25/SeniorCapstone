import { c as create_ssr_component, a as subscribe, e as escape, d as add_attribute, b as each } from "../../../chunks/ssr.js";
import { w as writable } from "../../../chunks/index.js";
const css = {
  code: "input.svelte-pla3sa{margin-bottom:1rem;padding:0.5rem;width:100%}ul.svelte-pla3sa{list-style:none;padding:0}li.svelte-pla3sa{padding:0.5rem;cursor:pointer;transition:background 0.3s}li.svelte-pla3sa:hover{background:#f0f0f0}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<!-- src/routes/Players.svelte -->\\n<script>\\n  let pageTitle = \\"Players - BetBigOrSML\\";\\n\\n  import { onMount } from \\"svelte\\";\\n  import { writable } from \\"svelte/store\\";\\n\\n  const players = writable([]);\\n  const searchTerm = writable(\\"\\");\\n  let filteredPlayers = [];\\n\\n  async function fetchPlayers() {\\n    return [\\n      { name: \\"Tom Brady\\", id: 1 },\\n      { name: \\"Aaron Rodgers\\", id: 2 },\\n      { name: \\"Patrick Mahomes\\", id: 3 },\\n      { name: \\"Derek Carr\\", id: 4 },\\n      { name: \\"Russell Wilson\\", id: 5 },\\n    ];\\n  }\\n\\n  onMount(async () => {\\n    players.set(await fetchPlayers());\\n  });\\n\\n  $: {\\n    const term = $searchTerm.toLowerCase();\\n    filteredPlayers = $players.filter((player) =>\\n      player.name.toLowerCase().includes(term)\\n    );\\n  }\\n<\/script>\\n\\n<svelte:head>\\n  <title>{pageTitle}</title>\\n</svelte:head>\\n\\n<h1>Search NFL Players</h1>\\n<input type=\\"text\\" placeholder=\\"Search players...\\" bind:value={$searchTerm} />\\n\\n<ul>\\n  {#each filteredPlayers as player}\\n    <li>\\n      <a href={`/players/${player.id}`}>{player.name}</a>\\n    </li>\\n  {/each}\\n</ul>\\n\\n<style>\\n  /* Add your styles here */\\n  input {\\n    margin-bottom: 1rem;\\n    padding: 0.5rem;\\n    width: 100%;\\n  }\\n\\n  ul {\\n    list-style: none;\\n    padding: 0;\\n  }\\n\\n  li {\\n    padding: 0.5rem;\\n    cursor: pointer;\\n    transition: background 0.3s;\\n  }\\n\\n  li:hover {\\n    background: #f0f0f0;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAkDE,mBAAM,CACJ,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,MAAM,CACf,KAAK,CAAE,IACT,CAEA,gBAAG,CACD,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,CACX,CAEA,gBAAG,CACD,OAAO,CAAE,MAAM,CACf,MAAM,CAAE,OAAO,CACf,UAAU,CAAE,UAAU,CAAC,IACzB,CAEA,gBAAE,MAAO,CACP,UAAU,CAAE,OACd"}'
};
let pageTitle = "Players - BetBigOrSML";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $players, $$unsubscribe_players;
  let $searchTerm, $$unsubscribe_searchTerm;
  const players = writable([]);
  $$unsubscribe_players = subscribe(players, (value) => $players = value);
  const searchTerm = writable("");
  $$unsubscribe_searchTerm = subscribe(searchTerm, (value) => $searchTerm = value);
  let filteredPlayers = [];
  $$result.css.add(css);
  {
    {
      const term = $searchTerm.toLowerCase();
      filteredPlayers = $players.filter((player) => player.name.toLowerCase().includes(term));
    }
  }
  $$unsubscribe_players();
  $$unsubscribe_searchTerm();
  return `  ${$$result.head += `<!-- HEAD_svelte-lm5hoi_START -->${$$result.title = `<title>${escape(pageTitle)}</title>`, ""}<!-- HEAD_svelte-lm5hoi_END -->`, ""} <h1 data-svelte-h="svelte-9qjjti">Search NFL Players</h1> <input type="text" placeholder="Search players..." class="svelte-pla3sa"${add_attribute("value", $searchTerm, 0)}> <ul class="svelte-pla3sa">${each(filteredPlayers, (player) => {
    return `<li class="svelte-pla3sa"><a${add_attribute("href", `/players/${player.id}`, 0)}>${escape(player.name)}</a> </li>`;
  })} </ul>`;
});
export {
  Page as default
};
