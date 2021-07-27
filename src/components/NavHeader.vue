<template>
    <div class="header">
        <div class="nav-topbar">
            <div class="container">
                <div class="topbar-menu">
                    <a href="javascript:;">小米商城</a>
                    <a href="javascript:;">MIUI</a>
                    <a href="javascript:;">云服务</a>
                    <a href="javascript:;">协议规则</a>
                </div>
                <div class="topbar-user">
                    <a href="javascript:;" v-if="username">{{username}}</a>
                    <a href="javascript:;" v-if="username" @click="goMyOrder"> 我的订单</a>
                    <a href="javascript:;" v-if="!username" @click="login">登陆</a>
                    <a href="javascript:;" class="my-cart" @click="goToCart" ><span class="icon-cart"> </span>购物车({{cartCount}})</a>
                </div>
            </div>
        </div>

        <div class="nav-header">
            <div class="container">
                <div class="header-logo">
                    <a href="/#/index"></a>
                </div>
                
                <div class="header-menu">
                    <div class="item-menu">
                        <span>小米手机</span>
                        <div class="children">
                           <ul>
                               <li class="product" v-for="(item,index) in phoneList" :key="index">
                                   <a  v-bind:href="'/#/product/'+item.id" target="_blank">
                                       <div class="pro-img">
                                          <!-- <img :src="item.mainImage" alt="618钜惠">-->
                                           <img v-lazy="item.mainImage" alt="618钜惠">
                                       </div>
                                       <div class="pro-name">{{item.name}}</div>
                                       <div class="pro-price">{{ item.price | currency }}</div>
                                   </a>
                               </li>
                           </ul>
                        </div>
                    </div>
                    <div class="item-menu">
                        <span>RedMI红米</span>
<!--                        <div class="children">-->
<!--                        </div>-->
                    </div>
                    <div class="item-menu">
                        <span>米家电视</span>
                        <div class="children">
                            <ul>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img src="../assets/imgs/nav-img/nav-3-1.jpg" alt="">
                                        </div>
                                        <div class="pro-name">小米壁画电视 65英寸</div>
                                        <div class="pro-price">6599元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img src="../assets/imgs/nav-img/nav-3-2.jpg" alt="">
                                        </div>
                                        <div class="pro-name">小米电视OLED液晶屏</div>
                                        <div class="pro-price">2699元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img src="../assets/imgs/nav-img/nav-3-3.png" alt="">
                                        </div>
                                        <div class="pro-name">小米全面屏电视 E55A</div>
                                        <div class="pro-price">1999元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img src="../assets/imgs/nav-img/nav-3-4.jpg" alt="">
                                        </div>
                                        <div class="pro-name">小米电视4A 32寸</div>
                                        <div class="pro-price">699元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img src="../assets/imgs/nav-img/nav-3-5.jpg" alt="">
                                        </div>
                                        <div class="pro-name">小米电视4A 55英寸</div>
                                        <div class="pro-price">1799元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img src="../assets/imgs/nav-img/nav-3-6.png" alt="">
                                        </div>
                                        <div class="pro-name">查看全部</div>
                                        <div class="pro-price">查看全部</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
                <div class="header-search">
                    <div class="srawpper">
                        <input type="text" name="keyword">
                        <a href="javascript:;"></a>
                    </div>

                </div>
            </div>


        </div>
    </div>
</template>

<script>
    export default {
        name: "NavHeader",
        data(){
            return{
                phoneList:[],
                
            }
        },
        computed:{
            username(){
                return this.$store.state.userName
            },
            cartCount(){
                return this.$store.state.cartCount
            }
        },
        filters:{
            currency(val){
                if(!val) return '0.00';
                return '$' +val.toFixed(2)+'元';
            }
        },
        mounted(){
            this.getPhoneList()
        },
        methods:{
            getPhoneList(){
                this.axios.get('/products',{
                    params:{
                        categoryId:'100012',//get请求传参需要加params参数，
                    }
                    }).then((res)=>{
                       if(res.list.length>6)
                           this.phoneList=res.list.slice(0,6);//当长度大于6时  利用slice截取6条数据
                })
            },
            goMyOrder(){
              this.$router.push('/order/list')
            },
            goToCart(){
                this.$router.push("/cart")
            },
            login(){
                this.$router.push("/login")
            }
        }
    }
</script>

<style lang="scss">//scss的语法可以叠加例如<div>，这是与css的不同之处
@import "src/assets/scss/base";
@import "src/assets/scss/mixin";
@import "src/assets/scss/config";
.header {
    .nav-topbar{
        height: 39px;
        line-height: 39px;
        background-color: #333333;
        .container{
            @include flex();
            /*display: flex;*/
            /*justify-content: space-between;*/
            /*align-items: center;*/
            a{
                display: inline-block;//块级元素
                color: #B0B0B0;
                margin-right: 17px;

            }
            .my-cart{
                width: 110px;
                text-align: center;
                background-color: #FF6600;
                color: #ffffff;
                margin-right: 0;
                .icon-cart{

                    @include bgImg(16px,12px,"../assets/imgs/icon-cart-checked.png");
                    /*display: inline-block;*/
                    /*width: 16px;*/
                    /*height: 12px;*/

                    /*!*background: url("./public/imgs/icon-cart-checked.png") no-repeat center;*!*/
                    /*background: url("../assets/imgs/icon-cart-checked.png") no-repeat center;*/
                    /*background-size: contain;*/
                    margin-right: 4px;
            }

            }
        }
    }
    .nav-header{
        .container{
            height: 112px;
            @include flex();
            position: relative;
            /*display: flex; 这部分等同上方scss函数调用 */
            /*justify-content: space-between;*/
            /*align-items: center;*/

            .header-menu{
                display: inline-block;
                padding-left: 209px;
                width: 643px;
                .item-menu{
                    display: inline-block;//横向排列block是竖着排列
                    color: #333333;
                    font-weight: bold;
                    font-size: 16px;
                    margin-right: 20px;
                    line-height: 112px;
                    span{
                        cursor: pointer;
                    }
                    &:hover{
                        color: $colorA;
                        .children{
                            height: 220px;
                            opacity: 1;
                        }
                    }
                    .children{
                        position: absolute;
                        top: 112px;
                        left: 0;
                        width: 1226px;
                        /*height: 220px;*/
                        height: 0;
                        opacity: 0;
                        overflow: hidden;/*默认隐藏，透明度0，高度0*/
                        transition: all 0.4s;
                        border-top:1px solid #E5E5E5 ;
                        box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
                        background: #ffffff;
                        z-index: 10;
                        .product{
                            position: relative;
                            float: left;
                            width: 16.6%;
                            height: 220px;
                            font-size: 12px;
                            line-height: 12px;
                            text-align: center;
                             a{
                                display: inline-block;
                            }
                            img{
                                height: 111px;
                                width: auto;
                                margin-top: 26px;
                            }
                            .pro-name{
                                font-weight: bold;
                                margin-top: 19px;
                                margin-bottom: 8px;
                                color:   #333333
                            }
                            .pro-price{
                                color: $colorA;
                            }
                            &:before{
                                content: '';
                                position: absolute;
                                top: 28px;
                                right: 0;
                                border-left: 1px solid $colorF;
                                height: 100px;
                            }
                            &:last-child:before{
                                display: none;
                            }
                        }
                    }
                }
            }
            .header-search{
                width: 319px;
                .srawpper{
                    height: 50px;
                    border: 1px solid #E0E0E0;
                    display: flex;
                    align-items: center;
                    input{
                        border: none;
                        border-right: 1px solid #E0E0E0;
                        width: 254px;
                        height:50px;
                        margin-left: 14px;
                    }
                    a{
                        @include bgImg(18px,18px,"../assets/imgs/icon-search.png");
                        margin-left: 13px;
                    }
                }
            }
        }
    }
}
</style>