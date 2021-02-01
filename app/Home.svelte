<page actionBarHidden="{true}" backgroundColor="#242424">
    <scrollView>
        <wraplayout orientation="horizontal">
            {#each $trendingResults as trendingResult (trendingResult.id)}
                <stackLayout use:onLoaded="{trendingResult.id}" on:tap="{onClick}" class="item">
                    <image src="https://image.tmdb.org/t/p/w300/{trendingResult.poster_path}"/>
                    <label text="{trendingResult.title || trendingResult.name}" textWrap="true" class="info"/>
                    <label text="Released: {trendingResult.release_date || trendingResult.first_air_date}" class="info"/>
                    <label text="Rating: {trendingResult.vote_average}" class="info"/>
                </stackLayout>
            {/each}
        </wraplayout>
    </scrollView>
</page>

<script lang="typescript">
    import { onMount } from 'svelte';
    import { getJSON } from "@nativescript/core/http";
    import * as application from "@nativescript/core/application";
    import { trendingResults, trendingPage, trendingTotalPages, trendingTotalResults } from './stores.js';
    import { tmdbApiKey3 } from './secrets.js';

    let idMap = {}
    let idHighlighted

    onMount(async () => {
        console.log("started home....")
        try {
            const trending = await getJSON(`https://api.themoviedb.org/3/trending/all/week?api_key=${$tmdbApiKey3}`)
            $trendingPage = trending.page
            $trendingResults = trending.results
            $trendingTotalPages = trending.total_pages
            $trendingTotalResults = trending.total_results
        } catch (err) {
            console.error(err)
        }
    });

    function onLoaded(node, id) {
        // the node has been mounted in the DOM
        if (node.nativeView.android) {
            !node.nativeView.android.isFocusableInTouchMode() && node.nativeView.android.setFocusableInTouchMode(true)
            node.nativeView.android.setId(id)
            node.nativeView.android.setContentDescription(`poster|${id}`)
            idMap[id] = node.nativeView
        }

        return {
            update(newId) {
                // the value of `bar` has changed
                !node.nativeView.android.isFocusableInTouchMode() && node.nativeView.android.setFocusableInTouchMode(true)
                node.nativeView.android.setId(newId)
                node.nativeView.android.setContentDescription(`poster|${newId}`)
                idMap[newId] = node.nativeView
            },
            destroy() {
                // the node has been removed from the DOM
                // idMap[id] = undefined
            }
        };
    }

    function onClick(args) {
        const id = args.object.android.getId()
        if (idHighlighted) {
            idMap[idHighlighted].borderWidth = 0
        }
        if (id && idMap[id]) {
            args.object.android.requestFocus()
            idMap[id].borderWidth = 2
            idHighlighted = id
        }
        application.notify({
            eventName: 'CLEAR_HIGHLIGHTED_NAV',
        })
    }

    application.on('POSTER_HIGHLIGHT', (args) => {
        if (args.id && idMap[args.id]) {
            idMap[args.id].borderWidth = args.isHighlighted ? 2 : 0
            idHighlighted = args.isHighlighted ? args.id : idHighlighted
        }
    });
</script>

<style>
    .item {
        margin: 5;
        width: 150;
        border-color: #E9E9E9;
    }
    .info {
        color: rgb(170, 170, 170);
    }
</style>
