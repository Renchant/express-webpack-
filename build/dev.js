//颜色块
var chalk = require('chalk')
var express = require('express')
var webpack = require('webpack')
//node.js的HTTP请求记录器中间件,负责log的
var logger = require('morgan')

// 代理中间件 https://www.npmjs.com/package/http-proxy-middleware
// 代理/ api请求到http://apid.youxuanyun.com
var proxyMiddleware = require('http-proxy-middleware')

var webpackConfig = require('../webpack.local.config')

var app = express()
// 打包
var compiler = webpack( webpackConfig )

var config = require('../config')
var proxy = config.proxy
var localhost = config.localhost || 'http://localhost'
var port = config.port || 8010

// https://www.npmjs.com/package/webpack-dev-middleware
//组织包裝webpack使其可以变成中間件，或称中間件的容器(简单理解可以通过express操作webpack打包的过程)
var devMiddleware = require( 'webpack-dev-middleware')( compiler, {
    //webpack-dev-middleware配置的publicPath应该和webpack配置文件里的一致
    publicPath: webpackConfig.output.publicPath,
    // 不显示信息到控制台（仅警告和错误）
    noInfo: false,
    //统计参数
    stats: {
        colors: true,
        chunks: false,
        reasons: true,
        errorDetails: true
    }
} )
//打包有效后执行回调
devMiddleware.waitUntilValid(function () {
    var uri = localhost + ':' + port + '/index.html'
    console.log(chalk.yellow('\nListening at ' + uri + '\n'))
})

// wdbpack-hot-middleware 热更新模块 基本功能是热重载、热替换
var hotMiddleware = require('webpack-hot-middleware')(compiler)

// force page reload when html-webpack-plugin template changes
//hack: 修改html模板时，webpack重新加载操作 不起作用
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})

Object.keys(proxy).forEach(function (k) {
    app.use(k, proxyMiddleware(proxy[k]))
})

//处理单页面重定向、刷新、路由跳转出现404问题
//例如/help或者/help/online 当网络服务器绕过索引文件以在该位置找到文件时。当您的应用程序是SPA时，Web服务器将无法尝试检索该文件
var fallback = require('connect-history-api-fallback')()

app.use( fallback )

// 托管静态文，访问的文件都存放在一个“虚拟/src”目录（即目录根本不存在）下面 ，可以直接通过http://localhost:8010/index.js 访问到静态资源文件
app.use( '/src', express.static('./src') )

app.use( devMiddleware )
app.use( hotMiddleware )

app.use( logger() )

module.exports = app.listen( port, function( err ) {
    if( err ) {
        console.log( err )
        return;
    }
} )
