<!-- src/routes/Players.svelte -->
<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { goto } from '$app/navigation'; // Import the goto function for programmatic navigation

  const players = writable([]);
  const searchTerm = writable('');
  let filteredPlayers = [];

  async function fetchPlayers() {
    return [
      { name: 'Tom Brady', id: 1 },
      { name: 'Aaron Rodgers', id: 2 },
      { name: 'Patrick Mahomes', id: 3 },
      { name: 'Derek Carr', id: 4 },
      { name: 'Russell Wilson', id: 5 },
    ];
  }

  onMount(async () => {
    players.set(await fetchPlayers());
  });

  $: {
    const term = $searchTerm.toLowerCase();
    filteredPlayers = $players.filter(player => 
      player.name.toLowerCase().includes(term)
    );
  }

  function navigateToPlayer(playerId) {
    goto(`/players/${playerId}`); // This will ensure client-side routing
  }

  function handlePlayerClick(player) {
    navigateToPlayer(player.id);
  }
</script>

<style>
  /* Add your styles here */
  input {
    margin-bottom: 1rem;
    padding: 0.5rem;
    width: 100%;
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
</style>

<h1>Search NFL Players</h1>
<input type="text" placeholder="Search players..." bind:value={$searchTerm} />

<ul>
  {#each filteredPlayers as player}
    <li on:click={() => handlePlayerClick(player)}>
      {player.name}
    </li>
  {/each}
</ul>
