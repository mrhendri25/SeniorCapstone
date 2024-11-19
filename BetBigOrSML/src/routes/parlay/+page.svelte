<script>
    import { onMount } from 'svelte';

    let allGames = [];
    let weekGames = [];
    let parlay = [];
    let betId = Date.now();
    let userOutputs = [];
    let selectedWeek = 1; // Default to Week 1
    let betPrice = ''; // New variable for user input

    onMount(async () => {
        // Fetch all games data
        await fetchAllGames();
        // Fetch user output data
        await fetchUserOutput();
    });

    async function fetchAllGames() {
        try {
            const response = await fetch('http://localhost:4000/api/schedule');
            if (response.ok) {
                const data = await response.json();
                allGames = data.map(game => ({ ...game, selected: null }));
                filterGamesByWeek();
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
                userOutputs = await response.json();
            } else {
                console.error('Failed to fetch user output data');
            }
        } catch (error) {
            console.error('Error fetching user output:', error);
        }
    }

    function filterGamesByWeek() {
        weekGames = allGames.filter(game => game.week === selectedWeek);
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
        if (!betPrice || isNaN(betPrice) || parseFloat(betPrice) <= 0) {
            alert('Please enter a valid bet amount');
            return;
        }

        const selections = parlay.map(pick => ({
            team: pick.team,
            moneyline: pick.moneyline,
            gameId: pick.game.game_id
        }));

        const betSlip = {
            betId,
            userId: 'exampleUser123', // Replace with actual user ID if available
            betPrice: parseFloat(betPrice), // Include bet amount
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
                parlay = [];
                weekGames = weekGames.map(game => ({ ...game, selected: null }));
                betId = Date.now();
                betPrice = ''; // Clear the bet amount input after submission
            } else {
                console.error('Failed to submit parlay');
            }
        } catch (error) {
            console.error('Error submitting parlay:', error);
        }
    }

    function clearParlay() {
        parlay = [];
        weekGames = weekGames.map(game => ({ ...game, selected: null }));
    }
</script>

<style>
    .selected {
        background-color: lightgreen;
    }

    .game-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        padding: 20px;
    }

    .game-item {
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 8px;
        background-color: #ffffff;
        text-align: center;
    }

    .game-item button {
        width: 100%;
        margin: 1px 0;
    }

    h1, h2 {
        text-align: center;
    }

    select {
        margin: 10px auto;
        display: block;
        padding: 5px;
        font-size: 16px;
    }

    .bet-amount-container {
        margin-top: 10px;
        text-align: center;
    }

    .bet-amount-container input {
        padding: 5px;
        font-size: 16px;
        margin-right: 10px;
    }
</style>

<h1>Matchups with Betting Lines</h1>

<select bind:value={selectedWeek} on:change={filterGamesByWeek}>
    {#each Array.from({ length: 18 }, (_, i) => i + 1) as week}
        <option value={week}>Week {week}</option>
    {/each}
</select>

{#if weekGames.length > 0}
    <div class="game-grid">
        {#each weekGames as game}
            <div class="game-item">
                <strong>{game.away_team}</strong> vs. <strong>{game.home_team}</strong><br>
                Date: {game.gameday} | Time: {game.gametime}<br>
                Location: {game.stadium} ({game.location})<br>
                <br>
                <strong>Betting Lines:</strong><br>
                <button 
                    on:click={() => toggleParlay(game.away_team, game.away_moneyline, game, 'away')}
                    class:selected={game.selected === 'away'}>
                    {game.away_team}: {game.away_moneyline}
                </button>
                <button 
                    on:click={() => toggleParlay(game.home_team, game.home_moneyline, game, 'home')}
                    class:selected={game.selected === 'home'}>
                    {game.home_team}: {game.home_moneyline}
                </button>
            </div>
        {/each}
    </div>
{:else}
    <p>Loading games for Week {selectedWeek}...</p>
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
    <div class="bet-amount-container">
        <input type="number" bind:value={betPrice} placeholder="Enter bet amount" min="1" />
        <button on:click={clearParlay}>Clear Parlay</button>
        <button on:click={submitParlay}>Submit Parlay</button>
    </div>
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
                Total Odds: {output.totalOdds}<br>
                Bet Amount: {output.betPrice}<br>
                Potential Payout: {output.potentialPayout}<br>
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
