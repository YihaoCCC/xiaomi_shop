<template>
    <div>
        <NavHeader></NavHeader>
        <router-view></router-view>
        <NavFooter></NavFooter>

    </div>
</template>//home主要用来把header和footer加载中间层  做成router view

<script>
    import NavHeader from "@/components/NavHeader";
    import NavFooter from "@/components/NavFooter";

    export default {
        name: "home",
        components:{
            NavHeader,
            NavFooter
        }
    }
</script>

<style scoped>

</style>