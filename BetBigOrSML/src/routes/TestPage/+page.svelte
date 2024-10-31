<script>
  // Example of made-up upcoming matchups data
  let matchups = [
    { week: 1, games: ["Team A vs Team B", "Team C vs Team D"] },
    { week: 2, games: ["Team E vs Team F", "Team G vs Team H"] },
    { week: 3, games: ["Team I vs Team J", "Team K vs Team L"] },
    // Add more weeks as needed
  ];
</script>

<div class="matchup-container">
  {#each matchups as { week, games }}
    <div class="matchup-box">
      <div class="week">Week {week}</div>
      {#each games as game}
        <div class="game">{game}</div>
      {/each}
    </div>
  {/each}
</div>

<style>
  .matchup-container {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #2b2b2b;
    color: white;
    padding: 10px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }

  .matchup-box {
    background-color: #3b3b3b;
    border-radius: 5px;
    padding: 5px 10px;
    margin: 5px;
    min-width: 100px; /* Minimum width for the boxes */
    text-align: center;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
  }

  .week {
    font-weight: bold;
  }

  .game {
    font-size: 12px; /* Smaller font size for games */
  }
</style>
