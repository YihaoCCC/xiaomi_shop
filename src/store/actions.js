export default{
    saveUserName(context,username){
        context.commit('saveUserName',username)
    },
    saveCartCount(context,count){
        context.commit('saveCartCount',count)
    },
    // saveProDuctionInfo(context,info){
    //     context.commit('saveInfo',info)
    // }
}