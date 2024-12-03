<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let title = "BetBigOrSML";
  let username = null; // Store the username
  let isLoggedIn = false; // Track the login status

  onMount(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // Decode or verify the token to extract username
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode the token
      username = payload.username;
      isLoggedIn = true;
    }
  });

  // Logout function to interact with the backend API
  async function logout() {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    // Call the backend logout endpoint
    const response = await fetch('http://localhost:4000/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token, // Include token in the Authorization header
      },
    });

    if (response.ok) {
      // Remove the token from localStorage upon successful logout
      localStorage.removeItem('token');

      // Update the frontend state
      username = null;
      isLoggedIn = false;

      console.log('Logged out successfully');

      // Redirect to the login page or home
      goto('/');
    } else {
      console.error('Failed to log out:', await response.text());
    }
  } catch (error) {
    console.error('An error occurred during logout:', error);
  }
}
</script>

<div class="title">
  <img src="wabashWlogo.png" alt="site logo" />
  <h1>{title}</h1>
  <div class="login-status">
    {#if isLoggedIn}
      Logged in as {username}
    {:else}
      Not logged in
    {/if}
  </div>
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
    align-items: center;
    justify-content: space-between;
  }

  .title img {
    height: 50px;
    margin-right: 10px;
  }

  .title h1 {
    margin: 0;
    font-size: 24px;
  }

  .login-status {
    position: fixed;
    top: 350px;
    right: 20px;
    font-size: 14px;
    color: rgb(246, 94, 94);
    margin-left: auto;
    padding-right: 20x;
  }

  .page_bar {
    position: fixed;
    top: 0;
    right: 0;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .page_bar a {
    text-decoration: none;
    color: rgb(246, 94, 94);
    margin-bottom: 10px;
    font-size: 16px;
  }

  .page_bar a:hover {
    color: #007BFF;
  }

  .page_bar button {
    position: fixed;
    top: 300px;
    right: 20px;
    margin-top: 10px;
    background-color: red;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    font-size: 16px;
  }

  .page_bar button:hover {
    background-color: darkred;
  }
</style>
