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
       hot:true
   }

}