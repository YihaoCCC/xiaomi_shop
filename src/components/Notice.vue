<template>
    <div>
        <el-button type="danger" class="notice" @click="dialogVisible = true">陈一奕Tips</el-button>
         <el-dialog
            title="Notices From Cyh Website（本站数据来源：https://www.imooc.com）"
            :visible.sync="dialogVisible"
            width="70%"
            top="28px"
            :close-on-click-modal='false'
            >
            <img src="../assets/notice.gif" alt="">
            <span slot="footer" class="dialog-footer" >
                <el-link type="primary" href="https://github.com/" target="_blank">项目git访问地址：</el-link>
                <el-link type="success" style="margin-left: 5px" href='https://github.com/YihaoCCC/xiaomi_shop' target="_blank" > https://github.com/YihaoCCC/xiaomi_shop</el-link>
                <el-button @click="dialogVisible = false" style="margin-left: 20px" >取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">我已知晓</el-button> 
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        showNotice: Boolean
    },
    data() {
        return {
               dialogVisible: this.showNotice
        }
    }
}
</script>

<style lang='scss'>
.notice {
    position: fixed;
    bottom: 20%;
    right: 0;
    z-index: 9999; 
}
 .el-dialog__wrapper{
        .el-dialog {
            border-radius: 20px;
            .el-dialog__body{
                    padding-top: 5px;
                    padding-bottom: 5px;
                }
        }
    }
</style>