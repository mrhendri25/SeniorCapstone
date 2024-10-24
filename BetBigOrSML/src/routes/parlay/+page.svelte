<script lang="ts">
  import { onMount } from 'svelte';

  // State to store NFL games data, team data, and selected week
  let games = [];
  let teams = {};
  let selectedWeek = 1; // Default to week 1
  let availableWeeks = []; // Array to store all weeks that have games

  // Fetch NFL games and team data on component mount
  onMount(async () => {
    try {
      const scheduleresponse = await fetch('http://localhost:5000/api/schedule');
      const teamdataresponse = await fetch('http://localhost:5000/api/teamdesc');
      const data = await scheduleresponse.json(); // Schedule data
      const teamData = await teamdataresponse.json(); // Team data

      games = data;

      // Create a map of team abbreviations to their logo URLs
      teams = teamData.reduce((acc, team) => {
        acc[team.team_abbr] = team.team_logo_wikipedia;
        return acc;
      }, {});

      // Extract available weeks from the games data
      availableWeeks = Array.from(new Set(games.map(game => game.week))).sort();

      // Find the next upcoming week where result is null (i.e., no winner yet)
      const nextUpcomingGame = games.find(game => game.result === null);
      if (nextUpcomingGame) {
        selectedWeek = nextUpcomingGame.week;
      }

    } catch (error) {
      console.error("Failed to fetch NFL schedule:", error);
    }
  });

  // Function to filter games based on the selected week
  function filterGamesByWeek(week) {
    return games.filter(game => game.week === week);
  }
</script>

<style>
  .game-card {
    border: 1px solid #ccc;
    padding: 0.4em; /* Reduced padding */
    margin-bottom: 0.4em; /* Reduced margin */
    border-radius: 5px; /* Reduced border radius */
    background-color: #f9f9f9;
    font-size: 0.85em; /* Slightly smaller font size */
  }
  .game-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .betting-section {
    display: flex;
    gap: 0.3em; /* Reduced gap */
    margin-bottom: 0.4em; /* Reduced margin below the betting section */
  }
  .bet-box {
    padding: 0.3em; /* Reduced padding */
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
    width: 70px; /* Reduced width */
    text-align: center; /* Center text in bet boxes */
  }
  .confidence-level {
    padding: 0.3em; /* Reduced padding */
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #e7f3fe;
    width: 70px; /* Reduced width */
    margin-bottom: 0.3em; /* Reduced space below confidence level box */
  }
  .week-selector {
    margin-bottom: 0.4em; /* Reduced margin */
    font-size: 0.85em; /* Slightly smaller font size */
  }
  .team-logo {
    width: 35px; /* Adjusted the size */
    height: auto;
  }
</style>

<!-- Main page layout -->
<h1>NFL Games of the Week</h1>

<!-- Week selector dropdown -->
<div class="week-selector">
  <label for="week">Select Week:</label>
  <select id="week" bind:value={selectedWeek}>
    {#each availableWeeks as week}
      <option value={week}>Week {week}</option>
    {/each}
  </select>
</div>

<!-- Display games of the selected week -->
{#if games.length === 0}
  <p>Loading NFL games...</p>
{:else}
  {#each filterGamesByWeek(selectedWeek) as game}
    <div class="game-card">
      <div class="game-details">
        <div>
          <h2>
            <img src={teams[game.home_team]} alt={game.home_team} class="team-logo" />
            <span>@ {game.home_team}</span>
            <span> vs </span>
            <img src={teams[game.away_team]} alt={game.away_team} class="team-logo" />
            <span>{game.away_team}</span>
          </h2>
          <p>{game.gameday} at {game.gametime}</p>
        </div>
        <div class="betting-section">
          <!-- Moneyline Section -->
          <div class="bet-box">
            <label>Moneyline</label>
            <p>H: {game.home_moneyline}</p>
            <p>A: {game.away_moneyline}</p>
          </div>
          <!-- Total Section -->
          <div class="bet-box">
            <label>Total</label>
            <p>O: {game.total_line}</p>
            <p>Odds: {game.over_odds} / {game.under_odds}</p>
          </div>
          <!-- Spread Section -->
          <div class="bet-box">
            <label>Spread</label>
            <p>H: {game.home_spread_odds}</p>
            <p>A: {game.away_spread_odds}</p>
          </div>
        </div>
        <!-- Confidence Levels Section -->
        <div class="betting-section">
          <div class="confidence-level">ML: 80%</div>
          <div class="confidence-level">Spread: 75%</div>
          <div class="confidence-level">Total: 85%</div>
        </div>
      </div>
    </div>
  {/each}
{/if}
