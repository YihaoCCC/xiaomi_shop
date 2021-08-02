<template>
    <div class="index">
        <div class="container">
            <div class="swiper-box">
                <div class="nav-menu">
                    <ul class="menu-warp">
                        <li class="menu-item">
                            <a href="javascript:;">手机 电话卡</a>
                                <div class="children">
                                    <ul v-for="(item,index) in menuList" :key="index">
                                        <li v-for="(sub,j) in item " :key="j">
                                            <a :href="sub? '/#/product/'+sub.id:' '">
                                                <img :src="sub? sub.img:require('../assets/imgs/item-box-1.png')" alt="">
                                                {{sub?sub.name:'小米商城测试'}}
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">电视 盒子</a>
                            <div class="children">
                                没有图片了，不写了
                            </div>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">笔记本 平板</a>
                            <div class="children">
                                没有图片了，不写了
                            </div>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">家电 插线板</a>

                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">出行 穿戴</a>

                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">智能  路由器</a>

                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">生活 电话卡</a>

                        </li>

                    </ul>
                </div>
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item,id) in swiperList" :key="id">
                        <a :href="'/#/product/'+item.id"><img :src="item.img" alt=""></a>
                    </swiper-slide>
                    <div class="swiper-button-prev" slot="button-prev"></div><!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
                    <div class="swiper-button-next" slot="button-next"></div><!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
                    <div class="swiper-pagination"  slot="pagination"></div>
                </swiper>
            </div>
            <div class="ads-box">
                <ul v-for="(item,index) in adsList" :key="index">
                    <li>
                        <a :href="'/#/product/'+item.id"><!--<img :src=item.img alt=""></a>  这是懒加载之前的写法-->
                            <img v-lazy=item.img alt=""></a><!--图片懒加载-->
                    </li>
                </ul>
            </div>
            <div class="banner">
                <a href="/#/product/30">
                    <img src="../assets/imgs/banner-1.png" alt="">
                </a>
            </div>

        </div>
        <div class="product-box">
            <div class="container">
                <h2>手机</h2>
                <div class="wrapper">
                    <div class="ads-left">
                        <div class="item-img">
                            <a href="/#/product/30"> <img src="../assets/imgs/mix-alpha.jpg" alt=""></a>
                         </div>
                    </div>
                    <div class="List-right">
                        <div class="list" v-for="(item,index) in phoneList" :key="index">
                            <div class="item"  v-for="(sub,j) in item" :key="j">
                                <span :class="{'new-pro':j%2==0,'kill-pro':j%2!=0}">新品</span>
                                <a :href="'/#/product/'+sub.id"><!--<img :src="sub.mainImage" alt="">-->
                                    <img v-lazy="sub.mainImage" :key="sub.mainImage" alt="">
                                </a>
                                <div class="item-info">
                                    <h3>{{sub.name}}</h3>
                                    <p>{{sub.subtitle}}</p>
                                    <p @click="addCart(sub.id)">{{sub.price}}元</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <service-bar></service-bar>
        <Modal title="提示"
               sure-text="查看购物车"
               btn-type="1"
               modal-tape="middle"
               :show-modal="showModal"
                @submit="goToCart()"
               @cancel="showModal=false"
        ><!--自定义事件，是从子组件用￥emit传过来的-->
            <template v-slot:body>
                <p>商品添加成功</p>
            </template>

        </Modal>
        <div class="slider-bar" v-show="showSliderBar">
            <div class="slider-box" v-for="(item,index) in sliderList" :key="index" >
                <div class="img-box" >
                    <img :src="item.img" alt="">
                </div>
                {{item.title}}
            </div>
            <div class="back" @click="backTop">
                <svg t="1626941085315" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3233" width="32" height="32">
                    <path d="M536.255427 195.182354c-7.804756-7.804756-17.966187-11.615549-28.311813-11.615549-9.43693 0-18.874883 3.449565-26.496467 10.163477-2.360767 1.452071-4.356214 3.267417-6.352685 5.262864L218.47792 455.611735c-15.607466 15.60542-15.607466 40.834011 0 56.43943 15.607466 15.607466 41.558511 15.607466 57.167001 0l193.46013-192.733583 0 600.526219c0 22.1423 17.787108 39.927361 39.927361 39.927361 22.140253 0 39.927361-17.785062 39.927361-39.927361L548.959773 319.317583 737.15704 508.422522c15.607466 15.607466 40.469714 15.607466 56.078203 0 15.607466-15.607466 15.425318-40.834011-0.182149-56.441477L536.255427 195.182354 536.255427 195.182354z" p-id="3234" fill="#ff6600"></path>
                    <path d="M101.784174 143.097092l816.674071 0c22.140253 0 39.925315-17.785062 39.925315-39.927361 0-22.140253-17.784038-39.925315-39.925315-39.925315L101.784174 63.244416c-22.140253 0-39.927361 17.785062-39.927361 39.925315C61.856813 125.31203 79.643921 143.097092 101.784174 143.097092L101.784174 143.097092z" p-id="3235" fill="#ff6600"></path>
                </svg>
                <span >顶部</span>
            </div>
        </div>
    </div>
</template>

<script>
    import { Swiper, SwiperSlide, directive} from 'vue-awesome-swiper'
    import ServiceBar from "@/components/ServiceBar";
    import 'swiper/css/swiper.css'
    import Modal from "@/components/Modal";
    import {debonce} from './../util/scrollTop'
    export default {
        name: "index",
        components:{
            Swiper,
            SwiperSlide,
            ServiceBar,
            Modal,

        },
        directives: {
            swiper: directive
        },
        data(){
            return{
                sliderList:[{
                    title:'我的购物',
                    img:require("./../assets/imgs/icon-cart.png"),
                },
                    {
                        title:'维修服务',
                        img:require('./../assets/imgs/icon-setting.png')
                    },
                    {
                        title:'搜索',
                        img: require('./../assets/imgs/icon-search.png')
                    }],
                showSliderBar:true,
                swiperOption:{
                    autoplay:true,

                    loop: true, // 循环模式选项
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },//前进和后退
                    pagination: {
                        el: '.swiper-pagination',
                        clickable :true,
                    },//分页器
                    effect : 'cube',//动画效果
                    cubeEffect: {
                        slideShadows: true,
                        shadow: true,
                        shadowOffset: 16,
                        shadowScale: 0.9
                    },
                },
                swiperList:[
                    {
                        id:30,
                        img:require('../assets/imgs/slider/slide-1.jpg')

                    },
                    {
                        id:32,
                        img:require("../assets/imgs/slider/slide-2.jpg")
                    },
                    {
                        id:'',
                        img:require("../assets/imgs/slider/slide-3.jpg")
                    },
                    {
                        id:'',
                        img:require("../assets/imgs/slider/slide-4.jpg")
                    },
                    {
                        id:'',
                        img:require("../assets/imgs/slider/slide-5.jpg")
                    }
                ],
                menuList:[
                    [
                        {
                            id:30,
                            img:require('../assets/imgs/item-box-1.png'),
                            name:'小米11',
                        },
                        {
                            id:31,
                            img:require('../assets/imgs/item-box-2.png'),
                            name:'小米11青春般',
                        },
                        {
                            id:32,
                            img:require('../assets/imgs/item-box-3.jpg'),
                            name:'Redmi K40 pro',
                        },
                        {
                            id:30,
                            img:require('../assets/imgs/item-box-4.jpg'),
                            name:'移动5G专区',
                        },
                    ],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                ],
                adsList:[
                    {
                        id:30,
                        img:require('../assets/imgs/ads/ads-1.png')
                    },
                    {
                        id:31,
                        img:require('../assets/imgs/ads/ads-2.jpg')
                    },
                    {
                        id:32,
                        img:require('../assets/imgs/ads/ads-3.png')
                    },
                    {
                        id:33,
                        img:require('../assets/imgs/ads/ads-4.jpg')
                    },
                ],
                phoneList:[
                    [1,2,3,4],
                   [5,6,7,8]
                ],
                showModal:false,
            }
        },
        mounted(){
            this.init();
            this.scollToTop();
            window.onscroll = debonce(this.scollToTop,100);
            // window.addEventListener('scroll',this.scollTop);
        },
        methods:{
            backTop(){
                document.documentElement.scrollTop = document.body.scrollTop = 0
                // const that = this;
                // let timer = setInterval(()=>{
                //     let ispeed = Math.floor(-that.scollTop()/5)
                //     document.documentElement.scrollTop = document.body.scrollTop = that.scollTop + ispeed
                //     if(that.scollTop === 0){
                //         clearTimeout(timer)
                //     }
                // },300)
            },
            scollToTop(){
                let top=document.documentElement.scrollTop || document.body.scrollTop;
                this.showSliderBar = top>=400?true:false;
                console.log(top)
            },

            init(){
                this.axios.get('/products',{
                    params:{
                        categoryId:100012,
                        pageSize:8
                    }
                }).then((res)=> {
                    this.phoneList=[ res.list.slice(0,4),res.list.slice(4,8)]
                    // console.log(res)
                    // console.log(res.list)
                })
            },
            addCart(id){

                this.axios.post('/carts',{
                    productId:id,
                    selected: true
                }).then((res)=>{
                    this.showModal=true;
                    this.$store.dispatch('saveCartCount',res.cartTotalQuantity);

                })
                //     .then((res)=>{
                //     this.$router.push('/cart');
                //
                // })
            },
            goToCart() {
                this.$router.push('/cart');
            },

        }
    }
</script>

<style lang="scss">
    @import "src/assets/scss/config";

    .index{
        .slider-bar{
            position: fixed;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            top: 100px;
            width:50px;
            right: 6px;
            height: 290px;
            box-sizing: border-box;
            background-color: #ffffff;
            .back{
                cursor: pointer;display: flex;flex-direction: column;justify-content: center;
                text-align: center;
                padding: 10px 0;
                span{
                    color: #ff6600;
                    font-weight: bold
                }
                svg{
                    margin: auto;
                }
                &:hover{
                    svg{
                        path{
                            fill: white;
                        }
                    }
                    span{
                        color: #ffffff;
                    }
                    color: #ffffff;
                    background-color: #ff6600;
                }
            }
            .slider-box{
                padding:10px 7.3px 10px 7.3px;
                cursor: pointer;
                text-align: center;
                border-bottom: 1px solid #e5e5e5;
                .img-box{
                    margin: auto;
                    width: 32px;
                    height: 27px;
                    img{
                      width: 100%;
                        height: 100%;
                    }
                }
            }
        }
        .swiper-box{
            .nav-menu{
                position: absolute;
                width: 264px;
                height: 451px;
                z-index: 2;
                padding: 26px 0;
                background-color: #55585a7a;
                box-sizing: border-box;
                .menu-warp{
                    .menu-item{
                        height: 50px;
                        line-height: 50px;

                        a{
                            position: relative;
                            display: block;
                            color: #ffffff;
                            font-size: 16px;
                            padding-left: 30px;
                            &:after{
                                position: absolute;
                                right: 30px;
                                top: 17.5px;
                                display: inline-block;
                                content: ' ';
                                width: 10px;
                                height: 15px;
                                background: url("../assets/imgs/icon-arrow.png")  no-repeat center ;
                                background-size: contain;
                            }
                        }
                        &:hover{
                            background-color: $colorA;
                            .children{
                                width: 962px;
                            }
                        }
                        .children{
                            transition: all 0.7s;
                            overflow: hidden;
                            width: 0;
                            height: 451px;
                            background-color: $colorG;
                            position: absolute;
                            top:0;
                            left: 264px;
                            border: 1px solid $colorH;
                            ul{
                                display: flex;
                                justify-content: space-between;
                                height: 75px;
                                li{
                                    height: 75px;
                                    line-height: 75px;
                                    width: 241px;
                                    padding-left: 23px;
                                    img{
                                        width: 42px;
                                        height: 35px;
                                        vertical-align: middle;
                                        margin-right: 15px ;
                                    }
                                    a{

                                        color: $colorB;
                                        font-size: 14px;

                                    }
                                }
                            }
                        }
                    }
                }
            }
            .swiper-container{
                    width: 100%;
                    height: 451px;
                .swiper-button-prev{
                    margin-left: 269px;
                }
                img{
                    width: 100%;
                    height: 451px;
                }
            }
        }
        .ads-box{
            display: flex;
            justify-content: space-between;
            margin-bottom: 31px;
            ul{
               img{
                   width: 296px;
                   height: 197px;
                   box-sizing: border-box;
                   padding-top: 18px;
               }
            }
        }
        .banner{
            margin-bottom: 31px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .product-box{
            background-color: $colorJ;
            h2{
                font-size: 22px;
            }
            .wrapper{
                display: flex;
                .ads-left{
                    margin-right: 16px;
                    img{
                        width: 224px;
                        height: 619px;
                    }
                }
                .List-right{
                    .list{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .item{
                            width: 236px;
                            height: 302px;
                            background-color: #ffffff;
                            margin:  0 14px  14px 0 ;
                            text-align: center;
                            span{
                                display:inline-block;
                                width:67px;
                                height:24px;
                                font-size:14px;
                                line-height:24px;
                                color: #ffffff;
                                &.new-pro{
                                    background-color: #7ECF68;
                                }
                                &.kill-pro{
                                    background-color: #FF6606;
                                }
                            }
                            img{
                                height: 190px;
                                width: 100%;

                            }
                            .item-info{
                                h3{
                                    font-size: 14px;
                                }
                                p{
                                    margin-top: 6px;
                                    color: $colorD;
                                    font-size: 12px;
                                    padding:0 10px 0 10px;
                                    overflow: hidden;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                    &:last-child{
                                        margin-top: 13px;
                                        font-size: 14px;
                                        font-weight: bold;
                                        color: red;
                                        cursor:pointer;
                                        &:after{
                                            display: inline-block;
                                            width: 22px;
                                            height: 22px;
                                            background: url("../assets/imgs/icon-cart-hover.png")  no-repeat center ;
                                            background-size: contain;
                                            content: ' ';
                                            margin-left: 5px;
                                            vertical-align: middle;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }
    }
</style>