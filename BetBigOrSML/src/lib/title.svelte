<script>
  let title = "BetBigOrSML";

  // Assuming you have a function to handle logout
  function logout() {
    // Clear session, token, or perform the necessary logout actions
    console.log("Logged out");
    // Redirect to home page or login page after logout
    window.location.href = '/';
  }
</script>

<div class="title">
  <img src="wabashWlogo.png" alt="site logo" />
  <h1>{title}</h1>
</div>

<div class="page_bar">
  <a href="home">Home</a>
  <p></p>

  <a href="/about">About Us</a>
  <p></p>

  <a href="/parlay">Parlays</a>
  <p></p>

  <a href="/history">History</a>
  <p></p>

  <a href="/players">Players</a>
  <p></p>

  <button on:click={logout}>Logout</button> <!-- Logout button -->
</div>

<style>
  .title {
    display: flex;
  }

  .title h1 {
    margin-left: 10px;
  }

  .page_bar {
    position: fixed;
    top: 0;
    right: 0;
    padding: 20px;
  }

  .page_bar button {
    margin-top: 10px;
    background-color: red;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  }

  .page_bar button:hover {
    background-color: darkred;
  }
</style>
