const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const getEntrys = require('./getEntrys')();

const baseConf = require('./webpack.base.config')

const env = require('./src/modules/env').dev

//循环生成每个入口文件对应的html
const HtmlWebpack = [];
const entries = getEntrys
Object.keys(entries).forEach( function( name ) {
    // 如果要在Webpack配置中使用多个入口点，则需要在每个入口点中包含热中间件客户端。这确保每个入口点文件知道如何处理热更新
    // 将 Hol-reload 相对路径添加到 webpack.base.conf 的 对应 entry 前
    entries[name] = [ './build/dev-client' ].concat( entries[ name ] )
    let chunks = [name];
    HtmlWebpack.push(
        new HtmlWebpackPlugin({
            filename: `${name}.html`,
            template: `./src/pages/${name}/${name}.html`,
            inject: true,
            // minify: {
            //     removeComments: true,
            //     collapseWhitespace: true,
            //     removeAttributeQuotes: true,
            // },
            chunks: chunks
        })
    )
} )

module.exports = merge(
    baseConf,
    {
        entry : entries,

        output: {
            path: '/',
            filename: '[name].js',
        },

        plugins: [
            new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"development"' } }),
            new webpack.DefinePlugin(env),
            // 把html添加热更新 hot-reload
            new webpack.HotModuleReplacementPlugin(),
            ...HtmlWebpack
        ]
    }
)