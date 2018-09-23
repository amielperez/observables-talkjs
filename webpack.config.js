const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SRC_DIR = 'src';
const DIST_DIR = 'dist';

const config = {
    entry: {
        app: `./${SRC_DIR}/index.js`
    },
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, DIST_DIR),
        publicPath: '/',
    },
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    devtool: 'cheap-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['app'],
            chunksSortMode: 'manual',
            template: `./${SRC_DIR}/index.html`,
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        publicPath: '/',
        contentBase: path.join(__dirname, DIST_DIR),
        compress: true,
        port: 9000,
    }
}

module.exports = config;
