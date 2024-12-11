<script>
  import { goto } from "$app/navigation";
  import axios from "axios";

  let username = "";
  let password = "";
  let confirmPassword = "";
  let errorMessage = "";
  let successMessage = "";
  let isRegistering = false;

  // Handle login
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:4000/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);

      successMessage = "Login successful!";
      errorMessage = "";

      goto("/home");
    } catch (error) {
      errorMessage = "Invalid username or password";
      successMessage = "";
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      errorMessage = "Passwords do not match!";
      successMessage = "";
      return;
    }
    try {
      await axios.post("http://localhost:4000/register", {
        username,
        password,
      });
      successMessage = "Registration successful! You can now login.";
      errorMessage = "";
      isRegistering = false;
    } catch (error) {
      errorMessage = "Error registering user";
      successMessage = "";
    }
  };
</script>

<div class="form-container">
  {#if isRegistering}
    <h2>Register</h2>
    <input type="text" bind:value={username} placeholder="Username" />
    <input type="password" bind:value={password} placeholder="Password" />
    <input
      type="password"
      bind:value={confirmPassword}
      placeholder="Confirm Password"
    />
    <button on:click={handleRegister}>Register</button>
  {:else}
    <h2>Login</h2>
    <input type="text" bind:value={username} placeholder="Username" />
    <input type="password" bind:value={password} placeholder="Password" />
    <button on:click={handleLogin}>Login</button>
  {/if}

  {#if errorMessage}
    <p class="error">{errorMessage}</p>
  {/if}
  {#if successMessage}
    <p class="success">{successMessage}</p>
  {/if}

  <button on:click={() => (isRegistering = !isRegistering)}>
    {#if isRegistering}
      Already have an account? Login
    {:else}
      Don't have an account? Register
    {/if}
  </button>
</div>

<style>
  .form-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  button {
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border-color: rgb(255, 255, 255);
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #45a049;
  }
  .error {
    color: red;
    font-size: 14px;
  }
  .success {
    color: green;
    font-size: 14px;
  }
</style>
