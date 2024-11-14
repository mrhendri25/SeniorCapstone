<script>
  import { onMount } from 'svelte';

  let week9Games = [];
  let parlay = [];
  let betId = Date.now(); // Unique bet ID for each submission (timestamp-based)
  let userOutputs = []; // Array to hold user output data

  onMount(async () => {
      // Fetch Week 9 games
      await fetchWeek9Games();
      // Fetch user output data
      await fetchUserOutput();
  });

  async function fetchWeek9Games() {
      try {
          const response = await fetch('http://localhost:4000/api/schedule');
          if (response.ok) {
              const data = await response.json();
              // Change filtering to Week 9 games
              week9Games = data.filter(game => game.week === 11).map(game => ({
                  ...game,
                  selected: null
              }));
          } else {
              console.error('Failed to fetch schedule data');
          }
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  }

  async function fetchUserOutput() {
      try {
          const response = await fetch('http://localhost:4000/api/useroutput');
          if (response.ok) {
              userOutputs = await response.json(); // Store the user output data
          } else {
              console.error('Failed to fetch user output data');
          }
      } catch (error) {
          console.error('Error fetching user output:', error);
      }
  }

  function toggleParlay(team, moneyline, game, type) {
      const index = parlay.findIndex(pick => pick.game.game_id === game.game_id);

      if (index === -1) {
          parlay = [...parlay, { team, moneyline, game }];
          game.selected = type;
      } else if (parlay[index].team !== team) {
          parlay[index] = { team, moneyline, game };
          game.selected = type;
      } else {
          parlay = parlay.filter(pick => pick.game.game_id !== game.game_id);
          game.selected = null;
      }
  }

  async function submitParlay() {
      const selections = parlay.map(pick => ({
          team: pick.team,
          moneyline: pick.moneyline,
          gameId: pick.game.game_id
      }));

      const betSlip = {
          betId,
          userId: 'exampleUser123', // Use a real user ID in production
          selections
      };

      try {
          const response = await fetch('http://localhost:4000/api/input', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(betSlip)
          });

          if (response.ok) {
              const result = await response.json();
              console.log(result.message);
              // Reset parlay and betId for the next bet slip
              parlay = [];
              week9Games = week9Games.map(game => ({ ...game, selected: null }));
              betId = Date.now(); // Update betId for the next slip
          } else {
              console.error('Failed to submit parlay');
          }
      } catch (error) {
          console.error('Error submitting parlay:', error);
      }
  }

  function clearParlay() {
      parlay = [];
      week9Games = week9Games.map(game => ({ ...game, selected: null }));
  }
</script>

<style>
  .selected {
      background-color: lightgreen;
  }

  /* CSS Grid styling for games */
  .game-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr); /* 3 columns */
      gap: 20px; /* Space between items */
      padding: 20px;
  }

  .game-item {
      border: 1px solid #ccc;
      padding: 10px;
      border-radius: 8px;
      background-color: #ffffff;
      text-align: center;
  }

  /* Ensure the buttons inside the games fit the layout */
  .game-item button {
      width: 100%;
      margin: 1px 0;
  }

  h1, h2 {
      text-align: center;
  }
</style>

<h1>Week 9 Matchups with Betting Lines</h1>

{#if week9Games.length > 0}
  <div class="game-grid">
      {#each week9Games as game}
          <div class="game-item">
              <strong>{game.away_team}</strong> vs. <strong>{game.home_team}</strong><br>
              Date: {game.gameday} | Time: {game.gametime}<br>
              Location: {game.stadium} ({game.location})<br>
              <br>
              <strong>Betting Lines:</strong><br>
              <button 
                  on:click={() => toggleParlay(game.away_team, game.away_moneyline, game, 'away')}
                  class:selected={game.selected === 'away'}>
                  Away Moneyline: {game.away_moneyline}
              </button>
              <button 
                  on:click={() => toggleParlay(game.home_team, game.home_moneyline, game, 'home')}
                  class:selected={game.selected === 'home'}>
                  Home Moneyline: {game.home_moneyline}
              </button>
          </div>
      {/each}
  </div>
{:else}
  <p>Loading Week 9 games...</p>
{/if}

<h2>Your Parlay</h2>

{#if parlay.length > 0}
  <ul>
      {#each parlay as pick}
          <li>
              Game: {pick.game.away_team} vs. {pick.game.home_team}<br>
              Selected Team: <strong>{pick.team}</strong> | Moneyline: {pick.moneyline}
          </li>
      {/each}
  </ul>
  <button on:click={clearParlay}>Clear Parlay</button>
  <button on:click={submitParlay}>Submit Parlay</button>
{:else}
  <p>No selections added to your parlay yet.</p>
{/if}

<h2>User Output Data</h2>

{#if userOutputs.length > 0}
  <ul>
      {#each userOutputs as output}
          <li>
              Bet ID: {output.betId}<br>
              User ID: {output.userId}<br>
              Total Odds:{output.totalOdds}<br>
              Bet Amount:{output.betAmount}<br>
              Potential Payout:{output.potentialPayout}
              Selections: 
              <ul>
                  {#each output.selections as selection}
                      <li>{selection.team} (Moneyline: {selection.moneyline}, Game ID: {selection.gameId})</li>
                  {/each}
              </ul>
          </li>
      {/each}
  </ul>
{:else}
  <p>No user output data available.</p>
{/if}
