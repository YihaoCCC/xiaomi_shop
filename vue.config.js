module.exports={
   devServer:{
       port:8080,
       proxy:{
           '/api':{
               target:'http://mall-pre.springboot.cn',
               changeOrigin:true,
               pathRewrite:{
                   '/api':''
               }
           }
       },
       hot:true,

   },
    productionSourceMap:false,//将线上部署的项目的包中的源码map隐藏
    chainWebpack:(config)=>{
        config.plugins.delete('prefetch')
    }

}