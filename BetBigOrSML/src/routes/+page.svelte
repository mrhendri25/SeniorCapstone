<script>
  let pageTitle = "Home - BetBigOrSML";

  import { fade } from "svelte/transition";

  const carouselPhotos = [
    "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1000w,f_auto,q_auto:best/rockcms/2024-01/240129-brock-purdy-al-0810-c942e4.jpg",
    "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-560w,f_avif,q_auto:eco,dpr_2/rockcms/2024-04/patrick-mahomes-zz-240416-c0b6da.jpg",
    "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-1968034361.jpg?c=16x9&q=h_833,w_1480,c_fill",
    "https://www.news10.com/wp-content/uploads/sites/64/2024/09/AP24268023437936.jpg?w=1280",
  ];

  let index = 0;

  const next = () => {
    index = (index + 1) % carouselPhotos.length;
  };
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<div class="index">
  <h1>Welcome</h1>
  <p>
    Hello everyone! Welcome to our website. Here you can look at many different
    NFL parlays, and use our software to check and see if any arbitrary bet has
    a good or bad chance of hitting. Reminder, our algorithm is never 100%
    correct, but it does get pretty close! Happy betting!
  </p>
</div>

{#each [carouselPhotos[index]] as src (index)}
  <img transition:fade {src} alt="" />
{/each}

<button on:click={next}>Next!</button>

<style>
  .index {
    text-align: center;
    display: block;
    font-size: larger;
  }

  img {
    display: block;
    margin: 0 auto;
    border-radius: 15px;
    max-width: 100%;
  }

  button {
    display: block;
    margin: 20px auto;
  }
</style>
