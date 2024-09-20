<script>
  import Title from "$lib/title.svelte";
  import "../styles/global.css";
</script>

<header>
  <Title title="BetBigOrSML" />
</header>

<main>
  <!--main content-->
  <slot></slot>
</main>

<footer>
  <p>Copyright of BetBigOrSML 2024</p>
</footer>

<style>
  header {
    display: flex;
    justify-content: left;
  }
  main {
    max-width: 960px;
    margin: 20px auto;
  }
  footer {
    text-align: center;
  }
</style>
