module.exports = {
    configureWebpack:{
        externals:{
            'twaver':'twaver',
            'layer':'layer',
        }
    },
    lintOnSave: false,
    publicPath:'./',
    devServer: {
        port: 8080, // 端口号
        host: "localhost",
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理

        //配置跨域
        proxy: { 
            '/api': {
                target: 'http://kg.zhaodashen.cn/v2/',
                changOrigin: true, //允许跨域
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
        
      }

}


