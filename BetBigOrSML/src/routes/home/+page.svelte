<script>
    let title = 'BetBigOrSML';

    const updateTitle = () => {
        title = "LMSrOgiBteB";
    };
</script>

<div class="index">
    <h1>{title}</h1>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore   
        magna aliqua. Ut enim ad minim veniam, quis nostrud 
        exercitation ullamco laboris nisi ut aliquip ex ea 
        commodo consequat. Duis aute irure dolor in 
        reprehenderit in voluptate velit esse cillum dolore eu 
        fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
        non proident, sunt in culpa qui officia deserunt mollit 
        anim id est laborum.
    </p>
    <button on:click={updateTitle}>change title</button>
    
    <!-- Navigation Links -->
    <nav>
        <a href="/gamestats">Game Stats</a> |
        <a href="/about">About Us</a>
    </nav>
</div>

<style>
    .index {
        text-align: center;
        display: block;
        margin: 20px auto;
    }
    nav {
        margin-top: 20px;
    }
    a {
        margin: 0 10px;
        text-decoration: none;
        color: blue;
    }
    a:hover {
        text-decoration: underline;
    }
</style>
