<!-- src/routes/players/[id].svelte -->
<script context="module">
  export async function load({ params }) {
    const playerId = params.id;

    try {
      const stats = await fetchPlayerStats(playerId);
      return {
        props: {
          stats,
        },
      };
    } catch (error) {
      console.error("Error fetching player stats:", error);
      return {
        props: {
          stats: { name: "Unknown Player", team: "", touchdowns: 0 },
        },
      };
    }
  }

  async function fetchPlayerStats(id) {
    const mockStats = {
      1: { name: "Tom Brady", team: "Tampa Bay Buccaneers", touchdowns: 600 },
      2: { name: "Aaron Rodgers", team: "Green Bay Packers", touchdowns: 400 },
      3: {
        name: "Patrick Mahomes",
        team: "Kansas City Chiefs",
        touchdowns: 150,
      },
      4: { name: "Derek Carr", team: "New Orleans Saints", touchdowns: 200 },
      5: { name: "Russell Wilson", team: "Denver Broncos", touchdowns: 250 },
    };

    if (!mockStats[id]) {
      throw new Error("Player not found");
    }
    return mockStats[id];
  }
</script>

<script>
  export let stats;
</script>

<h1>{stats.name}</h1>
<p>Team: {stats.team}</p>
<p>Touchdowns: {stats.touchdowns}</p>

<a href="/players">Back to Players List</a>
