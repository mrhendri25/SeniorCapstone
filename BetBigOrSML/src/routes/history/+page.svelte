<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  let userBets = [];
  let isLoggedIn = false;
  let username = "";

  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    if (token) {
      isLoggedIn = true;
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      username = decodedToken.username;
    } else {
      isLoggedIn = false;
      goto("/");
    }
  };

  const fetchUserBets = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/useroutput?username=${username}`
      );
      if (response.ok) {
        userBets = await response.json();
      } else {
        console.error("Failed to fetch user bet data");
      }
    } catch (error) {
      console.error("Error fetching user bet data:", error);
    }
  };

  onMount(() => {
    checkLoginStatus();
    if (isLoggedIn) {
      fetchUserBets();
    }
  });
</script>

<svelte:head>
  <title>Recent Bets - BetBigOrSML</title>
</svelte:head>

<div>
  {#if isLoggedIn}
    <h1 style="text-align: center;">Recent Bets For {username}</h1>
    <table class="bet-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Picks</th>
          <th>Wager Amount</th>
          <th>Total Odds</th>
          <th>Potential Payout</th>
        </tr>
      </thead>
      <tbody>
        {#each userBets as bet, index}
          <tr>
            <td>{index + 1}</td>
            <td>
              <ul>
                {#each bet.selections as selection}
                  <!-- <li>
                  <div>Your Bet: {selection.team} {selection.type}</div>
                  <div>Odds: {selection.line}</div>
              </li>   this was shown twice loser!-->
                  <li>
                    <div>
                      Your Bet: {selection.team}
                      {selection.type.replace(/_/g, " ")}
                    </div>
                    <div>Odds: {selection.line}</div>
                  </li>
                {/each}
              </ul>
            </td>
            <td>${bet.betPrice.toFixed(2)}</td>
            <td>{bet.totalOdds.toFixed(2)}</td>
            <td>${bet.potentialPayout.toFixed(2)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <p>You must be logged in to view this page. Redirecting...</p>
  {/if}
</div>

<style>
  .bet-table {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
    font-size: 20px;
    background-color: rgb(214, 208, 208);
  }

  .bet-table th,
  .bet-table td {
    border: 1px solid #ccc;
    text-align: left;
    padding: 8px;
  }

  .bet-table th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  .bet-table ul {
    margin: 0;
    padding-left: 20px;
    list-style: disc;
  }

  .bet-table ul li div {
    color: black;
  }
</style>
