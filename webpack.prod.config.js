var path = require('path');
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const baseConf = require('./webpack.base.config')

const getEntrys = require('./getEntrys')();

const pluginName = require( './package.json' ).name
const cdnOrigin = require( './config' ).qiniu.origin

const env = require('./src/modules/env').prod

const HtmlWebpack = [];
Object.keys(getEntrys).forEach((item) => {
    let chunks = [item];
    HtmlWebpack.push(
        new HtmlWebpackPlugin({
            filename: `${item}.html`,
            template: `./src/pages/${item}/${item}.html`,
            inject: true,
            // minify: {
            //     removeComments: true,
            //     collapseWhitespace: true,
            //     removeAttributeQuotes: true,
            // },
            chunks: chunks
        })
    )
})

module.exports = merge(
    baseConf,
    {
        entry: getEntrys,

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name]_[chunkhash:10].js',
            publicPath: cdnOrigin + '/' + pluginName + '/dist/'
        },

        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            }),
            new webpack.DefinePlugin(env),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            ...HtmlWebpack
        ]
    }
)
