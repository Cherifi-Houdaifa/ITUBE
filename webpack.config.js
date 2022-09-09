const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].[contenthash].js',
        clean: true,
        publicPath: '/',
    },
    devtool: 'eval-source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.mp4$/i,
                use: {
                    loader: 'file-loader'
                }
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'public/index.html'),
            favicon: path.resolve(__dirname, 'public/favicon.ico'),
        }),
        new webpack.DefinePlugin({
            'process.env.apiKey': JSON.stringify(process.env.apiKey),
            'process.env.authDomain': JSON.stringify(process.env.authDomain),
            'process.env.projectId': JSON.stringify(process.env.projectId),
            'process.env.storageBucket': JSON.stringify(
                process.env.storageBucket
            ),
            'process.env.messagingSenderId': JSON.stringify(
                process.env.messagingSenderId
            ),
            'process.env.appId': JSON.stringify(process.env.appId),
        }),
    ],
};