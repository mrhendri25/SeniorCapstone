<script>
    // Sample data for recent bets (replace this with actual API call)
    let recentBets = [
      {
        picks: ["Team A vs Team B: Team A", "Team C vs Team D: Team D"],
        odds: "+350",
        potentialPayout: "$500",
        result: "Win"
      },
      {
        picks: ["Team E vs Team F: Team F", "Team G vs Team H: Team G"],
        odds: "+200",
        potentialPayout: "$300",
        result: "Loss"
      },
      {
        picks: ["Team I vs Team J: Team J"],
        odds: "+150",
        potentialPayout: "$150",
        result: "Win"
      }
    ];
  </script>
  
  <style>
    .bet-table {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      border-collapse: collapse;
      font-family: Arial, sans-serif;
      font-size: 14px;
    }
  
    .bet-table th, .bet-table td {
      border: 1px solid #ccc;
      text-align: left;
      padding: 8px;
    }
  
    .bet-table th {
      background-color: #f2f2f2;
      font-weight: bold;
    }
  
    .bet-table .result {
      font-weight: bold;
      color: white;
      text-align: center;
      padding: 4px 8px;
      border-radius: 4px;
    }
  
    .bet-table .result.win {
      background-color: green;
    }
  
    .bet-table .result.loss {
      background-color: red;
    }
  
    .bet-table ul {
      margin: 0;
      padding-left: 20px;
      list-style: disc;
    }
  </style>
  
  <div>
    <h1 style="text-align: center;">Recent Bets</h1>
    <table class="bet-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Picks</th>
          <th>Odds</th>
          <th>Potential Payout</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        {#each recentBets as bet, index}
          <tr>
            <td>{index + 1}</td>
            <td>
              <ul>
                {#each bet.picks as pick}
                  <li>{pick}</li>
                {/each}
              </ul>
            </td>
            <td>{bet.odds}</td>
            <td>{bet.potentialPayout}</td>
            <td>
              <span class="result {bet.result.toLowerCase()}">{bet.result}</span>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  