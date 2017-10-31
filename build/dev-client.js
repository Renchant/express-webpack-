// 参考vue-cli 所有entry文件添加热更新 hot-reload
//  noInfo设置为true禁用信息控制台日志记录
// reload设置为true以在Webpack卡住时自动重新加载页面
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(function (event) {
    if (event.action === 'reload') {
        window.location.reload()
    }
})