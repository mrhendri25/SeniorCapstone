import { c as create_ssr_component, e as escape } from "../../../../chunks/ssr.js";
async function load({ params }) {
  const playerId = params.id;
  try {
    const stats = await fetchPlayerStats(playerId);
    return { props: { stats } };
  } catch (error) {
    console.error("Error fetching player stats:", error);
    return {
      props: {
        stats: {
          name: "Unknown Player",
          team: "",
          touchdowns: 0
        }
      }
    };
  }
}
async function fetchPlayerStats(id) {
  const mockStats = {
    1: {
      name: "Tom Brady",
      team: "Tampa Bay Buccaneers",
      touchdowns: 600
    },
    2: {
      name: "Aaron Rodgers",
      team: "Green Bay Packers",
      touchdowns: 400
    },
    3: {
      name: "Patrick Mahomes",
      team: "Kansas City Chiefs",
      touchdowns: 150
    },
    4: {
      name: "Derek Carr",
      team: "New Orleans Saints",
      touchdowns: 200
    },
    5: {
      name: "Russell Wilson",
      team: "Denver Broncos",
      touchdowns: 250
    }
  };
  if (!mockStats[id]) {
    throw new Error("Player not found");
  }
  return mockStats[id];
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stats } = $$props;
  if ($$props.stats === void 0 && $$bindings.stats && stats !== void 0) $$bindings.stats(stats);
  return `   <h1>${escape(stats.name)}</h1> <p>Team: ${escape(stats.team)}</p> <p>Touchdowns: ${escape(stats.touchdowns)}</p> <a href="/players" data-svelte-h="svelte-tv773x">Back to Players List</a>`;
});
export {
  Page as default,
  load
};
