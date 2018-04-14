var webpack = require('webpack');
var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	cache: false,
	entry: {
		index: './src/index'
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'index.js',
		library: 'nc-lightapp-front',
		libraryTarget: 'umd'
	},
	externals: {
		react: {
			root: 'React',
			var: 'React',
			commonjs: 'react',
			commonjs2: 'react',
			amd: 'react'
		},
		'react-dom': {
			root: 'ReactDOM',
			var: 'ReactDOM',
			commonjs: 'react-dom',
			commonjs2: 'react-dom',
			amd: 'react-dom'
		},
		axios: 'axios'
	},
	module: {
		rules: [
			{
				test: /\.js[x]?$/,
				exclude: /(node_modules)/,
				include: path.resolve('src'),
				use: [
					{
						loader: 'babel-loader'
					}
				]
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: [ 'css-loader', 'postcss-loader' ],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					use: [ 'css-loader', 'postcss-loader', 'less-loader' ],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.(png|jpg|jpeg|gif)(\?.+)?$/,
				exclude: /favicon\.png$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							name: '[name].[hash:8].[ext]'
						}
					}
				]
			},
			{
				test: /\.(eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[hash:8].[ext]'
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: [ '.jsx', '.js' ],
		alias: {}
	},
	plugins: [ new ExtractTextPlugin('index.css'), new CleanWebpackPlugin([ 'build' ]) ]
};
