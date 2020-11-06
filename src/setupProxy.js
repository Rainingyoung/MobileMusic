let {createProxyMiddleware} = require('http-proxy-middleware');
module.exports = function(app){
   app.use(createProxyMiddleware("/proxy",{
       target:'http://localhost:4000',
       changeOrigin:true,
       pathRewrite:{
        "^/proxy":""
       },
       "secure":true
   }))
}