<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let allGames = [];
    let weekGames = [];
    let parlay = [];
    let betId = Date.now();
    let selectedWeek = 1;
    let betPrice = '';
    let isLoggedIn = false;
    let username = '';
    let submittedBet = null;
    let displayType = {}; // Tracks display type (moneyline, spread, totals) for each game

    onMount(async () => {
        checkLoginStatus();
        if (isLoggedIn) {
            await fetchAllGames();
        }
    });

    const checkLoginStatus = () => {
        const token = localStorage.getItem('token');
        if (token) {
            isLoggedIn = true;
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            username = decodedToken.username;
        } else {
            isLoggedIn = false;
            goto('/'); // Redirect to login or home page
        }
    };

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

    function filterGamesByWeek() {
        weekGames = allGames.filter(game => game.week === selectedWeek);
        // Set default display type to moneyline for each game
        displayType = weekGames.reduce((acc, game) => {
            acc[game.game_id] = 'moneyline';
            return acc;
        }, {});
    }

    function changeDisplayType(gameId, type) {
        displayType[gameId] = type;
    }

    function toggleParlay(team, line, game, type) {
        const index = parlay.findIndex(pick => pick.game.game_id === game.game_id && pick.type === type);

        if (index === -1) {
            parlay = [...parlay, { team, line, game, type }];
            game.selected = type;
        } else {
            parlay = parlay.filter(pick => pick.game.game_id !== game.game_id || pick.type !== type);
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
            line: pick.line,
            gameId: pick.game.game_id,
            type: pick.type
        }));

        const betSlip = {
            betId,
            userId: username,
            betPrice: parseFloat(betPrice),
            selections
        };

        try {
            const response = await fetch('http://localhost:4000/api/input', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(betSlip)
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result.message);

                const totalOdds = parlay.reduce((acc, pick) => acc * (1 + pick.line / 100), 1);
                const potentialPayout = betSlip.betPrice * totalOdds;

                submittedBet = {
                    betPrice: betSlip.betPrice,
                    totalOdds: totalOdds.toFixed(2),
                    potentialPayout: potentialPayout.toFixed(2)
                };

                clearParlay();
                betId = Date.now();
                betPrice = '';
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

<svelte:head>
    <title>Betting - BetBigOrSML</title>
</svelte:head>

{#if isLoggedIn}
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
                    Location: {game.stadium} ({game.location})<br><br>

                    <select bind:value={displayType[game.game_id]} on:change={() => changeDisplayType(game.game_id, displayType[game.game_id])}>
                        <option value="moneyline">Moneyline</option>
                        <option value="spread">Spread</option>
                        <option value="totals">Totals</option>
                    </select>

                    {#if displayType[game.game_id] === 'moneyline'}
                        <button on:click={() => toggleParlay(game.away_team, game.away_moneyline, game, 'away_moneyline')}
                                class:selected={game.selected === 'away_moneyline'}>
                            {game.away_team} Moneyline: {game.away_moneyline}
                        </button>
                        <button on:click={() => toggleParlay(game.home_team, game.home_moneyline, game, 'home_moneyline')}
                                class:selected={game.selected === 'home_moneyline'}>
                            {game.home_team} Moneyline: {game.home_moneyline}
                        </button>
                    {/if}

                    {#if displayType[game.game_id] === 'spread'}
                        <button on:click={() => toggleParlay(game.away_team, game.away_spread_odds, game, 'away_spread')}
                                class:selected={game.selected === 'away_spread'}>
                            Spread {game.away_team} ({game.spread_line}): {game.away_spread_odds}
                        </button>
                        <button on:click={() => toggleParlay(game.home_team, game.home_spread_odds, game, 'home_spread')}
                                class:selected={game.selected === 'home_spread'}>
                            Spread {game.home_team} ({game.spread_line}): {game.home_spread_odds}
                        </button>
                    {/if}

                    {#if displayType[game.game_id] === 'totals'}
                        <button on:click={() => toggleParlay('Under', game.under_odds, game, 'under')}
                                class:selected={game.selected === 'under'}>
                            Under ({game.total_line}): {game.under_odds}
                        </button>
                        <button on:click={() => toggleParlay('Over', game.over_odds, game, 'over')}
                                class:selected={game.selected === 'over'}>
                            Over ({game.total_line}): {game.over_odds}
                        </button>
                    {/if}
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
                    Selected: <strong>{pick.team}</strong> | Line: {pick.line} ({pick.type})
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

    {#if submittedBet}
        <div class="bet-summary">
            <h3>Bet Summary</h3>
            <p><strong>Bet Amount:</strong> ${submittedBet.betPrice}</p>
            <p><strong>Total Odds:</strong> {submittedBet.totalOdds}</p>
            <p><strong>Potential Payout:</strong> ${submittedBet.potentialPayout}</p>
        </div>
    {/if}
{:else}
    <p>You must be logged in to view this page. Redirecting...</p>
{/if}

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
        background-color: rgb(246, 94, 94);
        text-align: center;
    }

    .game-item button {
        width: 100%;
        margin: 1px 0;
    }

    h1, h2 {
        text-align: center;
        color: #ffffff;
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

    .bet-summary {
        margin-top: 20px;
        text-align: center;
        padding: 10px;
        background-color: #000000;
        border-radius: 8px;
    }
</style>
