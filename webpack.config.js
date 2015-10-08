'use strict';

// Modules
//var webpack = require('webpack');
//var autoprefixer = require('autoprefixer');
//var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//var path = require('path');


module.exports = {
    context: __dirname + "/src",
    entry: "./app.js",

    output: {
        filename: "app.js",
        path: __dirname + "/dist"
    },

    module: {
        //preLoaders: [
        //    { test: /\.js$/, loader: 'baggage?[file].html' }
        //],
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel?optional[]=runtime'
            },
            {
                // Reference: https://github.com/webpack/file-loader
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'file'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
            },
            //{
            //    test: /\.html$/, loader: "ngtemplate?relativeTo=" + (path.resolve(__dirname, './src')) +"/!html"
            //}
        ]
    },

    plugins: [
        // Reference: https://github.com/webpack/extract-text-webpack-plugin
        // Extract css files
        // Disabled when in test mode or not in build mode
        new ExtractTextPlugin('[name].[hash].css', {
            disable: true
        })
    ],

    watch: true,
    debug: true,

    devtool: "eval"
};