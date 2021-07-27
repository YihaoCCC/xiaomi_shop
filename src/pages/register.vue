<template>
<div>
    <div class="register">
        <div class="logo">
            <img src="./../assets/mi-logo.png" alt="">
        </div>
        <h1>
        注册小米账号
        </h1>
        <div class="register-from" >          
                <span>国家\地区</span>
                <div class="input-box" :model="form">
                    <input  type="text" placeholder="国家地区" v-model="form.area">
                    <div class="icon-box">
                        <img src="./../assets/imgs/list.png" alt="">
                    </div>    
                </div>
                <p>成功注册后，国家\地区将不能被修改</p>            
                <span>手机号码</span>
                <div class="input-box">
                    <input type="text" placeholder="请输入手机号" v-model="form.phoneNumber">      
                </div>    
        </div>
        <button @click="this.registe"  class="btn register-btn">立即注册</button>
        <div class="form-footer" >
            <input type="radio" :checked="isChecked"  @click="changeChecked">
            <p><span>注册账号即代表您同意并愿意遵守小米 </span>用户协议 <span> 和 </span>隐私政策</p>
        </div>
    </div>
    <div class="reg-footer">
       
             <p>this is the footer scope</p>
        
    </div>
</div>
</template>
<script>
    export default {
        name:'register',
        data(){
            return{
                form:{
                    area:"中国",
                    phoneNumber:'',
                    
                },
                isChecked:false,
            }
        },
        methods:{
            registe(){
                let {form ,isChecked}=this;
                if(form.area && form.phoneNumber  )
                    {
                        if(isChecked){
                            alert("注册成功！");
                            console.log(form+isChecked);
                            form.phoneNumber='';
                        }
                        else{
                            alert("请勾选用户协议！")
                        }
                    }
                    else{
                        alert("请完善注册信息！")
                    }
                    
            },
            changeChecked(){
                this.isChecked=!this.isChecked;
            }
        }      
    }
</script>  
<style lang="scss">
@import './../assets/scss/config.scss';
html{
    width: 100%;
    background-color: #f5f5f5;
}
.register{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 800px;
    height: 500px;
    background-color: #ffffff ;
    text-align: center;
    border-radius: 45px;
    .logo{
        width: 50px;
        height: 50px;
        margin: auto;
        background-color: $colorA;
         border-radius: 20px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    h1{
        margin: 30px  0 25px 0; 
        font-size:30px;
        color:#333333;
    }
    .register-from{
        margin: auto;
        width: 332px;
        box-sizing: border-box;
        text-align: left;
        // padding: 0 30px 0 30px; 
        span{
            font-size: 14px;
            display: block;
            margin-top: 10px;
        }
        p{
            font-size:14px;
            color:#999999;
        }
        .input-box{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 42px;
            margin: 10px 0 10px 0;
            border: 1px solid #E5E5E5;
            input{
                height: 30px;
                border: none;
                margin-left:15px
            }
            .icon-box{
                cursor: pointer;
                width: 42px;
                height: 42px;
                text-align: center;
                border-left: 1px solid #E5E5E5;
                    img{
                        transform: translateY(80%);        
                }
            }
            
        }
    }
    .register-btn{
        margin-top: 30px;
        width: 332px;
        height: 42px;
    }
    .form-footer{
        width: 408px;
        height: 16px;
        
        margin: 40px  auto 10px auto;
        input{
            display: inline-block;
            vertical-align: middle;
        }
        p{
            display: inline-block;
            font-size: 14px;
            color: #333333;
            margin-left: 10px;
            
            span{

            color:#999999
        }
        }
        
    }
}
.reg-footer{
 width: 150px;
margin: auto;
  
    
}
</style>