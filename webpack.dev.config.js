var path = require('path');
const webpack = require('webpack')
const merge = require('webpack-merge')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const getEntrys = require('./getEntrys')();

const baseConf = require('./webpack.base.config')

const env = require('./src/modules/env').prod

const HtmlWebpack = [];
Object.keys(getEntrys).forEach( (item) => {
    let chunks = [item];
    HtmlWebpack.push(
        new HtmlWebpackPlugin({
            filename: `${item}.html`,
            template: `./src/pages/${item}/${item}.html`,
            inject: true,
            imgUrl: '../../images/',
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
            path: path.resolve(__dirname, 'dev'),
            filename: '[name]_[chunkhash:10].js'
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
