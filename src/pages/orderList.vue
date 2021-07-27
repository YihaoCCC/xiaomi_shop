<template>
    <div class="list">
        <!--加载数据loading组件展示-->
        <loading v-if="loading "></loading>
        <!--orderList主组件展示-->
        <div class="order-list" v-for="(item,index) in orderList " :key="index"
        v-loading="loading"
        >
            <div class="order-list-header">
                <div class="left">
                    <span>
                        {{item.createTime}}
                    </span>
                    <span>
                        {{item.receiverName}}
                    </span>
                    <span>
                        订单号:{{item.orderNo}}
                    </span>
                    <span style="color: #FF6600;font-weight: bold">
                        {{item.statusDesc}}
                    </span>
                </div>
                <div class="right">
                    应付金额：
                    <span>
                       {{item.payment}}
                    </span>
                    元
                </div>
            </div>
            <div class="order-list-content" v-for="(orderPayList,index) in item.orderItemVoList" :key="index">
                <div class="left">
                    <img v-lazy="orderPayList.productImage" alt="">

                    <div class="product-tilte">
                        <span>
                            {{orderPayList.productName}}
                        </span>
                        <div class="price-num">
                            {{orderPayList.currentUnitPrice}}元 X {{orderPayList.quantity}}
                        </div>
                    </div>
                </div>
                <div class="right" v-if="item.status === 10">
                    <span @click="goOrderPay(item.orderNo)">立即付款 > </span>
                </div>
                <div v-else  class="right">
                    <span> 订单已支付</span>
                </div>
            </div>
        </div>
        <el-pagination style="margin-left:1060px"></el-pagination>
        <!--无数据展示组件-->
        <no-data v-if="!loading && orderList.length === 0"></no-data>
    </div>
</template>

<script>
import Loading from './../components/Loading'
import NoData from "@/components/NoData";
import { Pagination } from "element-ui"
     export default {
        name: "orderList",
        components:{
            Loading,
            NoData,
           [Pagination.name]:Pagination
        },
        data(){
            return{
                orderList:[],
                loading:true
            }
        },
        mounted(){
          this.getOrderList();
        },
        methods:{
          getOrderList(){
              this.axios.get('/orders').then((res)=>{
                  this.loading = false
                  this.orderList=  res.list;

              }).catch(()=>{
                  this.loading=false
              })
          },
            goOrderPay(orderNo){
                // this.$router.push(`/order/pay?orderNo=${orderNo}`)//地址直接传参
                //path跳转传参
                // this.$router.push({
                //     path:'/order/pay',
                //     query:{
                //         orderNo
                //     }
                // })
                //name跳转
                this.$router.push({
                    name:'order-pay',
                    query:{
                        orderNo
                    }
                })
            }
        },
        computed:{
            datetime(){
                let datetime=new Date();
                return datetime.getFullYear().toString() +'年'+ (datetime.getMonth()+1).toString() +'月'+ datetime.getDate().toString()+'日'+
                    ' '+datetime.getHours()+':'+datetime.getMinutes()
                    ;
            }
        }
    }
</script>

<style lang="scss">
    @import "./../assets/scss/config";
    .list{
        .order-list{
            margin: auto;
            box-sizing: border-box;
            padding: 0 20px 20px 20px;
            width: 1226px;
            transform: translateY(20px);
            &:last-child{
                padding-bottom: 20px;
            }
            .order-list-header{
                border-radius: 60px;
                display: flex;
                align-items: center;
                padding: 0 20px 0 20px;
                justify-content: space-between;
                height: 60px;
                color: #666666;
                background: #FFFAF7;
                .left{
                    span{
                        font-size: 16px;
                        &:after{
                            content: ' | ';
                            margin: 0 3px ;
                            font-weight: bold;
                        }
                        &:last-child:after{
                            content: ' ';
                        }
                    }
                }
                .right{
                    font-size: 16px;
                    span{
                        font-size: 26px;
                        color: #333333;
                    }
                }
            }
            .order-list-content{
                margin-top: 1px;
                padding: 0 20px 0 20px;
                border-radius: 40px;
                height: 150px;
                background-color: #ffffff;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    img{
                        width: 69px;
                        height:54px ;
                    }
                    .product-tilte{
                        .price-num{
                            font-size: 20px;
                            margin-top: 5px;
                        }
                        span{
                            font-size: 20px;
                        }
                        margin-left: 20px;
                    }
                }
                .right{
                    span{
                        cursor: pointer;
                    }
                    font-size: 20px;
                    font-weight: bold;
                    color: $colorA;
                }
            }
        }
    }
</style>