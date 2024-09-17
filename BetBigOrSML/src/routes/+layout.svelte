<script>
    import Title from '$lib/title.svelte'
    import '../styles/global.css'
</script>

<header>
    <Title title="BetBigOrSML" />
</header>

<main>
    <!--main conetnt-->
    <slot></slot>
</main>

<footer>
    <p>
        Copywrite of BetBigOrSML 2024
    </p>
</footer>

<style>
    header {
        display: flex;
        justify-content: left ;
    }
    main {
        max-width: 960px;
        margin: 20px auto;
    }
    footer {
        text-align: center;
    }
</style>