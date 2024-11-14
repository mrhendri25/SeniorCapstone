<script>
  let pageTitle = "News - BetBigOrSML";

  // Placeholder variables for articles data
  let teamArticles = [];
  let playerArticles = [];
  let bettingArticles = [];

  // Example placeholder data - replace this with your API response later
  teamArticles = [
    {
      title: "Team A vs Team B Preview",
      description: "An in-depth look at the upcoming matchup.",
    },
    {
      title: "Team C Injury Update",
      description: "Key players missing from Team C's lineup.",
    },
  ];

  playerArticles = [
    {
      title: "Player X Breaks Record",
      description: "Player X sets a new record for most yards in a season.",
    },
    {
      title: "Player Y Trade Rumors",
      description: "Latest news on potential trades involving Player Y.",
    },
  ];

  bettingArticles = [
    {
      title: "Best Bets for Week 1",
      description: "Here are the top picks for this week's NFL games.",
    },
    {
      title: "Parlay Strategies",
      description: "How to maximize your winnings with smart parlay bets.",
    },
  ];
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<main>
  <h1>NFL News</h1>

  <!-- Section for Team Articles -->
  <section>
    <h2>Team Articles</h2>
    <ul>
      {#each teamArticles as article}
        <li>
          <p>{article.description}</p>
        </li>
      {/each}
    </ul>
  </section>

  <!-- Section for Player Articles -->
  <section>
    <h2>Player Articles</h2>
    <ul>
      {#each playerArticles as article}
        <li>
          <p>{article.description}</p>
        </li>
      {/each}
    </ul>
  </section>

  <!-- Section for Betting Articles -->
  <section>
    <h2>Betting Articles</h2>
    <ul>
      {#each bettingArticles as article}
        <li>
          <p>{article.description}</p>
        </li>
      {/each}
    </ul>
  </section>
</main>

<style>
  /* Basic styling */
  section {
    margin-bottom: 2rem;
  }

  h2 {
    margin-bottom: 1rem;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 1rem;
  }

  p {
    margin: 0.5rem 0;
  }
</style>
