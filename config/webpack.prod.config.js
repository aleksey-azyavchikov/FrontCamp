var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.config.js');
var ForceCaseSensitivityPlugin = require('force-case-sensitivity-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',
    output: {
        filename: '[name].js',
        path: './dist/prod'
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        new ForceCaseSensitivityPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            hash: false,
            template: './index.html'
        }),
    ],

    devServer: {
        port: 4000,
        historyApiFallback: true,
    },
    contentBase:__dirname + '/dist/prod'
});