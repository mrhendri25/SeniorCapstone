<script>
  import { goto } from "$app/navigation";
  import { onMount, onDestroy } from "svelte";

  let pageTitle = "Home - BetBigOrSML";

  let images = [
    "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1000w,f_auto,q_auto:best/rockcms/2024-01/240129-brock-purdy-al-0810-c942e4.jpg",
    "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-560w,f_avif,q_auto:eco,dpr_2/rockcms/2024-04/patrick-mahomes-zz-240416-c0b6da.jpg",
    "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-1968034361.jpg?c=16x9&q=h_833,w_1480,c_fill",
    "https://www.news10.com/wp-content/uploads/sites/64/2024/09/AP24268023437936.jpg?w=1280",
    "https://statico.profootballnetwork.com/wp-content/uploads/2024/10/16140254/anthony-richardson-injury-update-week-7-2024-1920x1280.jpg",
  ];

  let currentIndex = 0;
  let interval;
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

  // Change image every 3 seconds
  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
  }

  onMount(() => {
    checkLoginStatus();
    interval = setInterval(nextImage, 3000); // Start the image carousel
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<div class="index">
  {#if isLoggedIn}
    <h1>Welcome, {username}</h1>
    <p>
      Hello everyone! Welcome to our website. Here you can look at many
      different NFL parlays, and use our software to check and see if any
      arbitrary bet has a good or bad chance of hitting. Reminder, our algorithm
      is never 100% correct, but it does get pretty close! Happy betting!
    </p>
  {:else}
    <p>You must be logged in to view this page. Redirecting...</p>
  {/if}
</div>

<div class="carousel">
  <!-- svelte-ignore a11y-img-redundant-alt -->
  <img src={images[currentIndex]} alt="Carousel image" />
</div>

<div class="news">
  <a data-sveltekit-reload href="https://nfl.com" target="_blank">
    <img src="nflpic.png" width="60px" height="82.5px" alt="NFL" />
  </a>

  <a
    data-sveltekit-reload
    href="https://abc.com/collection/abfd43e1-7928-4894-92ed-88c8e8596082"
    target="_blank"
  >
    <img src="abcpic.png" width="82.5px" height="82.5px" alt="ABC" />
  </a>

  <a data-sveltekit-reload href="https://www.cbssports.com/" target="_blank">
    <img src="cbspic.png" width="130px" height="82.5px" alt="CBS" />
  </a>

  <a data-sveltekit-reload href="https://www.foxsports.com/" target="_blank">
    <img src="foxpic.png" width="100px" height="82.5px" alt="FOX" />
  </a>

  <a data-sveltekit-reload href="https://www.cnn.com/sport" target="_blank">
    <img src="cnnpic.png" width="110px" height="72.5px" alt="FOX" />
  </a>
</div>

<style>
  .index {
    text-align: center;
    display: block;
    font-size: larger;
  }

  .carousel img {
    max-width: 100%;
    max-height: 100%;
    height: 100%;
    width: 80%;
    object-fit: cover;
    border-radius: 15px;
  }

  .carousel {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500px;
    overflow: hidden;
  }

  .news {
    justify-content: center;
    display: flex;
  }

  .news img {
    margin: 20px;
  }
</style>
