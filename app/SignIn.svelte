<page actionBarHidden="{true}">
    <gridLayout columns="*, *, *, 0.2*" rows="*, 1.2*, *, 1.2*, 1.2*, 1.2*, 1.2*, 1.2*, 1.2*, 1.2*, 1.2*, 1.2*, *, 1.2*, *" backgroundColor="#242424">
        <label col="0" row="1" text="Account" class="title"/>
        <stackLayout col="0" colSpan="4" row="5" rowSpan="4">
            <stackLayout>
                <label text="Sign in for the best experience" class="prompt"/>
                <button text="Sign in" on:tap="{onButtonTap}" class="sign-in"/>
            </stackLayout>
        </stackLayout>
    </gridLayout>
</page>

<script lang="typescript">
    function onButtonTap() {
        console.log("sign in")
    }
</script>

<style>
    .title {
        vertical-align: middle;
        color: rgb(233, 233, 233);
    }
    .prompt {
        text-align: center;
        font-size: 30%;
        color: rgb(233, 233, 233);
    }
    .sign-in {
        width: 50%;
    }
</style>
