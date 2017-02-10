var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackTemplate = require('html-webpack-template');

module.exports = {
    context: path.join(__dirname, '../src'),
    entry: {
        index: './index1.jsx',
        vendor: ["jquery"]
    },
    resolve: {
        exteinsions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html'
            },
            {test: /\.scss$/, loaders: [ 'style', 'css', 'sass' ]},
            {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
            { test: /\.jpg(\?v=\d+\.\d+\.\d+)?$/, loader: "file" }
        ]
    },

    plugins: [
         new HtmlWebpackPlugin({
            template: HtmlWebpackTemplate,
            title: 'Webpack demo',
            appMountId: 'app', // Generate #app where to mount
            mobile: true, // Scale page on mobile
            inject: false, // html-webpack-template requires this to work
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Tether: "tether",
            "window.Tether": "tether",
            Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
            Button: "exports-loader?Button!bootstrap/js/dist/button",
            Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
            Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
            Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
            Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
            Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
            Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
            Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
            Util: "exports-loader?Util!bootstrap/js/dist/util",
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ["vendor"],
            minChunks: 2,
        }),
        new CopyWebpackPlugin([{
            from: './',
            to: './',
        }], {
            ignore: [
                '*.html',
                '*.scss',
                '*.js'
            ]
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}