<template>
    <div class="header">
        <div class="nav-topbar">
            <div class="container">
                <div class="topbar-menu">
                    <a href="https://www.mi.com/index.html" target="_blank">小米商城</a>
                    <a href="https://home.miui.com/" target="_blank">MIUI 12.5</a>
                    <a href="https://i.mi.com/" target="_blank">云服务</a>
                    <a href="https://www.mi.com/aptitude/list" target="_blank">协议规则</a>
                </div>
                <div class="topbar-user">
                    <a href="javascript:;" v-if="username" class="username">{{username}}
                        <div href="javascript:;" v-if="username" class="loginOut" @click="loginOut">
                            <svg t="1627824248794" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3622" width="22" height="22">
                                <path d="M780.113088 148.306985c31.402169 22.954303 59.39106 48.895226 83.796007 77.9081 24.490279 29.012874 45.396615 60.415043 62.889671 94.035844a486.221635 486.221635 0 0 1 53.417821 221.436494c0 66.558946-12.458469 129.107289-37.204745 187.559697a491.341554 491.341554 0 0 1-100.606407 152.573585 477.603105 477.603105 0 0 1-148.733645 103.251698 442.872988 442.872988 0 0 1-182.781106 38.143396 440.313028 440.313028 0 0 1-181.757122-38.228728 483.917671 483.917671 0 0 1-149.245637-103.166366A479.309744 479.309744 0 0 1 79.36685 729.24712 480.760388 480.760388 0 0 1 42.674098 541.687423c0-37.972732 4.351931-75.262808 13.055793-111.784896 8.789194-36.522088 21.162332-71.252205 37.204744-104.275683 16.042413-32.938145 36.010097-63.742991 59.732388-92.414537 23.722291-28.671546 50.34587-54.441805 79.614739-77.396107a65.44963 65.44963 0 0 1 93.267857 13.994445c11.093158 15.018429 15.359757 31.914161 12.543801 50.516533a68.094922 68.094922 0 0 1-26.196918 45.140619c-44.031303 32.938145-77.652104 73.385505-101.118399 121.42741a348.666479 348.666479 0 0 0-34.986113 154.792216c0 47.273918 8.61853 91.902545 26.111587 133.800548 17.493056 41.898003 41.386011 78.505424 71.678865 109.651598 30.463518 31.146174 66.046954 55.892448 106.920973 74.153492 40.874019 18.261044 84.307998 27.306234 130.387269 27.306235s89.598581-9.04519 130.472601-27.306235a343.375897 343.375897 0 0 0 106.835642-74.238824 353.274406 353.274406 0 0 0 72.276189-109.566266 338.597306 338.597306 0 0 0 26.70891-133.800548c0-55.892448-12.629133-108.712945-37.716736-158.546823a332.709399 332.709399 0 0 0-105.811658-123.048718 64.852307 64.852307 0 0 1-27.732894-44.031303 69.28957 69.28957 0 0 1 11.007826-51.625849 63.998987 63.998987 0 0 1 42.921987-27.391567 64.852307 64.852307 0 0 1 50.260537 11.263822zM510.890684 544.930039a62.719007 62.719007 0 0 1-46.591262-19.882352 66.046954 66.046954 0 0 1-19.37036-47.78591V68.692246c0-18.602372 6.399899-34.730117 19.37036-48.383234A61.951019 61.951019 0 0 1 510.890684 0c18.858368 0 34.730117 6.826559 47.700578 20.479676 12.885129 13.567785 19.37036 29.69553 19.37036 48.297902v408.398867a66.046954 66.046954 0 0 1-19.37036 47.78591 63.998987 63.998987 0 0 1-47.700578 19.967684z" fill="#ff6600" p-id="3623">

                                </path>
                            </svg>
                            <span>退出登录</span>
                        </div>
                    </a>

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
                        <div class="children">
                            红米？黑米都不写了
                        </div>
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
            this.getPhoneList();
            let path = this.$route.params;
            if(path && path.from === 'login'){
                this.getCartCount();

            }
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
            },
            loginOut(){
                this.axios.post('/user/logout').then(()=>{
                    this.$cookie.set('userId','',{expires:'-1'});
                    this.$message.success("退出登录成功！");
                    this.$store.dispatch('saveUserName','');
                    this.$store.dispatch('saveCartCount','0');
                })
            },
            getCartCount(){
                this.axios.get('carts/products/sum').then((res)=>{
                    this.$store.dispatch('saveCartCount',res)
                })
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
            .topbar-user{
                .username{
                    .loginOut{
                        span{
                            color: #FF6600;
                        }
                        display: flex;
                        align-items: center;
                        position: absolute;
                        width:100px;
                        overflow: hidden;
                        text-align: center;
                        right: 200px;
                        height: 30px;
                        opacity: 0;
                        top:39px;
                        transition: all 0.3s;
                    }
                    &:hover{
                        .loginOut{
                            z-index: 10;
                            opacity: 1;
                            height: 30px;
                        }
                    }
                }
            }
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