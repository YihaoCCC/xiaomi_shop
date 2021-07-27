<template>
    <div class="order-header">
        <div class="order-container">
<!--            <div class="logo">-->
<!--                <img src="./../assets/imgs/logo-mi.png" alt="">-->
<!--            </div>-->
            <div class="header-logo">
                <a href="/#/index"></a>
            </div>
            <span>
                {{title}}
                <div  class="soltstyle">
                    <slot name="tips"></slot>
                </div>
            </span>

            <span>{{userName}}</span>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {

        name: "OrderHeader",
        props:{
            title:String,
        },
        computed:{
            // username() {
            //     return this.$store.state.userName;
            // },//mapState可进行替代
            ...mapState(['userName'])
        }
    }
</script>

<style lang="scss" >
    @import "./../assets/scss/config.scss";
    @import "./../assets/scss/mixin";
    .order-header{
        position: sticky;
        top: 0;
        z-index: 5;
        background-color: #ffffff;
        border-bottom: 2px solid $colorA;
    .order-container {
        width: 1226px;
        height: 90px;
        margin: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #ffffff;
        /*.logo {*/
        /*    width: 52px;*/
        /*    height: 53px;*/
        /*    img {*/
        /*        width: 100%;*/
        /*        border-radius: 20px;*/
        /*    }*/
        /*}*/

        span {
            .soltstyle{
                display: inline-block;
                margin-left: 20px;
                color: #999999;
                font-size: 14px;
            }
            font-size: 14px;
            &:nth-child(2) {
                font-size: 28px;
                margin-right: 500px;
                span{
                    font-size: 14px;
                }
            }

            &:last-child {
                font-size: 16px;
            }
        }
    }

}
</style>