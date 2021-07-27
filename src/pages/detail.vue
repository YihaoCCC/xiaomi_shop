<template>
<div>
    <product-param :title="detailInfo.name" ></product-param>
    <div class="containerDetail">
            <div class="productSwiper">
                <swiper :options="swiperOptions" >
                    <swiper-slide v-for="(item,index) in detailListImg" :key="index"><img :src="item" alt=""></swiper-slide>
                    <div class="swiper-button-prev" slot="button-prev"></div><!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
                    <div class="swiper-button-next" slot="button-next"></div><!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
            <div class="detail">
                <div class="detailTitle">
                    <h2>{{detailInfo.name}}</h2><br>
                    <p style="line-height:18px">相机全新升级 / 960帧超慢动作 / 手持超级夜景 / 全球首款双频GPS / 骁龙845处理器 / 红
                        外人脸解锁 / AI变焦双摄 / 三星 AMOLED 屏</p>
                    <h4>小米自营</h4>
                    <div style="margin-top:14px">
                    <span>{{detailInfo.price}}元 </span><em style="text-decoration: line-through;margin-left:10px">2999元</em>
                </div>
                </div>
                <div class="adress">
                    <div style="display:flex">
                        <img src="./../assets/imgs/detail/icon-loc.png" alt="">
                        <p></p>
                        <input type="text" value="北京 北京市 朝阳区 安定门街道" style="margin-left:20px">    
                        <span style="margin-left:20px;line-height: 22px">修改</span>
                    </div>
                    <span style="margin-left:40px;margin-top:10px;display:block">
                        有现货
                    </span>
                </div>
                <h2 style="margin:20px 0 0 0">选择版本</h2>
                <div class="version">
                    <div class="version-box" v-for="(item,index) in versionInfo" :key=index @click="choose(item,index)" :class="{'version-shadow':version==index}" >
                        <span>{{item.version}} {{item.dataV}}</span> {{item.price}}元
                    </div>
                   
                </div>
                <h2 style="margin:20px 0 20px 0">选择颜色</h2>
                <div class="color">
                    <div class="color-box"></div>
                    深空灰
                </div> 
                
                <div class="total" >
                    
                   <!--  <div  v-show="this.total"> -->
                    <span style="">{{detailInfo.name}}</span>
                    <div v-if="this.total.length===0">请选择商品属性</div>
                    <div v-else class="total-version-money">
                    <div class="choose-version-color" v-for="(item,index) in versionInfo" :key=index :style="version!==index?'display:none':''" >
                         {{version === index ? item.version+item.dataV +" 深空灰":''}}
                    </div>
                    <p>总计: {{this.total.price}} 元</p>
                    </div>
                </div>

                <div class="detail-btn">
                    <div class="btn btn-huge " @click="addCart">
                        加入购物车
                    </div>
                    <div class="btn-like">
                         喜欢
                    </div>
                </div>

            </div>
    </div>
    <div class="detail-banner">
        <div class="container">
            <h2>价格说明</h2>
            <img src="./../assets/imgs/detail/item-price.jpeg" alt="">
        </div>   
    </div>
    <service-bar></service-bar>
</div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import ProductParam from '../components/ProductParam.vue'
import ServiceBar from '@/components/ServiceBar'

    export default {
        name: "datail",
        components: {
            Swiper,
            SwiperSlide,
            ProductParam,
            ServiceBar,
                
         },
         directives: {
            swiper: directive
         },
        data(){
            return{
                version:6,
                detailInfo:[],
                total:[],
                versionInfo:[{
                    version:'6G+128GB',
                    dataV:'移动4G',
                    price:1099,
                },{
                    version:'8G+128GB',
                    dataV:'全网通',
                    price:1299,
                },{
                    version:'12G+256GB',
                    dataV:'全网通',
                    price:2099,
                }],
                detailListImg:[
                require('../assets/imgs/detail/phone-1.jpg'),
                require('../assets/imgs/detail/phone-2.jpg'),
                require('../assets/imgs/detail/phone-3.jpg'),
                require('../assets/imgs/detail/phone-4.jpg'),
                ],
                swiperOptions: {
                   autoplay:true,
                    loop: true, // 循环模式选项
                   
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },//前进和后退
                    pagination: {
                        el: '.swiper-pagination',
                        
                        clickable :true,
                    },
                }
            }
        },
       
        mounted(){
            this.getInfo();
            console.log(this.total.length)
            // this.detailInfo=this.$store.state.ProDuctionInfo
        },
        methods:{
            getInfo(){
                let id=this.$route.params.id;
                this.axios.get(`/products/${id}`).then((res)=>{
                    this.detailInfo=res;
                })
            },
            addCart(){
                this.axios.post('/carts',{
                    productId:this.$route.params.id,
                    selected: true
                }).then((res)=>{
                    this.$store.dispatch('saveCartCount',res.cartTotalQuantity);
                    this.$router.push('/cart');
                })
            },
            choose(item,index){
                console.log(this.total.length);
                this.version=index;
                this.total=item;     
            }
        }
    }
</script>

<style lang="scss">
@import "./../assets/scss/base.scss";
@import "./../assets/scss/config.scss";
.containerDetail{
    width: 1226px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: space-between;
    .productSwiper{
        margin-top: 100px;
        text-align: center;
        width: 533px;
        img{
            width: 384px;
        }
        .swiper-button-prev{
            width: 17px;
            height: 32px;
        }
    }
    .detail{
        width: 579px;
        .detailTitle{
            padding-bottom: 20px;
            border-bottom: 1px solid #E5E5E5;
            p{
               color:#BBBBBB; 
            }
            h4{
                margin-top: 16px;
                font-size: 16px;
                color: $colorA;
            }
            span{
                font-size:20px;
                color: $colorA;
            }
        }
        .adress{
            width: 100%;
            height: 108px;
            margin-top:20px;
            vertical-align: middle;
            background-color: #FAFAFA;
            border: 1px solid #E5E5E5;
            box-sizing: border-box;
            padding: 20px 20px 20px 20px;
            
            img{
                width: 20px;
                height: 22px;
            }
            input{
                
                border: none;
            }
            span{
                font-weight:bold;
                color: $colorA;
            }
        }
        .version{
            display: flex;
            justify-content: space-between;
            flex-wrap:wrap;
            
            .version-box{
                margin-top: 20px;
                cursor: pointer;
                width: 268px;
                font-size: 16px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                border: 1px solid #e5e5e5;
                translate:  all 0.6s;
                span{
                    color:$colorA;
                }
            }
            .version-shadow{
                border: 1px solid $colorA;
            }
        }
        .color{
           width: 268px;
                font-size: 16px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                border: 1px solid $colorA;
            .color-box{
                display: inline-block;
                width: 14px;
                height: 16px;
                background-color: #666666;
                margin-right: 5px;
                transform: translateY(2px);
            }
        }
        .total{
            margin: 30px 0 20px 0;
            width: 100%;
            height: 108px;
            vertical-align: middle;
            background-color: #FAFAFA;
            border: 1px solid #E5E5E5;
            box-sizing: border-box;
            padding: 20px 20px 20px 20px;
            .total-version-money{
                display: flex;
                justify-content: space-between;
                p{
                    line-height: 23px;
                    color: $colorA;
                    margin-top: 20px;
                    font-size: 24px;              
                }
            }
            span{
                font-size:20px;
                font-weight:bold;
                margin-bottom:10px;
                display:block
            }

        }
        .detail-btn{
            display: flex;
            align-items: center;
            margin-bottom: 40px;
            .btn-like{
                margin-left: 20px;
                display: inline-block;
                background-color: #BBBBBB;
                text-align: center;
                height: 54px;
                line-height: 54px;
                width: 150px;
                color: #ffffff;
            }
        }

    }

}
 .detail-banner{
        padding-top: 20px;
        background-color: #F3F3F3;
        height: 280px;
        h2{
            margin-bottom: 10px;
        }
       
    }
</style>