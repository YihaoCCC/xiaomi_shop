<template>
    <div >

        <order-header :title="title">
            <template v-slot:tips>
                <span>
                    <a style="cursor: pointer;color: #999999" href="javascript:; ">  {{tips}} </a>
                </span>
            </template>
        </order-header>

        <router-view class="order"></router-view>
        <service-bar></service-bar>
        <nav-footer></nav-footer>
    </div>
</template>

<script>//和home作用一样
import OrderHeader from "@/components/OrderHeader";
import ServiceBar from "@/components/ServiceBar";
import NavFooter from "@/components/NavFooter";
    export default {
        name: "order",
        components:{
            OrderHeader,
            ServiceBar,
            NavFooter
        },
        data(){
            return{
                pathtest:this.$route.path,
                title:'',
                tips:''
            }
        },
        watch:{
          pathtest(){
              // let path = this.$route.path;
              // if(path === '/order/confirm'){
              //     this.title='订单确认',
              //         this.tips='请谨防钓鱼链接或诈骗电话，了解更多>'
              // }
              // else if( path === '/order/list'){
              //     this.title='订单列表',
              //         this.tips='您的所有订单，了解更多>'
              // }
              // else if( path === '/order/pay'){
              //     this.title='订单支付',
              //         this.tips='请注意支付时长，倒计时结束后将退出支付界面！'
              // }
              console.log(this.pathtest)
          }

        },
        mounted(){
            let path = this.$route.path;
            if(path === '/order/confirm'){
                this.title='订单确认',
                    this.tips='请谨防钓鱼链接或诈骗电话，了解更多>'
            }
            else if( path === '/order/list'){
                this.title='订单列表',
                    this.tips='您的所有订单，了解更多>'
            }
            else if( path === '/order/pay'){
                this.title='订单支付',
                    this.tips='请注意支付时长，倒计时结束后将退出支付界面！'
            }
            else {
                this.title='订单支付',
                    this.tips='请注意支付时长，倒计时结束后将退出支付界面！'
            }
        }
    }
</script>

<style lang="scss">
.order{
    background-color: #e5e5e5;
    padding-bottom: 30px;
}

</style>