<template>
    <div class="aliPay">
        <loading v-if="loading"></loading>
        <p>页面跳转中，请请稍后......</p>
        <div class="form" v-html="content" >

        </div>
    </div>
</template>

<script>
    import Loading from "@/components/Loading";
    export default {
        name: "ailiPay",
        components:{
            Loading,
        },
        data(){
            return{
                orderId:this.$route.query.orderNo,
                content:'',
                loading:true
            }
        },
        mounted(){
            this.paySubmit();
        },
        methods:{
            paySubmit(){
                this.axios.post('/pay',{
                    orderId:this.orderId,
                    orderName :'陈奕豪——测试商城',//扫码支付时订单名称
                    amount:0.01, //单位元
                    payType:1, //1支付宝，2微信
                }).then((res)=>{
                    this.content = res.content;
                    setTimeout(()=>{
                        document.forms[0].submit()
                    },300)
                })
            }
        }
    }
</script>

<style lang="scss">
.aliPay{
    text-align: center;
    color: #666666;
    font-size: 24px;
    background-color: white;
}
</style>