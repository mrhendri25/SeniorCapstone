<script>
  let pageTitle = "Home - BetBigOrSML";

  import { onMount, onDestroy } from "svelte";

  let images = [
    "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1000w,f_auto,q_auto:best/rockcms/2024-01/240129-brock-purdy-al-0810-c942e4.jpg",
    "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-560w,f_avif,q_auto:eco,dpr_2/rockcms/2024-04/patrick-mahomes-zz-240416-c0b6da.jpg",
    "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-1968034361.jpg?c=16x9&q=h_833,w_1480,c_fill",
    "https://www.news10.com/wp-content/uploads/sites/64/2024/09/AP24268023437936.jpg?w=1280",
    "https://statico.profootballnetwork.com/wp-content/uploads/2024/10/16140254/anthony-richardson-injury-update-week-7-2024-1920x1280.jpg",
  ];
  let currentIndex = 0;
  let interval;

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
  }

  onMount(() => {
    interval = setInterval(nextImage, 3000);
  });

  onDestroy(() => {
    clearInterval(interval);
  });
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

<div class="carousel">
  <!-- svelte-ignore a11y-img-redundant-alt -->
  <img src={images[currentIndex]} alt="Carousel image" />
</div>

<style>
  .index {
    text-align: center;
    display: block;
    font-size: larger;
  }

  img {
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
</style>
