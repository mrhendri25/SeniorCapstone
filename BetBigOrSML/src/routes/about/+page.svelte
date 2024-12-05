<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  let pageTitle = "About - BetBigOrSML";
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
      goto("/"); // Redirect to login or home page
    }
  };

  onMount(() => {
    checkLoginStatus(); // Check login status on mount
  });
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<div>
  {#if isLoggedIn}
    <div class="about">
      <h1>About Us</h1>
      <p>
        Hello everyone and thank you so much for using our website! Here, we
        wanted to share a little about ourselves along with our resumes. The
        name 'BetBigOrSML' comes from our names combined into one acronym that
        sounds like the word small. We hope you enjoy and any feedback is
        welcome!
      </p>
    </div>

    <div class="profile-container">
      <div class="profile">
        <img
          src="Hendrick_Matthew25_2024.jpg"
          width="317px"
          height="480px"
          alt="Matthew-Hendrick-Head-Shot"
        />
        <div class="bio">
          <a
            data-sveltekit-reload
            href="https://www.linkedin.com/in/matthew-hendrick22"
            target="_blank">Matthew Hendrick</a
          >
          <p>
            Hello! My name is Matthew Hendrick and I am a senior at Wabash
            College majoring in computer science. Some of my interests include
            front-end development, cybersecurity, and algorithms. I hope you
            enjoy the website!
          </p>
          <a
            data-sveltekit-reload
            href="https://github.com/mrhendri25"
            target="_blank"
          >
            <img src="25231.png" width="30px" height="30px" alt="GH" />
          </a>

          <a
            data-sveltekit-reload
            href="https://x.com/matthendrick22"
            target="_blank"
          >
            <img src="xLogo.png" width="30px" height="30px" alt="X" />
          </a>
          <a
            data-sveltekit-reload
            href="https://www.linkedin.com/in/matthew-hendrick22/"
            target="_blank"
          >
            <img src="61109.png" width="30px" height="30px" alt="LI" />
          </a>
        </div>
      </div>

      <div class="profile">
        <img
          src="DiFilippo_Luka25_2024_1.jpg"
          width="317px"
          height="480px"
          alt="Luka-DiFilippo-Head-Shot"
        />
        <div class="bio">
          <a
            data-sveltekit-reload
            href="https://www.linkedin.com/in/lukadifilippo/"
            target="_blank">Luka DiFilippo</a
          >
          <p>
            Hello! My name is Luka DiFilippo. I am a computer science major and
            an Asian Studies minor. I plan on going into the quantitative
            finance field after graduation. I am an NCAA athlete and play
            lacrosse.
          </p>
          <a
            data-sveltekit-reload
            href="https://github.com/lukad11"
            target="_blank"
          >
            <img src="25231.png" width="30px" height="30px" alt="GH" />
          </a>

          <a data-sveltekit-reload href="https://x.com/POTUS" target="_blank">
            <img src="xLogo.png" width="30px" height="30px" alt="X" />
          </a>
          <a
            data-sveltekit-reload
            href="https://www.linkedin.com/in/lukadifilippo/"
            target="_blank"
          >
            <img src="61109.png" width="30px" height="30px" alt="LI" />
          </a>
        </div>
      </div>

      <div class="profile">
        <img
          src="Decker_Sam25_2024.jpg"
          width="317px"
          height="480px"
          alt="Sam-Decker-Head-Shot"
        />
        <div class="bio">
          <a
            data-sveltekit-reload
            href="https://www.linkedin.com/in/samueldecker/"
            target="_blank">Sam Decker</a
          >
          <p>
            Hi! My name is Sam Decker and I am a current senior at Wabash
            College majoring in Computer Science and minoring in Classics. I
            really enjoy sports betting and I hope you do too with our site!
          </p>
          <a
            data-sveltekit-reload
            href="https://github.com/sdecker13"
            target="_blank"
          >
            <img src="25231.png" width="30px" height="30px" alt="GH" />
          </a>

          <a data-sveltekit-reload href="https://x.com/AB84" target="_blank">
            <img src="xLogo.png" width="30px" height="30px" alt="X" />
          </a>
          <a
            data-sveltekit-reload
            href="https://www.linkedin.com/in/samueldecker/"
            target="_blank"
          >
            <img src="61109.png" width="30px" height="30px" alt="LI" />
          </a>
        </div>
      </div>
    </div>
  {:else}
    <p>You must be logged in to view this page. Redirecting...</p>
  {/if}
</div>

<style>
  .about {
    text-align: center;
    display: block;
    margin: 20px auto;
    font-size: large;
  }

  .profile-container {
    display: flex;
    justify-content: space-around;
    margin: 10px auto;
  }

  .profile {
    text-align: center;
    margin: 10px;
  }

  .profile img {
    border-radius: 15px;
    object-fit: cover;
  }

  .bio {
    margin-top: 10px;
  }
</style>
