<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import storage from './storage/index'

export default {
  name: 'App',
  components: {

  },
  methods:{
    getUser(){
      this.axios.get('user').then((res)=>{
            this.$store.dispatch('saveUserName',res.username)
      })
    },
    getCartCount(){
      this.axios.get('carts/products/sum').then((res)=>{
          this.$store.dispatch('saveCartCount',res)
      })
    }
  },
  data(){
    return{
      testres:{}
    }
  },
  mounted(){
    console.log("我加载了一次");
    this.getUser();
    this.getCartCount();
    // storage.setItem('a',1)
    // storage.setItem('user',{a:1});
    // storage.setItem('abc',{a:1},'user');
    // storage.clear('a','user')
    // this.axios.get("./mock/user/login.json").then((res)=>

  //   {this.testres=res
  //   });
   }

}
</script>

<style lang="scss">
@import "./assets/scss/reset.scss";
@import "./assets/scss/config.scss";
@import "./assets/scss/button.scss";

/*#app {*/
/*  font-family: Avenir, Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/

</style>
