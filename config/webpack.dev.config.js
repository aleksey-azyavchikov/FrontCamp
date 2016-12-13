var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.config.js');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = webpackMerge(commonConfig,  {
    devtool: 'inline-source-map',
    output: {
        filename: '[name].js',
        path: './dist/dev'
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: './index.html'
        }),
    ],

    devServer: {
        port: 3000,
        historyApiFallback: true,
        inline: true,
        hot: true
    },
    contentBase:__dirname + '/dist/dev'
});