var path = require('path');
var ForceCaseSensitivityPlugin = require('force-case-sensitivity-webpack-plugin');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    context: path.join(__dirname, './src'),
    entry: {
        index: './index.js',
        vendor: ["jquery"]
    },
    output: {
        filename: '[name].js',
        path: './dist'
    },
    resolve: {
        exteinsions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [/(node_modules|bower_components)/],
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                loader: ExtractTextWebpackPlugin.extract("style-loader", "css-loader")
            },
            // {
            //     test: /\.css$/,
            //     loader: 'css'
            // },
            {
                test: /\.html$/,
                loader: 'html'
            },
        ]
    },

    plugins: [
        // new ForceCaseSensitivityPlugin(),
        // new webpack.optimize.UglifyJsPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ["vendor"],
            minChunks: 2,
        }),
        new ExtractTextWebpackPlugin('[name].css'),
        new HtmlWebpackPlugin({
            // hash: true,
            template: './index.html'
        }),
        new CopyWebpackPlugin([{
            from: './',
            to: './'
        }], {
            ignore: [
                //'index.html',
                '*.css',
                '*.js'
            ]
        }),
        new CleanWebpackPlugin(['dist']
        )
    ],

    devServer: {
        port: 3000
        // historyApiFallback: true,
    },
    watch: true
    // devtool: 'eval'
}