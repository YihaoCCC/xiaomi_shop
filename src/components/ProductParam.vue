<template>
    <div class="nav-bar" :class="{'is_fixed':isfiexd}">
        <div class="container">
            <div class="pro-title">
                {{title}}
            </div>
            <div class="pro-param">
                <div class="test">
                    <a href="">概述</a>
                    <a href="">参数</a>
                    <a href="">用户评价</a>
                </div>
                <slot name="buy"> 
                </slot>    
            </div>
        </div>
    </div>
</template>
<script>
export default{
    name:'nav-bar',
    props:{
        title:String,
    },
    data(){
        return{
            isfiexd:false,
        }
    },
    computed:{
        judge(){
             let scrollheight=window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            return scrollheight
        }
         
    },
    mounted(){
        window.addEventListener('scroll',this.initHeight)
    },
    methods:{
        initHeight(){
            let scrollheight=window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            this.isfiexd=scrollheight >152 ?true:false;
            console.log(scrollheight)
        }
    },
    destroyed(){
        window.removeEventListener('scroll',this.initHeight,false)//
    }
}
</script>
<style lang='scss'>
.is_fixed{
    top:0;
    width: 100%;
    position: fixed;
    box-shadow: 0 5px 5px #e5e5e5;
    transition: all 0.5s;
    z-index: 9;
}
.nav-bar{
    height: 70px;
    line-height: 70px;
    border-top:1px solid  #e5e5e5;
    background: #ffffff;

    .container{
        display: flex;
        justify-content:space-between;
        .pro-title{
                font-size: 16px;
                font-weight: bold;
            }
        .pro-param{
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            a{
                color: #666666;
                &:after{
                    content: '|';
                    margin: 0 10px;
                }
                &:last-of-type::after{
                    content: '';
                }
                // &:last-child:after{
                //     content: '';
                // }
            }
            
        }
    }
    
}
</style>