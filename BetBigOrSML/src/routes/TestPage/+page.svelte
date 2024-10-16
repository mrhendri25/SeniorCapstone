<script context="module">
    export async function load({ fetch }) {
        const playerName = 'Patrick Mahomes'; // Replace with a valid player name
        const response = await fetch(`/api/search-player?name=${playerName}`);

        if (!response.ok) {
            console.error(`Error fetching player data: ${response.status} ${response.statusText}`);
            return {
                status: response.status,
                error: new Error('Failed to fetch player data')
            };
        }

        const playerData = await response.json();

        // Log playerData to check if it's being fetched correctly
        console.log('Fetched Player Data:', playerData);

        return { props: { playerData } };
    }
</script>

<script>
    export let playerData;
</script>

<style>
    .container {
        padding: 20px;
        max-width: 600px;
        margin: 0 auto;
    }

    .player-data {
        margin-top: 20px;
        padding: 20px;
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
</style>

<div class="container">
    <h1>Player Stats</h1>

    {#if playerData}
        <div class="player-data">
            <h2>{playerData.player_display_name} ({playerData.player_name})</h2>
            <ul>
                <li><strong>Position:</strong> {playerData.position}</li>
                <li><strong>Recent Team:</strong> {playerData.recent_team}</li>
                <li><strong>Completions:</strong> {playerData.completions}</li>
                <li><strong>Attempts:</strong> {playerData.attempts}</li>
                <li><strong>Passing Yards:</strong> {playerData.passing_yards}</li>
                <li><strong>Passing Touchdowns:</strong> {playerData.passing_tds}</li>
                <li><strong>Interceptions:</strong> {playerData.interceptions}</li>
                <li><strong>Fantasy Points:</strong> {playerData.fantasy_points}</li>
                <!-- Add more stats as needed -->
            </ul>
        </div>
    {:else}
        <p>Loading player data...</p>
    {/if}
</div>
