<template>
    <div class="list" >
        <!--加载数据loading组件展示  v-loading="loading"   -->
        <loading v-if="loading "></loading>
        <!--orderList主组件展示-->
        <div  v-show="!loading">
        <div class="order-list" v-for="(item,index) in orderList " :key="index"

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
            <div class="order-list-content" v-for="(orderPayList,index) in item.orderItemVoList" :key="index" >
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
        <!--第一种方法分页器加载-->
        <el-pagination style="margin-left:1000px;margin-top: 20px"  background
                       layout="prev, pager, next" :total="20"  @current-change="handleChange"  v-show="false"  ></el-pagination>
        <!--第二种方法：按钮加载更多-->
        <el-button :loading="buttonLoad" type="warning" round @click="buttonMore" style="margin-top: 20px"> 加载更多 </el-button></div>
        <!--第三种方法：滚动加载-->
<!--        <div class="scrollMore"  v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" :infinite-scroll-distance="100" v-show="scrollLoading"    >-->
<!--            <img src="/imgs/loading-svg/loading-spinning-bubbles.svg" alt="">-->
<!--        </div>-->
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
                loading:true,//加载页面时全局加载显示
                pageNum:1,
                buttonLoad:false,//控制按钮加载显示
                busy:true,//滚动控制加载方法
                scrollLoading:false//控制滚动加载显示
            }
        },
        mounted(){
            this.busy=true;
          this.getOrderList();
        },
        methods:{
          getOrderList(){

              this.axios.get('/orders',{
                  params:{
                      pageSize:3,
                      pageNum:this.pageNum,
                  }
              }).then((res)=>{
                  setTimeout(()=>{
                      this.loading = false
                      this.orderList= res.list;
                      this.busy=false;
                  },2000)

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
            },
            //第一种方法分页器
            handleChange(pageNum){
              this.pageNum=pageNum;
              this.loading=true;
              setTimeout(()=>{
                  this.getOrderList();
              },1000)

            },
            //第二种方法按钮加载更多
            buttonMore(){
              this.pageNum++;
                this.buttonLoad=true;
                this.axios.get('/orders',{
                    params:{
                        pageSize:3,
                        pageNum:this.pageNum,
                    }
                }).then((res)=>{
                    this.orderList= this.orderList.concat( res.list);
                    this.buttonLoad = false;
                    if(!res.hasNextPage){
                        this.$message.warning("已经到尽头了喔！")
                    }
                }).catch(()=>{
                    this.buttonLoad = false;
                    this.$message.error("数据加载失败请稍后重试！")
                })
            },
            //第三种方法滚动加载更多
            loadMore: function() {
                this.busy = true;
                this.scrollLoading = true
                setTimeout(() => {
                    this.pageNum++;
                    console.log(this.pageNum)
                    // this.axios.get('/orders',{
                    //     params:{
                    //         pageSize:3,
                    //         pageNum:this.pageNum,
                    //     }
                    // }).then((res)=>{
                    //     this.orderList = this.orderList.concat( res.list);
                    //     this.scrollLoading = false;
                    //     if(res.hasNextPage){
                    //         this.busy = false;
                    //         this.scrollLoading = false;
                    //         this.$message.info("数据加载中！")
                    //     }
                    //     else {
                    //         this.scrollLoading = false;
                    //         this.$message.error("已经到尽头了喔！")
                    //     }
                    //
                    // }).catch(() => {
                    //     this.busy = true;
                    //     this.$message.error("数据加载失败请稍后重试！")
                    // })
                }, 1000);
            },
            scrollMore(){
                // this.busy=true
                // setTimeout(()=>{
                //     this.pageNum++;
                //     console.log(this.pageNum)
                // },1000)
console.log(this.pageNum++)
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
        text-align: center;
        .el-pagination.is-background .el-pager li:not(.disabled).active{
            background-color: #FF6600;
        }
        .el-pagination.is-background .el-pager li:hover{
            color: white;
        }
        .el-button--warning {
            background-color: #FF6600;
            border-color: #FF6600;
        }


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