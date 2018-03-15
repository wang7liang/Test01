/**
 * Created by wang7liang on 2018/3/10.
 */
import webpack  from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
    mode: "development",
    devtool: 'null',
    entry: path.join(__dirname,'../app/index.js'),
    output: {
        path: path.join(__dirname,'../build'),
        filename: 'bundle.js',
        publicPath: "/",
        chunkFilename: '[name].chunk.js'
    },
    devServer: {
        contentBase: path.join(__dirname,'../build'),
        historyApiFallback: true,
        inline: true,
        port: 8000,
        proxy: {
            '/api/*': {
                target: 'http://127.0.0.1:8888',
                host:'127.0.0.1',
                secure: false
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: '[name]_[local]--[hash:base64:5]'
                        }
                    }
                    ]
            },
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
            {test: /\.jsx$/,loader: 'babel-loader', exclude: /node_modules/},
            {test: [/\.jpe?g$/,/\.png$/], loader: "url-loader",options: {
                    limit: 10240,
                    name: 'image/[name].[hash:8].[ext]'
                }}
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: path.join(__dirname , "../app/index.tmpl.html")
        })
    ]

}