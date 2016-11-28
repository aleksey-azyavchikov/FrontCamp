var path = require('path');
var ForceCaseSensitivityPlugin = require('force-case-sensitivity-webpack-plugin');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

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
            // {
            //     test: /\.html$/,
            //     loader: 'html'
            // },
        ]
    },

    plugins: [
        // new ForceCaseSensitivityPlugin(),
        // new webpack.optimize.UglifyJsPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery"
        }),
        // new wepback.optimize.CommonChunkPlugin({
        //     name: ["common", "vendor"],
        //     minChunks: 2,
        // }),
        new HtmlWebpackPlugin({
            // hash: true,
            template: './index.html'
        }),
        new CopyWebpackPlugin([{
            from: './',
            to: './'
        }], {
            ignore: [
                'index.html'
            ]
        })
    ],

    devServer: {
        port: 3000
        // historyApiFallback: true,
    },
    watch: true,
    devtool: 'eval'
}