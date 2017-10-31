const build = require('./build')
const fixPath = require('./fixResource')
const webpackConfig = require('../webpack.prod.config')

const prefix = webpackConfig.output.publicPath;
const env = 'dist'

build(webpackConfig, env, function () {
    fixPath(env + '/index.html', prefix)
    fixPath(env + '/phone.html', prefix)
})