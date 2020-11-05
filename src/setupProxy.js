let proxy = require('http-proxy-middleware');
module.exports = function(app){
   app.use(proxy.createProxyMiddleware("/proxy",{
       target:'http://localhost:4000',
       changeOrigin:true,
       pathRewrite:{
        "^proxy":""
       }
   }))
}