<template>
    <div class="login">
        <div class="container">
            <div class="login-header">
                <div class="logo">
                    <img src="../assets/mi-logo.png" alt="">
                </div>
                <div class="text">
                    <h1>小米商城</h1>
                    <p>让每个人都能享受科技的乐趣</p>
                </div>
            </div>
            <div class="login-body">
                <h3>
                    <span class="checked">帐号登录</span><span class="sep-line">|</span><span>扫码登录</span>
                </h3>
                <div class="input">
                    <input type="text" placeholder="请输入帐号" v-model="username">
                </div>
                <div class="input">
                    <input type="password" placeholder="请输入密码" v-model="password">
                </div>
                <div class="btn-box">
                    <a href="javascript:;" class="btn" @click="login">登 录</a>
                </div>
                <div class="tips">
                    <div class="sms" @click="register">手机短信登录/注册</div>
                     <div class="reg">立即注册<span>|</span>忘记密码？</div>
                </div>
            </div>
        </div>
        <div class="backimg">
            <img src="../assets/imgs/login-bg.jpg" alt="">
        </div>
        <div class="container">
            <div class="login-footer">
                <div class="footer-link">
                    <a href="https://www.runoob.com/" target="_blank">菜鸟教程</a>
                    <a href="http://nodejs.cn/learn" target="_blank">Node.js</a>
                    <a href="http://60.205.208.162/" target="_blank">陈奕豪服务器</a>
                    <a href="https://www.imooc.com/" target="_blank">慕课网</a>
                    <a href="https://coding.imooc.com/?c=fe" target="_blank">实战课618专享优惠课程</a>
                    <a href="https://cn.vuejs.org/" target="_blank">Vue.js </a>
                </div>
                <p>Copyright ©1 <span class="copyright">mi.futurefe.com@陈奕豪</span> All Rights Reserved.</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data(){
            return{
                username:'',
                password:'',
                userid:''
            }
        },
        methods:{
            login(){
                let { username,password } = this;
                if(!username || !password){
                   alert('请输入正确的用户名和密码');
                    return;
                }
                this.axios.post('/user/login',{
                    username,
                    password
                }).then((res)=>{
                    this.$cookie.set('userId',res.id,{expires:'Session'})
                    this.$store.dispatch('saveUserName',res.username)
                    // this.$router.push({
                    //     path:'/index',
                    //     query:{
                    //         from:'login',
                    //     }
                    // })
                    //两种传参方式
                    this.$router.push({
                        name:'index',//对应的是router.js中定义的路由地址名称
                        params:{
                            from:'login',
                        }
                    })
                })
            },
            register(){
                this.$router.push('register')
            //     this.axios.post('/user/register',{
            //         username:'yihao',
            //         password:'666',
            //         email:'yihao@163.com'
            //     }).then(()=>
            //     alert("注册成功！")
            //     )
            }
        }

    }
</script>

<style lang="scss">
    .container{
        position: relative;
        .login-header{
            display: flex;
            height: 112px;
            align-items: center;
            .logo{
                width: 53px;
                height: 53px;
                background: #FF6600;
                border-radius: 20px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .text{
                margin-left: 18px;

                p{
                    font-size: 11px;
                    color: #666666;
                }
            }
        }
        .login-body{
            position: absolute;
            width: 340px;
            height: 350px;
            background: #ffffff;
            right: 130px;
            margin-top: 15px;
            box-sizing: border-box;
            padding: 0 20px 0 20px;
            border-radius: 20px;

            h3{
                font-size: 20px;
                margin-top: 30px;
                text-align: center;
                margin-bottom: 40px;
                .checked{
                    color: #FF6600;
                }
                span{
                    margin-right: 20px;
                }
            }
            .input{
                display:inline-block;
                width: 100%;
                border:1px solid #E5E5E5;
                height: 45px;
                margin-bottom: 20px;
                input{
                    box-sizing: border-box;
                    width: 100%;
                    height: 100%;
                    border: none;
                    padding: 8px;
                }
            }
            .input:last-child{
                margin-top: 10px;
            }//为什么没用
            .btn-box{
                width: 100%;
                height: 38px;
                .btn{
                    width: 100%;
                    height: 100%;
                    line-height: 38px;
                }
            }
            .tips{
                margin-top:14px;
                display: flex;
                justify-content: space-between;
                font-size:12px;
                cursor: pointer;
                .sms{
                color:#FF6600;
                }
                .reg{
                    color:#999999;
                    span{
                        margin:0 7px;
                    }
                }
            }
        }
    }
    .backimg{
        width: 100%;
        height: 380px;
        img{
        width: 100%;
        height: 100%;
    }
    }
    .login-footer{
        height:100px;
        padding-top:60px;
        color:#999999;
        font-size:16px;
        text-align:center;
        .footer-link{
            a{
                color:#999999;
                display:inline-block;

                &:after{
                    content: '|';
                    margin-right: 10px;
                    margin-left: 10px;
                }
                &:last-child:after{
                    content: ' ';
                }
            }
            span{
                margin:0 10px;
            }
        }
        .copyright{
            color: #FF6600;
            margin-top:13px;
        }
    }

</style>