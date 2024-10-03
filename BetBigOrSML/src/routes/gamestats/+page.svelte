<script lang="ts">
  let pageTitle = "Statistics - BetBigOrSML";

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
    { team: "Team A", offenseRank: 5, defenseRank: 3 },
    { team: "Team B", offenseRank: 8, defenseRank: 6 },
  ];

  let dummyDataForVisualizations = [
    /* empty for now, to be used for future charts */
  ];
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<h1>NFL Betting Platform</h1>

<!-- Section: Upcoming NFL Matchups -->
<section>
  <h2>Upcoming NFL Matchups</h2>
  <ul>
    {#each upcomingGames as game}
      <li>
        <strong>{game.HomeTeam} vs {game.AwayTeam}</strong>
        - {new Date(game.Date).toLocaleDateString()}
        @ {game.Stadium}
      </li>
    {/each}
  </ul>
</section>

<!-- Section: Comparison Feature -->
<section>
  <h2>Team Comparison</h2>
  <table>
    <thead>
      <tr>
        <th>Team</th>
        <th>Offense Rank</th>
        <th>Defense Rank</th>
      </tr>
    </thead>
    <tbody>
      {#each comparisonTeams as team}
        <tr>
          <td>{team.team}</td>
          <td>{team.offenseRank}</td>
          <td>{team.defenseRank}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</section>

<!-- Section: Data Visualizations -->
<section>
  <h2>Data Visualization</h2>
  <p>
    This section will feature charts and graphs showing team performance,
    trends, and more.
  </p>
  <!-- Placeholder for future chart/graph components -->
  <div
    class="chart-placeholder"
    style="width:100%; height:300px; background-color:#eaeaea; display:flex; align-items:center; justify-content:center;"
  >
    <strong>Charts/Graphs will go here</strong>
  </div>
</section>

<style>
  section {
    margin-bottom: 2em;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background-color: #f2f2f2;
  }

  .chart-placeholder {
    margin-top: 1em;
  }
</style>
