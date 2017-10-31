const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: /src\//,
            },

            {
                test: /\/index[\/|\D|\d]*\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader',
                options: {
                    limit: 5000,
                    name: 'images/index/[name].[hash:10].[ext]'
                }
            },

            {
                test: /\/phone[\/|\D|\d]*\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader',
                options: {
                    limit: 5000,
                    name: 'images/phone/[name].[hash:10].[ext]'
                }
            },

            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers: [
                                            'Android >= 4',
                                            'Chrome >= 30',
                                            'iOS >= 6',
                                            'ie>=6',
                                            'Firefox >= 20',
                                            'Safari >= 5'
                                        ]
                                    })
                                ]
                            }
                        },
                        'sass-loader',
                    ]
                })
            },

            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers: [
                                            'Android >= 4',
                                            'Chrome >= 30',
                                            'iOS >= 6',
                                            'ie>=6',
                                            'Firefox >= 20',
                                            'Safari >= 5'
                                        ]
                                    })
                                ]
                            }
                        }
                    ]
                })
            },

            {
                test: /\.html$/,
                loader: 'html-loader',
            }
            
        ]
    },

    plugins: [
        new ExtractTextPlugin( '[name]_[contenthash:10].css' ),
    ]
}

