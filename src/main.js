import Vue from 'vue'

import axios from "axios";
import router from "@/router/router";
import VueLazyload from "vue-lazyload";
import VueCookie from 'vue-cookie'
import store from './store'
import { Message, Button } from 'element-ui';
import { Loading } from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import infiniteScroll from 'vue-infinite-scroll'

import App from './App.vue'


//根据前端的跨域方式做调整 要去/a/b后端端口  前端接口写的是 :/api/a/b   经过此处转换成 /a/b
axios.defaults.baseURL='/api';//基于代理的跨域问题
axios.defaults.timeout=6000;//超时处理

//接口错误拦截
axios.interceptors.response.use(function (response) {
  //response是针对返回值的拦截和处理
  //requests是针对提交数据的拦截和处理
  let res=response.data;
  let path=location.hash;
  if(res.status==0){
    return res.data;
  }
  else if(res.status==10){
    if(path!='#/index'){
      window.location.href='/#/login';
    }
    return Promise.reject(res);
  }
  else{
    alert(res.msg);//如果登录失败，此时还后端是会有一个res返回，此时需要将res给return出去，不然会进入到login中的then操作中
  return Promise.reject(res);}

},(error)=>{
  let res = error.response;
  Message.error(res.data.message);
  return Promise.reject(error);
});


//
Vue.use(VueCookie);
// Vue.use(Message);//此方法会出现空白弹框
Vue.component(Message.name,Message);
Vue.component(Button.name,Button);
Vue.use(Loading)
Vue.use(infiniteScroll)
Vue.use(VueLazyload,{
  loading:require("./assets/imgs/loading-svg/loading-bars.svg")
})//图片懒加载
Vue.config.productionTip = false
Vue.prototype.$message=Message
Vue.prototype.axios = axios
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
