<template>
    <div class="no-data">
        <img src="./../assets/imgs/icon-no-data.png" alt="">
        <p>暂未查询到您的订单数据</p>
    </div>
</template>

<script>
    export default {
        name: "NoData"
    }
</script>

<style lang="scss">
.no-data{
text-align: center;
    padding:60px 0 30px 0;
    img{
        width: 300px;

    }
    p{
        font-size: 26px;
        color: #999999;
    }
}
</style>