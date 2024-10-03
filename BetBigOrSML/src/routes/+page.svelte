<script>
  let pageTitle = "Home - BetBigOrSML";
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<div class="index">
  <h1>Welcome</h1>
  <p>
    Hello everyone! Welcome to our website. Here you can look at many different
    NFL parlays, and use our software to check and see if any arbitrary bet has
    a good or bad chance of hitting. Happy betting!
  </p>
</div>

<div class="football">
  <img
    src="tuff_aff_fball_flick.jpeg"
    width="1080px"
    height="540px"
    alt="tuff ahh flick"
  />
</div>

<style>
  .index {
    text-align: center;
    display: block;
    font-size: larger;
  }

  .football {
    display: flex;
    margin: 20px auto;
  }

  .football img {
    border-radius: 15px;
    object-fit: cover;
  }
</style>
