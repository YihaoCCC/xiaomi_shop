<template>
    <div class="orderPay">
        <div class="payBody">
            <div class="payHeader">
                <div class="imgBox">
                    <svg t="1627180838891" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1580" width="128" height="128"><path d="M512 85.333333c235.648 0 426.666667 191.018667 426.666667 426.666667s-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512 276.352 85.333333 512 85.333333z m-74.965333 550.4L346.453333 545.152a42.666667 42.666667 0 1 0-60.330666 60.330667l120.704 120.704a42.666667 42.666667 0 0 0 60.330666 0l301.653334-301.696a42.666667 42.666667 0 1 0-60.288-60.330667l-271.530667 271.488z" fill="#52C41A" p-id="1581"></path>
                    </svg>
                </div>
                <div class="header-content">
                    <h2>订单创建成功！快去付款吧~~~~~</h2>
                    <p>请在<span>30分钟内</span>完成支付，超时将会消订单</p>
                    <p>收获信息：  {{orderAddress.receiverName}}  {{orderAddress.receiverMobile}} {{orderAddress.receiverProvince}}
                        {{orderAddress.receiverCity}} {{orderAddress.receiverAddress}} </p>
                </div>
                <div class="details">
                    <p>应付金额：<span>{{payTotal}}</span>元</p>
                    <div class="detail-box" >
                        <p>订单详情：</p>
                        <svg    t="1627181370073" class="icon" :class="{'up':showDetail}"  @click="showDetail=!showDetail" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2474" width="32" height="32"><path d="M512 693.333333c-14.933333 0-29.866667-4.266667-40.533333-14.933333l-277.33333399-234.666667c-27.733333-23.466667-29.866667-64-8.53333301-89.6 23.466667-27.733333 64-29.866667 89.6-8.53333299L512 546.133333l236.8-200.53333299c27.733333-23.466667 68.266667-19.19999999 89.6 8.53333299 23.466667 27.733333 19.19999999 68.266667-8.53333301 89.6l-277.33333399 234.666667c-10.666667 10.666667-25.6 14.933333-40.533333 14.933333z" fill="#666666" p-id="2475"></path>
                        </svg>

                    </div>
                </div>
            </div>
            <transition name="bounce">
            <div class="payContent" v-show="showDetail">
                <p>订单号：<span>{{orderNo}}</span></p>
                <p>收货信息：  {{orderAddress.receiverName}}  {{orderAddress.receiverMobile}} {{orderAddress.receiverProvince}}
                    {{orderAddress.receiverCity}} {{orderAddress.receiverAddress}} </p>
               <div class="list">
                   <p style="display: inline-block">商品详情：</p>
                   <div class="orderList" v-for="(item,index) in orderList" :key="index">
                       <img v-lazy="item.productImage" alt="">
                       <div class="title">
                           <p style="margin-bottom: 10px" >{{item.productName}} <em style="color: #FF6600;font-weight: bold">X</em> {{item.quantity}}</p>

                       </div>
                   </div>
               </div>
                <p>发票信息：电子发票 个人</p>
            </div>
            </transition>
        </div>
        <div class="payMethods">
            <h2>请选择以下方式付款</h2>
            <div class="plantform">
                <h3>支付平台</h3>
                <div class="type" :class="{'checked':payType === 1}" @click="paySubmit(1)">
                    <img src="./../assets/imgs/pay/icon-ali.png" alt="">
                </div>
                <div class="type" :class="{'checked':payType === 2}" @click="paySubmit(2)">
                    <img src="./../assets/imgs/pay/icon-wechat.png" alt="">
                </div>
            </div>
        </div>
        <we-chat-frame  :show-translate="showWeChat" @cancel="closeWeChat" :img-url="payImg"></we-chat-frame>
        <modal
        title="支付确认"
        btn-type="3"
        sure-text="确认，去我的订单"
        cancel-text="未支付"
        :show-modal="showPayModal"
        @submit="goToList"
        @cancel="displayPayModal"
        >
            <template v-slot:body>
                <span>请确认您是否已经支付？</span>
            </template>
        </modal>
    </div>
</template>

<script>
    import qrcode from 'qrcode';
    import WeChatFrame from "@/components/WeChatFrame";
    import Modal from "@/components/Modal";
    export default {
        name: "orderPay",
        components:{
          WeChatFrame,
            Modal
        },
        data(){
            return{
                showDetail:false,
                orderNo: this.$route.query.orderNo,
                orderList:[],
                payTotal:0,
                orderAddress:{},
                payType:3,
                showWeChat:false,
                payImg:'',//后端返回的微信二维码地址
                showPayModal:false,
            }
        },
        mounted(){
            this.getOrderDetail();
        },
        methods:{
            paySubmit(payType){
                if (payType === 1){
                    this.payType=1;
                    this.$message.warning("支付链接加载中......")
                    setTimeout(()=>{
                        window.open('/#/order/alipay?orderNo='+this.orderNo,"_blank");
                        this.payType=3;
                    },2000)
                }
                else if(payType === 2){
                    this.payType=2;
                    this.$message.warning("支付链接加载中....")
                    setTimeout(()=>{
                        this.payType=3;
                        qrcode.toDataURL('https://135editor.cdn.bcebos.com/files/users/541/5419088/202107/XQELeLtx_dMtL.jpg')
                            .then(url => {//将url赋值给img弹框
                                console.log(url)
                                this.showWeChat=true;
                                this.payImg = url;
                            })
                            .catch(err => {
                                console.error(err)
                            })
                        this.showWeChat = true;
                    },2000)


                    // this.axios.post('/pay',{
                    //     orderId:this.orderId,
                    //     orderName :'cyh测试商城',//扫码支付时订单名称
                    //     amount:0.01, //单位元
                    //     payType:2, //1支付宝，2微信
                    // }).then((res)=>{
                    //     qrcode.toDataURL(res.content)
                    //         .then(url => {//讲url赋值给img弹框
                    //             console.log(url)
                    //             this.showWeChat=true;
                    //             this.payImg = url;
                    //         })
                    //         .catch(err => {
                    //             console.error(err)
                    //         })
                    // })
                    // .then(()=> {
                    //     {
                    //         this.showWeChat = true;
                    //         console.log("wechatpay");
                    //     }
                    // })


                }
            },
            getOrderDetail(){
                this.axios.get(`/orders/${this.orderNo}`).then((res)=>{
                  this.orderList=res.orderItemVoList;
                  this.payTotal=res.payment;
                  this.orderAddress=res.shippingVo;
                })
            },
            closeWeChat(){
                this.showWeChat=false;
                this.showPayModal=true;
            },
            goToList(){
                this.$router.push('/order/list')
            },
            displayPayModal(){
                this.showPayModal=false
            }
        }

    }
</script>

<style lang="scss">

   .payBody{
       transform: translateY(30px);
       margin:  0 auto 30px auto;
       width: 1226px;
       box-sizing: border-box;
       background-color: #ffffff;
       padding: 30px 60px;
       .payHeader{
           border-bottom: 1px solid #d7d7d7;
           display: flex;
           padding-bottom: 30px;
           justify-content: space-between;
           align-items: center;
           font-size: 14px;
           color: #666666;
           .imgBox{
               flex: 1;
           }
           .header-content{
               flex: 4;
               h2{
                   font-size: 24px;
                   margin-bottom: 18px;
               }
               p{
                   margin-top: 10px;
                   span{
                       color: #FF6600;
                   }
               }

           }
           .details{
               flex: 1;
               text-align: center;
               .detail-box{
                   display: flex;
                   align-items: center;
                   justify-content: center;
                   margin-top: 20px;
                   svg{
                       transition: all 0.5s;
                       cursor: pointer;
                       &.up{
                           transform: rotate(180deg);
                       }
                   }
               }
               span{
                   font-size: 24px;
                   font-weight: bold;
                   color: #FF6600;
               }
           }
       }
       .payContent {
           padding: 40px 186px 20px;
           font-size: 14px;
           color: #666666;
           transition: all .8s;
           /*animation: content 0.8s;*/

           &.bounce-enter-active {
               animation: bounce .8s;
           }

           &.bounce-leave-active {
               animation: bounce .8s reverse;
           }

           @keyframes bounce {
               from {
                   height: 0px;
               }
               to {
                   height: 151px
               }
               /*0% {
                   height: 0;
               }
               50% {
                   transform: scale(1.5);
               }
               100% {
                   transform: scale(1);
               }*/
           }
           /*@keyframes content {*/
           /*    from{ height: 0px; }*/
           /*    to{ height: 151px }*/
           /*}*/
           .list {
               display: flex;
               justify-content: flex-start;
               align-items: center;
               margin-bottom: 15px;

               .orderList {
                   display: flex;
                   align-items: center;

                   img {
                       width: 46px;
                       height: 38px;

                   }
               }
           }

           p {
               margin-bottom: 20px;

               span {
                   color: #FF6600;
                   font-weight: bold;
               }

               &:last-child {
                   margin-bottom: 0;
               }
           }
       }
       }

    .payMethods{
        width: 1226px;
        background-color: white;
        transform: translateY(30px);
        margin:30px auto 30px auto  ;
        padding: 30px 60px;
        box-sizing: border-box;
        h2{
            padding-bottom: 20px;
            border-bottom: 1px solid #d7d7d7;
        }
        .plantform{
            h3{
                margin: 20px 0 20px 0;
                font-size: 18px;
            }

            .type{
                cursor: pointer;
                width: 188px;
                height: 64px;
                text-align: center;
                display: inline-block;
                border: 1px solid #e5e5e5;
                margin-right: 10px;
                &.checked{
                    border:1px solid #FF6600;
                }
                img{
                    width: 103px;
                    height: 36px;
                    margin-top: 14px;
                }
            }
        }

    }

</style>