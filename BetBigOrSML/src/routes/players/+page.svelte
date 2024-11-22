<script>
  let pageTitle = "Players - BetBigOrSML";

  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  const players = writable([]); // Store for all players' data
  const searchTerm = writable(""); // Store for search term input
  let filteredPlayers = []; // Array of filtered players
  let uniquePlayers = []; // Array of unique players
  let selectedPlayer = null; // Holds selected player's data
  let selectedPlayerStats = []; // Holds weekly stats for the selected player

  let leadingRusher = null; // Leading player in rushing yards
  let leadingPasser = null; // Leading player in passing yards
  let leadingReceiver = null; // Leading player in receiving yards

  // Fetch players' data from the backend for all positions
  async function fetchPlayers() {
    try {
      // Fetch data from all four APIs
      const qbResponse = await fetch("http://localhost:4000/api/qbweeklydata");
      const rbResponse = await fetch("http://localhost:4000/api/rbweeklydata");
      const teResponse = await fetch("http://localhost:4000/api/teweeklydata");
      const wrResponse = await fetch("http://localhost:4000/api/wrweeklydata");

      if (
        !qbResponse.ok ||
        !rbResponse.ok ||
        !teResponse.ok ||
        !wrResponse.ok
      ) {
        throw new Error("Network response was not ok");
      }

      // Parse the responses
      const qbData = await qbResponse.json();
      const rbData = await rbResponse.json();
      const teData = await teResponse.json();
      const wrData = await wrResponse.json();

      // Combine all player data into one array
      return [...qbData, ...rbData, ...teData, ...wrData];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  // Execute when the component is mounted
  onMount(async () => {
    const allPlayersData = await fetchPlayers();
    players.set(allPlayersData);

    // Extract unique players based on their player_id
    uniquePlayers = Array.from(
      new Map(
        allPlayersData.map((player) => [player.player_id, player])
      ).values()
    );

    // Calculate leading players
    calculateLeaders(allPlayersData);
  });

  // Calculate leading players based on stats
  function calculateLeaders(allPlayersData) {
    leadingRusher = allPlayersData.reduce(
      (prev, current) =>
        prev.rushing_yards > current.rushing_yards ? prev : current,
      allPlayersData[0]
    );
    leadingPasser = allPlayersData.reduce(
      (prev, current) =>
        prev.passing_yards > current.passing_yards ? prev : current,
      allPlayersData[0]
    );
    leadingReceiver = allPlayersData.reduce(
      (prev, current) =>
        prev.receiving_yards > current.receiving_yards ? prev : current,
      allPlayersData[0]
    );
  }

  // Filter players based on the search term
  $: {
    const term = $searchTerm.toLowerCase();
    filteredPlayers = uniquePlayers.filter((player) =>
      player.player_display_name.toLowerCase().includes(term)
    );
  }

  // Select player and get all weekly stats for that player
  function selectPlayer(player) {
    selectedPlayer = player; // Store basic player info
    selectedPlayerStats = $players.filter(
      (p) => p.player_id === player.player_id
    ); // Get all weekly stats for the selected player
  }

  // Clear the selected player and return to the player list
  function clearSelection() {
    selectedPlayer = null;
    selectedPlayerStats = [];
  }
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<h1>Search NFL Players</h1>
<input type="text" placeholder="Search players..." bind:value={$searchTerm} />

<!-- Leading Player Stats Display -->
<div class="leading-players">
  <div class="leading-player">
    <h2>Leading Rusher</h2>
    <p>
      {leadingRusher?.player_display_name || "N/A"} - {leadingRusher?.rushing_yards ||
        0} Yards
    </p>
  </div>
  <div class="leading-player">
    <h2>Leading Passer</h2>
    <p>
      {leadingPasser?.player_display_name || "N/A"} - {leadingPasser?.passing_yards ||
        0} Yards
    </p>
  </div>
  <div class="leading-player">
    <h2>Leading Receiver</h2>
    <p>
      {leadingReceiver?.player_display_name || "N/A"} - {leadingReceiver?.receiving_yards ||
        0} Yards
    </p>
  </div>
</div>

<!-- Show the player list only if the search term is not empty -->
{#if $searchTerm.length > 0}
  <ul>
    {#each filteredPlayers as player}
      <li>
        <a
          href="#{player.player_display_name}"
          on:click|preventDefault={() => selectPlayer(player)}
        >
          {player.player_display_name}
        </a>
      </li>
    {/each}
  </ul>
{/if}

<!-- Show player details with all weekly stats in a table if a player is selected -->
{#if selectedPlayer}
  <div class="player-details">
    <img
      src={selectedPlayer.headshot_url}
      alt={selectedPlayer.player_display_name}
      class="player-headshot"
    />
    <div class="player-info">
      <h2>{selectedPlayer.player_display_name}</h2>
      <p>Team: {selectedPlayer.recent_team}</p>
      <p>Position: {selectedPlayer.position}</p>

      <!-- Modify the stats table to display position-specific stats -->
      <table class="stats-table">
        <thead>
          <tr>
            <th>Week</th>
            <th>Opponent</th>
            <!-- Conditional columns based on the selected player's position -->
            {#if selectedPlayer.position_group === "QB"}
              <th>Completions / Attempts</th>
              <th>Passing Yards</th>
              <th>Passing TDs</th>
              <th>Interceptions</th>
              <th>Sacks</th>
            {/if}

            {#if selectedPlayer.position_group === "RB" || selectedPlayer.position_group === "WR" || selectedPlayer.position_group === "TE"}
              <th>Carries</th>
              <th>Rushing Yards</th>
              <th>Rushing TDs</th>
              <th>Receptions</th>
              <th>Receiving Yards</th>
              <th>Receiving TDs</th>
            {/if}

            <!-- Common columns for all positions -->
            <th>Fantasy Points</th>
          </tr>
        </thead>
        <tbody>
          {#each selectedPlayerStats as week}
            <tr>
              <td>{week.week}</td>
              <td>{week.opponent_team}</td>

              <!-- QB-specific stats -->
              {#if selectedPlayer.position_group === "QB"}
                <td>{week.completions} / {week.attempts}</td>
                <td>{week.passing_yards}</td>
                <td>{week.passing_tds}</td>
                <td>{week.interceptions}</td>
                <td>{week.sacks} (Yards lost: {week.sack_yards})</td>
              {/if}

              <!-- RB, WR, TE stats -->
              {#if selectedPlayer.position_group === "RB" || selectedPlayer.position_group === "WR" || selectedPlayer.position_group === "TE"}
                <td>{week.carries}</td>
                <td>{week.rushing_yards}</td>
                <td>{week.rushing_tds}</td>
                <td>{week.receptions}</td>
                <td>{week.receiving_yards}</td>
                <td>{week.receiving_tds}</td>
              {/if}

              <!-- Common stats -->
              <td>{week.fantasy_points.toFixed(2)}</td>
            </tr>
          {/each}
        </tbody>
      </table>

      <button on:click={clearSelection}>Back to player list</button>
    </div>
  </div>
{/if}

<style>
  input {
    margin-bottom: 1rem;
    padding: 0.5rem;
    width: 100%;
  }

  .leading-players {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .leading-player {
    flex: 1;
    padding: 1rem;
    background-color: #171414;
    border-radius: 5px;
    margin: 0 0.5rem;
    text-align: center;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    padding: 0.5rem;
    cursor: pointer;
    transition: background 0.3s;
  }

  li:hover {
    background: #f0f0f0;
  }

  .player-details {
    display: flex;
    align-items: flex-start;
    margin-top: 20px;
    padding: 20px;
    background-color: #171414;
    border-radius: 5px;
  }

  .player-headshot {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 20px;
  }

  .player-info {
    flex: 1;
  }

  .stats-table {
    margin-top: 1rem;
    width: 100%;
    border-collapse: collapse;
  }

  .stats-table th,
  .stats-table td {
    padding: 0.2rem;
    border: 1px solid #ddd;
    text-align: center;
  }

  .stats-table th {
    background-color: #eee;
  }

  .stats-table td {
    background-color: #fff;
  }
</style>
