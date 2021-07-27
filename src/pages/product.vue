<template>
    <div>
        <product-param v-bind:title="ProductionInfo.name">
            <template v-slot:buy >
                <button class="btn" @click="goToDetail">立即购买</button>
            </template>    
        </product-param>
        <div class="item-bg">
            <h2>{{ProductionInfo.name}}</h2>
            <h3>{{ProductionInfo.subtitle}}</h3>
            <p>
                <a href="">全球首款双频G</a>
                <a href="">晓龙888</a>
                <a href="">一亿像素主摄</a>
                <a href="">2K分辨率</a>
                <a href="">120HZ高刷</a>
            </p>
            <div class="price">
                <span>￥{{ProductionInfo.price}}</span>
            </div>
        </div>
        <div class="item-bg-2">
            <img src="./../assets/imgs/product/product-bg-2.png" alt="">
        </div>
        <div class="item-bg-3">
            <img src="./../assets/imgs/product/product-bg-3.png" alt="">
        </div>
        <div class="item-img-banner">
            <swiper :options="swiperOptions" > 
                <swiper-slide v-for="(item,index) in bannerListImg" :key=index><img :src="item" alt=""></swiper-slide>
                <!-- <swiper-slide><img src="./../assets/imgs/product/gallery-2.png" alt=""></swiper-slide>
                <swiper-slide><img src="./../assets/imgs/product/gallery-3.png" alt=""></swiper-slide>
                <swiper-slide><img src="./../assets/imgs/product/gallery-4.png" alt=""></swiper-slide>
                <swiper-slide><img src="./../assets/imgs/product/gallery-5.jpg" alt=""></swiper-slide>
                <swiper-slide><img src="./../assets/imgs/product/gallery-6.jpg" alt=""></swiper-slide> -->
                <div class="swiper-button-prev" slot="button-prev"></div><!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
                <div class="swiper-button-next" slot="button-next"></div><!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
                 <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
           
                <div class="add-title">
                   <p> 小米11ultra  1亿像素主摄</p>
                </div>  

                                                                            <!-- <div class="imglist">
                                                                                <img src="./../assets/imgs/product/gallery-2.png" alt="">
                                                                            </div>
                                                                            <div class="imglist">
                                                                                <img src="./../assets/imgs/product/gallery-3.png" alt="">
                                                                            </div>
                                                                            <div class="imglist">
                                                                                <img src="./../assets/imgs/product/gallery-4.png" alt="">
                                                                            </div> 这是第一种方法 -->
        </div>
        <div class="section-4">
            <div class="setLeft">
            <h1>
                冲破边界，
               <br>   
                想象照进未来
            </h1>
             <h3>
                小米11 Ultra 放胆想象，镜头格局冲破边界，
               <br> 为影像能力的飞跃，释放出空前的施展天地，
                <br>    功能与观感，都令人眼前一亮。
            </h3>
            </div>    
        </div>
        <div class="video-image" @click="showSlider=true" >
            <img src="./../assets/imgs/product/gallery-1.png" alt=""> 
        </div>
           <div class="video-box" >
                <div class="video-overlay" v-if="showSlider" ></div>
                <div class="video" v-bind:class="{'slider':showSlider}">
                    <span class="icon-close" @click="closeVideo"> </span>
                    <video src="./../assets/imgs/product/video.mp4"  ref="video" :pause="showSlider" controls='controls' muted loop></video>
                </div>
            </div>
    </div>
</template>

<script>
    import ProductParam from './../components/ProductParam';
    import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'
    export default {
        name: "product",
        components:{
            ProductParam,
            Swiper,
            SwiperSlide,
        },
        directives: {
            swiper: directive
        },
        methods:{
            getProductionInfo(){
                let id = this.$route.params.id;
                this.axios.get("/products/"+id).then((res)=>{
                    this.ProductionInfo=res;
                })
                // .then(()=>{
                //     this.$store.dispatch('saveProDuctionInfo',this.ProductionInfo)
                // })
            },
            closeVideo(){
                this.showSlider=false;
                this.$refs.video.pause();
            },
            goToDetail(){
                let id1 = this.$route.params.id;
                this.$router.push(`/detail/${id1}`);
            }
        },
        mounted(){
            this.getProductionInfo();
        },
        data(){
            return{
                ProductionInfo:[],
                showSlider:false,
                 swiperOptions:{
                    autoplay:true,
                    loop: true, // 循环模式选项
                    slidesPerView : 3,
                    spaceBetween : 20,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },//前进和后退
                    pagination: {
                        el: '.swiper-pagination',
                        
                        clickable :true,
                    },//分页器
                    //  effect : 'coverflow',
                    // slidesPerView: 3,
                    // centeredSlides: true,
                    // coverflowEffect: {
                    //     rotate: 0,
                    //     stretch: 10,
                    //     depth: -100,
                    //     modifier: 2,
                    //     slideShadows : true
                    // },
                },
                bannerListImg:[
                require('../assets/imgs/product/gallery-2.png'),
                require('../assets/imgs/product/gallery-3.png'),
                require('../assets/imgs/product/gallery-4.png'),
                require('../assets/imgs/product/gallery-5.jpg'),
                require('../assets/imgs/product/gallery-6.jpg'),
                ]
        }
    }
 }

</script>

<style lang='scss'>
.item-bg{
    background: url('./../assets/imgs/product/product-bg-1.png') no-repeat center;
    height:718px ;
   text-align: center;
   h2{
    font-size: 80px;
    padding: 40px 20px 10px 20px;
    }
    h3{
     font-size: 24px;
     padding:0 0 20px 0 ;
    }    
    a{
            color: #333333;
            &:after{
                content: '|';
                margin: 13px 10px; 
               }
              &:last-child::after{
                display: none; 
              }  
    }
    .price{
        margin-top: 30px;
        font-size: 38px;
        color:#333333;
          em{
            font-style:normal;
            font-size:30px;
          }
    }   
}
.item-bg-2{
    width: 1226px;
    margin:30px auto 30px auto;
    img{
        width: 100%;
        height: 100%;
    }
}
.item-bg-3{
    width: 100%;
    margin: 0 0 20px 0;
    img{
       width: 100%; 
       height: 100%;
    }
}
.item-img-banner{
    text-align: center;
    margin: 36px 0 20px 0;
    width: 100%;
    --swiper-pagination-color: #ff6600;
    img{
        width: 100%;
        height: 250px;
    }
    .add-title{
       margin-top: 20px;
       color:#333333;
       font-size:18px;
    }
    // display: flex;
    // width: 100%;
    // margin-bottom: 20px;
    
    // .item-img-banner{
    //     width: 33.3%;
    //     margin-right: 20px;
    //     img{
    //         width: 100%;
    //         height: 100%;
           
    //     }
    //      &:last-child{
    //             margin-right: 0;
    //      }
    // }
}
.section-4{
    text-align: center;
    background-image: url('./../assets/imgs/product/section4-1.jpg') ;
    height: 1000px;
    background-color:black;
    color: #ffffff;
    .setLeft{
        position: absolute;
        left:200px;
        text-align: left;
        h1{            
            font-size: 100px;
        }
    }
}
.video-image{
    text-align: center;
   background-color: #070708;
    img{
        margin: 30px 0 30px 0;
        width: 80%;
    }
}
.video-box{
    .video-overlay{
            position: fixed;
            width: 100%;
            height: 100%;
            top:0;
            left: 0;
            background-color: #333333;
            opacity: 0.4;
            z-index: 10;
        }
    .video{
            position: fixed;
            top:-50%;
            left: 50%;
            width: 1000px;
            height: 620px;
            transform: translate(-50%,-50%);
            z-index: 10;
            opacity: 0;
            transition: all 0.5s;
            &.slider{
                top:50%;
                opacity: 1;
            }
        .icon-close{
                position: fixed;
                z-index: 10;
                top:20px;
                right: 20px;
                cursor: pointer;
                display: inline-block;
                width: 20px;
                height: 20px;
                background: url('./../assets/imgs/icon-close.png') no-repeat center;
                background-size: contain;
            }
        video{
                width: 100%;
                height: 100%; 
                object-fit: cover;
                outline: none;
            }
        }
    }

</style>