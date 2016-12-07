var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: path.join(__dirname, '../src'),
    entry: {
        index: './index.js',
        vendor: ["jquery"]
    },
    resolve: {
        exteinsions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'latest']
                }
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader"]
            },
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jquery: "jquery",
            jQuery: "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ["vendor"],
            minChunks: 2,
        }),
    ],
    devServer: {
        port: 3000,
        historyApiFallback: true,
    },
}