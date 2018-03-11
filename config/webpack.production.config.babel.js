/**
 * Created by wang7liang on 2018/3/10.
 */
import webpack  from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'

export default {

    mode: "production",
    devtool: 'null',
    entry: path.join(__dirname,'../app/index.js'),
    output: {
        path: path.join(__dirname,'../public'),
        filename: '[name].[hash:8].bundle.js',
        publicPath: ""
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
            {test: /\.js$/, loader: 'babel-loader', exclude: [/node_modules/]},
            {test: /\.jsx$/,loader: 'babel-loader', exclude: [/node_modules/]},
            {test: [/\.jpe?g$/,/\.png$/], loader: "url-loader",options: {
                    limit: 10240,
                    name: 'image/[name].[hash:8].[ext]'
                }}
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: path.join(__dirname , "../app/index.tmpl.html"),
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(['main.*.js'], {
            root: path.join(__dirname,'../public'),
            verbose: true,
            dry: false,
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
}