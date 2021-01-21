<page actionBarHidden="{true}">
    <scrollView orientation="horizontal">
        <stackLayout orientation="horizontal">
            <button text="{message}" on:tap="{onButtonTap}"/>
            <button text="{message}" on:tap="{onButtonTap}"/>
            <button text="{message}" on:tap="{onButtonTap}"/>
            <button text="{message}" on:tap="{onButtonTap}"/>
            <button text="{message}" on:tap="{onButtonTap}"/>
            <button text="{message}" on:tap="{onButtonTap}"/>
            <button text="{message}" on:tap="{onButtonTap}"/>
            <button text="{message}" on:tap="{onButtonTap}"/>
            <button text="{message}" on:tap="{onButtonTap}"/>
            <button text="{message}" on:tap="{onButtonTap}"/>
            <button text="{message}" on:tap="{onButtonTap}"/>
            <button text="{message}" on:tap="{onButtonTap}"/>
            <button text="{message}" on:tap="{onButtonTap}"/>
            <button text="{message}" on:tap="{onButtonTap}"/>
            <button text="{message}" on:tap="{onButtonTap}"/>
            <button text="{message}" on:tap="{onButtonTap}"/>
            <button text="{message}" on:tap="{onButtonTap}"/>
            <button text="{message}" on:tap="{onButtonTap}"/>
            <button text="{message}" on:tap="{onButtonTap}"/>
            <button text="{message}" on:tap="{onButtonTap}"/>
            <button text="{message}" on:tap="{onButtonTap}"/>
            <button text="{message}" on:tap="{onButtonTap}"/>
            <button text="{message}" on:tap="{onButtonTap}"/>
            <button text="{message}" on:tap="{onButtonTap}"/>
            <button text="{message}" on:tap="{onButtonTap}"/>
            <button text="{message}" on:tap="{onButtonTap}"/>
            <button text="{message}" on:tap="{onButtonTap}"/>
            <button text="{message}" on:tap="{onButtonTap}"/>
        </stackLayout>
    </scrollView>
</page>

<script lang="typescript">
    let message: string = "Blank Svelte Native App"
    let title: string = "Home"
    function onButtonTap() {
        console.log("clicked")
    }
</script>

<style>
    .title {
        vertical-align: middle;
        color: rgb(233, 233, 233);
    }
</style>
