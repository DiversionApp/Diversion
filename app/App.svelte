<page actionBarHidden="{true}">
    <gridLayout columns="*, 3.8*, 3.8*, 3.8*, 0.5*" rows="*, 1.2*, *, 1.2*, 1.2*, 1.2*, 1.2*, 1.2*, 1.2*, 1.2*, 1.2*, 1.2*, *, 1.2*, *" backgroundColor="#242424">
        <image on:loaded="{onLoaded}" on:tap="{onClick}" col="0" row="1" src="~/images/trakt-icon-red.png" stretch="aspectFit"/>
        <label col="0" row="2" text="Sign in" class="sign-in"/>
        <button on:loaded="{onLoaded}" on:touch="{onClick}" col="0" row="3" text="&#xf002;" class="fas icons"/>
        <button on:loaded="{onLoaded}" on:touch="{onClick}" col="0" row="4" text="&#xf015;" class="fas icons"/>
        <button on:loaded="{onLoaded}" on:touch="{onClick}" col="0" row="5" text="&#xf008;" class="fas icons"/>
        <button on:loaded="{onLoaded}" on:touch="{onClick}" col="0" row="6" text="&#xf26c;" class="fas icons"/>
        <button on:loaded="{onLoaded}" on:touch="{onClick}" col="0" row="7" text="&#xf07c;" class="fas icons"/>
        <button on:loaded="{onLoaded}" on:touch="{onClick}" col="0" row="13" text="&#xf013;" class="fas icons"/>
        <frame bind:this="{mainFrame}" col="1" colSpan="4" row="0" rowSpan="15">
            <SignIn/>
        </frame>
    </gridLayout>
</page>

<script lang="typescript">
    export let isAndroidTv = false
    export let isAndroid = false
    export let isIos = false

    import { navigate } from 'svelte-native'
    import * as application from "@nativescript/core/application";
    import { TouchAction } from '@nativescript/core';
    import Home from './Home.svelte'
    import SignIn from './SignIn.svelte'

    let mainFrame
    let idMap = {
        1: SignIn,
        // 3: Search,
        4: Home,
        // 5: Movies,
        // 6: TV,
        // 7: Files,
        // 13: Settings,

    }

    function onLoaded(args) {
        !args.object.android.isFocusableInTouchMode() && args.object.android.setFocusableInTouchMode(true)
        const rowAsId = args.object.android.getLayoutParams().row
        args.object.android.setId(rowAsId)
    }

    function onClick(args) {
        if (args.action === TouchAction.up) {
            return
        }
        application.notify({
            eventName: 'NAVIGATE',
            id: args.object.android.getId(),
            element: args.object.android
        })
    }

    application.on('NAVIGATED', (args) => {
        if (args.id && idMap[args.id]) {
            navigate({
                page: idMap[args.id],
                frame: mainFrame
            })
        }
    });
</script>

<style>
    .sign-in {
        text-align: center;
        color: rgb(170, 170, 170);
    }
    .icons {
        android-elevation: 0;
        background-color: transparent;
        border-color: transparent;
        border-radius: 0;
        border-width: 0;
        color: rgb(170, 170, 170);
        margin-left: 0;
        margin-right: 0;
        /* font-size: 18; */
        /* font-weight: bold; */
    }
</style>
