<template>
    <div class="loading">
        <img src="/imgs/loading-svg/loading-bars.svg" alt="">
    </div>
</template>

<script>
    export default {
        name: "Loading"
    }
</script>

<style lang="scss">
.loading{
    height: 100px;
    line-height: 100px;
    text-align: center;
    padding-top: 30px;
    img{
        height: 100%;
    }
}
</style>