const build = require('./build')
// 修复html上资源路径问题 包括img script href
const fixPath = require('./fixResource')
const webpackConfig = require('../webpack.dev.config')

const prefix = webpackConfig.output.publicPath || '';
const env = 'dev'

build(webpackConfig, env, function () {
    fixPath(env + '/index.html', prefix)
    fixPath(env + '/phone.html', prefix)
})