<template>
    <div class="footer">
        <div class="footer-logo">
            <img src="../assets/imgs/logo-footer.png" alt="">
            <p>YY商城</p>
        </div>

        <div class="footer-link">
            <a href="https://www.runoob.com/" target="_blank">菜鸟教程</a>
            <a href="http://nodejs.cn/learn" target="_blank">Node.js</a>
            <a href="http://60.205.208.162/" target="_blank">陈奕豪服务器(已关闭)</a>
            <a href="https://www.javascript.com/" target="_blank">JavaScript</a>
            <a href="https://react.docschina.org/" target="_blank">React</a>
            <a href="https://cn.vuejs.org/" target="_blank">Vue.js </a>
        </div>
        <div >
            <p>Copyright © <span class="copyright">mi.futurefe.com@陈奕豪</span> All Rights Reserved.</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NavFooter"
    }
</script>

<style lang="scss">
    @import "src/assets/scss/config";
    .footer{
        height: 234px;
        border-top: 4px solid $colorA;
        background-color: $colorB;
        color: $colorD;
        text-align: center;
        font-size: 16px;
        .footer-logo{
            width: auto;
            margin-top: 46px;
            margin-bottom: 31px;
            img{
                width: 53px;
                height: 36px;
                margin-bottom: 13px;
            }
        }
        .footer-link{
            margin-bottom: 14px;
            a{
                color: $colorD;
                &:after{
                    content: '|';
                    margin-right: 6px;
                    margin-left: 6px;
                }
                &:last-child:after{
                    display: none;
                }
            }
        }
        .copyright{

            color: $colorA;
        }
    }
</style>