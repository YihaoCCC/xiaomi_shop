<template>
    <div class="service" >
        <ul>
            <li><span class="icon-serve"></span>预约维修服务</li>
            <li><span class="icon-7day"></span>7天无理由退货</li>
            <li><span class="icon-15day"></span>15天免费换货</li>
            <li><span class="icon-150"></span>满150元包邮</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "ServiceBar"
    }
</script>

<style lang="scss">
   @import "src/assets/scss/config";
   @import "src/assets/scss/mixin";
    .service{
        padding: 33px 0;
        color: #666666;
        font-size: 16px;


        li{
            display: inline-block;
            text-align: center;
            width: 24.9%;
            border-right: 1px solid $colorD ;
            &:last-child{
                border: none;
            }
            // &::after{
            //     content: '|';
            //     margin-left: 100px;
            // }
            // &:last-child::after{
            //     display: none;
            // }
            span{
                width: 20px;
                height: 20px;
                display: inline-block;
                vertical-align: middle;
            }
            .icon-serve{
                @include bgImg(20px,20px,'../assets/imgs/icon-setting.png');
                margin-right: 8px;
            }
            .icon-7day{
                @include bgImg(20px,20px,'../assets/imgs/icon-7day.png');
                margin-right: 8px;
            }
            .icon-15day{
                  @include bgImg(20px,20px,'../assets/imgs/icon-15day.png');
                  margin-right: 8px;
              }
            .icon-150{
                @include bgImg(20px,20px,'../assets/imgs/icon-post.png');
                margin-right: 8px;
            }
        }
    }
</style>