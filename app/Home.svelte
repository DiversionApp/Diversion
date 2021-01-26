<page actionBarHidden="{true}" backgroundColor="#242424">
    <scrollView orientation="horizontal">
        <stackLayout orientation="horizontal">
            {#each $trendingResults as trendingResult (trendingResult.id)}
                <stackLayout class="item">
                    <image on:loaded="{(args) => onLoaded(args, trendingResult.id)}" on:tap="{onClick}" src="https://image.tmdb.org/t/p/w300/{trendingResult.poster_path}"/>
                    <label text="{trendingResult.title}" textWrap="true" class="info"/>
                    <label text="Released: {trendingResult.release_date}" class="info"/>
                    <label text="Rating: {trendingResult.vote_average}" class="info"/>
                </stackLayout>
            {/each}
        </stackLayout>
    </scrollView>
</page>

<script lang="typescript">
    import { onMount } from 'svelte';
    import { getJSON } from "@nativescript/core/http";
    import { trendingResults, trendingPage, trendingTotalPages, trendingTotalResults } from './stores.js';
    import { tmdbApiKey3 } from './secrets.js';

    onMount(async () => {
        console.log("started home....")
        try {
            const trending = await getJSON(`https://api.themoviedb.org/3/trending/movie/week?api_key=${$tmdbApiKey3}`)
            $trendingPage = trending.page
            $trendingResults = trending.results
            $trendingTotalPages = trending.total_pages
            $trendingTotalResults = trending.total_results
        } catch (err) {
            console.error(err)
        }
    });

    function onLoaded(args, id) {
        !args.object.android.isFocusableInTouchMode() && args.object.android.setFocusableInTouchMode(true)
        args.object.android.setId(id)
    }

    function onClick(args) {
        console.log('clicked poster')
    }
</script>

<style>
    .item {
        margin: 5;
        width: 150;
    }
    .info {
        color: rgb(170, 170, 170);
    }
</style>
