<template>
    <div>
        <order-header title="我的购物车">
            <template v-slot:tips>
                <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
            </template>
        </order-header>
        <div class="cart">
            <div class="cart-body">
                <ul class="cart-body-header">
                    <div class="checkbox " :class="{'checked':allCheck}" @click="selectAll"></div>
                    <li class="col-1"  >全选</li>
                    <li class="col-3">商品名称</li>
                    <li class="col-1">单价</li>
                    <li class="col-2">数量</li>
                    <li class="col-1">小计</li>
                    <li class="col-1">操作</li>
                </ul>
                <ul class="cart-body-list" v-for="(item,index) in List " :key="index">
                    <div class="checkbox" :class="{'checked':item.productSelected }" @click="changeSelectedItem(item)"></div>
                    <li class="item-img">
                        <img v-lazy="item.productMainImage"  alt="">
                    </li>
                    <li class="item-name">{{item.productName}}  {{item.productSubtitle}}</li>
                    <li class="item-price">{{item.productPrice}}元</li>
                    <div class="item-num">
                        <div class="num-box">
                            <span @click="deleteNum(item)" style="cursor: pointer" >-</span>
                            {{item.quantity}}
                            <span @click="addNum(item)" style="cursor: pointer">+</span>
                        </div>
                    </div>
                    <li class="item-totalPrice" style="color: #FF6600" >{{item.productTotalPrice}}元</li>
                    <li class="item-deleteAll" @click="showmodal(item.productId)" >

                    </li>
                </ul>

            </div>
            <div class="cart-footer">
                <div class="footer-left">
                    <span @click="goShopping" style="cursor: pointer">继续购物</span>
                    <div style="display: inline-block;margin-left: 37px">共 <span class="num"> {{List.length}} </span> 件商品，已选择 <span class="num"> {{checkNum}} </span> 件</div>
                </div>
                <div class="footer-right">
                    <p style="display: inline-block">合计：<span>{{cartTotalPrice}}</span>元</p>
                    <button type="button" class="btn goPay" @click="goOrder" >
                        去结算
                    </button>
                </div>

            </div>
        </div>
        <service-bar></service-bar>
        <nav-footer></nav-footer>
        <modal
                :key="id"
                title="提示"
                sure-text="忍心删除"
                cancelText="我再想想"
                btn-type="3"
                modal-tape="middle"
                :show-modal="showModal"
                @submit="deleteAll(id)"
                @cancel="showModal=false"
        >
            <template v-slot:body>
                <p> 您确定要删除此商品吗？</p>
            </template>
        </modal>
    </div>
</template>

<script>
    import OrderHeader from "@/components/OrderHeader";
    import NavFooter from "@/components/NavFooter";
    import ServiceBar from "@/components/ServiceBar";
    import Modal from "@/components/Modal";
    export default {
        name: "cart",
        components:{
            Modal,
            OrderHeader,
            NavFooter,
            ServiceBar
        },
        data(){
            return{
                List:[],
                allCheck:false,
                cartTotalPrice:0,
                checkNum:0,
                showModal:false,
                id:0
            }
        },
        mounted(){
            this.getCartList();
        },
        methods:{
            showmodal(id){
              this.id=id ;
              this.showModal=true;
            },
            goShopping(){
              this.$router.push('/index')
            },

            getCartList() {
                this.axios.get("/carts").then((res)=>{
                   this.randerData(res)
                })
            },
            //全部选中
            selectAll(){
              let url = this.allCheck?'/carts/unSelectAll':'/carts/selectAll';
              this.axios.put(url).then((res)=>{
                  this.randerData(res)
              })
            },
            //重新渲染数据函数
            randerData(res){
                this.List = res.cartProductVoList;
                this.allCheck = res.selectedAll;
                this.cartTotalPrice = res.cartTotalPrice;
                this.checkNum=this.List.filter((i)=> i.productSelected).length;
            },
            changeSelectedItem(item){
                let selected = !item.productSelected;
                this.axios.put(`/carts/${item.productId}`,{

                    selected,
                }).then((res)=> this.randerData(res))
            },
            //减少商品
            deleteNum(item){
                let quantity = item.quantity;
                if(quantity === 1){
                    this.$message.warning("商品数量不能小于1");
                }
                else {
                    --quantity;
                    this.axios.put(`/carts/${item.productId}`,{
                        quantity,
                    }).then((res)=>this.randerData(res))
                }
            },
            //增加商品
            addNum(item){
                let quantity = item.quantity;
                ++quantity;
                if( item.productStock < quantity){
                    this.$message.warning("商品数量超过库存上限");
                }
                else {
                    this.axios.put(`/carts/${item.productId}`,{
                        quantity,
                    }).then((res)=>this.randerData(res))
                }
            },
            //删除此列所有商品
            deleteAll(id){
                this.axios.delete('/carts/'+id,{
                    productId:id
                }).then((res)=>{
                    this.List=res.cartProductVoList
                    this.cartTotalPrice = res.cartTotalPrice;
                }).then(()=>{this.showModal=false;
               }).then(()=>
                    this.$message.success("商品删除成功！"))
            },
            //跳转到订单界面
            goOrder(){
                let judgeStatus = this.List.every(item=>item.productSelected===false);//(和  （item=>!item.productSelected）作用相等)
                if(judgeStatus){
                  this.$message.warning("请至少选择一件商品！")

                }
                else {
                    this.$router.push('/order/confirm')
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "./../assets/scss/config";
    .cart{
        box-sizing: border-box;
        background-color: #f5f5f5;
        padding-bottom:30px;
        .cart-body{
            width: 1226px;
            box-sizing: border-box;
            margin: auto;
            transform: translateY(30px);
            background-color: white;
            padding: 0px 30px 0px 30px;
            .cart-body-header{
                display: flex;

                height: 75px;
                align-items: center;
                color: #666666;
                font-size: 16px;
                border-bottom:  1px solid #e5e5e5;
                text-align: center;
                .col-1{
                    flex: 1;
                }
                .col-2{
                    flex: 2;
                }
                .col-3{
                    flex: 3;
                    margin-left: 30px;
                }
                .checkbox{
                    width: 22px;
                    height: 22px;
                    margin:0 20px;
                    display: inline-block;
                    vertical-align: middle;
                    border: 1px solid #E5E5E5;
                    text-align: center;
                    background-size: 16px 12px;
                    &.checked{
                        background: url("./../assets/imgs/icon-gou.png") #FF6600 no-repeat center;
                        background-size: 16px 12px;
                        border:none;
                    }
                }
            }
            .cart-body-list{
                &:last-child{
                    border-bottom: none;
                }
                height: 120px;
                display: flex;
                align-items: center;
                text-align: center;
                color: #333333;
                font-size: 18px;
                border-bottom: 1px solid #e5e5e5;

                .checkbox{
                    width: 22px;
                    height: 22px;
                    margin:0 20px;
                    display: inline-block;
                    vertical-align: middle;
                    border: 1px solid #E5E5E5;
                    text-align: center;
                    background-size: 16px 12px;
                    &.checked{
                        background: url("./../assets/imgs/icon-gou.png") #FF6600 no-repeat center;
                        background-size: 16px 12px;
                    }
                }
                .item-img{
                    margin-left: 70px;
                    width: 80px;
                    height: 60px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .item-name{
                    flex: 3;
                }
                .item-price{
                    flex: 1;
                }
                .item-num{
                    flex: 2;
                    justify-content: center;
                    .num-box{
                        margin:auto;
                        width: 150px;
                        height: 40px;
                        box-sizing: border-box;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border:  1px solid #e5e5e5;
                        span{
                            width: 60px;
                        }
                    }
                }
                .item-totalPrice{
                    flex: 1;
                }
                .item-deleteAll{
                    flex: 1;
                    width:14px;
                    height:12px;
                    background:url('./../assets/imgs/icon-close.png') no-repeat center;
                    background-size:contain;
                    cursor:pointer;
                }
            }

        }
        .cart-footer{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 1226px;
            margin:30px auto 0 auto;
            height: 72px;
            color: #666666;
            font-size: 14px;
            .footer-left{
                .num{
                    font-size: 16px;
                    color: #FF6600;
                }
            }
            .footer-right{
                color: $colorA;

                span {
                    font-weight: bold;
                    font-size: 20px;
                }
                .goPay{
                    width: 202px;
                    height: 50px;
                    color: #ffffff;
                    margin-left: 31px;
                }
            }
        }
    }
</style>